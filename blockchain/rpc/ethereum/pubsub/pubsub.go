// Copyright 2021 Evmos Foundation
// This file is part of Evmos' Ethermint library.
//
// The Ethermint library is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// The Ethermint library is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License
// along with the Ethermint library. If not, see https://github.com/evmos/ethermint/blob/main/LICENSE
package pubsub

import (
	"sync"
	"sync/atomic"

	"github.com/pkg/errors"

	coretypes "github.com/cometbft/cometbft/rpc/core/types"
)

type UnsubscribeFunc func()

type EventBus interface {
	AddTopic(name string, src <-chan coretypes.ResultEvent) error
	RemoveTopic(name string)
	Subscribe(name string) (<-chan coretypes.ResultEvent, UnsubscribeFunc, error)
	Topics() []string
}

type memEventBus struct {
	topics          map[string]<-chan coretypes.ResultEvent
	topicsMux       *sync.RWMutex
	subscribers     map[string]map[uint64]chan<- coretypes.ResultEvent
	subscribersMux  *sync.RWMutex
	currentUniqueID uint64
}

func NewEventBus() EventBus {
	return &memEventBus{
		topics:         make(map[string]<-chan coretypes.ResultEvent),
		topicsMux:      new(sync.RWMutex),
		subscribers:    make(map[string]map[uint64]chan<- coretypes.ResultEvent),
		subscribersMux: new(sync.RWMutex),
	}
}

func (m *memEventBus) GenUniqueID() uint64 {
	return atomic.AddUint64(&m.currentUniqueID, 1)
}

func (m *memEventBus) Topics() (topics []string) {
	m.topicsMux.RLock()
	defer m.topicsMux.RUnlock()

	topics = make([]string, 0, len(m.topics))
	for topicName := range m.topics {
		topics = append(topics, topicName)
	}

	return topics
}

func (m *memEventBus) AddTopic(name string, src <-chan coretypes.ResultEvent) error {
	m.topicsMux.RLock()
	_, ok := m.topics[name]
	m.topicsMux.RUnlock()

	if ok {
		return errors.New("topic already registered")
	}

	m.topicsMux.Lock()
	m.topics[name] = src
	m.topicsMux.Unlock()

	go m.publishTopic(name, src)

	return nil
}

func (m *memEventBus) RemoveTopic(name string) {
	m.topicsMux.Lock()
	delete(m.topics, name)
	m.topicsMux.Unlock()
}

func (m *memEventBus) Subscribe(name string) (<-chan coretypes.ResultEvent, UnsubscribeFunc, error) {
	m.topicsMux.RLock()
	_, ok := m.topics[name]
	m.topicsMux.RUnlock()

	if !ok {
		return nil, nil, errors.Errorf("topic not found: %s", name)
	}

	ch := make(chan coretypes.ResultEvent)
	m.subscribersMux.Lock()
	defer m.subscribersMux.Unlock()

	id := m.GenUniqueID()
	if _, ok := m.subscribers[name]; !ok {
		m.subscribers[name] = make(map[uint64]chan<- coretypes.ResultEvent)
	}
	m.subscribers[name][id] = ch

	unsubscribe := func() {
		m.subscribersMux.Lock()
		defer m.subscribersMux.Unlock()
		delete(m.subscribers[name], id)
	}

	return ch, unsubscribe, nil
}

func (m *memEventBus) publishTopic(name string, src <-chan coretypes.ResultEvent) {
	for {
		msg, ok := <-src
		if !ok {
			m.closeAllSubscribers(name)
			m.topicsMux.Lock()
			delete(m.topics, name)
			m.topicsMux.Unlock()
			return
		}
		m.publishAllSubscribers(name, msg)
	}
}

func (m *memEventBus) closeAllSubscribers(name string) {
	m.subscribersMux.Lock()
	defer m.subscribersMux.Unlock()

	subsribers := m.subscribers[name]
	delete(m.subscribers, name)

	for _, sub := range subsribers {
		close(sub)
	}
}

func (m *memEventBus) publishAllSubscribers(name string, msg coretypes.ResultEvent) {
	m.subscribersMux.RLock()
	subsribers := m.subscribers[name]
	m.subscribersMux.RUnlock()

	for _, sub := range subsribers {
		select {
		case sub <- msg:
		default:
		}
	}
}
