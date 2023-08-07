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
package miner

import (
	"errors"

	"github.com/ethereum/go-ethereum/common/hexutil"
)

// GetHashrate returns the current hashrate for local CPU miner and remote miner.
// Unsupported in Ethermint
func (api *API) GetHashrate() uint64 {
	api.logger.Debug("miner_getHashrate")
	api.logger.Debug("Unsupported rpc function: miner_getHashrate")
	return 0
}

// SetExtra sets the extra data string that is included when this miner mines a block.
// Unsupported in Ethermint
func (api *API) SetExtra(_ string) (bool, error) {
	api.logger.Debug("miner_setExtra")
	api.logger.Debug("Unsupported rpc function: miner_setExtra")
	return false, errors.New("unsupported rpc function: miner_setExtra")
}

// SetGasLimit sets the gaslimit to target towards during mining.
// Unsupported in Ethermint
func (api *API) SetGasLimit(_ hexutil.Uint64) bool {
	api.logger.Debug("miner_setGasLimit")
	api.logger.Debug("Unsupported rpc function: miner_setGasLimit")
	return false
}

// Start starts the miner with the given number of threads. If threads is nil,
// the number of workers started is equal to the number of logical CPUs that are
// usable by this process. If mining is already running, this method adjust the
// number of threads allowed to use and updates the minimum price required by the
// transaction pool.
// Unsupported in Ethermint
func (api *API) Start(_ *int) error {
	api.logger.Debug("miner_start")
	api.logger.Debug("Unsupported rpc function: miner_start")
	return errors.New("unsupported rpc function: miner_start")
}

// Stop terminates the miner, both at the consensus engine level as well as at
// the block creation level.
// Unsupported in Ethermint
func (api *API) Stop() {
	api.logger.Debug("miner_stop")
	api.logger.Debug("Unsupported rpc function: miner_stop")
}
