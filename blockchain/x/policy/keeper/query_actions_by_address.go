package keeper

import (
	"context"

	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/query"
	"github.com/qredo/fusionchain/x/policy/types"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k Keeper) ActionsByAddress(goCtx context.Context, req *types.QueryActionsByAddressRequest) (*types.QueryActionsByAddressResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(goCtx)

	store := ctx.KVStore(k.storeKey)
	actionsStore := prefix.NewStore(store, types.KeyPrefix(types.ActionKey))

	// This query is vastly inefficient as it loads all actions, loads all
	// policies linked to them, and checks if the requested address is a
	// participant in each policy.

	actions, pageRes, err := query.GenericFilteredPaginate(k.cdc, actionsStore, req.Pagination, func(key []byte, value *types.Action) (*types.Action, error) {
		if req.Status != types.ActionStatus_ACTION_STATUS_UNSPECIFIED && value.Status != req.Status {
			return nil, nil
		}

		pol, err := PolicyForAction(ctx, &k, value)
		if err != nil {
			return nil, err
		}

		if _, err := pol.AddressToParticipant(req.Address); err != nil {
			// address is not a participant in this policy
			return nil, nil
		}

		return value, nil
	}, func() *types.Action { return &types.Action{} })

	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryActionsByAddressResponse{
		Actions:    actions,
		Pagination: pageRes,
	}, nil
}
