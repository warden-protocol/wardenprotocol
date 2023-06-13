package main

import (
	"fmt"

	"github.com/cosmos/cosmos-sdk/crypto/keys/secp256k1"
)

var ErrKeyNotFound = fmt.Errorf("key not found")

type Key *secp256k1.PrivKey

type InMemoryKeyDB struct {
	wallets map[uint64]Key
}

func NewMemoryDB() *InMemoryKeyDB {
	return &InMemoryKeyDB{
		wallets: make(map[uint64]Key),
	}
}

func (db *InMemoryKeyDB) Get(id uint64) (Key, error) {
	k, found := db.wallets[id]
	if !found {
		return nil, ErrKeyNotFound
	}
	return k, nil
}

func (db *InMemoryKeyDB) Set(id uint64, key Key) error {
	db.wallets[id] = key
	return nil
}
