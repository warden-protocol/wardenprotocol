// Copyright 2023 Qredo Ltd.
// This file is part of the Fusion library.
//
// The Fusion library is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// You should have received a copy of the GNU Lesser General Public License
// along with the Fusion library. If not, see https://github.com/qredo/fusionchain/blob/main/LICENSE
package keeper

import (
	"context"
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/qredo/fusionchain/x/policy/types"
)

func (k msgServer) RevokeAction(goCtx context.Context, msg *types.MsgRevokeAction) (*types.MsgRevokeActionResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	act, found := k.GetAction(ctx, msg.ActionType, msg.ActionId)
	if !found {
		return nil, fmt.Errorf("action not found")
	}

	if act.Creator != msg.Creator {
		return nil, fmt.Errorf("action creator does not match")
	}

	if act.Status != types.ActionStatus_ACTION_STATUS_PENDING {
		return nil, fmt.Errorf("action status is not pending")
	}

	act.Status = types.ActionStatus_ACTION_STATUS_REVOKED

	k.SetAction(ctx, &act)

	return &types.MsgRevokeActionResponse{}, nil
}
