package keeper

import (
	"context"
	"errors"
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/qredo/fusionchain/policy"
	bbird "github.com/qredo/fusionchain/x/blackbird/keeper"
	bbirdtypes "github.com/qredo/fusionchain/x/blackbird/types"
	"github.com/qredo/fusionchain/x/identity/types"
)

func (k msgServer) AppendChildWorkspace(goCtx context.Context, msg *types.MsgAppendChildWorkspace) (*types.MsgAppendChildWorkspaceResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)
	parent := k.GetWorkspace(ctx, msg.ParentWorkspaceAddr)
	if parent == nil {
		return nil, fmt.Errorf("workspace not found")
	}

	act, err := k.blackbirdKeeper.AddAction(ctx, msg, parent.AdminPolicyId, msg.Creator)
	if err != nil {
		return nil, err
	}
	return k.AppendChildWorkspaceActionHandler(ctx, act)
}

func (k msgServer) AppendChildWorkspaceActionHandler(ctx sdk.Context, act *bbirdtypes.Action) (*types.MsgAppendChildWorkspaceResponse, error) {
	return bbird.TryExecuteAction(
		k.blackbirdKeeper,
		k.cdc,
		ctx,
		act,
		func(ctx sdk.Context, msg *types.MsgAppendChildWorkspace) (policy.Policy, error) {
			parent := k.GetWorkspace(ctx, msg.ParentWorkspaceAddr)
			if parent == nil {
				return nil, fmt.Errorf("workspace not found")
			}

			pol := parent.PolicyAppendChild()
			return pol, nil
		},
		func(ctx sdk.Context, msg *types.MsgAppendChildWorkspace) (*types.MsgAppendChildWorkspaceResponse, error) {
			child := k.GetWorkspace(ctx, msg.ChildWorkspaceAddr)
			parent := k.GetWorkspace(ctx, msg.ParentWorkspaceAddr)

			if child == nil || parent == nil {
				return nil, errors.New("one or more invalid workspace addresses provided")
			}

			parent.AddChild(child)
			k.SetWorkspace(ctx, parent)

			return &types.MsgAppendChildWorkspaceResponse{}, nil
		},
	)
}
