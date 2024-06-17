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
		if err := k.isValidIntentID(ctx, msg.AdminIntentId); err != nil {
			return nil, err
		}
		space.AdminIntentId = msg.AdminIntentId
	}

	if msg.SignIntentId != space.SignIntentId {
		if err := k.isValidIntentID(ctx, msg.SignIntentId); err != nil {
			return nil, err
		}
		space.SignIntentId = msg.SignIntentId
	}

	if err := k.SpacesKeeper.Set(ctx, space); err != nil {
		return nil, err
	}

	return &types.MsgUpdateSpaceResponse{}, nil
}

func (k msgServer) isValidIntentID(ctx context.Context, id uint64) error {
	if id == 0 {
		// we consider 0 as a valid intent id for the "default" intent
		return nil
	}
	_, err := k.intentKeeper.GetIntent(ctx, id)
	return err
}
