package keeper

import (
	"context"

	"cosmossdk.io/collections"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/query"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"

	types "github.com/warden-protocol/wardenprotocol/warden/x/async/types/v1beta1"
)

func (k Keeper) PluginsByValidator(ctx context.Context, req *types.QueryPluginsByValidatorRequest) (*types.QueryPluginsByValidatorResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	validatorAddr, err := sdk.ConsAddressFromBech32(req.Validator)
	if err != nil {
		return nil, status.Error(codes.InvalidArgument, "invalid validator address")
	}

	plugins, pageRes, err := query.CollectionPaginate(
		ctx,
		k.pluginsByValidator,
		req.Pagination,
		func(key collections.Pair[sdk.ConsAddress, string], value collections.NoValue) (string, error) {
			return key.K2(), nil
		},
		query.WithCollectionPaginationPairPrefix[sdk.ConsAddress, string](validatorAddr),
	)
	if err != nil {
		return nil, err
	}

	return &types.QueryPluginsByValidatorResponse{
		Pagination: pageRes,
		Plugins:    plugins,
	}, nil
}
