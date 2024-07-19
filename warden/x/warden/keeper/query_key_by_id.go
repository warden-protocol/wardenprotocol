package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"

	types "github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta3"
)

func (k Keeper) KeyById(goCtx context.Context, req *types.QueryKeyByIdRequest) (*types.QueryKeyResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(goCtx)

	key, err := k.KeysKeeper.Get(ctx, req.Id)
	if err != nil {
		return nil, err
	}

	return &types.QueryKeyResponse{
		Key:       key,
		Addresses: key.DeriveAddresses(ctx, req.DeriveAddresses),
	}, nil
}
