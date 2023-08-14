package keeper

import (
	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"gitlab.qredo.com/qrdochain/fusionchain/x/identity/types"
)

func (k Keeper) GetActionCount(ctx sdk.Context) uint64 {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte{})
	byteKey := types.KeyPrefix(types.ActionCountKey)
	bz := store.Get(byteKey)
	if bz == nil {
		return 0
	}
	return sdk.BigEndianToUint64(bz)
}

func (k Keeper) SetActionCount(ctx sdk.Context, c uint64) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte{})
	byteKey := types.KeyPrefix(types.ActionCountKey)
	bz := sdk.Uint64ToBigEndian(c)
	store.Set(byteKey, bz)
}

func (k Keeper) GetAction(ctx sdk.Context, actionType string, id uint64) (types.Action, bool) {
	store := k.actionStore(ctx, actionType)
	byteKey := sdk.Uint64ToBigEndian(id)
	bz := store.Get(byteKey)
	if bz == nil {
		return types.Action{}, false
	}
	var action types.Action
	k.cdc.MustUnmarshal(bz, &action)
	return action, true
}

func (k Keeper) AppendAction(ctx sdk.Context, act *types.Action) uint64 {
	count := k.GetActionCount(ctx)
	act.Id = count
	k.SetAction(ctx, act)
	k.SetActionCount(ctx, count+1)
	return count
}

func (k Keeper) SetAction(ctx sdk.Context, action *types.Action) {
	store := k.actionStore(ctx, action.Msg.TypeUrl)
	newValue := k.cdc.MustMarshal(action)
	store.Set(sdk.Uint64ToBigEndian(action.Id), newValue)
}

func (k Keeper) actionStore(ctx sdk.Context, actionType string) prefix.Store {
	actionStore := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.ActionKey))
	store := prefix.NewStore(actionStore, types.KeyPrefix(actionType+"/"))
	return store
}
