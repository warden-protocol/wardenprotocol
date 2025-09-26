package v1beta3

import (
	"encoding/binary"
	"errors"
	"fmt"
	"slices"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/crypto"
)

func (k *Keychain) AccAddress() sdk.AccAddress {
	bz := make([]byte, 8)
	binary.BigEndian.PutUint64(bz, k.Id)

	h := crypto.Keccak256Hash([]byte("keychain-"), bz)
	addr := h[len(h)-common.AddressLength:]

	return addr
}

func (k *Keychain) IsWriter(address string) bool {
	return slices.Contains(k.Writers, address)
}

func (k *Keychain) IsAdmin(address string) bool {
	return slices.Contains(k.Admins, address)
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

func (k *Keychain) SetFees(fees KeychainFees) {
	k.Fees = fees
}

func (k *Keychain) SetName(name string) error {
	if name == "" {
		return errors.New("name cannot be empty")
	}

	k.Name = name

	return nil
}

func (k *Keychain) SetDescription(description string) {
	k.Description = description
}

func (k *Keychain) SetUrl(url string) {
	k.Url = url
}

func (k *Keychain) SetKeybaseId(keybaseId *KeybaseId) {
	k.KeybaseId = keybaseId
}

func (kf KeychainFees) EnsureValid() error {
	if err := kf.KeyReq.Validate(); err != nil {
		return fmt.Errorf("key req is invalid: %w", err)
	}

	if err := kf.SigReq.Validate(); err != nil {
		return fmt.Errorf("sig req is invalid: %w", err)
	}

	return nil
}

func NewKeybaseId(value string) (*KeybaseId, error) {
	if value == "" {
		return nil, nil
	}

	if len(value) != 16 {
		return nil, errors.New("keybase id must be length of 16")
	}

	return &KeybaseId{Value: value}, nil
}

func (k *Keychain) EnsureSufficientKeyFees(fees sdk.Coins) error {
	return ensureSufficientFees(k.Fees.KeyReq, fees)
}

func (k *Keychain) EnsureSufficientSignFees(fees sdk.Coins) error {
	return ensureSufficientFees(k.Fees.SigReq, fees)
}

func ensureSufficientFees(wantedFees sdk.Coins, maxFees sdk.Coins) error {
	if wantedFees.IsAllLTE(maxFees) {
		return nil
	}

	return fmt.Errorf("keychain fees are not sufficient: wanted %s", wantedFees)
}
