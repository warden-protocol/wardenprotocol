// Package stoicquote provides a handler for the Stoic quote demonstration,
// using the stoicquote_bindings for decoding/encoding ABI data.
package stoicquote

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"time"

	"github.com/warden-protocol/wardenprotocol/prophet/handlers/stoicquote/generated"
)

type StoicQuoteSolidity struct {
	QuoteApiUrl string
}

func (h StoicQuoteSolidity) Execute(ctx context.Context, input []byte) ([]byte, error) {
	output, err := fetchRemoteQuote(ctx, h.QuoteApiUrl)
	if err != nil {
		return nil, fmt.Errorf("failed to fetch remote quote: %w", err)
	}

	out, err := encodeOutput(output)
	if err != nil {
		return nil, fmt.Errorf("encode output: %w", err)
	}

	return out, nil
}

func (h StoicQuoteSolidity) Verify(ctx context.Context, input []byte, output []byte) error {
	decoded, err := decodeOutput(output)
	if err != nil {
		return fmt.Errorf("verify decode output: %w", err)
	}

	if decoded.Data.Author == "" || decoded.Data.Quote == "" {
		return fmt.Errorf("missing author or quote in output")
	}

	return nil
}

func encodeOutput(output generated.StoicQuoteResponse) ([]byte, error) {
	parsedABI, err := generated.StoicQuoteMetaData.GetAbi()
	if err != nil {
		return nil, fmt.Errorf("failed to get ABI: %w", err)
	}

	method, ok := parsedABI.Methods["main"]
	if !ok {
		return nil, fmt.Errorf("method 'main' not found in generated ABI")
	}

	if len(method.Outputs) == 0 {
		return []byte{}, nil
	}

	packed, err := method.Outputs.Pack(output)
	if err != nil {
		return nil, fmt.Errorf("failed to pack output: %w", err)
	}
	return packed, nil
}

func decodeOutput(outputData []byte) (generated.StoicQuoteResponse, error) {
	var out struct {
		OutputData generated.StoicQuoteResponse
	}

	abi, err := generated.StoicQuoteMetaData.GetAbi()
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

func fetchRemoteQuote(ctx context.Context, url string) (response generated.StoicQuoteResponse, err error) {
	var quote generated.StoicQuoteResponse

	ctx, cancel := context.WithTimeout(ctx, 3*time.Second)
	defer cancel()

	req, err := http.NewRequestWithContext(ctx, http.MethodGet, url, nil)
	if err != nil {
		return quote, fmt.Errorf("creating request: %w", err)
	}

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		return quote, fmt.Errorf("request stoic quote: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return quote, fmt.Errorf("stoic quote API returned status %d", resp.StatusCode)
	}

	body, err := io.ReadAll(io.LimitReader(resp.Body, 10*1024*1024)) // 10MB limit
	if err != nil {
		return quote, fmt.Errorf("reading body: %w", err)
	}

	if err := json.Unmarshal(body, &quote); err != nil {
		return quote, fmt.Errorf("unmarshal response: %w", err)
	}

	return quote, nil
}
