package ante

import (
	errorsmod "cosmossdk.io/errors"

	sdk "github.com/cosmos/cosmos-sdk/types"
	errortypes "github.com/cosmos/cosmos-sdk/types/errors"
	sdkvesting "github.com/cosmos/cosmos-sdk/x/auth/vesting/types"
)

// RejectVestingMsgsDecorator rejects transactions that create vesting accounts.
//
// A vesting account carries a locked balance. When that locked balance is
// mutated through an EVM precompile, the account's total bank balance is
// reconstructed from its spendable balance plus the locked offset recorded when
// the account was loaded; a stale offset yields an incorrect total. Warden has
// no use for user-created vesting accounts, so they are rejected outright
// rather than depending on that reconstruction being correct.
//
// This applies to transactions only. Vesting accounts defined in genesis are
// unaffected.
type RejectVestingMsgsDecorator struct{}

// NewRejectVestingMsgsDecorator creates a new RejectVestingMsgsDecorator.
func NewRejectVestingMsgsDecorator() sdk.AnteDecorator {
	return RejectVestingMsgsDecorator{}
}

// AnteHandle rejects any message that would create a vesting account.
func (rvd RejectVestingMsgsDecorator) AnteHandle(
	ctx sdk.Context,
	tx sdk.Tx,
	simulate bool,
	next sdk.AnteHandler,
) (sdk.Context, error) {
	for _, msg := range tx.GetMsgs() {
		switch msg.(type) {
		case *sdkvesting.MsgCreateVestingAccount,
			*sdkvesting.MsgCreatePermanentLockedAccount,
			*sdkvesting.MsgCreatePeriodicVestingAccount:
			return ctx, errorsmod.Wrapf(
				errortypes.ErrInvalidType,
				"%s is not supported on this chain",
				sdk.MsgTypeURL(msg),
			)
		}
	}

	return next(ctx, tx, simulate)
}
