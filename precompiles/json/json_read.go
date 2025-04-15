package json

import (
	"bytes"
	"encoding/json"
	"fmt"
	"math/big"

	gabs "github.com/Jeffail/gabs/v2"
	"github.com/ethereum/go-ethereum/common"
)

func readJson(input []byte) (*gabs.Container, error) {
	dec := json.NewDecoder(bytes.NewReader(input))
	dec.UseNumber()
	return gabs.ParseJSONDecoder(dec)
}

func readString(container *gabs.Container) (string, error) {
	strValue, ok := container.Data().(string)
	if !ok {
		return "", fmt.Errorf("value is not a string at path")
	}

	return strValue, nil
}

func readInt256(container *gabs.Container) (*big.Int, error) {
	value, success := new(big.Int).SetString(container.String(), 10)
	if !success {
		return nil, fmt.Errorf("value is not a valid int256 at path")
	}

	return value, nil
}

func readUint256(container *gabs.Container) (*big.Int, error) {
	value, success := new(big.Int).SetString(container.String(), 10)
	if !success {
		return nil, fmt.Errorf("value is not a valid int256 at path")
	}

	return value, nil
}

func readFloat(container *gabs.Container, decimals int64) (*big.Int, error) {
	if err := ensureValidDecimalPoints(decimals); err != nil {
		return nil, fmt.Errorf("error while validating decimal points: %w", err)
	}

	jsonNumber, ok := container.Data().(json.Number)
	if !ok {
		return nil, fmt.Errorf("value is not a valid number")
	}

	return ToInteger(jsonNumber.String(), decimals)
}

func readBool(container *gabs.Container) (bool, error) {
	boolValue, ok := container.Data().(bool)
	if !ok {
		return false, fmt.Errorf("value is not a bool at path")
	}

	return boolValue, nil
}

func readAddress(container *gabs.Container) (common.Address, error) {
	addressStr, ok := container.Data().(string)
	if !ok || !common.IsHexAddress(addressStr) {
		return common.Address{}, fmt.Errorf("value is not a valid address at path")
	}

	return common.HexToAddress(addressStr), nil
}
