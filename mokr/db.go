package main

import (
	"crypto/ecdsa"
	"fmt"
)

var ErrKeyNotFound = fmt.Errorf("key not found")

type InMemoryKeyDB struct {
	wallets map[uint64]*ecdsa.PrivateKey
}

func NewMemoryDB() *InMemoryKeyDB {
	return &InMemoryKeyDB{
		wallets: make(map[uint64]*ecdsa.PrivateKey),
	}
}

func (db *InMemoryKeyDB) Get(id uint64) (*ecdsa.PrivateKey, error) {
	k, found := db.wallets[id]
	if !found {
		return nil, ErrKeyNotFound
	}
	return k, nil
}

func (db *InMemoryKeyDB) Set(id uint64, key *ecdsa.PrivateKey) error {
	db.wallets[id] = key
	return nil
}
