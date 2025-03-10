package keeper

import (
	"context"

	"github.com/cosmos/cosmos-sdk/types/query"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"

	types "github.com/warden-protocol/wardenprotocol/warden/x/act/types/v1beta1"
)

func (k Keeper) Actions(goCtx context.Context, req *types.QueryActionsRequest) (*types.QueryActionsResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	actions, pageRes, err := query.CollectionPaginate(goCtx, k.ActionKeeper.Coll(), req.Pagination, func(key uint64, action types.Action) (types.Action, error) {
		return action, nil
	})
	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryActionsResponse{
		Actions:    actions,
		Pagination: pageRes,
	}, nil
}
