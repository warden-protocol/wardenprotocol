package json

import (
	"fmt"
	"math/big"

	gabs "github.com/Jeffail/gabs/v2"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/common"

	wardencommon "github.com/warden-protocol/wardenprotocol/precompiles/common"
)

const (
	RemoveMethod     = "remove"
	GetMethod        = "get"
	SetStringMethod  = "setString"  // +
	SetBoolMethod    = "setBool"    // +
	SetAddressMethod = "setAddress" // +
	// SetBytesMethod        = "setBytes"
	SetInt256Method       = "setInt256"  // +
	SetUint256Method      = "setUint256" // +
	SetStringArrayMethod  = "setStringArray"
	SetUintArrayMethod    = "setUintArray"
	SetIntArrayMethod     = "setIntArray"
	SetBoolArrayMethod    = "setBoolArray"
	SetAddressArrayMethod = "setAddressArray"
	SetObjectsArrayMethod = "setObjectsArray"
	SetObjectMethod       = "setObject" // +
)

// SetString decodes SetInput from args, adds string value by key to input.
func (p Precompile) SetString(
	ctx sdk.Context,
	method *abi.Method,
	args []interface{},
) ([]byte, error) {
	input, err := parseSetInput[string](method, args)
	if err != nil {
		return nil, err
	}

	out, err := gabs.ParseJSON(input.Input)
	if err != nil {
		return nil, fmt.Errorf("error while parsing input as JSON: %w", err)
	}

	out.Set(input.Value, input.Key)

	encodedJson := out.EncodeJSON()

	return method.Outputs.Pack(encodedJson)
}

// SetBool decodes SetInput from args, adds boolean value by key to input.
func (p Precompile) SetBool(
	ctx sdk.Context,
	method *abi.Method,
	args []interface{},
) ([]byte, error) {
	input, err := parseSetInput[bool](method, args)
	if err != nil {
		return nil, err
	}

	out, err := gabs.ParseJSON(input.Input)
	if err != nil {
		return nil, fmt.Errorf("error while parsing input as JSON: %w", err)
	}

	out.Set(input.Value, input.Key)

	encodedJson := out.EncodeJSON()

	return method.Outputs.Pack(encodedJson)
}

// SetAddressValue decodes SetInput from args, adds address value by key to input.
func (p Precompile) SetAddressValue(
	ctx sdk.Context,
	method *abi.Method,
	args []interface{},
) ([]byte, error) {
	input, err := parseSetInput[common.Address](method, args) // Assuming address is passed as a string
	if err != nil {
		return nil, err
	}

	out, err := gabs.ParseJSON(input.Input)
	if err != nil {
		return nil, fmt.Errorf("error while parsing input as JSON: %w", err)
	}

	out.Set(input.Value, input.Key)

	encodedJson := out.EncodeJSON()

	return method.Outputs.Pack(encodedJson)
}

// // SetBytes decodes SetInput from args, adds bytes value by key to input.
// func (p Precompile) SetBytes(
// 	ctx sdk.Context,
// 	method *abi.Method,
// 	args []interface{},
// ) ([]byte, error) {
// 	input, err := parseSetInput[[]byte](method, args)
// 	if err != nil {
// 		return nil, err
// 	}

// 	out, err := gabs.ParseJSON(input.Input)
// 	if err != nil {
// 		return nil, fmt.Errorf("error while parsing input as JSON: %w", err)
// 	}

// 	out.Set(input.Value, input.Key)

// 	encodedJson := out.EncodeJSON()

// 	return method.Outputs.Pack(encodedJson)
// }

// SetInt256 decodes SetInput from args, adds int256 value by key to input.
func (p Precompile) SetInt256(
	ctx sdk.Context,
	method *abi.Method,
	args []interface{},
) ([]byte, error) {
	input, err := parseSetInput[*big.Int](method, args)
	if err != nil {
		return nil, err
	}

	out, err := gabs.ParseJSON(input.Input)
	if err != nil {
		return nil, fmt.Errorf("error while parsing input as JSON: %w", err)
	}

	out.Set(input.Value, input.Key)

	encodedJson := out.EncodeJSON()

	return method.Outputs.Pack(encodedJson)
}

// SetUint256 decodes SetInput from args, adds uint256 value by key to input.
func (p Precompile) SetUint256(
	ctx sdk.Context,
	method *abi.Method,
	args []interface{},
) ([]byte, error) {
	input, err := parseSetInput[*big.Int](method, args)
	if err != nil {
		return nil, err
	}

	out, err := gabs.ParseJSON(input.Input)
	if err != nil {
		return nil, fmt.Errorf("error while parsing input as JSON: %w", err)
	}

	out.Set(input.Value, input.Key)

	encodedJson := out.EncodeJSON()

	return method.Outputs.Pack(encodedJson)
}

// SetObject decodes SetInput from args, adds uint256 value by key to input.
func (p Precompile) SetObject(
	ctx sdk.Context,
	method *abi.Method,
	args []interface{},
) ([]byte, error) {
	input, err := parseSetInput[[]byte](method, args)
	if err != nil {
		return nil, err
	}

	out, err := gabs.ParseJSON(input.Input)
	if err != nil {
		return nil, fmt.Errorf("error while parsing input as JSON: %w", err)
	}

	valueObject, err := gabs.ParseJSON(input.Value)
	if err != nil {
		return nil, fmt.Errorf("error while parsing input as JSON: %w", err)
	}

	out.Set(valueObject, input.Key)

	encodedJson := out.EncodeJSON()

	return method.Outputs.Pack(encodedJson)
}

// parseSetInput parses the input arguments into a SetInput struct.
func parseSetInput[T any](method *abi.Method, args []interface{}) (*SetInput[T], error) {
	if len(args) != 3 {
		return nil, wardencommon.WrongArgsNumber{Expected: 1, Got: len(args)}
	}

	var input SetInput[T]
	if err := method.Inputs.Copy(&input, args); err != nil {
		return nil, fmt.Errorf("error while unpacking args to SetInput struct: %w", err)
	}

	return &input, nil
}
