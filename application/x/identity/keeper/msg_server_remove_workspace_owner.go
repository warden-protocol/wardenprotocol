package keeper

import (
	"context"
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"gitlab.qredo.com/qrdochain/fusionchain/policy"
	"gitlab.qredo.com/qrdochain/fusionchain/x/identity/types"
)

func (k msgServer) RemoveWorkspaceOwner(goCtx context.Context, msg *types.MsgRemoveWorkspaceOwner) (*types.MsgRemoveWorkspaceOwnerResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	act, err := addAction(k, ctx, msg, msg.Creator)
	if err != nil {
		return nil, err
	}
	return k.xxxRemoveOwnerAction(ctx, act)
}

func (k msgServer) xxxRemoveOwnerAction(ctx sdk.Context, act *types.Action) (*types.MsgRemoveWorkspaceOwnerResponse, error) {
	return tryExecuteAction(
		k,
		k.cdc,
		ctx,
		act,
		func(ctx sdk.Context, msg *types.MsgRemoveWorkspaceOwner) (policy.Policy, error) {
			ws, found := k.GetWorkspace(ctx, msg.WorkspaceId)
			if !found {
				return nil, fmt.Errorf("workspace not found")
			}

			pol := ws.PolicyRemoveOwner()
			return pol, nil
		},
		func(ctx sdk.Context, msg *types.MsgRemoveWorkspaceOwner) (*types.MsgRemoveWorkspaceOwnerResponse, error) {
			ws, found := k.GetWorkspace(ctx, msg.WorkspaceId)
			if !found {
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
