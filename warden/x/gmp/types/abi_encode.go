package types

import (
	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/common"
)

const (
	// TypeUnrecognized means coin type is unrecognized
	TypeUnrecognized = iota
	// TypeGeneralMessage is a pure message
	TypeGeneralMessage
	// TypeGeneralMessageWithToken is a general message with token
	TypeGeneralMessageWithToken
	// TypeSendToken is a direct token transfer
	TypeSendToken
)

// GmpEncoder is the struct we use to encode the data we want to send to the GMP.
type GmpEncoder struct {
	DestinationContractAddress  common.Address
	DestinationContractCalldata []byte
}

// encoderSpec is the ABI specification for the GMP data.
var encoderSpec = abi.Arguments{
	{
		Type: destinationContractAddressType,
	},
	{
		Type: destinationContractCalldataType,
	},
}

// GMPEncode encodes the GMP data into a byte array.
func (g GmpEncoder) GMPEncode() ([]byte, error) {
	return encoderSpec.Pack(g.DestinationContractAddress, g.DestinationContractCalldata)
}

func NewGMPEncoder(
	destinationContractAddress common.Address,
	destinationContractCalldata []byte,
) GmpEncoder {
	return GmpEncoder{
		DestinationContractAddress:  destinationContractAddress,
		DestinationContractCalldata: destinationContractCalldata,
	}
}
