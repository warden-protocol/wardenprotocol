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
	"crypto/ecdsa"
	"crypto/ed25519"
	"fmt"

	"github.com/ethereum/go-ethereum/crypto"
)

// nolint:stylecheck,st1003
// revive:disable-next-line var-naming
func (k *Key) SetId(id uint64) { k.Id = id }

// nolint:stylecheck,st1003
// revive:disable-next-line var-naming
func (kr *KeyRequest) SetId(id uint64) { kr.Id = id }

// NewMsgUpdateKeyRequestKey is a utility function to generate a new successful
// UpdateKeyRequest result.
func NewMsgUpdateKeyRequestKey(publicKey []byte) isMsgUpdateKeyRequest_Result {
	return &MsgUpdateKeyRequest_Key{
		Key: &MsgNewKey{
			PublicKey: publicKey,
		},
	}
}

// NewMsgUpdateKeyRequestReject is a utility function to generate a new errored
// UpdateKeyRequest result.
func NewMsgUpdateKeyRequestReject(reason string) isMsgUpdateKeyRequest_Result {
	return &MsgUpdateKeyRequest_RejectReason{
		RejectReason: reason,
	}
}

// ToECDSASecp256k1 returns the key parsed as a ECDSA secp256k1 public key.
// It can be parssed as a compressed or uncompressed key.
func (k *Key) ToECDSASecp256k1() (*ecdsa.PublicKey, error) {
	if k.Type != KeyType_KEY_TYPE_ECDSA_SECP256K1 {
		return nil, fmt.Errorf("invalid key type, expected %s, got %s", KeyType_KEY_TYPE_ECDSA_SECP256K1, k.Type)
	}

	var pk *ecdsa.PublicKey

	if len(k.PublicKey) == 33 {
		// Compressed form
		var err error
		pk, err = crypto.DecompressPubkey(k.PublicKey)
		if err != nil {
			return nil, err
		}
	} else {
		// Uncompressed form
		var err error
		pk, err = crypto.UnmarshalPubkey(k.PublicKey)
		if err != nil {
			return nil, err
		}
	}

	return pk, nil
}

// ToEdDSAEd25519 returns the key parsed as a EdDSA Ed25519 public key.
func (k *Key) ToEdDSAEd25519() (*ed25519.PublicKey, error) {
	if k.Type != KeyType_KEY_TYPE_EDDSA_ED25519 {
		return nil, fmt.Errorf("invalid key type, expected %s, got %s", KeyType_KEY_TYPE_EDDSA_ED25519, k.Type)
	}

	var pk *ed25519.PublicKey

	if len(k.PublicKey) != ed25519.PublicKeySize {
		return nil, fmt.Errorf("invalid key length, expect 32, got %d and key %v", len(k.PublicKey), k)
	}

	pubKey := ed25519.PublicKey(k.PublicKey)
	pk = &pubKey
	return pk, nil
}
