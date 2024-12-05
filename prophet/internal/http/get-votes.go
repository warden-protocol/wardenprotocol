package http

import (
	"encoding/json"
	"net/http"

	"github.com/warden-protocol/wardenprotocol/prophet/api"
)

func (s *Server) getVotes(w http.ResponseWriter, r *http.Request) {
	votes, err := s.votesSink.Take(10)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	results := make([]api.GetVoteResult, len(votes))
	for i, v := range votes {
		results[i] = api.GetVoteResult{
			ID:       uint64(v.ID),
			Approved: v.Err == nil,
		}
		if v.Err != nil {
			results[i].Err = v.Err.Error()
		}
	}

	response := api.GetVotesResponse{
		Result: results,
	}

	if err := json.NewEncoder(w).Encode(response); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}
