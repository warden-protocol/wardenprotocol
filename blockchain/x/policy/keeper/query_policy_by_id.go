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
	"github.com/qredo/fusionchain/x/policy/types"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

// nolint:stylecheck,st1003
// revive:disable-next-line var-naming
func (k Keeper) PolicyById(goCtx context.Context, req *types.QueryPolicyByIdRequest) (*types.QueryPolicyByIdResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(goCtx)

	policyPb, found := k.PolicyRepo().Get(ctx, req.Id)
	if !found {
		return nil, status.Error(codes.NotFound, "not found")
	}

	res, err := types.NewPolicyResponse(k.cdc, policyPb)
	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryPolicyByIdResponse{Policy: res}, nil
}
