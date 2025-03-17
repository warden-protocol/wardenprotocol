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
func (k Keeper) SignRequestById(goCtx context.Context, req *types.QuerySignRequestByIdRequest) (*types.QuerySignRequestByIdResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(goCtx)

	SignRequest, err := k.signRequests.Get(ctx, req.Id)
	if err != nil {
		return nil, err
	}

	return &types.QuerySignRequestByIdResponse{
		SignRequest: &SignRequest,
	}, nil
}
