package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/query"
	"github.com/warden-protocol/wardenprotocol/warden/x/warden/types"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k Keeper) SignTransactionRequests(goCtx context.Context, req *types.QuerySignTransactionRequestsRequest) (*types.QuerySignTransactionRequestsResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(goCtx)

	signRequests, pageRes, err := query.CollectionFilteredPaginate(ctx, k.signTransactionRequests, req.Pagination, func(key uint64, value types.SignTransactionRequest) (bool, error) {
		if req.KeyId > 0 && value.KeyId != req.KeyId {
			return false, nil
		}

		_, err := k.keys.Get(ctx, value.KeyId)
		if err != nil {
			return false, err
		}

		sigRequest, err := k.signatureRequests.Get(ctx, value.SignRequestId)
		if err != nil {
			return false, err
		}

		if req.Status != types.SignRequestStatus_SIGN_REQUEST_STATUS_UNSPECIFIED && sigRequest.Status != req.Status {
			return false, nil
		}

		return true, nil
	}, func(key uint64, value types.SignTransactionRequest) (*types.SignTransactionRequestResponse, error) {
		sigRequest, err := k.signatureRequests.Get(ctx, value.SignRequestId)
		if err != nil {
			return nil, err
		}

		return &types.SignTransactionRequestResponse{
			SignTransactionRequest: &value,
			SignRequest:            &sigRequest,
		}, nil
	})

	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QuerySignTransactionRequestsResponse{
		SignTransactionRequests: signRequests,
		Pagination:              pageRes,
	}, nil
}
