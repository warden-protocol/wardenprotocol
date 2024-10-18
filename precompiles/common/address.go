package common

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/ethereum/go-ethereum/common"
)

func Bech32StrFromAddress(address common.Address) string {
	return sdk.AccAddress(address.Bytes()).String()
}

func AddressFromBech32Str(address string) (common.Address, error) {
	accAddress, err := sdk.AccAddressFromBech32(address)
	if err != nil {
		return common.Address{}, err
	}

	return common.BytesToAddress(accAddress.Bytes()), nil
}

func AddressesFromBech32StrItemArray[T any](items []T, addressFunc func(T) string) ([]common.Address, error) {
	ethAddresses := make([]common.Address, 0, len(items))

	for i, item := range items {
		ethAddress, err := AddressFromBech32Str(addressFunc(item))
		if err != nil {
			return nil, err
		}

		ethAddresses[i] = ethAddress
	}

	return ethAddresses, nil
}

func AddressesFromBech32StrArray(items []string) ([]common.Address, error) {
	id := func(i string) string {
		return i
	}

	return AddressesFromBech32StrItemArray(items, id)
}

func MustAddressFromBech32Str(address string) common.Address {
	accAddress, err := AddressFromBech32Str(address)
	if err != nil {
		panic(err)
	}

	return accAddress
}
