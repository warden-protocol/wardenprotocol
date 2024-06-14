package keeper

import (
	"context"
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/warden-protocol/wardenprotocol/warden/x/intent/types"
)

func (k msgServer) NewAction(ctx context.Context, msg *types.MsgNewAction) (*types.MsgNewActionResponse, error) {
	var message sdk.Msg
	err := k.cdc.UnpackAny(msg.Message, &message)
	if err != nil {
		return nil, fmt.Errorf("can't unpack any: %w", err)
	}

	ctx, intent, err := k.intentsRegistry.Get(ctx, message)
	if err != nil {
		return nil, fmt.Errorf("can't get intent for message: %w", err)
	}

	act, err := k.AddAction(ctx, msg.Creator, message, intent, msg.ActionTimeoutHeight)
	if err != nil {
		return nil, err
	}

	sdkCtx := sdk.UnwrapSDKContext(ctx)
	if err := sdkCtx.EventManager().EmitTypedEvent(&types.EventCreateAction{
		Id:      act.Id,
		Creator: msg.Creator,
	}); err != nil {
		return nil, err
	}
	return &types.MsgNewActionResponse{
		Id: act.Id,
	}, nil
}
