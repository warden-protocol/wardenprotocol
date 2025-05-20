package common

import (
	"fmt"

	"github.com/ethereum/go-ethereum/accounts/abi"
)

type AbiEncoder struct {
	supportedTypeEncoders map[string]abi.Arguments
}

func NewAbiEncoder() *AbiEncoder {
	stringType, err := abi.NewType("string", "", nil)
	if err != nil {
		panic(fmt.Errorf("error while creating string type: %w", err))
	}

	uintType, err := abi.NewType("uint256", "", nil)
	if err != nil {
		panic(fmt.Errorf("error while creating uint256 type: %w", err))
	}

	intType, err := abi.NewType("int256", "", nil)
	if err != nil {
		panic(fmt.Errorf("error while creating int256 type: %w", err))
	}

	boolType, err := abi.NewType("bool", "", nil)
	if err != nil {
		panic(fmt.Errorf("error while creating bool type: %w", err))
	}

	addressType, err := abi.NewType("address", "", nil)
	if err != nil {
		panic(fmt.Errorf("error while creating address type: %w", err))
	}

	return &AbiEncoder{
		supportedTypeEncoders: map[string]abi.Arguments{
			"string":  {{Type: stringType}},
			"float":   {{Type: intType}}, // float is represented as int256
			"int256":  {{Type: intType}},
			"uint256": {{Type: uintType}},
			"bool":    {{Type: boolType}},
			"address": {{Type: addressType}},
		},
	}
}

func (ae *AbiEncoder) IsSupportedType(typeName string) bool {
	_, ok := ae.supportedTypeEncoders[typeName]
	return ok
}

func (ae *AbiEncoder) Encode(typeName string, value interface{}) ([]byte, error) {
	encoder, ok := ae.supportedTypeEncoders[typeName]
	if !ok {
		return nil, fmt.Errorf("unsupported type: %s", typeName)
	}

	// Encode the value
	data, err := encoder.Pack(value)
	if err != nil {
		return nil, fmt.Errorf("error while encoding value: %w", err)
	}

	return data, nil
}

func (ae *AbiEncoder) Decode(typeName string, data []byte) (interface{}, error) {
	encoder, ok := ae.supportedTypeEncoders[typeName]
	if !ok {
		return nil, fmt.Errorf("unsupported type: %s", typeName)
	}

	// Decode the data
	value, err := encoder.Unpack(data)
	if err != nil {
		return nil, fmt.Errorf("error while decoding data: %w", err)
	}

	return value[0], nil
}
