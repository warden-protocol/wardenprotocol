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
	"github.com/warden-protocol/wardenprotocol/x/intent/types"
)

func (k msgServer) ApproveAction(goCtx context.Context, msg *types.MsgApproveAction) (*types.MsgApproveActionResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)
	act, found := k.GetAction(ctx, msg.ActionType, msg.ActionId)
	if !found {
		return nil, fmt.Errorf("action not found")
	}

	if act.Status != types.ActionStatus_ACTION_STATUS_PENDING {
		return nil, fmt.Errorf("action not pending %s", act.Status.String())
	}
	if act.Btl > 0 && act.Btl < uint64(ctx.BlockHeight()) {
		act.Status = types.ActionStatus_ACTION_STATUS_TIMEOUT
		k.SetAction(ctx, &act)

		return &types.MsgApproveActionResponse{
			Status: act.Status.String(),
		}, nil
	}

	intent, err := IntentForAction(ctx, &k.Keeper, &act)
	if err != nil {
		return nil, err
	}

	participant, err := intent.AddressToParticipant(msg.Creator)
	if err != nil {
		return nil, err
	}

	if err := act.AddApprover(participant); err != nil {
		return nil, err
	}

	k.SetAction(ctx, &act)

	h, ok := k.actionHandlers[msg.ActionType]
	if !ok {
		return nil, fmt.Errorf("action handler not found for %s", msg.ActionType)
	}

	if _, err := h(ctx, &act, msg.IntentPayload); err != nil {
		return nil, err
	}

	return &types.MsgApproveActionResponse{Status: act.Status.String()}, nil
}
