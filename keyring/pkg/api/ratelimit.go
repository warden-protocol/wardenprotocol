package api

import (
	"sync"
	"time"
)

type RateLimiter struct {
	tokens      int
	tokenRefill int
	refillTime  time.Duration
	mu          sync.Mutex
}

func NewRateLimiter(tokens int, refillTime time.Duration) *RateLimiter {
	return &RateLimiter{
		tokens:      tokens,
		tokenRefill: tokens,
		refillTime:  refillTime,
	}
}

func (rl *RateLimiter) takeToken() bool {
	rl.mu.Lock()
	defer rl.mu.Unlock()

	if rl.tokens > 0 {
		rl.tokens--
		return true
	}
	return false
}

func (rl *RateLimiter) refillTokens() {
	for {
		time.Sleep(rl.refillTime)
		rl.mu.Lock()
		if rl.tokens < rl.tokenRefill {
			rl.tokens = rl.tokenRefill
		}
		rl.mu.Unlock()
	}
}
