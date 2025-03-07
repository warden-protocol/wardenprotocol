package keeper

import (
	"context"

	"cosmossdk.io/errors"
	sdk "github.com/cosmos/cosmos-sdk/types"

	"github.com/warden-protocol/wardenprotocol/shield/ast"
	acttypes "github.com/warden-protocol/wardenprotocol/warden/x/act/types/v1beta1"
	"github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta3"
)

func (k Keeper) RegisterTemplates(reg *acttypes.TemplatesRegistry) {
	acttypes.Register(reg, k.addSpaceOwnerTemplate)
	acttypes.Register(reg, k.newKeyRequestTemplate)
	acttypes.Register(reg, k.removeSpaceOwnerTemplate)
	acttypes.Register(reg, k.updateKeyTemplate)
	acttypes.Register(reg, k.updateSpaceTemplate)
	acttypes.RegisterCtx(reg, k.newSignRequestTemplate)
}

func (k Keeper) addSpaceOwnerTemplate(ctx context.Context, msg *v1beta3.MsgAddSpaceOwner) (acttypes.Template, acttypes.Template, error) {
	space, err := k.SpacesKeeper.Get(ctx, msg.SpaceId)
	if err != nil {
		return acttypes.Template{}, acttypes.Template{}, err
	}

	approveTemplate, err := k.getApproveAddOwnerTemplate(ctx, space)
	if err != nil {
		return acttypes.Template{}, acttypes.Template{}, err
	}

	rejectTemplate, err := k.getRejectAddOwnerTemplate(ctx, space)
	if err != nil {
		return acttypes.Template{}, acttypes.Template{}, err
	}

	return approveTemplate, rejectTemplate, nil
}

func (k Keeper) removeSpaceOwnerTemplate(ctx context.Context, msg *v1beta3.MsgRemoveSpaceOwner) (acttypes.Template, acttypes.Template, error) {
	space, err := k.SpacesKeeper.Get(ctx, msg.SpaceId)
	if err != nil {
		return acttypes.Template{}, acttypes.Template{}, err
	}

	approveTemplate, err := k.getApproveRemoveOwnerTemplate(ctx, space)
	if err != nil {
		return acttypes.Template{}, acttypes.Template{}, err
	}

	rejectTemplate, err := k.getRejectRemoveOwnerTemplate(ctx, space)
	if err != nil {
		return acttypes.Template{}, acttypes.Template{}, err
	}

	return approveTemplate, rejectTemplate, nil
}

func (k Keeper) newKeyRequestTemplate(ctx context.Context, msg *v1beta3.MsgNewKeyRequest) (acttypes.Template, acttypes.Template, error) {
	space, err := k.SpacesKeeper.Get(ctx, msg.SpaceId)
	if err != nil {
		return acttypes.Template{}, acttypes.Template{}, err
	}

	approveTemplate, err := k.getApproveNewKeyRequestTemplate(ctx, space)
	if err != nil {
		return acttypes.Template{}, acttypes.Template{}, err
	}

	rejectTemplate, err := k.getRejectNewKeyRequestTemplate(ctx, space)
	if err != nil {
		return acttypes.Template{}, acttypes.Template{}, err
	}

	return approveTemplate, rejectTemplate, nil
}

func (k Keeper) newSignRequestTemplate(ctx context.Context, msg *v1beta3.MsgNewSignRequest) (context.Context, acttypes.Template, acttypes.Template, error) {
	key, err := k.KeysKeeper.Get(ctx, msg.KeyId)
	if err != nil {
		return nil, acttypes.Template{}, acttypes.Template{}, err
	}

	space, err := k.SpacesKeeper.Get(ctx, key.SpaceId)
	if err != nil {
		return nil, acttypes.Template{}, acttypes.Template{}, err
	}

	approveTemplate, err := k.getApproveSignTemplate(ctx, space, key)
	if err != nil {
		return nil, acttypes.Template{}, acttypes.Template{}, err
	}

	rejectTemplate, err := k.getRejectSignTemplate(ctx, space, key)
	if err != nil {
		return nil, acttypes.Template{}, acttypes.Template{}, err
	}

	creator := k.actKeeper.GetActionCreator(ctx)

	ctxWithVals, dataForSigning, err := k.executeAnalyzers(ctx, creator, msg.Analyzers, msg.Input)
	if err != nil {
		return nil, acttypes.Template{}, acttypes.Template{}, errors.Wrapf(v1beta3.ErrAnalyzer, "%v", err)
	}

	if dataForSigning != nil {
		msg.Input = dataForSigning
	}

	return ctxWithVals, approveTemplate, rejectTemplate, nil
}

func (k Keeper) updateKeyTemplate(ctx context.Context, msg *v1beta3.MsgUpdateKey) (acttypes.Template, acttypes.Template, error) {
	key, err := k.KeysKeeper.Get(ctx, msg.KeyId)
	if err != nil {
		return acttypes.Template{}, acttypes.Template{}, err
	}

	space, err := k.SpacesKeeper.Get(ctx, key.SpaceId)
	if err != nil {
		return acttypes.Template{}, acttypes.Template{}, err
	}

	approveTemplate, err := k.getApproveUpdateKeyTemplate(ctx, space, key)
	if err != nil {
		return acttypes.Template{}, acttypes.Template{}, err
	}

	rejectTemplate, err := k.getRejectUpdateKeyTemplate(ctx, space, key)
	if err != nil {
		return acttypes.Template{}, acttypes.Template{}, err
	}

	return approveTemplate, rejectTemplate, nil
}

func (k Keeper) updateSpaceTemplate(ctx context.Context, msg *v1beta3.MsgUpdateSpace) (acttypes.Template, acttypes.Template, error) {
	space, err := k.SpacesKeeper.Get(ctx, msg.SpaceId)
	if err != nil {
		return acttypes.Template{}, acttypes.Template{}, err
	}

	approveTemplate, err := k.getApproveUpdateSpaceTemplate(ctx, space)
	if err != nil {
		return acttypes.Template{}, acttypes.Template{}, err
	}

	rejectTemplate, err := k.getRejectUpdateSpaceTemplate(ctx, space)
	if err != nil {
		return acttypes.Template{}, acttypes.Template{}, err
	}

	return approveTemplate, rejectTemplate, nil
}

func (k Keeper) getApproveSignTemplate(ctx context.Context, space v1beta3.Space, key v1beta3.Key) (acttypes.Template, error) {
	if key.ApproveTemplateId > 0 {
		return k.actKeeper.GetTemplate(ctx, key.ApproveTemplateId)
	} else if space.ApproveSignTemplateId > 0 {
		return k.actKeeper.GetTemplate(ctx, space.ApproveSignTemplateId)
	} else {
		return space.TemplateApproveNewSignRequest(), nil
	}
}

func (k Keeper) getRejectSignTemplate(ctx context.Context, space v1beta3.Space, key v1beta3.Key) (acttypes.Template, error) {
	if key.RejectTemplateId > 0 {
		return k.actKeeper.GetTemplate(ctx, key.RejectTemplateId)
	} else if space.RejectSignTemplateId > 0 {
		return k.actKeeper.GetTemplate(ctx, space.RejectSignTemplateId)
	} else {
		return space.TemplateRejectNewSignRequest(), nil
	}
}

func (k Keeper) getApproveAddOwnerTemplate(ctx context.Context, space v1beta3.Space) (acttypes.Template, error) {
	if space.ApproveAdminTemplateId > 0 {
		return k.actKeeper.GetTemplate(ctx, space.ApproveAdminTemplateId)
	} else {
		return space.TemplateApproveAddOwner(), nil
	}
}

func (k Keeper) getRejectAddOwnerTemplate(ctx context.Context, space v1beta3.Space) (acttypes.Template, error) {
	if space.RejectAdminTemplateId > 0 {
		return k.actKeeper.GetTemplate(ctx, space.RejectAdminTemplateId)
	} else {
		return space.TemplateRejectAddOwner(), nil
	}
}

func (k Keeper) getApproveRemoveOwnerTemplate(ctx context.Context, space v1beta3.Space) (acttypes.Template, error) {
	if space.ApproveAdminTemplateId > 0 {
		return k.actKeeper.GetTemplate(ctx, space.ApproveAdminTemplateId)
	} else {
		return space.TemplateApproveRemoveOwner(), nil
	}
}

func (k Keeper) getRejectRemoveOwnerTemplate(ctx context.Context, space v1beta3.Space) (acttypes.Template, error) {
	if space.RejectAdminTemplateId > 0 {
		return k.actKeeper.GetTemplate(ctx, space.RejectAdminTemplateId)
	} else {
		return space.TemplateRejectRemoveOwner(), nil
	}
}

func (k Keeper) getApproveNewKeyRequestTemplate(ctx context.Context, space v1beta3.Space) (acttypes.Template, error) {
	if space.ApproveSignTemplateId > 0 {
		return k.actKeeper.GetTemplate(ctx, space.ApproveSignTemplateId)
	} else {
		return space.TemplateApproveNewKeyRequest(), nil
	}
}

func (k Keeper) getRejectNewKeyRequestTemplate(ctx context.Context, space v1beta3.Space) (acttypes.Template, error) {
	if space.RejectSignTemplateId > 0 {
		return k.actKeeper.GetTemplate(ctx, space.RejectSignTemplateId)
	} else {
		return space.TemplateRejectNewKeyRequest(), nil
	}
}

func (k Keeper) getApproveUpdateKeyTemplate(ctx context.Context, space v1beta3.Space, key v1beta3.Key) (acttypes.Template, error) {
	if key.ApproveTemplateId > 0 {
		return k.actKeeper.GetTemplate(ctx, key.ApproveTemplateId)
	} else if space.ApproveSignTemplateId > 0 {
		return k.actKeeper.GetTemplate(ctx, space.ApproveSignTemplateId)
	} else {
		return space.TemplateApproveUpdateKey(), nil
	}
}

func (k Keeper) getRejectUpdateKeyTemplate(ctx context.Context, space v1beta3.Space, key v1beta3.Key) (acttypes.Template, error) {
	if key.RejectTemplateId > 0 {
		return k.actKeeper.GetTemplate(ctx, key.RejectTemplateId)
	} else if space.RejectSignTemplateId > 0 {
		return k.actKeeper.GetTemplate(ctx, space.RejectSignTemplateId)
	} else {
		return space.TemplateRejectUpdateKey(), nil
	}
}

func (k Keeper) getApproveUpdateSpaceTemplate(ctx context.Context, space v1beta3.Space) (acttypes.Template, error) {
	if space.ApproveAdminTemplateId > 0 {
		return k.actKeeper.GetTemplate(ctx, space.ApproveAdminTemplateId)
	} else {
		return space.TemplateApproveUpdateSpace(), nil
	}
}

func (k Keeper) getRejectUpdateSpaceTemplate(ctx context.Context, space v1beta3.Space) (acttypes.Template, error) {
	if space.RejectAdminTemplateId > 0 {
		return k.actKeeper.GetTemplate(ctx, space.RejectAdminTemplateId)
	} else {
		return space.TemplateRejectUpdateSpace(), nil
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
