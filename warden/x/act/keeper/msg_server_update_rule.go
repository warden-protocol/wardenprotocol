package keeper

import (
	"context"
	"fmt"

	"github.com/cosmos/cosmos-sdk/telemetry"
	sdk "github.com/cosmos/cosmos-sdk/types"

	"github.com/warden-protocol/wardenprotocol/shield"
	types "github.com/warden-protocol/wardenprotocol/warden/x/act/types/v1beta1"
)

func (k msgServer) UpdateRule(ctx context.Context, msg *types.MsgUpdateRule) (*types.MsgUpdateRuleResponse, error) {
	expr, err := shield.Parse(msg.Definition)
	if err != nil {
		return nil, err
	}

	rule, err := k.rules.Get(ctx, msg.Id)
	if err != nil {
		return nil, err
	}

	if rule.Creator != msg.Creator {
		return nil, fmt.Errorf("account is not the creator of the rule")
	}

	rule.Expression = expr
	rule.Name = msg.Name

	if err := rule.Validate(); err != nil {
		return nil, err
	}

	if err := k.rules.Set(ctx, rule.Id, rule); err != nil {
		return nil, err
	}

	sdkCtx := sdk.UnwrapSDKContext(ctx)
	if err := sdkCtx.EventManager().EmitTypedEvent(&types.EventUpdateRule{
		Id: rule.Id,
	}); err != nil {
		return nil, err
	}

	telemetry.IncrCounter(1, "update_rule", "msg", "count")

	return &types.MsgUpdateRuleResponse{}, nil
}
