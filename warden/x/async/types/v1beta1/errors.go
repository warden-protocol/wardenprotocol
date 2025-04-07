package v1beta1

// DONTCOVER

import (
	sdkerrors "cosmossdk.io/errors"
)

// x/async module sentinel errors.
var (
	ErrInvalidSigner        = sdkerrors.Register(ModuleName, 1100, "expected gov account as only signer for proposal message")
	ErrInvalidPlugin        = sdkerrors.Register(ModuleName, 1102, "invalid plugin name")
	ErrInvalidTaskInput     = sdkerrors.Register(ModuleName, 1103, "invalid task input")
	ErrTaskAlreadyHasResult = sdkerrors.Register(ModuleName, 1104, "task already has result")
	ErrInvalidCallback      = sdkerrors.Register(ModuleName, 1105, "invalid callback")
)
