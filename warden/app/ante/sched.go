package ante

import (
	errorsmod "cosmossdk.io/errors"
	sdk "github.com/cosmos/cosmos-sdk/types"
	errortypes "github.com/cosmos/cosmos-sdk/types/errors"
	evmanteevm "github.com/cosmos/evm/ante/evm"
	evmtypes "github.com/cosmos/evm/x/vm/types"
)

func newSchedAnteHandler(ctx sdk.Context, options HandlerOptions) sdk.AnteHandler { //nolint:unused
	evmParams := options.EvmKeeper.GetParams(ctx)
	feemarketParams := options.FeeMarketKeeper.GetParams(ctx)

	return func(ctx sdk.Context, tx sdk.Tx, simulate bool) (newCtx sdk.Context, err error) {
		// This check prevents any external user to submit a transaction using the
		// ExtensionOptionsCallbacks.
		// If a validator still builds a proposal containing an invalid transaction,
		// the rest of the validators should reject such a proposal during
		// ProcessProposal.
		if ctx.IsCheckTx() {
			return ctx, errorsmod.Wrapf(
				errortypes.ErrInvalidType,
				"x/sched system transactions cannot be checked",
			)
		}

		// This transaction will bypass normal authentication checks such as signature and nonce.
		// It's dangerous and should only be allowed if built by the x/sched module.
		// The code below is a stripped version of the normal EVM ante handler.

		ctx, err = evmanteevm.SetupContextAndResetTransientGas(ctx, tx, options.EvmKeeper)
		if err != nil {
			return ctx, err
		}

		decUtils, err := evmanteevm.NewMonoDecoratorUtils(ctx, options.EvmKeeper, &evmParams, &feemarketParams)
		if err != nil {
			return ctx, err
		}

		if err := evmanteevm.CheckGasWanted(ctx, options.FeeMarketKeeper, tx, decUtils.Rules.IsLondon, &feemarketParams); err != nil {
			return ctx, err
		}

		for i, msg := range tx.GetMsgs() {
			ethMsg, _, err := evmtypes.UnpackEthMsg(msg)
			if err != nil {
				return ctx, err
			}

			txIdx := uint64(i) //nolint:gosec // G115
			evmanteevm.EmitTxHashEvent(ctx, ethMsg, decUtils.BlockTxIndex, txIdx)
		}

		return ctx, nil
	}
}
