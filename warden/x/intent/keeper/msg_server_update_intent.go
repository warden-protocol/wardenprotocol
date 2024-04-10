package keeper

import (
	"context"
	"fmt"

	"github.com/warden-protocol/wardenprotocol/shield"
	"github.com/warden-protocol/wardenprotocol/warden/x/intent/types"
)

func (k msgServer) UpdateIntent(ctx context.Context, msg *types.MsgUpdateIntent) (*types.MsgUpdateIntentResponse, error) {
	expr, err := shield.Parse(msg.Definition)
	if err != nil {
		return nil, err
	}

	intent, err := k.intents.Get(ctx, msg.Id)
	if err != nil {
		return nil, err
	}

	if intent.Creator != msg.Creator {
		return nil, fmt.Errorf("account is not the creator of the intent")
	}

	intent.Expression = expr
	intent.Name = msg.Name

	if err := k.intents.Set(ctx, intent.Id, intent); err != nil {
		return nil, err
	}

	return &types.MsgUpdateIntentResponse{}, nil
}
