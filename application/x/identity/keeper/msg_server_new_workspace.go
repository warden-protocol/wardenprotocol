package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"gitlab.qredo.com/qrdochain/fusionchain/x/identity/types"
)

func (k msgServer) NewWorkspace(goCtx context.Context, msg *types.MsgNewWorkspace) (*types.MsgNewWorkspaceResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	workspace := types.Workspace{
		Creator: msg.Creator,
	}
	id := k.AppendWorkspace(ctx, workspace)

	return &types.MsgNewWorkspaceResponse{
		Id: id,
	}, nil
}
