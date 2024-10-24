package tracker

import (
	"sync"
)

type Action int

const (
	ActionSkip Action = iota
	ActionProcess
)

type T struct {
	threshold uint8
	rw        sync.RWMutex
	ingested  map[uint64]*statusTracker
}

func New(threshold uint8) *T {
	return &T{
		threshold: threshold,
		ingested:  make(map[uint64]*statusTracker),
	}
}

func (t *T) statusTracker(id uint64) *statusTracker {
	value, ok := t.ingested[id]
	if !ok {
		t.ingested[id] = NewStatusTracker(t.threshold)

		return t.ingested[id]
	}

	return value
}

func (t *T) Ingest(id uint64, ingesterId string) (Action, error) {
	t.rw.RLock()
	defer t.rw.RUnlock()

	value := t.statusTracker(id)

	if err := value.MarkSeen(ingesterId); err != nil {
		return ActionSkip, err
	}

	if value.status == statusProcessig {
		return ActionProcess, nil
	}

	return ActionSkip, nil
}

func (t *T) Done(id uint64) {
	t.rw.Lock()
	defer t.rw.Unlock()

	delete(t.ingested, id)
}
