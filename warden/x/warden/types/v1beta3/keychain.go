package v1beta3

import (
	"encoding/binary"
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k *Keychain) AccAddress() sdk.AccAddress {
	bz := make([]byte, 8)
	binary.BigEndian.PutUint64(bz, k.Id)
	addr := append([]byte("keychain-"), bz...)
	return addr
}

func (k *Keychain) IsWriter(address string) bool {
	for _, w := range k.Writers {
		if w == address {
			return true
		}
	}
	return false
}

func (k *Keychain) IsAdmin(address string) bool {
	for _, admin := range k.Admins {
		if admin == address {
			return true
		}
	}
	return false
}

func (k *Keychain) AddWriter(address string) {
	k.Writers = append(k.Writers, address)
}

func (k *Keychain) AddAdmin(address string) {
	k.Admins = append(k.Admins, address)
}

func (k *Keychain) RemoveAdmin(address string) {
	for i, owner := range k.Admins {
		if owner == address {
			k.Admins = append(k.Admins[:i], k.Admins[i+1:]...)
			return
		}
	}
}

func (k *Keychain) SetFees(fees *KeychainFees) {
	k.Fees = fees
}

func (k *Keychain) SetDescription(description string) {
	k.Description = description
}

func (kf *KeychainFees) EnsureValid() error {
	if err := kf.KeyReq.Validate(); err != nil {
		return fmt.Errorf("key req is invalid: %w", err)
	}

	if err := kf.SigReq.Validate(); err != nil {
		return fmt.Errorf("sig req is invalid: %w", err)
	}

	return nil
}
