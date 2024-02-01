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
	"fmt"

	"github.com/btcsuite/btcd/btcec/v2"
	"github.com/cosmos/cosmos-sdk/crypto/hd"
	sdktypes "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/go-bip39"
	"github.com/evmos/ethermint/crypto/ethsecp256k1"
)

var addrPrefix = "warden"

func init() {
	// set up SDK config (singleton)
	config := sdktypes.GetConfig()
	config.SetBech32PrefixForAccount(addrPrefix, addrPrefix+"pub")
}

// Identity represents an account on the Warden Protocol. It can be used to sign
// transactions.
type Identity struct {
	Address sdktypes.AccAddress
	PrivKey *ethsecp256k1.PrivKey
}

// NewIdentityFromSeed returns a Identity from a seed phrase.
// This is useful in a mock environment or during testing but should not be used in production.
func NewIdentityFromSeed(derivationPath, seedPhrase string) (Identity, error) {
	// Convert the seed phrase to a seed
	seedBytes, err := bip39.NewSeedWithErrorChecking(seedPhrase, "")
	if err != nil {
		return Identity{}, fmt.Errorf("failed to convert seed phrase to seed: %w", err)
	}

	// Create a master key and derive the desired key
	masterKey, ch := hd.ComputeMastersFromSeed(seedBytes)
	derivedKey, err := hd.DerivePrivateKeyForPath(masterKey, ch, derivationPath)
	if err != nil {
		return Identity{}, fmt.Errorf("failed to derive private key: %w", err)
	}

	// Generate a private key object from the bytes
	privKey, pubKey := btcec.PrivKeyFromBytes(derivedKey)
	if err != nil {
		return Identity{}, fmt.Errorf("failed to generate private key: %w", err)
	}

	// Convert the public key to a Cosmos secp256k1.PublicKey
	cosmosPubKey := &ethsecp256k1.PubKey{Key: pubKey.SerializeCompressed()}
	ethermintPrivKey := &ethsecp256k1.PrivKey{
		Key: privKey.Serialize(),
	}

	// Get the address of the public key
	addr := sdktypes.AccAddress(cosmosPubKey.Address().Bytes())

	return Identity{
		Address: addr,
		PrivKey: ethermintPrivKey,
	}, nil
}
