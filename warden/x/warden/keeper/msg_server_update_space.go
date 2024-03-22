package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/gogoproto/proto"
	intenttypes "github.com/warden-protocol/wardenprotocol/warden/x/intent/types"
	types "github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta2"
)

func (k msgServer) UpdateSpace(goCtx context.Context, msg *types.MsgUpdateSpace) (*intenttypes.MsgActionCreated, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)
	space, err := k.spaces.Get(ctx, msg.SpaceId)
	if err != nil {
		return nil, err
	}

	intent, err := k.updateSpaceIntent(ctx, space)
	if err != nil {
		return nil, err
	}

	act, err := k.intentKeeper.AddAction(ctx, msg.Creator, msg, intent, msg.Btl)
	if err != nil {
		return nil, err
	}

	return &intenttypes.MsgActionCreated{Action: act}, nil
}

func (k msgServer) updateSpaceIntent(ctx sdk.Context, space types.Space) (intenttypes.Intent, error) {
	if space.AdminIntentId > 0 {
		return k.intentKeeper.GetIntent(ctx, space.AdminIntentId)
	} else {
		return space.IntentUpdateSpace(), nil
	}
}

func (k msgServer) UpdateSpaceActionHandler(ctx sdk.Context, act intenttypes.Action) (proto.Message, error) {
	msg, err := intenttypes.GetActionMessage[*types.MsgUpdateSpace](k.cdc, act)
	if err != nil {
		return nil, err
	}

	space, err := k.spaces.Get(ctx, msg.SpaceId)
	if err != nil {
		return nil, err
	}

	if msg.AdminIntentId != space.AdminIntentId {
		if msg.AdminIntentId != 0 {
			_, err := k.intentKeeper.GetIntent(ctx, msg.AdminIntentId)
			if err != nil {
				return nil, err
			}
		}
		space.AdminIntentId = msg.AdminIntentId
	}

	if msg.SignIntentId != space.SignIntentId {
		if msg.SignIntentId != 0 {
			_, err := k.intentKeeper.GetIntent(ctx, msg.SignIntentId)
			if err != nil {
				return nil, err
			}
		}
		space.SignIntentId = msg.SignIntentId
	}

	if err := k.spaces.Set(ctx, space.Id, space); err != nil {
		return nil, err
	}

	return &types.MsgUpdateSpaceResponse{}, nil
}
