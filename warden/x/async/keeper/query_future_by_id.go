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
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"

	types "github.com/warden-protocol/wardenprotocol/warden/x/async/types/v1beta1"
)

func (k Keeper) TaskById(ctx context.Context, req *types.QueryTaskByIdRequest) (*types.QueryTaskByIdResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	task, err := k.tasks.Get(ctx, req.Id)
	if err != nil {
		return nil, status.Error(codes.NotFound, err.Error())
	}

	var result *types.TaskResult

	r, err := k.tasks.GetResult(ctx, req.Id)
	if err == nil {
		result = &r
	} else if !errors.Is(err, collections.ErrNotFound) {
		return nil, err
	}

	votes, err := k.GetTaskVotes(ctx, req.Id)
	if err != nil {
		return nil, err
	}

	return &types.QueryTaskByIdResponse{
		TaskResponse: types.TaskResponse{
			Task:   task,
			Result: result,
			Votes:  votes,
		},
	}, nil
}
