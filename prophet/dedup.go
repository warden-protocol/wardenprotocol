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

// dedupFutureReader wraps a [FutureReader] and deduplicates the incoming
// futures.
type dedupFutureReader struct {
	d *dedup[Future]
}

func newDedupFutureReader(r FutureReader) (*dedupFutureReader, error) {
	d, err := newDedup(r.Read())
	if err != nil {
		return nil, err
	}

	return &dedupFutureReader{d: d}, nil
}

func (d dedupFutureReader) Read() <-chan Future {
	return d.d.out
}

// dedupFutureResultReader wraps a [FutureResultReader] and deduplicates the incoming
// future results.
type dedupFutureResultReader struct {
	d *dedup[FutureResult]
}

func newDedupFutureResultReader(r FutureResultReader) (*dedupFutureResultReader, error) {
	d, err := newDedup(r.Read())
	if err != nil {
		return nil, err
	}

	return &dedupFutureResultReader{d: d}, nil
}

func (d dedupFutureResultReader) Read() <-chan FutureResult {
	return d.d.out
}
