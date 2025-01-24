// Package pricepred provides a handler for the price prediction AI model.
package pricepred

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"math/big"
	"net/http"
	"time"

	"github.com/ethereum/go-ethereum/accounts/abi"
)

var URL = "https://prediction.devnet.wardenprotocol.org/task/inference/solve"

var client = http.Client{
	Timeout: 3 * time.Second,
}

// PricePredictorSolidity is a handler for the price prediction AI model,
// wrapping input and output in Solidity ABI types.
type PricePredictorSolidity struct{}

func (s PricePredictorSolidity) Execute(ctx context.Context, input []byte) ([]byte, error) {
	tokens, err := decodeInput(input)
	if err != nil {
		return nil, err
	}

	req := Request{
		SolverInput: RequestSolverInput{
			Tokens:        tokens,
			TargetDate:    "2022-01-01",
			AdversaryMode: false,
		},
		FalsePositiveRate: 0.01,
	}

	res, err := Predict(ctx, req)
	if err != nil {
		return nil, err
	}

	encodedRes, err := encodeOutput(req, res)
	if err != nil {
		return nil, err
	}

	return encodedRes, nil
}

func decodeInput(input []byte) ([]string, error) {
	typ, err := abi.NewType("string[]", "string[]", nil)
	if err != nil {
		return nil, err
	}
	args := abi.Arguments{
		{Type: typ},
	}

	unpackArgs, err := args.Unpack(input)
	if err != nil {
		return nil, err
	}

	tokens, ok := unpackArgs[0].([]string)
	if !ok {
		return nil, fmt.Errorf("failed to unpack input")
	}

	return tokens, nil
}

func encodeOutput(req Request, res Response) ([]byte, error) {
	typ, err := abi.NewType("uint256[]", "", nil)
	if err != nil {
		log.Fatal(err)
	}
	args := abi.Arguments{
		{
			Type:    typ,
			Name:    "SolverOutput",
			Indexed: false,
		},
	}

	tokenPreds := make([]*big.Int, len(req.SolverInput.Tokens))
	for i, v := range req.SolverInput.Tokens {
		decimals := big.NewFloat(1e16)
		pred := big.NewFloat(res.SolverOutput[v])
		tokenPreds[i], _ = big.NewFloat(0).Mul(pred, decimals).Int(nil)
	}

	enc, err := args.Pack(tokenPreds)
	if err != nil {
		return nil, err
	}

	return enc, nil
}

func (s PricePredictorSolidity) Verify(ctx context.Context, input []byte, output []byte) error {
	// todo: verify output
	return nil
}

type RequestSolverInput struct {
	Tokens        []string `json:"tokens"`
	TargetDate    string   `json:"target_date"`
	AdversaryMode bool     `json:"adversaryMode"`
}

type Request struct {
	SolverInput       RequestSolverInput `json:"solverInput"`
	FalsePositiveRate float64            `json:"falsePositiveRate"`
}

type Response struct {
	SolverOutput  map[string]float64 `json:"solverOutput"`
	SolverReceipt struct {
		BloomFilter []byte `json:"bloomFilter"`
		CountItems  int    `json:"countItems"`
	} `json:"solverReceipt"`
}

func Predict(ctx context.Context, req Request) (Response, error) {
	reqCtx, cancel := context.WithTimeout(ctx, 3*time.Second)
	defer cancel()

	reqBody, err := json.Marshal(req)
	if err != nil {
		return Response{}, err
	}

	httpReq, err := http.NewRequestWithContext(reqCtx, "POST", URL, bytes.NewReader(reqBody))
	if err != nil {
		return Response{}, err
	}

	httpReq.Header.Set("Accept", "application/json")
	httpReq.Header.Set("Content-Type", "application/json")

	res, err := client.Do(httpReq)
	if err != nil {
		return Response{}, err
	}
	defer res.Body.Close()
	response, err := io.ReadAll(res.Body)
	if err != nil {
		return Response{}, err
	}

	if res.StatusCode != http.StatusOK {
		return Response{}, fmt.Errorf("unexpected status code: %d. Server returned error: %s", res.StatusCode, response)
	}

	var resResp Response
	err = json.Unmarshal(response, &resResp)
	if err != nil {
		return Response{}, err
	}

	return resResp, nil
}
