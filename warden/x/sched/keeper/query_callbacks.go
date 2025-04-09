package keeper

import (
	"context"
	"errors"

	"cosmossdk.io/collections"
	"github.com/cosmos/cosmos-sdk/types/query"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"

	types "github.com/warden-protocol/wardenprotocol/warden/x/sched/types/v1beta1"
)

func (k Keeper) Callbacks(ctx context.Context, req *types.QueryCallbacksRequest) (*types.QueryCallbacksResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	callbacks, pageRes, err := query.CollectionPaginate(ctx, k.callbacks.Callbacks(), req.Pagination, func(key uint64, value types.Callback) (types.CallbackResponse, error) {
		var result *types.CallbackResult

		r, err := k.callbacks.GetResult(ctx, value.Id)
		if err == nil {
			result = &r
		} else if !errors.Is(err, collections.ErrNotFound) {
			return types.CallbackResponse{}, err
		}

		return types.CallbackResponse{
			Callback: value,
			Result:   result,
		}, nil
	})
	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryCallbacksResponse{
		Pagination: pageRes,
		Callbacks:  callbacks,
	}, nil
}
