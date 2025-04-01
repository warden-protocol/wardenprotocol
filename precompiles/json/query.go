package json

import (
	"bytes"
	"encoding/json"
	"fmt"
	"math/big"

	gabs "github.com/Jeffail/gabs/v2"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/common"

	wardencommon "github.com/warden-protocol/wardenprotocol/precompiles/common"
)

const (
	RemoveMethod          = "remove"     // +
	GetMethod             = "get"        // +
	GetStringMethod       = "getString"  // +
	GetBoolMethod         = "getBool"    // +
	GetAddressMethod      = "getAddress" // +
	GetInt256Method       = "getInt256"  // +
	GetUint256Method      = "getUint256" // +
	GetFloatMethod        = "getFloat"   // +
	GetStringArrayMethod  = "getStringArray"
	GetUintArrayMethod    = "getUintArray"
	GetIntArrayMethod     = "getIntArray"
	GetBoolArrayMethod    = "getBoolArray"
	GetAddressArrayMethod = "getAddressArray"
	GetObjectsArrayMethod = "getObjectsArray"
	SetStringMethod       = "setString"  // +
	SetBoolMethod         = "setBool"    // +
	SetAddressMethod      = "setAddress" // +
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

// Remove decodes RemoveInput from args, removes value by key.
func (p Precompile) Remove(
	ctx sdk.Context,
	method *abi.Method,
	args []interface{},
) ([]byte, error) {
	input, err := parseInput[RemoveInput](method, args)
	if err != nil {
		return nil, err
	}

	out, err := readJson(input.Input)
	if err != nil {
		return nil, fmt.Errorf("error while parsing input as JSON: %w", err)
	}

	if err := out.DeleteP(input.Key); err != nil {
		return nil, fmt.Errorf("error while removing value in JSON: %w", err)
	}

	encodedJson := out.EncodeJSON()

	return method.Outputs.Pack(encodedJson)
}

// Get decodes GetInput from args, returns value by key.
func (p Precompile) Get(
	ctx sdk.Context,
	method *abi.Method,
	args []interface{},
) ([]byte, error) {
	input, err := parseInput[GetInput](method, args)
	if err != nil {
		return nil, err
	}

	out, err := readJson(input.Input)
	if err != nil {
		return nil, fmt.Errorf("error while parsing input as JSON: %w", err)
	}

	container := out.Path(input.Key)
	if container == nil {
		return nil, fmt.Errorf("value doesn't exist at path: %s", input.Key)
	}

	return method.Outputs.Pack(container.Bytes())
}

// GetString decodes GetInput from args, returns string value by key.
func (p Precompile) GetString(
	ctx sdk.Context,
	method *abi.Method,
	args []interface{},
) ([]byte, error) {
	input, err := parseInput[GetInput](method, args)
	if err != nil {
		return nil, err
	}

	out, err := readJson(input.Input)
	if err != nil {
		return nil, fmt.Errorf("error while parsing input as JSON: %w", err)
	}

	container := out.Path(input.Key)
	if container == nil {
		return nil, fmt.Errorf("value doesn't exist at path: %s", input.Key)
	}

	strValue, ok := container.Data().(string)
	if !ok {
		return nil, fmt.Errorf("value is not a string at path: %s", input.Key)
	}

	return method.Outputs.Pack(strValue)
}

// GetBool decodes GetInput from args, returns boolean value by key.
func (p Precompile) GetBool(
	ctx sdk.Context,
	method *abi.Method,
	args []interface{},
) ([]byte, error) {
	input, err := parseInput[GetInput](method, args)
	if err != nil {
		return nil, err
	}

	out, err := readJson(input.Input)
	if err != nil {
		return nil, fmt.Errorf("error while parsing input as JSON: %w", err)
	}

	container := out.Path(input.Key)
	if container == nil {
		return nil, fmt.Errorf("value doesn't exist at path: %s", input.Key)
	}

	boolValue, ok := container.Data().(bool)
	if !ok {
		return nil, fmt.Errorf("value is not a bool at path: %s", input.Key)
	}

	return method.Outputs.Pack(boolValue)
}

// GetAddress decodes GetInput from args, returns address value by key.
func (p Precompile) GetAddressValue(
	ctx sdk.Context,
	method *abi.Method,
	args []interface{},
) ([]byte, error) {
	input, err := parseInput[GetInput](method, args)
	if err != nil {
		return nil, err
	}

	out, err := readJson(input.Input)
	if err != nil {
		return nil, fmt.Errorf("error while parsing input as JSON: %w", err)
	}

	container := out.Path(input.Key)
	if container == nil || !common.IsHexAddress(container.Data().(string)) {
		return nil, fmt.Errorf("value doesn't exist or is not a valid address at path: %s", input.Key)
	}

	return method.Outputs.Pack(common.HexToAddress(container.Data().(string)))
}

// GetInt256 decodes GetInput from args, returns int256 value by key.
func (p Precompile) GetInt256(
	ctx sdk.Context,
	method *abi.Method,
	args []interface{},
) ([]byte, error) {
	input, err := parseInput[GetInput](method, args)
	if err != nil {
		return nil, err
	}

	out, err := readJson(input.Input)
	if err != nil {
		return nil, fmt.Errorf("error while parsing input as JSON: %w", err)
	}

	container := out.Path(input.Key)
	if container == nil {
		return nil, fmt.Errorf("value doesn't exist at path: %s", input.Key)
	}

	value, success := new(big.Int).SetString(container.String(), 10)
	if !success {
		return nil, fmt.Errorf("error while parsing int256 value: %w", err)
	}

	return method.Outputs.Pack(value)
}

// GetUint256 decodes GetInput from args, returns uint256 value by key.
func (p Precompile) GetUint256(
	ctx sdk.Context,
	method *abi.Method,
	args []interface{},
) ([]byte, error) {
	input, err := parseInput[GetInput](method, args)
	if err != nil {
		return nil, err
	}

	out, err := readJson(input.Input)
	if err != nil {
		return nil, fmt.Errorf("error while parsing input as JSON: %w", err)
	}

	container := out.Path(input.Key)
	if container == nil {
		return nil, fmt.Errorf("value doesn't exist at path: %s", input.Key)
	}

	value, success := new(big.Int).SetString(container.String(), 10)
	if !success {
		return nil, fmt.Errorf("error while parsing uint256 value: %w", err)
	}

	return method.Outputs.Pack(value)
}

// GetFloat decodes GetInput from args, returns an integer value by key with specified decimal points.
func (p Precompile) GetFloat(
	ctx sdk.Context,
	method *abi.Method,
	args []interface{},
) ([]byte, error) {
	input, err := parseInput[GetFloatInput](method, args)
	if err != nil {
		return nil, err
	}

	val, err := readJson(input.Input)
	if err != nil {
		return nil, fmt.Errorf("error while parsing input as JSON: %w", err)
	}

	jsonNumber, ok := val.Path(input.Key).Data().(json.Number)
	if !ok {
		return nil, fmt.Errorf("value doesn't exist at path: %s", input.Key)
	}

	res, err := GetIntegerFraction(jsonNumber.String(), input.Decimals)
	if err != nil {
		return nil, fmt.Errorf("error while parsing float value: %w", err)
	}

	return method.Outputs.Pack(res)
}

// SetString decodes SetInput from args, adds string value by key to input.
func (p Precompile) SetString(
	ctx sdk.Context,
	method *abi.Method,
	args []interface{},
) ([]byte, error) {
	input, err := parseInput[SetInput[string]](method, args)
	if err != nil {
		return nil, err
	}

	out, err := readJson(input.Input)
	if err != nil {
		return nil, fmt.Errorf("error while parsing input as JSON: %w", err)
	}

	if _, err := out.Set(input.Value, input.Key); err != nil {
		return nil, fmt.Errorf("error while setting value in JSON: %w", err)
	}

	encodedJson := out.EncodeJSON()

	return method.Outputs.Pack(encodedJson)
}

// SetBool decodes SetInput from args, adds boolean value by key to input.
func (p Precompile) SetBool(
	ctx sdk.Context,
	method *abi.Method,
	args []interface{},
) ([]byte, error) {
	input, err := parseInput[SetInput[bool]](method, args)
	if err != nil {
		return nil, err
	}

	out, err := readJson(input.Input)
	if err != nil {
		return nil, fmt.Errorf("error while parsing input as JSON: %w", err)
	}

	if _, err := out.Set(input.Value, input.Key); err != nil {
		return nil, fmt.Errorf("error while setting value in JSON: %w", err)
	}

	encodedJson := out.EncodeJSON()

	return method.Outputs.Pack(encodedJson)
}

// SetAddressValue decodes SetInput from args, adds address value by key to input.
func (p Precompile) SetAddressValue(
	ctx sdk.Context,
	method *abi.Method,
	args []interface{},
) ([]byte, error) {
	input, err := parseInput[SetInput[common.Address]](method, args) // Assuming address is passed as a string
	if err != nil {
		return nil, err
	}

	out, err := readJson(input.Input)
	if err != nil {
		return nil, fmt.Errorf("error while parsing input as JSON: %w", err)
	}

	if _, err := out.Set(input.Value, input.Key); err != nil {
		return nil, fmt.Errorf("error while setting value in JSON: %w", err)
	}

	encodedJson := out.EncodeJSON()

	return method.Outputs.Pack(encodedJson)
}

// SetInt256 decodes SetInput from args, adds int256 value by key to input.
func (p Precompile) SetInt256(
	ctx sdk.Context,
	method *abi.Method,
	args []interface{},
) ([]byte, error) {
	input, err := parseInput[SetInput[*big.Int]](method, args)
	if err != nil {
		return nil, err
	}

	out, err := readJson(input.Input)
	if err != nil {
		return nil, fmt.Errorf("error while parsing input as JSON: %w", err)
	}

	if _, err := out.Set(input.Value, input.Key); err != nil {
		return nil, fmt.Errorf("error while setting value in JSON: %w", err)
	}

	encodedJson := out.EncodeJSON()

	return method.Outputs.Pack(encodedJson)
}

// SetUint256 decodes SetInput from args, adds uint256 value by key to input.
func (p Precompile) SetUint256(
	ctx sdk.Context,
	method *abi.Method,
	args []interface{},
) ([]byte, error) {
	input, err := parseInput[SetInput[*big.Int]](method, args)
	if err != nil {
		return nil, err
	}

	out, err := readJson(input.Input)
	if err != nil {
		return nil, fmt.Errorf("error while parsing input as JSON: %w", err)
	}

	if _, err := out.Set(input.Value, input.Key); err != nil {
		return nil, fmt.Errorf("error while setting value in JSON: %w", err)
	}

	encodedJson := out.EncodeJSON()

	return method.Outputs.Pack(encodedJson)
}

// SetObject decodes SetInput from args, adds uint256 value by key to input.
func (p Precompile) SetObject(
	ctx sdk.Context,
	method *abi.Method,
	args []interface{},
) ([]byte, error) {
	input, err := parseInput[SetInput[[]byte]](method, args)
	if err != nil {
		return nil, err
	}

	out, err := readJson(input.Input)
	if err != nil {
		return nil, fmt.Errorf("error while parsing input as JSON: %w", err)
	}

	valueObject, err := readJson(input.Value)
	if err != nil {
		return nil, fmt.Errorf("error while parsing input as JSON: %w", err)
	}

	if _, err := out.Set(valueObject, input.Key); err != nil {
		return nil, fmt.Errorf("error while setting value in JSON: %w", err)
	}

	encodedJson := out.EncodeJSON()

	return method.Outputs.Pack(encodedJson)
}

func readJson(input []byte) (*gabs.Container, error) {
	dec := json.NewDecoder(bytes.NewReader(input))
	dec.UseNumber()
	return gabs.ParseJSONDecoder(dec)
}

func parseInput[T any](method *abi.Method, args []interface{}) (*T, error) {
	if len(args) != len(method.Inputs) {
		return nil, wardencommon.WrongArgsNumber{Expected: len(method.Inputs), Got: len(args)}
	}

	var input T
	if err := method.Inputs.Copy(&input, args); err != nil {
		return nil, fmt.Errorf("error while unpacking args to struct: %w", err)
	}

	return &input, nil
}
