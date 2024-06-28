package v1beta1

// DONTCOVER

import (
	sdkerrors "cosmossdk.io/errors"
)

// x/act module sentinel errors
var (
	ErrInvalidSigner          = sdkerrors.Register(ModuleName, 1100, "expected gov account as only signer for proposal message")
	ErrSample                 = sdkerrors.Register(ModuleName, 1101, "sample error")
	ErrInvalidActionMsgSigner = sdkerrors.Register(ModuleName, 1102, "expected x/act account as only signer for action message")
)
