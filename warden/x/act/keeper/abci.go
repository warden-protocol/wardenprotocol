package keeper

import (
	"context"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/gogoproto/proto"
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
		completedStatuses,
		func(action types.Action) proto.Message {
			return &types.EventCompletedActionTimedOut{Id: action.Id}
		}); err != nil {
		return err
	}

	pendingStatuses := map[types.ActionStatus]struct{}{
		types.ActionStatus_ACTION_STATUS_PENDING: {},
	}
	if err := k.pruneActionsByStatus(
		ctx,
		blockTime,
		k.GetParams(ctx).MaxPendingTime,
		pendingStatuses,
		func(action types.Action) proto.Message {
			return &types.EventPendingActionTimedOut{Id: action.Id}
		}); err != nil {
		return err
	}

	return nil
}

func (k Keeper) pruneActionsByStatus(
	ctx context.Context,
	blockTime time.Time,
	timeout time.Duration,
	statuses map[types.ActionStatus]struct{},
	eventFabric func(action types.Action) proto.Message) error {

	sdkCtx := sdk.UnwrapSDKContext(ctx)

	actions, err := k.ActionKeeper.ExpiredActions(
		ctx, statuses, blockTime, timeout)

	if err != nil {
		return err
	}

	if len(actions) == 0 {
		return nil
	}

	for _, action := range actions {
		if err := k.ActionKeeper.PruneAction(ctx, action); err != nil {
			return err
		}

		if err := sdkCtx.EventManager().EmitTypedEvent(eventFabric(action)); err != nil {
			return err
		}

	}

	return nil
}
