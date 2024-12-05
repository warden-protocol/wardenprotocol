package http

import (
	"encoding/json"
	"net/http"

	"github.com/warden-protocol/wardenprotocol/prophet/api"
)

func (s *Server) postAck(w http.ResponseWriter, r *http.Request) {
	var req api.AckFuture
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	if err := s.sink.Ack(req.IDs); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}
