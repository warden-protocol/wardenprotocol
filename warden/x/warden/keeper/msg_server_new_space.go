package keeper

import (
	"context"

	"github.com/cosmos/cosmos-sdk/telemetry"
	sdk "github.com/cosmos/cosmos-sdk/types"
	types "github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta2"
)

func (k msgServer) NewSpace(goCtx context.Context, msg *types.MsgNewSpace) (*types.MsgNewSpaceResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	space := &types.Space{
		Creator:     msg.Creator,
		AdminRuleId: msg.AdminRuleId,
		SignRuleId:  msg.SignRuleId,
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

	if err := ctx.EventManager().EmitTypedEvent(&types.EventCreateSpace{
		Id:          space.Id,
		Creator:     space.Creator,
		OwnersCount: uint64(len(space.Owners)),
		AdminRuleId: space.AdminRuleId,
		SignRuleId:  space.SignRuleId,
	}); err != nil {
		return nil, err
	}

	telemetry.IncrCounter(1, "new_space", "msg", "count")

	return &types.MsgNewSpaceResponse{
		Id: id,
	}, nil
}
