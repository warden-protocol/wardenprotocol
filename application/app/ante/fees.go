package ante

import (
	"math/big"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"

	ethtypes "github.com/ethereum/go-ethereum/core/types"
	evmtypes "github.com/evmos/ethermint/x/evm/types"
)

// MinGasPriceDecorator will check if the transaction's fee is at least as large
// as the MinGasPrices param. If fee is too low, decorator returns error and tx
// is rejected. This applies for both CheckTx and DeliverTx
// If fee is high enough, then call next AnteHandler
// CONTRACT: Tx must implement FeeTx to use MinGasPriceDecorator
type MinGasPriceDecorator struct {
	feesKeeper FeeMarketKeeper
	evmKeeper  EVMKeeper
}

func NewMinGasPriceDecorator(fk FeeMarketKeeper, ek EVMKeeper) MinGasPriceDecorator {
	return MinGasPriceDecorator{feesKeeper: fk, evmKeeper: ek}
}

func (mpd MinGasPriceDecorator) AnteHandle(ctx sdk.Context, tx sdk.Tx, simulate bool, next sdk.AnteHandler) (newCtx sdk.Context, err error) {
	feeTx, ok := tx.(sdk.FeeTx)
	if !ok {
		return ctx, sdkerrors.Wrap(sdkerrors.ErrTxDecode, "Tx must be a FeeTx")
	}

	minGasPrice := mpd.feesKeeper.GetParams(ctx).MinGasPrice

	// short-circuit if min gas price is 0
	if minGasPrice.IsZero() {
		return next(ctx, tx, simulate)
	}

	evmParams := mpd.evmKeeper.GetParams(ctx)
	minGasPrices := sdk.DecCoins{
		{
			Denom:  evmParams.EvmDenom,
			Amount: minGasPrice,
		},
	}

	feeCoins := feeTx.GetFee()
	gas := feeTx.GetGas()

	requiredFees := make(sdk.Coins, 0)

	// Determine the required fees by multiplying each required minimum gas
	// price by the gas limit, where fee = ceil(minGasPrice * gasLimit).
	gasLimit := sdk.NewDecFromBigInt(new(big.Int).SetUint64(gas))

	for _, gp := range minGasPrices {
		fee := gp.Amount.Mul(gasLimit).Ceil().RoundInt()
		if fee.IsPositive() {
			requiredFees = requiredFees.Add(sdk.Coin{Denom: gp.Denom, Amount: fee})
		}
	}

	if !feeCoins.IsAnyGTE(requiredFees) {
		return ctx, sdkerrors.Wrapf(sdkerrors.ErrInsufficientFee, "provided fee < minimum global fee (%s < %s). Please increase the gas price.", feeCoins, requiredFees)
	}

	return next(ctx, tx, simulate)
}

// EthMinGasPriceDecorator will check if the transaction's fee is at least as large
// as the MinGasPrices param. If fee is too low, decorator returns error and tx
// is rejected. This applies to both CheckTx and DeliverTx and regardless
// if London hard fork or fee market params (EIP-1559) are enabled.
// If fee is high enough, then call next AnteHandler
type EthMinGasPriceDecorator struct {
	feesKeeper FeeMarketKeeper
	evmKeeper  EVMKeeper
}

func NewEthMinGasPriceDecorator(fk FeeMarketKeeper, ek EVMKeeper) EthMinGasPriceDecorator {
	return EthMinGasPriceDecorator{feesKeeper: fk, evmKeeper: ek}
}

func (empd EthMinGasPriceDecorator) AnteHandle(ctx sdk.Context, tx sdk.Tx, simulate bool, next sdk.AnteHandler) (newCtx sdk.Context, err error) {
	minGasPrice := empd.feesKeeper.GetParams(ctx).MinGasPrice

	// short-circuit if min gas price is 0
	if minGasPrice.IsZero() {
		return next(ctx, tx, simulate)
	}

	paramsEvm := empd.evmKeeper.GetParams(ctx)
	ethCfg := paramsEvm.ChainConfig.EthereumConfig(empd.evmKeeper.ChainID())
	baseFee := empd.evmKeeper.GetBaseFee(ctx, ethCfg)

	for _, msg := range tx.GetMsgs() {
		ethMsg, ok := msg.(*evmtypes.MsgEthereumTx)
		if !ok {
			return ctx, sdkerrors.Wrapf(
				sdkerrors.ErrUnknownRequest,
				"invalid message type %T, expected %T",
				msg, (*evmtypes.MsgEthereumTx)(nil),
			)
		}

		feeAmt := ethMsg.GetFee()

		// For dynamic transactions, GetFee() uses the GasFeeCap value, which
		// is the maximum gas price that the signer can pay. In practice, the
		// signer can pay less, if the block's BaseFee is lower. So, in this case,
		// we use the EffectiveFee. If the feemarket formula results in a BaseFee
		// that lowers EffectivePrice until it is < MinGasPrices, the users must
		// increase the GasTipCap (priority fee) until EffectivePrice > MinGasPrices.
		// Transactions with MinGasPrices * gasUsed < tx fees < EffectiveFee are rejected
		// by the feemarket AnteHandle

		txData, err := evmtypes.UnpackTxData(ethMsg.Data)
		if err != nil {
			return ctx, sdkerrors.Wrapf(err, "failed to unpack tx data %s", ethMsg.Hash)
		}

		if txData.TxType() != ethtypes.LegacyTxType {
			feeAmt = ethMsg.GetEffectiveFee(baseFee)
		}

		gasLimit := sdk.NewDecFromBigInt(new(big.Int).SetUint64(ethMsg.GetGas()))

		requiredFee := minGasPrice.Mul(gasLimit)
		fee := sdk.NewDecFromBigInt(feeAmt)

		if fee.LT(requiredFee) {
			return ctx, sdkerrors.Wrapf(
				sdkerrors.ErrInsufficientFee,
				"provided fee < minimum global fee (%d < %d). Please increase the priority tip (for EIP-1559 txs) or the gas prices (for access list or legacy txs)",
				fee.TruncateInt().Int64(), requiredFee.TruncateInt().Int64(),
			)
		}
	}

	return next(ctx, tx, simulate)
}
