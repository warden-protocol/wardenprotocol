package keeper

import (
	"context"
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"

	types "github.com/warden-protocol/wardenprotocol/warden/x/async/types/v1beta1"
)

// deductKeychainFees is to deduct fees from creator's address to warden escrow address.
func (k Keeper) deductPluginFees(
	ctx context.Context,
	pluginUser sdk.AccAddress,
	fees types.PluginFee,
) (*types.DeductedFee, error) {
	if !fees.TaskReq.Empty() {
		if !fees.IsValid() {
			return nil, fmt.Errorf("invalid plugin fees: %s", fees)
		}

		toBeDeductedFee, err := fees.CalculateDistributedFees()
		if err != nil {
			return nil, err
		}

		if err := k.bankKeeper.SendCoins(ctx, pluginUser, k.asyncModuleAddress, toBeDeductedFee.Total()); err != nil {
			return nil, err
		}

		return &toBeDeductedFee, nil
	}

	return types.NewEmptyDeductedFee(), nil
}

// completed.
func (k Keeper) releasePluginFees(
	ctx context.Context,
	pluginCreator sdk.AccAddress,
	taskExecutor sdk.AccAddress,
	fees types.DeductedFee,
) error {
	if !fees.PluginCreatorReward.Empty() {
		err := k.bankKeeper.SendCoins(
			ctx,
			k.asyncModuleAddress,
			pluginCreator,
			fees.PluginCreatorReward)
		if err != nil {
			return err
		}
	}

	if !fees.ExecutorReward.Empty() {
		err := k.bankKeeper.SendCoins(
			ctx,
			k.asyncModuleAddress,
			taskExecutor,
			fees.ExecutorReward)
		if err != nil {
			return err
		}

		return nil
	}

	return nil
}

// rejected or timed-out.
//
//nolint:unused
func (k Keeper) refundPluginFees(
	ctx context.Context,
	pluginUser sdk.AccAddress,
	fees types.DeductedFee,
) error {
	if !fees.IsEmpty() {
		return k.bankKeeper.SendCoins(ctx, k.asyncModuleAddress, pluginUser, fees.Total())
	}

	return nil
}
