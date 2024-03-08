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
	"crypto/sha256"
	"log"
	"testing"

	"github.com/ethereum/go-ethereum/crypto"
	"github.com/stretchr/testify/require"
)

func Test_CelestiaWallet_Address(t *testing.T) {
	wallet := celestiaWallet(t)
	require.Equal(t, "celestia1egz60et40xxzm5rhtlj7caskpvqmqujrr77dtp", wallet.Address())
}

func celestiaWallet(t *testing.T) *CelestiaWallet {
	t.Helper()
	hashedSeed := sha256.Sum256([]byte("example seed"))

	// Generate secp256k1 private key from the hashed seed
	privateKey, err := crypto.ToECDSA(hashedSeed[:])
	if err != nil {
		log.Fatal("Failed to generate private key:", err)
	}

	// Serialize the public key in a compressed format
	publicKeyBytes := crypto.CompressPubkey(&privateKey.PublicKey)

	k := &Key{
		Type:      KeyType_KEY_TYPE_ECDSA_SECP256K1,
		PublicKey: publicKeyBytes,
	}

	wallet, err := NewCelestiaWallet(k)
	require.NoError(t, err)
	return wallet
}
