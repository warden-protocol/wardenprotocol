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

	cdctypes "github.com/cosmos/cosmos-sdk/codec/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/warden-protocol/wardenprotocol/warden/intent"
	intenttypes "github.com/warden-protocol/wardenprotocol/warden/x/intent/types"
	"github.com/warden-protocol/wardenprotocol/warden/x/warden/types"
)

func (k msgServer) UpdateSpace(goCtx context.Context, msg *types.MsgUpdateSpace) (*types.MsgUpdateSpaceResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)
	ws, err := k.GetSpace(ctx, msg.SpaceAddr)
	if err != nil {
		return nil, err
	}

	act, err := k.intentKeeper.AddAction(ctx, msg.Creator, msg, ws.AdminIntentId, msg.Btl)
	if err != nil {
		return nil, err
	}

	res, err := k.UpdateSpaceActionHandler(ctx, *act, &cdctypes.Any{})
	return res.(*types.MsgUpdateSpaceResponse), err
}

func (k msgServer) UpdateSpaceIntentGenerator(ctx sdk.Context, act intenttypes.Action) (intent.Intent, error) {
	msg, err := intenttypes.GetActionMessage[*types.MsgUpdateSpace](k.cdc, act)
	if err != nil {
		return nil, err
	}

	ws, err := k.GetSpace(ctx, msg.SpaceAddr)
	if err != nil {
		return nil, err
	}

	pol := ws.IntentUpdateSpace()
	return pol, nil
}

func (k msgServer) UpdateSpaceActionHandler(ctx sdk.Context, act intenttypes.Action, payload *cdctypes.Any) (any, error) {
	ready, err := k.intentKeeper.CheckActionReady(ctx, act, nil)
	if err != nil {
		return nil, err
	}

	if !ready {
		return nil, nil
	}

	msg, err := intenttypes.GetActionMessage[*types.MsgUpdateSpace](k.cdc, act)
	if err != nil {
		return nil, err
	}

	ws, err := k.GetSpace(ctx, msg.SpaceAddr)
	if err != nil {
		return nil, err
	}

	if msg.AdminIntentId != ws.AdminIntentId {
		if msg.AdminIntentId != 0 {
			_, err := k.intentKeeper.GetIntent(ctx, msg.AdminIntentId)
			if err != nil {
				return nil, err
			}
		}
		ws.AdminIntentId = msg.AdminIntentId
	}

	if msg.SignIntentId != ws.SignIntentId {
		if msg.SignIntentId != 0 {
			_, err := k.intentKeeper.GetIntent(ctx, msg.SignIntentId)
			if err != nil {
				return nil, err
			}
		}
		ws.SignIntentId = msg.SignIntentId
	}

	if err := k.SetSpace(ctx, ws); err != nil {
		return nil, err
	}

	return &types.MsgUpdateSpaceResponse{}, nil
}
