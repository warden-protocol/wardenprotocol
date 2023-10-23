package keeper

import (
	"context"

	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/query"
	"github.com/qredo/fusionchain/x/treasury/types"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k Keeper) KeyRequests(goCtx context.Context, req *types.QueryKeyRequestsRequest) (*types.QueryKeyRequestsResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(goCtx)

	store := ctx.KVStore(k.storeKey)
	workspaceStore := prefix.NewStore(store, types.KeyPrefix(types.KeyRequestKey))

	keyRequests, pageRes, err := query.GenericFilteredPaginate(k.cdc, workspaceStore, req.Pagination, func(key []byte, value *types.KeyRequest) (*types.KeyRequest, error) {
		if req.KeyringAddr != value.KeyringAddr {
			return nil, nil
		}

		if req.Status != types.KeyRequestStatus_KEY_REQUEST_STATUS_UNSPECIFIED && value.Status != req.Status {
			return nil, nil
		}

		return value, nil
	}, func() *types.KeyRequest { return &types.KeyRequest{} })

	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryKeyRequestsResponse{
		KeyRequests: keyRequests,
		Pagination:  pageRes,
	}, nil
}
