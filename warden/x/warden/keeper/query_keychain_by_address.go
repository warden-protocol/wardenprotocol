package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"
	types "github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta3"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k Keeper) KeychainById(goCtx context.Context, req *types.QueryKeychainByIdRequest) (*types.QueryKeychainByIdResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(goCtx)

	keychain, err := k.keychains.Get(ctx, req.Id)
	if err != nil {
		return nil, err
	}

	return &types.QueryKeychainByIdResponse{
		Keychain: &keychain,
	}, nil
}
