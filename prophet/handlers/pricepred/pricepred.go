// Package pricepred provides a handler for the price prediction AI model.
package pricepred

import (
	"context"
	"fmt"
	"log"
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

type InputData struct {
	Date              *big.Int
	Tokens            []string
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

func encodeOutput(req PredictRequest, res PredictResponse) ([]byte, error) {
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
