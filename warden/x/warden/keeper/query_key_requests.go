package keeper

import (
	"context"

	"github.com/cosmos/cosmos-sdk/types/query"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"

	types "github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta3"
)

func (k Keeper) KeyRequests(goCtx context.Context, req *types.QueryKeyRequestsRequest) (*types.QueryKeyRequestsResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	keyRequests, pageRes, err := query.CollectionFilteredPaginate(goCtx, k.keyRequests, req.Pagination, func(key uint64, value types.KeyRequest) (bool, error) {
		if req.KeychainId > 0 && req.KeychainId != value.KeychainId {
			return false, nil
		}

		if req.Status != types.KeyRequestStatus_KEY_REQUEST_STATUS_UNSPECIFIED && value.Status != req.Status {
			return false, nil
		}

		return true, nil
	}, func(key uint64, v types.KeyRequest) (*types.KeyRequest, error) { return &v, nil })
	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryKeyRequestsResponse{
		KeyRequests: keyRequests,
		Pagination:  pageRes,
	}, nil
}
