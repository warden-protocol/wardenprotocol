package keeper

import (
	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"gitlab.qredo.com/qrdochain/fusionchain/x/treasury/types"
)

func (k Keeper) GetWalletCount(ctx sdk.Context) uint64 {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte{})
	byteKey := types.KeyPrefix(types.WalletCountKey)
	bz := store.Get(byteKey)
	if bz == nil {
		return 0
	}
	return sdk.BigEndianToUint64(bz)
}

func (k Keeper) SetWalletCount(ctx sdk.Context, c uint64) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte{})
	byteKey := types.KeyPrefix(types.WalletCountKey)
	bz := sdk.Uint64ToBigEndian(c)
	store.Set(byteKey, bz)
}

func (k Keeper) GetWallet(ctx sdk.Context, id uint64) (types.Wallet, bool) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.WalletKey))
	byteKey := sdk.Uint64ToBigEndian(id)
	bz := store.Get(byteKey)
	if bz == nil {
		return types.Wallet{}, false
	}
	var wallet types.Wallet
	k.cdc.MustUnmarshal(bz, &wallet)
	return wallet, true
}

func (k Keeper) AppendWallet(ctx sdk.Context, wallet types.Wallet) uint64 {
	count := k.GetWalletCount(ctx)
	wallet.Id = count
	k.SetWallet(ctx, wallet)
	k.SetWalletCount(ctx, count+1)
	return count
}

func (k Keeper) SetWallet(ctx sdk.Context, wallet types.Wallet) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.WalletKey))
	newValue := k.cdc.MustMarshal(&wallet)
	idBytes := sdk.Uint64ToBigEndian(wallet.Id)
	store.Set(idBytes, newValue)
}
