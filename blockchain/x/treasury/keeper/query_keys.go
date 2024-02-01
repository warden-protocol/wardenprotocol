package keeper

import (
	"context"

	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/query"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"

	"github.com/warden-protocol/wardenprotocol/x/treasury/types"
)

func (k Keeper) Keys(goCtx context.Context, req *types.QueryKeysRequest) (*types.QueryKeysResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(goCtx)

	store := ctx.KVStore(k.storeKey)
	keyStore := prefix.NewStore(store, types.KeyPrefix(types.KeyKey))

	keys, page, err := query.GenericFilteredPaginate(k.cdc, keyStore, req.Pagination, func(key []byte, value *types.Key) (*types.KeyResponse, error) {
		if req.SpaceAddr != "" && value.SpaceAddr != req.SpaceAddr {
			return nil, nil
		}

		if req.KeyId > 0 && value.Id != req.KeyId {
			return nil, nil
		}

		response := &types.KeyResponse{
			Key: value,
		}

		// create addresses for all wallets that require an ECDSA key
		if value.Type == types.KeyType_KEY_TYPE_ECDSA_SECP256K1 {
			var wTypesECDSA []types.WalletType
			// all wallet types for ECDSA keys
			switch req.Type {
			case types.WalletType_WALLET_TYPE_ETH:
				wTypesECDSA = []types.WalletType{types.WalletType_WALLET_TYPE_ETH}
			case types.WalletType_WALLET_TYPE_CELESTIA:
				wTypesECDSA = []types.WalletType{types.WalletType_WALLET_TYPE_CELESTIA}
			case types.WalletType_WALLET_TYPE_UNSPECIFIED:
				wTypesECDSA = []types.WalletType{types.WalletType_WALLET_TYPE_ETH, types.WalletType_WALLET_TYPE_CELESTIA}
			}

			for _, wType := range wTypesECDSA {
				var (
					address    string
					err        error
					walletType types.WalletType
				)

				switch wType {
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
		}

		// create addresses for all wallets that require an EdDSA key
		if value.Type == types.KeyType_KEY_TYPE_EDDSA_ED25519 && (req.Type == types.WalletType_WALLET_TYPE_SUI || req.Type == types.WalletType_WALLET_TYPE_UNSPECIFIED) {
			var wTypesEdDSA []types.WalletType
			// all wallet types for EdDSA keys
			switch req.Type {
			case types.WalletType_WALLET_TYPE_SUI:
				wTypesEdDSA = []types.WalletType{types.WalletType_WALLET_TYPE_SUI}
			case types.WalletType_WALLET_TYPE_UNSPECIFIED:
				wTypesEdDSA = []types.WalletType{types.WalletType_WALLET_TYPE_SUI}
			}

			for _, wType := range wTypesEdDSA {
				var (
					address    string
					err        error
					walletType types.WalletType
				)

				if wType == types.WalletType_WALLET_TYPE_SUI {
					address, err = types.SuiAddress(value)
					walletType = types.WalletType_WALLET_TYPE_SUI
				}
				// uncomment when we add more eddsa keys
				// switch wType {
				// case types.WalletType_WALLET_TYPE_SUI:
				// 	address, err = types.SuiAddress(value)
				// 	walletType = types.WalletType_WALLET_TYPE_SUI
				// }
				if err != nil {
					return nil, err
				}
				response.Wallets = append(response.Wallets, &types.WalletKeyResponse{
					Address: address,
					Type:    walletType,
				})
			}
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
