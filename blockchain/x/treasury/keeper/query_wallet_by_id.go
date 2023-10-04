package keeper

import (
	"context"
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"

	"github.com/qredo/fusionchain/x/treasury/types"
)

// nolint:stylecheck,st1003
// revive:disable-next-line var-naming
func (k Keeper) WalletById(goCtx context.Context, req *types.QueryWalletByIdRequest) (*types.QueryWalletByIdResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(goCtx)

	wallet, found := k.WalletsRepo().Get(ctx, req.Id)
	if !found {
		return nil, status.Error(codes.NotFound, "not found")
	}

	key, found := k.GetKey(ctx, wallet.KeyId)
	if !found {
		return nil, fmt.Errorf("key %d not found", wallet.KeyId)
	}

	w, err := types.NewWalletI(wallet, key)
	if err != nil {
		return nil, err
	}

	return &types.QueryWalletByIdResponse{
		Wallet: &types.WalletResponse{
			Wallet:  wallet,
			Address: w.Address(),
		},
	}, nil
}
