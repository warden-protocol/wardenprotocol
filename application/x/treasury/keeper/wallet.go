package keeper

import (
	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"gitlab.qredo.com/qrdochain/fusionchain/x/treasury/types"
)

func (k Keeper) GetWalletCount(ctx sdk.Context) uint64 {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte{})
	byteWallet := types.KeyPrefix(types.WalletCountKey)
	bz := store.Get(byteWallet)
	if bz == nil {
		return 0
	}
	return sdk.BigEndianToUint64(bz)
}

func (k Keeper) SetWalletCount(ctx sdk.Context, c uint64) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte{})
	byteWallet := types.KeyPrefix(types.WalletCountKey)
	bz := sdk.Uint64ToBigEndian(c)
	store.Set(byteWallet, bz)
}

func (k Keeper) GetWallet(ctx sdk.Context, id uint64) (types.Wallet, bool) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.WalletKey))
	byteWallet := sdk.Uint64ToBigEndian(id)
	bz := store.Get(byteWallet)
	if bz == nil {
		return types.Wallet{}, false
	}
	var key types.Wallet
	k.cdc.MustUnmarshal(bz, &key)
	return key, true
}

func (k Keeper) AppendWallet(ctx sdk.Context, key *types.Wallet) uint64 {
	count := k.GetWalletCount(ctx)
	key.Id = count
	k.SetWallet(ctx, key)
	k.SetWalletCount(ctx, count+1)
	return count
}

func (k Keeper) SetWallet(ctx sdk.Context, key *types.Wallet) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.WalletKey))
	newValue := k.cdc.MustMarshal(key)
	idBytes := sdk.Uint64ToBigEndian(key.Id)
	store.Set(idBytes, newValue)
}
