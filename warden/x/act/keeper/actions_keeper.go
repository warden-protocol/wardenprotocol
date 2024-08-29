package keeper

import (
	"context"
	"fmt"
	"github.com/cosmos/cosmos-sdk/types/query"
	"time"

	"cosmossdk.io/collections"
	"cosmossdk.io/core/store"
	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/warden-protocol/wardenprotocol/warden/repo"

	types "github.com/warden-protocol/wardenprotocol/warden/x/act/types/v1beta1"
)

type ActionKeeper struct {
	actions         repo.SeqCollection[types.Action]
	actionByAddress collections.Map[collections.Pair[sdk.AccAddress, uint64], uint64]
}

func newActionKeeper(storeService store.KVStoreService, cdc codec.BinaryCodec) ActionKeeper {
	sb := collections.NewSchemaBuilder(storeService)

	actionsStore := collections.NewMap(sb, ActionPrefix, "action", collections.Uint64Key, codec.CollValue[types.Action](cdc))
	actionsCount := collections.NewSequence(sb, types.KeyPrefix(types.ActionCountKey), "actions_count")
	actions := repo.NewSeqCollection(actionsCount, actionsStore, func(a *types.Action, u uint64) { a.Id = u })

	actionByAddress := collections.NewMap(
		sb, ActionByAddressPrefix, "action_by_address",
		collections.PairKeyCodec(sdk.AccAddressKey, collections.Uint64Key),
		collections.Uint64Value,
	)

	_, err := sb.Build()
	if err != nil {
		panic(fmt.Sprintf("failed to build schema: %s", err))
	}

	return ActionKeeper{
		actions:         actions,
		actionByAddress: actionByAddress,
	}
}

func (k ActionKeeper) Get(ctx context.Context, id uint64) (types.Action, error) {
	return k.actions.Get(ctx, id)
}

func (k ActionKeeper) Set(ctx context.Context, action types.Action) error {
	return k.actions.Set(ctx, action.Id, action)
}

func (k ActionKeeper) New(ctx context.Context, action *types.Action) (uint64, error) {
	id, err := k.actions.Append(ctx, action)
	if err != nil {
		return 0, err
	}

	err = k.updateMentions(ctx, action, id)
	if err != nil {
		return 0, err
	}

	return id, nil
}

func (k *ActionKeeper) updateMentions(ctx context.Context, action *types.Action, id uint64) error {
	for _, addr := range action.Mentions {
		key := collections.Join(sdk.MustAccAddressFromBech32(addr), id)
		if err := k.actionByAddress.Set(ctx, key, id); err != nil {
			return err
		}
	}
	return nil
}

func (k ActionKeeper) ActionsByAddress() collections.Map[collections.Pair[sdk.AccAddress, uint64], uint64] {
	return k.actionByAddress
}

func (k ActionKeeper) Import(ctx sdk.Context, actions []types.Action) error {
	err := k.Coll().Import(ctx, actions, func(action types.Action) uint64 {
		return action.Id
	})

	if err != nil {
		return err
	}

	for _, action := range actions {
		if err := k.updateMentions(ctx, &action, action.Id); err != nil {
			return err
		}
	}

	return nil
}

func (k ActionKeeper) Coll() repo.SeqCollection[types.Action] {
	return k.actions
}

func (k ActionKeeper) PruneAction(ctx context.Context, action types.Action) error {
	if err := k.actions.Remove(ctx, action.Id); err != nil {
		return err
	}

	for _, addr := range action.Mentions {
		key := collections.Join(sdk.MustAccAddressFromBech32(addr), action.Id)
		if err := k.actionByAddress.Remove(ctx, key); err != nil {
			return err
		}
	}

	return nil
}

func (k ActionKeeper) ExpiredActions(ctx context.Context, statuses map[types.ActionStatus]struct{}, blockTime time.Time, timeout time.Duration) ([]types.Action, error) {
	isExceededTimeout := func(key uint64, value types.Action) (include bool, err error) {
		_, isCompletedStatus := statuses[value.Status]
		isKeepTimeExceeded := blockTime.After(value.UpdatedAt.Add(timeout))
		return isCompletedStatus && isKeepTimeExceeded, nil
	}

	id := func(key uint64, value types.Action) (types.Action, error) {
		return value, nil
	}

	actions, _, err := query.CollectionFilteredPaginate[uint64, types.Action, repo.SeqCollection[types.Action], types.Action](
		ctx, k.Coll(), nil, isExceededTimeout, id)

	return actions, err
}
