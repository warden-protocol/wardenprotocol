package v1beta2

import (
	"testing"

	"github.com/stretchr/testify/require"
)

func TestParseStdSignDoc(t *testing.T) {
	aminoDoc := `{
	  "chain_id": "osmosis-1",
	  "account_number": "2037934",
	  "sequence": "0",
	  "fee": {
	    "gas": "583061",
	    "amount": [
	      {
	        "amount": "259",
	        "denom": "ibc/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2"
	      }
	    ]
	  },
	  "msgs": [
	    {
	      "type": "osmosis/poolmanager/swap-exact-amount-in",
	      "value": {
	        "sender": "osmo16hmn8nh3fn79ce53fxdmp6p7fpp4mdnc3t80dw",
	        "routes": [
	          {
	            "pool_id": "1400",
	            "token_out_denom": "uosmo"
	          }
	        ],
	        "token_in": {
	          "denom": "ibc/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2",
	          "amount": "500000"
	        },
	        "token_out_min_amount": "4227660"
	      }
	    }
	  ],
	  "memo": "FE",
	  "timeout_height": "14705680"
	}`

	expected := `{"account_number":"2037934","chain_id":"osmosis-1","fee":{"amount":[{"amount":"259","denom":"ibc/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2"}],"gas":"583061"},"memo":"FE","msgs":[{"type":"osmosis/poolmanager/swap-exact-amount-in","value":{"routes":[{"pool_id":"1400","token_out_denom":"uosmo"}],"sender":"osmo16hmn8nh3fn79ce53fxdmp6p7fpp4mdnc3t80dw","token_in":{"amount":"500000","denom":"ibc/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2"},"token_out_min_amount":"4227660"}}],"sequence":"0","timeout_height":"14705680"}`

	res := parseStdSignDoc([]byte(aminoDoc))
	require.Equal(t, expected, string(res))
}
