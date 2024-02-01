package keeper

import (
	"context"
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/warden-protocol/wardenprotocol/x/treasury/types"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

// nolint:stylecheck,st1003
// revive:disable-next-line var-naming
func (k Keeper) KeyRequestById(goCtx context.Context, req *types.QueryKeyRequestByIdRequest) (*types.QueryKeyRequestByIdResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(goCtx)

	keyReq, found := k.KeyRequestsRepo().Get(ctx, req.Id)
	if !found {
		return nil, fmt.Errorf("key request %d not found", req.Id)
	}

	return &types.QueryKeyRequestByIdResponse{
		KeyRequest: keyReq,
	}, nil
}
