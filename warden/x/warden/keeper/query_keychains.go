package keeper

import (
	"context"

	"github.com/cosmos/cosmos-sdk/types/query"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"

	types "github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta3"
)

func (k Keeper) Keychains(goCtx context.Context, req *types.QueryKeychainsRequest) (*types.QueryKeychainsResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	keychains, pageRes, err := query.CollectionPaginate(goCtx, k.keychains, req.Pagination, func(id uint64, value types.Keychain) (types.Keychain, error) {
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
