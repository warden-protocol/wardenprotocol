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

	"cosmossdk.io/collections"
	errorsmod "cosmossdk.io/errors"

	types "github.com/warden-protocol/wardenprotocol/warden/x/async/types/v1beta1"
)

func (k msgServer) AddPluginScore(ctx context.Context, msg *types.MsgAddPluginScore) (*types.MsgAddPluginScoreResponse, error) {
	var err error
	if msg.PluginId == "" {
		return nil, errorsmod.Wrapf(types.ErrInvalidPlugin, "cannot be empty")
	}

	_, err = k.GetPlugin(ctx, msg.PluginId)
	if err != nil {
		return nil, errorsmod.Wrapf(types.ErrInvalidPlugin, "doesn't exist")
	}

	task, err := k.tasks.Get(ctx, msg.TaskId)
	if err != nil {
		return nil, errorsmod.Wrapf(types.ErrInvalidTaskId, "doesn't exist")
	}

	if task.Plugin != msg.PluginId {
		return nil, errorsmod.Wrapf(types.ErrInvalidTaskId, "task %d is not associated with plugin %s", msg.TaskId, msg.PluginId)
	}

	if task.Creator != msg.Creator {
		return nil, errorsmod.Wrapf(types.ErrUnauthorised, "creator %s is not the task creator %s", msg.Creator, task.Creator)
	}

	scoreKey := collections.Join(msg.PluginId, msg.TaskId)
	scoreExists, _ := k.pluginScores.Has(ctx, scoreKey)
	if scoreExists {
		return nil, errorsmod.Wrapf(types.ErrInvalidTaskId, "The plugin already has a score for task %d", msg.TaskId)
	}

	if !types.IsValidScore(msg.Score) {
		return nil, errorsmod.Wrapf(types.ErrInvalidTaskInput, "invalid score")
	}

	score := types.NewPluginScore(
		msg.PluginId,
		msg.TaskId,
		msg.Score,
	)

	if err = k.pluginScores.Set(ctx, scoreKey, score); err != nil {
		return nil, errorsmod.Wrapf(err, "failed to set plugin score for task %d", msg.TaskId)
	}

	pluginMetrics, err := k.GetPluginMetrics(ctx, msg.PluginId)
	if err != nil {
		return nil, errorsmod.Wrapf(types.ErrInvalidPlugin, "plugin %s does not have metrics", msg.PluginId)
	}

	if err := pluginMetrics.UpdateScore(msg.Score); err != nil {
		return nil, errorsmod.Wrapf(err, "failed to update plugin metrics for plugin %s", msg.PluginId)
	}

	if err := k.pluginMetrics.Set(ctx, msg.PluginId, pluginMetrics); err != nil {
		return nil, errorsmod.Wrapf(err, "failed to set plugin metrics for plugin %s", msg.PluginId)
	}

	return &types.MsgAddPluginScoreResponse{}, nil
}
