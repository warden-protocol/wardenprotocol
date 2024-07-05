package keeper

import (
	"context"

	"github.com/cosmos/cosmos-sdk/telemetry"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/warden-protocol/wardenprotocol/shield"
	types "github.com/warden-protocol/wardenprotocol/warden/x/act/types/v1beta1"
)

func (k msgServer) NewRule(goCtx context.Context, msg *types.MsgNewRule) (*types.MsgNewRuleResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	expr, err := shield.Parse(msg.Definition)
	if err != nil {
		return nil, err
	}

	rule := types.Rule{
		Creator:    msg.Creator,
		Name:       msg.Name,
		Expression: expr,
	}

	if err := rule.Validate(); err != nil {
		return nil, err
	}

	id, err := k.rules.Append(ctx, &rule)
	if err != nil {
		return nil, err
	}

	if err = ctx.EventManager().EmitTypedEvent(&types.EventCreateRule{
		Id:      id,
		Creator: msg.Creator,
	}); err != nil {
		return nil, err
	}

	telemetry.IncrCounter(1, "new_rule", "msg", "count")

	return &types.MsgNewRuleResponse{
		Id: id,
	}, nil
}
