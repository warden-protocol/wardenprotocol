package keeper

import (
	"context"

	types "github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta2"
)

func (k msgServer) AddSpaceOwner(ctx context.Context, msg *types.MsgAddSpaceOwner) (*types.MsgAddSpaceOwnerResponse, error) {
	if err := k.assertActAuthority(msg.Authority); err != nil {
		return nil, err
	}

	space, err := k.SpacesKeeper.Get(ctx, msg.SpaceId)
	if err != nil {
		return nil, err
	}

	if err := space.AddOwner(msg.NewOwner); err != nil {
		return nil, err
	}

	if err := k.SpacesKeeper.Set(ctx, space); err != nil {
		return nil, err
	}

	return &types.MsgAddSpaceOwnerResponse{}, nil
}
