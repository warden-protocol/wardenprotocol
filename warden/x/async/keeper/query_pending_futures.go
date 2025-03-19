package keeper

import (
	"context"

	"github.com/cosmos/cosmos-sdk/types/query"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"

	types "github.com/warden-protocol/wardenprotocol/warden/x/async/types/v1beta1"
)

func (k Keeper) PendingFutures(ctx context.Context, req *types.QueryPendingFuturesRequest) (*types.QueryPendingFuturesResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	futures, pageRes, err := query.CollectionFilteredPaginate(ctx, k.futures.Futures(), req.Pagination, func(key uint64, value types.Future) (bool, error) {
		hasResult, err := k.futures.HasResult(ctx, value.Id)
		if err != nil {
			return false, err
		}

		return !hasResult, nil
	}, func(key uint64, value types.Future) (types.Future, error) {
		return value, nil
	})
	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryPendingFuturesResponse{
		Pagination: pageRes,
		Futures:    futures,
	}, nil
}
