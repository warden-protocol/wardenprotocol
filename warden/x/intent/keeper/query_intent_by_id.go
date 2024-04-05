package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/warden-protocol/wardenprotocol/warden/x/intent/types"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

// nolint:stylecheck,st1003
// revive:disable-next-line var-naming
func (k Keeper) IntentById(goCtx context.Context, req *types.QueryIntentByIdRequest) (*types.QueryIntentByIdResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(goCtx)

	intentPb, err := k.GetIntent(ctx, req.Id)
	if err != nil {
		return nil, err
	}

	return &types.QueryIntentByIdResponse{Intent: &intentPb}, nil
}
