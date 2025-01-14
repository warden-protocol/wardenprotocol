package keeper

import (
	"context"

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

	return &types.QueryFutureByIdResponse{
		Future: future,
	}, nil
}
