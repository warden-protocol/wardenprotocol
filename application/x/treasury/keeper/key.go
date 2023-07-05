package keeper

import (
	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"gitlab.qredo.com/qrdochain/fusionchain/x/treasury/types"
)

func (k Keeper) GetKeyCount(ctx sdk.Context) uint64 {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte{})
	byteKey := types.KeyPrefix(types.KeyCountKey)
	bz := store.Get(byteKey)
	if bz == nil {
		return 0
	}
	return sdk.BigEndianToUint64(bz)
}

func (k Keeper) SetKeyCount(ctx sdk.Context, c uint64) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte{})
	byteKey := types.KeyPrefix(types.KeyCountKey)
	bz := sdk.Uint64ToBigEndian(c)
	store.Set(byteKey, bz)
}

func (k Keeper) GetKey(ctx sdk.Context, id uint64) (types.Key, bool) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.KeyKey))
	byteKey := sdk.Uint64ToBigEndian(id)
	bz := store.Get(byteKey)
	if bz == nil {
		return types.Key{}, false
	}
	var key types.Key
	k.cdc.MustUnmarshal(bz, &key)
	return key, true
}

func (k Keeper) AppendKey(ctx sdk.Context, key types.Key) uint64 {
	count := k.GetKeyCount(ctx)
	key.Id = count
	k.SetKey(ctx, key)
	k.SetKeyCount(ctx, count+1)
	return count
}

func (k Keeper) SetKey(ctx sdk.Context, key types.Key) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.KeyKey))
	newValue := k.cdc.MustMarshal(&key)
	idBytes := sdk.Uint64ToBigEndian(key.Id)
	store.Set(idBytes, newValue)
}
