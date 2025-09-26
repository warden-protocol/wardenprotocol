package prophet

import (
	lru "github.com/hashicorp/golang-lru/v2"
)

var dedupLRUSize = 10000

type getIDer interface {
	getID() uint64
}

// dedup takes a channel of requests, deduplicates them, and emits
// returns a new channel of unique requests.
//
// It does so by keeping a LRU cache of unique IDs.
// Requests coming after [dedupLRUSize] requests will be emitted
// again, even if duplicated.
type dedup[T getIDer] struct {
	in  <-chan T
	out chan T
	c   *lru.Cache[uint64, struct{}]
}

func newDedup[T getIDer](ch <-chan T) (*dedup[T], error) {
	c, err := lru.New[uint64, struct{}](dedupLRUSize)
	if err != nil {
		return nil, err
	}

	out := make(chan T)

	go func() {
		defer close(out)

		for req := range ch {
			if c.Contains(req.getID()) {
				continue
			}

			c.Add(req.getID(), struct{}{})

			out <- req
		}
	}()

	return &dedup[T]{
		in:  ch,
		c:   c,
		out: out,
	}, nil
}

// dedupTaskReader wraps a [TaskReader] and deduplicates the incoming
// tasks.
type dedupTaskReader struct {
	d *dedup[Task]
}

func newDedupTaskReader(r TaskReader) (*dedupTaskReader, error) {
	d, err := newDedup(r.Read())
	if err != nil {
		return nil, err
	}

	return &dedupTaskReader{d: d}, nil
}

func (d dedupTaskReader) Read() <-chan Task {
	return d.d.out
}

// dedupTaskResultReader wraps a [TaskResultReader] and deduplicates the incoming
// task results.
type dedupTaskResultReader struct {
	d *dedup[TaskResult]
}

func newDedupTaskResultReader(r TaskResultReader) (*dedupTaskResultReader, error) {
	d, err := newDedup(r.Read())
	if err != nil {
		return nil, err
	}

	return &dedupTaskResultReader{d: d}, nil
}

func (d dedupTaskResultReader) Read() <-chan TaskResult {
	return d.d.out
}
