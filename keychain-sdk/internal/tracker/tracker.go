package tracker

import (
	"sync"
)

type T struct {
	rw       sync.RWMutex
	ingested map[uint64]struct{}
}

func New() *T {
	return &T{
		ingested: make(map[uint64]struct{}),
	}
}

func (t *T) IsNew(id uint64) bool {
	t.rw.RLock()
	defer t.rw.RUnlock()

	_, ok := t.ingested[id]

	return !ok
}

func (t *T) Ingested(id uint64) {
	t.rw.Lock()
	defer t.rw.Unlock()

	t.ingested[id] = struct{}{}
}

func (t *T) Done(id uint64) {
	t.rw.Lock()
	defer t.rw.Unlock()

	delete(t.ingested, id)
}
