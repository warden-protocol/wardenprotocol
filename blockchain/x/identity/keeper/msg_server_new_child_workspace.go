package keeper

import (
	"context"
	"errors"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"gitlab.qredo.com/qrdochain/fusionchain/x/identity/types"
)

func (k msgServer) NewChildWorkspace(goCtx context.Context, msg *types.MsgNewChildWorkspace) (*types.MsgNewChildWorkspaceResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)
	parent := k.GetWorkspace(ctx, msg.ParentWorkspaceAddr)

	if parent == nil {
		return nil, errors.New("invalid parent workspace address")
	}
	if !parent.IsOwner(msg.Creator) {
		return nil, errors.New("sender is not owner of parent workspace")
	}

	workspace := &types.Workspace{
		Creator: msg.Creator,
		Owners:  []string{msg.Creator},
	}
	childAddr := k.CreateWorkspace(ctx, workspace)

	k.AppendChildWorkspace(ctx, types.NewMsgAppendChildWorkspace(msg.Creator, msg.ParentWorkspaceAddr, childAddr))

	return &types.MsgNewChildWorkspaceResponse{}, nil
}
