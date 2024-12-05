package http

import (
	"encoding/json"
	"net/http"
)

func (s *Server) getPendingFutures(w http.ResponseWriter, r *http.Request) {
	debugSink, ok := s.sink.(FutureResultStorageDebug)
	if !ok {
		http.Error(w, "sink does not implement debug interface", http.StatusInternalServerError)
		return
	}

	futures, err := debugSink.PendingFutures()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if err := json.NewEncoder(w).Encode(futures); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}
