package keeper

import (
	"context"
	"errors"
	"fmt"
	"time"

	"cosmossdk.io/collections"
	"cosmossdk.io/core/store"
	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"

	"github.com/warden-protocol/wardenprotocol/warden/repo"
	types "github.com/warden-protocol/wardenprotocol/warden/x/act/types/v1beta1"
)

type ActionKeeper struct {
	actions                  repo.SeqCollection[types.Action]
	actionByAddress          collections.Map[collections.Pair[sdk.AccAddress, uint64], uint64]
	previousPruneBlockHeight collections.Item[int64]
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

	latestPrunedBlock := collections.NewItem(
		sb,
		PreviousPruneBlockHeightPrefix,
		"previous_prune_block_height",
		collections.Int64Value,
	)

	_, err := sb.Build()
	if err != nil {
		panic(fmt.Sprintf("failed to build schema: %s", err))
	}

	return ActionKeeper{
		actions:                  actions,
		actionByAddress:          actionByAddress,
		previousPruneBlockHeight: latestPrunedBlock,
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

func (k ActionKeeper) GetLatestPruneHeight(ctx context.Context) (int64, error) {
	h, err := k.previousPruneBlockHeight.Get(ctx)
	if errors.Is(err, collections.ErrNotFound) {
		return 0, nil
	}

	return h, err
}

func (k ActionKeeper) ExpiredActions(ctx context.Context, blockTime time.Time, pendingTimeout, completedTimeout time.Duration) ([]types.Action, error) {
	it, err := k.Coll().Iterate(ctx, nil)
	if err != nil {
		return nil, err
	}
	defer it.Close()

	var actions []types.Action

	for ; it.Valid(); it.Next() {
		act, err := it.Value()
		if err != nil {
			return nil, err
		}

		if isExpired(act, blockTime, pendingTimeout, completedTimeout) {
			actions = append(actions, act)
		}
	}

	return actions, nil
}

func (k ActionKeeper) pruneAction(ctx context.Context, action types.Action, blockHeight int64) error {
	if err := k.actions.Remove(ctx, action.Id); err != nil {
		return err
	}

	for _, addr := range action.Mentions {
		key := collections.Join(sdk.MustAccAddressFromBech32(addr), action.Id)
		if err := k.actionByAddress.Remove(ctx, key); err != nil {
			return err
		}
	}

	if err := k.previousPruneBlockHeight.Set(ctx, blockHeight); err != nil {
		return err
	}

	sdkCtx := sdk.UnwrapSDKContext(ctx)

	if err := sdkCtx.EventManager().EmitTypedEvent(&types.EventActionPruned{Id: action.Id}); err != nil {
		return err
	}

	return nil
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

func isExpired(action types.Action, blockTime time.Time, pendingTimeout, completedTimeout time.Duration) bool {
	if action.Status == types.ActionStatus_ACTION_STATUS_TIMEOUT {
		return true
	}

	if action.Status == types.ActionStatus_ACTION_STATUS_PENDING &&
		action.UpdatedAt.Add(pendingTimeout).Before(blockTime) {
		return true
	}

	isCompletedStatus := action.Status == types.ActionStatus_ACTION_STATUS_COMPLETED ||
		action.Status == types.ActionStatus_ACTION_STATUS_REVOKED
	if isCompletedStatus && action.UpdatedAt.Add(completedTimeout).Before(blockTime) {
		return true
	}

	return false
}
