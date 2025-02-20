package v1beta1

// DONTCOVER

import (
	sdkerrors "cosmossdk.io/errors"
)

// x/async module sentinel errors
var (
	ErrInvalidSigner      = sdkerrors.Register(ModuleName, 1100, "expected gov account as only signer for proposal message")
	ErrInvalidHandler     = sdkerrors.Register(ModuleName, 1102, "invalid handler name")
	ErrInvalidFutureInput = sdkerrors.Register(ModuleName, 1103, "invalid future input")
	ErrFutureAlreadyHasResult = sdkerrors.Register(ModuleName, 1104, "future already has result")
	ErrInvalidCallback    = sdkerrors.Register(ModuleName, 1105, "invalid callback")
)
