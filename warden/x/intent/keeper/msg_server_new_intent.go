package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/warden-protocol/wardenprotocol/warden/x/intent/types"
)

func (k msgServer) NewIntent(goCtx context.Context, msg *types.MsgNewIntent) (*types.MsgNewIntentResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	intentPb := types.Intent{
		Creator:    msg.Creator,
		Name:       msg.Name,
		Definition: msg.Definition,
	}

	id, err := k.intents.Append(ctx, &intentPb)
	if err != nil {
		return nil, err
	}

	return &types.MsgNewIntentResponse{
		Id: id,
	}, nil
}
