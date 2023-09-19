package keeper

import (
	"context"
	"fmt"

	cdctypes "github.com/cosmos/cosmos-sdk/codec/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/qredo/fusionchain/policy"
	bbird "github.com/qredo/fusionchain/x/blackbird/keeper"
	bbirdtypes "github.com/qredo/fusionchain/x/blackbird/types"
	"github.com/qredo/fusionchain/x/identity/types"
)

func (k msgServer) AddWorkspaceOwner(goCtx context.Context, msg *types.MsgAddWorkspaceOwner) (*types.MsgAddWorkspaceOwnerResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)
	ws := k.GetWorkspace(ctx, msg.WorkspaceAddr)
	if ws == nil {
		return nil, fmt.Errorf("workspace not found")
	}

	act, err := k.blackbirdKeeper.AddAction(ctx, msg, ws.AdminPolicyId, msg.Creator)
	if err != nil {
		return nil, err
	}
	return k.AddOwnerActionHandler(ctx, act, &cdctypes.Any{})
}

func (k msgServer) AddOwnerActionHandler(ctx sdk.Context, act *bbirdtypes.Action, payload *cdctypes.Any) (*types.MsgAddWorkspaceOwnerResponse, error) {
	return bbird.TryExecuteAction(
		k.blackbirdKeeper,
		k.cdc,
		ctx,
		act,
		payload,
		func(ctx sdk.Context, msg *types.MsgAddWorkspaceOwner) (policy.Policy, error) {
			ws := k.GetWorkspace(ctx, msg.WorkspaceAddr)
			if ws == nil {
				return nil, fmt.Errorf("workspace not found")
			}

			pol := ws.PolicyAddOwner()
			return pol, nil
		},
		func(ctx sdk.Context, msg *types.MsgAddWorkspaceOwner) (*types.MsgAddWorkspaceOwnerResponse, error) {
			ws := k.GetWorkspace(ctx, msg.WorkspaceAddr)
			if ws == nil {
				return nil, fmt.Errorf("workspace not found")
			}

			if ws.IsOwner(msg.NewOwner) {
				return nil, fmt.Errorf("new owner is already an owner of the workspace")
			}

			ws.AddOwner(msg.NewOwner)

			k.SetWorkspace(ctx, ws)

			return &types.MsgAddWorkspaceOwnerResponse{}, nil
		},
	)
}
