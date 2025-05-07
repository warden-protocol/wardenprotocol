package http

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"net/url"
	"testing"
	"time"

	"github.com/stretchr/testify/require"

	"github.com/warden-protocol/wardenprotocol/prophet"
	"github.com/warden-protocol/wardenprotocol/prophet/plugins/http/generated"
)

func TestPlugin_Execute(t *testing.T) {
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

	h := NewPlugin([]*url.URL{parsedURL}, 5*time.Second)

	abiEncodedOutput, execErr := h.Execute(t.Context(), input)
	require.NoError(t, execErr, "Execute should not fail")

	// First decode the ABI encoding
	decodedOutput, err := prophet.DecodeOutputFromABI[generated.HttpResponse](
		abiEncodedOutput,
		generated.HttpMetaData,
		"main",
	)
	require.NoError(t, err, "Failed to decode ABI output")

	// Compare JSON strings after normalizing them
	require.JSONEq(t, jsonResponse, string(decodedOutput.Body), "Response body should match the mock server's JSON")
	require.Equal(t, int64(200), decodedOutput.Status.Int64(), "Status code should be 200")
}

func TestPlugin_Execute_WithCborBody(t *testing.T) {
	type testPayload struct {
		Foo string `json:"foo"`
		Bar int    `json:"bar"`
	}

	originalPayload := testPayload{
		Foo: "hello",
		Bar: 42,
	}

	jsonBytes, err := json.Marshal(originalPayload)
	require.NoError(t, err, "Failed to marshal test payload as JSON")

	mockServer := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		require.Equal(t, http.MethodPost, r.Method, "Expected POST method")
		require.Equal(t, "application/json", r.Header.Get("Content-Type"), "Plugin should send JSON")

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
		Body:   jsonBytes,
	}

	input, err := prophet.EncodeInputToABI(req, generated.HttpMetaData, "main")
	require.NoError(t, err, "Failed to encode input")

	parsedURL, err := url.Parse(mockServer.URL)
	require.NoError(t, err)

	h := NewPlugin([]*url.URL{parsedURL}, 5*time.Second)

	abiEncodedOutput, execErr := h.Execute(t.Context(), input)
	require.NoError(t, execErr, "Execute with JSON body should not fail")

	decodedOutput, err := prophet.DecodeOutputFromABI[generated.HttpResponse](
		abiEncodedOutput,
		generated.HttpMetaData,
		"main",
	)
	require.NoError(t, err, "Failed to decode ABI output")

	require.JSONEq(t, `{"result":"ok"}`, string(decodedOutput.Body), "Response body should match mock server's JSON")
	require.Equal(t, int64(200), decodedOutput.Status.Int64(), "Status code should be 200")
}

func TestPlugin_Execute_URLNotAllowed(t *testing.T) {
	mockServer := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
	}))
	defer mockServer.Close()

	whitelistedURL, _ := url.Parse("http://allowed-domain.com")
	h := NewPlugin([]*url.URL{whitelistedURL}, 5*time.Second)

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

	_, execErr := h.Execute(t.Context(), input)
	require.Error(t, execErr)
	require.Contains(t, execErr.Error(), "URL not allowed by whitelist")
}
