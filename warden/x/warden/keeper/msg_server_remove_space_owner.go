package keeper

import (
	"context"
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/gogoproto/proto"
	intenttypes "github.com/warden-protocol/wardenprotocol/warden/x/intent/types"
	types "github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta2"
)

func (k msgServer) RemoveSpaceOwner(goCtx context.Context, msg *types.MsgRemoveSpaceOwner) (*intenttypes.MsgActionCreated, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)
	space, err := k.SpacesKeeper.Get(ctx, msg.SpaceId)
	if err != nil {
		return nil, err
	}

	intent, err := k.removeSpaceOwnerIntent(ctx, space)
	if err != nil {
		return nil, err
	}

	act, err := k.intentKeeper.AddAction(ctx, msg.Creator, msg, intent, msg.Btl)
	if err != nil {
		return nil, err
	}

	return &intenttypes.MsgActionCreated{Action: act}, nil
}

func (k msgServer) removeSpaceOwnerIntent(ctx sdk.Context, space types.Space) (intenttypes.Intent, error) {
	if space.AdminIntentId > 0 {
		return k.intentKeeper.GetIntent(ctx, space.AdminIntentId)
	} else {
		return space.IntentRemoveOwner(), nil
	}
}

func (k msgServer) RemoveOwnerActionHandler(ctx sdk.Context, act intenttypes.Action) (proto.Message, error) {
	msg, err := intenttypes.GetActionMessage[*types.MsgRemoveSpaceOwner](k.cdc, act)
	if err != nil {
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

	return &types.MsgRemoveSpaceOwnerResponse{}, nil
}
