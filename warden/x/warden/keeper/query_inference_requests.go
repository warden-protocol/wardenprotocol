package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/query"
	types "github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta3"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k Keeper) InferenceRequests(goCtx context.Context, req *types.QueryInferenceRequestsRequest) (*types.QueryInferenceRequestsResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(goCtx)

	reqs, pageRes, err := query.CollectionPaginate(ctx, k.inferenceRequests, req.Pagination, func(id uint64, req types.InferenceRequest) (types.InferenceRequest, error) {
		return req, nil
	})

	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryInferenceRequestsResponse{
		InferenceRequests: reqs,
		Pagination:        pageRes,
	}, nil
}
