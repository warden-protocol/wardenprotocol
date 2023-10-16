package types

import (
	"crypto/ecdsa"

	"github.com/cosmos/cosmos-sdk/crypto/keys/secp256k1"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/ethereum/go-ethereum/crypto"
)

type FusionWallet struct {
	key *ecdsa.PublicKey
}

var _ Wallet = &FusionWallet{}

func NewFusionWallet(k *Key) (*FusionWallet, error) {
	pubkey, err := k.ToECDSASecp256k1()
	if err != nil {
		return nil, err
	}
	return &FusionWallet{key: pubkey}, nil
}

func (w *FusionWallet) Address() string {
	var pubkey secp256k1.PubKey
	pubkey.Key = crypto.CompressPubkey(w.key)
	bech32Address := sdk.AccAddress(pubkey.Address().Bytes()).String()
	return bech32Address
}
