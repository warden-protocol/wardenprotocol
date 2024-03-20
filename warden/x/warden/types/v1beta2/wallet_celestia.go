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
	"crypto/ecdsa"

	"github.com/cosmos/cosmos-sdk/crypto/keys/secp256k1"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/ethereum/go-ethereum/crypto"
)

type CelestiaWallet struct {
	key *ecdsa.PublicKey
}

var _ Wallet = &CelestiaWallet{}

func NewCelestiaWallet(k *Key) (*CelestiaWallet, error) {
	pubkey, err := k.ToECDSASecp256k1()
	if err != nil {
		return nil, err
	}

	return &CelestiaWallet{key: pubkey}, nil
}

func (w *CelestiaWallet) Address() string {
	var pubkey secp256k1.PubKey
	pubkey.Key = crypto.CompressPubkey(w.key)
	bech32Address := sdk.MustBech32ifyAddressBytes("celestia", pubkey.Address())
	return bech32Address
}
