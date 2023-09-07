package types

// DONTCOVER

import (
	sdkerrors "cosmossdk.io/errors"
)

// x/identity module sentinel errors
var (
	ErrEmptyDesc = sdkerrors.Register(ModuleName, 1100, "description is empty")
)
