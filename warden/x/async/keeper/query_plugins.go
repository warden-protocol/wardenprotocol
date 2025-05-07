package keeper

import (
	"context"

	"github.com/cosmos/cosmos-sdk/types/query"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"

	types "github.com/warden-protocol/wardenprotocol/warden/x/async/types/v1beta1"
)

func (k Keeper) Plugins(ctx context.Context, req *types.QueryPluginsRequest) (*types.QueryPluginsResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	plugins, pageRes, err := query.CollectionFilteredPaginate(ctx, k.plugins, req.Pagination, func(key string, value types.Plugin) (bool, error) {
		return true, nil
	}, func(key string, value types.Plugin) (types.Plugin, error) {
		return value, nil
	})
	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryPluginsResponse{
		Pagination: pageRes,
		Plugins:    plugins,
	}, nil
}
