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
			expected: "0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000c00000000000000000000000000000000000000000000000000000000000000003000000000000000000000000000000000000000000000018d6e7f01865e90000000000000000000000000000000000000000000000000000002387ffdba3cf9c000000000000000000000000000000000000000000000000026b6b97cf72662000000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000003000000000000000000000000000000000000000000000000000000000000000c060000000000000027c246600000000000000000000000000000000000000000",
		},
	}

	for _, c := range cases {
		t.Run(c.name, func(t *testing.T) {
			bloomFilter, err := base64.StdEncoding.DecodeString("BgAAAAAAAAAnwkZg")
			require.NoError(t, err)

			req := PredictRequest{
				SolverInput: RequestSolverInput{
					Tokens:        c.request,
					TargetDate:    "2022-01-01",
					AdversaryMode: false,
				},
				FalsePositiveRate: 0.01,
			}
			res := PredictResponse{
				SolverOutput: map[string]float64{
					"uniswap": 17.435131034851075,
					"tether":  1.000115715622902,
					"bitcoin": 45820.74676003456,
				},
				SolverReceipt: SolverReceipt{
					BloomFilter: bloomFilter,
					CountItems:  3,
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
	res, err := send[PredictRequest, PredictResponse](ctx, PredictRequest{
		SolverInput: RequestSolverInput{
			Tokens:        []string{"bitcoin", "tether", "uniswap"},
			TargetDate:    "2022-01-01",
			AdversaryMode: false,
		},
		FalsePositiveRate: 0.01,
	}, "https://prediction.devnet.wardenprotocol.org/task/inference/solve")
	require.NoError(t, err)
	require.Len(t, res.SolverOutput, 3)

	for token, pred := range res.SolverOutput {
		require.NotZero(t, pred, "prediction for %t is zero", token)
	}
}
