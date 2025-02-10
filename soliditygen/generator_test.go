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
	require.Contains(t, contract, "contract PricePredictor")
	require.Contains(t, contract, "struct RequestData")
	require.Contains(t, contract, "struct ResponseData")
	require.Contains(t, contract, "symbol;")
	require.Contains(t, contract, "amount;")
	require.Contains(t, contract, "priceUsd;")
	require.Contains(t, contract, "timestamp;")

	// Ensure the function references both top-level structs
	require.Contains(t, contract, "function main(RequestData memory _requestdata, ResponseData memory _responsedata)")
}
