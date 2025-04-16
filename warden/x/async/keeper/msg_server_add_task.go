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

	precommon "github.com/warden-protocol/wardenprotocol/precompiles/common"
	types "github.com/warden-protocol/wardenprotocol/warden/x/async/types/v1beta1"
)

func (k msgServer) AddTask(ctx context.Context, msg *types.MsgAddTask) (*types.MsgAddTaskResponse, error) {
	if msg.Plugin == "" {
		return nil, errorsmod.Wrapf(types.ErrInvalidPlugin, "cannot be empty")
	}

	if _, err := k.GetPlugin(ctx, msg.Plugin); err != nil {
		return nil, errorsmod.Wrapf(types.ErrInvalidPlugin, "doesn't exist")
	}

	if !k.HasPluginValidators(ctx, msg.Plugin) {
		return nil, errorsmod.Wrapf(types.ErrInvalidPlugin, "plugin doesn't have any registered validators providers")
	}

	if len(msg.Input) == 0 {
		return nil, errorsmod.Wrapf(types.ErrInvalidTaskInput, "cannot be empty")
	}

	id, err := k.tasks.Append(ctx, &types.Task{
		Creator:  msg.Creator,
		Plugin:   msg.Plugin,
		Input:    msg.Input,
		Callback: msg.Callback,
	})
	if err != nil {
		return nil, err
	}

	if msg.Callback != "" {
		address, err := precommon.AddressFromBech32Str(msg.Callback)
		if err != nil {
			return nil, errorsmod.Wrapf(types.ErrInvalidCallback, "invalid callback address: %s", err)
		}

		sdkCtx := sdk.UnwrapSDKContext(ctx)
		evmKeeper := k.getEvmKeeper(0)
		acc := evmKeeper.GetAccountWithoutBalance(sdkCtx, address)

		if acc == nil || !acc.IsContract() {
			return nil, errorsmod.Wrapf(types.ErrInvalidCallback, "callback address is not a contract")
		}
	}

	sdkCtx := sdk.UnwrapSDKContext(ctx)
	if err := sdkCtx.EventManager().EmitTypedEvent(&types.EventCreateTask{
		Id:              id,
		Creator:         msg.Creator,
		Plugin:          msg.Plugin,
		CallbackAddress: msg.Callback,
	}); err != nil {
		return nil, err
	}

	return &types.MsgAddTaskResponse{
		Id: id,
	}, nil
}
