package keeper

import (
	"context"
	"fmt"

	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/query"
	"github.com/qredo/fusionchain/x/treasury/types"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k Keeper) Wallets(goCtx context.Context, req *types.QueryWalletsRequest) (*types.QueryWalletsResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(goCtx)

	store := ctx.KVStore(k.storeKey)
	workspaceStore := prefix.NewStore(store, types.KeyPrefix(types.WalletKey))

	wallets, pageRes, err := query.GenericFilteredPaginate(k.cdc, workspaceStore, req.Pagination, func(storeKey []byte, value *types.Wallet) (*types.WalletResponse, error) {
		if req.KeyId > 0 && value.KeyId != req.KeyId {
			return nil, nil
		}

		key, found := k.KeysRepo().Get(ctx, value.KeyId)
		if !found {
			return nil, fmt.Errorf("key %d not found", value.KeyId)
		}

		w, err := types.NewWalletI(value, key)
		if err != nil {
			return nil, err
		}

		return &types.WalletResponse{
			Wallet:  value,
			Address: w.Address(),
		}, nil
	}, func() *types.Wallet { return &types.Wallet{} })

	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryWalletsResponse{
		Wallets:    wallets,
		Pagination: pageRes,
	}, nil
}
