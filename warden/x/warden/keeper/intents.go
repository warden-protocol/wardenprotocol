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

