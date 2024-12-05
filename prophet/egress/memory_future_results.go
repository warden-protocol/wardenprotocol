package egress

import (
	"log/slog"
	"sync"
	"time"

	"github.com/warden-protocol/wardenprotocol/prophet/types"
)

type FutureResultMemorySink struct {
	mu      sync.Mutex
	log     *slog.Logger
	results []types.FutureResult
	pending map[uint64]PendingItem
}

type PendingItem struct {
	FutureResult types.FutureResult
	Timeout      time.Time
}

func NewFutureMemorySink() *FutureResultMemorySink {
	go func() {
		// todo: add a timer to remove pending items that have timed out
	}()
	return &FutureResultMemorySink{
		log:     slog.With("module", "egress", "sink", "memory"),
		pending: make(map[uint64]PendingItem),
	}
}

func (s *FutureResultMemorySink) Add(result types.FutureResult) error {
	s.mu.Lock()
	defer s.mu.Unlock()
	s.results = append(s.results, result)
	s.log.Debug("stored result", "task", result.Future.ID)
	return nil
}

func (s *FutureResultMemorySink) Take(n int) ([]types.FutureResult, error) {
	s.mu.Lock()
	defer s.mu.Unlock()
	if len(s.results) < n {
		res := s.results
		s.addPending(res, 60*time.Second)
		s.results = nil
		return res, nil
	}
	results := s.results[:n]
	s.results = s.results[n:]
	s.addPending(results, 60*time.Second)
	return results, nil
}

func (s *FutureResultMemorySink) Ack(ids []uint64) error {
	s.mu.Lock()
	defer s.mu.Unlock()
	for _, id := range ids {
		delete(s.pending, id)
		s.log.Debug("acked task", "task", id)
	}
	return nil
}

func (s *FutureResultMemorySink) addPending(items []types.FutureResult, timeout time.Duration) {
	for _, item := range items {
		s.log.Debug("moving to pending", "task", item.Future.ID)
		s.pending[item.Future.ID] = PendingItem{
			FutureResult: item,
			Timeout:      time.Now().Add(timeout),
		}
	}
}

func (s *FutureResultMemorySink) PendingTasks() ([]types.FutureResult, error) {
	s.mu.Lock()
	defer s.mu.Unlock()
	res := make([]types.FutureResult, 0, len(s.pending))
	for _, item := range s.pending {
		res = append(res, item.FutureResult)
	}
	return res, nil
}
