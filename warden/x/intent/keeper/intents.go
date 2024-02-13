package keeper

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/warden-protocol/wardenprotocol/warden/x/intent/types"
)

func (k Keeper) GetIntent(ctx sdk.Context, id uint64) (types.Intent, error) {
	return k.intents.Get(ctx, id)
}
