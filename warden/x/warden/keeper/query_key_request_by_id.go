package keeper

import (
	"context"

	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"

	types "github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta3"
)

func (k Keeper) KeyRequestById(goCtx context.Context, req *types.QueryKeyRequestByIdRequest) (*types.QueryKeyRequestByIdResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	keyReq, err := k.keyRequests.Get(goCtx, req.Id)
	if err != nil {
		return nil, err
	}

	return &types.QueryKeyRequestByIdResponse{
		KeyRequest: &keyReq,
	}, nil
}
