package keeper

import (
	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"

	"github.com/warden-protocol/wardenprotocol/x/treasury/types"
)

func (k Keeper) appendKey(ctx sdk.Context, key *types.Key, keyRequest *types.KeyRequest) {
	key.Id = keyRequest.Id

	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.KeyKey))
	newValue := k.cdc.MustMarshal(key)
	store.Set(sdk.Uint64ToBigEndian(key.Id), newValue)
}

func (k Keeper) GetKey(ctx sdk.Context, id uint64) (*types.Key, bool) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.KeyKey))
	b := store.Get(sdk.Uint64ToBigEndian(id))
	if b == nil {
		return nil, false
	}

	var key types.Key
	k.cdc.MustUnmarshal(b, &key)

	return &key, true
}
