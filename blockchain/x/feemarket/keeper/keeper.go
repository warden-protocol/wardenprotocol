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
package keeper

import (
	"math/big"

	"github.com/cometbft/cometbft/libs/log"
	"github.com/cosmos/cosmos-sdk/codec"
	storetypes "github.com/cosmos/cosmos-sdk/store/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	paramstypes "github.com/cosmos/cosmos-sdk/x/params/types"

	"github.com/evmos/ethermint/x/feemarket/types"
)

// KeyPrefixBaseFeeV1 TODO: Temporary will be removed with params refactor PR
var KeyPrefixBaseFeeV1 = []byte{2}

// Keeper grants access to the Fee Market module state.
type Keeper struct {
	// Protobuf codec
	cdc codec.BinaryCodec
	// Store key required for the Fee Market Prefix KVStore.
	storeKey     storetypes.StoreKey
	transientKey storetypes.StoreKey
	// the address capable of executing a MsgUpdateParams message. Typically, this should be the x/gov module account.
	authority sdk.AccAddress
	// Legacy subspace
	ss paramstypes.Subspace
}

// NewKeeper generates new fee market module keeper
func NewKeeper(
	cdc codec.BinaryCodec, authority sdk.AccAddress, storeKey, transientKey storetypes.StoreKey, ss paramstypes.Subspace,
) Keeper {
	// ensure authority account is correctly formatted
	if err := sdk.VerifyAddressFormat(authority); err != nil {
		panic(err)
	}

	return Keeper{
		cdc:          cdc,
		storeKey:     storeKey,
		authority:    authority,
		transientKey: transientKey,
		ss:           ss,
	}
}

// Logger returns a module-specific logger.
func (k Keeper) Logger(ctx sdk.Context) log.Logger {
	return ctx.Logger().With("module", "x/"+types.ModuleName)
}

// ----------------------------------------------------------------------------
// Parent Block Gas Used
// Required by EIP1559 base fee calculation.
// ----------------------------------------------------------------------------

// SetBlockGasWanted sets the block gas wanted to the store.
// CONTRACT: this should be only called during EndBlock.
func (k Keeper) SetBlockGasWanted(ctx sdk.Context, gas uint64) {
	store := ctx.KVStore(k.storeKey)
	gasBz := sdk.Uint64ToBigEndian(gas)
	store.Set(types.KeyPrefixBlockGasWanted, gasBz)
}

// GetBlockGasWanted returns the last block gas wanted value from the store.
func (k Keeper) GetBlockGasWanted(ctx sdk.Context) uint64 {
	store := ctx.KVStore(k.storeKey)
	bz := store.Get(types.KeyPrefixBlockGasWanted)
	if len(bz) == 0 {
		return 0
	}

	return sdk.BigEndianToUint64(bz)
}

// GetTransientGasWanted returns the gas wanted in the current block from transient store.
func (k Keeper) GetTransientGasWanted(ctx sdk.Context) uint64 {
	store := ctx.TransientStore(k.transientKey)
	bz := store.Get(types.KeyPrefixTransientBlockGasWanted)
	if len(bz) == 0 {
		return 0
	}
	return sdk.BigEndianToUint64(bz)
}

// SetTransientBlockGasWanted sets the block gas wanted to the transient store.
func (k Keeper) SetTransientBlockGasWanted(ctx sdk.Context, gasWanted uint64) {
	store := ctx.TransientStore(k.transientKey)
	gasBz := sdk.Uint64ToBigEndian(gasWanted)
	store.Set(types.KeyPrefixTransientBlockGasWanted, gasBz)
}

// AddTransientGasWanted adds the cumulative gas wanted in the transient store
func (k Keeper) AddTransientGasWanted(ctx sdk.Context, gasWanted uint64) (uint64, error) {
	result := k.GetTransientGasWanted(ctx) + gasWanted
	k.SetTransientBlockGasWanted(ctx, result)
	return result, nil
}

// GetBaseFeeV1 get the base fee from v1 version of states.
// return nil if base fee is not enabled
// TODO: Figure out if this will be deleted ?
func (k Keeper) GetBaseFeeV1(ctx sdk.Context) *big.Int {
	store := ctx.KVStore(k.storeKey)
	bz := store.Get(KeyPrefixBaseFeeV1)
	if len(bz) == 0 {
		return nil
	}
	return new(big.Int).SetBytes(bz)
}
