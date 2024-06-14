package keeper

import (
	"context"
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/warden-protocol/wardenprotocol/warden/x/intent/types"
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
		act.UpdatedAt = k.getBlockTime(ctx)
		act.Status = types.ActionStatus_ACTION_STATUS_TIMEOUT
		err := k.ActionKeeper.Set(ctx, act)
		if err != nil {
			return nil, err
		}

		return &types.MsgApproveActionResponse{
			Status: act.Status.String(),
		}, nil
	}

	timestamp := k.getBlockTime(ctx)
	if err := act.AddApprover(msg.Creator, timestamp); err != nil {
		return nil, err
	}

	if err := k.TryExecuteAction(ctx, &act); err != nil {
		return nil, err
	}

	return &types.MsgApproveActionResponse{Status: act.Status.String()}, nil
}
