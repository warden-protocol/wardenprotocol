// Copyright 2024
//
// This file includes work covered by the following copyright and permission notices:
//
// Copyright 2023 Qredo Ltd.
// Licensed under the Apache License, Version 2.0;
//
// This file is part of the Warden Protocol library.
//
// The Warden Protocol library is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// You should have received a copy of the GNU Lesser General Public License
// along with the Warden Protocol library. If not, see https://github.com/warden-protocol/wardenprotocol/blob/main/LICENSE
package keeper

import (
	"context"
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/warden-protocol/wardenprotocol/warden/x/intent/types"
)

func (k msgServer) ApproveAction(goCtx context.Context, msg *types.MsgApproveAction) (*types.MsgApproveActionResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)
	act, err := k.actions.Get(ctx, msg.ActionId)
	if err != nil {
		return nil, err
	}

	if act.Status != types.ActionStatus_ACTION_STATUS_PENDING {
		return nil, fmt.Errorf("action not pending %s", act.Status.String())
	}
	if act.Btl > 0 && act.Btl < uint64(ctx.BlockHeight()) {
		act.UpdatedAt = k.getBlockTime(ctx)
		act.Status = types.ActionStatus_ACTION_STATUS_TIMEOUT
		err := k.actions.Set(ctx, act.Id, act)
		if err != nil {
			return nil, err
		}

		return &types.MsgApproveActionResponse{
			Status: act.Status.String(),
		}, nil
	}

	intent, err := k.IntentForAction(ctx, act)
	if err != nil {
		return nil, err
	}

	participant, err := intent.AddressToParticipant(msg.Creator)
	if err != nil {
		return nil, err
	}

	timestamp := k.getBlockTime(ctx)
	if err := act.AddApprover(participant, timestamp); err != nil {
		return nil, err
	}

	ready, err := k.CheckActionReady(ctx, act, nil)
	if err != nil {
		return nil, err
	}

	if ready {
		if err := k.ExecuteAction(ctx, &act, msg.IntentPayload); err != nil {
			return nil, err
		}
	}

	return &types.MsgApproveActionResponse{Status: act.Status.String()}, nil
}
