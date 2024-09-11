package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/query"
	types "github.com/warden-protocol/wardenprotocol/warden/x/act/types/v1beta1"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k Keeper) Rules(goCtx context.Context, req *types.QueryRulesRequest) (*types.QueryRulesResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(goCtx)

	rules, pageRes, err := query.CollectionFilteredPaginate(
		ctx,
		k.rules,
		req.Pagination,
		func(key uint64, value types.Rule) (bool, error) {
			return req.Creator == "" || value.Creator == req.Creator, nil
		},
		func(key uint64, value types.Rule) (types.Rule, error) {
			return value, nil
		})

	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryRulesResponse{
		Rules:      rules,
		Pagination: pageRes,
	}, nil
}
