// Copyright 2023 Qredo Ltd.
// This file is part of the Fusion library.
//
// The Fusion library is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// You should have received a copy of the GNU Lesser General Public License
// along with the Fusion library. If not, see https://github.com/qredo/fusionchain/blob/main/LICENSE
package types

import (
	"fmt"
	"math/big"
)

type Wallet interface {
	// Address returns a human readable version of the address.
	Address() string
}

var ErrUnknownWalletType = fmt.Errorf("error in NewWallet: unknown wallet type")

func NewWallet(k *Key, w WalletType) (Wallet, error) {
	switch w {
	case WalletType_WALLET_TYPE_FUSION:
		return NewFusionWallet(k)
	case WalletType_WALLET_TYPE_ETH:
		return NewEthereumWallet(k)
	}
	return nil, ErrUnknownWalletType
}

// Transfer represents a generic transfer of tokens on a layer 1 blockchain.
// Ideally, this will be the object passed to Blackbird for applying policy.
type Transfer struct {
	// To uniquely identifies the recipient of the transfer.
	To []byte

	// Amount is the amount being transferred.
	Amount *big.Int

	// CoinIdentifier uniquely identifies the coin being transferred.
	CoinIdentifier []byte

	// DataForSigning is the data that will be signed by the key.
	DataForSigning []byte
}

// TxParser can be implemented by wallets that are able to parse unsigned
// transactions into the common Layer1Tx format.
//
// By doing that, wallets can expose more functionalities (i.e. Blackbird
// policies).
type TxParser interface {
	ParseTx(b []byte) (Transfer, error)
}
