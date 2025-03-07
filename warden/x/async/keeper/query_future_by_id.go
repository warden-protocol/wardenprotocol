package keeper

import (
	"context"
	"errors"

	"cosmossdk.io/collections"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"

	types "github.com/warden-protocol/wardenprotocol/warden/x/async/types/v1beta1"
)

func (k Keeper) FutureById(ctx context.Context, req *types.QueryFutureByIdRequest) (*types.QueryFutureByIdResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	future, err := k.futures.Get(ctx, req.Id)
	if err != nil {
		return nil, status.Error(codes.NotFound, err.Error())
	}

	var result *types.FutureResult

	r, err := k.futures.GetResult(ctx, req.Id)
	if err == nil {
		result = &r
	} else if !errors.Is(err, collections.ErrNotFound) {
		return nil, err
	}

	votes, err := k.GetFutureVotes(ctx, req.Id)
	if err != nil {
		return nil, err
	}

	return &types.QueryFutureByIdResponse{
		FutureResponse: types.FutureResponse{
			Future: future,
			Result: result,
			Votes:  votes,
		},
	}, nil
}
