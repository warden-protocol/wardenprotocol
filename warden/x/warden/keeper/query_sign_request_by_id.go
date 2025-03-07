package keeper

import (
	"context"

	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"

	types "github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta3"
)

func (k Keeper) SignRequestById(goCtx context.Context, req *types.QuerySignRequestByIdRequest) (*types.QuerySignRequestByIdResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	signRequest, err := k.signRequests.Get(goCtx, req.Id)
	if err != nil {
		return nil, err
	}

	return &types.QuerySignRequestByIdResponse{
		SignRequest: &signRequest,
	}, nil
}
