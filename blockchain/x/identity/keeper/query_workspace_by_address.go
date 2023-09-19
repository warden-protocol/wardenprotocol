package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/qredo/fusionchain/x/identity/types"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k Keeper) WorkspaceByAddress(goCtx context.Context, req *types.QueryWorkspaceByAddressRequest) (*types.QueryWorkspaceByAddressResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(goCtx)

	workspace := k.GetWorkspace(ctx, req.Address)
	if workspace == nil {
		return nil, status.Error(codes.NotFound, "workspace not found")
	}

	return &types.QueryWorkspaceByAddressResponse{
		Workspace: workspace,
	}, nil
}
