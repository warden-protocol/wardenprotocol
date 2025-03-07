package keeper

import (
	"context"

	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"

	types "github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta3"
)

func (k Keeper) SpaceById(goCtx context.Context, req *types.QuerySpaceByIdRequest) (*types.QuerySpaceByIdResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	space, err := k.SpacesKeeper.Get(goCtx, req.Id)
	if err != nil {
		return nil, err
	}

	return &types.QuerySpaceByIdResponse{
		Space: &space,
	}, nil
}
