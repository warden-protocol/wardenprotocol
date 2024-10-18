package common

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/ethereum/go-ethereum/common"
)

// Creates bech32 address string from eth address
func Bech32StrFromAddress(address common.Address) string {
	return sdk.AccAddress(address.Bytes()).String()
}

// Creates eth address from bech32 address string
func AddressFromBech32Str(address string) (common.Address, error) {
	accAddress, err := sdk.AccAddressFromBech32(address)
	if err != nil {
		return common.Address{}, err
	}

	return common.BytesToAddress(accAddress.Bytes()), nil
}

func MustAddressFromBech32Str(address string) common.Address {
	accAddress, err := AddressFromBech32Str(address)
	if err != nil {
		panic(err)
	}

	return accAddress
}
