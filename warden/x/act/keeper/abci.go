package keeper

import (
	"context"
	types "github.com/warden-protocol/wardenprotocol/warden/x/act/types/v1beta1"
	"time"
)

func (k Keeper) EndBlocker(ctx context.Context) error {
	blockTime := k.getBlockTime(ctx)

	if err := k.pruneActionsByStatus(
		ctx,
		blockTime,
		k.GetParams(ctx).MaxCompletedTime,
		types.ActionStatus_ACTION_STATUS_COMPLETED); err != nil {
		return err
	}

	if err := k.pruneActionsByStatus(
		ctx,
		blockTime,
		k.GetParams(ctx).MaxPendingTime,
		types.ActionStatus_ACTION_STATUS_PENDING); err != nil {
		return err
	}

	return nil
}

func (k Keeper) pruneActionsByStatus(
	ctx context.Context, blockTime time.Time, timeout time.Duration, status types.ActionStatus) error {

	actions, err := k.ActionKeeper.ExpiredActions(
		ctx, status, blockTime, timeout)

	if err != nil {
		return err
	}

	return k.ActionKeeper.PruneActions(ctx, actions)
}
