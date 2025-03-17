package prophet

import (
	"fmt"

	"github.com/ethereum/go-ethereum/accounts/abi/bind"
)

// DecodeInputFromABI decodes `inputData` via the ABI method's Inputs.
//
// - T is the Go struct type you expect to receive from the ABI.
// - metaData is the generated *bind.MetaData (e.g. MyContractMetaData).
// - methodName is the method in the ABI (e.g. "main", "solve", etc.).
func DecodeInputFromABI[T any](inputData []byte, metaData *bind.MetaData, methodName string) (T, error) {
	var wrapper struct {
		Data T
	}

	var result T

	contractABI, err := metaData.GetAbi()
	if err != nil {
		return result, fmt.Errorf("failed to get ABI: %w", err)
	}

	method, ok := contractABI.Methods[methodName]
	if !ok {
		return result, fmt.Errorf("method '%s' not found in ABI", methodName)
	}

	vals, err := method.Inputs.Unpack(inputData)
	if err != nil {
		return result, fmt.Errorf("failed to unpack input data: %w", err)
	}

	if len(vals) != 1 {
		return result, fmt.Errorf("expected 1 argument, got %d", len(vals))
	}

	if err := method.Inputs.Copy(&wrapper, vals); err != nil {
		return result, fmt.Errorf("failed to copy input data: %w", err)
	}

	return wrapper.Data, nil
}

// EncodeInputToABI packs a Go struct T according to the ABI method's Inputs.
// You may or may not need this, depending on whether your contract method
// requires building an "input" payload from the host side.
func EncodeInputToABI[T any](val T, metaData *bind.MetaData, methodName string) ([]byte, error) {
	contractABI, err := metaData.GetAbi()
	if err != nil {
		return nil, fmt.Errorf("failed to get ABI: %w", err)
	}

	method, ok := contractABI.Methods[methodName]
	if !ok {
		return nil, fmt.Errorf("method '%s' not found in ABI", methodName)
	}

	packed, err := method.Inputs.Pack(val)
	if err != nil {
		return nil, fmt.Errorf("failed to pack input data: %w", err)
	}

	return packed, nil
}

// DecodeOutputFromABI unpacks the data via the ABI method's Outputs.
// - T is the Go struct you expect as the contract’s return type.
func DecodeOutputFromABI[T any](outputData []byte, metaData *bind.MetaData, methodName string) (T, error) {
	var wrapper struct {
		Data T
	}

	var result T

	contractABI, err := metaData.GetAbi()
	if err != nil {
		return result, fmt.Errorf("failed to get ABI: %w", err)
	}

	method, ok := contractABI.Methods[methodName]
	if !ok {
		return result, fmt.Errorf("method '%s' not found in ABI", methodName)
	}

	vals, err := method.Outputs.Unpack(outputData)
	if err != nil {
		return result, fmt.Errorf("failed to unpack output data: %w", err)
	}
	// If your method returns multiple values, adjust accordingly.
	if len(vals) != 1 {
		return result, fmt.Errorf("expected 1 return value, got %d", len(vals))
	}

	if err := method.Outputs.Copy(&wrapper, vals); err != nil {
		return result, fmt.Errorf("failed to copy output data: %w", err)
	}

	return wrapper.Data, nil
}

// EncodeOutputToABI packs a Go struct T for the ABI method's Outputs.
func EncodeOutputToABI[T any](val T, metaData *bind.MetaData, methodName string) ([]byte, error) {
	contractABI, err := metaData.GetAbi()
	if err != nil {
		return nil, fmt.Errorf("failed to get ABI: %w", err)
	}

	method, ok := contractABI.Methods[methodName]
	if !ok {
		return nil, fmt.Errorf("method '%s' not found in ABI", methodName)
	}

	packed, err := method.Outputs.Pack(val)
	if err != nil {
		return nil, fmt.Errorf("failed to pack output data: %w", err)
	}

	return packed, nil
}
