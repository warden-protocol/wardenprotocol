package types

import (
	fmt "fmt"

	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/common"
)

// GmpDecoder is the payload sent from Axelar to IBC middleware.
// It needs to be decoded using the ABI.
type GmpDecoder struct {
	DestinationContractAddress  common.Address
	DestinationContractCalldata []byte
}

// abiSpec is the ABI specification for the GMP data.
var decoderSpec = abi.Arguments{
	{
		Type: destinationContractAddressType,
	},
	{
		Type: destinationContractCalldataType,
	},
}

// NewGmpDecoder decodes a payload from GMP given a byte array
func NewGmpDecoder(payload []byte) (GmpDecoder, error) {
	args, err := decoderSpec.Unpack(payload)
	if err != nil {
		return GmpDecoder{}, err
	}

	// check to make sure each argument is the correct type
	//nolint: all
	if destinationContractAddress, ok := args[0].(common.Address); !ok {
		return GmpDecoder{}, fmt.Errorf("invalid destination contract address type: %T", args[0])
	} else if destinationContractCalldata, ok := args[1].([]byte); !ok {
		return GmpDecoder{}, fmt.Errorf("invalid destination contract command params type: %T", args[1])
	} else {
		return GmpDecoder{
			DestinationContractAddress:  destinationContractAddress,
			DestinationContractCalldata: destinationContractCalldata,
		}, nil
	}
}
