package v1beta1

// DONTCOVER

import (
	sdkerrors "cosmossdk.io/errors"
)

// x/act module sentinel errors.
var (
	ErrInvalidSigner                = sdkerrors.Register(ModuleName, 1100, "expected gov account as only signer for proposal message")
	ErrInvalidActionMsgSigner       = sdkerrors.Register(ModuleName, 1102, "expected x/act account as only signer for action message")
	ErrInvalidActionStatus          = sdkerrors.Register(ModuleName, 1103, "invalid action status")
	ErrInvalidActionStatusChange    = sdkerrors.Register(ModuleName, 1104, "invalid status change")
	ErrTemplateEvaluationFailed     = sdkerrors.Register(ModuleName, 1106, "template evaluation failed")
	ErrTemplateNotBoolean           = sdkerrors.Register(ModuleName, 1107, "template must evaluate to a boolean")
	ErrInvalidTemplate              = sdkerrors.Register(ModuleName, 1108, "template is invalid")
	ErrInvalidActionMsg             = sdkerrors.Register(ModuleName, 1109, "invalid action message")
	ErrNoActionMsgHandler           = sdkerrors.Register(ModuleName, 1110, "no action message handler registered for message type")
	ErrNoTemplateRegistryHandler    = sdkerrors.Register(ModuleName, 1111, "no template registry handler registered for message type")
	ErrInvalidExpressionDefinition  = sdkerrors.Register(ModuleName, 1112, "invalid template definition")
	ErrInvalidRevoker               = sdkerrors.Register(ModuleName, 1113, "this account can't revoke this action")
	ErrInvalidUpdateTemplateAccount = sdkerrors.Register(ModuleName, 1114, "this account can't update this template")
	ErrApproveExpressionNotMatched  = sdkerrors.Register(ModuleName, 1115, "approve expression not matched with expected")
	ErrRejectExpressionNotMatched   = sdkerrors.Register(ModuleName, 1116, "reject expression not matched with expected")
)
