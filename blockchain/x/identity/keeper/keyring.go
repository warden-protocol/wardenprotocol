package keeper

import (
	"crypto/sha256"
	"encoding/binary"

	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/qredo/fusionchain/x/identity/types"
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

func (k Keeper) GetKeyring(ctx sdk.Context, addr string) *types.Keyring {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.KeyringKey))
	bz := store.Get([]byte(addr))
	if bz == nil {
		return nil
	}
	var keyring types.Keyring
	k.cdc.MustUnmarshal(bz, &keyring)
	return &keyring
}

func (k Keeper) CreateKeyring(ctx sdk.Context, keyring *types.Keyring) string {
	count := k.GetKeyringCount(ctx)
	buf := make([]byte, 8)
	binary.LittleEndian.PutUint64(buf, count)
	addrHash := sha256.Sum256(buf)
	keyring.Address = sdk.MustBech32ifyAddressBytes("qredokeyring", sdk.AccAddress(addrHash[16:24]))
	k.SetKeyring(ctx, keyring)
	k.SetKeyringCount(ctx, count+1)
	return keyring.Address
}

func (k Keeper) SetKeyring(ctx sdk.Context, keyring *types.Keyring) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.KeyringKey))
	newValue := k.cdc.MustMarshal(keyring)
	store.Set([]byte(keyring.Address), newValue)
}
