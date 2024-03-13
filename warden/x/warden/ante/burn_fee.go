package ante

import (
	errorsmod "cosmossdk.io/errors"
	"cosmossdk.io/math"
	authtypes "github.com/cosmos/cosmos-sdk/x/auth/types"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"

	"github.com/warden-protocol/wardenprotocol/warden/x/warden/types"
)

// BurnFeeDecorator burns specified part of fee collected. This decorator must be called after DeductFeeDecorator
// because assumes that all fee related checks are already done and does not check anything by itself
type BurnFeeDecorator struct {
	bankKeeper types.BankKeeper
	burnRatio  math.LegacyDec
}

func NewBurnFeeDecorator(bk types.BankKeeper, br math.LegacyDec) BurnFeeDecorator {
	return BurnFeeDecorator{
		bankKeeper: bk,
		burnRatio:  br,
	}
}

func (bfd BurnFeeDecorator) AnteHandle(ctx sdk.Context, tx sdk.Tx, simulate bool, next sdk.AnteHandler) (sdk.Context, error) {
	feeTx, ok := tx.(sdk.FeeTx)
	if !ok {
		return ctx, errorsmod.Wrap(sdkerrors.ErrTxDecode, "Tx must be a FeeTx")
	}

	// Assume that default sdk FeeChecker is used. It follows that actual fee is always equal to feeTx.GetFee()
	fee := feeTx.GetFee()

	burnAmount, _ := sdk.NewDecCoinsFromCoins(fee...).MulDec(bfd.burnRatio).TruncateDecimal()

	if !burnAmount.IsZero() {
		err := bfd.bankKeeper.BurnCoins(ctx, authtypes.FeeCollectorName, burnAmount)
		if err != nil {
			return ctx, errorsmod.Wrap(sdkerrors.ErrLogic, "Failed to burn fee")
		}
	}

	return next(ctx, tx, simulate)
}
