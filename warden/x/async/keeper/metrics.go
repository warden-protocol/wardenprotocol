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
	"fmt"

	types "github.com/warden-protocol/wardenprotocol/warden/x/async/types/v1beta1"
)

func (k *Keeper) GetPluginMetrics(ctx context.Context, plugin string) (types.PluginMetrics, error) {
	if exists, _ := k.pluginMetrics.Has(ctx, plugin); exists {
		return k.pluginMetrics.Get(ctx, plugin)
	}

	pluginMetrics := types.NewPluginMetrics(plugin)
	if err := k.pluginMetrics.Set(ctx, plugin, pluginMetrics); err != nil {
		return types.PluginMetrics{}, fmt.Errorf("failed to set plugin metrics for %s: %w", plugin, err)
	}

	return pluginMetrics, nil
}
