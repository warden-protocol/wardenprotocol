package keeper

import (
	"context"

	errorsmod "cosmossdk.io/errors"
	sdk "github.com/cosmos/cosmos-sdk/types"
	types "github.com/warden-protocol/wardenprotocol/warden/x/async/types/v1beta1"
)

func (k msgServer) AddFuture(ctx context.Context, msg *types.MsgAddFuture) (*types.MsgAddFutureResponse, error) {
	if msg.Handler == "" {
		return nil, errorsmod.Wrapf(types.ErrInvalidHandler, "cannot be empty")
	}

	if len(msg.Input) == 0 {
		return nil, errorsmod.Wrapf(types.ErrInvalidFutureInput, "cannot be empty")
	}

	id, err := k.futures.Append(ctx, &types.Future{
		Creator: msg.Creator,
		Handler: msg.Handler,
		Input:   msg.Input,
	})
	if err != nil {
		return nil, err
	}

	if msg.Callback != nil && msg.Callback.Address != "" {
		k.futures.SetCallback(ctx, id, *msg.Callback)
	}

	sdkCtx := sdk.UnwrapSDKContext(ctx)
	if err := sdkCtx.EventManager().EmitTypedEvent(&types.EventCreateFuture{
		Id:              id,
		Creator:         msg.Creator,
		Handler:         msg.Handler,
		CallbackAddress: msg.Callback.Address,
	}); err != nil {
		return nil, err
	}

	return &types.MsgAddFutureResponse{
		Id: id,
	}, nil
}
