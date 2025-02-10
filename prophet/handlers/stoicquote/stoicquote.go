// Package stoicquote provides a handler for the Stoic quote demonstration,
// using the stoicquote_bindings for decoding/encoding ABI data.
package stoicquote

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"

	"github.com/warden-protocol/wardenprotocol/prophet"
	"github.com/warden-protocol/wardenprotocol/prophet/handlers/stoicquote/generated"
)

type Handler struct{}

var _ prophet.FutureHandler = (*Handler)(nil)

func (h Handler) Execute(ctx context.Context, input []byte) ([]byte, error) {
	inStoicQuote, err := decodeInput(input)
	if err != nil {
		return nil, fmt.Errorf("decode input: %w", err)
	}

	respAuthor, respQuote, err := fetchRemoteQuote(ctx, "https://stoic.tekloon.net/stoic-quote")
	if err != nil {
		return nil, fmt.Errorf("failed to fetch remote quote: %w", err)
	}

	inStoicQuote.Data.Author = respAuthor
	inStoicQuote.Data.Quote = respQuote

	out, err := encodeOutput(inStoicQuote)
	if err != nil {
		return nil, fmt.Errorf("encode output: %w", err)
	}

	return out, nil
}

func (h Handler) Verify(ctx context.Context, input []byte, output []byte) error {
	return nil
}

func decodeInput(inputData []byte) (generated.StoicQuoteResponse, error) {
	var in struct {
		Stoicquote generated.StoicQuoteResponse
	}

	parsedABI, err := generated.StoicQuoteMetaData.GetAbi()
	if err != nil {
		return in.Stoicquote, fmt.Errorf("failed to get ABI: %w", err)
	}

	method, ok := parsedABI.Methods["useAllTypes"]
	if !ok {
		return in.Stoicquote, fmt.Errorf("method 'useAllTypes' not found in generated ABI")
	}

	vals, err := method.Inputs.Unpack(inputData)
	if err != nil {
		return in.Stoicquote, fmt.Errorf("failed to unpack input data: %w", err)
	}
	if len(vals) != 1 {
		return in.Stoicquote, fmt.Errorf("expected 1 argument (_stoicquote), got %d", len(vals))
	}

	if err := method.Inputs.Copy(&in, vals); err != nil {
		return in.Stoicquote, fmt.Errorf("failed to copy input data: %w", err)
	}

	return in.Stoicquote, nil
}

func encodeOutput(outStoicQuote generated.StoicQuoteResponse) ([]byte, error) {
	parsedABI, err := generated.StoicQuoteMetaData.GetAbi()
	if err != nil {
		return nil, fmt.Errorf("failed to get ABI: %w", err)
	}

	method, ok := parsedABI.Methods["useAllTypes"]
	if !ok {
		return nil, fmt.Errorf("method 'useAllTypes' not found in generated ABI")
	}

	if len(method.Outputs) == 0 {
		return []byte{}, nil
	}

	// packed, err := method.Outputs.Pack(outStoicQuote)
	// return packed, err

	return []byte{}, nil
}

type stoicAPIResponse struct {
	Data struct {
		Author string `json:"author"`
		Quote  string `json:"quote"`
	} `json:"data"`
}

func fetchRemoteQuote(ctx context.Context, url string) (author, quote string, err error) {
	req, err := http.NewRequestWithContext(ctx, http.MethodGet, url, nil)
	if err != nil {
		return "", "", fmt.Errorf("creating request: %w", err)
	}

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		return "", "", fmt.Errorf("request stoic quote: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return "", "", fmt.Errorf("stoic quote API returned status %d", resp.StatusCode)
	}

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return "", "", fmt.Errorf("reading body: %w", err)
	}

	var apiResp stoicAPIResponse
	if err := json.Unmarshal(body, &apiResp); err != nil {
		return "", "", fmt.Errorf("unmarshal response: %w", err)
	}

	return apiResp.Data.Author, apiResp.Data.Quote, nil
}
