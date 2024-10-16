package warden

import (
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/common"
	"github.com/evmos/evmos/v20/x/evm/core/vm"
	actkeeper "github.com/warden-protocol/wardenprotocol/warden/x/act/keeper"
	wardenkeeper "github.com/warden-protocol/wardenprotocol/warden/x/warden/keeper"
	wardentypes "github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta3"
)

const (
	AddKeychainAdminMethod    = "addKeychainAdmin"
	AddKeychainWriterMethod   = "addKeychainWriter"
	FulfilKeyRequestMethod    = "fulfilKeyRequest"
	RejectKeyRequestMethod    = "rejectKeyRequest"
	FulfilSignRequestMethod   = "fulfilSignRequest"
	RejectSignRequestMethod   = "rejectSignRequest"
	NewKeychainMethod         = "newKeychain"
	NewSpaceMethod            = "newSpace"
	RemoveKeychainAdminMethod = "removeKeychainAdmin"
	UpdateKeychainMethod      = "updateKeychain"
	AddSpaceOwnerMethod       = "addSpaceOwner"
	RemoveSpaceOwnerMethod    = "removeSpaceOwner"
	NewKeyRequestMethod       = "newKeyRequest"
	NewSignRequestMethod      = "newSignRequest"
	UpdateKeyMethod           = "updateKey"
	UpdateSpaceMethod         = "updateSpace"
)

func (p Precompile) AddKeychainAdminMethod(
	ctx sdk.Context,
	origin common.Address,
	stateDB vm.StateDB,
	method *abi.Method,
	args []interface{},
) ([]byte, error) {
	msgServer := wardenkeeper.NewMsgServerImpl(p.wardenkeeper)

	msgAddKeychainAdmin, newAdmin, err := newMsgAddKeychainAdmin(args, origin)

	if err != nil {
		return nil, err
	}

	p.Logger(ctx).Debug(
		"tx called",
		"method", method.Name,
		"args", fmt.Sprintf(
			"{ authority: %s, keyhcain_id: %d, new_admin: %s }",
			msgAddKeychainAdmin.Authority,
			msgAddKeychainAdmin.KeychainId,
			msgAddKeychainAdmin.NewAdmin,
		),
	)

	if _, err := msgServer.AddKeychainAdmin(ctx, msgAddKeychainAdmin); err != nil {
		return nil, err
	}

	if err = p.eventsRegistry.EmitEvents(ctx, stateDB, newAdmin); err != nil {
		return nil, err
	}

	return method.Outputs.Pack(true)
}

func (p Precompile) AddKeychainWriterMethod(
	ctx sdk.Context,
	origin common.Address,
	stateDB vm.StateDB,
	method *abi.Method,
	args []interface{},
) ([]byte, error) {
	msgServer := wardenkeeper.NewMsgServerImpl(p.wardenkeeper)

	msgAddKeychainWriter, newWriterAddress, err := newMsgAddKeychainWriter(args, origin)

	if err != nil {
		return nil, err
	}

	p.Logger(ctx).Debug(
		"tx called",
		"method", method.Name,
		"args", fmt.Sprintf(
			"{ authority: %s, keyhcain_id: %d, new_writer: %s }",
			msgAddKeychainWriter.Creator,
			msgAddKeychainWriter.KeychainId,
			msgAddKeychainWriter.Writer,
		),
	)

	if _, err = msgServer.AddKeychainWriter(ctx, msgAddKeychainWriter); err != nil {
		return nil, err
	}

	if err = p.eventsRegistry.EmitEvents(ctx, stateDB, newWriterAddress); err != nil {
		return nil, err
	}

	return method.Outputs.Pack(true)
}

func (p Precompile) FulfilKeyRequestMethod(
	ctx sdk.Context,
	origin common.Address,
	keyRequestStatus wardentypes.KeyRequestStatus,
	stateDB vm.StateDB,
	method *abi.Method,
	args []interface{},
) ([]byte, error) {
	msgServer := wardenkeeper.NewMsgServerImpl(p.wardenkeeper)

	msgFulfilKeyRequest, err := newMsgFulfilKeyRequest(args, keyRequestStatus, origin)

	if err != nil {
		return nil, err
	}

	p.Logger(ctx).Debug(
		"tx called",
		"method", method.Name,
		"args", fmt.Sprintf(
			"{ authority: %s, request_id: %d, status: %s, resul: %s }",
			msgFulfilKeyRequest.Creator,
			msgFulfilKeyRequest.RequestId,
			msgFulfilKeyRequest.Status,
			msgFulfilKeyRequest.Result,
		),
	)

	if _, err = msgServer.FulfilKeyRequest(ctx, msgFulfilKeyRequest); err != nil {
		return nil, err
	}

	if err = p.eventsRegistry.EmitEvents(ctx, stateDB, nil); err != nil {
		return nil, err
	}

	return method.Outputs.Pack(true)
}

func (p Precompile) FulfilSignRequestMethod(
	ctx sdk.Context,
	origin common.Address,
	signRequestStatus wardentypes.SignRequestStatus,
	stateDB vm.StateDB,
	method *abi.Method,
	args []interface{},
) ([]byte, error) {
	msgServer := wardenkeeper.NewMsgServerImpl(p.wardenkeeper)

	msgFulfilSignRequest, err := newMsgFulfilSignRequest(args, signRequestStatus, origin)

	if err != nil {
		return nil, err
	}

	p.Logger(ctx).Debug(
		"tx called",
		"method", method.Name,
		"args", fmt.Sprintf(
			"{ authority: %s, request_id: %d, status: %s, resul: %s }",
			msgFulfilSignRequest.Creator,
			msgFulfilSignRequest.RequestId,
			msgFulfilSignRequest.Status,
			msgFulfilSignRequest.Result,
		),
	)

	if _, err = msgServer.FulfilSignRequest(ctx, msgFulfilSignRequest); err != nil {
		return nil, err
	}

	if err = p.eventsRegistry.EmitEvents(ctx, stateDB, nil); err != nil {
		return nil, err
	}

	return method.Outputs.Pack(true)
}

func (p Precompile) NewKeychainMethod(
	ctx sdk.Context,
	origin common.Address,
	stateDB vm.StateDB,
	method *abi.Method,
	args []interface{},
) ([]byte, error) {
	msgServer := wardenkeeper.NewMsgServerImpl(p.wardenkeeper)

	msgNewKeychain, err := newMsgNewKeychain(method, args, origin)

	if err != nil {
		return nil, err
	}

	p.Logger(ctx).Debug(
		"tx called",
		"method", method.Name,
		"args", fmt.Sprintf(
			"{ creator: %s, name: %s, keychain_fees: %v, description: %s, url: %s, keybaseId: %s }",
			msgNewKeychain.Creator,
			msgNewKeychain.Name,
			msgNewKeychain.KeychainFees,
			msgNewKeychain.Description,
			msgNewKeychain.Url,
			msgNewKeychain.KeybaseId,
		),
	)

	msgNewKeychainResponse, err := msgServer.NewKeychain(ctx, msgNewKeychain)

	if err != nil {
		return nil, err
	}

	if err = p.eventsRegistry.EmitEvents(ctx, stateDB, &origin); err != nil {
		return nil, err
	}

	return method.Outputs.Pack(msgNewKeychainResponse.Id)
}

func (p Precompile) NewSpaceMethod(
	ctx sdk.Context,
	origin common.Address,
	stateDB vm.StateDB,
	method *abi.Method,
	args []interface{},
) ([]byte, error) {
	msgServer := wardenkeeper.NewMsgServerImpl(p.wardenkeeper)

	msgNewSpace, err := newMsgNewSpace(args, origin)

	if err != nil {
		return nil, err
	}

	p.Logger(ctx).Debug(
		"tx called",
		"method", method.Name,
		"args", fmt.Sprintf(
			"{ creator: %s, approve_admin_template_id: %d, reject_admin_template_id: %d, approve_sign_template_id: %d, reject_sign_template_id: %d, additional_owners: %v }",
			msgNewSpace.Creator,
			msgNewSpace.ApproveAdminTemplateId,
			msgNewSpace.RejectAdminTemplateId,
			msgNewSpace.ApproveSignTemplateId,
			msgNewSpace.RejectSignTemplateId,
			msgNewSpace.AdditionalOwners,
		),
	)

	msgNewSpaceResponse, err := msgServer.NewSpace(ctx, msgNewSpace)

	if err != nil {
		return nil, err
	}

	if err = p.eventsRegistry.EmitEvents(ctx, stateDB, &origin); err != nil {
		return nil, err
	}

	return method.Outputs.Pack(msgNewSpaceResponse.Id)
}

func (p Precompile) RemoveKeychainAdminMethod(
	ctx sdk.Context,
	origin common.Address,
	stateDB vm.StateDB,
	method *abi.Method,
	args []interface{},
) ([]byte, error) {
	msgServer := wardenkeeper.NewMsgServerImpl(p.wardenkeeper)

	msgRemoveKeychainAdmin, admin, err := newMsgRemoveKeychainAdmin(args, origin)

	if err != nil {
		return nil, err
	}

	p.Logger(ctx).Debug(
		"tx called",
		"method", method.Name,
		"args", fmt.Sprintf(
			"{ authority: %s, keychain_id: %d, admin: %s }",
			msgRemoveKeychainAdmin.Authority,
			msgRemoveKeychainAdmin.KeychainId,
			msgRemoveKeychainAdmin.Admin,
		),
	)

	if _, err := msgServer.RemoveKeychainAdmin(ctx, msgRemoveKeychainAdmin); err != nil {
		return nil, err
	}

	if err = p.eventsRegistry.EmitEvents(ctx, stateDB, admin); err != nil {
		return nil, err
	}

	return method.Outputs.Pack(true)
}

func (p Precompile) UpdateKeychainMethod(
	ctx sdk.Context,
	origin common.Address,
	stateDB vm.StateDB,
	method *abi.Method,
	args []interface{},
) ([]byte, error) {
	msgServer := wardenkeeper.NewMsgServerImpl(p.wardenkeeper)

	msgUpdateKeychain, err := newMsgUpdateKeychain(method, args, origin)

	if err != nil {
		return nil, err
	}

	p.Logger(ctx).Debug(
		"tx called",
		"method", method.Name,
		"args", fmt.Sprintf(
			"{ creator: %s, keychain_id: %d, name: %s, keychain_fees: %v, description: %s, url: %s, keybaseId: %s }",
			msgUpdateKeychain.Creator,
			msgUpdateKeychain.KeychainId,
			msgUpdateKeychain.Name,
			msgUpdateKeychain.KeychainFees,
			msgUpdateKeychain.Description,
			msgUpdateKeychain.Url,
			msgUpdateKeychain.KeybaseId,
		),
	)

	if _, err = msgServer.UpdateKeychain(ctx, msgUpdateKeychain); err != nil {
		return nil, err
	}

	if err = p.eventsRegistry.EmitEvents(ctx, stateDB, &origin); err != nil {
		return nil, err
	}

	return method.Outputs.Pack(true)
}

func (p Precompile) AddSpaceOwnerMethod(
	ctx sdk.Context,
	origin common.Address,
	stateDB vm.StateDB,
	method *abi.Method,
	args []interface{},
) ([]byte, error) {
	msgServer := actkeeper.NewMsgServerImpl(p.actkeeper)

	msgNewAction, msgAddSpaceOwner, err := newMsgAddSpaceOwner(args, origin, p.actkeeper.GetModuleAddress())

	if err != nil {
		return nil, err
	}

	p.Logger(ctx).Debug(
		"tx called",
		"method", method.Name,
		"args", fmt.Sprintf(
			"{ creator: %s, action_timeout_height: %d, expected_approve_expression: %s, expected_reject_expression: %s, space_id: %d, new_owner: %s, nonce: %d }",
			msgNewAction.Creator,
			msgNewAction.ActionTimeoutHeight,
			msgNewAction.ExpectedApproveExpression,
			msgNewAction.ExpectedRejectExpression,
			msgAddSpaceOwner.SpaceId,
			msgAddSpaceOwner.NewOwner,
			msgAddSpaceOwner.Nonce,
		),
	)

	response, err := msgServer.NewAction(ctx, msgNewAction)

	if err != nil {
		return nil, err
	}

	if err = p.eventsRegistry.EmitEvents(ctx, stateDB, &origin); err != nil {
		return nil, err
	}

	return method.Outputs.Pack(response)
}

func (p Precompile) RemoveSpaceOwnerMethod(
	ctx sdk.Context,
	origin common.Address,
	stateDB vm.StateDB,
	method *abi.Method,
	args []interface{},
) ([]byte, error) {
	msgServer := actkeeper.NewMsgServerImpl(p.actkeeper)

	msgNewAction, msgRemoveSpaceOwner, err := newMsgRemoveSpaceOwner(args, origin, p.actkeeper.GetModuleAddress())

	if err != nil {
		return nil, err
	}

	p.Logger(ctx).Debug(
		"tx called",
		"method", method.Name,
		"args", fmt.Sprintf(
			"{ creator: %s, action_timeout_height: %d, expected_approve_expression: %s, expected_reject_expression: %s, space_id: %d, owner: %s, nonce: %d }",
			msgNewAction.Creator,
			msgNewAction.ActionTimeoutHeight,
			msgNewAction.ExpectedApproveExpression,
			msgNewAction.ExpectedRejectExpression,
			msgRemoveSpaceOwner.SpaceId,
			msgRemoveSpaceOwner.Owner,
			msgRemoveSpaceOwner.Nonce,
		),
	)

	response, err := msgServer.NewAction(ctx, msgNewAction)

	if err != nil {
		return nil, err
	}

	if err = p.eventsRegistry.EmitEvents(ctx, stateDB, &origin); err != nil {
		return nil, err
	}

	return method.Outputs.Pack(response)
}

func (p Precompile) NewKeyRequestMethod(
	ctx sdk.Context,
	origin common.Address,
	stateDB vm.StateDB,
	method *abi.Method,
	args []interface{},
) ([]byte, error) {
	msgServer := actkeeper.NewMsgServerImpl(p.actkeeper)

	msgNewAction, msgNewKeyRequest, err := newMsgNewKeyRequest(args, origin, p.actkeeper.GetModuleAddress())

	if err != nil {
		return nil, err
	}

	p.Logger(ctx).Debug(
		"tx called",
		"method", method.Name,
		"args", fmt.Sprintf(
			"{ creator: %s, action_timeout_height: %d, expected_approve_expression: %s, expected_reject_expression: %s, space_id: %d, keychain_id: %d, key_type: %s, approve_template_id: %d, reject_template_id: %d, max_keychain_fees: %v, nonce: %d  }",
			msgNewAction.Creator,
			msgNewAction.ActionTimeoutHeight,
			msgNewAction.ExpectedApproveExpression,
			msgNewAction.ExpectedRejectExpression,
			msgNewKeyRequest.SpaceId,
			msgNewKeyRequest.KeychainId,
			msgNewKeyRequest.KeyType,
			msgNewKeyRequest.ApproveTemplateId,
			msgNewKeyRequest.RejectTemplateId,
			msgNewKeyRequest.MaxKeychainFees,
			msgNewKeyRequest.Nonce,
		),
	)

	response, err := msgServer.NewAction(ctx, msgNewAction)

	if err != nil {
		return nil, err
	}

	if err = p.eventsRegistry.EmitEvents(ctx, stateDB, &origin); err != nil {
		return nil, err
	}

	return method.Outputs.Pack(response)
}

func (p Precompile) NewSignRequestMethod(
	ctx sdk.Context,
	origin common.Address,
	stateDB vm.StateDB,
	method *abi.Method,
	args []interface{},
) ([]byte, error) {
	msgServer := actkeeper.NewMsgServerImpl(p.actkeeper)

	msgNewAction, msgNewSignRequest, err := newMsgNewSignRequest(args, origin, p.actkeeper.GetModuleAddress())

	if err != nil {
		return nil, err
	}

	p.Logger(ctx).Debug(
		"tx called",
		"method", method.Name,
		"args", fmt.Sprintf(
			"{ creator: %s, action_timeout_height: %d, expected_approve_expression: %s, expected_reject_expression: %s, key_id: %d, input: %b, analyzers: %v, encryption_key: %b, max_keychain_fees: %v, Nonce: %d  }",
			msgNewAction.Creator,
			msgNewAction.ActionTimeoutHeight,
			msgNewAction.ExpectedApproveExpression,
			msgNewAction.ExpectedRejectExpression,
			msgNewSignRequest.KeyId,
			msgNewSignRequest.Input,
			msgNewSignRequest.Analyzers,
			msgNewSignRequest.EncryptionKey,
			msgNewSignRequest.MaxKeychainFees,
			msgNewSignRequest.Nonce,
		),
	)

	response, err := msgServer.NewAction(ctx, msgNewAction)

	if err != nil {
		return nil, err
	}

	if err = p.eventsRegistry.EmitEvents(ctx, stateDB, &origin); err != nil {
		return nil, err
	}

	return method.Outputs.Pack(response)
}

func (p Precompile) UpdateKeyMethod(
	ctx sdk.Context,
	origin common.Address,
	stateDB vm.StateDB,
	method *abi.Method,
	args []interface{},
) ([]byte, error) {
	msgServer := actkeeper.NewMsgServerImpl(p.actkeeper)

	msgNewAction, msgUpdateKey, err := newMsgUpdateKey(args, origin, p.actkeeper.GetModuleAddress())

	if err != nil {
		return nil, err
	}

	p.Logger(ctx).Debug(
		"tx called",
		"method", method.Name,
		"args", fmt.Sprintf(
			"{ creator: %s, action_timeout_height: %d, expected_approve_expression: %s, expected_reject_expression: %s, key_id: %d, approve_template_id: %d, reject_template_id: %d }",
			msgNewAction.Creator,
			msgNewAction.ActionTimeoutHeight,
			msgNewAction.ExpectedApproveExpression,
			msgNewAction.ExpectedRejectExpression,
			msgUpdateKey.KeyId,
			msgUpdateKey.ApproveTemplateId,
			msgUpdateKey.RejectTemplateId,
		),
	)

	response, err := msgServer.NewAction(ctx, msgNewAction)

	if err != nil {
		return nil, err
	}

	if err = p.eventsRegistry.EmitEvents(ctx, stateDB, &origin); err != nil {
		return nil, err
	}

	return method.Outputs.Pack(response)
}

func (p Precompile) UpdateSpaceMethod(
	ctx sdk.Context,
	origin common.Address,
	stateDB vm.StateDB,
	method *abi.Method,
	args []interface{},
) ([]byte, error) {
	msgServer := actkeeper.NewMsgServerImpl(p.actkeeper)

	msgNewAction, msgUpdateSpace, err := newMsgUpdateSpace(args, origin, p.actkeeper.GetModuleAddress())

	if err != nil {
		return nil, err
	}

	p.Logger(ctx).Debug(
		"tx called",
		"method", method.Name,
		"args", fmt.Sprintf(
			"{ creator: %s, action_timeout_height: %d, expected_approve_expression: %s, expected_reject_expression: %s, space_id: %d, nonce: %d, approve_admin_template_id: %d, reject_admin_template_id: %d, approve_sign_template_id: %d, reject_sign_template_id: %d }",
			msgNewAction.Creator,
			msgNewAction.ActionTimeoutHeight,
			msgNewAction.ExpectedApproveExpression,
			msgNewAction.ExpectedRejectExpression,
			msgUpdateSpace.SpaceId,
			msgUpdateSpace.Nonce,
			msgUpdateSpace.ApproveAdminTemplateId,
			msgUpdateSpace.RejectAdminTemplateId,
			msgUpdateSpace.ApproveSignTemplateId,
			msgUpdateSpace.RejectSignTemplateId,
		),
	)

	response, err := msgServer.NewAction(ctx, msgNewAction)

	if err != nil {
		return nil, err
	}

	if err = p.eventsRegistry.EmitEvents(ctx, stateDB, &origin); err != nil {
		return nil, err
	}

	return method.Outputs.Pack(response)
}
