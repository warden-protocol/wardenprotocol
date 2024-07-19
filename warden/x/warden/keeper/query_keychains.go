package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/query"
	types "github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta3"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k Keeper) Keychains(goCtx context.Context, req *types.QueryKeychainsRequest) (*types.QueryKeychainsResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(goCtx)

	keychains, pageRes, err := query.CollectionPaginate(ctx, k.keychains, req.Pagination, func(id uint64, value types.Keychain) (types.Keychain, error) {
		return value, nil
	})

	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryKeychainsResponse{
		Pagination: pageRes,
		Keychains:  keychains,
	}, nil
}
