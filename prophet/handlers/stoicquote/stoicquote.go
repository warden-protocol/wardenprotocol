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

	"github.com/warden-protocol/wardenprotocol/prophet"
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

	out, err := prophet.EncodeOutputToABI(
		output,
		generated.StoicQuoteMetaData,
		"main",
	)
	if err != nil {
		return nil, fmt.Errorf("encode output: %w", err)
	}

	return out, nil
}

func (h StoicQuoteSolidity) Verify(ctx context.Context, input []byte, output []byte) error {
	decoded, err := prophet.DecodeOutputFromABI[generated.StoicQuoteResponse](
		output,
		generated.StoicQuoteMetaData,
		"main",
	)
	if err != nil {
		return fmt.Errorf("verify decode output: %w", err)
	}

	if decoded.Data.Author == "" || decoded.Data.Quote == "" {
		return fmt.Errorf("missing author or quote in output")
	}

	return nil
}

func fetchRemoteQuote(ctx context.Context, url string) (generated.StoicQuoteResponse, error) {
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

	body, err := io.ReadAll(io.LimitReader(resp.Body, 8*1024)) // 8KB limit
	if err != nil {
		return quote, fmt.Errorf("reading body: %w", err)
	}

	if err := json.Unmarshal(body, &quote); err != nil {
		return quote, fmt.Errorf("unmarshal response: %w", err)
	}

	return quote, nil
}
