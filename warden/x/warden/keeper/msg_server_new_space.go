package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"
	types "github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta2"
)

func (k msgServer) NewSpace(goCtx context.Context, msg *types.MsgNewSpace) (*types.MsgNewSpaceResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	space := &types.Space{
		Creator:       msg.Creator,
		AdminIntentId: msg.AdminIntentId,
		SignIntentId:  msg.SignIntentId,
	}

	if err := space.AddOwner(msg.Creator); err != nil {
		return nil, err
	}
	for _, owner := range msg.AdditionalOwners {
		if err := space.AddOwner(owner); err != nil {
			return nil, err
		}
	}

	id, err := k.SpacesKeeper.New(ctx, space)
	if err != nil {
		return nil, err
	}

	return &types.MsgNewSpaceResponse{
		Id: id,
	}, nil
}
