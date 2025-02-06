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

func (k Keeper) ValidatorsByHandler(ctx context.Context, req *types.QueryValidatorsByHandlerRequest) (*types.QueryValidatorsByHandlerResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	validators, pageRes, err := query.CollectionPaginate(
		ctx,
		k.handlers.ByHandler(),
		req.Pagination,
		func(key collections.Pair[string, sdk.AccAddress], value collections.NoValue) (string, error) {
			return key.K2().String(), nil
		},
		query.WithCollectionPaginationPairPrefix[string, sdk.AccAddress](req.Handler),
	)
	if err != nil {
		return nil, err
	}

	return &types.QueryValidatorsByHandlerResponse{
		Pagination: pageRes,
		Validators: validators,
	}, nil
}
