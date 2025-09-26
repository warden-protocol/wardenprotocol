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

	"github.com/cosmos/cosmos-sdk/types/query"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"

	types "github.com/warden-protocol/wardenprotocol/warden/x/async/types/v1beta1"
)

func (k Keeper) PendingTasks(ctx context.Context, req *types.QueryPendingTasksRequest) (*types.QueryPendingTasksResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	tasks, pageRes, err := query.CollectionFilteredPaginate(ctx, k.tasks.Tasks(), req.Pagination, func(key uint64, value types.Task) (bool, error) {
		hasResult, err := k.tasks.HasResult(ctx, value.Id)
		if err != nil {
			return false, err
		}

		return !hasResult, nil
	}, func(key uint64, value types.Task) (types.Task, error) {
		return value, nil
	})
	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryPendingTasksResponse{
		Pagination: pageRes,
		Tasks:      tasks,
	}, nil
}
