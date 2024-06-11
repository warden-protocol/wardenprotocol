package keeper

import (
	"context"
	"fmt"

	types "github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta2"
)

func (k msgServer) RemoveSpaceOwner(ctx context.Context, msg *types.MsgRemoveSpaceOwner) (*types.MsgRemoveSpaceOwnerResponse, error) {
	if err := k.assertIntentAuthority(msg.Authority); err != nil {
		return nil, err
	}

	space, err := k.SpacesKeeper.Get(ctx, msg.SpaceId)
	if err != nil {
		return nil, err
	}

	if !space.IsOwner(msg.Owner) {
		return nil, fmt.Errorf("owner does not exist")
	}

	space.RemoveOwner(msg.Owner)

	if err := k.SpacesKeeper.Set(ctx, space); err != nil {
		return nil, err
	}

	return &types.MsgRemoveSpaceOwnerResponse{}, nil
}
