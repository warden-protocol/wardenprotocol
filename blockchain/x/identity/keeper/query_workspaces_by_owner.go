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

	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/query"
	"github.com/qredo/fusionchain/x/identity/types"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k Keeper) WorkspacesByOwner(goCtx context.Context, req *types.QueryWorkspacesByOwnerRequest) (*types.QueryWorkspacesResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(goCtx)

	store := ctx.KVStore(k.storeKey)
	workspaceStore := prefix.NewStore(store, types.KeyPrefix(types.WorkspaceKey))

	workspaces, pageRes, err := query.GenericFilteredPaginate(k.cdc, workspaceStore, req.Pagination, func(key []byte, value *types.Workspace) (*types.Workspace, error) {
		if !value.IsOwner(req.Owner) {
			return nil, nil
		}
		return value, nil
	}, func() *types.Workspace { return &types.Workspace{} })

	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	// extract pointers
	wss := make([]types.Workspace, 0, len(workspaces))
	for _, w := range workspaces {
		wss = append(wss, *w)
	}

	return &types.QueryWorkspacesResponse{
		Workspaces: wss,
		Pagination: pageRes,
	}, nil
}
