package keeper

import (
	"context"
	"time"

	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k Keeper) EndBlocker(ctx context.Context) error {
	sdkCtx := sdk.UnwrapSDKContext(ctx)
	blockHeight := sdkCtx.BlockHeight()
	params := k.GetParams(ctx)

	if params.MaxPendingTime > 0 && params.MaxCompletedTime > 0 {
		if err := k.pruneActions(
			ctx,
			blockHeight,
			params.PruneCheckBlockFrequency,
			params.MaxPendingTime,
			params.MaxCompletedTime); err != nil {
			return err
		}
	}

	return nil
}

func (k Keeper) pruneActions(
	ctx context.Context,
	blockHeight int64,
	pruneCheckBlockFrequency int64,
	maxPendingTime, maxCompletedTime time.Duration,
) error {
	latestPruneHeight, err := k.ActionKeeper.GetLatestPruneHeight(ctx)
	if err != nil {
		return err
	}

	if (blockHeight - latestPruneHeight) < pruneCheckBlockFrequency {
		return nil
	}

	blockTime := k.getBlockTime(ctx)

	expiredActions, err := k.ActionKeeper.ExpiredActions(ctx, blockTime, maxPendingTime, maxCompletedTime)
	if err != nil {
		return err
	}

	for _, act := range expiredActions {
		if err := k.ActionKeeper.pruneAction(ctx, act, blockHeight); err != nil {
			return err
		}
	}

	return nil
}
