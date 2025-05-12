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
	sdk "github.com/cosmos/cosmos-sdk/types"

	types "github.com/warden-protocol/wardenprotocol/warden/x/async/types/v1beta1"
	schedtypes "github.com/warden-protocol/wardenprotocol/warden/x/sched/types/v1beta1"
)

func (k msgServer) AddTask(ctx context.Context, msg *types.MsgAddTask) (*types.MsgAddTaskResponse, error) {
	var err error
	if msg.Plugin == "" {
		return nil, errorsmod.Wrapf(types.ErrInvalidPlugin, "cannot be empty")
	}

	plugin, err := k.GetPlugin(ctx, msg.Plugin)
	if err != nil {
		return nil, errorsmod.Wrapf(types.ErrInvalidPlugin, "doesn't exist")
	}

	if !k.HasPluginValidators(ctx, msg.Plugin) {
		return nil, errorsmod.Wrapf(types.ErrInvalidPlugin, "plugin doesn't have any registered validators providers")
	}

	if len(msg.Input) == 0 {
		return nil, errorsmod.Wrapf(types.ErrInvalidTaskInput, "cannot be empty")
	}

	if err := plugin.Fee.EnsureSufficientFees(msg.MaxFee); err != nil {
		return nil, errorsmod.Wrapf(
			types.ErrInsufficientFees,
			"insufficient fees for plugin %s, expected: %s, got: %s",
			msg.Plugin, plugin.Fee, msg.MaxFee)
	}

	deductedFee, err := k.deductPluginFees(ctx, sdk.MustAccAddressFromBech32(msg.Creator), plugin.Fee)
	if err != nil {
		return nil, err
	}

	var callbackId uint64
	if msg.CallbackParams != nil {
		callbackId, err = k.schedKeeper.SetCallback(ctx, &schedtypes.Callback{
			Address:  msg.CallbackParams.Address,
			GasLimit: msg.CallbackParams.GasLimit,
		})
		if err != nil {
			return nil, err
		}
	}

	id, err := k.tasks.Append(ctx, &types.Task{
		Creator:    msg.Creator,
		Plugin:     msg.Plugin,
		Input:      msg.Input,
		CallbackId: callbackId,
		Fee:        deductedFee,
	})
	if err != nil {
		return nil, err
	}

	sdkCtx := sdk.UnwrapSDKContext(ctx)
	if err = sdkCtx.EventManager().EmitTypedEvent(&types.EventCreateTask{
		Id:         id,
		Creator:    msg.Creator,
		Plugin:     msg.Plugin,
		CallbackId: callbackId,
	}); err != nil {
		return nil, err
	}

	return &types.MsgAddTaskResponse{
		Id: id,
	}, nil
}
