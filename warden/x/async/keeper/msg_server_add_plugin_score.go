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

	errorsmod "cosmossdk.io/errors"

	types "github.com/warden-protocol/wardenprotocol/warden/x/async/types/v1beta1"
)

func (k msgServer) AddPluginScore(ctx context.Context, msg *types.MsgAddPluginScore) (*types.MsgAddPluginScoreResponse, error) {
	if _, err := k.GetPlugin(ctx, msg.PluginId); err != nil {
		return nil, errorsmod.Wrapf(types.ErrInvalidPlugin, "doesn't exist")
	}

	task, err := k.tasks.Get(ctx, msg.TaskId)
	if err != nil {
		return nil, errorsmod.Wrapf(types.ErrInvalidTaskId, "doesn't exist")
	}

	if task.Plugin != msg.PluginId {
		return nil, errorsmod.Wrapf(types.ErrInvalidPluginId, "task %d is not associated with plugin %s", msg.TaskId, msg.PluginId)
	}

	if task.Creator != msg.Creator {
		return nil, errorsmod.Wrapf(types.ErrUnauthorised, "creator %s is not the task creator %s", msg.Creator, task.Creator)
	}

	if err := k.addPluginScore(ctx, msg.PluginId, msg.TaskId, msg.Score); err != nil {
		return nil, err
	}

	return &types.MsgAddPluginScoreResponse{}, nil
}
