package tracker

import (
	"sync"
)

type hashSet map[string]struct{}

type T struct {
	rw       sync.RWMutex
	ingested map[uint64]hashSet
}

func New() *T {
	return &T{
		ingested: make(map[uint64]hashSet),
	}
}

func (t *T) IsNew(id uint64, nodeUrl string) bool {
	t.rw.RLock()
	defer t.rw.RUnlock()
	value, exists := t.ingested[id]
	if !exists {
		return true
	}

	_, alreadySeen := value[nodeUrl]
	return !alreadySeen
}

func (t *T) HasReachedConsensus(id uint64, threshold uint) bool {
	t.rw.RLock()
	defer t.rw.RUnlock()
	value, exists := t.ingested[id]
	if !exists {
		return false
	}

	return len(value) >= int(threshold)
}

func (t *T) Ingested(id uint64, nodeUrl string) {
	t.rw.Lock()
	defer t.rw.Unlock()

	value, ok := t.ingested[id]
	if ok == false {
		t.ingested[id] = make(hashSet)
		value = t.ingested[id]
	}

	value[nodeUrl] = struct{}{}
}

func (t *T) Done(id uint64) {
	t.rw.Lock()
	defer t.rw.Unlock()
	delete(t.ingested, id)
}
