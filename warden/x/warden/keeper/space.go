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

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/warden-protocol/wardenprotocol/warden/x/warden/types"
)

var Bech32SpacePrefix = "wardenspace"

func (k Keeper) GetSpace(ctx sdk.Context, addr string) (types.Space, error) {
	key, err := k.unmarshalSpaceAddr(addr)
	if err != nil {
		return types.Space{}, err
	}

	return k.spaces.Get(ctx, key)
}

func (k Keeper) CreateSpace(ctx sdk.Context, space types.Space) (string, error) {
	num, err := k.spaceSeq.Next(ctx)
	if err != nil {
		return "", err
	}

	buf := make([]byte, 8)
	binary.LittleEndian.PutUint64(buf, num)
	addrHash := sha256.Sum256(buf)
	space.Address = sdk.MustBech32ifyAddressBytes(Bech32SpacePrefix, addrHash[:8])

	if err := k.SetSpace(ctx, space); err != nil {
		return "", err
	}

	return space.Address, nil
}

func (k Keeper) unmarshalSpaceAddr(addr string) ([]byte, error) {
	return sdk.GetFromBech32(addr, Bech32SpacePrefix)
}

func (k Keeper) SetSpace(ctx sdk.Context, space types.Space) error {
	key, err := k.unmarshalSpaceAddr(space.Address)
	if err != nil {
		return err
	}

	return k.spaces.Set(ctx, key, space)
}
