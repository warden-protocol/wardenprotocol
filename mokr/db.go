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
