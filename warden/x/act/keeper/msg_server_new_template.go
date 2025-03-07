package keeper

import (
	"context"

	"cosmossdk.io/errors"
	sdk "github.com/cosmos/cosmos-sdk/types"

	"github.com/warden-protocol/wardenprotocol/shield"
	types "github.com/warden-protocol/wardenprotocol/warden/x/act/types/v1beta1"
)

func (k msgServer) NewTemplate(goCtx context.Context, msg *types.MsgNewTemplate) (*types.MsgNewTemplateResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	expr, err := shield.Parse(msg.Definition)
	if err != nil {
		return nil, errors.Wrapf(types.ErrInvalidExpressionDefinition, "%v", err)
	}

	template := types.Template{
		Creator:    msg.Creator,
		Name:       msg.Name,
		Expression: expr,
	}

	if err := template.Validate(); err != nil {
		return nil, err
	}

	id, err := k.templates.Append(ctx, &template)
	if err != nil {
		return nil, err
	}

	if err = ctx.EventManager().EmitTypedEvent(&types.EventCreateTemplate{
		Id:      id,
		Creator: msg.Creator,
	}); err != nil {
		return nil, err
	}

	return &types.MsgNewTemplateResponse{
		Id: id,
	}, nil
}
