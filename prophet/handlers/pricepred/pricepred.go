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

var client = http.Client{
	Timeout: 3 * time.Second,
}

// PricePredictorSolidity is a handler for the price prediction AI model,
// wrapping input and output in Solidity ABI types.
type PricePredictorSolidity struct {
	SolveURL  string
	VerifyURL string
}

func NewPricePredictorSolidity(solveUrl string, verifyUrl string) PricePredictorSolidity {
	return PricePredictorSolidity{
		SolveURL:  solveUrl,
		VerifyURL: verifyUrl,
	}
}

type InputData struct {
	Date              *big.Int
	Tokens            []string
	FalsePositiveRate [2]uint64
}

func (i InputData) ToPredictRequest() (PredictRequest, error) {
	tm := time.Unix(i.Date.Int64(), 0)
	dateStr := tm.Format("2006-01-02")

	if i.FalsePositiveRate[1] == 0 {
		return PredictRequest{}, fmt.Errorf("invalid false positive rate")
	}
	fpr := float64(i.FalsePositiveRate[0]) / float64(i.FalsePositiveRate[1])

	return PredictRequest{
		SolverInput: RequestSolverInput{
			Tokens:        i.Tokens,
			TargetDate:    dateStr,
			AdversaryMode: false,
		},
		FalsePositiveRate: fpr,
	}, nil
}

type OutputData struct {
	TokenPreds    []*big.Int
	SolverReceipt struct {
		BloomFilter []byte
		CountItems  *big.Int
	}
}

func (s PricePredictorSolidity) Execute(ctx context.Context, input []byte) ([]byte, error) {
	inputData, err := decodeInput(input)
	if err != nil {
		return nil, err
	}

	req, err := inputData.ToPredictRequest()
	if err != nil {
		return nil, err
	}

	res, err := send[PredictRequest, PredictResponse](ctx, req, s.SolveURL)
	if err != nil {
		fmt.Println(err)
		return nil, err
	}

	encodedRes, err := encodeOutput(req, res)
	if err != nil {
		return nil, err
	}

	return encodedRes, nil
}

func decodeInput(input []byte) (InputData, error) {
	typ, err := abi.NewType("tuple", "", []abi.ArgumentMarshaling{
		{Name: "date", Type: "uint256"},
		{Name: "tokens", Type: "string[]"},
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

func getOutputABIType() (abi.Type, error) {
	return abi.NewType("tuple", "", []abi.ArgumentMarshaling{
		{Name: "tokenPreds", Type: "uint256[]"},
		{Name: "solverReceipt", Type: "tuple", Components: []abi.ArgumentMarshaling{
			{Name: "bloomFilter", Type: "bytes"},
			{Name: "countItems", Type: "uint256"},
		}},
	})
}

func encodeOutput(req PredictRequest, res PredictResponse) ([]byte, error) {
	typ, err := getOutputABIType()
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

	output := OutputData{
		TokenPreds: tokenPreds,
		SolverReceipt: struct {
			BloomFilter []byte
			CountItems  *big.Int
		}{
			BloomFilter: res.SolverReceipt.BloomFilter,
			CountItems:  big.NewInt(int64(res.SolverReceipt.CountItems)),
		},
	}

	enc, err := args.Pack(output)
	if err != nil {
		return nil, err
	}

	return enc, nil
}

func decodeOutput(output []byte) (OutputData, error) {
	typ, err := getOutputABIType()
	if err != nil {
		return OutputData{}, err
	}

	args := abi.Arguments{
		{Type: typ},
	}

	unpackArgs, err := args.Unpack(output)
	if err != nil {
		return OutputData{}, err
	}

	var outputData struct {
		Data OutputData
	}
	err = args.Copy(&outputData, unpackArgs)
	if err != nil {
		return OutputData{}, err
	}

	return outputData.Data, nil
}

func (s PricePredictorSolidity) Verify(ctx context.Context, input []byte, output []byte) error {
	decodedInput, err := decodeInput(input)
	if err != nil {
		return err
	}

	decodedOutput, err := decodeOutput(output)
	if err != nil {
		return err
	}

	req, err := decodedInput.ToPredictRequest()
	if err != nil {
		return err
	}

	verifyReq := VerifyRequest{
		SolverRequest: req,
		SolverReceipt: SolverReceipt{
			BloomFilter: decodedOutput.SolverReceipt.BloomFilter,
			CountItems:  int(decodedOutput.SolverReceipt.CountItems.Int64()),
		},
		VerificationRatio: 0.01,
	}

	res, err := send[VerifyRequest, VerifyResponse](ctx, verifyReq, s.VerifyURL)
	if err != nil {
		return err
	}

	if !res.IsVerified {
		return fmt.Errorf("pricepred: verification failed")
	}

	return nil
}

type RequestSolverInput struct {
	Tokens        []string `json:"tokens"`
	TargetDate    string   `json:"target_date"`
	AdversaryMode bool     `json:"adversaryMode"`
}

type PredictRequest struct {
	SolverInput       RequestSolverInput `json:"solverInput"`
	FalsePositiveRate float64            `json:"falsePositiveRate"`
}

type SolverReceipt struct {
	BloomFilter []byte `json:"bloomFilter"`
	CountItems  int    `json:"countItems"`
}

type VerifyRequest struct {
	SolverRequest     PredictRequest `json:"solverRequest"`
	SolverReceipt     SolverReceipt  `json:"solverReceipt"`
	VerificationRatio float64        `json:"verificationRatio"`
}

type PredictResponse struct {
	SolverOutput  map[string]float64 `json:"solverOutput"`
	SolverReceipt SolverReceipt      `json:"solverReceipt"`
}

type VerifyResponse struct {
	CountItems int  `json:"countItems"`
	IsVerified bool `json:"isVerified"`
}

func send[Req, Resp any](ctx context.Context, req Req, URL string) (Resp, error) {
	reqCtx, cancel := context.WithTimeout(ctx, 3*time.Second)
	defer cancel()

	reqBody, err := json.Marshal(req)
	if err != nil {
		var empty Resp
		return empty, err
	}

	httpReq, err := http.NewRequestWithContext(reqCtx, "POST", URL, bytes.NewReader(reqBody))
	if err != nil {
		var empty Resp
		return empty, err
	}

	httpReq.Header.Set("Accept", "application/json")
	httpReq.Header.Set("Content-Type", "application/json")

	res, err := client.Do(httpReq)
	if err != nil {
		var empty Resp
		return empty, err
	}
	defer res.Body.Close()
	response, err := io.ReadAll(res.Body)
	if err != nil {
		var empty Resp
		return empty, err
	}

	if res.StatusCode != http.StatusOK {
		var empty Resp
		return empty, fmt.Errorf("unexpected status code: %d. Server returned error: %s", res.StatusCode, response)
	}

	var resResp Resp
	err = json.Unmarshal(response, &resResp)
	if err != nil {
		var empty Resp
		return empty, err
	}

	return resResp, nil
}
