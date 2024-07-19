package v1beta3

import (
	"encoding/binary"

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

func (k *Keychain) SetFees(fees *KeychainFees) {
	k.Fees = fees
}

func (k *Keychain) SetDescription(description string) {
	k.Description = description
}
