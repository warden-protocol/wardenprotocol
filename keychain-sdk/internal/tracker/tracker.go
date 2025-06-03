package tracker

import (
	"errors"
	"sync"
)

type Action int

const (
	ActionSkip Action = iota
	ActionProcess
)

type stringSet map[string]struct{}

// add safely adds a string to the set.
func (s stringSet) add(str string) bool {
	if _, exists := s[str]; exists {
		return false
	}
	s[str] = struct{}{}
	return true
}

type T struct {
	threshold uint8
	rw        sync.RWMutex
	ingested  map[uint64]stringSet
}

func New(threshold uint8) *T {
	return &T{
		threshold: threshold,
		ingested:  make(map[uint64]stringSet),
	}
}

func (t *T) Ingest(id uint64, ingesterId string) (Action, error) {
	t.rw.Lock()
	defer t.rw.Unlock()

	value := t.ingestTracker(id)

	if !value.add(ingesterId) {
		return ActionSkip, errors.New("already ingested")
	}

	if uint64(len(value)) < uint64(t.threshold) {
		return ActionSkip, nil
	}

	return ActionProcess, nil
}

func (t *T) Done(id uint64) {
	t.rw.Lock()
	defer t.rw.Unlock()

	delete(t.ingested, id)
}

func (t *T) ingestTracker(id uint64) stringSet {
	value, ok := t.ingested[id]
	if !ok {
		t.ingested[id] = make(stringSet)

		return t.ingested[id]
	}

	return value
}
