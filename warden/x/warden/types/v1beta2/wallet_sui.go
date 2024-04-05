package v1beta2

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
