package ante

import (
	"math/big"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

// GasWantedDecorator keeps track of the gasWanted amount on the current block in transient store
// for BaseFee calculation.
// NOTE: This decorator does not perform any validation
type GasWantedDecorator struct {
	evmKeeper       EVMKeeper
	feeMarketKeeper FeeMarketKeeper
}

// NewGasWantedDecorator creates a new NewGasWantedDecorator
func NewGasWantedDecorator(
	evmKeeper EVMKeeper,
	feeMarketKeeper FeeMarketKeeper,
) GasWantedDecorator {
	return GasWantedDecorator{
		evmKeeper,
		feeMarketKeeper,
	}
}

func (gwd GasWantedDecorator) AnteHandle(ctx sdk.Context, tx sdk.Tx, simulate bool, next sdk.AnteHandler) (newCtx sdk.Context, err error) {
	params := gwd.evmKeeper.GetParams(ctx)
	ethCfg := params.ChainConfig.EthereumConfig(gwd.evmKeeper.ChainID())

	blockHeight := big.NewInt(ctx.BlockHeight())
	isLondon := ethCfg.IsLondon(blockHeight)

	feeTx, ok := tx.(sdk.FeeTx)
	if !ok || !isLondon {
		return next(ctx, tx, simulate)
	}

	gasWanted := feeTx.GetGas()
	feeMktParams := gwd.feeMarketKeeper.GetParams(ctx)

	// Add total gasWanted to cumulative in block transientStore in FeeMarket module
	if feeMktParams.IsBaseFeeEnabled(ctx.BlockHeight()) {
		if _, err := gwd.feeMarketKeeper.AddTransientGasWanted(ctx, gasWanted); err != nil {
			return ctx, sdkerrors.Wrapf(err, "failed to add gas wanted to transient store")
		}
	}

	return next(ctx, tx, simulate)
}
