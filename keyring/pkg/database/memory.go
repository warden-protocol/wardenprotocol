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
