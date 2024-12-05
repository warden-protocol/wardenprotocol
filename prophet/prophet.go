package prophet

import (
	"fmt"

	lru "github.com/hashicorp/golang-lru/v2"

	"github.com/warden-protocol/wardenprotocol/prophet/internal/exec"
	"github.com/warden-protocol/wardenprotocol/prophet/types"

	_ "github.com/warden-protocol/wardenprotocol/prophet/internal/futures/echo"
	_ "github.com/warden-protocol/wardenprotocol/prophet/internal/futures/wardenai"
)

// P is the main prophet process. Use New() to create a new P.
type P struct {
	futures   *q[types.Future]
	proposals *q[types.FutureResult]

	resultsSink *s[types.FutureResult]
	votesSink   *s[types.Vote]
}

// New creates a new P, ready to be run.
func New() (*P, error) {
	resultsSink, err := newS[types.FutureResult]()
	if err != nil {
		return nil, err
	}

	votesSink, err := newS[types.Vote]()
	if err != nil {
		return nil, err
	}

	return &P{
		futures:     newQ[types.Future](),
		proposals:   newQ[types.FutureResult](),
		resultsSink: resultsSink,
		votesSink:   votesSink,
	}, nil
}

// Run starts the main loop of the prophet process, that executes futures and
// votes.
func (p *P) Run() error {
	if err := exec.Futures(p.futures, p.resultsSink); err != nil {
		return fmt.Errorf("failed to run futures loop: %w", err)
	}
	if err := exec.Votes(p.proposals, p.votesSink); err != nil {
		return fmt.Errorf("failed to run votes loop: %w", err)
	}
	return nil
}

// AddFuture adds a future to be executed. This call is non-blocking. The
// future will be executed in the background, the results can be retrieved by
// calling Results().
func (p *P) AddFuture(future types.Future) {
	fmt.Println("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX adding future")
	p.futures.Add(future)
}

// AddFutureResult adds a future result to be voted on. This call is non-blocking.
func (p *P) AddFutureResult(proposal types.FutureResult) {
	fmt.Println("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX adding future RESULT")
	p.proposals.Add(proposal)
}

// Results returns a slice with all the results of futures that have been
// executed.
// The returned function must be called to remove the results from the set.
func (p *P) Results() ([]types.FutureResult, func()) {
	values := p.resultsSink.Values()
	fmt.Println("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX fetched", len(values), "results")
	if len(values) == 0 {
		return nil, func() {}
	}

	return values, func() {
		p.resultsSink.Remove(values...)
	}
}

// q is a queue that doesn't block the producer (i.e. Add() is non-blocking).
type q[T any] struct {
	ch chan T
}

func newQ[T any]() *q[T] {
	return &q[T]{
		ch: make(chan T),
	}
}

func (q *q[T]) Add(item T) {
	go func() {
		q.ch <- item
	}()
}

func (q *q[T]) Fetch() <-chan T {
	return q.ch
}

type getIDer interface {
	GetID() uint64
}

// s is a set with a size bound, and thread-safe.
// Adding elements to the set may delete older elements, if the set is full.
type s[T getIDer] struct {
	l *lru.Cache[uint64, T]
}

func newS[T getIDer]() (*s[T], error) {
	l, err := lru.New[uint64, T](10_000)
	if err != nil {
		return nil, err
	}
	return &s[T]{l: l}, nil
}

func (s *s[T]) Add(value T) error {
	id := value.GetID()
	fmt.Println("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX SINK STORING VALUE", id)
	s.l.Add(id, value)
	return nil
}

func (s *s[T]) Values() []T {
	return s.l.Values()
}

func (s *s[T]) Remove(values ...T) error {
	for _, v := range values {
		s.l.Remove(v.GetID())
	}
	return nil
}
