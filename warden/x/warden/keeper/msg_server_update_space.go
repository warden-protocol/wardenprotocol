package keeper

import (
	"context"

	types "github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta2"
)

func (k msgServer) UpdateSpace(ctx context.Context, msg *types.MsgUpdateSpace) (*types.MsgUpdateSpaceResponse, error) {
	if err := k.assertIntentAuthority(msg.Authority); err != nil {
		return nil, err
	}

	space, err := k.SpacesKeeper.Get(ctx, msg.SpaceId)
	if err != nil {
		return nil, err
	}

	if msg.AdminIntentId != space.AdminIntentId {
		if msg.AdminIntentId != 0 {
			_, err := k.intentKeeper.GetIntent(ctx, msg.AdminIntentId)
			if err != nil {
				return nil, err
			}
		}
		space.AdminIntentId = msg.AdminIntentId
	}

	if msg.SignIntentId != space.SignIntentId {
		if msg.SignIntentId != 0 {
			_, err := k.intentKeeper.GetIntent(ctx, msg.SignIntentId)
			if err != nil {
				return nil, err
			}
		}
		space.SignIntentId = msg.SignIntentId
	}

	if err := k.SpacesKeeper.Set(ctx, space); err != nil {
		return nil, err
	}

	return &types.MsgUpdateSpaceResponse{}, nil
}
