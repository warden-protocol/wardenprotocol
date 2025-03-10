package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"

	types "github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta3"
)

// revive:disable-next-line var-naming
//
//nolint:stylecheck,st1003
func (k Keeper) KeyRequestById(goCtx context.Context, req *types.QueryKeyRequestByIdRequest) (*types.QueryKeyRequestByIdResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(goCtx)

	keyReq, err := k.keyRequests.Get(ctx, req.Id)
	if err != nil {
		return nil, err
	}

	return &types.QueryKeyRequestByIdResponse{
		KeyRequest: &keyReq,
	}, nil
}
