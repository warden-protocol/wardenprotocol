package keeper

import (
	"context"
	intenttypes "github.com/warden-protocol/wardenprotocol/warden/x/intent/types"
	"github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta2"
)

func (k Keeper) RegisterIntents(reg *intenttypes.IntentsRegistry) {
	intenttypes.Register(reg, k.addSpaceOwnerIntent)
	intenttypes.Register(reg, k.newKeyRequestIntent)
	intenttypes.Register(reg, k.removeSpaceOwnerIntent)
	intenttypes.Register(reg, k.updateKeyIntent)
	intenttypes.Register(reg, k.updateSpaceIntent)
}

func (k Keeper) addSpaceOwnerIntent(ctx context.Context, msg *v1beta2.MsgAddSpaceOwner) (intenttypes.Intent, error) {
	space, err := k.SpacesKeeper.Get(ctx, msg.SpaceId)
	if err != nil {
		return intenttypes.Intent{}, err
	}

	if space.AdminIntentId > 0 {
		return k.intentKeeper.GetIntent(ctx, space.AdminIntentId)
	} else {
		return space.IntentAddOwner(), nil
	}
}

func (k Keeper) removeSpaceOwnerIntent(ctx context.Context, msg *v1beta2.MsgRemoveSpaceOwner) (intenttypes.Intent, error) {
	space, err := k.SpacesKeeper.Get(ctx, msg.SpaceId)
	if err != nil {
		return intenttypes.Intent{}, err
	}

	if space.AdminIntentId > 0 {
		return k.intentKeeper.GetIntent(ctx, space.AdminIntentId)
	} else {
		return space.IntentRemoveOwner(), nil
	}
}

func (k Keeper) newKeyRequestIntent(ctx context.Context, msg *v1beta2.MsgNewKeyRequest) (intenttypes.Intent, error) {
	space, err := k.SpacesKeeper.Get(ctx, msg.SpaceId)
	if err != nil {
		return intenttypes.Intent{}, err
	}

	if space.SignIntentId > 0 {
		return k.intentKeeper.GetIntent(ctx, space.SignIntentId)
	} else {
		return space.IntentNewKeyRequest(), nil
	}
}

func (k Keeper) updateKeyIntent(ctx context.Context, msg *v1beta2.MsgUpdateKey) (intenttypes.Intent, error) {
	key, err := k.KeysKeeper.Get(ctx, msg.KeyId)
	if err != nil {
		return intenttypes.Intent{}, err
	}

	space, err := k.SpacesKeeper.Get(ctx, key.SpaceId)
	if err != nil {
		return intenttypes.Intent{}, err
	}

	intent, err := k.getKeyIntent(ctx, space, key)
	if err != nil {
		return intenttypes.Intent{}, err
	}

	return intent, nil
}

func (k Keeper) updateSpaceIntent(ctx context.Context, msg *v1beta2.MsgUpdateSpace) (intenttypes.Intent, error) {
	space, err := k.SpacesKeeper.Get(ctx, msg.SpaceId)
	if err != nil {
		return intenttypes.Intent{}, err
	}

	if space.AdminIntentId > 0 {
		return k.intentKeeper.GetIntent(ctx, space.AdminIntentId)
	} else {
		return space.IntentUpdateSpace(), nil
	}
}

