package keeper

import (
	"context"

	"github.com/cosmos/cosmos-sdk/telemetry"
	sdk "github.com/cosmos/cosmos-sdk/types"
	types "github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta2"
)

func (k msgServer) UpdateSpace(ctx context.Context, msg *types.MsgUpdateSpace) (*types.MsgUpdateSpaceResponse, error) {
	if err := k.assertActAuthority(msg.Authority); err != nil {
		return nil, err
	}

	space, err := k.SpacesKeeper.Get(ctx, msg.SpaceId)
	if err != nil {
		return nil, err
	}

	if msg.AdminRuleId != space.AdminRuleId {
		if err := k.isValidRuleId(ctx, msg.AdminRuleId); err != nil {
			return nil, err
		}
		space.AdminRuleId = msg.AdminRuleId
	}

	if msg.SignRuleId != space.SignRuleId {
		if err := k.isValidRuleId(ctx, msg.SignRuleId); err != nil {
			return nil, err
		}
		space.SignRuleId = msg.SignRuleId
	}

	if err := k.SpacesKeeper.Set(ctx, space); err != nil {
		return nil, err
	}

	sdkCtx := sdk.UnwrapSDKContext(ctx)
	if err := sdkCtx.EventManager().EmitTypedEvent(&types.EventUpdateSpace{
		SpaceId:     space.Id,
		AdminRuleId: space.AdminRuleId,
		SignRuleId:  space.SignRuleId,
	}); err != nil {
		return nil, err
	}

	telemetry.IncrCounter(1, "update_space", "msg", "count")

	return &types.MsgUpdateSpaceResponse{}, nil
}

func (k msgServer) isValidRuleId(ctx context.Context, id uint64) error {
	if id == 0 {
		// we consider 0 as a valid rule id for the "default" rule
		return nil
	}
	_, err := k.actKeeper.GetRule(ctx, id)
	return err
}
