package arbitraryhttp

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/fxamacker/cbor/v2"
	"github.com/stretchr/testify/require"
	"github.com/warden-protocol/wardenprotocol/prophet/handlers/arbitraryhttp/generated"
)

func TestHandler_Execute(t *testing.T) {
	jsonResponse := `{"bitcoin":{"usd":100000.00}}`

	mockServer := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		_, _ = w.Write([]byte(jsonResponse))
	}))
	defer mockServer.Close()

	input, err := cbor.Marshal(generated.ArbitraryHttpRequest{
		Url:    mockServer.URL,
		Method: "GET",
	})
	require.NoError(t, err, "Failed to marshal request")

	h := NewHandler([]string{mockServer.URL})

	abiEncodedOutput, execErr := h.Execute(context.Background(), input)
	require.NoError(t, execErr, "Execute should not fail")

	// First decode the ABI encoding
	decodedOutput, err := decodeOutput(abiEncodedOutput)
	require.NoError(t, err, "Failed to decode ABI output")

	// Then decode the CBOR body with string keys
	var actualBody interface{}
	err = cbor.Unmarshal(decodedOutput.Body, &actualBody)
	require.NoError(t, err, "Failed to unmarshal response body CBOR")

	// Convert interface{} keys to string keys
	actualBody = convertToStringKeys(actualBody)

	// Convert the actual response back to JSON for consistent comparison
	actualJSON, err := json.Marshal(actualBody)
	require.NoError(t, err, "Failed to marshal actual body to JSON")

	// Compare JSON strings after normalizing them
	require.JSONEq(t, jsonResponse, string(actualJSON), "Response body should match the mock server's JSON")
	require.Equal(t, int64(200), decodedOutput.Status.Int64(), "Status code should be 200")
}

// convertToStringKeys recursively converts map[interface{}]interface{} to map[string]interface{}
func convertToStringKeys(v interface{}) interface{} {
	switch x := v.(type) {
	case map[interface{}]interface{}:
		m := map[string]interface{}{}
		for k, v := range x {
			m[fmt.Sprint(k)] = convertToStringKeys(v)
		}
		return m
	case []interface{}:
		for i, v := range x {
			x[i] = convertToStringKeys(v)
		}
	}
	return v
}

func TestHandler_Verify(t *testing.T) {
	jsonResponse := `{"bitcoin":{"usd":100000.00}}`

	mockServer := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		_, _ = w.Write([]byte(jsonResponse))
	}))
	defer mockServer.Close()

	input, err := cbor.Marshal(generated.ArbitraryHttpRequest{
		Url:    mockServer.URL,
		Method: "GET",
	})
	require.NoError(t, err, "Failed to marshal request")

	h := NewHandler([]string{mockServer.URL})

	encodedOutput, err := h.Execute(context.Background(), input)
	require.NoError(t, err, "Execute should not fail")

	err = h.Verify(context.Background(), input, encodedOutput)
	require.NoError(t, err, "Verify should not fail with valid quote")
}
