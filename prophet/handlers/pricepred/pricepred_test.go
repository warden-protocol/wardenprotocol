package pricepred

import (
	"context"
	"encoding/base64"
	"encoding/hex"
	"math/big"
	"testing"

	"github.com/stretchr/testify/require"
)

func TestDecodeInput(t *testing.T) {
	cases := []struct {
		name     string
		input    string
		expected InputData
	}{
		{
			name:  "single element list",
			input: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZ5NS7AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA0VUSAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
			expected: InputData{
				Date:              big.NewInt(1737708268),
				Tokens:            []string{"ETH"},
				FalsePositiveRate: [2]uint64{1, 100},
			},
		},
	}

	for _, c := range cases {
		t.Run(c.name, func(t *testing.T) {
			bz, err := base64.StdEncoding.DecodeString(c.input)
			require.NoError(t, err)
			decodedInput, err := decodeInput(bz)
			require.NoError(t, err)
			require.Equal(t, c.expected, decodedInput)
		})
	}
}

func TestEncodeOutput(t *testing.T) {
	cases := []struct {
		name     string
		request  []string
		expected string
	}{
		{
			name:     "single element list",
			request:  []string{"bitcoin", "tether", "uniswap"},
			expected: "00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000003000000000000000000000000000000000000000000000018d6e7f01865e90000000000000000000000000000000000000000000000000000002387ffdba3cf9c000000000000000000000000000000000000000000000000026b6b97cf726620",
		},
	}

	for _, c := range cases {
		t.Run(c.name, func(t *testing.T) {
			req := Request{
				SolverInput: RequestSolverInput{
					Tokens:        c.request,
					TargetDate:    "2022-01-01",
					AdversaryMode: false,
				},
				FalsePositiveRate: 0.01,
			}
			res := Response{
				SolverOutput: map[string]float64{
					"uniswap": 17.435131034851075,
					"tether":  1.000115715622902,
					"bitcoin": 45820.74676003456,
				},
			}

			actual, err := encodeOutput(req, res)
			require.NoError(t, err)

			require.Equal(t, c.expected, hex.EncodeToString(actual))
		})
	}
}

func TestPredict(t *testing.T) {
	//t.Skip("this test relies on external HTTP call")

	ctx := context.Background()
	res, err := Predict(ctx, Request{
		SolverInput: RequestSolverInput{
			Tokens:        []string{"bitcoin", "tether", "uniswap"},
			TargetDate:    "2022-01-01",
			AdversaryMode: false,
		},
		FalsePositiveRate: 0.01,
	})
	require.NoError(t, err)
	require.Len(t, res.SolverOutput, 3)

	for token, pred := range res.SolverOutput {
		require.NotZero(t, pred, "prediction for %t is zero", token)
	}
}
