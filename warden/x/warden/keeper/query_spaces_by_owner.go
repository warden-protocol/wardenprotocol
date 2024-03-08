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
	"github.com/cosmos/cosmos-sdk/types/query"
	"github.com/warden-protocol/wardenprotocol/warden/x/warden/types"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k Keeper) SpacesByOwner(goCtx context.Context, req *types.QuerySpacesByOwnerRequest) (*types.QuerySpacesResponse, error) {
	if req == nil || req.Owner == "" {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(goCtx)

	spaces, pageRes, err := query.CollectionFilteredPaginate(ctx, k.spaces, req.Pagination, func(id uint64, value types.Space) (bool, error) {
		return value.IsOwner(req.Owner), nil
	}, func(id uint64, s types.Space) (types.Space, error) { return s, nil })

	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QuerySpacesResponse{
		Spaces:     spaces,
		Pagination: pageRes,
	}, nil
}
