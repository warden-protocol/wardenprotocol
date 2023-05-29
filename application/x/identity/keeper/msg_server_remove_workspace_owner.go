package keeper

import (
	"context"
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"gitlab.qredo.com/qrdochain/fusionchain/x/identity/types"
)

func (k msgServer) RemoveWorkspaceOwner(goCtx context.Context, msg *types.MsgRemoveWorkspaceOwner) (*types.MsgRemoveWorkspaceOwnerResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	ws, found := k.GetWorkspace(ctx, msg.WorkspaceId)
	if !found {
		return nil, fmt.Errorf("workspace not found")
	}

	if !allowedToRemoveOwner(ws, msg.Creator) {
		return nil, fmt.Errorf("sender is not allowed to perform this action")
	}

	if !ws.IsOwner(msg.Owner) {
		return nil, fmt.Errorf("owner does not exist")
	}

	ws.RemoveOwner(msg.Owner)

	k.SetWorkspace(ctx, ws)

	return &types.MsgRemoveWorkspaceOwnerResponse{}, nil
}

func allowedToRemoveOwner(ws types.Workspace, addr string) bool {
	return ws.IsOwner(addr)
}
