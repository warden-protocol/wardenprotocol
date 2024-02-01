package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/warden-protocol/wardenprotocol/x/treasury/types"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

// nolint:stylecheck,st1003
// revive:disable-next-line var-naming
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
