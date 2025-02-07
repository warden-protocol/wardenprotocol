package soliditygen

import (
	"net/http"
	"net/http/httptest"
	"os"
	"testing"

	"github.com/stretchr/testify/require"
)

// TestWriteSolidityFromURL calls WriteSolidityFromURL with the Stoic Quote API.
// Then checks that the generated Solidity file has the expected structs/fields.
func TestWriteSolidityFromURL(t *testing.T) {
	server := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte(`{
			"data": {
				"author": "Marcus Aurelius",
				"quote": "You have power over your mind - not outside events."
			}
		}`))
	}))
	defer server.Close()

	solFile, err := WriteSolidityFromURL(server.URL, "StoicQuote", ".")
	require.NoError(t, err, "should successfully generate the .sol file")
	defer os.Remove(solFile)

	content, err := os.ReadFile(solFile)
	require.NoError(t, err, "should read generated .sol file")
	solidityCode := string(content)

	require.Contains(t, solidityCode, "contract StoicQuoteTypes",
		"the contract should be named StoicQuoteTypes")

	require.Contains(t, solidityCode, "struct Data",
		"should contain a nested struct named Data")
	require.Contains(t, solidityCode, "string author;",
		"the Data struct should have an 'author' field")
	require.Contains(t, solidityCode, "string quote;",
		"the Data struct should have a 'quote' field")

	require.Contains(t, solidityCode, "struct StoicQuote",
		"should contain the top-level struct named StoicQuote")
	require.Contains(t, solidityCode, "Data data;",
		"StoicQuote should include a 'data' field of type Data")

	require.Contains(t, solidityCode, "function main(",
		"should have the dummy function named main")
	require.Contains(t, solidityCode, "StoicQuote memory _stoicquote",
		"useAllTypes should accept the top-level StoicQuote struct as a parameter")
}
