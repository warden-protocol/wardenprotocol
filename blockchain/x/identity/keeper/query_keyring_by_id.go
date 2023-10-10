package keeper

import (
	"context"
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/qredo/fusionchain/x/identity/types"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k Keeper) KeyringByID(goCtx context.Context, req *types.QueryKeyringByIdRequest) (*types.QueryKeyringByIdResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(goCtx)

	keyring, found := k.KeyringsRepo().Get(ctx, req.Id)
	if !found {
		return nil, fmt.Errorf("keyring %d not found", req.Id)
	}

	return &types.QueryKeyringByIdResponse{
		Keyring: keyring,
	}, nil
}
