// Copyright 2023 Qredo Ltd.
// This file is part of the Fusion library.
//
// The Fusion library is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// You should have received a copy of the GNU Lesser General Public License
// along with the Fusion library. If not, see https://github.com/qredo/fusionchain/blob/main/LICENSE
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
