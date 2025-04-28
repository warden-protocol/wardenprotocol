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
	"cosmossdk.io/math"
	sdk "github.com/cosmos/cosmos-sdk/types"

	"github.com/warden-protocol/wardenprotocol/prophet"
	types "github.com/warden-protocol/wardenprotocol/warden/x/async/types/v1beta1"
)

func (k *Keeper) ImportState(ctx sdk.Context, genState types.GenesisState) error {
	return nil
}

func (k *Keeper) ExportState(ctx sdk.Context, genState *types.GenesisState) error {
	return nil
}

func (k *Keeper) AddProphetPlugins(ctx sdk.Context) error {
	zeroFees := types.PluginFee{
		Fee:                          sdk.NewCoins(),
		PluginCreatorRewardInPercent: math.LegacyZeroDec(),
	}

	for _, p := range prophet.RegisteredPlugins() {
		if err := k.AddPlugin(ctx, types.Plugin{
			Id:          p,
			Creator:     k.asyncModuleAddress.String(),
			Description: "",
			Fee:         zeroFees,
		}); err != nil {
			return err
		}
	}

	return nil
}
