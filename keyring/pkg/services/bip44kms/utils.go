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
package kms

import "time"

const (
	keyIDLength = 64
	pkPrefix    = "pk"

	rateLimitPerSecond = 5
)

func requeueKeyItemWithTimeout(c chan *keyRequestQueueItem, item *keyRequestQueueItem, timeout time.Duration) {
	item.retries++
	go func() {
		time.Sleep(timeout)
		c <- item
	}()
}

func requeueSigItemWithTimeout(c chan *signatureRequestQueueItem, item *signatureRequestQueueItem, timeout time.Duration) {
	item.retries++
	go func() {
		time.Sleep(timeout)
		c <- item
	}()
}

func makeThreads(n int) chan struct{} {
	t := make(chan struct{}, n)
	for i := 0; i < n; i++ {
		t <- struct{}{}
	}
	return t
}
