package pricepred

import (
	"context"
	"net/http"
	"net/url"
	"testing"

	"github.com/stretchr/testify/require"
)

func TestPredict(t *testing.T) {
	t.Skip("this test relies on external HTTP call")

	c := newClient(http.DefaultClient, &url.URL{
		Scheme: "https",
		Host:   "tpc.devnet.wardenprotocol.org",
	})

	ctx := context.Background()
	res, err := c.Predict(ctx, PredictRequest{
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

func TestBacktesting(t *testing.T) {
	t.Skip("this test relies on external HTTP call")

	c := newClient(http.DefaultClient, &url.URL{
		Scheme: "https",
		Host:   "tpc.devnet.wardenprotocol.org",
	})

	ctx := context.Background()
	res, err := c.Backtesting(ctx, BacktestingRequest{
		SolverInput: RequestSolverInput{
			Tokens:        []string{"bitcoin", "tether", "uniswap"},
			TargetDate:    "2025-01-28",
			AdversaryMode: false,
		},
		FalsePositiveRate: 0.01,
	})
	require.NoError(t, err)

	require.NotZero(t, res.SolverOutput.Metrics)
}
