package types

import (
	"crypto/ecdsa"

	"github.com/ethereum/go-ethereum/crypto"
)

type EthereumWallet struct {
	wallet *Wallet
	key    *ecdsa.PublicKey
}

var _ WalletI = &EthereumWallet{}

func NewEthereumWallet(w *Wallet, k *Key) (*EthereumWallet, error) {
	pk, err := k.ToECDSA()
	if err != nil {
		return nil, err
	}
	return &EthereumWallet{wallet: w, key: pk}, nil
}

func (w *EthereumWallet) Address() string {
	addr := crypto.PubkeyToAddress(*w.key)
	return addr.Hex()
}
