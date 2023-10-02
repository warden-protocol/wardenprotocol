package keeper

import (
	"context"

	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/query"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"

	"github.com/qredo/fusionchain/x/treasury/types"
)

func (k Keeper) Keys(goCtx context.Context, req *types.QueryKeysRequest) (*types.QueryKeysResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(goCtx)

	store := ctx.KVStore(k.storeKey)
	keyStore := prefix.NewStore(store, types.KeyPrefix(types.KeyKey))

	keys, pageRes, err := query.GenericFilteredPaginate(k.cdc, keyStore, req.Pagination, func(key []byte, value *types.Key) (*types.KeyResponse, error) {
		if value.WorkspaceAddr != "" && value.WorkspaceAddr != req.WorkspaceAddr {
			return nil, nil
		}

		response := &types.KeyResponse{
			Key: value,
		}
		if req.Type != types.WalletType_WALLET_TYPE_UNSPECIFIED {
			var (
				address string
				err     error
			)
			switch req.Type {
			case types.WalletType_WALLET_TYPE_QRDO:
				address, err = types.FusionChainAddress(value)
			case types.WalletType_WALLET_TYPE_ETH, types.WalletType_WALLET_TYPE_ETH_SEPOLIA:
				address, err = types.EthereumAddress(value)
			}
			if err != nil {
				return nil, err
			}
			response.Address = address
		}

		return response, nil
	}, func() *types.Key { return &types.Key{} })
	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryKeysResponse{
		Keys:       keys,
		Pagination: pageRes,
	}, nil
}
