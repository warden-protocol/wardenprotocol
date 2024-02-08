// Copyright 2024
//
// This file includes work covered by the following copyright and permission notices:
//
// Copyright 2023 Qredo Ltd.
// Licensed under the Apache License, Version 2.0;
//
// This file is part of the Warden Protocol library.
//
// The Warden Protocol library is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// You should have received a copy of the GNU Lesser General Public License
// along with the Warden Protocol library. If not, see https://github.com/warden-protocol/wardenprotocol/blob/main/LICENSE
package client

import (
	"context"
	"fmt"
	"strings"
	"time"

	"cosmossdk.io/log"
	"cosmossdk.io/math"
	db "github.com/cosmos/cosmos-db"
	"github.com/cosmos/cosmos-sdk/client/tx"
	"github.com/cosmos/cosmos-sdk/types"
	txtypes "github.com/cosmos/cosmos-sdk/types/tx"
	"github.com/cosmos/cosmos-sdk/types/tx/signing"
	xauthsigning "github.com/cosmos/cosmos-sdk/x/auth/signing"
	"github.com/spf13/viper"
	"github.com/warden-protocol/wardenprotocol/warden/app"
	"google.golang.org/grpc"
)

var (
	DefaultGasLimit = uint64(300000)
	DefaultFees     = types.NewCoins(types.NewCoin("nward", math.NewInt(1000)))

	queryTimeout = 250 * time.Millisecond
)

type AccountFetcher interface {
	Account(ctx context.Context, addr string) (types.AccountI, error)
}

var _ AccountFetcher = (*QueryClient)(nil)

// RawTxClient is the client used for sending new transactions to the chain.
type RawTxClient struct {
	Identity Identity

	chainID        string
	client         txtypes.ServiceClient
	accountFetcher AccountFetcher
}

func NewRawTxClient(id Identity, chainID string, c *grpc.ClientConn, accountFetcher AccountFetcher) *RawTxClient {
	return &RawTxClient{
		Identity:       id,
		chainID:        chainID,
		client:         txtypes.NewServiceClient(c),
		accountFetcher: accountFetcher,
	}
}

// Send a transaction and wait for it to be included in a block.
func (c *RawTxClient) SendWaitTx(ctx context.Context, txBytes []byte) error {
	hash, err := c.SendTx(ctx, txBytes)
	if err != nil {
		return err
	}

	if err = c.WaitForTx(ctx, hash); err != nil {
		return err
	}

	return nil
}

// Build a transaction with the given messages and sign it.
// Sequence and account numbers will be fetched automatically from the chain.
func (c *RawTxClient) BuildTx(ctx context.Context, gasLimit uint64, fees types.Coins, msgs ...types.Msg) ([]byte, error) {
	account, err := c.accountFetcher.Account(ctx, c.Identity.Address.String())
	if err != nil {
		return nil, fmt.Errorf("fetch account: %w", err)
	}
	accSeq := account.GetSequence()
	accNum := account.GetAccountNumber()

	app, err := app.New(
		log.NewNopLogger(),
		db.NewMemDB(),
		nil,
		false,
		viper.New(),
	)
	txBuilder := app.TxConfig().NewTxBuilder()
	signMode := app.TxConfig().SignModeHandler().DefaultMode()

	// build unsigned tx
	txBuilder.SetGasLimit(gasLimit)
	txBuilder.SetFeeAmount(fees)

	if err = txBuilder.SetMsgs(msgs...); err != nil {
		return nil, fmt.Errorf("set msgs: %w", err)
	}

	// First round: we gather all the signer infos. We use the "set empty
	// signature" hack to do that.
	sigV2 := signing.SignatureV2{
		PubKey: c.Identity.PrivKey.PubKey(),
		Data: &signing.SingleSignatureData{
			SignMode:  signing.SignMode(signMode),
			Signature: nil,
		},
		Sequence: accSeq,
	}
	err = txBuilder.SetSignatures(sigV2)
	if err != nil {
		return nil, fmt.Errorf("set empty signature: %w", err)
	}

	// Second round: all signer infos are set, so each signer can sign.
	signerData := xauthsigning.SignerData{
		ChainID:       c.chainID,
		AccountNumber: accNum,
		Sequence:      accSeq,
		PubKey:        c.Identity.PrivKey.PubKey(),
	}

	sigV2, err = tx.SignWithPrivKey(
		ctx,
		signing.SignMode(signMode),
		signerData,
		txBuilder,
		c.Identity.PrivKey,
		app.TxConfig(),
		accSeq,
	)
	if err != nil {
		return nil, fmt.Errorf("sign with priv key: %w", err)
	}

	err = txBuilder.SetSignatures(sigV2)
	if err != nil {
		return nil, fmt.Errorf("set signature: %w", err)
	}

	txBytes, err := app.TxConfig().TxEncoder()(txBuilder.GetTx())
	if err != nil {
		return nil, fmt.Errorf("encode tx: %w", err)
	}

	return txBytes, nil
}

// SendTx broadcasts a signed transaction and returns its hash.
// This method does not wait until the transaction is actually added to the,
// blockchain. Use SendWaitForTx for that.
func (c *RawTxClient) SendTx(ctx context.Context, txBytes []byte) (string, error) {
	grpcRes, err := c.client.BroadcastTx(
		ctx,
		&txtypes.BroadcastTxRequest{
			Mode:    txtypes.BroadcastMode_BROADCAST_MODE_SYNC,
			TxBytes: txBytes,
		},
	)
	if err != nil {
		return "", err
	}

	if grpcRes.TxResponse.Code != 0 {
		return "", fmt.Errorf("tx failed: %s", grpcRes.TxResponse.RawLog)
	}

	return grpcRes.TxResponse.TxHash, nil
}

// WaitForTx requests the tx from hash, if not found, waits for some time and
// tries again. Returns an error if ctx is canceled.
func (c *RawTxClient) WaitForTx(ctx context.Context, hash string) error {
	tick := time.NewTicker(queryTimeout)
	defer tick.Stop()

	for {
		select {
		case <-ctx.Done():
			return ctx.Err()
		case <-tick.C:
			_, err := c.client.GetTx(ctx, &txtypes.GetTxRequest{Hash: hash})
			if err == nil {
				return nil
			}

			if !strings.Contains(err.Error(), "not found") {
				return err
			}
		}
	}
}
