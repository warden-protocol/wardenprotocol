package keeper

import (
	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"gitlab.qredo.com/qrdochain/fusionchain/x/identity/types"
)

func (k Keeper) GetKeyringCount(ctx sdk.Context) uint64 {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte{})
	byteKey := types.KeyPrefix(types.KeyringCountKey)
	bz := store.Get(byteKey)
	if bz == nil {
		return 0
	}
	return sdk.BigEndianToUint64(bz)
}

func (k Keeper) SetKeyringCount(ctx sdk.Context, c uint64) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte{})
	byteKey := types.KeyPrefix(types.KeyringCountKey)
	bz := sdk.Uint64ToBigEndian(c)
	store.Set(byteKey, bz)
}

func (k Keeper) GetKeyring(ctx sdk.Context, id uint64) (types.Keyring, bool) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.KeyringKey))
	byteKey := sdk.Uint64ToBigEndian(id)
	bz := store.Get(byteKey)
	if bz == nil {
		return types.Keyring{}, false
	}
	var keyring types.Keyring
	k.cdc.MustUnmarshal(bz, &keyring)
	return keyring, true
}

func (k Keeper) AppendKeyring(ctx sdk.Context, keyring types.Keyring) uint64 {
	count := k.GetKeyringCount(ctx)
	keyring.Id = count
	k.SetKeyring(ctx, keyring)
	k.SetKeyringCount(ctx, count+1)
	return count
}

func (k Keeper) SetKeyring(ctx sdk.Context, keyring types.Keyring) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.KeyringKey))
	newValue := k.cdc.MustMarshal(&keyring)
	store.Set(GetIDBytes(keyring.Id), newValue)
}
