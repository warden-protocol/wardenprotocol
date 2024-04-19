package types

import "github.com/ethereum/go-ethereum/accounts/abi"

// These are the types we use to encode and decode data to and from the GMP.
var (
	destinationContractAddressType  = must(abi.NewType("address", "address", nil))
	destinationContractCalldataType = must(abi.NewType("bytes", "bytes", nil))
)

func must[T any](t T, err error) T {
	if err != nil {
		panic(err)
	}
	return t
}
