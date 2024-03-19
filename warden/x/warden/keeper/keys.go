package keeper

import (
	sdk "github.com/cosmos/cosmos-sdk/types"

	types "github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta2"
)

func (k Keeper) appendKey(ctx sdk.Context, key types.Key, keyRequest types.KeyRequest) error {
	key.Id = keyRequest.Id
	return k.keys.Set(ctx, key.Id, key)
}
