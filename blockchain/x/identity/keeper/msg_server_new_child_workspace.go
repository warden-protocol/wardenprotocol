package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"gitlab.qredo.com/qrdochain/fusionchain/x/identity/types"
)

func (k msgServer) NewChildWorkspace(goCtx context.Context, msg *types.MsgNewChildWorkspace) (*types.MsgNewChildWorkspaceResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// TODO: Handling the message
	_ = ctx

	return &types.MsgNewChildWorkspaceResponse{}, nil
}
