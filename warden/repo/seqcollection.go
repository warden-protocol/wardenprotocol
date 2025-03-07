package repo

import (
	"context"
	"errors"
	"fmt"

	"cosmossdk.io/collections"
)

var ErrInvalidID = errors.New("invalid ID")

// SeqCollection is an opinionated collection built on top of Cosmos SDK's Collections that uses a Sequence as ID for the Map.
//
// The sequence will start from 1 to avoid using 0 as an ID which prevents unexpected behaviours,
// for example when marshalling data as JSON default values are omitted by default.
type SeqCollection[V any] struct {
	collections.Map[uint64, V]
	seq   collections.Sequence
	setId func(*V, uint64)
}

func NewSeqCollection[V any](
	seq collections.Sequence,
	m collections.Map[uint64, V],
	setId func(*V, uint64),
) SeqCollection[V] {
	return SeqCollection[V]{seq: seq, Map: m, setId: setId}
}

func (c SeqCollection[V]) Get(ctx context.Context, id uint64) (V, error) {
	return c.Map.Get(ctx, id)
}

func (c SeqCollection[V]) Set(ctx context.Context, id uint64, obj V) error {
	if id == 0 {
		return ErrInvalidID
	}

	return c.Map.Set(ctx, id, obj)
}

func (c SeqCollection[V]) Append(ctx context.Context, obj *V) (uint64, error) {
	id, err := c.next(ctx)
	if err != nil {
		return 0, err
	}

	c.setId(obj, id)

	return id, c.Map.Set(ctx, id, *obj)
}

func (c SeqCollection[V]) next(ctx context.Context) (uint64, error) {
	peek, err := c.seq.Peek(ctx)
	if err != nil {
		return 0, err
	}

	if peek == 0 {
		return 1, c.seq.Set(ctx, 2)
	}

	return c.seq.Next(ctx)
}

func (c SeqCollection[V]) Import(ctx context.Context, values []V, getIDFn func(V) uint64) error {
	for _, v := range values {
		id := getIDFn(v)
		actualID, err := c.Append(ctx, &v)
		if err != nil {
			return fmt.Errorf("ID mismatch: expected %d, got %d. Cannot import this list of values.", id, actualID)
		}
	}

	return nil
}

func (c SeqCollection[V]) Export(ctx context.Context) ([]V, error) {
	iter, err := c.Iterate(ctx, nil)
	if err != nil {
		return nil, err
	}

	return iter.Values()
}
