package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/qredo/fusionchain/x/treasury/types"
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

	signTxRequest, found := k.SignTransactionRequestsRepo().Get(ctx, req.Id)
	if !found {
		return nil, status.Error(codes.NotFound, "not found")
	}

	return &types.QuerySignTransactionRequestByIdResponse{
		SignTransactionRequest: signTxRequest,
	}, nil
}
