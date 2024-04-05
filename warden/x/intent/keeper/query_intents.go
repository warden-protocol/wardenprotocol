package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/query"
	"github.com/warden-protocol/wardenprotocol/warden/x/intent/types"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k Keeper) Intents(goCtx context.Context, req *types.QueryIntentsRequest) (*types.QueryIntentsResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(goCtx)

	intents, pageRes, err := query.CollectionPaginate(ctx, k.intents, req.Pagination, func(key uint64, value types.Intent) (types.Intent, error) {
		return value, nil
	})

	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryIntentsResponse{
		Intents:    intents,
		Pagination: pageRes,
	}, nil
}
