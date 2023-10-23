package keeper

import (
	"context"
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/qredo/fusionchain/x/identity/types"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k Keeper) KeyringByAddress(goCtx context.Context, req *types.QueryKeyringByAddressRequest) (*types.QueryKeyringByAddressResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(goCtx)

	keyring := k.GetKeyring(ctx, req.Address)
	if keyring == nil {
		return nil, fmt.Errorf("keyring %s not found", req.Address)
	}

	return &types.QueryKeyringByAddressResponse{
		Keyring: keyring,
	}, nil
}
