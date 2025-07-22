package stoicquote

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/stretchr/testify/require"

	"github.com/warden-protocol/wardenprotocol/prophet"
	"github.com/warden-protocol/wardenprotocol/prophet/plugins/stoicquote/generated"
)

func TestPlugin_Execute(t *testing.T) {
	jsonResponse := `{"data":{"author":"Marcus Aurelius","quote":"You have power over your mind - not outside events."}}`

	mockServer := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		_, _ = w.Write([]byte(jsonResponse))
	}))
	defer mockServer.Close()

	var emptyInput []byte

	h := StoicQuoteSolidity{
		QuoteApiUrl: mockServer.URL,
	}

	encodedOutput, execErr := h.Execute(t.Context(), emptyInput)
	require.NoError(t, execErr, "Execute should not fail")

	decodedOutput, err := prophet.DecodeOutputFromABI[generated.StoicQuoteResponse](
		encodedOutput,
		generated.StoicQuoteMetaData,
		"main",
	)
	require.NoError(t, err, "decodeOutput should not fail")

	var expected generated.StoicQuoteResponse

	err = json.Unmarshal([]byte(jsonResponse), &expected)
	require.NoError(t, err, "Should unmarshal the mock server JSON")

	require.Equal(t, expected, decodedOutput, "Output should match the mock server's JSON")
}

func TestPlugin_Verify(t *testing.T) {
	jsonResponse := `{"data":{"author":"Seneca","quote":"Luck is what happens when preparation meets opportunity."}}`

	mockServer := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		_, _ = w.Write([]byte(jsonResponse))
	}))
	defer mockServer.Close()

	var emptyInput []byte

	h := StoicQuoteSolidity{QuoteApiUrl: mockServer.URL}

	encodedOutput, err := h.Execute(t.Context(), emptyInput)
	require.NoError(t, err, "Execute should not fail")

	err = h.Verify(t.Context(), emptyInput, encodedOutput)
	require.NoError(t, err, "Verify should not fail with valid quote")
}
