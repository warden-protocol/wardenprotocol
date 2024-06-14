package keeper

import (
	"context"

	"github.com/cosmos/cosmos-sdk/telemetry"
	sdk "github.com/cosmos/cosmos-sdk/types"
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

	sdkCtx := sdk.UnwrapSDKContext(ctx)

	if err := sdkCtx.EventManager().EmitTypedEvent(&types.EventAddSpaceOwner{
		SpaceId:     space.Id,
		NewOwner:    msg.NewOwner,
		OwnersCount: uint64(len(space.Owners)),
	}); err != nil {
		return nil, err
	}

	telemetry.IncrCounter(1, "add_space_owner", "msg", "count")

	return &types.MsgAddSpaceOwnerResponse{}, nil
}
