package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/gogoproto/proto"
	intenttypes "github.com/warden-protocol/wardenprotocol/warden/x/intent/types"
	types "github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta2"
)

func (k msgServer) UpdateKey(goCtx context.Context, msg *types.MsgUpdateKey) (*intenttypes.MsgActionCreated, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	key, err := k.keys.Get(ctx, msg.KeyId)
	if err != nil {
		return nil, err
	}

	space, err := k.spaces.Get(ctx, key.SpaceId)
	if err != nil {
		return nil, err
	}

	intent, err := k.updateKeyIntent(ctx, space, key)
	if err != nil {
		return nil, err
	}

	act, err := k.intentKeeper.AddAction(ctx, msg.Creator, msg, intent, msg.Btl)
	if err != nil {
		return nil, err
	}

	return &intenttypes.MsgActionCreated{Action: act}, nil
}

func (k msgServer) updateKeyIntent(ctx sdk.Context, space types.Space, key types.Key) (intenttypes.Intent, error) {
	if key.IntentId > 0 {
		return k.intentKeeper.GetIntent(ctx, key.IntentId)
	} else if space.SignIntentId > 0 {
		return k.intentKeeper.GetIntent(ctx, space.SignIntentId)
	} else {
		return space.IntentUpdateKey(), nil
	}
}

func (k msgServer) UpdateKeyActionHandler(ctx sdk.Context, act intenttypes.Action) (proto.Message, error) {
	msg, err := intenttypes.GetActionMessage[*types.MsgUpdateKey](k.cdc, act)
	if err != nil {
		return nil, err
	}

	key, err := k.keys.Get(ctx, msg.KeyId)
	if err != nil {
		return nil, err
	}

	key.IntentId = msg.IntentId

	if err := k.keys.Set(ctx, key.Id, key); err != nil {
		return nil, err
	}

	return &types.MsgUpdateKeyResponse{}, nil
}
