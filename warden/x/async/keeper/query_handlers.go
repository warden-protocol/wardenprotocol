package keeper

import (
	"context"

	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"

	"github.com/cosmos/cosmos-sdk/types/query"
	types "github.com/warden-protocol/wardenprotocol/warden/x/async/types/v1beta1"
)

func (k Keeper) Handlers(ctx context.Context, req *types.QueryHandlersRequest) (*types.QueryHandlersResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	handlers, pageRes, err := query.CollectionPaginate(
		ctx,
		k.handlers.Handlers(),
		req.Pagination,
		func(key string, value types.Handler) (types.Handler, error) {
			return value, nil
		},
	)
	if err != nil {
		return nil, err
	}

	return &types.QueryHandlersResponse{
		Pagination: pageRes,
		Handlers:   handlers,
	}, nil
}
