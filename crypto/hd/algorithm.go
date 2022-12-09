package hd

import (
	"github.com/btcsuite/btcd/chaincfg"
	"github.com/btcsuite/btcutil/hdkeychain"
	bip39 "github.com/tyler-smith/go-bip39"

	"github.com/ethereum/go-ethereum/accounts"
	"github.com/ethereum/go-ethereum/crypto"

	"github.com/cosmos/cosmos-sdk/crypto/hd"
	"github.com/cosmos/cosmos-sdk/crypto/keyring"
	cryptotypes "github.com/cosmos/cosmos-sdk/crypto/types"

	"github.com/evmos/ethermint/crypto/ethsecp256k1"
)

const (
	// EthSecp256k1Type defines the ECDSA secp256k1 used on Ethereum
	EthSecp256k1Type = hd.PubKeyType(ethsecp256k1.KeyType)
)

var (
	// SupportedAlgorithms defines the list of signing algorithms used on Ethermint:
	//  - eth_secp256k1 (Ethereum)
	//  - secp256k1 (Tendermint)
	SupportedAlgorithms = keyring.SigningAlgoList{EthSecp256k1, hd.Secp256k1}
	// SupportedAlgorithmsLedger defines the list of signing algorithms used on Ethermint for the Ledger device:
	//  - eth_secp256k1 (Ethereum)
	//  - secp256k1 (Tendermint)
	SupportedAlgorithmsLedger = keyring.SigningAlgoList{EthSecp256k1, hd.Secp256k1}
)

// EthSecp256k1Option defines a function keys options for the ethereum Secp256k1 curve.
// It supports eth_secp256k1 and secp256k1 keys for accounts.
func EthSecp256k1Option() keyring.Option {
	return func(options *keyring.Options) {
		options.SupportedAlgos = SupportedAlgorithms
		options.SupportedAlgosLedger = SupportedAlgorithmsLedger
	}
}

var (
	_ keyring.SignatureAlgo = EthSecp256k1

	// EthSecp256k1 uses the Bitcoin secp256k1 ECDSA parameters.
	EthSecp256k1 = ethSecp256k1Algo{}
)

type ethSecp256k1Algo struct{}

// Name returns eth_secp256k1
func (s ethSecp256k1Algo) Name() hd.PubKeyType {
	return EthSecp256k1Type
}

// Derive derives and returns the eth_secp256k1 private key for the given mnemonic and HD path.
func (s ethSecp256k1Algo) Derive() hd.DeriveFn {
	return func(mnemonic, bip39Passphrase, path string) ([]byte, error) {
		hdpath, err := accounts.ParseDerivationPath(path)
		if err != nil {
			return nil, err
		}

		seed, err := bip39.NewSeedWithErrorChecking(mnemonic, bip39Passphrase)
		if err != nil {
			return nil, err
		}

		// create a BTC-utils hd-derivation key chain
		masterKey, err := hdkeychain.NewMaster(seed, &chaincfg.MainNetParams)
		if err != nil {
			return nil, err
		}

		key := masterKey
		for _, n := range hdpath {
			key, err = key.Derive(n)
			if err != nil {
				return nil, err
			}
		}

		// btc-utils representation of a secp256k1 private key
		privateKey, err := key.ECPrivKey()
		if err != nil {
			return nil, err
		}

		// cast private key to a convertible form (single scalar field element of secp256k1)
		// and then load into ethcrypto private key format.
		// TODO: add links to godocs of the two methods or implementations of them, to compare equivalency
		privateKeyECDSA := privateKey.ToECDSA()
		derivedKey := crypto.FromECDSA(privateKeyECDSA)

		return derivedKey, nil
	}
}

// Generate generates a eth_secp256k1 private key from the given bytes.
func (s ethSecp256k1Algo) Generate() hd.GenerateFn {
	return func(bz []byte) cryptotypes.PrivKey {
		bzArr := make([]byte, ethsecp256k1.PrivKeySize)
		copy(bzArr, bz)

		// TODO: modulo P
		return &ethsecp256k1.PrivKey{
			Key: bzArr,
		}
	}
}
