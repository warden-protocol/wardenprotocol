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
package v1beta2

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
	case WalletType_WALLET_TYPE_ETH:
		return NewEthereumWallet(k)
	case WalletType_WALLET_TYPE_CELESTIA:
		return NewCelestiaWallet(k)
	case WalletType_WALLET_TYPE_SUI:
		return NewCelestiaWallet(k)
	}
	return nil, ErrUnknownWalletType
}

// Transfer represents a generic transfer of tokens on a blockchain.
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
// transactions into a common structure.
type TxParser interface {
	ParseTx(b []byte, m Metadata) (Transfer, error)
}

type Metadata any
