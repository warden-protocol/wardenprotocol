package keeper

import (
	"context"
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"gitlab.qredo.com/qrdochain/fusionchain/x/identity/types"
)

func (k msgServer) AddWorkspaceOwner(goCtx context.Context, msg *types.MsgAddWorkspaceOwner) (*types.MsgAddWorkspaceOwnerResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	ws, found := k.GetWorkspace(ctx, msg.WorkspaceId)
	if !found {
		return nil, fmt.Errorf("workspace not found")
	}

	if !allowedToAddOwner(ws, msg.Creator) {
		return nil, fmt.Errorf("sender is not allowed to perform this action")
	}

	if ws.IsOwner(msg.NewOwner) {
		return nil, fmt.Errorf("new owner is already an owner of the workspace")
	}

	ws.AddOwner(msg.NewOwner)

	k.SetWorkspace(ctx, ws)

	return &types.MsgAddWorkspaceOwnerResponse{}, nil
}

func allowedToAddOwner(ws types.Workspace, addr string) bool {
	return ws.IsOwner(addr)
}
