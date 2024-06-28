package keeper

import (
	"context"

	"cosmossdk.io/collections"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/query"
	types "github.com/warden-protocol/wardenprotocol/warden/x/act/types/v1beta1"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k Keeper) ActionsByAddress(goCtx context.Context, req *types.QueryActionsByAddressRequest) (*types.QueryActionsByAddressResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(goCtx)

	addr, err := sdk.AccAddressFromBech32(req.Address)
	if err != nil {
		return nil, status.Error(codes.InvalidArgument, "invalid address")
	}

	actions, pageRes, err := query.CollectionPaginate(
		ctx, k.ActionKeeper.ActionsByAddress(), req.Pagination,
		func(key collections.Pair[sdk.AccAddress, uint64], value uint64) (types.Action, error) {
			return k.ActionKeeper.Get(ctx, value)
		},
		query.WithCollectionPaginationPairPrefix[sdk.AccAddress, uint64](addr),
	)
	if err != nil {
		return nil, err
	}

	var result []types.Action
	for _, action := range actions {
		if req.Status != types.ActionStatus_ACTION_STATUS_UNSPECIFIED && action.Status != req.Status {
			continue
		}
		result = append(result, action)
	}

	return &types.QueryActionsByAddressResponse{
		Actions:    result,
		Pagination: pageRes,
	}, nil
}
