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
package ante

import (
	"math/big"

	errorsmod "cosmossdk.io/errors"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

// GasWantedDecorator keeps track of the gasWanted amount on the current block in transient store
// for BaseFee calculation.
// NOTE: This decorator does not perform any validation
type GasWantedDecorator struct {
	evmKeeper       EVMKeeper
	feeMarketKeeper FeeMarketKeeper
}

// NewGasWantedDecorator creates a new NewGasWantedDecorator
func NewGasWantedDecorator(
	evmKeeper EVMKeeper,
	feeMarketKeeper FeeMarketKeeper,
) GasWantedDecorator {
	return GasWantedDecorator{
		evmKeeper,
		feeMarketKeeper,
	}
}

func (gwd GasWantedDecorator) AnteHandle(ctx sdk.Context, tx sdk.Tx, simulate bool, next sdk.AnteHandler) (newCtx sdk.Context, err error) {
	evmParams := gwd.evmKeeper.GetParams(ctx)
	chainCfg := evmParams.GetChainConfig()
	ethCfg := chainCfg.EthereumConfig(gwd.evmKeeper.ChainID())

	blockHeight := big.NewInt(ctx.BlockHeight())
	isLondon := ethCfg.IsLondon(blockHeight)

	feeTx, ok := tx.(sdk.FeeTx)
	if !ok || !isLondon {
		return next(ctx, tx, simulate)
	}

	gasWanted := feeTx.GetGas()
	isBaseFeeEnabled := gwd.feeMarketKeeper.GetBaseFeeEnabled(ctx)

	// Add total gasWanted to cumulative in block transientStore in FeeMarket module
	if isBaseFeeEnabled {
		if _, err := gwd.feeMarketKeeper.AddTransientGasWanted(ctx, gasWanted); err != nil {
			return ctx, errorsmod.Wrapf(err, "failed to add gas wanted to transient store")
		}
	}

	return next(ctx, tx, simulate)
}
