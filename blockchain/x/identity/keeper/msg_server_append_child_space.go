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
	"errors"
	"fmt"

	cdctypes "github.com/cosmos/cosmos-sdk/codec/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/warden-protocol/wardenprotocol/intent"
	"github.com/warden-protocol/wardenprotocol/x/identity/types"
	bbird "github.com/warden-protocol/wardenprotocol/x/intent/keeper"
	bbirdtypes "github.com/warden-protocol/wardenprotocol/x/intent/types"
)

func (k msgServer) AppendChildSpace(goCtx context.Context, msg *types.MsgAppendChildSpace) (*types.MsgAppendChildSpaceResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)
	parent := k.GetSpace(ctx, msg.ParentSpaceAddr)
	if parent == nil {
		return nil, fmt.Errorf("space not found")
	}

	act, err := k.intentKeeper.AddAction(ctx, msg.Creator, msg, parent.AdminIntentId, msg.Btl)
	if err != nil {
		return nil, err
	}
	return k.AppendChildSpaceActionHandler(ctx, act, &cdctypes.Any{})
}

func (k msgServer) AppendChildSpaceIntentGenerator(ctx sdk.Context, msg *types.MsgAppendChildSpace) (intent.Intent, error) {
	parent := k.GetSpace(ctx, msg.ParentSpaceAddr)
	if parent == nil {
		return nil, fmt.Errorf("space not found")
	}

	pol := parent.IntentAppendChild()
	return pol, nil
}

func (k msgServer) AppendChildSpaceActionHandler(ctx sdk.Context, act *bbirdtypes.Action, payload *cdctypes.Any) (*types.MsgAppendChildSpaceResponse, error) {
	return bbird.TryExecuteAction(
		k.intentKeeper,
		k.cdc,
		ctx,
		act,
		payload,
		func(ctx sdk.Context, msg *types.MsgAppendChildSpace) (*types.MsgAppendChildSpaceResponse, error) {
			child := k.GetSpace(ctx, msg.ChildSpaceAddr)
			parent := k.GetSpace(ctx, msg.ParentSpaceAddr)

			if child == nil || parent == nil {
				return nil, errors.New("one or more invalid space addresses provided")
			}

			parent.AddChild(child)
			k.SetSpace(ctx, parent)

			return &types.MsgAppendChildSpaceResponse{}, nil
		},
	)
}
