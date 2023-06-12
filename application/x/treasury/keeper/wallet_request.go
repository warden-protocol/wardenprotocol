package keeper

import (
	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"gitlab.qredo.com/qrdochain/fusionchain/x/treasury/types"
)

func (k Keeper) GetWalletRequestsCount(ctx sdk.Context) uint64 {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte{})
	byteKey := types.KeyPrefix(types.WalletRequestCountKey)
	bz := store.Get(byteKey)
	if bz == nil {
		return 0
	}
	return sdk.BigEndianToUint64(bz)
}

func (k Keeper) SetWalletRequestsCount(ctx sdk.Context, c uint64) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte{})
	byteKey := types.KeyPrefix(types.WalletRequestCountKey)
	bz := sdk.Uint64ToBigEndian(c)
	store.Set(byteKey, bz)
}

func (k Keeper) GetWalletRequest(ctx sdk.Context, id uint64) (types.WalletRequest, bool) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.WalletRequestKey))
	byteKey := sdk.Uint64ToBigEndian(id)
	bz := store.Get(byteKey)
	if bz == nil {
		return types.WalletRequest{}, false
	}
	var walletReq types.WalletRequest
	k.cdc.MustUnmarshal(bz, &walletReq)
	return walletReq, true
}

func (k Keeper) AppendWalletRequest(ctx sdk.Context, walletReq types.WalletRequest) uint64 {
	count := k.GetWalletRequestsCount(ctx)
	walletReq.Id = count
	k.SetWalletRequest(ctx, walletReq)
	k.SetWalletRequestsCount(ctx, count+1)
	return count
}

func (k Keeper) SetWalletRequest(ctx sdk.Context, walletReq types.WalletRequest) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.WalletRequestKey))
	newValue := k.cdc.MustMarshal(&walletReq)
	idBytes := sdk.Uint64ToBigEndian(walletReq.Id)
	store.Set(idBytes, newValue)
}
