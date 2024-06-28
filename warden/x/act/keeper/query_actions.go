package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/query"
	types "github.com/warden-protocol/wardenprotocol/warden/x/act/types/v1beta1"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k Keeper) Actions(goCtx context.Context, req *types.QueryActionsRequest) (*types.QueryActionsResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(goCtx)

	actions, pageRes, err := query.CollectionPaginate(ctx, k.ActionKeeper.Coll(), req.Pagination, func(key uint64, action types.Action) (types.Action, error) {
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
