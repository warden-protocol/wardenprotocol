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
	"strings"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/query"
	"github.com/warden-protocol/wardenprotocol/warden/x/intent/types"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k Keeper) ActionsByAddress(goCtx context.Context, req *types.QueryActionsByAddressRequest) (*types.QueryActionsByAddressResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(goCtx)

	// Warning:
	// This query is vastly inefficient as it loads all actions, loads all
	// intents linked to them, and checks if the requested address is a
	// participant in each intent.

	actions, pageRes, err := query.CollectionFilteredPaginate(ctx, k.actions, req.Pagination, func(key uint64, value types.Action) (bool, error) {
		if req.Status != types.ActionStatus_ACTION_STATUS_UNSPECIFIED && value.Status != req.Status {
			return false, nil
		}

		intn, err := k.IntentForAction(ctx, value)
		if err != nil {
			return false, err
		}

		return strings.Contains(intn.Definition, req.Address), nil
	}, func(k uint64, a types.Action) (*types.Action, error) { return &a, nil })

	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryActionsByAddressResponse{
		Actions:    actions,
		Pagination: pageRes,
	}, nil
}
