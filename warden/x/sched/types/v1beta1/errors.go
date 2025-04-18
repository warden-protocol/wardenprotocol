package v1beta1

// DONTCOVER

import (
	sdkerrors "cosmossdk.io/errors"
)

// x/sched module sentinel errors
var (
	ErrInvalidSigner            = sdkerrors.Register(ModuleName, 1100, "expected gov account as only signer for proposal message")
	ErrCallbackAlreadyHasResult = sdkerrors.Register(ModuleName, 1101, "callback already has result")
	ErrOutOfMaxGas              = sdkerrors.Register(ModuleName, 1102, "gas estimation more than max gas for callback")
	ErrInvalidCallback          = sdkerrors.Register(ModuleName, 1103, "invalid callback")
)
