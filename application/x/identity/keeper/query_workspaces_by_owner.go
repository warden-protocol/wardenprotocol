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

func (k Keeper) WorkspacesByOwner(goCtx context.Context, req *types.QueryWorkspacesByOwnerRequest) (*types.QueryWorkspacesResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(goCtx)

	store := ctx.KVStore(k.storeKey)
	workspaceStore := prefix.NewStore(store, types.KeyPrefix(types.WorkspaceKey))

	workspaces, pageRes, err := query.GenericFilteredPaginate(k.cdc, workspaceStore, req.Pagination, func(key []byte, value *types.Workspace) (*types.Workspace, error) {
		if !value.IsOwner(req.Owner) {
			return nil, nil
		}
		return value, nil
	}, func() *types.Workspace { return &types.Workspace{} })

	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	// extract pointers
	wss := make([]types.Workspace, 0, len(workspaces))
	for _, w := range workspaces {
		wss = append(wss, *w)
	}

	return &types.QueryWorkspacesResponse{
		Workspaces: wss,
		Pagination: pageRes,
	}, nil
}
