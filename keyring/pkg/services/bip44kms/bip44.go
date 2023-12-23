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
package kms

import (
	"crypto/ecdsa"
	"crypto/ed25519"
	"crypto/sha256"
	"encoding/binary"
	"fmt"

	"github.com/btcsuite/btcd/btcec/v2"
	"github.com/cosmos/cosmos-sdk/crypto/hd"
	bip39 "github.com/cosmos/go-bip39"
	"github.com/ethereum/go-ethereum/common/math"
	"github.com/ethereum/go-ethereum/crypto"
	"github.com/qredo/fusionchain/keyring/pkg/mpc"
)

type Keyring interface {
	PublicKey(keyID []byte, cryptoSystem mpc.CryptoSystem) ([]byte, error)
	PubkeySignature(keyID []byte, cryptoSystem mpc.CryptoSystem) ([]byte, error)
	Signature(sigRequestData *mpc.SigRequestData, cryptoSystem mpc.CryptoSystem) ([]byte, []byte, error)
}

type Bip44KeyRing struct {
	masterSeed [32]byte
	chainCode  [32]byte
}

// NewBip44KeyRing returns a Bip44KeyRing with masterseed and chaincode
func NewBip44KeyRing(seedPhrase, password string) (*Bip44KeyRing, error) {
	// Convert the seed phrase to a master seed using BIP39 derivation
	seedBytes, err := bip39.NewSeedWithErrorChecking(seedPhrase, password)
	if err != nil {
		return nil, fmt.Errorf("failed to convert seed phrase to seed: %w", err)
	}

	// Create a master key and derive the desired key
	masterKey, chainCode := hd.ComputeMastersFromSeed(seedBytes)
	return &Bip44KeyRing{
		masterSeed: masterKey,
		chainCode:  chainCode,
	}, nil
}

// GenerateMnemonic creates a fresh BIP39 mnemonic with 256-bit entropy.
func GenerateMnemonic() (string, error) {
	e, err := bip39.NewEntropy(256)
	if err != nil {
		return "", err
	}
	return bip39.NewMnemonic(e)
}

func (k *Bip44KeyRing) PublicKey(keyID []byte, cryptoSystem mpc.CryptoSystem) (pubKey []byte, err error) {
	derivationPath, err := derivationPathFromKeyID(keyID)
	if err != nil {
		return nil, err
	}
	privKeySeed, err := k.getSeedFromPath(derivationPath)
	if err != nil {
		return nil, err
	}
	switch cryptoSystem {
	case mpc.EcDSA:
		pubKey, err = generateECDSAPubKey(privKeySeed)
	case mpc.EdDSA:
		pubKey, err = generateEdDSAPubKey(privKeySeed)
	default:
		return nil, fmt.Errorf("invalid crypto system: %v", cryptoSystem)
	}
	if err != nil {
		return nil, err
	}

	return pubKey, nil
}

// PubkeySignature creates a signature over a fixed message.
func (k *Bip44KeyRing) PubkeySignature(keyID []byte, cryptoSystem mpc.CryptoSystem) (sig []byte, err error) {
	derivationPath, err := derivationPathFromKeyID(keyID)
	if err != nil {
		return nil, err
	}
	privKeySeed, err := k.getSeedFromPath(derivationPath)
	if err != nil {
		return nil, err
	}
	// PublicKey signature uses the public key bytes as a fixed message for signing.
	var pubKey []byte
	var valid bool
	switch cryptoSystem {
	case mpc.EcDSA:
		pubKey, err = generateECDSAPubKey(privKeySeed)
		if err != nil {
			return nil, err
		}
		h := sha256.Sum256(pubKey)
		m := h[:]
		sig, _, err = generateECDSASignature(privKeySeed, m, true)
		if err != nil {
			return nil, err
		}
		valid = crypto.VerifySignature(pubKey, m, sig[0:64]) // check validity
	case mpc.EdDSA:
		pubKey, err = generateEdDSAPubKey(privKeySeed)
		if err != nil {
			return nil, err
		}
		sig, _, err = generateEdDSASignature(privKeySeed, pubKey)
		if err != nil {
			return nil, err
		}
		valid = ed25519.Verify(pubKey, pubKey, sig) // check validity
	default:
		return nil, fmt.Errorf("invalid crypto system: %v", cryptoSystem)
	}
	if err != nil {
		return nil, err
	}
	// validate locally
	if !valid {
		return nil, fmt.Errorf("invalid %v sig generated", cryptoSystem)
	}

	return sig, nil
}

func (k *Bip44KeyRing) Signature(sigRequestData *mpc.SigRequestData, cryptoSystem mpc.CryptoSystem) (sig []byte, pubKey []byte, err error) {
	if sigRequestData == nil {
		return nil, nil, fmt.Errorf("nil input")
	}
	derivationPath, err := derivationPathFromKeyID(sigRequestData.KeyID)
	if err != nil {
		return nil, nil, err
	}
	privKeySeed, err := k.getSeedFromPath(derivationPath)
	if err != nil {
		return nil, nil, err
	}
	msg := sigRequestData.SigHash

	var valid bool
	switch cryptoSystem {
	case mpc.EcDSA:
		sig, pubKey, err = generateECDSASignature(privKeySeed, msg, true)
		if err != nil {
			return nil, nil, err
		}
		valid = crypto.VerifySignature(pubKey, msg, sig[0:64]) // check validity
	case mpc.EdDSA:
		sig, pubKey, err = generateEdDSASignature(privKeySeed, msg)
		if err != nil {
			return nil, nil, err
		}
		valid = ed25519.Verify(pubKey, msg, sig) // check validity
	default:
		return nil, nil, fmt.Errorf("invalid crypto system: %v", cryptoSystem)
	}

	// validate locally
	if !valid {
		return nil, nil, fmt.Errorf("invalid %v sig generated", cryptoSystem)
	}

	return sig, pubKey, nil
}

// getSeedFromPath extract the private/public ECDSA keypair
func (k *Bip44KeyRing) getSeedFromPath(derivationPath string) ([]byte, error) {
	// Derive private key bytes from the master seed, chainCode and path
	derivedSeed, err := hd.DerivePrivateKeyForPath(k.masterSeed, k.chainCode, derivationPath)
	if err != nil {
		return nil, fmt.Errorf("failed to derive private key seed: %w", err)
	}
	return derivedSeed, nil
}

// derivationPathFromKeyID returns the BIP44 derivation path from the keyID supplied.
// The keyID MUST map to a 32-bit (4-byte) integer otherwise the conversion will fail.
func derivationPathFromKeyID(keyID []byte) (string, error) {
	idx, err := keyIDToIndex(keyID)
	if err != nil {
		return "", err
	}
	hardenedPath := hd.BIP44Params{Purpose: 44, CoinType: 60, Account: 0, Change: false, AddressIndex: idx}.String() + "'" // BIP44 Hardened keys  - https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki#extended-keys
	return hardenedPath, nil
}

// keyIDToIndex converts the supplied keyID to a uint32. Only the last 4 bytes of the key ID.
// In the case of a malformed keyID an error is returned.
func keyIDToIndex(keyID []byte) (uint32, error) {
	if len(keyID) < 4 {
		return 0, fmt.Errorf("invalid keyID %x (too small)", keyID)
	}
	segment := keyID[len(keyID)-4:]
	index := binary.BigEndian.Uint32(segment)
	return index, nil
}

//
// CRYPTO
//

// generateECDSAPubKey generates and ECDSA public key from the seed supplied
func generateECDSAPubKey(seed []byte) (pubKeyBytes []byte, err error) {
	privateKey, _ := btcec.PrivKeyFromBytes(seed[:])
	ecdsaPriv := privateKey.ToECDSA()
	prvD := math.PaddedBigBytes(ecdsaPriv.D, 32)
	if len(prvD) != 32 {
		return nil, fmt.Errorf("error generating ecdsa private key: Priv key bit length: %v", 8*len(prvD))
	}
	prv, err := crypto.ToECDSA(prvD)
	if err != nil {
		return nil, fmt.Errorf("error genertaing ecdsa private/public key pair: Error %v. Priv key bitlength: %v", err, 8*len(seed))
	}
	pubKeyBytes = crypto.CompressPubkey(&prv.PublicKey)

	return pubKeyBytes, nil
}

// generateEdDSAPubKey generates and EdDSA public key from the seed supplied
func generateEdDSAPubKey(seed []byte) (pubKeyBytes []byte, err error) {
	privateKey, err := mpc.EDDSAPrivFromSeed(seed[:])
	if err != nil {
		return nil, fmt.Errorf("error generating eddsa signature %v", err)
	}
	pubKeyBytes = make([]byte, ed25519.PublicKeySize)
	copy(pubKeyBytes, privateKey[32:])

	return pubKeyBytes, nil
}

// generateECDSASignature generates a valid ECDSA signature over the supplied message with a private key derived from the supplied seed.
// If key derivation fails or the inputs are malformed an error will be returned.
func generateECDSASignature(seed, message []byte, recoveryID bool) (sigBytes, pubKeyBytes []byte, err error) {
	pkey := ecdsa.PublicKey{}
	privateKey, _ := btcec.PrivKeyFromBytes(seed[:])
	ecdsaPriv := privateKey.ToECDSA()
	prvD := math.PaddedBigBytes(ecdsaPriv.D, 32)
	if len(prvD) != 32 {
		return nil, nil, fmt.Errorf("error generating ecdsa private key: Priv key bitlength: %v", 8*len(prvD))
	}
	prv, err := crypto.ToECDSA(prvD)
	if err != nil {
		return nil, nil, fmt.Errorf("error generating ecdsa private key: Error %v. Priv key length: %v", err, 8*len(seed))
	}
	sigBytes, err = crypto.Sign(message, prv)
	if err != nil {
		return nil, nil, fmt.Errorf("error signing msg: %x. error: %v", message, err)
	}
	if g := len(sigBytes); g != 65 {
		return nil, nil, fmt.Errorf("invalid sig length %v", g)
	}
	pkey = prv.PublicKey
	pubKeyBytes = crypto.CompressPubkey(&pkey)

	if !recoveryID {
		// Remove the recovery ID [v] from the signature
		sigBytes = sigBytes[0:64]
	} else {
		// ensure that the recoveryID is either 0x1b or 0x1c
		if sigBytes[64] < 27 {
			sigBytes[64] += 27
		}
	}

	return sigBytes, pubKeyBytes, nil
}

// generateEdDSASignature generates a valid EdDSA signature over the supplied message with a private key derived from the supplied seed.
// If key derivation fails or the inputs are malformed an error will be returned.
func generateEdDSASignature(seed, message []byte) (sigBytes, pubKeyBytes []byte, err error) {
	// Sign the encoded transaction
	privateKey, err := mpc.EDDSAPrivFromSeed(seed[:])
	if err != nil {
		return nil, nil, fmt.Errorf("error generating eddsa prviate key %v", err)
	}
	pubKeyBytes = make([]byte, ed25519.PublicKeySize)
	copy(pubKeyBytes, privateKey[32:])
	sigBytes = ed25519.Sign(privateKey, message)

	return sigBytes, pubKeyBytes, nil
}
