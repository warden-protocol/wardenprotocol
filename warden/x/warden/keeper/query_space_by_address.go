package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"
	types "github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta2"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k Keeper) SpaceById(goCtx context.Context, req *types.QuerySpaceByIdRequest) (*types.QuerySpaceByIdResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(goCtx)

	space, err := k.SpacesKeeper.Get(ctx, req.Id)
	if err != nil {
		return nil, err
	}

	return &types.QuerySpaceByIdResponse{
		Space: &space,
	}, nil
}
