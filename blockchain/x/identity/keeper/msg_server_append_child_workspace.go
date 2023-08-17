package keeper

import (
	"context"
	"errors"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"gitlab.qredo.com/qrdochain/fusionchain/x/identity/types"
)

func (k msgServer) AppendChildWorkspace(goCtx context.Context, msg *types.MsgAppendChildWorkspace) (*types.MsgAppendChildWorkspaceResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)
	child := k.GetWorkspace(ctx, msg.ChildWorkspaceAddr)
	parent := k.GetWorkspace(ctx, msg.ParentWorkspaceAddr)

	if child == nil || parent == nil {
		return nil, errors.New("one or more invalid workspace addresses provided")
	}
	if !child.IsOwner(msg.Creator) || !parent.IsOwner(msg.Creator) {
		return nil, errors.New("sender is not owner of one or both workspaces")
	}

	parent.ChildWorkspaces = append(parent.ChildWorkspaces, msg.ChildWorkspaceAddr)
	k.SetWorkspace(ctx, parent)

	return &types.MsgAppendChildWorkspaceResponse{}, nil
}
