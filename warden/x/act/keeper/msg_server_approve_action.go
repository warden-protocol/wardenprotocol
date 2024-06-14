package keeper

import (
	"context"
	"fmt"

	"github.com/cosmos/cosmos-sdk/telemetry"
	sdk "github.com/cosmos/cosmos-sdk/types"
	types "github.com/warden-protocol/wardenprotocol/warden/x/act/types/v1beta1"
)

func (k msgServer) ApproveAction(goCtx context.Context, msg *types.MsgApproveAction) (*types.MsgApproveActionResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)
	act, err := k.ActionKeeper.Get(ctx, msg.ActionId)
	if err != nil {
		return nil, err
	}

	if act.Status != types.ActionStatus_ACTION_STATUS_PENDING {
		return nil, fmt.Errorf("action not pending %s", act.Status.String())
	}
	if act.TimeoutHeight > 0 && act.TimeoutHeight < uint64(ctx.BlockHeight()) {
		if err := act.SetStatus(ctx, types.ActionStatus_ACTION_STATUS_TIMEOUT); err != nil {
			return nil, err
		}
		err := k.ActionKeeper.Set(ctx, act)
		if err != nil {
			return nil, err
		}

		return &types.MsgApproveActionResponse{
			Status: act.Status.String(),
		}, nil
	}

	if err := act.AddApprover(ctx, msg.Creator); err != nil {
		return nil, err
	}

	if err := k.TryExecuteAction(ctx, &act); err != nil {
		return nil, err
	}

	telemetry.IncrCounter(1, "approve_action", "msg", "count")

	return &types.MsgApproveActionResponse{Status: act.Status.String()}, nil
}
