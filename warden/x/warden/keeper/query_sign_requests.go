package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/query"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"

	types "github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta3"
)

func (k Keeper) SignRequests(goCtx context.Context, req *types.QuerySignRequestsRequest) (*types.QuerySignRequestsResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(goCtx)

	signRequests, pageRes, err := query.CollectionFilteredPaginate(ctx, k.signRequests, req.Pagination, func(signRequestID uint64, value types.SignRequest) (bool, error) {
		key, err := k.KeysKeeper.Get(ctx, value.KeyId)
		if err != nil {
			return false, err
		}

		if req.KeychainId > 0 && key.KeychainId != req.KeychainId {
			return false, nil
		}

		if req.Status != types.SignRequestStatus_SIGN_REQUEST_STATUS_UNSPECIFIED && value.Status != req.Status {
			return false, nil
		}

		return true, nil
	}, func(key uint64, value types.SignRequest) (*types.SignRequest, error) { return &value, nil })

	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QuerySignRequestsResponse{
		SignRequests: signRequests,
		Pagination:   pageRes,
	}, nil
}
