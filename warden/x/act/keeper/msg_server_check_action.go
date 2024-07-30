package keeper

import (
	"context"

	"cosmossdk.io/errors"
	sdk "github.com/cosmos/cosmos-sdk/types"
	types "github.com/warden-protocol/wardenprotocol/warden/x/act/types/v1beta1"
)

func (k msgServer) CheckAction(goCtx context.Context, msg *types.MsgCheckAction) (*types.MsgCheckActionResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)
	act, err := k.ActionKeeper.Get(ctx, msg.ActionId)
	if err != nil {
		return nil, err
	}

	if act.Status != types.ActionStatus_ACTION_STATUS_PENDING {
		return nil, errors.Wrapf(types.ErrInvalidActionStatus, "action not pending")
	}
	if act.TimeoutHeight > 0 && act.TimeoutHeight < uint64(ctx.BlockHeight()) {
		if err := act.SetStatus(ctx, types.ActionStatus_ACTION_STATUS_TIMEOUT); err != nil {
			return nil, err
		}
		err := k.ActionKeeper.Set(ctx, act)
		if err != nil {
			return nil, err
		}

		return &types.MsgCheckActionResponse{Status: act.Status.String()}, nil
	}

	if err := k.TryExecuteAction(ctx, &act); err != nil {
		return nil, err
	}

	return &types.MsgCheckActionResponse{Status: act.Status.String()}, nil
}
