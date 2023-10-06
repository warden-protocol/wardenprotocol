package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/qredo/fusionchain/x/identity/types"
)

func (k msgServer) NewWorkspace(goCtx context.Context, msg *types.MsgNewWorkspace) (*types.MsgNewWorkspaceResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	workspace := &types.Workspace{
		Creator:         msg.Creator,
		ChildWorkspaces: nil,
		AdminPolicyId:   msg.AdminPolicyId,
		SignPolicyId:    msg.SignPolicyId,
	}

	if err := workspace.AddOwner(msg.Creator); err != nil {
		return nil, err
	}
	for _, owner := range msg.AdditionalOwners {
		if err := workspace.AddOwner(owner); err != nil {
			return nil, err
		}
	}

	return &types.MsgNewWorkspaceResponse{
		Address: k.CreateWorkspace(ctx, workspace),
	}, nil
}
