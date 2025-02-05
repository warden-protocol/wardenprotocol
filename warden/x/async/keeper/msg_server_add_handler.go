package keeper

import (
	"context"

	errorsmod "cosmossdk.io/errors"
	types "github.com/warden-protocol/wardenprotocol/warden/x/async/types/v1beta1"
)

func (k msgServer) AddHandler(ctx context.Context, msg *types.MsgAddHandler) (*types.MsgAddHandlerResponse, error) {
	if k.GetAuthority() != msg.Authority {
		return nil, errorsmod.Wrapf(types.ErrInvalidSigner, "invalid authority; expected %s, got %s", k.GetAuthority(), msg.Authority)
	}

	if msg.Handler == nil {
		return nil, errorsmod.Wrapf(types.ErrInvalidHandler, "cannot be nil")
	}

	if msg.Handler.GetName() == "" {
		return nil, errorsmod.Wrapf(types.ErrInvalidHandler, "name cannot be empty")
	}

	if err := k.handlers.AddHandler(ctx, *msg.Handler); err != nil {
		return nil, err
	}

	return &types.MsgAddHandlerResponse{
		Handler: msg.Handler,
	}, nil
}
