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

func (k Keeper) GetKeyringCount(ctx sdk.Context) uint64 {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte{})
	byteKey := types.KeyPrefix(types.KeyringCountKey)
	bz := store.Get(byteKey)
	if bz == nil {
		return 0
	}
	return sdk.BigEndianToUint64(bz)
}

func (k Keeper) SetKeyringCount(ctx sdk.Context, c uint64) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte{})
	byteKey := types.KeyPrefix(types.KeyringCountKey)
	bz := sdk.Uint64ToBigEndian(c)
	store.Set(byteKey, bz)
}

func (k Keeper) GetKeyring(ctx sdk.Context, addr string) *types.Keyring {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.KeyringKey))
	bz := store.Get([]byte(addr))
	if bz == nil {
		return nil
	}
	var keyring types.Keyring
	k.cdc.MustUnmarshal(bz, &keyring)
	return &keyring
}

func (k Keeper) CreateKeyring(ctx sdk.Context, keyring *types.Keyring) string {
	count := k.GetKeyringCount(ctx)
	buf := make([]byte, 8)
	binary.LittleEndian.PutUint64(buf, count)
	addrHash := sha256.Sum256(buf)
	keyring.Address = sdk.MustBech32ifyAddressBytes("qredokeyring", sdk.AccAddress(addrHash[16:24]))
	k.SetKeyring(ctx, keyring)
	k.SetKeyringCount(ctx, count+1)
	return keyring.Address
}

func (k Keeper) SetKeyring(ctx sdk.Context, keyring *types.Keyring) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.KeyringKey))
	newValue := k.cdc.MustMarshal(keyring)
	store.Set([]byte(keyring.Address), newValue)
}
