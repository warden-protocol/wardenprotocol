package v1beta2

import (
	"encoding/binary"

	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k *Keychain) AccAddress() sdk.AccAddress {
	bz := make([]byte, 8)
	binary.BigEndian.PutUint64(bz, k.Id)
	addr := append([]byte("keychain-"), bz...)
	return sdk.AccAddress(addr)
}

func (k *Keychain) IsParty(address string) bool {
	for _, party := range k.Parties {
		if party == address {
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

func (k *Keychain) AddParty(address string) {
	k.Parties = append(k.Parties, address)
}

func (k *Keychain) SetStatus(status bool) {
	k.IsActive = status
}

func (k *Keychain) SetDescription(description string) {
	k.Description = description
}
