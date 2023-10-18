package service

import "time"

const (
	serviceName         = "mpc-relayer"
	mpcRequestKeyLength = 64
)

var (
	defaultPort = 8080

	defaultHandlerTimeout = 60 * time.Second
	defaultQueryTimeout   = 5 * time.Second

	defaultMaxRetries    int64 = 100
	defaultQueryInterval int64 = 5

	defaultRetryTimeout = 30 * time.Second

	defaultChanSize = 1000

	defaultPageLimit uint64 = 10

	defaultThreads = 6
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
