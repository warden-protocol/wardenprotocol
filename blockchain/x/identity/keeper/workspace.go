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
	"crypto/sha256"
	"encoding/binary"

	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/qredo/fusionchain/x/identity/types"
)

func (k Keeper) GetWorkspaceCount(ctx sdk.Context) uint64 {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte{})
	byteKey := types.KeyPrefix(types.WorkspaceCountKey)
	bz := store.Get(byteKey)
	if bz == nil {
		return 0
	}
	return sdk.BigEndianToUint64(bz)
}

func (k Keeper) SetWorkspaceCount(ctx sdk.Context, c uint64) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte{})
	byteKey := types.KeyPrefix(types.WorkspaceCountKey)
	bz := sdk.Uint64ToBigEndian(c)
	store.Set(byteKey, bz)
}

func (k Keeper) GetWorkspace(ctx sdk.Context, addr string) *types.Workspace {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.WorkspaceKey))
	bz := store.Get([]byte(addr))
	if bz == nil {
		return nil
	}
	var workspace types.Workspace
	k.cdc.MustUnmarshal(bz, &workspace)
	return &workspace
}

func (k Keeper) CreateWorkspace(ctx sdk.Context, workspace *types.Workspace) string {
	count := k.GetWorkspaceCount(ctx)
	buf := make([]byte, 8)
	binary.LittleEndian.PutUint64(buf, count)
	addrHash := sha256.Sum256(buf)
	workspace.Address = sdk.MustBech32ifyAddressBytes("qredoworkspace", sdk.AccAddress(addrHash[:8]))
	k.SetWorkspace(ctx, workspace)
	k.SetWorkspaceCount(ctx, count+1)
	return workspace.Address
}

func (k Keeper) SetWorkspace(ctx sdk.Context, workspace *types.Workspace) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.WorkspaceKey))
	newValue := k.cdc.MustMarshal(workspace)
	store.Set([]byte(workspace.Address), newValue)
}
