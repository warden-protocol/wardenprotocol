package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"
	types "github.com/warden-protocol/wardenprotocol/warden/x/act/types/v1beta1"
)

func (k msgServer) RevokeAction(goCtx context.Context, msg *types.MsgRevokeAction) (*types.MsgRevokeActionResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	act, err := k.ActionKeeper.Get(ctx, msg.ActionId)
	if err != nil {
		return nil, err
	}

	if act.Creator != msg.Creator {
		return nil, types.ErrInvalidRevoker
	}

	if err := act.SetStatus(ctx, types.ActionStatus_ACTION_STATUS_REVOKED); err != nil {
		return nil, err
	}

	if err := k.ActionKeeper.Set(ctx, act); err != nil {
		return nil, err
	}

	return &types.MsgRevokeActionResponse{}, nil
}
