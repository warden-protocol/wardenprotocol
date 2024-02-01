package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/warden-protocol/wardenprotocol/warden/x/warden/types"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

// nolint:stylecheck,st1003
// revive:disable-next-line var-naming
func (k Keeper) SignTransactionRequestById(goCtx context.Context, req *types.QuerySignTransactionRequestByIdRequest) (*types.QuerySignTransactionRequestByIdResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(goCtx)

	signTxRequest, err := k.signTransactionRequests.Get(ctx, req.Id)
	if err != nil {
		return nil, err
	}

	return &types.QuerySignTransactionRequestByIdResponse{
		SignTransactionRequest: &signTxRequest,
	}, nil
}
