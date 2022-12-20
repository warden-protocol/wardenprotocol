package types

import (
	"bytes"

	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/ethereum/go-ethereum/common"
)

// IsEmptyHash returns true if the hash corresponds to an empty ethereum hex hash.
func IsEmptyHash(hash string) bool {
	return bytes.Equal(common.HexToHash(hash).Bytes(), common.Hash{}.Bytes())
}

// IsZeroAddress returns true if the address corresponds to an empty ethereum hex address.
func IsZeroAddress(address string) bool {
	return bytes.Equal(common.HexToAddress(address).Bytes(), common.Address{}.Bytes())
}

// ValidateAddress returns an error if the provided string is either not a hex formatted string address
func ValidateAddress(address string) error {
	if !common.IsHexAddress(address) {
		return sdkerrors.Wrapf(
			sdkerrors.ErrInvalidAddress, "address '%s' is not a valid ethereum hex address",
			address,
		)
	}
	return nil
}

// ValidateNonZeroAddress returns an error if the provided string is not a hex
// formatted string address or is equal to zero
func ValidateNonZeroAddress(address string) error {
	if IsZeroAddress(address) {
		return sdkerrors.Wrapf(
			sdkerrors.ErrInvalidAddress, "address '%s' must not be zero",
			address,
		)
	}
	return ValidateAddress(address)
}
