package main

import (
	"fmt"
	"sync"
	"time"
)

type RateLimitError struct {
	Key  string
	Wait time.Duration
}

func (e RateLimitError) Error() string {
	return fmt.Sprintf("rate limited: key '%s' must wait %s", e.Key, e.Wait.String())
}

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
		return RateLimitError{
			Key:  key,
			Wait: time.Until(l.last[key].Add(l.cooldown)),
		}
	}

	l.last[key] = time.Now()
	return nil
}

func (l *Limiter) Reset(key string) {
	l.mu.Lock()
	defer l.mu.Unlock()
	l.last[key] = time.Time{}
}
