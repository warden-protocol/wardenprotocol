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
