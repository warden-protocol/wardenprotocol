package keeper

import (
	"context"

	"cosmossdk.io/errors"
	sdk "github.com/cosmos/cosmos-sdk/types"

	types "github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta3"
)

func (k msgServer) RemoveSpaceOwner(ctx context.Context, msg *types.MsgRemoveSpaceOwner) (*types.MsgRemoveSpaceOwnerResponse, error) {
	if err := k.assertActAuthority(msg.Authority); err != nil {
		return nil, err
	}

	space, err := k.SpacesKeeper.Get(ctx, msg.SpaceId)
	if err != nil {
		return nil, err
	}

	if !space.IsOwner(msg.Owner) {
		return nil, errors.Wrapf(types.ErrNotSpaceOwner, "%s is not an owner of the space", msg.Owner)
	}

	if err := space.RemoveOwner(msg.Owner, msg.Nonce); err != nil {
		return nil, err
	}

	if _, err := space.IncrementNonce(msg.Nonce); err != nil {
		return nil, err
	}

	if err := k.SpacesKeeper.Set(ctx, space); err != nil {
		return nil, err
	}

	sdkCtx := sdk.UnwrapSDKContext(ctx)
	if err := sdkCtx.EventManager().EmitTypedEvent(&types.EventRemoveSpaceOwner{
		SpaceId:      space.Id,
		RemovedOwner: msg.Owner,
		OwnersCount:  uint64(len(space.Owners)),
	}); err != nil {
		return nil, err
	}

	return &types.MsgRemoveSpaceOwnerResponse{}, nil
}
