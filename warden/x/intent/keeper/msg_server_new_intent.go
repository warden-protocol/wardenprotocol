package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/warden-protocol/wardenprotocol/shield"
	"github.com/warden-protocol/wardenprotocol/warden/x/intent/types"
)

func (k msgServer) NewIntent(goCtx context.Context, msg *types.MsgNewIntent) (*types.MsgNewIntentResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	expr, err := shield.Parse(msg.Definition)
	if err != nil {
		return nil, err
	}

	intentPb := types.Intent{
		Creator:    msg.Creator,
		Name:       msg.Name,
		Expression: expr,
	}

	id, err := k.intents.Append(ctx, &intentPb)
	if err != nil {
		return nil, err
	}

	if err = ctx.EventManager().EmitTypedEvent(&types.EventCreateIntent{
		Id:      id,
		Creator: msg.Creator,
	}); err != nil {
		return nil, err
	}

	return &types.MsgNewIntentResponse{
		Id: id,
	}, nil
}
