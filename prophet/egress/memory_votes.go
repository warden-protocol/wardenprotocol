package egress

import (
	"log/slog"
	"sync"
	"time"

	"github.com/warden-protocol/wardenprotocol/prophet/types"
)

type VoteMemorySink struct {
	mu      sync.Mutex
	log     *slog.Logger
	votes   []types.Vote
	pending map[uint64]PendingVote
}

type PendingVote struct {
	ProposalVote types.Vote
	Timeout      time.Time
}

func NewVoteMemorySink() *VoteMemorySink {
	go func() {
		// todo: add a timer to remove pending items that have timed out
	}()
	return &VoteMemorySink{
		log:     slog.With("module", "egress", "sink", "vote_memory"),
		pending: make(map[uint64]PendingVote),
	}
}

func (s *VoteMemorySink) Add(result types.Vote) error {
	s.mu.Lock()
	defer s.mu.Unlock()
	s.votes = append(s.votes, result)
	s.log.Debug("stored vote", "proposal", result.ID)
	return nil
}

func (s *VoteMemorySink) Take(n int) ([]types.Vote, error) {
	s.mu.Lock()
	defer s.mu.Unlock()
	if len(s.votes) < n {
		res := s.votes
		s.addPending(res, 60*time.Second)
		s.votes = nil
		return res, nil
	}
	votes := s.votes[:n]
	s.votes = s.votes[n:]
	s.addPending(votes, 60*time.Second)
	return votes, nil
}

func (s *VoteMemorySink) Ack(ids []uint64) error {
	s.mu.Lock()
	defer s.mu.Unlock()
	for _, id := range ids {
		delete(s.pending, id)
		s.log.Debug("acked task", "task", id)
	}
	return nil
}

func (s *VoteMemorySink) addPending(items []types.Vote, timeout time.Duration) {
	for _, item := range items {
		s.log.Debug("moving to pending", "task", item.ID)
		s.pending[item.ID] = PendingVote{
			ProposalVote: item,
			Timeout:      time.Now().Add(timeout),
		}
	}
}

func (s *VoteMemorySink) PendingVotes() ([]types.Vote, error) {
	s.mu.Lock()
	defer s.mu.Unlock()
	res := make([]types.Vote, 0, len(s.pending))
	for _, item := range s.pending {
		res = append(res, item.ProposalVote)
	}
	return res, nil
}
