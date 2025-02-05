package keeper

import (
	"context"

	"cosmossdk.io/collections"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/query"
	types "github.com/warden-protocol/wardenprotocol/warden/x/async/types/v1beta1"
)

func (k Keeper) GetHandlersByValidator(ctx context.Context, req *types.QueryHandlersByValidatorRequest) (*types.QueryHandlersByValidatorResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	validatorAddr, err := sdk.AccAddressFromBech32(req.Validator)
	if err != nil {
		return nil, status.Error(codes.InvalidArgument, "invalid validator address")
	}

	handlers, pageRes, err := query.CollectionPaginate(
		ctx,
		k.handlers.ByValidator(),
		req.Pagination,
		func(key collections.Pair[sdk.AccAddress, string], value collections.NoValue) (string, error) {
			return key.K2(), nil
		},
		query.WithCollectionPaginationPairPrefix[sdk.AccAddress, string](validatorAddr),
	)
	if err != nil {
		return nil, err
	}

	return &types.QueryHandlersByValidatorResponse{
		Pagination: pageRes,
		Handlers:   handlers,
	}, nil
}
