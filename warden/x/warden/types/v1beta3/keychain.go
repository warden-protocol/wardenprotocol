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

func (k *Keychain) EnsureSufficientKeyFees(fees sdk.Coins) error {
	return ensureSufficientFees(k.Fees.KeyReq, fees)
}

func (k *Keychain) EnsureSufficientSignFees(fees sdk.Coins) error {
	return ensureSufficientFees(k.Fees.SigReq, fees)
}

func ensureSufficientFees(wantedFees sdk.Coins, maxFees sdk.Coins) error {
	if maxFees.Empty() || wantedFees.Empty() {
		return fmt.Errorf("fees cannot be empty")
	}

	if !wantedFees.DenomsSubsetOf(maxFees) {
		return fmt.Errorf("fee denominations do not match: wanted %s", wantedFees)
	}

	if wantedFees.IsAllLTE(maxFees) {
		return nil
	}

	return fmt.Errorf("keychain fees are not sufficient: wanted %s", wantedFees)
}
