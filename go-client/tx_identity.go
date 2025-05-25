package client

import (
	"fmt"

	"github.com/btcsuite/btcd/btcec/v2"
	"github.com/cosmos/cosmos-sdk/crypto/hd"
	cryptotypes "github.com/cosmos/cosmos-sdk/crypto/types"
	sdktypes "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/evm/crypto/ethsecp256k1"
	"github.com/cosmos/go-bip39"
)

var DefaultDerivationPath = "m/44'/60'/0'/0/0"

// Identity represents an account on the Warden Protocol. It can be used to sign
// transactions.
type Identity struct {
	Address sdktypes.AccAddress
	PrivKey cryptotypes.PrivKey
}

// NewIdentityFromSeed returns a Identity from a seed phrase.
// This is useful in a mock environment or during testing but should not be used in production.
func NewIdentityFromSeed(seedPhrase string) (Identity, error) {
	// Convert the seed phrase to a seed
	seedBytes, err := bip39.NewSeedWithErrorChecking(seedPhrase, "")
	if err != nil {
		return Identity{}, fmt.Errorf("failed to convert seed phrase to seed: %w", err)
	}

	// Create a master key and derive the desired key
	masterKey, ch := hd.ComputeMastersFromSeed(seedBytes)
	derivedKey, err := hd.DerivePrivateKeyForPath(masterKey, ch, DefaultDerivationPath)
	if err != nil {
		return Identity{}, fmt.Errorf("failed to derive private key: %w", err)
	}

	// Generate a private key object from the bytes
	privKey, _ := btcec.PrivKeyFromBytes(derivedKey)

	cosmosPrivKey := &ethsecp256k1.PrivKey{
		Key: privKey.Serialize(),
	}

	// Get the address of the public key
	addr := sdktypes.AccAddress(cosmosPrivKey.PubKey().Address())

	return Identity{
		Address: addr,
		PrivKey: cosmosPrivKey,
	}, nil
}
