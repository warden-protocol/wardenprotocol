package keeper

import (
	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"gitlab.qredo.com/qrdochain/fusionchain/x/treasury/types"
)

func (k Keeper) GetSignRequestsCount(ctx sdk.Context) uint64 {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte{})
	byteKey := types.KeyPrefix(types.SignRequestCountKey)
	bz := store.Get(byteKey)
	if bz == nil {
		return 0
	}
	return sdk.BigEndianToUint64(bz)
}

func (k Keeper) SetSignRequestsCount(ctx sdk.Context, c uint64) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte{})
	byteKey := types.KeyPrefix(types.SignRequestCountKey)
	bz := sdk.Uint64ToBigEndian(c)
	store.Set(byteKey, bz)
}

func (k Keeper) GetSignRequest(ctx sdk.Context, id uint64) (types.SignRequest, bool) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.SignRequestKey))
	byteKey := sdk.Uint64ToBigEndian(id)
	bz := store.Get(byteKey)
	if bz == nil {
		return types.SignRequest{}, false
	}
	var signReq types.SignRequest
	k.cdc.MustUnmarshal(bz, &signReq)
	return signReq, true
}

func (k Keeper) AppendSignRequest(ctx sdk.Context, signReq types.SignRequest) uint64 {
	count := k.GetSignRequestsCount(ctx)
	signReq.Id = count
	k.SetSignRequest(ctx, signReq)
	k.SetSignRequestsCount(ctx, count+1)
	return count
}

func (k Keeper) SetSignRequest(ctx sdk.Context, signReq types.SignRequest) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.SignRequestKey))
	newValue := k.cdc.MustMarshal(&signReq)
	idBytes := sdk.Uint64ToBigEndian(signReq.Id)
	store.Set(idBytes, newValue)
}
