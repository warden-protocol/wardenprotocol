package keeper

import (
	"context"

	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/query"
	"github.com/qredo/fusionchain/x/identity/types"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k Keeper) Actions(goCtx context.Context, req *types.QueryActionsRequest) (*types.QueryActionsResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(goCtx)

	actions := make([]types.Action, 0, query.DefaultLimit)
	store := ctx.KVStore(k.storeKey)
	actionsStore := prefix.NewStore(store, types.KeyPrefix(types.ActionKey))

	pageRes, err := query.Paginate(actionsStore, req.Pagination, func(key []byte, value []byte) error {
		var action types.Action
		if err := k.cdc.Unmarshal(value, &action); err != nil {
			return err
		}

		actions = append(actions, action)
		return nil
	})

	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryActionsResponse{
		Actions:    actions,
		Pagination: pageRes,
	}, nil
}
