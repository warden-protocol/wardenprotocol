package keeper

import (
	"context"
	"errors"

	"cosmossdk.io/collections"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"

	types "github.com/warden-protocol/wardenprotocol/warden/x/sched/types/v1beta1"
)

func (k Keeper) CallbackById(ctx context.Context, req *types.QueryCallbackByIdRequest) (*types.QueryCallbackByIdResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	callback, err := k.callbacks.Get(ctx, req.Id)
	if err != nil {
		return nil, status.Error(codes.NotFound, err.Error())
	}

	var result *types.CallbackResult

	r, err := k.callbacks.GetResult(ctx, req.Id)
	if err == nil {
		result = &r
	} else if !errors.Is(err, collections.ErrNotFound) {
		return nil, err
	}

	return &types.QueryCallbackByIdResponse{
		CallbackResponse: types.CallbackResponse{
			Callback: callback,
			Result:   result,
		},
	}, nil
}
