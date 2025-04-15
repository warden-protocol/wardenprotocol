package json

import (
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
	NewJsonMethod         = "newJson"
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
	WriteMethod           = "write"
	ReadMethod            = "read"
)

// NewJson decodes new json object representation from args, encodes to bytes.
func (p Precompile) NewJson(
	ctx sdk.Context,
	method *abi.Method,
	args []any,
) ([]byte, error) {
	readJson, err := gabs.ParseJSON([]byte("{}"))
	if err != nil {
		return nil, fmt.Errorf("error while parsing input as JSON: %w", err)
	}

	encodedJson := readJson.EncodeJSON()

	return method.Outputs.Pack(encodedJson)
}

// Remove decodes RemoveInput from args, removes value by key.
func (p Precompile) Remove(
	ctx sdk.Context,
	method *abi.Method,
	args []any,
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
	args []any,
) ([]byte, error) {
	return innerGet(ctx, method, args, func(container *gabs.Container, input *GetInput) ([]byte, error) {
		return container.Bytes(), nil
	})
}

// GetString decodes GetInput from args, returns string value by key.
func (p Precompile) GetString(
	ctx sdk.Context,
	method *abi.Method,
	args []any,
) ([]byte, error) {
	return innerGet(ctx, method, args, func(container *gabs.Container, input *GetInput) (string, error) {
		strValue, err := readString(container)
		if err != nil {
			return "", fmt.Errorf("error while parsing string value: %w", err)
		}

		return strValue, nil
	})
}

// GetBool decodes GetInput from args, returns boolean value by key.
func (p Precompile) GetBool(
	ctx sdk.Context,
	method *abi.Method,
	args []any,
) ([]byte, error) {
	return innerGet(ctx, method, args, func(container *gabs.Container, input *GetInput) (bool, error) {
		boolValue, err := readBool(container)
		if err != nil {
			return false, fmt.Errorf("error while parsing bool value: %w", err)
		}

		return boolValue, nil
	})
}

// GetAddress decodes GetInput from args, returns address value by key.
func (p Precompile) GetAddressValue(
	ctx sdk.Context,
	method *abi.Method,
	args []any,
) ([]byte, error) {
	return innerGet(ctx, method, args, func(container *gabs.Container, input *GetInput) (common.Address, error) {
		addressStr, err := readAddress(container)
		if err != nil {
			return common.Address{}, fmt.Errorf("error while parsing address value: %w", err)
		}

		return addressStr, nil
	})
}

// GetInt256 decodes GetInput from args, returns int256 value by key.
func (p Precompile) GetInt256(
	ctx sdk.Context,
	method *abi.Method,
	args []any,
) ([]byte, error) {
	return innerGet(ctx, method, args, func(container *gabs.Container, input *GetInput) (*big.Int, error) {
		value, err := readInt256(container)
		if err != nil {
			return nil, fmt.Errorf("error while parsing int256 value: %w", err)
		}

		return value, nil
	})
}

// GetUint256 decodes GetInput from args, returns uint256 value by key.
func (p Precompile) GetUint256(
	ctx sdk.Context,
	method *abi.Method,
	args []any,
) ([]byte, error) {
	return innerGet(ctx, method, args, func(container *gabs.Container, input *GetInput) (*big.Int, error) {
		value, err := readUint256(container)
		if err != nil {
			return nil, fmt.Errorf("error while parsing uint256 value: %w", err)
		}

		return value, nil
	})
}

// GetFloat decodes GetInput from args, returns an integer value by key with specified decimal points.
func (p Precompile) GetFloat(
	ctx sdk.Context,
	method *abi.Method,
	args []any,
) ([]byte, error) {
	input, err := parseInput[GetFloatInput](method, args)
	if err != nil {
		return nil, err
	}

	val, err := readJson(input.Input)
	if err != nil {
		return nil, fmt.Errorf("error while parsing input as JSON: %w", err)
	}

	container := val.Path(input.Key)
	if container == nil {
		return nil, fmt.Errorf("value doesn't exist at path: %s", input.Key)
	}

	res, err := readFloat(container, input.Decimals)
	if err != nil {
		return nil, fmt.Errorf("error while parsing float value: %w", err)
	}

	return method.Outputs.Pack(res)
}

// GetStringArray decodes GetInput from args, returns string array by key.
func (p Precompile) GetStringArray(
	ctx sdk.Context,
	method *abi.Method,
	args []any,
) ([]byte, error) {
	return innerGet(ctx, method, args, func(container *gabs.Container, input *GetInput) ([]string, error) {
		arrayCount, err := container.ArrayCount()
		if err != nil {
			return nil, fmt.Errorf("error while getting array count: %w", err)
		}
		objectsArray := make([]string, arrayCount)
		for i, v := range container.Children() {
			value, err := readString(v)
			if err != nil {
				return nil, fmt.Errorf("value is not a string array at path: %s %w", input.Key, err)
			}

			objectsArray[i] = value
		}

		return objectsArray, nil
	})
}

// GetUintArray decodes GetInput from args, returns uint array by key.
func (p Precompile) GetUintArray(
	ctx sdk.Context,
	method *abi.Method,
	args []any,
) ([]byte, error) {
	return innerGet(ctx, method, args, func(container *gabs.Container, input *GetInput) ([]*big.Int, error) {
		arrayCount, err := container.ArrayCount()
		if err != nil {
			return nil, fmt.Errorf("error while getting array count: %w", err)
		}
		objectsArray := make([]*big.Int, arrayCount)
		for i, v := range container.Children() {
			value, err := readUint256(v)
			if err != nil {
				return nil, fmt.Errorf("error while parsing uint value at index %d %w", i, err)
			}

			objectsArray[i] = value
		}

		return objectsArray, nil
	})
}

// GetIntArray decodes GetInput from args, returns int array by key.
func (p Precompile) GetIntArray(
	ctx sdk.Context,
	method *abi.Method,
	args []any,
) ([]byte, error) {
	return innerGet(ctx, method, args, func(container *gabs.Container, input *GetInput) ([]*big.Int, error) {
		arrayCount, err := container.ArrayCount()
		if err != nil {
			return nil, fmt.Errorf("error while getting array count: %w", err)
		}
		objectsArray := make([]*big.Int, arrayCount)
		for i, v := range container.Children() {
			value, err := readInt256(v)
			if err != nil {
				return nil, fmt.Errorf("error while parsing int value at index %d %w", i, err)
			}

			objectsArray[i] = value
		}

		return objectsArray, nil
	})
}

// GetFloatArray decodes GetInput from args, returns float array by key.
func (p Precompile) GetFloatArray(
	ctx sdk.Context,
	method *abi.Method,
	args []any,
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
		res, err := readFloat(v, input.Decimals)
		if err != nil {
			return nil, fmt.Errorf("error while parsing float value at index %d: %w", i, err)
		}

		objectsArray[i] = res
	}

	return method.Outputs.Pack(objectsArray)
}

// GetBoolArray decodes GetInput from args, returns bool array by key.
func (p Precompile) GetBoolArray(
	ctx sdk.Context,
	method *abi.Method,
	args []any,
) ([]byte, error) {
	return innerGet(ctx, method, args, func(container *gabs.Container, input *GetInput) ([]bool, error) {
		arrayCount, err := container.ArrayCount()
		if err != nil {
			return nil, fmt.Errorf("error while getting array count: %w", err)
		}

		objectsArray := make([]bool, arrayCount)
		for i, v := range container.Children() {
			value, err := readBool(v)
			if err != nil {
				return nil, fmt.Errorf("element at index %d is not a bool value: %w", i, err)
			}
			objectsArray[i] = value
		}

		return objectsArray, nil
	})
}

// GetAddressArray decodes GetInput from args, returns address array by key.
func (p Precompile) GetAddressArray(
	ctx sdk.Context,
	method *abi.Method,
	args []any,
) ([]byte, error) {
	return innerGet(ctx, method, args, func(container *gabs.Container, input *GetInput) ([]common.Address, error) {
		arrayCount, err := container.ArrayCount()
		if err != nil {
			return nil, fmt.Errorf("error while getting array count: %w", err)
		}

		objectsArray := make([]common.Address, arrayCount)
		for i, v := range container.Children() {
			addressValue, err := readAddress(v)
			if err != nil {
				return nil, fmt.Errorf("element at index %d is not a valid address: %w", i, err)
			}

			objectsArray[i] = addressValue
		}

		return objectsArray, nil
	})
}

// GetObjectsArray decodes GetInput from args, returns objects array by key.
func (p Precompile) GetObjectsArray(
	ctx sdk.Context,
	method *abi.Method,
	args []any,
) ([]byte, error) {
	return innerGet(ctx, method, args, func(container *gabs.Container, input *GetInput) ([][]byte, error) {
		arrayCount, err := container.ArrayCount()
		if err != nil {
			return nil, fmt.Errorf("error while getting array count: %w", err)
		}

		objectsArray := make([][]byte, arrayCount)
		for i, v := range container.Children() {
			objectsArray[i] = v.Bytes()
		}

		return objectsArray, nil
	})
}

// SetString decodes SetInput from args, adds string value by key to input.
func (p Precompile) SetString(
	ctx sdk.Context,
	method *abi.Method,
	args []any,
) ([]byte, error) {
	return innerSet[string](ctx, method, args)
}

// SetAddressValue decodes SetInput from args, adds address value by key to input.
func (p Precompile) SetAddressValue(
	ctx sdk.Context,
	method *abi.Method,
	args []any,
) ([]byte, error) {
	return innerSet[common.Address](ctx, method, args)
}

// SetBool decodes SetInput from args, adds boolean value by key to input.
func (p Precompile) SetBool(
	ctx sdk.Context,
	method *abi.Method,
	args []any,
) ([]byte, error) {
	return innerSet[bool](ctx, method, args)
}

// SetInt256 decodes SetInput from args, adds int256 value by key to input.
func (p Precompile) SetInt256(
	ctx sdk.Context,
	method *abi.Method,
	args []any,
) ([]byte, error) {
	return innerSet[*big.Int](ctx, method, args)
}

// SetUint256 decodes SetInput from args, adds uint256 value by key to input.
func (p Precompile) SetUint256(
	ctx sdk.Context,
	method *abi.Method,
	args []any,
) ([]byte, error) {
	return innerSet[*big.Int](ctx, method, args)
}

// SetFloat decodes SetFloatInput from args, adds float value by key to input.
func (p Precompile) SetFloat(
	ctx sdk.Context,
	method *abi.Method,
	args []any,
) ([]byte, error) {
	input, err := parseInput[SetFloatInput](method, args)
	if err != nil {
		return nil, err
	}

	if err := ensureValidDecimalPoints(input.Decimals); err != nil {
		return nil, fmt.Errorf("error while validating decimal points: %w", err)
	}

	out, err := readJson(input.Input)
	if err != nil {
		return nil, fmt.Errorf("error while parsing input as JSON: %w", err)
	}

	// Convert the value to a string with the specified decimal points
	valueStr, err := ToFloat(input.Value, input.Decimals)
	if err != nil {
		return nil, fmt.Errorf("error while converting value to float: %s, %d", input.Value.String(), input.Decimals)
	}

	if _, err := out.SetP(json.Number(valueStr), input.Key); err != nil {
		return nil, fmt.Errorf("error while setting value in JSON: %w", err)
	}

	encodedJson := out.EncodeJSON()

	return method.Outputs.Pack(encodedJson)
}

// SetObject decodes SetInput from args, adds uint256 value by key to input.
func (p Precompile) SetObject(
	ctx sdk.Context,
	method *abi.Method,
	args []any,
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

	if _, err := out.SetP(valueObject, input.Key); err != nil {
		return nil, fmt.Errorf("error while setting value in JSON: %w", err)
	}

	encodedJson := out.EncodeJSON()

	return method.Outputs.Pack(encodedJson)
}

// SetStringArray decodes SetInput from args, adds string array by key to input.
func (p Precompile) SetStringArray(
	ctx sdk.Context,
	method *abi.Method,
	args []any,
) ([]byte, error) {
	return innerSet[[]string](ctx, method, args)
}

// SetAddressArray decodes SetInput from args, adds address array by key to input.
func (p Precompile) SetAddressArray(
	ctx sdk.Context,
	method *abi.Method,
	args []any,
) ([]byte, error) {
	return innerSet[[]common.Address](ctx, method, args)
}

// SetBoolArray decodes SetInput from args, adds boolean array by key to input.
func (p Precompile) SetBoolArray(
	ctx sdk.Context,
	method *abi.Method,
	args []any,
) ([]byte, error) {
	return innerSet[[]bool](ctx, method, args)
}

// SetUintArray decodes SetInput from args, adds uint array by key to input.
func (p Precompile) SetUintArray(
	ctx sdk.Context,
	method *abi.Method,
	args []any,
) ([]byte, error) {
	return innerSet[[]*big.Int](ctx, method, args)
}

// SetIntArray decodes SetInput from args, adds int array by key to input.
func (p Precompile) SetIntArray(
	ctx sdk.Context,
	method *abi.Method,
	args []any,
) ([]byte, error) {
	return innerSet[[]*big.Int](ctx, method, args)
}

// SetFloatArray decodes SetFloatInput from args, adds float value by key to input.
func (p Precompile) SetFloatArray(
	ctx sdk.Context,
	method *abi.Method,
	args []any,
) ([]byte, error) {
	input, err := parseInput[SetFloatArrayInput](method, args)
	if err != nil {
		return nil, err
	}

	if err := ensureValidDecimalPoints(input.Decimals); err != nil {
		return nil, fmt.Errorf("error while validating decimal points: %w", err)
	}

	out, err := readJson(input.Input)
	if err != nil {
		return nil, fmt.Errorf("error while parsing input as JSON: %w", err)
	}

	if out.ExistsP(input.Key) {
		err := out.DeleteP(input.Key)
		if err != nil {
			return nil, fmt.Errorf("error while overwriting value in JSON: %w", err)
		}
	}

	if _, err := out.ArrayP(input.Key); err != nil {
		return nil, fmt.Errorf("error while creating array in JSON: %w", err)
	}

	for _, v := range input.Value {
		// Convert the value to a string with the specified decimal points
		valueStr, err := ToFloat(v, input.Decimals)
		if err != nil {
			return nil, fmt.Errorf("error while converting value to float: %w", err)
		}

		if err := out.ArrayAppendP(json.Number(valueStr), input.Key); err != nil {
			return nil, fmt.Errorf("error while appending value in JSON: %w", err)
		}
	}

	encodedJson := out.EncodeJSON()

	return method.Outputs.Pack(encodedJson)
}

// SetObjectsArray decodes SetInput from args, adds objects array by key to input.
func (p Precompile) SetObjectsArray(
	ctx sdk.Context,
	method *abi.Method,
	args []any,
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
		err := out.DeleteP(input.Key)
		if err != nil {
			return nil, fmt.Errorf("error while overwriting value in JSON: %w", err)
		}
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

// Read decodes ReadInput from args, returns value by key.
func (p Precompile) Read(
	ctx sdk.Context,
	method *abi.Method,
	args []any,
) ([]byte, error) {
	input, err := parseInput[ReadInput](method, args)
	if err != nil {
		return nil, err
	}

	out, err := readJson(input.Input)
	if err != nil {
		return nil, fmt.Errorf("error while parsing input as JSON: %w", err)
	}

	results := make([][]byte, 0, len(input.KeyValues))
	for _, v := range input.KeyValues {
		container := out.Path(v.Key)
		if container == nil {
			return nil, fmt.Errorf("value doesn't exist at path: %s", v.Key)
		}

		if !p.abiEncoder.IsSupportedType(v.ValueType) {
			return nil, fmt.Errorf("unsupported value type: %s", v.ValueType)
		}

		value, err := parseValue(v, container)
		if err != nil {
			return nil, fmt.Errorf("error while parsing value: %w", err)
		}

		// Define the ABI arguments
		packedValue, err := p.abiEncoder.Encode(v.ValueType, value)
		if err != nil {
			return nil, fmt.Errorf("error while packing string value: %w", err)
		}

		results = append(results, packedValue)
	}

	return method.Outputs.Pack(results)
}

// Write decodes WriteInput from args, returns modified json.
func (p Precompile) Write(
	ctx sdk.Context,
	method *abi.Method,
	args []any,
) ([]byte, error) {
	input, err := parseInput[WriteInput](method, args)
	if err != nil {
		return nil, err
	}

	out, err := readJson(input.Input)
	if err != nil {
		return nil, fmt.Errorf("error while parsing input as JSON: %w", err)
	}

	for _, v := range input.KeyValues {
		if !p.abiEncoder.IsSupportedType(v.ValueType) {
			return nil, fmt.Errorf("unsupported value type: %s", v.ValueType)
		}

		unpackedValue, err := p.abiEncoder.Decode(v.ValueType, v.Value)
		if err != nil {
			return nil, fmt.Errorf("error while unpacking value: %w", err)
		}

		var valueToSet any
		switch v.ValueType {
		case "float":
			floatValue, err := ToFloat(unpackedValue.(*big.Int), v.Decimals)
			if err != nil {
				return nil, fmt.Errorf("error while converting value to float: %w", err)
			}

			valueToSet = json.Number(floatValue)
		default:
			valueToSet = unpackedValue
		}

		if out.ExistsP(v.Key) {
			if err := out.DeleteP(v.Key); err != nil {
				return nil, fmt.Errorf("error while overwriting value in JSON: %w", err)
			}
		}

		if _, err := out.SetP(valueToSet, v.Key); err != nil {
			return nil, fmt.Errorf("error while setting value in JSON: %w", err)
		}
	}

	return method.Outputs.Pack(out.Bytes())
}

func parseValue(
	readKeyValue ReadInputKeyValue,
	container *gabs.Container,
) (any, error) {
	switch readKeyValue.ValueType {
	case "string":
		value, err := readString(container)
		if err != nil {
			return nil, fmt.Errorf("error while parsing string value: %w", err)
		}

		return value, nil
	case "bool":
		value, err := readBool(container)
		if err != nil {
			return nil, fmt.Errorf("error while parsing bool value: %w", err)
		}

		return value, nil
	case "address":
		value, err := readAddress(container)
		if err != nil {
			return nil, fmt.Errorf("error while parsing address value: %w", err)
		}

		return value, nil
	case "int256":
		value, err := readInt256(container)
		if err != nil {
			return nil, fmt.Errorf("error while parsing int256 value: %w", err)
		}

		return value, nil
	case "uint256":
		value, err := readUint256(container)
		if err != nil {
			return nil, fmt.Errorf("error while parsing uint256 value: %w", err)
		}

		return value, nil
	case "float":
		value, err := readFloat(container, readKeyValue.Decimals)
		if err != nil {
			return nil, fmt.Errorf("error while parsing float value: %w", err)
		}

		return value, nil
	default:
		return nil, fmt.Errorf("unsupported value type: %s", readKeyValue.ValueType)
	}
}

func innerGet[T any](
	_ sdk.Context,
	method *abi.Method,
	args []any,
	get func(*gabs.Container, *GetInput) (T, error),
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

	result, err := get(container, input)
	if err != nil {
		return nil, fmt.Errorf("error while getting value from JSON: %w", err)
	}

	return method.Outputs.Pack(result)
}

// innerSet decodes SetInput from args, adds value by key to input.
func innerSet[T any](
	_ sdk.Context,
	method *abi.Method,
	args []any,
) ([]byte, error) {
	input, err := parseInput[SetInput[T]](method, args)
	if err != nil {
		return nil, err
	}

	out, err := readJson(input.Input)
	if err != nil {
		return nil, fmt.Errorf("error while parsing input as JSON: %w", err)
	}

	if out.ExistsP(input.Key) {
		err := out.DeleteP(input.Key)
		if err != nil {
			return nil, fmt.Errorf("error while overwriting value in JSON: %w", err)
		}
	}

	if _, err := out.SetP(input.Value, input.Key); err != nil {
		return nil, fmt.Errorf("error while setting value in JSON: %w", err)
	}

	encodedJson := out.EncodeJSON()

	return method.Outputs.Pack(encodedJson)
}

func parseInput[T any](method *abi.Method, args []any) (*T, error) {
	if len(args) != len(method.Inputs) {
		return nil, wardencommon.WrongArgsNumber{Expected: len(method.Inputs), Got: len(args)}
	}

	var input T
	if err := method.Inputs.Copy(&input, args); err != nil {
		return nil, fmt.Errorf("error while unpacking args to struct: %w", err)
	}

	return &input, nil
}
