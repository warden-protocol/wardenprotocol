package v1beta3

// DONTCOVER

import (
	sdkerrors "cosmossdk.io/errors"
)

// x/warden module sentinel errors
var (
	ErrInvalidSigner                    = sdkerrors.Register(ModuleName, 1100, "expected gov account as only signer for proposal message")
	ErrInvalidActionSigner              = sdkerrors.Register(ModuleName, 1102, "expected x/act account as only signer for action message")
	ErrNotKeychainAdmin                 = sdkerrors.Register(ModuleName, 1103, "this account is not a Keychain Admin")
	ErrDuplicateKeychainAdmin           = sdkerrors.Register(ModuleName, 1104, "this account is already a Keychain Admin")
	ErrInvalidKeychainWriterAddress     = sdkerrors.Register(ModuleName, 1105, "invalid Keychain Writer address")
	ErrDuplicateKeychainWriter          = sdkerrors.Register(ModuleName, 1106, "this account is already a Keychain Writer")
	ErrNotKeychainWriter                = sdkerrors.Register(ModuleName, 1107, "this account is not a Keychain Writer")
	ErrCantRemoveLastKeychainAdmin      = sdkerrors.Register(ModuleName, 1108, "can't remove the last Keychain Admin")
	ErrDuplicateSpaceOwner              = sdkerrors.Register(ModuleName, 1109, "this account is already a Space Owner")
	ErrRequestNotPending                = sdkerrors.Register(ModuleName, 1110, "this request is not pending")
	ErrInvalidKey                       = sdkerrors.Register(ModuleName, 1111, "invalid key")
	ErrUnsupportedKeyType               = sdkerrors.Register(ModuleName, 1112, "unsupported key type")
	ErrInvalidRequestStatusUpdate       = sdkerrors.Register(ModuleName, 1113, "invalid request status update")
	ErrInvalidSignature                 = sdkerrors.Register(ModuleName, 1114, "invalid signature")
	ErrNotSpaceOwner                    = sdkerrors.Register(ModuleName, 1115, "this account is not a Space Owner")
	ErrAnalyzer                         = sdkerrors.Register(ModuleName, 1116, "analyzer error")
	ErrDuplicateAnalyzersDataForSigning = sdkerrors.Register(ModuleName, 1117, "two or more contracts tried to set DataForSigning. Only one analyzer contract can return DataForSigning")
)
