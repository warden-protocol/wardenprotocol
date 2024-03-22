package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/gogoproto/proto"
	intenttypes "github.com/warden-protocol/wardenprotocol/warden/x/intent/types"
	types "github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta2"
)

func (k msgServer) AddSpaceOwner(goCtx context.Context, msg *types.MsgAddSpaceOwner) (*intenttypes.MsgActionCreated, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)
	ws, err := k.spaces.Get(ctx, msg.SpaceId)
	if err != nil {
		return nil, err
	}

	intent, err := k.addSpaceOwnerIntent(ctx, ws)
	if err != nil {
		return nil, err
	}

	act, err := k.intentKeeper.AddAction(ctx, msg.Creator, msg, intent, msg.Btl)
	if err != nil {
		return nil, err
	}

	return &intenttypes.MsgActionCreated{Action: act}, nil
}

func (k msgServer) addSpaceOwnerIntent(ctx sdk.Context, space types.Space) (intenttypes.Intent, error) {
	if space.AdminIntentId > 0 {
		return k.intentKeeper.GetIntent(ctx, space.AdminIntentId)
	} else {
		return space.IntentAddOwner(), nil
	}
}

func (k msgServer) AddOwnerActionHandler(ctx sdk.Context, act intenttypes.Action) (proto.Message, error) {
	msg, err := intenttypes.GetActionMessage[*types.MsgAddSpaceOwner](k.cdc, act)
	if err != nil {
		return nil, err
	}

	space, err := k.spaces.Get(ctx, msg.SpaceId)
	if err != nil {
		return nil, err
	}

	if err := space.AddOwner(msg.NewOwner); err != nil {
		return nil, err
	}

	if err := k.spaces.Set(ctx, space.Id, space); err != nil {
		return nil, err
	}

	return &types.MsgAddSpaceOwnerResponse{}, nil
}
