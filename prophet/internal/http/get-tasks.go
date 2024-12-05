package http

import (
	"encoding/json"
	"net/http"

	"github.com/warden-protocol/wardenprotocol/prophet/api"
)

func (s *Server) getFutureResults(w http.ResponseWriter, r *http.Request) {
	futures, err := s.sink.Take(10)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	results := make([]api.GetFutureResult, len(futures))
	for i, future := range futures {
		results[i] = api.GetFutureResult{
			ID:     uint64(future.ID),
			Output: future.Output,
		}
	}

	response := api.GetFuturesResponse{
		Result: results,
	}

	if err := json.NewEncoder(w).Encode(response); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}
