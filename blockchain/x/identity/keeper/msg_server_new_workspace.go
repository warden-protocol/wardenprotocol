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

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/qredo/fusionchain/x/identity/types"
)

func (k msgServer) NewWorkspace(goCtx context.Context, msg *types.MsgNewWorkspace) (*types.MsgNewWorkspaceResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	workspace := &types.Workspace{
		Creator:         msg.Creator,
		ChildWorkspaces: nil,
		AdminPolicyId:   msg.AdminPolicyId,
		SignPolicyId:    msg.SignPolicyId,
	}

	if err := workspace.AddOwner(msg.Creator); err != nil {
		return nil, err
	}
	for _, owner := range msg.AdditionalOwners {
		if err := workspace.AddOwner(owner); err != nil {
			return nil, err
		}
	}

	return &types.MsgNewWorkspaceResponse{
		Address: k.CreateWorkspace(ctx, workspace),
	}, nil
}
