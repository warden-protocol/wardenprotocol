package keeper

import (
	"context"

	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/query"
	"github.com/qredo/fusionchain/x/identity/types"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k Keeper) Keyrings(goCtx context.Context, req *types.QueryKeyringsRequest) (*types.QueryKeyringsResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(goCtx)

	keyrings := make([]types.Keyring, 0, query.DefaultLimit)
	store := ctx.KVStore(k.storeKey)
	keyringsStore := prefix.NewStore(store, types.KeyPrefix(types.KeyringKey))

	pageRes, err := query.Paginate(keyringsStore, req.Pagination, func(key []byte, value []byte) error {
		var keyring types.Keyring
		if err := k.cdc.Unmarshal(value, &keyring); err != nil {
			return err
		}

		keyrings = append(keyrings, keyring)
		return nil
	})

	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryKeyringsResponse{
		Pagination: pageRes,
		Keyrings:   keyrings,
	}, nil
}

// (optional: get Keyring based on the status)
