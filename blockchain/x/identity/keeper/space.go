// Copyright 2024
//
// This file includes work covered by the following copyright and permission notices:
//
// Copyright 2023 Qredo Ltd.
// Licensed under the Apache License, Version 2.0;
//
// This file is part of the Warden Protocol library.
//
// The Warden Protocol library is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// You should have received a copy of the GNU Lesser General Public License
// along with the Warden Protocol library. If not, see https://github.com/warden-protocol/wardenprotocol/blob/main/LICENSE
package keeper

import (
	"crypto/sha256"
	"encoding/binary"

	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/warden-protocol/wardenprotocol/x/identity/types"
)

func (k Keeper) GetSpaceCount(ctx sdk.Context) uint64 {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte{})
	byteKey := types.KeyPrefix(types.SpaceCountKey)
	bz := store.Get(byteKey)
	if bz == nil {
		return 0
	}
	return sdk.BigEndianToUint64(bz)
}

func (k Keeper) SetSpaceCount(ctx sdk.Context, c uint64) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte{})
	byteKey := types.KeyPrefix(types.SpaceCountKey)
	bz := sdk.Uint64ToBigEndian(c)
	store.Set(byteKey, bz)
}

func (k Keeper) GetSpace(ctx sdk.Context, addr string) *types.Space {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.SpaceKey))
	bz := store.Get([]byte(addr))
	if bz == nil {
		return nil
	}
	var space types.Space
	k.cdc.MustUnmarshal(bz, &space)
	return &space
}

func (k Keeper) CreateSpace(ctx sdk.Context, space *types.Space) string {
	count := k.GetSpaceCount(ctx)
	buf := make([]byte, 8)
	binary.LittleEndian.PutUint64(buf, count)
	addrHash := sha256.Sum256(buf)
	space.Address = sdk.MustBech32ifyAddressBytes("wardenspace", sdk.AccAddress(addrHash[:8]))
	k.SetSpace(ctx, space)
	k.SetSpaceCount(ctx, count+1)
	return space.Address
}

func (k Keeper) SetSpace(ctx sdk.Context, space *types.Space) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.SpaceKey))
	newValue := k.cdc.MustMarshal(space)
	store.Set([]byte(space.Address), newValue)
}
