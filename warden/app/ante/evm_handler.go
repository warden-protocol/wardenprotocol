package ante

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/evm/ante"
	evmante "github.com/cosmos/evm/ante/evm"
)

// newMonoEVMAnteHandler creates the sdk.AnteHandler implementation for the EVM transactions.
func newMonoEVMAnteHandler(options HandlerOptions) sdk.AnteHandler {
	decorators := []sdk.AnteDecorator{
		evmante.NewEVMMonoDecorator(
			options.AccountKeeper,
			options.FeeMarketKeeper,
			options.EvmKeeper,
			options.MaxTxGasWanted,
		),
		ante.NewTxListenerDecorator(options.PendingTxListener),
	}

	return sdk.ChainAnteDecorators(decorators...)
}
