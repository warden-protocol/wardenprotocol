package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"

	types "github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta3"
)

func (k msgServer) UpdateKey(ctx context.Context, msg *types.MsgUpdateKey) (*types.MsgUpdateKeyResponse, error) {
	if err := k.assertActAuthority(msg.Authority); err != nil {
		return nil, err
	}

	key, err := k.KeysKeeper.Get(ctx, msg.KeyId)
	if err != nil {
		return nil, err
	}

	if key.ApproveTemplateId != msg.ApproveTemplateId {
		if err = k.actKeeper.IsValidTemplate(ctx, msg.ApproveTemplateId); err != nil {
			return nil, err
		}

		key.ApproveTemplateId = msg.ApproveTemplateId
	}

	if key.RejectTemplateId != msg.RejectTemplateId {
		if err = k.actKeeper.IsValidTemplate(ctx, msg.RejectTemplateId); err != nil {
			return nil, err
		}

		key.RejectTemplateId = msg.RejectTemplateId
	}

	if err := k.KeysKeeper.Set(ctx, &key); err != nil {
		return nil, err
	}

	sdkCtx := sdk.UnwrapSDKContext(ctx)
	if err := sdkCtx.EventManager().EmitTypedEvent(&types.EventUpdateKey{
		Id:                key.Id,
		ApproveTemplateId: key.ApproveTemplateId,
		RejectTemplateId:  key.RejectTemplateId,
	}); err != nil {
		return nil, err
	}

	return &types.MsgUpdateKeyResponse{}, nil
}
