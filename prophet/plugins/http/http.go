// Package arbitraryhttp provides a generalized HTTP Plugin that makes an arbitrary HTTP call.
// The input is ABI‑encoded with a target URL, HTTP method, and a request body in CBOR bytes.
// The plugin fetches the HTTP response, attempts to decode the response as JSON, then re‑encodes it as CBOR,
// and finally packs the result into an ABI‑encoded tuple for onchain interactions.
package http

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
	"strings"
	"time"

	"github.com/fxamacker/cbor/v2"

	"github.com/warden-protocol/wardenprotocol/prophet"
	"github.com/warden-protocol/wardenprotocol/prophet/plugins/http/generated"
)

// Plugin implements the prophet.Plugin interface.
type Plugin struct {
	httpClient *http.Client
	// whitelist is a list of allowed hostnames.
	// If empty, all URLs are allowed.
	whitelist []*url.URL
}

// NewPlugin creates a new HTTP plugin with the given whitelist.
func NewPlugin(whitelist []*url.URL, timeout time.Duration) *Plugin {
	// Validate whitelist URLs
	for _, u := range whitelist {
		if u == nil {
			panic("nil URL in whitelist")
		}

		if u.Host == "" {
			panic(fmt.Sprintf("invalid whitelist URL (missing host): %s", u))
		}
	}

	return &Plugin{
		httpClient: &http.Client{
			Timeout: timeout,
		},
		whitelist: whitelist,
	}
}

// Execute implements the Plugin interface.
// It ABI‑decodes the input, validates the URL, performs the HTTP request,
// converts the HTTP response body (JSON) to CBOR, and ABI‑encodes the output.
func (h *Plugin) Execute(ctx context.Context, input []byte) ([]byte, error) {
	reqInput, err := prophet.DecodeInputFromABI[generated.HttpRequest](
		input,
		generated.HttpMetaData,
		"main",
	)
	if err != nil {
		return nil, fmt.Errorf("failed to decode input from ABI: %w", err)
	}

	parsedURL, err := url.Parse(reqInput.Url)
	if err != nil {
		return nil, fmt.Errorf("invalid URL: %w", err)
	}

	if !h.isWhitelisted(parsedURL) {
		return nil, errors.New("URL not allowed by whitelist")
	}

	method := reqInput.Method
	if method == "" {
		method = http.MethodGet
	}

	bodyToSend := reqInput.Body
	if len(bodyToSend) > 0 {
		var tmp interface{}
		if cborErr := cbor.Unmarshal(bodyToSend, &tmp); cborErr == nil {
			jsonBytes, jerr := cborToJSONBytes(bodyToSend)
			if jerr != nil {
				return nil, fmt.Errorf("failed to re-encode CBOR body to JSON: %w", jerr)
			}

			bodyToSend = jsonBytes
		}
	}

	req, err := http.NewRequestWithContext(ctx, method, reqInput.Url, bytes.NewReader(bodyToSend))
	if err != nil {
		return nil, fmt.Errorf("failed to create HTTP request: %w", err)
	}

	if len(bodyToSend) > 0 {
		req.Header.Set("Content-Type", "application/json")
	}

	resp, err := h.httpClient.Do(req)
	if err != nil {
		return nil, fmt.Errorf("HTTP request failed: %w", err)
	}
	defer resp.Body.Close()

	bodyBytes, err := io.ReadAll(io.LimitReader(resp.Body, 8*1024)) // 8KB limit
	if err != nil {
		return nil, fmt.Errorf("failed to read response body: %w", err)
	}

	var responseData interface{}

	contentType := resp.Header.Get("Content-Type")
	if strings.Contains(contentType, "application/json") {
		if err := json.Unmarshal(bodyBytes, &responseData); err != nil {
			return nil, fmt.Errorf("failed to parse JSON response: %w", err)
		}
	} else {
		responseData = string(bodyBytes)
	}

	cborBody, err := cbor.Marshal(responseData)
	if err != nil {
		return nil, fmt.Errorf("failed to marshal response body to CBOR: %w", err)
	}

	output := generated.HttpResponse{
		Status: big.NewInt(int64(resp.StatusCode)),
		Body:   cborBody,
	}

	encodedOutput, err := prophet.EncodeOutputToABI(
		output,
		generated.HttpMetaData,
		"main",
	)
	if err != nil {
		return nil, fmt.Errorf("failed to ABI‑encode output: %w", err)
	}

	return encodedOutput, nil
}

func (h *Plugin) Verify(ctx context.Context, input []byte, output []byte) error {
	return nil
}

func (h *Plugin) isWhitelisted(u *url.URL) bool {
	if len(h.whitelist) == 0 {
		return true
	}

	host := u.Host
	for _, allowed := range h.whitelist {
		if host == allowed.Host {
			return true
		}
	}

	return false
}

func cborToJSONBytes(cborData []byte) ([]byte, error) {
	var i interface{}
	if err := cbor.Unmarshal(cborData, &i); err != nil {
		return nil, err
	}

	i = convertToStringKeys(i)

	return json.Marshal(i)
}

// convertToStringKeys recursively converts map[interface{}]interface{} to map[string]interface{}.
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
