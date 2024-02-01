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

	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/query"
	"github.com/warden-protocol/wardenprotocol/x/intent/types"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k Keeper) Actions(goCtx context.Context, req *types.QueryActionsRequest) (*types.QueryActionsResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(goCtx)

	actions := make([]types.Action, 0, query.DefaultLimit)
	store := ctx.KVStore(k.storeKey)
	actionsStore := prefix.NewStore(store, types.KeyPrefix(types.ActionKey))

	pageRes, err := query.Paginate(actionsStore, req.Pagination, func(key []byte, value []byte) error {
		var action types.Action
		if err := k.cdc.Unmarshal(value, &action); err != nil {
			return err
		}

		actions = append(actions, action)
		return nil
	})

	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryActionsResponse{
		Actions:    actions,
		Pagination: pageRes,
	}, nil
}
