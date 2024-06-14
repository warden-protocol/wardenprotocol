package keeper

import (
	"context"
	"fmt"

	"github.com/cosmos/cosmos-sdk/telemetry"
	sdk "github.com/cosmos/cosmos-sdk/types"
	types "github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta2"
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
		return nil, fmt.Errorf("owner does not exist")
	}

	space.RemoveOwner(msg.Owner)

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

	telemetry.IncrCounter(1, "remove_space_owner", "msg", "count")

	return &types.MsgRemoveSpaceOwnerResponse{}, nil
}
