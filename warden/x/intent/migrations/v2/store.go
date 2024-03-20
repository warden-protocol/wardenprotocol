package v2

import (
	"fmt"

	"cosmossdk.io/collections"
	"cosmossdk.io/core/store"
	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/warden-protocol/wardenprotocol/warden/repo"
	"github.com/warden-protocol/wardenprotocol/warden/x/intent/types"
)

var (
	ActionPrefix = collections.NewPrefix(0)
	IntentPrefix = collections.NewPrefix(1)
)

func MigrateStore(ctx sdk.Context, storeService store.KVStoreService, cdc codec.BinaryCodec) error {
	sb := collections.NewSchemaBuilder(storeService)
	actionsStore := collections.NewMap(sb, ActionPrefix, "action", collections.Uint64Key, codec.CollValue[types.Action](cdc))
	actionsCount := collections.NewSequence(sb, types.KeyPrefix(types.ActionCountKey), "actions count")
	actions := repo.NewSeqCollection(actionsCount, actionsStore, func(a *types.Action, u uint64) { a.Id = u })

	intentsStore := collections.NewMap(sb, IntentPrefix, "intent", collections.Uint64Key, codec.CollValue[types.Intent](cdc))
	intentsCount := collections.NewSequence(sb, types.KeyPrefix(types.IntentCountKey), "intents count")
	intents := repo.NewSeqCollection(intentsCount, intentsStore, func(i *types.Intent, u uint64) { i.Id = u })

	// delete all intents
	intentsIter, err := intents.Iterate(ctx, nil)
	if err != nil {
		return err
	}
	defer intentsIter.Close()

	intentsKeys, err := intentsIter.Keys()
	if err != nil {
		return fmt.Errorf("failed to get intents keys: %w", err)
	}

	for _, key := range intentsKeys {
		err := intents.Remove(ctx, key)
		if err != nil {
			return fmt.Errorf("failed to remove intent: %w", err)
		}
	}

	if err := intentsCount.Set(ctx, 1); err != nil {
		return fmt.Errorf("failed to set intents count: %w", err)
	}

	// if an action was referring an intent, mark it as failed
	actionsIter, err := actions.Iterate(ctx, nil)
	if err != nil {
		return err
	}
	defer actionsIter.Close()

	for ; actionsIter.Valid(); actionsIter.Next() {
		action, err := actionsIter.Value()
		if err != nil {
			return fmt.Errorf("failed to get action: %w", err)
		}

		clearAction(&action)

		err = actions.Set(ctx, action.Id, action)
		if err != nil {
			return fmt.Errorf("failed to set action: %w", err)
		}
	}

	return nil
}

func clearAction(act *types.Action) {
	act.Msg = nil
	act.IntentId = 0
	if act.Status == types.ActionStatus_ACTION_STATUS_PENDING {
		act.Status = types.ActionStatus_ACTION_STATUS_TIMEOUT
	}
}
