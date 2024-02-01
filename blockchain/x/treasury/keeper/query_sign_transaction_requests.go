package keeper

import (
	"context"
	"fmt"

	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/query"
	"github.com/warden-protocol/wardenprotocol/x/treasury/types"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k Keeper) SignTransactionRequests(goCtx context.Context, req *types.QuerySignTransactionRequestsRequest) (*types.QuerySignTransactionRequestsResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(goCtx)

	store := ctx.KVStore(k.storeKey)
	signTransactionRequestsStore := prefix.NewStore(store, types.KeyPrefix(types.SignTransactionRequestKey))

	signRequests, pageRes, err := query.GenericFilteredPaginate(k.cdc, signTransactionRequestsStore, req.Pagination, func(keyBz []byte, value *types.SignTransactionRequest) (*types.SignTransactionRequestResponse, error) {
		if req.KeyId > 0 && value.KeyId != req.KeyId {
			return nil, nil
		}

		_, found := k.GetKey(ctx, value.KeyId)
		if !found {
			return nil, fmt.Errorf("key %d not found", value.KeyId)
		}

		sigRequest, found := k.SignatureRequestsRepo().Get(ctx, value.SignRequestId)
		if !found {
			return nil, fmt.Errorf("signature request %d not found", value.SignRequestId)
		}

		if req.Status != types.SignRequestStatus_SIGN_REQUEST_STATUS_UNSPECIFIED && sigRequest.Status != req.Status {
			return nil, nil
		}

		return &types.SignTransactionRequestResponse{
			SignTransactionRequest: value,
			SignRequest:            sigRequest,
		}, nil
	}, func() *types.SignTransactionRequest { return &types.SignTransactionRequest{} })

	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QuerySignTransactionRequestsResponse{
		SignTransactionRequests: signRequests,
		Pagination:              pageRes,
	}, nil
}
