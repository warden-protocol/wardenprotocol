package keeper

import (
	"context"
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/qredo/fusionchain/x/identity/types"
)

func (k msgServer) NewWorkspace(goCtx context.Context, msg *types.MsgNewWorkspace) (*types.MsgNewWorkspaceResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	for _, owner := range msg.AdditionalOwners {
		if owner == msg.Creator {
			return nil, fmt.Errorf("creator is already an owner")
		}
	}
	workspace := &types.Workspace{
		Creator:         msg.Creator,
		Owners:          append([]string{msg.Creator}, msg.AdditionalOwners...),
		ChildWorkspaces: nil,
		AdminPolicyId:   msg.AdminPolicyId,
		SignPolicyId:    msg.SignPolicyId,
	}
	addr := k.CreateWorkspace(ctx, workspace)

	return &types.MsgNewWorkspaceResponse{
		Address: addr,
	}, nil
}
