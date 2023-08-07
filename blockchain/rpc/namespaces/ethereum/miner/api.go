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
	"github.com/cosmos/cosmos-sdk/server"

	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/common/hexutil"

	"github.com/cometbft/cometbft/libs/log"

	"github.com/evmos/ethermint/rpc/backend"
)

// API is the private miner prefixed set of APIs in the Miner JSON-RPC spec.
type API struct {
	ctx     *server.Context
	logger  log.Logger
	backend backend.EVMBackend
}

// NewPrivateAPI creates an instance of the Miner API.
func NewPrivateAPI(
	ctx *server.Context,
	backend backend.EVMBackend,
) *API {
	return &API{
		ctx:     ctx,
		logger:  ctx.Logger.With("api", "miner"),
		backend: backend,
	}
}

// SetEtherbase sets the etherbase of the miner
func (api *API) SetEtherbase(etherbase common.Address) bool {
	api.logger.Debug("miner_setEtherbase")
	return api.backend.SetEtherbase(etherbase)
}

// SetGasPrice sets the minimum accepted gas price for the miner.
func (api *API) SetGasPrice(gasPrice hexutil.Big) bool {
	api.logger.Info(api.ctx.Viper.ConfigFileUsed())
	return api.backend.SetGasPrice(gasPrice)
}
