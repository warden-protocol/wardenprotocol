package kms

import "time"

const (
	keyIDLength = 64
	pkPrefix    = "pk"
)

func requeueKeyItemWithTimeout(c chan *keyRequestQueueItem, item *keyRequestQueueItem, timeout time.Duration) {
	go func() {
		time.Sleep(timeout)
		item.retries++
		c <- item
	}()
}

func requeueSigItemWithTimeout(c chan *signatureRequestQueueItem, item *signatureRequestQueueItem, timeout time.Duration) {
	go func() {
		time.Sleep(timeout)
		item.retries++
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
