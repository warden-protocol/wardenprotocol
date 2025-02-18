// Package arbitraryhttp provides a generalized HTTP FutureHandler that makes an arbitrary HTTP call.
// The input is expected to be CBOR‑encoded with a target URL, HTTP method, and optional request body.
// The handler fetches the HTTP response, attempts to decode the response as JSON, then re‑encodes it as CBOR,
// and finally packs the result into an ABI‑encoded tuple for onchain interactions.
package arbitraryhttp

import (
	"bytes"
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"math/big"
	"net/http"
	"net/url"
	"time"

	"github.com/fxamacker/cbor/v2"
	"github.com/warden-protocol/wardenprotocol/prophet/handlers/arbitraryhttp/generated"
)

// Handler implements the prophet.FutureHandler interface.
type Handler struct {
	httpClient *http.Client
	// whitelist is a list of allowed hostnames.
	// If empty, all URLs are allowed.
	whitelist []string
}

// NewHandler creates a new HTTP handler with the given whitelist.
func NewHandler(whitelist []string) *Handler {
	// Validate whitelist URLs
	for _, urlStr := range whitelist {
		if _, err := url.Parse(urlStr); err != nil {
			// Either log the error or panic, depending on your error handling strategy
			panic(fmt.Sprintf("invalid whitelist URL: %s", urlStr))
		}
	}

	return &Handler{
		httpClient: &http.Client{
			Timeout: 30 * time.Second, // Set an appropriate timeout.
		},
		whitelist: whitelist,
	}
}

// Execute implements the FutureHandler interface.
// It decodes the input, validates the URL, performs the HTTP request,
// converts the HTTP response body (from JSON) into CBOR, and finally ABI‑encodes the output.
func (h *Handler) Execute(ctx context.Context, input []byte) ([]byte, error) {
	// Decode the input from CBOR.
	var reqInput generated.ArbitraryHttpRequest
	if err := cbor.Unmarshal(input, &reqInput); err != nil {
		return nil, fmt.Errorf("failed to unmarshal input: %w", err)
	}

	// Validate the URL.
	parsedURL, err := url.Parse(reqInput.Url)
	if err != nil {
		return nil, fmt.Errorf("invalid URL: %w", err)
	}
	if !h.isWhitelisted(parsedURL) {
		return nil, errors.New("URL not allowed by whitelist")
	}

	// Default HTTP method to GET if not specified.
	method := reqInput.Method
	if method == "" {
		method = http.MethodGet
	}

	// Create the HTTP request.
	req, err := http.NewRequestWithContext(ctx, method, reqInput.Url, bytes.NewReader(reqInput.Body))
	if err != nil {
		return nil, fmt.Errorf("failed to create HTTP request: %w", err)
	}
	if len(reqInput.Body) > 0 {
		req.Header.Set("Content-Type", "application/json")
	}

	// Execute the HTTP call.
	resp, err := h.httpClient.Do(req)
	if err != nil {
		return nil, fmt.Errorf("HTTP request failed: %w", err)
	}
	defer resp.Body.Close()

	// Read the HTTP response body.
	bodyBytes, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, fmt.Errorf("failed to read response body: %w", err)
	}

	// Attempt to parse the response as JSON.
	var jsonData interface{}
	if err := json.Unmarshal(bodyBytes, &jsonData); err != nil {
		// If JSON parsing fails, fall back to using the raw string.
		jsonData = string(bodyBytes)
	}

	// Encode the JSON (or raw string) into CBOR.
	cborBody, err := cbor.Marshal(jsonData)
	if err != nil {
		return nil, fmt.Errorf("failed to marshal response body to CBOR: %w", err)
	}

	// Prepare the output.
	output := generated.ArbitraryHttpResponse{
		Status: big.NewInt(int64(resp.StatusCode)),
		Body:   cborBody,
	}

	// ABI‑encode the output.
	encodedOutput, err := encodeOutput(output)
	if err != nil {
		return nil, fmt.Errorf("failed to ABI‑encode output: %w", err)
	}

	return encodedOutput, nil
}

// Verify checks that the HTTP response has a 200 status code and contains valid CBOR-encoded JSON data
func (h *Handler) Verify(ctx context.Context, input []byte, output []byte) error {
	decoded, err := decodeOutput(output)
	if err != nil {
		return fmt.Errorf("verify decode output: %w", err)
	}

	if decoded.Status.Int64() != 200 {
		return fmt.Errorf("status code is not 200")
	}

	var body map[string]interface{}
	err = cbor.Unmarshal(decoded.Body, &body)
	if err != nil {
		return fmt.Errorf("failed to unmarshal response body: %w", err)
	}

	return nil
}

// isWhitelisted checks if the URL's hostname is in the allowed whitelist.
// If the whitelist is empty, all URLs are allowed.
func (h *Handler) isWhitelisted(u *url.URL) bool {
	if len(h.whitelist) == 0 {
		return true
	}
	hostname := u.Hostname()
	for _, allowed := range h.whitelist {
		// Parse the allowed URL to get its hostname
		allowedURL, err := url.Parse(allowed)
		if err != nil {
			continue
		}
		if hostname == allowedURL.Hostname() {
			return true
		}
	}
	return false
}

// encodeOutput ABI‑encodes the ResponseOutput using the defined ABI.
func encodeOutput(output generated.ArbitraryHttpResponse) ([]byte, error) {
	abiObj, err := generated.ArbitraryHttpMetaData.GetAbi()
	if err != nil {
		return nil, fmt.Errorf("failed to get ABI: %w", err)
	}
	method, ok := abiObj.Methods["main"]
	if !ok {
		return nil, errors.New("ABI method 'main' not found")
	}
	packed, err := method.Outputs.Pack(output)
	if err != nil {
		return nil, fmt.Errorf("failed to pack output: %w", err)
	}
	return packed, nil
}

func decodeOutput(outputData []byte) (generated.ArbitraryHttpResponse, error) {
	var out struct {
		OutputData generated.ArbitraryHttpResponse
	}

	abi, err := generated.ArbitraryHttpMetaData.GetAbi()
	if err != nil {
		return out.OutputData, fmt.Errorf("failed to get ABI: %w", err)
	}

	method, ok := abi.Methods["main"]
	if !ok {
		return out.OutputData, fmt.Errorf("method 'main' not found in generated ABI")
	}

	vals, err := method.Outputs.Unpack(outputData)
	if err != nil {
		return out.OutputData, fmt.Errorf("failed to unpack output data: %w", err)
	}

	err = method.Outputs.Copy(&out, vals)
	if err != nil {
		return out.OutputData, fmt.Errorf("failed to copy output data: %w", err)
	}

	return out.OutputData, nil
}
