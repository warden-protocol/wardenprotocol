// Copyright 2024
//
// This file includes work covered by the following copyright and permission notices:
//
// Copyright 2023 Qredo Ltd.
// Licensed under the Apache License, Version 2.0;
//
// This file is part of the Warden Protocol library.
//
// The Warden Protocol library is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// You should have received a copy of the GNU Lesser General Public License
// along with the Warden Protocol library. If not, see https://github.com/warden-protocol/wardenprotocol/blob/main/LICENSE
package database

import (
	"strings"
	"sync"
)

// Memory implements Database
type Memory struct {
	mu   sync.RWMutex
	data map[string][]byte
}

func NewMemory() *Memory {
	return &Memory{
		mu:   sync.RWMutex{},
		data: make(map[string][]byte), // map[key]value
	}
}

func (m *Memory) Persist(key string, value []byte) error {
	m.mu.Lock()
	defer m.mu.Unlock()

	m.data[key] = value
	return nil
}

func (m *Memory) Get(key string) ([]byte, error) {
	m.mu.RLock()
	defer m.mu.RUnlock()

	value, ok := m.data[key]
	if !ok {
		return nil, ErrNotFound
	}
	return value, nil
}

func (m *Memory) Has(key string) (bool, error) {
	m.mu.RLock()
	defer m.mu.RUnlock()

	_, ok := m.data[key]
	if !ok {
		return false, nil
	}
	return true, nil
}

func (m *Memory) Read(prefix string) (map[string][]byte, error) {
	m.mu.RLock()
	defer m.mu.RUnlock()
	read := make(map[string][]byte, len(m.data))
	for k, v := range m.data {
		if !strings.HasPrefix(k, prefix) {
			continue
		}
		read[strings.TrimPrefix(k, prefix)] = v
	}
	return read, nil
}

func (m *Memory) Delete(key string) error {
	m.mu.Lock()
	defer m.mu.Unlock()

	_, ok := m.data[key]
	if !ok {
		return ErrNotFound
	}
	delete(m.data, key)
	return nil
}

func (m *Memory) Close() error {
	m.mu.Lock()
	defer m.mu.Unlock()

	m.data = make(map[string][]byte)
	return nil
}
