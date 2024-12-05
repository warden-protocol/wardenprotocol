package http

import (
	"encoding/json"
	"net/http"
)

func (s *Server) getPendingVotes(w http.ResponseWriter, r *http.Request) {
	debugSink, ok := s.votesSink.(VoteStorageDebug)
	if !ok {
		http.Error(w, "sink does not implement debug interface", http.StatusInternalServerError)
		return
	}

	votes, err := debugSink.PendingVotes()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if err := json.NewEncoder(w).Encode(votes); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}
