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
	"fmt"

	cdctypes "github.com/cosmos/cosmos-sdk/codec/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/warden-protocol/wardenprotocol/intent"
	"github.com/warden-protocol/wardenprotocol/x/identity/types"
	bbird "github.com/warden-protocol/wardenprotocol/x/intent/keeper"
	bbirdtypes "github.com/warden-protocol/wardenprotocol/x/intent/types"
)

func (k msgServer) AddSpaceOwner(goCtx context.Context, msg *types.MsgAddSpaceOwner) (*types.MsgAddSpaceOwnerResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)
	ws := k.GetSpace(ctx, msg.SpaceAddr)
	if ws == nil {
		return nil, fmt.Errorf("space not found")
	}

	act, err := k.intentKeeper.AddAction(ctx, msg.Creator, msg, ws.AdminIntentId, msg.Btl)
	if err != nil {
		return nil, err
	}
	return k.AddOwnerActionHandler(ctx, act, &cdctypes.Any{})
}

func (k msgServer) AddOwnerIntentGenerator(ctx sdk.Context, msg *types.MsgAddSpaceOwner) (intent.Intent, error) {
	ws := k.GetSpace(ctx, msg.SpaceAddr)
	if ws == nil {
		return nil, fmt.Errorf("space not found")
	}

	pol := ws.IntentAddOwner()
	return pol, nil
}

func (k msgServer) AddOwnerActionHandler(ctx sdk.Context, act *bbirdtypes.Action, payload *cdctypes.Any) (*types.MsgAddSpaceOwnerResponse, error) {
	return bbird.TryExecuteAction(
		k.intentKeeper,
		k.cdc,
		ctx,
		act,
		payload,
		func(ctx sdk.Context, msg *types.MsgAddSpaceOwner) (*types.MsgAddSpaceOwnerResponse, error) {
			ws := k.GetSpace(ctx, msg.SpaceAddr)
			if ws == nil {
				return nil, fmt.Errorf("space not found")
			}

			if err := ws.AddOwner(msg.NewOwner); err != nil {
				return nil, err
			}

			k.SetSpace(ctx, ws)

			return &types.MsgAddSpaceOwnerResponse{}, nil
		},
	)
}
