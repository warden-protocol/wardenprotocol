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
