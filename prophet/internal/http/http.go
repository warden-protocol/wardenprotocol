package http

import (
	"log/slog"
	"net/http"

	"github.com/warden-protocol/wardenprotocol/prophet/types"
)

type FutureResultStorage interface {
	Take(n int) ([]types.FutureResult, error)
	Ack(ids []uint64) error
}

type FutureResultStorageDebug interface {
	PendingFutures() ([]types.FutureResult, error)
}

type VoteStorage interface {
	Take(n int) ([]types.Vote, error)
	Ack(ids []uint64) error
}

type VoteStorageDebug interface {
	PendingVotes() ([]types.Vote, error)
}

type Server struct {
	log       *slog.Logger
	addr      string
	sink      FutureResultStorage
	votesSink VoteStorage
}

func NewServer(addr string, sink FutureResultStorage, votesSink VoteStorage) *Server {
	return &Server{
		log:       slog.With("module", "http"),
		addr:      addr,
		sink:      sink,
		votesSink: votesSink,
	}
}

func (s *Server) Serve() error {
	mux := http.NewServeMux()

	mux.HandleFunc("GET /future-results", s.getFutureResults)
	mux.HandleFunc("POST /ack-futures", s.postAck)
	mux.HandleFunc("GET /votes", s.getVotes)

	debugMux := http.NewServeMux()
	debugMux.HandleFunc("GET /debug/pending-future-results", s.getPendingFutures)
	debugMux.HandleFunc("GET /debug/pending-votes", s.getPendingVotes)
	mux.Handle("/debug/", debugMux)

	return http.ListenAndServe(s.addr, mux)
}
