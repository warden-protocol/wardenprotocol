package http

import (
	"context"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"net/url"
	"testing"
	"time"

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
	h := NewHandler([]*url.URL{parsedURL}, 5*time.Second)

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

func TestHandler_Execute_WithCborBody(t *testing.T) {
	type testPayload struct {
		Foo string `json:"foo"`
		Bar int    `json:"bar"`
	}

	originalPayload := testPayload{
		Foo: "hello",
		Bar: 42,
	}

	cborBytes, err := cbor.Marshal(originalPayload)
	require.NoError(t, err, "Failed to marshal test payload as CBOR")

	mockServer := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		require.Equal(t, http.MethodPost, r.Method, "Expected POST method")
		require.Equal(t, "application/json", r.Header.Get("Content-Type"), "Handler should send JSON")

		var received testPayload
		err := json.NewDecoder(r.Body).Decode(&received)
		require.NoError(t, err, "Server should decode JSON body")
		require.Equal(t, originalPayload.Foo, received.Foo, "Foo should match")
		require.Equal(t, originalPayload.Bar, received.Bar, "Bar should match")

		respJSON := `{"result":"ok"}`
		w.Header().Set("Content-Type", "application/json")
		_, _ = w.Write([]byte(respJSON))
	}))
	defer mockServer.Close()

	req := generated.HttpRequest{
		Url:    mockServer.URL,
		Method: "POST",
		Body:   cborBytes,
	}

	input, err := prophet.EncodeInputToABI(req, generated.HttpMetaData, "main")
	require.NoError(t, err, "Failed to encode input")

	parsedURL, err := url.Parse(mockServer.URL)
	require.NoError(t, err)
	h := NewHandler([]*url.URL{parsedURL}, 5*time.Second)

	abiEncodedOutput, execErr := h.Execute(context.Background(), input)
	require.NoError(t, execErr, "Execute with CBOR body should not fail")

	decodedOutput, err := prophet.DecodeOutputFromABI[generated.HttpResponse](
		abiEncodedOutput,
		generated.HttpMetaData,
		"main",
	)
	require.NoError(t, err, "Failed to decode ABI output")

	var actualBody interface{}
	err = cbor.Unmarshal(decodedOutput.Body, &actualBody)
	require.NoError(t, err, "Failed to unmarshal response body as CBOR")

	actualBody = convertToStringKeys(actualBody)
	actualJSON, err := json.Marshal(actualBody)
	require.NoError(t, err)

	require.JSONEq(t, `{"result":"ok"}`, string(actualJSON), "Response body should match mock server's JSON")
	require.Equal(t, int64(200), decodedOutput.Status.Int64(), "Status code should be 200")
}

func TestHandler_Execute_URLNotAllowed(t *testing.T) {
	mockServer := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
	}))
	defer mockServer.Close()

	whitelistedURL, _ := url.Parse("http://allowed-domain.com")
	h := NewHandler([]*url.URL{whitelistedURL}, 5*time.Second)

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
