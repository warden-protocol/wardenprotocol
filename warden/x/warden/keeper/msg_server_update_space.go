package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"
	types "github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta3"
)

func (k msgServer) UpdateSpace(ctx context.Context, msg *types.MsgUpdateSpace) (*types.MsgUpdateSpaceResponse, error) {
	if err := k.assertActAuthority(msg.Authority); err != nil {
		return nil, err
	}

	space, err := k.SpacesKeeper.Get(ctx, msg.SpaceId)
	if err != nil {
		return nil, err
	}

	if msg.ApproveAdminTemplateId != space.ApproveAdminTemplateId {
		if err := k.actKeeper.IsValidTemplate(ctx, msg.ApproveAdminTemplateId); err != nil {
			return nil, err
		}
		space.ApproveAdminTemplateId = msg.ApproveAdminTemplateId
	}

	if msg.RejectAdminTemplateId != space.RejectAdminTemplateId {
		if err := k.actKeeper.IsValidTemplate(ctx, msg.RejectAdminTemplateId); err != nil {
			return nil, err
		}
		space.RejectAdminTemplateId = msg.RejectAdminTemplateId
	}

	if msg.ApproveSignTemplateId != space.ApproveSignTemplateId {
		if err := k.actKeeper.IsValidTemplate(ctx, msg.ApproveSignTemplateId); err != nil {
			return nil, err
		}
		space.ApproveSignTemplateId = msg.ApproveSignTemplateId
	}

	if msg.RejectSignTemplateId != space.RejectSignTemplateId {
		if err := k.actKeeper.IsValidTemplate(ctx, msg.RejectSignTemplateId); err != nil {
			return nil, err
		}
		space.RejectSignTemplateId = msg.RejectSignTemplateId
	}

	if msg.ApproveAdminRuleId != space.ApproveAdminRuleId {
		if err := k.actKeeper.IsValidRule(ctx, msg.ApproveAdminRuleId); err != nil {
			return nil, err
		}
		space.ApproveAdminRuleId = msg.ApproveAdminRuleId
	}

	if msg.RejectAdminRuleId != space.RejectAdminRuleId {
		if err := k.actKeeper.IsValidRule(ctx, msg.RejectAdminRuleId); err != nil {
			return nil, err
		}
		space.RejectAdminRuleId = msg.RejectAdminRuleId
	}

	if msg.ApproveSignRuleId != space.ApproveSignRuleId {
		if err := k.actKeeper.IsValidRule(ctx, msg.ApproveSignRuleId); err != nil {
			return nil, err
		}
		space.ApproveSignRuleId = msg.ApproveSignRuleId
	}

	if msg.RejectSignRuleId != space.RejectSignRuleId {
		if err := k.actKeeper.IsValidRule(ctx, msg.RejectSignRuleId); err != nil {
			return nil, err
		}
		space.RejectSignRuleId = msg.RejectSignRuleId
	}

	if _, err := space.IncrementNonce(msg.Nonce); err != nil {
		return nil, err
	}

	if err := k.SpacesKeeper.Set(ctx, space); err != nil {
		return nil, err
	}

	sdkCtx := sdk.UnwrapSDKContext(ctx)
	if err := sdkCtx.EventManager().EmitTypedEvent(&types.EventUpdateSpace{
		SpaceId:                space.Id,
		ApproveAdminTemplateId: space.ApproveAdminTemplateId,
		RejectAdminTemplateId:  space.RejectAdminTemplateId,
		ApproveSignTemplateId:  space.ApproveSignTemplateId,
		RejectSignTemplateId:   space.RejectSignTemplateId,
	}); err != nil {
		return nil, err
	}

	return &types.MsgUpdateSpaceResponse{}, nil
}
