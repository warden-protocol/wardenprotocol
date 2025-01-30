// Package pricepred provides a handler for the price prediction AI model.
package pricepred

import (
	"context"
	"fmt"
	"math/big"
	"net/http"
	"net/url"
	"time"

	"github.com/ethereum/go-ethereum/accounts/abi"
)

// PricePredictorSolidity is a handler for the price prediction AI model,
// wrapping input and output in Solidity ABI types.
type PricePredictorSolidity struct {
	c *client
}

func NewPricePredictorSolidity(url *url.URL) PricePredictorSolidity {
	httpClient := &http.Client{
		Timeout: 30 * time.Second,
	}

	return PricePredictorSolidity{
		c: newClient(httpClient, url),
	}
}

type MetricName int

func MetricNameFromBigInt(n *big.Int) MetricName {
	return MetricName(n.Int64())
}

const (
	Count MetricName = iota
	Mape
	Rmse
	R2
	MaxError
	Dae
	Mae
	Confidence
	Pct1
	Pct5
	Pct10
	Pct15
	Pct20
	Pct25
	Pct50
	P0
	P5
	P10
	P15
	P20
	P25
	P50
	P75
	P95
	P100
)

type InputData struct {
	Date              *big.Int
	Tokens            []string
	Metrics           []*big.Int
	FalsePositiveRate [2]uint64
}

func (s PricePredictorSolidity) Execute(ctx context.Context, input []byte) ([]byte, error) {
	inputData, err := decodeInput(input)
	if err != nil {
		return nil, err
	}

	tm := time.Unix(inputData.Date.Int64(), 0)

	dateStr := tm.Format("2006-01-02")
	req := PredictRequest{
		SolverInput: RequestSolverInput{
			Tokens:        inputData.Tokens,
			TargetDate:    dateStr,
			AdversaryMode: false,
		},
		FalsePositiveRate: float64(inputData.FalsePositiveRate[0]) / float64(inputData.FalsePositiveRate[1]),
	}

	res, err := s.c.Predict(ctx, req)
	if err != nil {
		return nil, err
	}

	var backtestingRes *BacktestingResponse
	if len(inputData.Metrics) > 0 {
		res, err := s.c.Backtesting(ctx, BacktestingRequest{
			SolverInput:       req.SolverInput,
			FalsePositiveRate: req.FalsePositiveRate,
		})
		if err != nil {
			return nil, err
		}

		backtestingRes = &res
	}

	outputData, err := buildOutputData(inputData, req, res, backtestingRes)
	if err != nil {
		return nil, err
	}

	encodedRes, err := encodeOutput(outputData)
	if err != nil {
		return nil, err
	}

	return encodedRes, nil
}

func decodeInput(input []byte) (InputData, error) {
	typ, err := abi.NewType("tuple", "", []abi.ArgumentMarshaling{
		{Name: "date", Type: "uint256"},
		{Name: "tokens", Type: "string[]"},
		{Name: "metrics", Type: "uint256[]"},
		{Name: "falsePositiveRate", Type: "uint64[2]"},
	})
	if err != nil {
		return InputData{}, err
	}

	args := abi.Arguments{
		{Type: typ},
	}

	unpackArgs, err := args.Unpack(input)
	if err != nil {
		return InputData{}, err
	}

	var inputData struct {
		Data InputData
	}
	err = args.Copy(&inputData, unpackArgs)
	if err != nil {
		return InputData{}, err
	}

	return inputData.Data, nil
}

type OutputData struct {
	Predictions []*big.Int
	Metrics     [][]*big.Int
}

func encodeOutput(outputData OutputData) ([]byte, error) {
	typ, err := abi.NewType("tuple", "", []abi.ArgumentMarshaling{
		{Name: "predictions", Type: "uint256[]"},
		{Name: "metrics", Type: "uint256[][]"},
	})
	if err != nil {
		return nil, err
	}

	args := abi.Arguments{
		{
			Type:    typ,
			Name:    "SolverOutput",
			Indexed: false,
		},
	}

	enc, err := args.Pack(outputData)
	if err != nil {
		return nil, err
	}

	return enc, nil
}

func buildOutputData(inputData InputData, req PredictRequest, res PredictResponse, backtestingRes *BacktestingResponse) (OutputData, error) {
	decimals := big.NewFloat(1e16)

	tokenPreds := make([]*big.Int, len(req.SolverInput.Tokens))
	for i, v := range req.SolverInput.Tokens {
		tokenPreds[i] = float64ToBigInt(res.SolverOutput[v], decimals)
	}

	var metrics [][]*big.Int
	if backtestingRes != nil {
		metrics = make([][]*big.Int, len(req.SolverInput.Tokens))
		for i, v := range req.SolverInput.Tokens {
			metrics[i] = make([]*big.Int, len(inputData.Metrics))
			tokenMetrics := backtestingRes.SolverOutput.Tokens[v]
			for j, m := range inputData.Metrics {
				m := MetricNameFromBigInt(m)
				switch m {
				case Count:
					metrics[i][j] = big.NewInt(int64(tokenMetrics.Metrics.Count))
				case Mape:
					metrics[i][j] = float64ToBigInt(tokenMetrics.Metrics.Mape, decimals)
				case Rmse:
					metrics[i][j] = float64ToBigInt(tokenMetrics.Metrics.Rmse, decimals)
				case R2:
					metrics[i][j] = float64ToBigInt(tokenMetrics.Metrics.R2, decimals)
				case MaxError:
					metrics[i][j] = float64ToBigInt(tokenMetrics.Metrics.MaxError, decimals)
				case Dae:
					metrics[i][j] = float64ToBigInt(tokenMetrics.Metrics.Dae, decimals)
				case Mae:
					metrics[i][j] = float64ToBigInt(tokenMetrics.Metrics.Mae, decimals)
				case Confidence:
					metrics[i][j] = float64ToBigInt(tokenMetrics.Metrics.Confidence, decimals)
				case Pct1:
					metrics[i][j] = float64ToBigInt(tokenMetrics.Metrics.Pct1, decimals)
				case Pct5:
					metrics[i][j] = float64ToBigInt(tokenMetrics.Metrics.Pct5, decimals)
				case Pct10:
					metrics[i][j] = float64ToBigInt(tokenMetrics.Metrics.Pct10, decimals)
				case Pct15:
					metrics[i][j] = float64ToBigInt(tokenMetrics.Metrics.Pct15, decimals)
				case Pct20:
					metrics[i][j] = float64ToBigInt(tokenMetrics.Metrics.Pct20, decimals)
				case Pct25:
					metrics[i][j] = float64ToBigInt(tokenMetrics.Metrics.Pct25, decimals)
				case Pct50:
					metrics[i][j] = float64ToBigInt(tokenMetrics.Metrics.Pct50, decimals)
				case P0:
					metrics[i][j] = float64ToBigInt(tokenMetrics.Metrics.P0, decimals)
				case P5:
					metrics[i][j] = float64ToBigInt(tokenMetrics.Metrics.P5, decimals)
				case P10:
					metrics[i][j] = float64ToBigInt(tokenMetrics.Metrics.P10, decimals)
				case P15:
					metrics[i][j] = float64ToBigInt(tokenMetrics.Metrics.P15, decimals)
				case P20:
					metrics[i][j] = float64ToBigInt(tokenMetrics.Metrics.P20, decimals)
				case P25:
					metrics[i][j] = float64ToBigInt(tokenMetrics.Metrics.P25, decimals)
				case P50:
					metrics[i][j] = float64ToBigInt(tokenMetrics.Metrics.P50, decimals)
				case P75:
					metrics[i][j] = float64ToBigInt(tokenMetrics.Metrics.P75, decimals)
				case P95:
					metrics[i][j] = float64ToBigInt(tokenMetrics.Metrics.P95, decimals)
				case P100:
					metrics[i][j] = float64ToBigInt(tokenMetrics.Metrics.P100, decimals)
				default:
					return OutputData{}, fmt.Errorf("invalid requested metric: %d", m)
				}
			}
		}
	}

	return OutputData{
		Predictions: tokenPreds,
		Metrics:     metrics,
	}, nil
}

func float64ToBigInt(f float64, decimals *big.Float) *big.Int {
	n, _ := big.NewFloat(0).Mul(big.NewFloat(f), decimals).Int(nil)
	return n
}

func (s PricePredictorSolidity) Verify(ctx context.Context, input []byte, output []byte) error {
	// todo: verify output
	return nil
}
