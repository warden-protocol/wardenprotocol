package keeper

import (
	"context"
	"errors"

	"cosmossdk.io/collections"
	"github.com/cosmos/cosmos-sdk/types/query"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"

	types "github.com/warden-protocol/wardenprotocol/warden/x/async/types/v1beta1"
)

func (k Keeper) Futures(ctx context.Context, req *types.QueryFuturesRequest) (*types.QueryFuturesResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	futures, pageRes, err := query.CollectionFilteredPaginate(ctx, k.futures.Futures(), req.Pagination, func(key uint64, value types.Future) (bool, error) {
		return req.Creator == "" || req.Creator == value.Creator, nil
	}, func(key uint64, value types.Future) (types.FutureResponse, error) {
		var result *types.FutureResult

		r, err := k.futures.GetResult(ctx, value.Id)
		if err == nil {
			result = &r
		} else if !errors.Is(err, collections.ErrNotFound) {
			return types.FutureResponse{}, err
		}

		votes, err := k.GetFutureVotes(ctx, value.Id)
		if err != nil {
			return types.FutureResponse{}, err
		}

		return types.FutureResponse{
			Future: value,
			Result: result,
			Votes:  votes,
		}, nil
	})
	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryFuturesResponse{
		Pagination: pageRes,
		Futures:    futures,
	}, nil
}
