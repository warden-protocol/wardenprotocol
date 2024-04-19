package types

import "github.com/ethereum/go-ethereum/accounts/abi"

// These are the types we use to encode and decode data to and from the GMP.
var (
	destinationContractAddressType, _  = abi.NewType("address", "address", nil)
	destinationContractCalldataType, _ = abi.NewType("bytes", "bytes", nil)
)
