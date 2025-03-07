package keeper

import (
	"context"

	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"

	types "github.com/warden-protocol/wardenprotocol/warden/x/act/types/v1beta1"
)

func (k Keeper) ActionById(goCtx context.Context, req *types.QueryActionByIdRequest) (*types.QueryActionByIdResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	action, err := k.ActionKeeper.Get(goCtx, req.Id)
	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryActionByIdResponse{
		Action: &action,
	}, nil
}
