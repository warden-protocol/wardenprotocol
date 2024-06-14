package keeper

import (
	"context"
	"fmt"

	"github.com/cosmos/cosmos-sdk/telemetry"
	sdk "github.com/cosmos/cosmos-sdk/types"
	types "github.com/warden-protocol/wardenprotocol/warden/x/act/types/v1beta1"
)

func (k msgServer) NewAction(ctx context.Context, msg *types.MsgNewAction) (*types.MsgNewActionResponse, error) {
	var message sdk.Msg
	err := k.cdc.UnpackAny(msg.Message, &message)
	if err != nil {
		return nil, fmt.Errorf("can't unpack any: %w", err)
	}

	act, err := k.AddAction(ctx, msg.Creator, message, msg.ActionTimeoutHeight)
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
	telemetry.IncrCounter(1, "action", "count")

	return &types.MsgNewActionResponse{
		Id: act.Id,
	}, nil
}
