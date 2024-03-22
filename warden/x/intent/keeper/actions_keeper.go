package keeper

import (
	"fmt"

	"cosmossdk.io/collections"
	"cosmossdk.io/core/store"
	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/warden-protocol/wardenprotocol/warden/repo"

	"github.com/warden-protocol/wardenprotocol/warden/x/intent/types"
)

type ActionKeeper struct {
	actions repo.SeqCollection[types.Action]
}

func newActionKeeper(storeService store.KVStoreService, cdc codec.BinaryCodec) ActionKeeper {
	sb := collections.NewSchemaBuilder(storeService)

	actionsStore := collections.NewMap(sb, ActionPrefix, "action", collections.Uint64Key, codec.CollValue[types.Action](cdc))
	actionsCount := collections.NewSequence(sb, types.KeyPrefix(types.ActionCountKey), "actions_count")
	actions := repo.NewSeqCollection(actionsCount, actionsStore, func(a *types.Action, u uint64) { a.Id = u })

	_, err := sb.Build()
	if err != nil {
		panic(fmt.Sprintf("failed to build schema: %s", err))
	}

	return ActionKeeper{
		actions: actions,
	}
}

func (k ActionKeeper) Get(ctx sdk.Context, id uint64) (types.Action, error) {
	return k.actions.Get(ctx, id)
}

func (k ActionKeeper) Set(ctx sdk.Context, action types.Action) error {
	return k.actions.Set(ctx, action.Id, action)
}

func (k ActionKeeper) New(ctx sdk.Context, action *types.Action) (uint64, error) {
	return k.actions.Append(ctx, action)
}

func (k ActionKeeper) Coll() repo.SeqCollection[types.Action] {
	return k.actions
}
