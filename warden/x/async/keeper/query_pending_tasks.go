package keeper

import (
	"context"

	"github.com/cosmos/cosmos-sdk/types/query"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"

	types "github.com/warden-protocol/wardenprotocol/warden/x/async/types/v1beta1"
)

func (k Keeper) PendingTasks(ctx context.Context, req *types.QueryPendingTasksRequest) (*types.QueryPendingTasksResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	tasks, pageRes, err := query.CollectionFilteredPaginate(ctx, k.tasks.Tasks(), req.Pagination, func(key uint64, value types.Task) (bool, error) {
		hasResult, err := k.tasks.HasResult(ctx, value.Id)
		if err != nil {
			return false, err
		}

		return !hasResult, nil
	}, func(key uint64, value types.Task) (types.Task, error) {
		return value, nil
	})
	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryPendingTasksResponse{
		Pagination: pageRes,
		Tasks:      tasks,
	}, nil
}
