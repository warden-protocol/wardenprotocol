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
	"github.com/CosmWasm/wasmd/x/wasm/keeper"
	"github.com/CosmWasm/wasmd/x/wasm/types"
	"github.com/cosmos/cosmos-sdk/codec"
	storetypes "github.com/cosmos/cosmos-sdk/store/types"

	policy "github.com/qredo/fusionchain/x/policy/keeper"
	qassets "github.com/qredo/fusionchain/x/qassets/keeper"
)

// NewKeeper creates a new contract Keeper instance
// If customEncoders is non-nil, we can use this to override some of the message handler, especially custom
func NewKeeper(
	cdc codec.Codec,
	storeKey storetypes.StoreKey,
	accountKeeper types.AccountKeeper,
	bankKeeper types.BankKeeper,
	stakingKeeper types.StakingKeeper,
	distrKeeper types.DistributionKeeper,
	ics4Wrapper types.ICS4Wrapper,
	channelKeeper types.ChannelKeeper,
	portKeeper types.PortKeeper,
	capabilityKeeper types.CapabilityKeeper,
	policyKeeper policy.Keeper,
	qassetsKeeper qassets.Keeper,
	portSource types.ICS20TransferPortSource,
	router keeper.MessageRouter,
	grpcRouter keeper.GRPCQueryRouter,
	homeDir string,
	wasmConfig types.WasmConfig,
	availableCapabilities string,
	authority string,
	opts ...keeper.Option,
) Keeper {
	messenger := NewDefaultMessageHandler(router, ics4Wrapper, channelKeeper, capabilityKeeper, bankKeeper, qassetsKeeper, cdc, portSource)
	opts = append(opts, keeper.WithMessageHandler(messenger), keeper.WithQueryHandlerDecorator(func(old keeper.WasmVMQueryHandler) keeper.WasmVMQueryHandler {
		queryPlugins, ok := old.(keeper.QueryPlugins)
		if !ok {
			return old
		}
		return DefaultQueryPlugins(queryPlugins, policyKeeper)
	}))
	return Keeper{
		Keeper:        keeper.NewKeeper(cdc, storeKey, accountKeeper, bankKeeper, stakingKeeper, distrKeeper, ics4Wrapper, channelKeeper, portKeeper, capabilityKeeper, portSource, router, grpcRouter, homeDir, wasmConfig, availableCapabilities, authority, opts...),
		policyKeeper:  policyKeeper,
		qassetsKeeper: qassetsKeeper,
	}
}
