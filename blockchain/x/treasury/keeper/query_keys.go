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

	keys, page, err := query.GenericFilteredPaginate(k.cdc, keyStore, req.Pagination, func(key []byte, value *types.Key) (*types.KeyResponse, error) {
		if req.WorkspaceAddr != "" && value.WorkspaceAddr != req.WorkspaceAddr {
			return nil, nil
		}

		if req.KeyId > 0 && value.Id != req.KeyId {
			return nil, nil
		}

		response := &types.KeyResponse{
			Key: value,
		}

		var wTypes []types.WalletType
		if req.Type != types.WalletType_WALLET_TYPE_UNSPECIFIED {
			wTypes = []types.WalletType{req.Type}
		} else {
			wTypes = []types.WalletType{types.WalletType_WALLET_TYPE_FUSION, types.WalletType_WALLET_TYPE_ETH, types.WalletType_WALLET_TYPE_CELESTIA}
		}
		for _, wType := range wTypes {
			var (
				address    string
				err        error
				walletType types.WalletType
			)
			switch wType {
			case types.WalletType_WALLET_TYPE_FUSION:
				address, err = types.FusionChainAddress(value)
				walletType = types.WalletType_WALLET_TYPE_FUSION
			case types.WalletType_WALLET_TYPE_ETH:
				address, err = types.EthereumAddress(value)
				walletType = types.WalletType_WALLET_TYPE_ETH
			case types.WalletType_WALLET_TYPE_CELESTIA:
				address, err = types.CelestiaAddress(value)
				walletType = types.WalletType_WALLET_TYPE_CELESTIA
			}
			if err != nil {
				return nil, err
			}
			response.Wallets = append(response.Wallets, &types.WalletKeyResponse{
				Address: address,
				Type:    walletType,
			})
		}

		return response, nil
	}, func() *types.Key { return &types.Key{} })

	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryKeysResponse{
		Keys:       keys,
		Pagination: page,
	}, nil
}
