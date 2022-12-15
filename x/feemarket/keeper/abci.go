package keeper

import (
	"fmt"

	"github.com/evmos/ethermint/x/feemarket/types"
	abci "github.com/tendermint/tendermint/abci/types"

	"github.com/cosmos/cosmos-sdk/telemetry"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

// BeginBlock updates base fee
func (k *Keeper) BeginBlock(ctx sdk.Context, req abci.RequestBeginBlock) {
	baseFee := k.CalculateBaseFee(ctx)

	// return immediately if base fee is nil
	if baseFee == nil {
		return
	}

	k.SetBaseFee(ctx, baseFee)

	defer func() {
		telemetry.SetGauge(float32(baseFee.Int64()), "feemarket", "base_fee")
	}()

	// Store current base fee in event
	ctx.EventManager().EmitEvents(sdk.Events{
		sdk.NewEvent(
			types.EventTypeFeeMarket,
			sdk.NewAttribute(types.AttributeKeyBaseFee, baseFee.String()),
		),
	})
}

// EndBlock update block gas wanted.
// The EVM end block logic doesn't update the validator set, thus it returns
// an empty slice.
func (k *Keeper) EndBlock(ctx sdk.Context, req abci.RequestEndBlock) {
	if ctx.BlockGasMeter() == nil {
		k.Logger(ctx).Error("block gas meter is nil when setting block gas wanted")
		return
	}

	gasWanted := k.GetTransientGasWanted(ctx)
	gasUsed := ctx.BlockGasMeter().GasConsumedToLimit()

	// to prevent BaseFee manipulation we limit the gasWanted so that
	// gasWanted = max(gasWanted * MinGasMultiplier, gasUsed)
	// this will be keep BaseFee protected from un-penalized manipulation
	// more info here https://github.com/evmos/ethermint/pull/1105#discussion_r888798925
	minGasMultiplier := k.GetParams(ctx).MinGasMultiplier
	limitedGasWanted := sdk.NewDec(int64(gasWanted)).Mul(minGasMultiplier)
	gasWanted = sdk.MaxDec(limitedGasWanted, sdk.NewDec(int64(gasUsed))).TruncateInt().Uint64()
	k.SetBlockGasWanted(ctx, gasWanted)

	defer func() {
		telemetry.SetGauge(float32(gasWanted), "feemarket", "block_gas")
	}()

	ctx.EventManager().EmitEvent(sdk.NewEvent(
		"block_gas",
		sdk.NewAttribute("height", fmt.Sprintf("%d", ctx.BlockHeight())),
		sdk.NewAttribute("amount", fmt.Sprintf("%d", gasWanted)),
	))
}
