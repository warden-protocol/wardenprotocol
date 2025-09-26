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
	"math"

	cosmosmath "cosmossdk.io/math"
	cosmos_types "github.com/cosmos/cosmos-sdk/types"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"

	types "github.com/warden-protocol/wardenprotocol/warden/x/async/types/v1beta1"
)

func (k Keeper) PluginMetricsById(ctx context.Context, req *types.QueryPluginMetricsByIdRequest) (*types.QueryPluginMetricsByIdResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	metrics, err := k.GetPluginMetrics(ctx, req.Id)
	if err != nil {
		return nil, status.Error(codes.NotFound, err.Error())
	}

	averageTimeToGetResultMsec := cosmosmath.ZeroInt()
	if metrics.ResultsCount > 0 {
		averageTimeToGetResultMsec = metrics.TotalResultTimeMsec.Quo(cosmosmath.NewIntFromUint64(metrics.ResultsCount))
	}

	averageInputSizeBytes := cosmosmath.ZeroInt()
	if metrics.TasksCount > 0 {
		averageInputSizeBytes = metrics.TotalInputSizeBytes.Quo(cosmosmath.NewIntFromUint64(metrics.TasksCount))
	}

	averageOutputSizeBytes := cosmosmath.ZeroInt()
	if metrics.ResultsCount > 0 {
		averageOutputSizeBytes = metrics.TotalOutputSizeBytes.Quo(cosmosmath.NewIntFromUint64(metrics.ResultsCount))
	}

	precision := int64(6)

	successTaskRatio := cosmosmath.LegacyNewDec(0)
	if metrics.TasksCount > 0 {
		successfulTasksCount := cosmosmath.LegacyNewDecFromIntWithPrec(cosmosmath.NewIntFromUint64(metrics.ResultsCount*uint64(math.Pow10(int(precision)))), precision)
		allTasksCount := cosmosmath.LegacyNewDecFromIntWithPrec(cosmosmath.NewIntFromUint64(metrics.TasksCount*uint64(math.Pow10(int(precision)))), precision)
		successTaskRatio = successfulTasksCount.Quo(allTasksCount)
	}

	avgFee := []cosmos_types.DecCoin{}

	for _, v := range metrics.TotalFees {
		decAmount := cosmosmath.LegacyNewDecFromIntWithPrec(
			v.Amount.Mul(cosmosmath.NewIntFromUint64(uint64(precision))),
			precision)

		avgFee = append(avgFee, cosmos_types.DecCoin{
			Denom:  v.Denom,
			Amount: decAmount.QuoInt(cosmosmath.NewIntFromUint64(metrics.ResultsCount)),
		})
	}

	return &types.QueryPluginMetricsByIdResponse{
		Plugin:                     req.Id,
		AverageTimeToGetResultMsec: averageTimeToGetResultMsec,
		AverageInputSizeBytes:      averageInputSizeBytes,
		AverageOutputSizeBytes:     averageOutputSizeBytes,
		TasksCount:                 metrics.TasksCount,
		ResultsCount:               metrics.ResultsCount,
		SuccessTaskRatio:           successTaskRatio,
		AverageFeePaid:             avgFee,
	}, nil
}
