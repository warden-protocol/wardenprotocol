package v1beta2

import (
	"crypto/ecdsa"
)

type BlackBoxSignMethodHandler struct {
	key *ecdsa.PublicKey
}

var _ SignMethodHandler = &BlackBoxSignMethodHandler{}

func NewBlackBoxSignMethodHandler(k *Key) (*BlackBoxSignMethodHandler, error) {
	pubkey, err := k.ToECDSASecp256k1()
	if err != nil {
		return nil, err
	}
	return &BlackBoxSignMethodHandler{key: pubkey}, nil
}

func (*BlackBoxSignMethodHandler) Handle(b []byte, m Metadata) (Transfer, error) {
	return Transfer{
		DataForSigning: b,
	}, nil
}
