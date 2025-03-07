package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"

	types "github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta3"
)

func (k msgServer) NewSpace(goCtx context.Context, msg *types.MsgNewSpace) (*types.MsgNewSpaceResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	space := &types.Space{
		Creator:                msg.Creator,
		ApproveAdminTemplateId: msg.ApproveAdminTemplateId,
		RejectAdminTemplateId:  msg.RejectAdminTemplateId,
		ApproveSignTemplateId:  msg.ApproveSignTemplateId,
		RejectSignTemplateId:   msg.RejectSignTemplateId,
		Nonce:                  0,
	}

	if err := space.AddOwner(msg.Creator, space.Nonce); err != nil {
		return nil, err
	}

	for _, owner := range msg.AdditionalOwners {
		if err := space.AddOwner(owner, space.Nonce); err != nil {
			return nil, err
		}
	}

	id, err := k.SpacesKeeper.New(goCtx, space)
	if err != nil {
		return nil, err
	}

	if err := ctx.EventManager().EmitTypedEvent(&types.EventCreateSpace{
		Id:                     space.Id,
		Creator:                space.Creator,
		OwnersCount:            uint64(len(space.Owners)),
		ApproveAdminTemplateId: space.ApproveAdminTemplateId,
		RejectAdminTemplateId:  space.RejectAdminTemplateId,
		ApproveSignTemplateId:  space.ApproveSignTemplateId,
		RejectSignTemplateId:   space.RejectSignTemplateId,
	}); err != nil {
		return nil, err
	}

	return &types.MsgNewSpaceResponse{
		Id: id,
	}, nil
}
