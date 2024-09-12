package keeper

import (
	"context"

	"cosmossdk.io/errors"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/warden-protocol/wardenprotocol/shield/ast"
	acttypes "github.com/warden-protocol/wardenprotocol/warden/x/act/types/v1beta1"
	"github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta3"
)

func (k Keeper) RegisterRules(reg *acttypes.RulesRegistry) {
	acttypes.Register(reg, k.addSpaceOwnerRule)
	acttypes.Register(reg, k.newKeyRequestRule)
	acttypes.Register(reg, k.removeSpaceOwnerRule)
	acttypes.Register(reg, k.updateKeyRule)
	acttypes.Register(reg, k.updateSpaceRule)
	acttypes.RegisterCtx(reg, k.newSignRequestRule)
}

func (k Keeper) addSpaceOwnerRule(ctx context.Context, msg *v1beta3.MsgAddSpaceOwner) (acttypes.Rule, acttypes.Rule, error) {
	space, err := k.SpacesKeeper.Get(ctx, msg.SpaceId)
	if err != nil {
		return acttypes.Rule{}, acttypes.Rule{}, err
	}

	approveRule, err := k.getApproveAddOwnerRule(ctx, space)
	if err != nil {
		return acttypes.Rule{}, acttypes.Rule{}, err
	}

	rejectRule, err := k.getRejectAddOwnerRule(ctx, space)
	if err != nil {
		return acttypes.Rule{}, acttypes.Rule{}, err
	}

	return approveRule, rejectRule, nil
}

func (k Keeper) removeSpaceOwnerRule(ctx context.Context, msg *v1beta3.MsgRemoveSpaceOwner) (acttypes.Rule, acttypes.Rule, error) {
	space, err := k.SpacesKeeper.Get(ctx, msg.SpaceId)
	if err != nil {
		return acttypes.Rule{}, acttypes.Rule{}, err
	}

	approveRule, err := k.getApproveRemoveOwnerRule(ctx, space)
	if err != nil {
		return acttypes.Rule{}, acttypes.Rule{}, err
	}

	rejectRule, err := k.getRejectRemoveOwnerRule(ctx, space)
	if err != nil {
		return acttypes.Rule{}, acttypes.Rule{}, err
	}

	return approveRule, rejectRule, nil
}

func (k Keeper) newKeyRequestRule(ctx context.Context, msg *v1beta3.MsgNewKeyRequest) (acttypes.Rule, acttypes.Rule, error) {
	space, err := k.SpacesKeeper.Get(ctx, msg.SpaceId)
	if err != nil {
		return acttypes.Rule{}, acttypes.Rule{}, err
	}

	approveRule, err := k.getApproveNewKeyRequestRule(ctx, space)

	if err != nil {
		return acttypes.Rule{}, acttypes.Rule{}, err
	}

	rejectRule, err := k.getRejectNewKeyRequestRule(ctx, space)

	if err != nil {
		return acttypes.Rule{}, acttypes.Rule{}, err
	}

	return approveRule, rejectRule, nil
}

func (k Keeper) newSignRequestRule(ctx context.Context, msg *v1beta3.MsgNewSignRequest) (context.Context, acttypes.Rule, acttypes.Rule, error) {
	key, err := k.KeysKeeper.Get(ctx, msg.KeyId)
	if err != nil {
		return nil, acttypes.Rule{}, acttypes.Rule{}, err
	}

	space, err := k.SpacesKeeper.Get(ctx, key.SpaceId)
	if err != nil {
		return nil, acttypes.Rule{}, acttypes.Rule{}, err
	}

	approveRule, err := k.getApproveSignRule(ctx, space, key)
	if err != nil {
		return nil, acttypes.Rule{}, acttypes.Rule{}, err
	}

	rejectRule, err := k.getRejectSignRule(ctx, space, key)
	if err != nil {
		return nil, acttypes.Rule{}, acttypes.Rule{}, err
	}

	creator := k.actKeeper.GetActionCreator(ctx)

	ctxWithVals, dataForSigning, err := k.executeAnalyzers(ctx, creator, msg.Analyzers, msg.Input)
	if err != nil {
		return nil, acttypes.Rule{}, acttypes.Rule{}, errors.Wrapf(v1beta3.ErrAnalyzer, "%v", err)
	}

	if dataForSigning != nil {
		msg.Input = dataForSigning
	}

	return ctxWithVals, approveRule, rejectRule, nil
}

func (k Keeper) updateKeyRule(ctx context.Context, msg *v1beta3.MsgUpdateKey) (acttypes.Rule, acttypes.Rule, error) {
	key, err := k.KeysKeeper.Get(ctx, msg.KeyId)
	if err != nil {
		return acttypes.Rule{}, acttypes.Rule{}, err
	}

	space, err := k.SpacesKeeper.Get(ctx, key.SpaceId)
	if err != nil {
		return acttypes.Rule{}, acttypes.Rule{}, err
	}

	approveRule, err := k.getApproveUpdateKeyRule(ctx, space, key)
	if err != nil {
		return acttypes.Rule{}, acttypes.Rule{}, err
	}

	rejectRule, err := k.getRejectUpdateKeyRule(ctx, space, key)
	if err != nil {
		return acttypes.Rule{}, acttypes.Rule{}, err
	}

	return approveRule, rejectRule, nil
}

func (k Keeper) updateSpaceRule(ctx context.Context, msg *v1beta3.MsgUpdateSpace) (acttypes.Rule, acttypes.Rule, error) {
	space, err := k.SpacesKeeper.Get(ctx, msg.SpaceId)
	if err != nil {
		return acttypes.Rule{}, acttypes.Rule{}, err
	}

	approveRule, err := k.getApproveUpdateSpaceRule(ctx, space)
	if err != nil {
		return acttypes.Rule{}, acttypes.Rule{}, err
	}
	rejectRule, err := k.getRejectUpdateSpaceRule(ctx, space)
	if err != nil {
		return acttypes.Rule{}, acttypes.Rule{}, err
	}

	return approveRule, rejectRule, nil
}

func (k Keeper) getApproveSignRule(ctx context.Context, space v1beta3.Space, key v1beta3.Key) (acttypes.Rule, error) {
	if key.ApproveRuleId > 0 {
		return k.actKeeper.GetRule(ctx, key.ApproveRuleId)
	} else if space.ApproveSignRuleId > 0 {
		return k.actKeeper.GetRule(ctx, space.ApproveSignRuleId)
	} else {
		return space.RuleApproveNewSignRequest(), nil
	}
}

func (k Keeper) getRejectSignRule(ctx context.Context, space v1beta3.Space, key v1beta3.Key) (acttypes.Rule, error) {
	if key.RejectRuleId > 0 {
		return k.actKeeper.GetRule(ctx, key.RejectRuleId)
	} else if space.RejectSignRuleId > 0 {
		return k.actKeeper.GetRule(ctx, space.RejectSignRuleId)
	} else {
		return space.RuleRejectNewSignRequest(), nil
	}
}

func (k Keeper) getApproveAddOwnerRule(ctx context.Context, space v1beta3.Space) (acttypes.Rule, error) {
	if space.ApproveAdminRuleId > 0 {
		return k.actKeeper.GetRule(ctx, space.ApproveAdminRuleId)
	} else {
		return space.RuleApproveAddOwner(), nil
	}
}

func (k Keeper) getRejectAddOwnerRule(ctx context.Context, space v1beta3.Space) (acttypes.Rule, error) {
	if space.RejectAdminRuleId > 0 {
		return k.actKeeper.GetRule(ctx, space.RejectAdminRuleId)
	} else {
		return space.RuleRejectAddOwner(), nil
	}
}

func (k Keeper) getApproveRemoveOwnerRule(ctx context.Context, space v1beta3.Space) (acttypes.Rule, error) {
	if space.ApproveAdminRuleId > 0 {
		return k.actKeeper.GetRule(ctx, space.ApproveAdminRuleId)
	} else {
		return space.RuleApproveRemoveOwner(), nil
	}
}

func (k Keeper) getRejectRemoveOwnerRule(ctx context.Context, space v1beta3.Space) (acttypes.Rule, error) {
	if space.RejectAdminRuleId > 0 {
		return k.actKeeper.GetRule(ctx, space.RejectAdminRuleId)
	} else {
		return space.RuleRejectRemoveOwner(), nil
	}
}

func (k Keeper) getApproveNewKeyRequestRule(ctx context.Context, space v1beta3.Space) (acttypes.Rule, error) {
	if space.ApproveSignRuleId > 0 {
		return k.actKeeper.GetRule(ctx, space.ApproveSignRuleId)
	} else {
		return space.RuleApproveNewKeyRequest(), nil
	}
}

func (k Keeper) getRejectNewKeyRequestRule(ctx context.Context, space v1beta3.Space) (acttypes.Rule, error) {
	if space.RejectSignRuleId > 0 {
		return k.actKeeper.GetRule(ctx, space.RejectSignRuleId)
	} else {
		return space.RuleRejectNewKeyRequest(), nil
	}
}

func (k Keeper) getApproveUpdateKeyRule(ctx context.Context, space v1beta3.Space, key v1beta3.Key) (acttypes.Rule, error) {
	if key.ApproveRuleId > 0 {
		return k.actKeeper.GetRule(ctx, key.ApproveRuleId)
	} else if space.ApproveSignRuleId > 0 {
		return k.actKeeper.GetRule(ctx, space.ApproveSignRuleId)
	} else {
		return space.RuleApproveUpdateKey(), nil
	}
}

func (k Keeper) getRejectUpdateKeyRule(ctx context.Context, space v1beta3.Space, key v1beta3.Key) (acttypes.Rule, error) {
	if key.RejectRuleId > 0 {
		return k.actKeeper.GetRule(ctx, key.RejectRuleId)
	} else if space.RejectSignRuleId > 0 {
		return k.actKeeper.GetRule(ctx, space.RejectSignRuleId)
	} else {
		return space.RuleRejectUpdateKey(), nil
	}
}

func (k Keeper) getApproveUpdateSpaceRule(ctx context.Context, space v1beta3.Space) (acttypes.Rule, error) {
	if space.ApproveAdminRuleId > 0 {
		return k.actKeeper.GetRule(ctx, space.ApproveAdminRuleId)
	} else {
		return space.RuleApproveUpdateSpace(), nil
	}

}

func (k Keeper) getRejectUpdateSpaceRule(ctx context.Context, space v1beta3.Space) (acttypes.Rule, error) {
	if space.RejectAdminRuleId > 0 {
		return k.actKeeper.GetRule(ctx, space.RejectAdminRuleId)
	} else {
		return space.RuleRejectUpdateSpace(), nil
	}
}

func (k Keeper) executeAnalyzers(ctx context.Context, creator string, contracts []string, input []byte) (context.Context, []byte, error) {
	sdkCtx := sdk.UnwrapSDKContext(ctx)
	creatorAddr := sdk.MustAccAddressFromBech32(creator)
	analyzerVals := make(map[string]map[string]*ast.Expression)
	var dataForSigning []byte
	for _, contract := range contracts {
		contractAddr, err := sdk.AccAddressFromBech32(contract)
		if err != nil {
			return nil, nil, err
		}
		dfs, vals, err := k.ExecuteAnalyzer(sdkCtx, contractAddr, creatorAddr, input)
		if err != nil {
			return nil, nil, err
		}
		if dfs != nil && dataForSigning != nil {
			return nil, nil, v1beta3.ErrDuplicateAnalyzersDataForSigning
		}
		if dfs != nil {
			dataForSigning = dfs
		}
		analyzerVals[contract] = vals
	}
	return WithAnalyzerValues(ctx, analyzerVals), dataForSigning, nil
}
