package stoicquote

import (
	"context"
	"encoding/base64"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/stretchr/testify/require"
	"github.com/warden-protocol/wardenprotocol/prophet/handlers/stoicquote/generated"
)

func TestDecodeInput(t *testing.T) {
	inputB64 := "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACnNvbWVhdXRob3IAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlzb21lcXVvdGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=="

	expected := generated.StoicQuoteResponse{
		Data: generated.StoicQuoteData{
			Author: "someauthor",
			Quote:  "somequote",
		},
	}

	bz, err := base64.StdEncoding.DecodeString(inputB64)
	require.NoError(t, err, "should decode base64 input")

	actual, err := decodeInput(bz)
	require.NoError(t, err, "decodeInput should not fail")

	require.Equal(t, expected.Data.Author, actual.Data.Author)
	require.Equal(t, expected.Data.Quote, actual.Data.Quote)
}

func TestHandler_Execute(t *testing.T) {
	mockServer := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		_, _ = w.Write([]byte(`{"data":{"author":"Marcus Aurelius","quote":"You have power over your mind - not outside events."}}`))
	}))
	defer mockServer.Close()

	inputB64 := "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACnNvbWVhdXRob3IAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlzb21lcXVvdGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=="
	inputRaw, err := base64.StdEncoding.DecodeString(inputB64)
	require.NoError(t, err)

	h := Handler{}

	out, execErr := h.Execute(context.Background(), inputRaw)
	require.NoError(t, execErr, "Execute should not fail")

	require.Empty(t, out, "Expected no output from useAllTypes")
}
