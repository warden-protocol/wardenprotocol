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
	sdk "github.com/cosmos/cosmos-sdk/types"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"

	types "github.com/warden-protocol/wardenprotocol/warden/x/async/types/v1beta1"
)

func (k Keeper) PluginValidators(ctx context.Context, req *types.QueryPluginValidatorsRequest) (*types.QueryPluginValidatorsResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	queueID := QueueID(req.Name)

	totalWeight, err := k.queueTotalWeights.Get(ctx, queueID)
	if errors.Is(err, collections.ErrNotFound) {
		return nil, status.Error(codes.NotFound, "queue not found")
	}
	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	it, err := k.queuePriorities.Iterate(ctx, collections.NewPrefixedPairRange[QueueID, sdk.ConsAddress](queueID))
	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	var priorities []types.QueuePriority
	for ; it.Valid(); it.Next() {
		key, err := it.Key()
		if err != nil {
			return nil, status.Error(codes.Internal, err.Error())
		}
		v, err := it.Value()
		if err != nil {
			return nil, status.Error(codes.Internal, err.Error())
		}
		priorities = append(priorities, types.QueuePriority{
			Validator: key.K2(),
			Priority:  int64(v),
		})
	}

	if err := it.Close(); err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	it2, err := k.queueWeights.Iterate(ctx, collections.NewPrefixedPairRange[QueueID, sdk.ConsAddress](queueID))
	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	var weights []types.QueueWeight
	for ; it2.Valid(); it2.Next() {
		key, err := it2.Key()
		if err != nil {
			return nil, status.Error(codes.Internal, err.Error())
		}
		v, err := it2.Value()
		if err != nil {
			return nil, status.Error(codes.Internal, err.Error())
		}
		weights = append(weights, types.QueueWeight{
			Validator: key.K2(),
			Weight:    int64(v),
		})
	}

	if err := it2.Close(); err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryPluginValidatorsResponse{
		QueueTotalWeight: int64(totalWeight),
		QueuePriorities:  priorities,
		QueueWeights:     weights,
	}, nil
}
