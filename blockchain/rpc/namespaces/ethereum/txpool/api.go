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
package txpool

import (
	"github.com/cometbft/cometbft/libs/log"

	"github.com/ethereum/go-ethereum/common/hexutil"

	"github.com/evmos/ethermint/rpc/types"
)

// PublicAPI offers and API for the transaction pool. It only operates on data that is non-confidential.
// NOTE: For more info about the current status of this endpoints see https://github.com/evmos/ethermint/issues/124
type PublicAPI struct {
	logger log.Logger
}

// NewPublicAPI creates a new tx pool service that gives information about the transaction pool.
func NewPublicAPI(logger log.Logger) *PublicAPI {
	return &PublicAPI{
		logger: logger.With("module", "txpool"),
	}
}

// Content returns the transactions contained within the transaction pool
func (api *PublicAPI) Content() (map[string]map[string]map[string]*types.RPCTransaction, error) {
	api.logger.Debug("txpool_content")
	content := map[string]map[string]map[string]*types.RPCTransaction{
		"pending": make(map[string]map[string]*types.RPCTransaction),
		"queued":  make(map[string]map[string]*types.RPCTransaction),
	}
	return content, nil
}

// Inspect returns the content of the transaction pool and flattens it into an
func (api *PublicAPI) Inspect() (map[string]map[string]map[string]string, error) {
	api.logger.Debug("txpool_inspect")
	content := map[string]map[string]map[string]string{
		"pending": make(map[string]map[string]string),
		"queued":  make(map[string]map[string]string),
	}
	return content, nil
}

// Status returns the number of pending and queued transaction in the pool.
func (api *PublicAPI) Status() map[string]hexutil.Uint {
	api.logger.Debug("txpool_status")
	return map[string]hexutil.Uint{
		"pending": hexutil.Uint(0),
		"queued":  hexutil.Uint(0),
	}
}
