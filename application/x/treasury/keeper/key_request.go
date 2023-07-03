package keeper

import (
	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"gitlab.qredo.com/qrdochain/fusionchain/x/treasury/types"
)

func (k Keeper) GetKeyRequestsCount(ctx sdk.Context) uint64 {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte{})
	byteKey := types.KeyPrefix(types.KeyRequestCountKey)
	bz := store.Get(byteKey)
	if bz == nil {
		return 0
	}
	return sdk.BigEndianToUint64(bz)
}

func (k Keeper) SetKeyRequestsCount(ctx sdk.Context, c uint64) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte{})
	byteKey := types.KeyPrefix(types.KeyRequestCountKey)
	bz := sdk.Uint64ToBigEndian(c)
	store.Set(byteKey, bz)
}

func (k Keeper) GetKeyRequest(ctx sdk.Context, id uint64) (types.KeyRequest, bool) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.KeyRequestKey))
	byteKey := sdk.Uint64ToBigEndian(id)
	bz := store.Get(byteKey)
	if bz == nil {
		return types.KeyRequest{}, false
	}
	var keyReq types.KeyRequest
	k.cdc.MustUnmarshal(bz, &keyReq)
	return keyReq, true
}

func (k Keeper) AppendKeyRequest(ctx sdk.Context, keyReq types.KeyRequest) uint64 {
	count := k.GetKeyRequestsCount(ctx)
	keyReq.Id = count
	k.SetKeyRequest(ctx, keyReq)
	k.SetKeyRequestsCount(ctx, count+1)
	return count
}

func (k Keeper) SetKeyRequest(ctx sdk.Context, keyReq types.KeyRequest) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.KeyRequestKey))
	newValue := k.cdc.MustMarshal(&keyReq)
	idBytes := sdk.Uint64ToBigEndian(keyReq.Id)
	store.Set(idBytes, newValue)
}
