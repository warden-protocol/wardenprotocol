package main

import (
	"encoding/binary"
	"fmt"

	"github.com/btcsuite/btcd/btcec/v2"
	"github.com/cosmos/cosmos-sdk/crypto/hd"
	"github.com/cosmos/go-bip39"
	"github.com/ethereum/go-ethereum/common/math"
	"github.com/ethereum/go-ethereum/crypto"
)

type Bip44Keychain struct {
	masterSeed [32]byte
	chainCode  [32]byte
}

func FromSeedPhrase(seedPhrase, password string) (*Bip44Keychain, error) {
	seedBytes, err := bip39.NewSeedWithErrorChecking(seedPhrase, password)
	if err != nil {
		return nil, fmt.Errorf("failed to convert seed phrase to seed: %w", err)
	}

	masterKey, chainCode := hd.ComputeMastersFromSeed(seedBytes)
	return &Bip44Keychain{
		masterSeed: masterKey,
		chainCode:  chainCode,
	}, nil
}

func (k *Bip44Keychain) PublicKey(keyID [4]byte) (pubKey []byte, err error) {
	derivationPath, err := derivationPathFromKeyID([4]byte(keyID))
	if err != nil {
		return nil, err
	}

	privKeySeed, err := k.getSeedFromPath(derivationPath)
	if err != nil {
		return nil, err
	}

	pubKey, err = generateECDSAPubKey(privKeySeed)
	if err != nil {
		return nil, err
	}

	return pubKey, nil
}

func (k *Bip44Keychain) Sign(keyID [4]byte, message []byte) ([]byte, error) {
	derivationPath, err := derivationPathFromKeyID([4]byte(keyID))
	if err != nil {
		return nil, err
	}

	privKeySeed, err := k.getSeedFromPath(derivationPath)
	if err != nil {
		return nil, err
	}

	sig, err := generateECDSASignature(privKeySeed, message, true)
	if err != nil {
		return nil, err
	}

	return sig, nil
}

// generateECDSASignature generates a valid ECDSA signature over the supplied message with a private key derived from the supplied seed.
// If key derivation fails or the inputs are malformed an error will be returned.
func generateECDSASignature(seed, message []byte, recoveryID bool) ([]byte, error) {
	privateKey, _ := btcec.PrivKeyFromBytes(seed[:])
	ecdsaPriv := privateKey.ToECDSA()
	prvD := math.PaddedBigBytes(ecdsaPriv.D, 32)
	if len(prvD) != 32 {
		return nil, fmt.Errorf("error generating ecdsa private key: Priv key bitlength: %v", 8*len(prvD))
	}
	prv, err := crypto.ToECDSA(prvD)
	if err != nil {
		return nil, fmt.Errorf("error generating ecdsa private key: Error %v. Priv key length: %v", err, 8*len(seed))
	}
	sigBytes, err := crypto.Sign(message, prv)
	if err != nil {
		return nil, fmt.Errorf("error signing msg: %x. error: %v", message, err)
	}

	if len(sigBytes) != 65 {
		return nil, fmt.Errorf("expected a signature long %d bytes, got a signature long %d bytes", 65, len(sigBytes))
	}

	if !recoveryID {
		// Remove the recovery ID [v] from the signature
		sigBytes = sigBytes[0:64]
	}

	return sigBytes, nil
}

// generateECDSAPubKey generates an ECDSA public key from the seed.
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

// derivationPathFromKeyID returns the BIP44 derivation path from the keyID supplied.
func derivationPathFromKeyID(keyID [4]byte) (string, error) {
	idx := toUint32BigEndian(keyID)
	hardenedPath := hd.BIP44Params{
		Purpose:      44,
		CoinType:     60,
		Account:      0,
		Change:       false,
		AddressIndex: idx,
	}.String() + "'" // BIP44 Hardened keys  - https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki#extended-keys
	return hardenedPath, nil
}

// getSeedFromPath returns the derived seed from the BIP44 derivation path.
func (k *Bip44Keychain) getSeedFromPath(derivationPath string) ([]byte, error) {
	derivedSeed, err := hd.DerivePrivateKeyForPath(k.masterSeed, k.chainCode, derivationPath)
	if err != nil {
		return nil, fmt.Errorf("failed to derive private key: %w", err)
	}
	return derivedSeed, nil
}

func toUint32BigEndian(keyID [4]byte) uint32 {
	return binary.BigEndian.Uint32(keyID[:])
}
