package keeper

import (
	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"gitlab.qredo.com/qrdochain/fusionchain/x/treasury/types"
)

func (k Keeper) GetSignedPayloadCount(ctx sdk.Context) uint64 {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte{})
	byteKey := types.KeyPrefix(types.SignedPayloadCountKey)
	bz := store.Get(byteKey)
	if bz == nil {
		return 0
	}
	return sdk.BigEndianToUint64(bz)
}

func (k Keeper) SetSignedPayloadCount(ctx sdk.Context, c uint64) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte{})
	byteKey := types.KeyPrefix(types.SignedPayloadCountKey)
	bz := sdk.Uint64ToBigEndian(c)
	store.Set(byteKey, bz)
}

func (k Keeper) GetSignedPayload(ctx sdk.Context, id uint64) (types.SignedPayload, bool) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.SignedPayloadKey))
	byteKey := sdk.Uint64ToBigEndian(id)
	bz := store.Get(byteKey)
	if bz == nil {
		return types.SignedPayload{}, false
	}
	var signReq types.SignedPayload
	k.cdc.MustUnmarshal(bz, &signReq)
	return signReq, true
}

func (k Keeper) AppendSignedPayload(ctx sdk.Context, signReq types.SignedPayload) uint64 {
	count := k.GetSignedPayloadCount(ctx)
	signReq.Id = count
	k.SetSignedPayload(ctx, signReq)
	k.SetSignedPayloadCount(ctx, count+1)
	return count
}

func (k Keeper) SetSignedPayload(ctx sdk.Context, signReq types.SignedPayload) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.SignedPayloadKey))
	newValue := k.cdc.MustMarshal(&signReq)
	idBytes := sdk.Uint64ToBigEndian(signReq.Id)
	store.Set(idBytes, newValue)
}
