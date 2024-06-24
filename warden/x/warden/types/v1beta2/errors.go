package v1beta2

// DONTCOVER

import (
	sdkerrors "cosmossdk.io/errors"
)

// x/warden module sentinel errors
var (
	ErrInvalidSigner       = sdkerrors.Register(ModuleName, 1100, "expected gov account as only signer for proposal message")
	ErrInvalidActionSigner = sdkerrors.Register(ModuleName, 1102, "expected x/act account as only signer for action message")
)
