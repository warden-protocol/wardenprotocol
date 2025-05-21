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

	sdk "github.com/cosmos/cosmos-sdk/types"

	types "github.com/warden-protocol/wardenprotocol/warden/x/async/types/v1beta1"
)

// deductKeychainFees is to deduct fees from creator's address to warden escrow address.
func (k Keeper) deductPluginFees(
	ctx context.Context,
	pluginUser sdk.AccAddress,
	fees types.PluginFee,
) (types.DeductedFee, error) {
	toBeDeductedFee := fees.CalculateDistributedFees()

	if !toBeDeductedFee.IsEmpty() {
		err := k.bankKeeper.SendCoins(ctx, pluginUser, k.asyncModuleAddress, toBeDeductedFee.Total())
		if err != nil {
			return types.DeductedFee{}, err
		}
	}

	return toBeDeductedFee, nil
}

// releasePluginFees is to distribute fees between the executor of a task and the creator of a plugin.
func (k Keeper) releasePluginFees(
	ctx context.Context,
	pluginCreator sdk.AccAddress,
	taskExecutor sdk.AccAddress,
	fees types.DeductedFee,
) error {
	if !fees.PluginCreatorReward.IsZero() {
		err := k.bankKeeper.SendCoins(
			ctx,
			k.asyncModuleAddress,
			pluginCreator,
			fees.PluginCreatorReward)
		if err != nil {
			return err
		}
	}

	if !fees.ExecutorReward.IsZero() {
		err := k.bankKeeper.SendCoins(
			ctx,
			k.asyncModuleAddress,
			taskExecutor,
			fees.ExecutorReward)
		if err != nil {
			return err
		}
	}

	return nil
}

// rejected or timed-out.
//
//nolint:unused
func (k Keeper) refundPluginFees(
	ctx context.Context,
	pluginUser sdk.AccAddress,
	fees types.DeductedFee,
) error {
	if !fees.IsEmpty() {
		return k.bankKeeper.SendCoins(ctx, k.asyncModuleAddress, pluginUser, fees.Total())
	}

	return nil
}
