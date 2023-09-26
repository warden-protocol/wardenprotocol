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

func (k Keeper) Policies(goCtx context.Context, req *types.QueryPoliciesRequest) (*types.QueryPoliciesResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(goCtx)

	policies := make([]types.PolicyResponse, 0, query.DefaultLimit)
	store := ctx.KVStore(k.storeKey)
	policiesStore := prefix.NewStore(store, types.KeyPrefix(types.PolicyKey))

	pageRes, err := query.Paginate(policiesStore, req.Pagination, func(key []byte, value []byte) error {
		var policyPb types.Policy
		if err := k.cdc.Unmarshal(value, &policyPb); err != nil {
			return err
		}

		res, err := types.NewPolicyResponse(k.cdc, &policyPb)
		if err != nil {
			return err
		}

		policies = append(policies, *res)
		return nil
	})

	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryPoliciesResponse{
		Policies:   policies,
		Pagination: pageRes,
	}, nil
}
