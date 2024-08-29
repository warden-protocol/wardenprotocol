package keeper

import (
	"context"
	types "github.com/warden-protocol/wardenprotocol/warden/x/act/types/v1beta1"
	"time"
)

func (k Keeper) EndBlocker(ctx context.Context) error {
	blockTime := k.getBlockTime(ctx)

	completedStatuses := map[types.ActionStatus]struct{}{
		types.ActionStatus_ACTION_STATUS_COMPLETED: {},
		types.ActionStatus_ACTION_STATUS_REVOKED:   {},
	}
	if err := k.pruneActionsByStatus(
		ctx,
		blockTime,
		k.GetParams(ctx).MaxCompletedTime,
		completedStatuses); err != nil {
		return err
	}

	pendingStatuses := map[types.ActionStatus]struct{}{
		types.ActionStatus_ACTION_STATUS_PENDING: {},
	}
	if err := k.pruneActionsByStatus(
		ctx,
		blockTime,
		k.GetParams(ctx).MaxPendingTime,
		pendingStatuses); err != nil {
		return err
	}

	return nil
}

func (k Keeper) pruneActionsByStatus(
	ctx context.Context, blockTime time.Time, timeout time.Duration, statuses map[types.ActionStatus]struct{}) error {

	actions, err := k.ActionKeeper.ExpiredActions(
		ctx, statuses, blockTime, timeout)

	if err != nil {
		return err
	}

	return k.ActionKeeper.PruneActions(ctx, actions)
}
