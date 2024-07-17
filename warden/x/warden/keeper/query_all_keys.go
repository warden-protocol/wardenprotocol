package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/query"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"

	types "github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta3"
)

func (k Keeper) AllKeys(goCtx context.Context, req *types.QueryAllKeysRequest) (*types.QueryKeysResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(goCtx)

	keys, page, err := query.CollectionPaginate(ctx, k.KeysKeeper.Coll(), req.Pagination, func(key uint64, value types.Key) (types.QueryKeyResponse, error) {
		response := types.QueryKeyResponse{
			Key:       value,
			Addresses: value.DeriveAddresses(ctx, req.DeriveAddresses),
		}
		return response, nil
	})

	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryKeysResponse{
		Keys:       keys,
		Pagination: page,
	}, nil
}
