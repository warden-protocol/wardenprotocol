package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"

	"github.com/warden-protocol/wardenprotocol/shield"
	types "github.com/warden-protocol/wardenprotocol/warden/x/act/types/v1beta1"
)

func (k msgServer) UpdateTemplate(ctx context.Context, msg *types.MsgUpdateTemplate) (*types.MsgUpdateTemplateResponse, error) {
	expr, err := shield.Parse(msg.Definition)
	if err != nil {
		return nil, err
	}

	template, err := k.templates.Get(ctx, msg.Id)
	if err != nil {
		return nil, err
	}

	if template.Creator != msg.Creator {
		return nil, types.ErrInvalidUpdateTemplateAccount
	}

	template.Expression = expr
	template.Name = msg.Name

	if err := template.Validate(); err != nil {
		return nil, err
	}

	if err := k.templates.Set(ctx, template.Id, template); err != nil {
		return nil, err
	}

	sdkCtx := sdk.UnwrapSDKContext(ctx)
	if err := sdkCtx.EventManager().EmitTypedEvent(&types.EventUpdateTemplate{
		Id: template.Id,
	}); err != nil {
		return nil, err
	}

	return &types.MsgUpdateTemplateResponse{}, nil
}
