package keeper

import (
	"context"

	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/query"
	"gitlab.qredo.com/qrdochain/fusionchain/x/identity/types"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k Keeper) Workspaces(goCtx context.Context, req *types.QueryWorkspacesRequest) (*types.QueryWorkspacesResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(goCtx)

	workspaces := make([]types.Workspace, 0, query.DefaultLimit)
	store := ctx.KVStore(k.storeKey)
	workspaceStore := prefix.NewStore(store, types.KeyPrefix(types.WorkspaceKey))

	pageRes, err := query.Paginate(workspaceStore, req.Pagination, func(key []byte, value []byte) error {
		var workspace types.Workspace
		if err := k.cdc.Unmarshal(value, &workspace); err != nil {
			return err
		}

		workspaces = append(workspaces, workspace)
		return nil
	})

	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryWorkspacesResponse{
		Workspaces: workspaces,
		Pagination: pageRes,
	}, nil
}
