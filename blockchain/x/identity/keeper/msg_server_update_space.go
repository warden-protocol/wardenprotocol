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

func (k msgServer) UpdateSpace(goCtx context.Context, msg *types.MsgUpdateSpace) (*types.MsgUpdateSpaceResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)
	ws := k.GetSpace(ctx, msg.SpaceAddr)
	if ws == nil {
		return nil, fmt.Errorf("space not found")
	}

	act, err := k.intentKeeper.AddAction(ctx, msg.Creator, msg, ws.AdminIntentId, msg.Btl)
	if err != nil {
		return nil, err
	}

	return k.UpdateSpaceActionHandler(ctx, act, &cdctypes.Any{})
}

func (k msgServer) UpdateSpaceIntentGenerator(ctx sdk.Context, msg *types.MsgUpdateSpace) (intent.Intent, error) {
	ws := k.GetSpace(ctx, msg.SpaceAddr)
	if ws == nil {
		return nil, fmt.Errorf("space not found")
	}

	pol := ws.IntentUpdateSpace()
	return pol, nil
}

func (k msgServer) UpdateSpaceActionHandler(ctx sdk.Context, act *bbirdtypes.Action, payload *cdctypes.Any) (*types.MsgUpdateSpaceResponse, error) {
	return bbird.TryExecuteAction(
		k.intentKeeper,
		k.cdc,
		ctx,
		act,
		payload,
		func(ctx sdk.Context, msg *types.MsgUpdateSpace) (*types.MsgUpdateSpaceResponse, error) {
			ws := k.GetSpace(ctx, msg.SpaceAddr)
			if ws == nil {
				return nil, fmt.Errorf("space not found")
			}

			if msg.AdminIntentId != ws.AdminIntentId {
				if msg.AdminIntentId != 0 {
					_, found := k.intentKeeper.IntentRepo().Get(ctx, msg.AdminIntentId)
					if !found {
						return nil, fmt.Errorf("admin intent not found")
					}
				}
				ws.AdminIntentId = msg.AdminIntentId
			}

			if msg.SignIntentId != ws.SignIntentId {
				if msg.SignIntentId != 0 {
					_, found := k.intentKeeper.IntentRepo().Get(ctx, msg.SignIntentId)
					if !found {
						return nil, fmt.Errorf("sign intent not found")
					}
				}
				ws.SignIntentId = msg.SignIntentId
			}

			k.SetSpace(ctx, ws)

			return &types.MsgUpdateSpaceResponse{}, nil
		},
	)
}
