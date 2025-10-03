package ante

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	evmante "github.com/cosmos/evm/ante"
	evmanteevm "github.com/cosmos/evm/ante/evm"
)

// newMonoEVMAnteHandler creates the sdk.AnteHandler implementation for the EVM transactions.
func newMonoEVMAnteHandler(ctx sdk.Context, options HandlerOptions) sdk.AnteHandler {
	evmParams := options.EvmKeeper.GetParams(ctx)
	feemarketParams := options.FeeMarketKeeper.GetParams(ctx)
	decorators := []sdk.AnteDecorator{
		evmanteevm.NewEVMMonoDecorator(
			options.AccountKeeper,
			options.FeeMarketKeeper,
			options.EvmKeeper,
			options.MaxTxGasWanted,
			&evmParams,
			&feemarketParams,
		),
		evmante.NewTxListenerDecorator(options.PendingTxListener),
	}

	return sdk.ChainAnteDecorators(decorators...)
}
