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

func (k Keeper) SpacesByOwner(goCtx context.Context, req *types.QuerySpacesByOwnerRequest) (*types.QuerySpacesResponse, error) {
	if req == nil || req.Owner == "" {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ownerAddr, err := sdk.AccAddressFromBech32(req.Owner)
	if err != nil {
		return nil, status.Error(codes.InvalidArgument, "invalid owner address")
	}

	spaces, pageRes, err := query.CollectionPaginate(
		goCtx,
		k.SpacesKeeper.ByOwner(),
		req.Pagination,
		func(key collections.Pair[sdk.AccAddress, uint64], value collections.NoValue) (types.Space, error) {
			return k.SpacesKeeper.Get(goCtx, key.K2())
		},
		query.WithCollectionPaginationPairPrefix[sdk.AccAddress, uint64](ownerAddr),
	)
	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QuerySpacesResponse{
		Spaces:     spaces,
		Pagination: pageRes,
	}, nil
}
