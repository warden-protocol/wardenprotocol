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
	"github.com/cosmos/gogoproto/proto"
	intenttypes "github.com/warden-protocol/wardenprotocol/warden/x/intent/types"
	"github.com/warden-protocol/wardenprotocol/warden/x/warden/types"
)

func (k msgServer) AddSpaceOwner(goCtx context.Context, msg *types.MsgAddSpaceOwner) (*intenttypes.MsgActionCreated, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)
	ws, err := k.spaces.Get(ctx, msg.SpaceId)
	if err != nil {
		return nil, err
	}

	act, err := k.intentKeeper.AddAction(ctx, msg.Creator, msg, ws.AdminIntentId, msg.Btl)
	if err != nil {
		return nil, err
	}

	return &intenttypes.MsgActionCreated{Action: act}, nil
}

func (k msgServer) AddOwnerIntentGenerator(ctx sdk.Context, act intenttypes.Action) (intenttypes.Intent, error) {
	msg, err := intenttypes.GetActionMessage[*types.MsgAddSpaceOwner](k.cdc, act)
	if err != nil {
		return intenttypes.Intent{}, err
	}

	ws, err := k.spaces.Get(ctx, msg.SpaceId)
	if err != nil {
		return intenttypes.Intent{}, err
	}

	pol := ws.IntentAddOwner()
	return pol, nil
}

func (k msgServer) AddOwnerActionHandler(ctx sdk.Context, act intenttypes.Action) (proto.Message, error) {
	msg, err := intenttypes.GetActionMessage[*types.MsgAddSpaceOwner](k.cdc, act)
	if err != nil {
		return nil, err
	}

	space, err := k.spaces.Get(ctx, msg.SpaceId)
	if err != nil {
		return nil, err
	}

	if err := space.AddOwner(msg.NewOwner); err != nil {
		return nil, err
	}

	if err := k.spaces.Set(ctx, space.Id, space); err != nil {
		return nil, err
	}

	return &types.MsgAddSpaceOwnerResponse{}, nil
}
