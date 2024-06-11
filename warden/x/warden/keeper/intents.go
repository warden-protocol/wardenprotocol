package keeper

import (
	"context"
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/warden-protocol/wardenprotocol/shield/ast"
	intenttypes "github.com/warden-protocol/wardenprotocol/warden/x/intent/types"
	"github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta2"
)

func (k Keeper) RegisterIntents(reg *intenttypes.IntentsRegistry) {
	intenttypes.Register(reg, k.addSpaceOwnerIntent)
	intenttypes.Register(reg, k.newKeyRequestIntent)
	intenttypes.Register(reg, k.removeSpaceOwnerIntent)
	intenttypes.Register(reg, k.updateKeyIntent)
	intenttypes.Register(reg, k.updateSpaceIntent)
	intenttypes.RegisterCtx(reg, k.newSignatureRequestIntent)
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

func (k Keeper) newSignatureRequestIntent(ctx context.Context, msg *v1beta2.MsgNewSignatureRequest) (context.Context, intenttypes.Intent, error) {
	key, err := k.KeysKeeper.Get(ctx, msg.KeyId)
	if err != nil {
		return nil, intenttypes.Intent{}, err
	}

	space, err := k.SpacesKeeper.Get(ctx, key.SpaceId)
	if err != nil {
		return nil, intenttypes.Intent{}, err
	}

	keychain, err := k.keychains.Get(ctx, key.KeychainId)
	if err != nil {
		return nil, intenttypes.Intent{}, err
	}

	if !keychain.IsActive {
		return nil, intenttypes.Intent{}, fmt.Errorf("keychain is nil or is inactive")
	}

	intent, err := k.getKeyIntent(ctx, space, key)
	if err != nil {
		return nil, intenttypes.Intent{}, err
	}

	creator := k.intentKeeper.GetActionCreator(ctx)

	ctxWithVals, dataForSigning, err := k.executeAnalyzers(ctx, creator, msg.Analyzers, msg.Input)
	if err != nil {
		return nil, intenttypes.Intent{}, fmt.Errorf("executing analyzers: %w", err)
	}

	if dataForSigning != nil {
		msg.Input = dataForSigning
	}

	return ctxWithVals, intent, nil
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

func (k Keeper) getKeyIntent(ctx context.Context, space v1beta2.Space, key v1beta2.Key) (intenttypes.Intent, error) {
	if key.IntentId > 0 {
		return k.intentKeeper.GetIntent(ctx, key.IntentId)
	} else if space.SignIntentId > 0 {
		return k.intentKeeper.GetIntent(ctx, space.SignIntentId)
	} else {
		return space.IntentNewSignatureRequest(), nil
	}
}

func (k Keeper) executeAnalyzers(ctx context.Context, creator string, contracts []string, input []byte) (context.Context, []byte, error) {
	sdkCtx := sdk.UnwrapSDKContext(ctx)
	creatorAddr := sdk.MustAccAddressFromBech32(creator)
	analyzerVals := make(map[string]map[string]*ast.Expression)
	var dataForSigning []byte
	for _, contract := range contracts {
		contractAddr := sdk.MustAccAddressFromBech32(contract)
		dfs, vals, err := k.ExecuteAnalyzer(sdkCtx, contractAddr, creatorAddr, input)
		if err != nil {
			return nil, nil, err
		}
		if dfs != nil && dataForSigning != nil {
			return nil, nil, fmt.Errorf("two or more contracts tried to set DataForSigning. Only one analyzer contract can return DataForSigning")
		}
		if dfs != nil {
			dataForSigning = dfs
		}
		analyzerVals[contract] = vals
	}
	return WithAnalyzerValues(ctx, analyzerVals), dataForSigning, nil
}
