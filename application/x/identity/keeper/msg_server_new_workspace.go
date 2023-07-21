package keeper

import (
	"context"
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"gitlab.qredo.com/qrdochain/fusionchain/x/identity/types"
)

func (k msgServer) NewWorkspace(goCtx context.Context, msg *types.MsgNewWorkspace) (*types.MsgNewWorkspaceResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	address, err := sdk.Bech32ifyAddressBytes("qredo", sdk.AccAddress("workspace"+fmt.Sprintf("%d", k.WorkspacesRepo().GetCount(ctx)+1)))
	if err != nil {
		return nil, err
	}

	workspace := types.Workspace{
		Creator: msg.Creator,
		Owners:  []string{msg.Creator},
		Address: address,
	}
	id := k.WorkspacesRepo().Append(ctx, &workspace)

	return &types.MsgNewWorkspaceResponse{
		Id: id,
	}, nil
}
