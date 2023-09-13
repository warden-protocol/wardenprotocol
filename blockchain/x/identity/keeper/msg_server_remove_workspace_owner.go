package keeper

import (
	"context"
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/qredo/fusionchain/policy"
	bbird "github.com/qredo/fusionchain/x/blackbird/keeper"
	bbirdtypes "github.com/qredo/fusionchain/x/blackbird/types"
	"github.com/qredo/fusionchain/x/identity/types"
)

func (k msgServer) RemoveWorkspaceOwner(goCtx context.Context, msg *types.MsgRemoveWorkspaceOwner) (*types.MsgRemoveWorkspaceOwnerResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)
	ws := k.GetWorkspace(ctx, msg.WorkspaceAddr)
	if ws == nil {
		return nil, fmt.Errorf("workspace not found")
	}

	act, err := k.blackbirdKeeper.AddAction(ctx, msg, ws.AdminPolicyId, msg.Creator)
	if err != nil {
		return nil, err
	}
	return k.RemoveOwnerActionHandler(ctx, act)
}

func (k msgServer) RemoveOwnerActionHandler(ctx sdk.Context, act *bbirdtypes.Action) (*types.MsgRemoveWorkspaceOwnerResponse, error) {
	return bbird.TryExecuteAction(
		k.blackbirdKeeper,
		k.cdc,
		ctx,
		act,
		func(ctx sdk.Context, msg *types.MsgRemoveWorkspaceOwner) (policy.Policy, error) {
			ws := k.GetWorkspace(ctx, msg.WorkspaceAddr)
			if ws == nil {
				return nil, fmt.Errorf("workspace not found")
			}

			pol := ws.PolicyRemoveOwner()
			return pol, nil
		},
		func(ctx sdk.Context, msg *types.MsgRemoveWorkspaceOwner) (*types.MsgRemoveWorkspaceOwnerResponse, error) {
			ws := k.GetWorkspace(ctx, msg.WorkspaceAddr)
			if ws == nil {
				return nil, fmt.Errorf("workspace not found")
			}

			if !ws.IsOwner(msg.Owner) {
				return nil, fmt.Errorf("owner does not exist")
			}

			ws.RemoveOwner(msg.Owner)

			k.SetWorkspace(ctx, ws)

			return &types.MsgRemoveWorkspaceOwnerResponse{}, nil
		},
	)
}
