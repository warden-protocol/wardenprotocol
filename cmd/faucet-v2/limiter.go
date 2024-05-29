package main

import (
	"errors"
	"fmt"
	"sync"
	"time"
)

var ErrRateLimited = errors.New("rate limited")

type Limiter struct {
	cooldown time.Duration
	last     map[string]time.Time
	mu       sync.Mutex
}

func NewLimiter(cooldown time.Duration) *Limiter {
	return &Limiter{
		cooldown: cooldown,
		last:     make(map[string]time.Time),
	}
}

func (l *Limiter) Allow(key string) error {
	l.mu.Lock()
	defer l.mu.Unlock()
	if time.Since(l.last[key]) < l.cooldown {
		return fmt.Errorf("%w: key '%s' must wait %s", ErrRateLimited, key, time.Until(l.last[key].Add(l.cooldown)).String())
	}

	l.last[key] = time.Now()
	return nil
}

func (l *Limiter) Reset(key string) {
	l.mu.Lock()
	defer l.mu.Unlock()
	l.last[key] = time.Time{}
}
