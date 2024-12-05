package client

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"

	"github.com/warden-protocol/wardenprotocol/prophet/api"
)

func FetchCompletedFutures(ctx context.Context) (api.GetFuturesResponse, error) {
	r, err := http.Get("http://localhost:8088/future-results")
	if err != nil {
		return api.GetFuturesResponse{}, err
	}

	var response api.GetFuturesResponse
	if err := json.NewDecoder(r.Body).Decode(&response); err != nil {
		return api.GetFuturesResponse{}, err
	}

	return response, nil
}

func AckFutures(ctx context.Context, ids []uint64) error {
	r, w := io.Pipe()
	err := json.NewEncoder(w).Encode(api.AckFuture{
		IDs: ids,
	})
	if err != nil {
		return err
	}

	res, err := http.Post("http://localhost:8088/ack-futures", "application/json", r)
	if err != nil {
		return err
	}

	if res.StatusCode != http.StatusOK {
		return fmt.Errorf("unexpected status code: %d", res.StatusCode)
	}

	return nil
}

func FetchVotes(ctx context.Context) (api.GetVotesResponse, error) {
	r, err := http.Get("http://localhost:8088/votes")
	if err != nil {
		return api.GetVotesResponse{}, err
	}

	var response api.GetVotesResponse
	if err := json.NewDecoder(r.Body).Decode(&response); err != nil {
		return api.GetVotesResponse{}, err
	}

	return response, nil
}
