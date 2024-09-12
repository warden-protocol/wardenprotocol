package inference

import (
	"bytes"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"sort"
	"strconv"
	"time"

	"cosmossdk.io/math"
	types "github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta3"
)

var c = &http.Client{
	Timeout: time.Minute,
}

func solveURL() string {
	if os.Getenv("INFERENCE_URL") != "" {
		return os.Getenv("INFERENCE_URL") + "/job/solve"
	}
	return "http://localhost:9001/job/solve"
}

type solveResponse struct {
	SolverOutput struct {
		Forecasts map[string]float64 `json:"forecasts"`
	} `json:"solverOutput"`
	SolverReceipt []byte `json:"solverReceipt"`
}

func (s *solveResponse) ToSolverResponse() types.SolverResponse {
	forecasts := make([]types.Forecast, 0, len(s.SolverOutput.Forecasts))
	for k, v := range s.SolverOutput.Forecasts {
		dec, err := math.LegacyNewDecFromStr(strconv.FormatFloat(v, 'f', -1, 64))
		if err != nil {
			panic(err)
		}

		forecasts = append(forecasts, types.Forecast{
			Key:   k,
			Value: dec,
		})
	}
	sort.Slice(forecasts, func(i, j int) bool {
		return forecasts[i].Key < forecasts[j].Key
	})
	return types.SolverResponse{
		SolverOutput: types.SolverOutput{
			Forecasts: forecasts,
		},
		SolverReceipt: s.SolverReceipt,
	}
}

func Solve(input types.SolverInput, falsePositiveRate float64) (types.SolverResponse, error) {
	req := types.SolverRequest{
		SolverInput:       input,
		ExpectedItems:     int64(len(input.Tokens)),
		FalsePositiveRate: falsePositiveRate,
	}

	jsonBz, err := json.Marshal(req)
	if err != nil {
		return types.SolverResponse{}, err
	}

	res, err := c.Post(solveURL(), "application/json", bytes.NewReader(jsonBz))
	if err != nil {
		return types.SolverResponse{}, err
	}
	defer res.Body.Close()

	if res.StatusCode != http.StatusOK {
		return types.SolverResponse{}, fmt.Errorf("inference endpoint returned non-200 status code: %d", res.StatusCode)
	}

	var resp solveResponse
	err = json.NewDecoder(res.Body).Decode(&resp)
	if err != nil {
		return types.SolverResponse{}, err
	}

	return resp.ToSolverResponse(), nil
}

var ErrVerifyFailed = fmt.Errorf("verify failed")

type VerifyRequest struct {
	SolverRequest types.SolverRequest `json:"solverRequest"`
	SolverReceipt []byte              `json:"solverReceipt"`
	K             int                 `json:"K"`
}

func verifyURL() string {
	if os.Getenv("INFERENCE_URL") != "" {
		return os.Getenv("INFERENCE_URL") + "/job/verify"
	}
	return "http://localhost:9001/job/verify"
}

func Verify(
	request types.SolverRequest,
	receipt []byte,
	k int) error {
	req := VerifyRequest{
		SolverRequest: request,
		SolverReceipt: receipt,
		K:             k,
	}

	jsonBz, err := json.Marshal(req)
	if err != nil {
		return err
	}

	log.Println(string(jsonBz))

	res, err := c.Post(verifyURL(), "application/json", bytes.NewReader(jsonBz))
	if err != nil {
		return err
	}
	defer res.Body.Close()

	var resp struct {
		Verified bool `json:"verified"`
	}
	err = json.NewDecoder(res.Body).Decode(&resp)
	if err != nil {
		return err
	}

	if !resp.Verified {
		return ErrVerifyFailed
	}

	return nil
}
