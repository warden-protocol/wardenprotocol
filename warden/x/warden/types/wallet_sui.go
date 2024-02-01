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
package types

import (
	"crypto/ed25519"
	"encoding/hex"

	"golang.org/x/crypto/blake2b"
)

type SuiWallet struct {
	key *ed25519.PublicKey
}

const (
	publicKeySize              = 32
	signatureSchemeFlagED25519 = 0x0
	addressLength              = 64
)

var _ Wallet = &SuiWallet{}

func NewSuiWallet(k *Key) (*SuiWallet, error) {
	pubkey, err := k.ToEdDSAEd25519()
	if err != nil {
		return nil, err
	}
	return &SuiWallet{key: pubkey}, nil
}

func (w *SuiWallet) Address() string {
	tmp := []byte{signatureSchemeFlagED25519}
	tmp = append(tmp, *w.key...)
	addrBytes := blake2b.Sum256(tmp)
	suiAddress := "0x" + hex.EncodeToString(addrBytes[:])[:addressLength]
	return suiAddress
}
