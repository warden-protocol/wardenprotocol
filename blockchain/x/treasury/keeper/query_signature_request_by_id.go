package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/qredo/fusionchain/x/treasury/types"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

// revive:disable-next-line var-naming // nolint:stylecheck,ST1003
func (k Keeper) SignatureRequestById(goCtx context.Context, req *types.QuerySignatureRequestByIdRequest) (*types.QuerySignatureRequestByIdResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(goCtx)

	signatureRequest, found := k.SignatureRequestsRepo().Get(ctx, req.Id)
	if !found {
		return nil, status.Error(codes.NotFound, "not found")
	}

	return &types.QuerySignatureRequestByIdResponse{
		SignRequest: signatureRequest,
	}, nil
}
