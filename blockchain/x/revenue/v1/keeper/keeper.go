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
package keeper

import (
	"fmt"

	"github.com/cometbft/cometbft/libs/log"
	"github.com/cosmos/cosmos-sdk/codec"
	storetypes "github.com/cosmos/cosmos-sdk/store/types"
	sdk "github.com/cosmos/cosmos-sdk/types"

	"github.com/qredo/fusionchain/x/revenue/v1/types"
)

// Keeper of this module maintains collections of revenues for contracts
// registered to receive transaction fees.
type Keeper struct {
	storeKey storetypes.StoreKey
	cdc      codec.BinaryCodec
	// the address capable of executing a MsgUpdateParams message. Typically, this should be the x/gov module account.
	authority          sdk.AccAddress
	bankKeeper         types.BankKeeper
	evmKeeper          types.EVMKeeper
	accountKeeper      types.AccountKeeper
	distributionKeeper types.DistributionKeeper
	feeCollectorName   string
}

// NewKeeper creates new instances of the fees Keeper
func NewKeeper(
	storeKey storetypes.StoreKey,
	cdc codec.BinaryCodec,
	authority sdk.AccAddress,
	bk types.BankKeeper,
	dk types.DistributionKeeper,
	ak types.AccountKeeper,
	evmKeeper types.EVMKeeper,
	feeCollector string,
) Keeper {
	return Keeper{
		storeKey:           storeKey,
		cdc:                cdc,
		authority:          authority,
		bankKeeper:         bk,
		distributionKeeper: dk,
		evmKeeper:          evmKeeper,
		accountKeeper:      ak,
		feeCollectorName:   feeCollector,
	}
}

// Logger returns a module-specific logger.
func (k Keeper) Logger(ctx sdk.Context) log.Logger {
	return ctx.Logger().With("module", fmt.Sprintf("x/%s", types.ModuleName))
}
