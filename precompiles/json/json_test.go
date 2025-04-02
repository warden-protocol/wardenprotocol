package json_test

import (
	"fmt"
	"math/big"
	"testing"

	"github.com/stretchr/testify/require"

	jsonprecompile "github.com/warden-protocol/wardenprotocol/precompiles/json"
)

func TestToIntegerCorrectParams(t *testing.T) {
	tests := []struct {
		value         string
		decimalPoints int64
		expectedValue *big.Int
	}{
		{"-1", 2, big.NewInt(-100)},
		{"1", 2, big.NewInt(100)},
		{"0.1", 2, big.NewInt(10)},
		{"0.1", 1, big.NewInt(1)},
		{"0.01", 2, big.NewInt(1)},
		{"0.001", 3, big.NewInt(1)},
		{"0.0001", 4, big.NewInt(1)},
		{"0.00001", 5, big.NewInt(1)},
		{"0.000001", 6, big.NewInt(1)},
	}

	for _, test := range tests {
		t.Run(test.value, func(t *testing.T) {
			result, err := jsonprecompile.ToInteger(test.value, test.decimalPoints)
			if err != nil {
				t.Fatalf("unexpected error: %v", err)
			}
			if result.Cmp(test.expectedValue) != 0 {
				t.Errorf("expected %s, got %s", test.expectedValue.String(), result.String())
			}
		})
	}
}

func TestToIntegerIncorrectParams(t *testing.T) {
	tests := []struct {
		value                string
		decimalPoints        int64
		expectedErrorMessage string
	}{
		{"1E", 2, "failed to convert string to big.Int: 1E"},
	}

	for _, test := range tests {
		t.Run(test.value, func(t *testing.T) {
			_, err := jsonprecompile.ToInteger(test.value, test.decimalPoints)
			require.Error(t, err)
			require.EqualError(t, err, fmt.Sprintf("failed to convert string to big.Int: %s", test.value))
		})
	}
}

func TestToFloatCorrectParams(t *testing.T) {
	tests := []struct {
		expectedValue string
		decimalPoints int64
		input         *big.Int
	}{
		{"-1.0", 2, big.NewInt(-100)},
		{"1.0", 2, big.NewInt(100)},
		{"0.1", 2, big.NewInt(10)},
		{"0.1", 1, big.NewInt(1)},
		{"0.01", 2, big.NewInt(1)},
		{"0.001", 3, big.NewInt(1)},
		{"0.0001", 4, big.NewInt(1)},
		{"0.00001", 5, big.NewInt(1)},
		{"0.000001", 6, big.NewInt(1)},
	}

	for _, test := range tests {
		t.Run(test.expectedValue, func(t *testing.T) {
			result, err := jsonprecompile.ToFloat(test.input, test.decimalPoints)
			if err != nil {
				t.Fatalf("unexpected error: %v", err)
			}
			if result != test.expectedValue {
				t.Errorf("expected %s, got %s", test.expectedValue, result)
			}
		})
	}
}
