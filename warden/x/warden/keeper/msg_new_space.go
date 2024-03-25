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
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"
	types "github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta2"
)

func (k msgServer) NewSpace(goCtx context.Context, msg *types.MsgNewSpace) (*types.MsgNewSpaceResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	space := &types.Space{
		Creator:       msg.Creator,
		AdminIntentId: msg.AdminIntentId,
		SignIntentId:  msg.SignIntentId,
	}

	if err := space.AddOwner(msg.Creator); err != nil {
		return nil, err
	}
	for _, owner := range msg.AdditionalOwners {
		if err := space.AddOwner(owner); err != nil {
			return nil, err
		}
	}

	id, err := k.SpacesKeeper.New(ctx, space)
	if err != nil {
		return nil, err
	}

	return &types.MsgNewSpaceResponse{
		Id: id,
	}, nil
}
