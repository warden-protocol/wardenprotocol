package types

import (
	"sync"

	"github.com/ethereum/go-ethereum/common"
)

// AddrLocker is a mutex structure used to avoid querying outdated account data
type AddrLocker struct {
	mu    sync.Mutex
	locks map[common.Address]*sync.Mutex
}

// lock returns the lock of the given address.
func (l *AddrLocker) lock(address common.Address) *sync.Mutex {
	l.mu.Lock()
	defer l.mu.Unlock()
	if l.locks == nil {
		l.locks = make(map[common.Address]*sync.Mutex)
	}
	if _, ok := l.locks[address]; !ok {
		l.locks[address] = new(sync.Mutex)
	}
	return l.locks[address]
}

// LockAddr locks an account's mutex. This is used to prevent another tx getting the
// same nonce until the lock is released. The mutex prevents the (an identical nonce) from
// being read again during the time that the first transaction is being signed.
func (l *AddrLocker) LockAddr(address common.Address) {
	l.lock(address).Lock()
}

// UnlockAddr unlocks the mutex of the given account.
func (l *AddrLocker) UnlockAddr(address common.Address) {
	l.lock(address).Unlock()
}
