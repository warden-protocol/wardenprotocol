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

func (k msgServer) RevokeAction(goCtx context.Context, msg *types.MsgRevokeAction) (*types.MsgRevokeActionResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	act, err := k.ActionKeeper.Get(ctx, msg.ActionId)
	if err != nil {
		return nil, err
	}

	if act.Creator != msg.Creator {
		return nil, fmt.Errorf("action creator does not match")
	}

	if act.Status != types.ActionStatus_ACTION_STATUS_PENDING {
		return nil, fmt.Errorf("action status is not pending")
	}

	act.UpdatedAt = k.getBlockTime(ctx)
	act.Status = types.ActionStatus_ACTION_STATUS_REVOKED

	if err := k.ActionKeeper.Set(ctx, act); err != nil {
		return nil, err
	}

	return &types.MsgRevokeActionResponse{}, nil
}
