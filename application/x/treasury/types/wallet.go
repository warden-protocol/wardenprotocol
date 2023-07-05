package types

import (
	"fmt"
)

type WalletI interface {
	// Address returns a human readable version of the address.
	Address() string
}

var ErrUnknownWalletType = fmt.Errorf("unknown type")

func NewWalletI(w *Wallet, k *Key) (WalletI, error) {
	if w.KeyId != k.Id {
		return nil, fmt.Errorf("invalid key id, wallet wants key with id %d, got key with id %d", w.KeyId, k.Id)
	}

	switch w.Type {
	case WalletType_WALLET_TYPE_ETHEREUM:
		return NewEthereumWallet(w, k)
	}

	return nil, ErrUnknownWalletType
}
