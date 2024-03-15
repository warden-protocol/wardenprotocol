package keychain

import (
	"sync"
)

type RequestTracker struct {
	rw       sync.RWMutex
	ingested map[uint64]struct{}
}

func NewRequestTracker() *RequestTracker {
	return &RequestTracker{
		ingested: make(map[uint64]struct{}),
	}
}

func (t *RequestTracker) IsNew(id uint64) bool {
	t.rw.RLock()
	defer t.rw.RUnlock()
	_, ok := t.ingested[id]
	return !ok
}

func (t *RequestTracker) Ingested(id uint64) {
	t.rw.Lock()
	defer t.rw.Unlock()
	t.ingested[id] = struct{}{}
}

func (t *RequestTracker) Done(id uint64) {
	t.rw.Lock()
	defer t.rw.Unlock()
	delete(t.ingested, id)
}
