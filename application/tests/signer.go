package tests

import (
	"fmt"

	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/crypto"

	"github.com/cosmos/cosmos-sdk/crypto/keyring"
	cryptotypes "github.com/cosmos/cosmos-sdk/crypto/types"
	sdk "github.com/cosmos/cosmos-sdk/types"

	"github.com/evmos/ethermint/crypto/ethsecp256k1"
)

// NewAddrKey generates an Ethereum address and its corresponding private key.
func NewAddrKey() (common.Address, cryptotypes.PrivKey) {
	privkey, _ := ethsecp256k1.GenerateKey()
	key, err := privkey.ToECDSA()
	if err != nil {
		return common.Address{}, nil
	}

	addr := crypto.PubkeyToAddress(key.PublicKey)

	return addr, privkey
}

// GenerateAddress generates an Ethereum address.
func GenerateAddress() common.Address {
	addr, _ := NewAddrKey()
	return addr
}

var _ keyring.Signer = &Signer{}

// Signer defines a type that is used on testing for signing MsgEthereumTx
type Signer struct {
	privKey cryptotypes.PrivKey
}

func NewSigner(sk cryptotypes.PrivKey) keyring.Signer {
	return &Signer{
		privKey: sk,
	}
}

// Sign signs the message using the underlying private key
func (s Signer) Sign(_ string, msg []byte) ([]byte, cryptotypes.PubKey, error) {
	if s.privKey.Type() != ethsecp256k1.KeyType {
		return nil, nil, fmt.Errorf(
			"invalid private key type for signing ethereum tx; expected %s, got %s",
			ethsecp256k1.KeyType,
			s.privKey.Type(),
		)
	}

	sig, err := s.privKey.Sign(msg)
	if err != nil {
		return nil, nil, err
	}

	return sig, s.privKey.PubKey(), nil
}

// SignByAddress sign byte messages with a user key providing the address.
func (s Signer) SignByAddress(address sdk.Address, msg []byte) ([]byte, cryptotypes.PubKey, error) {
	signer := sdk.AccAddress(s.privKey.PubKey().Address())
	if !signer.Equals(address) {
		return nil, nil, fmt.Errorf("address mismatch: signer %s ≠ given address %s", signer, address)
	}

	return s.Sign("", msg)
}
