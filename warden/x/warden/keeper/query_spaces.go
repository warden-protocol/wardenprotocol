package keeper

import (
	"context"

	"github.com/cosmos/cosmos-sdk/types/query"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"

	types "github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta3"
)

func (k Keeper) Spaces(goCtx context.Context, req *types.QuerySpacesRequest) (*types.QuerySpacesResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	spaces, pageRes, err := query.CollectionPaginate(goCtx, k.SpacesKeeper.Coll(), req.Pagination, func(id uint64, space types.Space) (types.Space, error) {
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
