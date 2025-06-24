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

	"cosmossdk.io/collections"
	errorsmod "cosmossdk.io/errors"

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

func (k *Keeper) addPluginScore(ctx context.Context, pluginId string, taskId uint64, score uint32) error {
	scoreKey := collections.Join(pluginId, taskId)
	scoreExists, _ := k.pluginScores.Has(ctx, scoreKey)
	if scoreExists {
		return errorsmod.Wrapf(types.ErrTaskAlreadyHasScore, "The plugin already has a score for task %d", taskId)
	}

	if !types.IsValidScore(score) {
		return errorsmod.Wrapf(types.ErrInvalidTaskInput, "invalid score")
	}

	pluginScore := types.NewPluginScore(
		pluginId,
		taskId,
		score,
	)

	if err := k.pluginScores.Set(ctx, scoreKey, pluginScore); err != nil {
		return errorsmod.Wrapf(err, "failed to set plugin score for task %d", taskId)
	}

	pluginMetrics, err := k.GetPluginMetrics(ctx, pluginId)
	if err != nil {
		return errorsmod.Wrapf(types.ErrInvalidPlugin, "plugin %s does not have metrics", pluginId)
	}

	if err := pluginMetrics.UpdateScore(score); err != nil {
		return errorsmod.Wrapf(err, "failed to update plugin metrics for plugin %s", pluginId)
	}

	if err := k.pluginMetrics.Set(ctx, pluginId, pluginMetrics); err != nil {
		return errorsmod.Wrapf(err, "failed to set plugin metrics for plugin %s", pluginId)
	}

	return nil
}

func (k *Keeper) prunePluginScore(ctx context.Context, pluginId string, taskId uint64) error {
	scoreKey := collections.Join(pluginId, taskId)
	scoreExists, _ := k.pluginScores.Has(ctx, scoreKey)
	if !scoreExists {
		return nil
	}

	if err := k.pluginScores.Remove(ctx, scoreKey); err != nil {
		return errorsmod.Wrapf(err, "failed to remove plugin score for task %d", taskId)
	}

	return nil
}
