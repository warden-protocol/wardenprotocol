// Copyright (c) 2025 Warden Labs. All Rights Reserved.
//
// ** RESTRICTED LICENSE **
//
// This file is part of the 'async' module. It is NOT licensed
// under the Apache 2.0 license governing the rest of the project.
// Refer to the LICENSE file in this module's directory for full terms.
// Use, modification, and distribution are strictly limited.
// Do NOT use this file unless you agree to the terms stated in that license.
//
// SPDX-FileCopyrightText: 2025 Warden Labs
// SPDX-License-Identifier: LicenseRef-Proprietary-RestrictedModule

package keeper

import (
	"context"
	"errors"

	"cosmossdk.io/collections"
	"github.com/cosmos/cosmos-sdk/types/query"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"

	types "github.com/warden-protocol/wardenprotocol/warden/x/async/types/v1beta1"
)

func (k Keeper) Tasks(ctx context.Context, req *types.QueryTasksRequest) (*types.QueryTasksResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	tasks, pageRes, err := query.CollectionFilteredPaginate(ctx, k.tasks.Tasks(), req.Pagination, func(key uint64, value types.Task) (bool, error) {
		return req.Creator == "" || req.Creator == value.Creator, nil
	}, func(key uint64, value types.Task) (types.TaskResponse, error) {
		var result *types.TaskResult

		r, err := k.tasks.GetResult(ctx, value.Id)
		if err == nil {
			result = &r
		} else if !errors.Is(err, collections.ErrNotFound) {
			return types.TaskResponse{}, err
		}

		votes, err := k.GetTaskVotes(ctx, value.Id)
		if err != nil {
			return types.TaskResponse{}, err
		}

		return types.TaskResponse{
			Task:   value,
			Result: result,
			Votes:  votes,
		}, nil
	})
	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryTasksResponse{
		Pagination: pageRes,
		Tasks:      tasks,
	}, nil
}
