package http

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"net/http/httptest"
	"net/url"
	"testing"

	"github.com/fxamacker/cbor/v2"
	"github.com/stretchr/testify/require"
	"github.com/warden-protocol/wardenprotocol/prophet"
	"github.com/warden-protocol/wardenprotocol/prophet/handlers/http/generated"
)

func TestHandler_Execute(t *testing.T) {
	jsonResponse := `{"bitcoin":{"usd":100000.00}}`

	mockServer := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		_, _ = w.Write([]byte(jsonResponse))
	}))
	defer mockServer.Close()

	input, err := prophet.EncodeInputToABI(
		generated.HttpRequest{
			Url:    mockServer.URL,
			Method: "GET",
			Body:   nil,
		},
		generated.HttpMetaData,
		"main",
	)
	require.NoError(t, err, "Failed to encode input")

	parsedURL, err := url.Parse(mockServer.URL)
	require.NoError(t, err)
	h := NewHandler([]*url.URL{parsedURL})

	abiEncodedOutput, execErr := h.Execute(context.Background(), input)
	require.NoError(t, execErr, "Execute should not fail")

	// First decode the ABI encoding
	decodedOutput, err := prophet.DecodeOutputFromABI[generated.HttpResponse](
		abiEncodedOutput,
		generated.HttpMetaData,
		"main",
	)
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

func TestHandler_Execute_URLNotAllowed(t *testing.T) {
	mockServer := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
	}))
	defer mockServer.Close()

	whitelistedURL, _ := url.Parse("http://allowed-domain.com")
	h := NewHandler([]*url.URL{whitelistedURL})

	input, err := prophet.EncodeInputToABI(
		generated.HttpRequest{
			Url:    mockServer.URL,
			Method: "GET",
			Body:   nil,
		},
		generated.HttpMetaData,
		"main",
	)
	require.NoError(t, err, "Failed to encode input")

	_, execErr := h.Execute(context.Background(), input)
	require.Error(t, execErr)
	require.Contains(t, execErr.Error(), "URL not allowed by whitelist")
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
