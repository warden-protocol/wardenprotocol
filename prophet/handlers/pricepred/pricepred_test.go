package pricepred

import (
	"encoding/base64"
	"math/big"
	"reflect"
	"testing"

	"github.com/stretchr/testify/require"
)

func TestDecodeInput(t *testing.T) {
	cases := []struct {
		name     string
		input    string
		expected PricePredictorInputData
	}{
		{
			name:  "single element list",
			input: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZ5unngAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAeAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB2JpdGNvaW4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZ0ZXRoZXIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHdW5pc3dhcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABY=",
			expected: PricePredictorInputData{
				Date:              big.NewInt(1738254238),
				Tokens:            []string{"bitcoin", "tether", "uniswap"},
				Metrics:           []*big.Int{big.NewInt(0), big.NewInt(22)},
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
			requireEqualInt(t, c.expected.Date, decodedInput.Date)
			require.Equal(t, c.expected.Tokens, decodedInput.Tokens)
			for i := range c.expected.Metrics {
				requireEqualInt(t, c.expected.Metrics[i], decodedInput.Metrics[i])
			}
			require.Equal(t, c.expected.FalsePositiveRate, decodedInput.FalsePositiveRate)
		})
	}
}

func TestBuildOutput(t *testing.T) {
	cases := []struct {
		name           string
		inputData      PricePredictorInputData
		req            PredictRequest
		res            PredictResponse
		backtestingRes *BacktestingResponse
		expected       PricePredictorOutputData
	}{
		{
			name: "with backtesting",
			inputData: PricePredictorInputData{
				Metrics: []*big.Int{
					big.NewInt(int64(Count)),
					big.NewInt(int64(P75)),
				},
			},
			req: PredictRequest{
				SolverInput: RequestSolverInput{
					Tokens:        []string{"uniswap", "tether", "bitcoin"},
					TargetDate:    "2022-01-01",
					AdversaryMode: false,
				},
				FalsePositiveRate: 0.01,
			},
			res: PredictResponse{
				SolverOutput: map[string]float64{
					"uniswap": 17.435131034851075,
					"tether":  1.000115715622902,
					"bitcoin": 45820.74676003456,
				},
				SolverReceipt: ResponseSolverReceipt{
					BloomFilter: []byte("BgAAAAAAAAApt1DE"),
					CountItems:  3,
				},
			},
			backtestingRes: &BacktestingResponse{
				SolverOutput: BacktestingSolverOutput{
					Tokens: map[string]BacktestingToken{
						"uniswap": {
							Metrics: BacktestingMetrics{
								Count: 1,
								P75:   2,
							},
						},
						"tether": {
							Metrics: BacktestingMetrics{
								Count: 3,
								P75:   4,
							},
						},
						"bitcoin": {
							Metrics: BacktestingMetrics{
								Count: 5,
								P75:   6,
							},
						},
					},
				},
			},
			expected: PricePredictorOutputData{
				Predictions: []*big.Int{
					float64ToBigInt(17.435131034851075, big.NewFloat(1e16)),
					float64ToBigInt(1.000115715622902, big.NewFloat(1e16)),
					float64ToBigInt(45820.74676003456, big.NewFloat(1e16)),
				},
				SolverReceipt: struct {
					BloomFilter []byte
					CountItems  *big.Int
				}{
					BloomFilter: []byte("BgAAAAAAAAApt1DE"),
					CountItems:  big.NewInt(3),
				},
				Metrics: [][]*big.Int{
					{big.NewInt(1), big.NewInt(2e16)},
					{big.NewInt(3), big.NewInt(4e16)},
					{big.NewInt(5), big.NewInt(6e16)},
				},
			},
		},
	}

	for _, c := range cases {
		t.Run(c.name, func(t *testing.T) {
			actual, err := buildOutputData(c.inputData, c.req, c.res, c.backtestingRes)
			require.NoError(t, err)
			require.Len(t, actual.Metrics, len(c.expected.Metrics))
			for i := range actual.Metrics {
				requireEqualInts(t, c.expected.Metrics[i], actual.Metrics[i])
			}
			requireEqualInts(t, c.expected.Predictions, actual.Predictions)
		})
	}
}

func TestAllMetricNamesCovered(t *testing.T) {
	// this test assumes that the MetricName enum is mapped to the field IDs of
	// the [BacktestingMetrics] struct
	bmType := reflect.TypeOf(BacktestingMetrics{})
	n := bmType.NumField()
	for i := range n {
		inputData := PricePredictorInputData{Metrics: []*big.Int{big.NewInt(int64(i))}}

		req := PredictRequest{
			SolverInput: RequestSolverInput{
				Tokens:        []string{"uniswap", "tether", "bitcoin"},
				TargetDate:    "2022-01-01",
				AdversaryMode: false,
			},
			FalsePositiveRate: 0.01,
		}
		res := PredictResponse{}
		backtestingRes := &BacktestingResponse{}
		actual, err := buildOutputData(inputData, req, res, backtestingRes)
		require.NoError(t, err)
		require.NotEmpty(t, actual)
	}
}

func requireEqualInts(t *testing.T, expected, actual []*big.Int) {
	t.Helper()
	require.Len(t, actual, len(expected))
	for i := range expected {
		requireEqualInt(t, expected[i], actual[i])
	}
}

func requireEqualInt(t *testing.T, expected, actual *big.Int) {
	t.Helper()
	require.Zerof(t, expected.Cmp(actual), "expected %s, got %s", expected, actual)
}
