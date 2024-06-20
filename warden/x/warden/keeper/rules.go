package keeper

import (
	"context"
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/warden-protocol/wardenprotocol/shield/ast"
	acttypes "github.com/warden-protocol/wardenprotocol/warden/x/act/types/v1beta1"
	"github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta2"
)

func (k Keeper) RegisterRules(reg *acttypes.RulesRegistry) {
	acttypes.Register(reg, k.addSpaceOwnerRule)
	acttypes.Register(reg, k.newKeyRequestRule)
	acttypes.Register(reg, k.removeSpaceOwnerRule)
	acttypes.Register(reg, k.updateKeyRule)
	acttypes.Register(reg, k.updateSpaceRule)
	acttypes.RegisterCtx(reg, k.newSignatureRequestRule)
}

func (k Keeper) addSpaceOwnerRule(ctx context.Context, msg *v1beta2.MsgAddSpaceOwner) (acttypes.Rule, error) {
	space, err := k.SpacesKeeper.Get(ctx, msg.SpaceId)
	if err != nil {
		return acttypes.Rule{}, err
	}

	if space.AdminRuleId > 0 {
		return k.actKeeper.GetRule(ctx, space.AdminRuleId)
	} else {
		return space.RuleAddOwner(), nil
	}
}

func (k Keeper) removeSpaceOwnerRule(ctx context.Context, msg *v1beta2.MsgRemoveSpaceOwner) (acttypes.Rule, error) {
	space, err := k.SpacesKeeper.Get(ctx, msg.SpaceId)
	if err != nil {
		return acttypes.Rule{}, err
	}

	if space.AdminRuleId > 0 {
		return k.actKeeper.GetRule(ctx, space.AdminRuleId)
	} else {
		return space.RuleRemoveOwner(), nil
	}
}

func (k Keeper) newKeyRequestRule(ctx context.Context, msg *v1beta2.MsgNewKeyRequest) (acttypes.Rule, error) {
	space, err := k.SpacesKeeper.Get(ctx, msg.SpaceId)
	if err != nil {
		return acttypes.Rule{}, err
	}

	if space.SignRuleId > 0 {
		return k.actKeeper.GetRule(ctx, space.SignRuleId)
	} else {
		return space.RuleNewKeyRequest(), nil
	}
}

func (k Keeper) newSignatureRequestRule(ctx context.Context, msg *v1beta2.MsgNewSignatureRequest) (context.Context, acttypes.Rule, error) {
	key, err := k.KeysKeeper.Get(ctx, msg.KeyId)
	if err != nil {
		return nil, acttypes.Rule{}, err
	}

	space, err := k.SpacesKeeper.Get(ctx, key.SpaceId)
	if err != nil {
		return nil, acttypes.Rule{}, err
	}

	rule, err := k.getKeyRule(ctx, space, key)
	if err != nil {
		return nil, acttypes.Rule{}, err
	}

	creator := k.actKeeper.GetActionCreator(ctx)

	ctxWithVals, dataForSigning, err := k.executeAnalyzers(ctx, creator, msg.Analyzers, msg.Input)
	if err != nil {
		return nil, acttypes.Rule{}, fmt.Errorf("executing analyzers: %w", err)
	}

	if dataForSigning != nil {
		msg.Input = dataForSigning
	}

	return ctxWithVals, rule, nil
}

func (k Keeper) updateKeyRule(ctx context.Context, msg *v1beta2.MsgUpdateKey) (acttypes.Rule, error) {
	key, err := k.KeysKeeper.Get(ctx, msg.KeyId)
	if err != nil {
		return acttypes.Rule{}, err
	}

	space, err := k.SpacesKeeper.Get(ctx, key.SpaceId)
	if err != nil {
		return acttypes.Rule{}, err
	}

	rule, err := k.getKeyRule(ctx, space, key)
	if err != nil {
		return acttypes.Rule{}, err
	}

	return rule, nil
}

func (k Keeper) updateSpaceRule(ctx context.Context, msg *v1beta2.MsgUpdateSpace) (acttypes.Rule, error) {
	space, err := k.SpacesKeeper.Get(ctx, msg.SpaceId)
	if err != nil {
		return acttypes.Rule{}, err
	}

	if space.AdminRuleId > 0 {
		return k.actKeeper.GetRule(ctx, space.AdminRuleId)
	} else {
		return space.RuleUpdateSpace(), nil
	}
}

func (k Keeper) getKeyRule(ctx context.Context, space v1beta2.Space, key v1beta2.Key) (acttypes.Rule, error) {
	if key.RuleId > 0 {
		return k.actKeeper.GetRule(ctx, key.RuleId)
	} else if space.SignRuleId > 0 {
		return k.actKeeper.GetRule(ctx, space.SignRuleId)
	} else {
		return space.RuleNewSignatureRequest(), nil
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
