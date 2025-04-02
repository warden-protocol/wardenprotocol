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
	RemoveMethod          = "remove"
	GetMethod             = "get"
	GetStringMethod       = "getString"
	GetBoolMethod         = "getBool"
	GetAddressMethod      = "getAddress"
	GetInt256Method       = "getInt256"
	GetUint256Method      = "getUint256"
	GetFloatMethod        = "getFloat"
	GetStringArrayMethod  = "getStringArray"
	GetUintArrayMethod    = "getUintArray"
	GetIntArrayMethod     = "getIntArray"
	GetFloatArrayMethod   = "getFloatArray"
	GetBoolArrayMethod    = "getBoolArray"
	GetAddressArrayMethod = "getAddressArray"
	GetObjectsArrayMethod = "getObjectsArray"
	SetStringMethod       = "setString"
	SetBoolMethod         = "setBool"
	SetAddressMethod      = "setAddress"
	SetInt256Method       = "setInt256"
	SetUint256Method      = "setUint256"
	SetFloatMethod        = "setFloat"
	SetStringArrayMethod  = "setStringArray"
	SetUintArrayMethod    = "setUintArray"
	SetIntArrayMethod     = "setIntArray"
	SetFloatArrayMethod   = "setFloatArray"
	SetBoolArrayMethod    = "setBoolArray"
	SetAddressArrayMethod = "setAddressArray"
	SetObjectsArrayMethod = "setObjectsArray"
	SetObjectMethod       = "setObject"
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
	if container == nil {
		return nil, fmt.Errorf("value doesn't exist at path: %s", input.Key)
	}

	addressStr, ok := container.Data().(string)
	if !ok || !common.IsHexAddress(addressStr) {
		return nil, fmt.Errorf("value is not a valid address at path: %s", input.Key)
	}

	return method.Outputs.Pack(common.HexToAddress(addressStr))
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

// GetStringArray decodes GetInput from args, returns string array by key.
func (p Precompile) GetStringArray(
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

	arrayCount, err := container.ArrayCount()
	if err != nil {
		return nil, fmt.Errorf("error while getting array count: %w", err)
	}

	objectsArray := make([]string, arrayCount)
	for i, v := range container.Children() {
		value, success := v.Data().(string)
		if !success {
			return nil, fmt.Errorf("value is not a string array at path: %s", input.Key)
		}

		objectsArray[i] = value
	}

	return method.Outputs.Pack(objectsArray)
}

// GetUintArray decodes GetInput from args, returns uint array by key.
func (p Precompile) GetUintArray(
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

	arrayCount, err := container.ArrayCount()
	if err != nil {
		return nil, fmt.Errorf("error while getting array count: %w", err)
	}

	objectsArray := make([]*big.Int, arrayCount)
	for i, v := range container.Children() {
		value, success := new(big.Int).SetString(v.String(), 10)
		if !success {
			return nil, fmt.Errorf("error while parsing uint value at index %d", i)
		}

		objectsArray[i] = value
	}

	return method.Outputs.Pack(objectsArray)
}

// GetIntArray decodes GetInput from args, returns int array by key.
func (p Precompile) GetIntArray(
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

	arrayCount, err := container.ArrayCount()
	if err != nil {
		return nil, fmt.Errorf("error while getting array count: %w", err)
	}

	objectsArray := make([]*big.Int, arrayCount)
	for i, v := range container.Children() {
		value, success := new(big.Int).SetString(v.String(), 10)
		if !success {
			return nil, fmt.Errorf("error while parsing int value at index %d", i)
		}

		objectsArray[i] = value
	}

	return method.Outputs.Pack(objectsArray)
}

// GetBoolArray decodes GetInput from args, returns bool array by key.
func (p Precompile) GetBoolArray(
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

	arrayCount, err := container.ArrayCount()
	if err != nil {
		return nil, fmt.Errorf("error while getting array count: %w", err)
	}

	objectsArray := make([]bool, arrayCount)
	for i, v := range container.Children() {
		value, ok := v.Data().(bool)
		if !ok {
			return nil, fmt.Errorf("element at index %d is not a bool value", i)
		}

		objectsArray[i] = value
	}

	return method.Outputs.Pack(objectsArray)
}

// GetAddressArray decodes GetInput from args, returns address array by key.
func (p Precompile) GetAddressArray(
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

	arrayCount, err := container.ArrayCount()
	if err != nil {
		return nil, fmt.Errorf("error while getting array count: %w", err)
	}

	objectsArray := make([]common.Address, arrayCount)
	for i, v := range container.Children() {
		stringValue, ok := v.Data().(string)
		if !ok || !common.IsHexAddress(stringValue) {
			return nil, fmt.Errorf("element at index %d is not a valid address", i)
		}

		objectsArray[i] = common.HexToAddress(stringValue)
	}

	return method.Outputs.Pack(objectsArray)
}

// GetObjectsArray decodes GetInput from args, returns objects array by key.
func (p Precompile) GetObjectsArray(
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

	arrayCount, err := container.ArrayCount()
	if err != nil {
		return nil, fmt.Errorf("error while getting array count: %w", err)
	}

	array := container.Children()
	objectsArray := make([][]byte, arrayCount)
	for i, v := range array {
		objectsArray[i] = v.Bytes()
	}

	return method.Outputs.Pack(objectsArray)
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

// SetStringArray decodes SetInput from args, adds string array by key to input.
func (p Precompile) SetStringArray(
	ctx sdk.Context,
	method *abi.Method,
	args []interface{},
) ([]byte, error) {
	input, err := parseInput[SetInput[[]string]](method, args)
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

// SetBoolArray decodes SetInput from args, adds boolean array by key to input.
func (p Precompile) SetBoolArray(
	ctx sdk.Context,
	method *abi.Method,
	args []interface{},
) ([]byte, error) {
	input, err := parseInput[SetInput[[]bool]](method, args)
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

// SetUintArray decodes SetInput from args, adds uint array by key to input.
func (p Precompile) SetUintArray(
	ctx sdk.Context,
	method *abi.Method,
	args []interface{},
) ([]byte, error) {
	input, err := parseInput[SetInput[[]*big.Int]](method, args)
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

// SetIntArray decodes SetInput from args, adds int array by key to input.
func (p Precompile) SetIntArray(
	ctx sdk.Context,
	method *abi.Method,
	args []interface{},
) ([]byte, error) {
	input, err := parseInput[SetInput[[]*big.Int]](method, args)
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

// SetAddressArray decodes SetInput from args, adds address array by key to input.
func (p Precompile) SetAddressArray(
	ctx sdk.Context,
	method *abi.Method,
	args []interface{},
) ([]byte, error) {
	input, err := parseInput[SetInput[[]common.Address]](method, args)
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

// SetObjectsArray decodes SetInput from args, adds objects array by key to input.
func (p Precompile) SetObjectsArray(
	ctx sdk.Context,
	method *abi.Method,
	args []interface{},
) ([]byte, error) {
	input, err := parseInput[SetInput[[][]byte]](method, args)
	if err != nil {
		return nil, err
	}

	out, err := readJson(input.Input)
	if err != nil {
		return nil, fmt.Errorf("error while parsing input as JSON: %w", err)
	}

	if out.ExistsP(input.Key) {
		out.DeleteP(input.Key)
	}

	if _, err := out.ArrayP(input.Key); err != nil {
		return nil, fmt.Errorf("error while creating array in JSON: %w", err)
	}

	for _, v := range input.Value {
		valueObject, err := readJson(v)
		if err != nil {
			return nil, fmt.Errorf("error while parsing input as JSON: %w", err)
		}

		if err := out.ArrayAppendP(valueObject, input.Key); err != nil {
			return nil, fmt.Errorf("error while appending value in JSON: %w", err)
		}
	}

	encodedJson := out.EncodeJSON()

	return method.Outputs.Pack(encodedJson)
}

// GetFloatArray decodes GetInput from args, returns float array by key.
func (p Precompile) GetFloatArray(
	ctx sdk.Context,
	method *abi.Method,
	args []interface{},
) ([]byte, error) {
	input, err := parseInput[GetFloatInput](method, args)
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

	arrayCount, err := container.ArrayCount()
	if err != nil {
		return nil, fmt.Errorf("error while getting array count: %w", err)
	}

	objectsArray := make([]*big.Int, arrayCount)
	for i, v := range container.Children() {
		jsonNumber, ok := v.Data().(json.Number)
		if !ok {
			return nil, fmt.Errorf("element at index %d is not a valid number", i)
		}

		res, err := GetIntegerFraction(jsonNumber.String(), input.Decimals)
		if err != nil {
			return nil, fmt.Errorf("error while parsing float value at index %d: %w", i, err)
		}

		objectsArray[i] = res
	}

	return method.Outputs.Pack(objectsArray)
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
