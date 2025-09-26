package keeper

import (
	"context"
	"fmt"

	"cosmossdk.io/errors"
	sdk "github.com/cosmos/cosmos-sdk/types"

	"github.com/warden-protocol/wardenprotocol/shield"
	types "github.com/warden-protocol/wardenprotocol/warden/x/act/types/v1beta1"
)

func (k msgServer) NewAction(ctx context.Context, msg *types.MsgNewAction) (*types.MsgNewActionResponse, error) {
	var message sdk.Msg

	err := k.cdc.UnpackAny(msg.Message, &message)
	if err != nil {
		return nil, fmt.Errorf("can't unpack any: %w", err)
	}

	expectedApproveExpression, err := shield.Parse(msg.ExpectedApproveExpression)
	if err != nil {
		return nil, errors.Wrapf(types.ErrInvalidExpressionDefinition, "%v", err)
	}

	expectedRejectExpression, err := shield.Parse(msg.ExpectedRejectExpression)
	if err != nil {
		return nil, errors.Wrapf(types.ErrInvalidExpressionDefinition, "%v", err)
	}

	act, err := k.AddAction(ctx, msg.Creator, message, msg.ActionTimeoutHeight, expectedApproveExpression, expectedRejectExpression)
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
