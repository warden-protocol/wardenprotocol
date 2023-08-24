package keeper

import (
	"context"
	"errors"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/qredo/fusionchain/x/identity/types"
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

	child := &types.Workspace{
		Creator: msg.Creator,
		Owners:  []string{msg.Creator},
	}
	k.CreateWorkspace(ctx, child)

	parent.AddChild(child)
	k.SetWorkspace(ctx, parent)

	return &types.MsgNewChildWorkspaceResponse{}, nil
}
