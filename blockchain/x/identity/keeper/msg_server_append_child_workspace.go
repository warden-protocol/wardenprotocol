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
	"context"
	"errors"
	"fmt"

	cdctypes "github.com/cosmos/cosmos-sdk/codec/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/qredo/fusionchain/policy"
	"github.com/qredo/fusionchain/x/identity/types"
	bbird "github.com/qredo/fusionchain/x/policy/keeper"
	bbirdtypes "github.com/qredo/fusionchain/x/policy/types"
)

func (k msgServer) AppendChildWorkspace(goCtx context.Context, msg *types.MsgAppendChildWorkspace) (*types.MsgAppendChildWorkspaceResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)
	parent := k.GetWorkspace(ctx, msg.ParentWorkspaceAddr)
	if parent == nil {
		return nil, fmt.Errorf("workspace not found")
	}

	act, err := k.policyKeeper.AddAction(ctx, msg.Creator, msg, parent.AdminPolicyId, msg.Btl)
	if err != nil {
		return nil, err
	}
	return k.AppendChildWorkspaceActionHandler(ctx, act, &cdctypes.Any{})
}

func (k msgServer) AppendChildWorkspacePolicyGenerator(ctx sdk.Context, msg *types.MsgAppendChildWorkspace) (policy.Policy, error) {
	parent := k.GetWorkspace(ctx, msg.ParentWorkspaceAddr)
	if parent == nil {
		return nil, fmt.Errorf("workspace not found")
	}

	pol := parent.PolicyAppendChild()
	return pol, nil
}

func (k msgServer) AppendChildWorkspaceActionHandler(ctx sdk.Context, act *bbirdtypes.Action, payload *cdctypes.Any) (*types.MsgAppendChildWorkspaceResponse, error) {
	return bbird.TryExecuteAction(
		k.policyKeeper,
		k.cdc,
		ctx,
		act,
		payload,
		func(ctx sdk.Context, msg *types.MsgAppendChildWorkspace) (*types.MsgAppendChildWorkspaceResponse, error) {
			child := k.GetWorkspace(ctx, msg.ChildWorkspaceAddr)
			parent := k.GetWorkspace(ctx, msg.ParentWorkspaceAddr)

			if child == nil || parent == nil {
				return nil, errors.New("one or more invalid workspace addresses provided")
			}

			parent.AddChild(child)
			k.SetWorkspace(ctx, parent)

			return &types.MsgAppendChildWorkspaceResponse{}, nil
		},
	)
}
