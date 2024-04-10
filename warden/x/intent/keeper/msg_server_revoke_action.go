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
