package keeper

import (
	"context"

	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"

	types "github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta3"
)

func (k Keeper) KeychainById(goCtx context.Context, req *types.QueryKeychainByIdRequest) (*types.QueryKeychainByIdResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	keychain, err := k.keychains.Get(goCtx, req.Id)
	if err != nil {
		return nil, err
	}

	return &types.QueryKeychainByIdResponse{
		Keychain: &keychain,
	}, nil
}
