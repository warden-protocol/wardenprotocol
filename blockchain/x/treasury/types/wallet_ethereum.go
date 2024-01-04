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
	"bytes"
	"crypto/ecdsa"
	"fmt"
	"math/big"

	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/common/hexutil"
	"github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/crypto"
	"github.com/ethereum/go-ethereum/rlp"
)

type EthereumWallet struct {
	key *ecdsa.PublicKey
}

var _ Wallet = &EthereumWallet{}
var _ TxParser = &EthereumWallet{}

func NewEthereumWallet(k *Key) (*EthereumWallet, error) {
	pubkey, err := k.ToECDSASecp256k1()
	if err != nil {
		return nil, err
	}
	return &EthereumWallet{key: pubkey}, nil
}

func (w *EthereumWallet) Address() string {
	addr := crypto.PubkeyToAddress(*w.key)
	return addr.Hex()
}

func (*EthereumWallet) ParseTx(b []byte) (Transfer, error) {
	tx, err := ParseEthereumTransaction(b)
	if err != nil {
		return Transfer{}, err
	}

	coinIdentifier := []byte("ETH/")
	if tx.Contract != nil {
		coinIdentifier = append(coinIdentifier, tx.Contract.Bytes()...)
	}

	return Transfer{
		To:             tx.To.Bytes(),
		Amount:         tx.Amount,
		CoinIdentifier: coinIdentifier,
		DataForSigning: tx.DataForSigning,
	}, nil
}

// EthereumTransfer represents an ETH transfer or an ERC-20 transfer on the
// Ethereum blockchain.
type EthereumTransfer struct {
	// To is the destination of the transfer.
	To *common.Address

	// Amount is the amount being transferred.
	Amount *big.Int

	// Contract is nil if the native currency (ETH) is being transferred,
	// or is the address of the contract if a ERC-20 token is being
	// transferred.
	Contract *common.Address

	DataForSigning []byte
}

type DynamicFeeTxWithoutSignature struct {
	ChainID    *big.Int
	Nonce      uint64
	GasTipCap  *big.Int // a.k.a. maxPriorityFeePerGas
	GasFeeCap  *big.Int // a.k.a. maxFeePerGas
	Gas        uint64
	To         *common.Address `rlp:"nil"` // nil means contract creation
	Value      *big.Int
	Data       []byte
	AccessList types.AccessList
}

type AccessListTxWithoutSignature struct {
	ChainID    *big.Int         // destination chain ID
	Nonce      uint64           // nonce of sender account
	GasPrice   *big.Int         // wei per gas
	Gas        uint64           // gas limit
	To         *common.Address  `rlp:"nil"` // nil means contract creation
	Value      *big.Int         // wei amount
	Data       []byte           // contract invocation input data
	AccessList types.AccessList // EIP-2930 access list
}

// The following code doesn't work for unsigned transactions:
//
//	var tx types.Transaction
//	tx.UnmarshalBinary(b)
//
// This function is a workaround taken from https://github.com/ethereum/go-ethereum/issues/26236.
func DecodeUnsignedPayload(msg []byte) (types.TxData, error) {
	if len(msg) <= 1 {
		return nil, fmt.Errorf("found less than 1 byte in %v", msg)
	}
	switch msg[0] {
	case types.AccessListTxType:
		var res AccessListTxWithoutSignature
		err := rlp.DecodeBytes(msg[1:], &res)
		return &types.AccessListTx{
			ChainID:    res.ChainID,
			Nonce:      res.Nonce,
			GasPrice:   res.GasPrice,
			Gas:        res.Gas,
			To:         res.To,
			Value:      res.Value,
			Data:       res.Data,
			AccessList: res.AccessList,
		}, err
	case types.DynamicFeeTxType:
		var res DynamicFeeTxWithoutSignature
		err := rlp.DecodeBytes(msg[1:], &res)
		return &types.DynamicFeeTx{
			ChainID:    res.ChainID,
			Nonce:      res.Nonce,
			GasTipCap:  res.GasTipCap,
			GasFeeCap:  res.GasFeeCap,
			Gas:        res.Gas,
			To:         res.To,
			Value:      res.Value,
			Data:       res.Data,
			AccessList: res.AccessList,
		}, err
	default:
		return nil, fmt.Errorf("unsupported transaction type: %v", msg[0])
	}
}

// ParseEthereumTransaction parses an unsigned transaction that can be an ETH
// transfer or a ERC-20 transfer.
func ParseEthereumTransaction(b []byte) (*EthereumTransfer, error) {
	txData, err := DecodeUnsignedPayload(b)
	if err != nil {
		return nil, err
	}
	tx := types.NewTx(txData)

	value := tx.Value()
	sepoliaChainID := big.NewInt(11155111) // TODO: make this configurable depending on wallet type
	signer := types.LatestSignerForChainID(sepoliaChainID)
	hash := signer.Hash(tx)

	transfer, err := parseERC20Transfer(tx)
	if err != nil {
		// non ERC-20 transfer
		return &EthereumTransfer{
			To:             tx.To(),
			Amount:         value,
			DataForSigning: hash.Bytes(),
		}, nil
	}

	return transfer, nil
}

func parseERC20Transfer(tx *types.Transaction) (*EthereumTransfer, error) {
	data := tx.Data()
	if len(data) < 4+32+32 {
		return nil, fmt.Errorf("invalid ERC-20 transfer: data is too short")
	}

	// 4 bytes - method signature (transfer: 0xa9059cbb)
	// 32 bytes - recipient address
	// 32 bytes - amount
	method := data[0:4]
	recipient := data[4 : 4+32]
	amount := data[4+32 : 4+32+32]

	if !bytes.Equal(method, hexutil.MustDecode("0xa9059cbb")) {
		return nil, fmt.Errorf("invalid ERC-20 transfer: method is not ERC-20 transfer")
	}

	if !bytes.Equal(recipient[0:12], hexutil.MustDecode("0x000000000000000000000000")) {
		return nil, fmt.Errorf("invalid ERC-20 transfer: recipient address is not 20 bytes")
	}

	to := common.BytesToAddress(recipient[12:])

	sepoliaChainID := big.NewInt(58008) // TODO: make this configurable depending on wallet type
	signer := types.NewEIP155Signer(sepoliaChainID)
	hash := signer.Hash(tx)
	return &EthereumTransfer{
		Contract:       tx.To(),
		To:             &to,
		Amount:         big.NewInt(0).SetBytes(amount),
		DataForSigning: hash.Bytes(),
	}, nil
}
