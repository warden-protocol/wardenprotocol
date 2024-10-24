package tracker

import (
	"fmt"
)

type status int

const (
	statusSeen      status = iota
	statusProcessig        = iota
)

type statusTracker struct {
	threshold uint8
	seensBy   stringSet
	status    status
}

type stringSet map[string]struct{}

// add safely adds a string to the set
func (s stringSet) add(str string) bool {
	if _, exists := s[str]; exists {
		return false
	}
	s[str] = struct{}{}
	return true
}

func NewStatusTracker(threshold uint8) *statusTracker {
	return &statusTracker{
		threshold: threshold,
		seensBy:   stringSet{},
		status:    statusSeen,
	}
}

func (sh *statusTracker) MarkSeen(seenBy string) error {
	if !sh.seensBy.add(seenBy) {
		return fmt.Errorf("cannot mark as seen: already seen by %s", seenBy)
	}

	if sh.status == statusProcessig {
		return fmt.Errorf("is already in processing state")
	}

	if uint64(len(sh.seensBy)) >= uint64(sh.threshold) {
		sh.status = statusProcessig
	}

	return nil
}
