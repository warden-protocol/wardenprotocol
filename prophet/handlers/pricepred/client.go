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
}

func newClient(c *http.Client, baseURL *url.URL) *client {
	predictURL := baseURL.JoinPath("/api/task/inference/solve")

	return &client{
		c:              c,
		predictURL:     predictURL.String(),
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
