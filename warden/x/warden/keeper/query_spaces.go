package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/query"
	types "github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta3"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k Keeper) Spaces(goCtx context.Context, req *types.QuerySpacesRequest) (*types.QuerySpacesResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(goCtx)

	spaces, pageRes, err := query.CollectionPaginate(ctx, k.SpacesKeeper.Coll(), req.Pagination, func(id uint64, space types.Space) (types.Space, error) {
		return space, nil
	})

	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QuerySpacesResponse{
		Spaces:     spaces,
		Pagination: pageRes,
	}, nil
}
