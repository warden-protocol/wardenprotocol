package v1beta1

// DONTCOVER

import (
	sdkerrors "cosmossdk.io/errors"
)

// x/act module sentinel errors
var (
	ErrInvalidSigner             = sdkerrors.Register(ModuleName, 1100, "expected gov account as only signer for proposal message")
	ErrSample                    = sdkerrors.Register(ModuleName, 1101, "sample error")
	ErrInvalidActionMsgSigner    = sdkerrors.Register(ModuleName, 1102, "expected x/act account as only signer for action message")
	ErrInvalidActionStatus       = sdkerrors.Register(ModuleName, 1103, "invalid action status")
	ErrInvalidActionStatusChange = sdkerrors.Register(ModuleName, 1104, "invalid status change")
	ErrApproverExists            = sdkerrors.Register(ModuleName, 1105, "approver already exists")
	ErrRuleEvaluationFailed      = sdkerrors.Register(ModuleName, 1106, "rule evaluation failed")
	ErrRuleNotBoolean            = sdkerrors.Register(ModuleName, 1107, "rule must evaluate to a boolean")
	ErrInvalidRule               = sdkerrors.Register(ModuleName, 1108, "rule is invalid")
	ErrInvalidActionMsg          = sdkerrors.Register(ModuleName, 1109, "invalid action message")
	ErrNoActionMsgHandler        = sdkerrors.Register(ModuleName, 1110, "no action message handler registered for message type")
	ErrNoRuleRegistryHandler     = sdkerrors.Register(ModuleName, 1111, "no rule registry handler registered for message type")
	ErrInvalidRuleDefinition     = sdkerrors.Register(ModuleName, 1112, "invalid rule definition")
	ErrInvalidRevoker            = sdkerrors.Register(ModuleName, 1113, "this account can't revoke this action")
	ErrInvalidUpdateRuleAccount  = sdkerrors.Register(ModuleName, 1114, "this account can't update this rule")
)
