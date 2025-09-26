package prophet

import (
	"context"
	"fmt"
	"log/slog"
	"sync"
	"time"

	"github.com/cosmos/cosmos-sdk/client"
	lru "github.com/hashicorp/golang-lru/v2"
)

// queueBufferSize sets the default size for incoming queues, i.e. the number
// of tasks waiting to be executed and the number of task results waiting
// to be verified.
// Trying to add more items to the queue than this size will drop the new
// items.
var queueBufferSize = 100

// P is the main prophet process. Use [New] to create a new P.
type P struct {
	tasks     *q[Task]
	proposals *q[TaskResult]

	resultsWriter *s[TaskResult]
	votesWriter   *s[Vote]

	selfAddressRwLock sync.RWMutex
	selfAddress       []byte
}

// New returns an initialized P. Call [P.Run] to start the main loop.
func New() (*P, error) {
	resultsWriter, err := newS[TaskResult]()
	if err != nil {
		return nil, err
	}

	votesWriter, err := newS[Vote]()
	if err != nil {
		return nil, err
	}

	return &P{
		tasks:         newQ[Task](queueBufferSize),
		proposals:     newQ[TaskResult](queueBufferSize),
		resultsWriter: resultsWriter,
		votesWriter:   votesWriter,
	}, nil
}

// Run starts the main loop of the prophet process.
//
// Goroutines are started to execute incoming tasks and verifying incoming
// task results.
func (p *P) Run(tendermintRpc string) error {
	tasks, err := newDedupTaskReader(p.tasks)
	if err != nil {
		return fmt.Errorf("failed to create tasks dedup reader: %w", err)
	}

	if err := ExecTasks(tasks, p.resultsWriter); err != nil {
		return fmt.Errorf("failed to run tasks loop: %w", err)
	}

	proposals, err := newDedupTaskResultReader(p.proposals)
	if err != nil {
		return fmt.Errorf("failed to create tasks dedup reader: %w", err)
	}

	if err := ExecVotes(proposals, p.votesWriter); err != nil {
		return fmt.Errorf("failed to run votes loop: %w", err)
	}

	go func() {
		client, err := client.NewClientFromNode(tendermintRpc)
		if err != nil {
			panic(err)
		}

		timeout := time.Now().Add(30 * time.Second)

		for {
			if time.Now().After(timeout) {
				return
			}

			status, err := client.Status(context.Background())
			if err != nil {
				time.Sleep(100 * time.Millisecond)
				continue
			}

			p.selfAddressRwLock.Lock()
			defer p.selfAddressRwLock.Unlock()

			p.selfAddress = status.ValidatorInfo.Address

			return
		}
	}()

	return nil
}

// AddTask adds a task to be executed. This call is non-blocking. The
// task will be executed in the background, the results can be retrieved by
// calling [P.Results].
func (p *P) AddTask(task Task) {
	p.tasks.Add(task)
}

// AddTaskResult adds a task result to be voted on. This call is
// non-blocking.
func (p *P) AddTaskResult(proposal TaskResult) {
	p.proposals.Add(proposal)
}

// Results returns a slice with all the results of tasks that have been
// executed.
// The returned function must be called to remove the results from the set.
func (p *P) Results() ([]TaskResult, func()) {
	values := p.resultsWriter.Values()
	if len(values) == 0 {
		return nil, func() {}
	}

	return values, func() {
		p.resultsWriter.Remove(values...)
	}
}

func (p *P) SelfAddress() []byte {
	p.selfAddressRwLock.RLock()
	defer p.selfAddressRwLock.RUnlock()

	return p.selfAddress
}

// Votes returns a slice with all the votes of tasks' results that have been
// verified.
// The returned function must be called to remove the votes from the set.
func (p *P) Votes() ([]Vote, func()) {
	values := p.votesWriter.Values()
	if len(values) == 0 {
		return nil, func() {}
	}

	return values, func() {
		p.votesWriter.Remove(values...)
	}
}

// q is a queue that doesn't block the producer (i.e. q.Add is non-blocking).
type q[T any] struct {
	ch chan T
}

func newQ[T any](buffer int) *q[T] {
	return &q[T]{
		ch: make(chan T, buffer),
	}
}

func (q *q[T]) Add(item T) {
	select {
	case q.ch <- item:
	default:
		slog.Warn("q.Add: queue is full, dropped item", "item", item) //nolint:noctx
	}
}

func (q *q[T]) Read() <-chan T {
	return q.ch
}

var defaultSetSize = 10000

// s is a set with a size bound, and thread-safe.
// Adding elements to the set may delete older elements, if the set is full.
type s[T getIDer] struct {
	l *lru.Cache[uint64, T]
}

func newS[T getIDer]() (*s[T], error) {
	l, err := lru.New[uint64, T](defaultSetSize)
	if err != nil {
		return nil, err
	}

	return &s[T]{l: l}, nil
}

func (s *s[T]) Write(value T) error {
	id := value.getID()
	s.l.Add(id, value)

	return nil
}

func (s *s[T]) Values() []T {
	return s.l.Values()
}

func (s *s[T]) Remove(values ...T) {
	for _, v := range values {
		s.l.Remove(v.getID())
	}
}
