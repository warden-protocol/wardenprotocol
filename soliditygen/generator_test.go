package soliditygen

import (
	"testing"

	"github.com/stretchr/testify/require"
)

func TestGenerateContract(t *testing.T) {
	// Input JSON
	inputJSON := []byte(`{
        "symbol": "BTC",
        "amount": 42
    }`)

	// Output JSON
	outputJSON := []byte(`{
        "priceUsd": 31415,
        "timestamp": 1672531200
    }`)

	contract, err := GenerateContract("PricePredictor", "RequestData", inputJSON, "ResponseData", outputJSON)
	require.NoError(t, err)
	require.Regexp(t, `\bcontract\s+PricePredictor\s*{`, contract)
	require.Regexp(t, `\bstruct\s+RequestData\s*{`, contract)
	require.Regexp(t, `\bstruct\s+ResponseData\s*{`, contract)
	require.Contains(t, contract, "symbol;")
	require.Contains(t, contract, "amount;")
	require.Contains(t, contract, "priceUsd;")
	require.Contains(t, contract, "timestamp;")

	// Ensure the function references both top-level structs
	require.Contains(t, contract, "function main(RequestData memory _requestdata)")
	require.Contains(t, contract, "pure returns (ResponseData memory)")
}

func TestGenerateContractWithoutInput(t *testing.T) {
	// Output JSON
	outputJSON := []byte(`{
        "priceUsd": 31415,
        "timestamp": 1672531200
    }`)

	contract, err := GenerateContract("PricePredictor", "", nil, "ResponseData", outputJSON)
	require.NoError(t, err)
	require.Contains(t, contract, "contract PricePredictor")
	require.Contains(t, contract, "struct ResponseData")
	require.Contains(t, contract, "priceUsd;")
	require.Contains(t, contract, "timestamp;")

	// Ensure the function references the top-level struct
	require.Contains(t, contract, "pure returns (ResponseData memory)")
}

func TestGenerateContractErrors(t *testing.T) {
	tests := []struct {
		name         string
		contractName string
		inputJSON    []byte
		outputJSON   []byte
		wantErr      string
	}{
		{
			name:         "invalid input json",
			contractName: "Test",
			inputJSON:    []byte(`{invalid`),
			outputJSON:   []byte(`{}`),
			wantErr:      "unmarshaling input JSON",
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			_, err := GenerateContract(tt.contractName, "Input", tt.inputJSON, "Output", tt.outputJSON)
			require.Error(t, err)
			require.Contains(t, err.Error(), tt.wantErr)
		})
	}
}
