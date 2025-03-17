package keeper

import (
	"context"

	errorsmod "cosmossdk.io/errors"
	sdk "github.com/cosmos/cosmos-sdk/types"

	precommon "github.com/warden-protocol/wardenprotocol/precompiles/common"
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
		Creator:  msg.Creator,
		Handler:  msg.Handler,
		Input:    msg.Input,
		Callback: msg.Callback,
	})
	if err != nil {
		return nil, err
	}

	if msg.Callback != "" {
		address, err := precommon.AddressFromBech32Str(msg.Callback)
		if err != nil {
			return nil, errorsmod.Wrapf(types.ErrInvalidCallback, "invalid callback address: %s", err)
		}

		sdkCtx := sdk.UnwrapSDKContext(ctx)
		evmKeeper := k.getEvmKeeper(0)
		acc := evmKeeper.GetAccountWithoutBalance(sdkCtx, address)

		if acc == nil || !acc.IsContract() {
			return nil, errorsmod.Wrapf(types.ErrInvalidCallback, "callback address is not a contract")
		}
	}

	sdkCtx := sdk.UnwrapSDKContext(ctx)
	if err := sdkCtx.EventManager().EmitTypedEvent(&types.EventCreateFuture{
		Id:              id,
		Creator:         msg.Creator,
		Handler:         msg.Handler,
		CallbackAddress: msg.Callback,
	}); err != nil {
		return nil, err
	}

	return &types.MsgAddFutureResponse{
		Id: id,
	}, nil
}
