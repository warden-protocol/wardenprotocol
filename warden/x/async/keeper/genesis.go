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
	"fmt"

	"cosmossdk.io/math"
	sdk "github.com/cosmos/cosmos-sdk/types"

	types "github.com/warden-protocol/wardenprotocol/warden/x/async/types/v1beta1"
)

func (k *Keeper) ImportState(ctx sdk.Context, genState types.GenesisState) error {
	if err := k.registerGenesisPlugins(ctx, genState.ActivePlugins); err != nil {
		return err
	}

	return nil
}

func (k *Keeper) ExportState(ctx sdk.Context, genState *types.GenesisState) error {
	return nil
}

func (k *Keeper) registerGenesisPlugins(ctx sdk.Context, activePlugins []types.GenesisPlugin) error {
	zeroFees := types.PluginFee{
		Fee:                          sdk.NewCoins(),
		PluginCreatorRewardInPercent: math.LegacyZeroDec(),
	}

	maxTaskTimeout := k.GetParams(ctx).MaxTaskTimeout

	for _, p := range activePlugins {
		timeout := maxTaskTimeout
		if p.Timeout != nil {
			timeout = *p.Timeout
		}
		if timeout == 0 {
			return fmt.Errorf("timeout must be greater than zero, for plugin: %s", p.Name)
		}
		if timeout > maxTaskTimeout {
			return fmt.Errorf("maximum timeout allowed for plugins: %s, got %s for %s", maxTaskTimeout, timeout, p.Name)
		}

		if err := k.addPlugin(ctx, types.Plugin{
			Id:          p.Name,
			Creator:     k.asyncModuleAddress.String(),
			Description: "",
			Fee:         zeroFees,
			Timeout:     timeout,
		}); err != nil {
			return err
		}
	}

	return nil
}
