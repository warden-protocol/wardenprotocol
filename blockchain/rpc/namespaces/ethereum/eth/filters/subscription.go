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
package filters

import (
	"time"

	coretypes "github.com/cometbft/cometbft/rpc/core/types"
	"github.com/ethereum/go-ethereum/common"
	ethtypes "github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/eth/filters"
	"github.com/ethereum/go-ethereum/rpc"
)

// Subscription defines a wrapper for the private subscription
type Subscription struct {
	id        rpc.ID
	typ       filters.Type
	event     string
	created   time.Time
	logsCrit  filters.FilterCriteria
	logs      chan []*ethtypes.Log
	hashes    chan []common.Hash
	headers   chan *ethtypes.Header
	installed chan struct{} // closed when the filter is installed
	eventCh   <-chan coretypes.ResultEvent
	err       chan error
}

// ID returns the underlying subscription RPC identifier.
func (s Subscription) ID() rpc.ID {
	return s.id
}

// Unsubscribe from the current subscription to Tendermint Websocket. It sends an error to the
// subscription error channel if unsubscribe fails.
func (s *Subscription) Unsubscribe(es *EventSystem) {
	go func() {
	uninstallLoop:
		for {
			// write uninstall request and consume logs/hashes. This prevents
			// the eventLoop broadcast method to deadlock when writing to the
			// filter event channel while the subscription loop is waiting for
			// this method to return (and thus not reading these events).
			select {
			case es.uninstall <- s:
				break uninstallLoop
			case <-s.logs:
			case <-s.hashes:
			case <-s.headers:
			}
		}
	}()
}

// Err returns the error channel
func (s *Subscription) Err() <-chan error {
	return s.err
}

// Event returns the tendermint result event channel
func (s *Subscription) Event() <-chan coretypes.ResultEvent {
	return s.eventCh
}
