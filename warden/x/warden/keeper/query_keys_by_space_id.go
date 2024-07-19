package keeper

import (
	"context"

	"cosmossdk.io/collections"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/query"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"

	types "github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta3"
)

func (k Keeper) KeysBySpaceId(goCtx context.Context, req *types.QueryKeysBySpaceIdRequest) (*types.QueryKeysResponse, error) {
	if req == nil || req.SpaceId == 0 {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(goCtx)

	keys, page, err := query.CollectionPaginate(
		ctx,
		k.KeysKeeper.KeysBySpace(),
		req.Pagination,
		func(keyPair collections.Pair[uint64, uint64], value collections.NoValue) (types.QueryKeyResponse, error) {
			key, err := k.KeysKeeper.Get(ctx, keyPair.K2())
			if err != nil {
				return types.QueryKeyResponse{}, err
			}

			return types.QueryKeyResponse{
				Key:       key,
				Addresses: key.DeriveAddresses(ctx, req.DeriveAddresses),
			}, nil
		},
		query.WithCollectionPaginationPairPrefix[uint64, uint64](req.SpaceId),
	)

	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryKeysResponse{
		Keys:       keys,
		Pagination: page,
	}, nil
}
