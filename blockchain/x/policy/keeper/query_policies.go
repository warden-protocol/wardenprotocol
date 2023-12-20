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
	"github.com/qredo/fusionchain/x/policy/types"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k Keeper) Policies(goCtx context.Context, req *types.QueryPoliciesRequest) (*types.QueryPoliciesResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(goCtx)

	policies := make([]types.PolicyResponse, 0, query.DefaultLimit)
	store := ctx.KVStore(k.storeKey)
	policiesStore := prefix.NewStore(store, types.KeyPrefix(types.PolicyKey))

	pageRes, err := query.Paginate(policiesStore, req.Pagination, func(key []byte, value []byte) error {
		var policyPb types.Policy
		if err := k.cdc.Unmarshal(value, &policyPb); err != nil {
			return err
		}

		res, err := types.NewPolicyResponse(k.cdc, &policyPb)
		if err != nil {
			return err
		}

		policies = append(policies, *res)
		return nil
	})

	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryPoliciesResponse{
		Policies:   policies,
		Pagination: pageRes,
	}, nil
}
