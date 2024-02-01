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

func (k Keeper) GetKeychainCount(ctx sdk.Context) uint64 {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte{})
	byteKey := types.KeyPrefix(types.KeychainCountKey)
	bz := store.Get(byteKey)
	if bz == nil {
		return 0
	}
	return sdk.BigEndianToUint64(bz)
}

func (k Keeper) SetKeychainCount(ctx sdk.Context, c uint64) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte{})
	byteKey := types.KeyPrefix(types.KeychainCountKey)
	bz := sdk.Uint64ToBigEndian(c)
	store.Set(byteKey, bz)
}

func (k Keeper) GetKeychain(ctx sdk.Context, addr string) *types.Keychain {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.KeychainKey))
	bz := store.Get([]byte(addr))
	if bz == nil {
		return nil
	}
	var keychain types.Keychain
	k.cdc.MustUnmarshal(bz, &keychain)
	return &keychain
}

func (k Keeper) CreateKeychain(ctx sdk.Context, keychain *types.Keychain) string {
	count := k.GetKeychainCount(ctx)
	buf := make([]byte, 8)
	binary.LittleEndian.PutUint64(buf, count)
	addrHash := sha256.Sum256(buf)
	keychain.Address = sdk.MustBech32ifyAddressBytes("wardenkeychain", sdk.AccAddress(addrHash[16:24]))
	k.SetKeychain(ctx, keychain)
	k.SetKeychainCount(ctx, count+1)
	return keychain.Address
}

func (k Keeper) SetKeychain(ctx sdk.Context, keychain *types.Keychain) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.KeychainKey))
	newValue := k.cdc.MustMarshal(keychain)
	store.Set([]byte(keychain.Address), newValue)
}
