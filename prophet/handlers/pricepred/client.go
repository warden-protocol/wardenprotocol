package pricepred

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"time"
)

type client struct {
	c              *http.Client
	predictURL     string
	backtestingURL string
}

func newClient(c *http.Client, baseURL *url.URL) *client {
	predictURL := baseURL.JoinPath("/api/task/inference/solve")
	backtestingURL := baseURL.JoinPath("/api/task/backtesting/solve")

	return &client{
		c:              c,
		predictURL:     predictURL.String(),
		backtestingURL: backtestingURL.String(),
	}
}

type RequestSolverInput struct {
	Tokens        []string `json:"tokens"`
	TargetDate    string   `json:"target_date"`
	AdversaryMode bool     `json:"adversaryMode"`
}

type ResponseSolverReceipt struct {
	BloomFilter []byte `json:"bloomFilter"`
	CountItems  int    `json:"countItems"`
}

type PredictRequest struct {
	SolverInput       RequestSolverInput `json:"solverInput"`
	FalsePositiveRate float64            `json:"falsePositiveRate"`
}

type PredictResponse struct {
	SolverOutput  map[string]float64    `json:"solverOutput"`
	SolverReceipt ResponseSolverReceipt `json:"solverReceipt"`
}

func (c *client) Predict(ctx context.Context, req PredictRequest) (PredictResponse, error) {
	reqCtx, cancel := context.WithTimeout(ctx, 3*time.Second)
	defer cancel()

	reqBody, err := json.Marshal(req)
	if err != nil {
		return PredictResponse{}, err
	}

	httpReq, err := http.NewRequestWithContext(reqCtx, "POST", c.predictURL, bytes.NewReader(reqBody))
	if err != nil {
		return PredictResponse{}, err
	}

	httpReq.Header.Set("Accept", "application/json")
	httpReq.Header.Set("Content-Type", "application/json")

	res, err := c.c.Do(httpReq)
	if err != nil {
		return PredictResponse{}, err
	}
	defer res.Body.Close()
	response, err := io.ReadAll(res.Body)
	if err != nil {
		return PredictResponse{}, err
	}

	if res.StatusCode != http.StatusOK {
		return PredictResponse{}, fmt.Errorf("unexpected status code: %d. Server returned error: %s", res.StatusCode, response)
	}

	var resResp PredictResponse
	err = json.Unmarshal(response, &resResp)
	if err != nil {
		return PredictResponse{}, err
	}

	return resResp, nil
}

type BacktestingRequest struct {
	SolverInput       RequestSolverInput `json:"solverInput"`
	FalsePositiveRate float64            `json:"falsePositiveRate"`
}

type BacktestingMetrics struct {
	Count      float64 `json:"count"`
	Mape       float64 `json:"mape"`
	Rmse       float64 `json:"rmse"`
	R2         float64 `json:"r2"`
	MaxError   float64 `json:"max_error"`
	Dae        float64 `json:"dae"`
	Mae        float64 `json:"mae"`
	Confidence float64 `json:"confidence"`
	Pct1       float64 `json:"pct1"`
	Pct5       float64 `json:"pct5"`
	Pct10      float64 `json:"pct10"`
	Pct15      float64 `json:"pct15"`
	Pct20      float64 `json:"pct20"`
	Pct25      float64 `json:"pct25"`
	Pct50      float64 `json:"pct50"`
	P0         float64 `json:"p0"`
	P5         float64 `json:"p5"`
	P10        float64 `json:"p10"`
	P15        float64 `json:"p15"`
	P20        float64 `json:"p20"`
	P25        float64 `json:"p25"`
	P50        float64 `json:"p50"`
	P75        float64 `json:"p75"`
	P95        float64 `json:"p95"`
	P100       float64 `json:"p100"`
}

type BacktestingToken struct {
	Metrics BacktestingMetrics `json:"metrics"`
}

type BacktestingSolverOutput struct {
	Metrics BacktestingMetrics          `json:"metrics"`
	Tokens  map[string]BacktestingToken `json:"tokens"`
}

type BacktestingResponse struct {
	SolverOutput  BacktestingSolverOutput `json:"solverOutput"`
	SolverReceipt ResponseSolverReceipt   `json:"solverReceipt"`
}

func (c *client) Backtesting(ctx context.Context, req BacktestingRequest) (BacktestingResponse, error) {
	reqCtx, cancel := context.WithTimeout(ctx, 10*time.Second)
	defer cancel()

	reqBody, err := json.Marshal(req)
	if err != nil {
		return BacktestingResponse{}, err
	}

	httpReq, err := http.NewRequestWithContext(reqCtx, "POST", c.backtestingURL, bytes.NewReader(reqBody))
	if err != nil {
		return BacktestingResponse{}, err
	}

	httpReq.Header.Set("Accept", "application/json")
	httpReq.Header.Set("Content-Type", "application/json")

	res, err := c.c.Do(httpReq)
	if err != nil {
		return BacktestingResponse{}, err
	}
	defer res.Body.Close()

	response, err := io.ReadAll(res.Body)
	if err != nil {
		return BacktestingResponse{}, err
	}

	if res.StatusCode != http.StatusOK {
		return BacktestingResponse{}, fmt.Errorf("unexpected status code: %d. Server returned error: %s", res.StatusCode, response)
	}

	var resResp BacktestingResponse
	err = json.Unmarshal(response, &resResp)
	if err != nil {
		return BacktestingResponse{}, err
	}

	return resResp, nil
}
