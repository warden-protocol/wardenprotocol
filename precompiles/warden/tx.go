package warden

import (
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/vm"
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

	if err = p.EmitAddKeychainAdminEvent(ctx, stateDB, *newAdmin); err != nil {
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

	if err = p.EmitAddKeychainWriterEvent(ctx, stateDB, *newWriterAddress); err != nil {
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

	if msgFulfilKeyRequest.Status == wardentypes.KeyRequestStatus_KEY_REQUEST_STATUS_FULFILLED {
		if err = p.EmitNewKeyEvent(ctx, stateDB); err != nil {
			return nil, err
		}
	} else {
		if err = p.EmitRejectKeyRequestEvent(ctx, stateDB); err != nil {
			return nil, err
		}
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

	if msgFulfilSignRequest.Status == wardentypes.SignRequestStatus_SIGN_REQUEST_STATUS_FULFILLED {
		if err = p.EmitFulfilSignRequestEvent(ctx, stateDB); err != nil {
			return nil, err
		}
	} else {
		if err = p.EmitRejectSignRequestEvent(ctx, stateDB); err != nil {
			return nil, err
		}
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

	// emit event
	if err = p.EmitNewKeychainEvent(ctx, origin, stateDB); err != nil {
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

	// emit event
	if err = p.EmitNewSpaceEvent(ctx, origin, stateDB); err != nil {
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

	// emit event
	if err = p.EmitRemoveKeychainAdmin(ctx, *admin, stateDB); err != nil {
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

	// emit event
	if err = p.EmitUpdateKeychainEvent(ctx, origin, stateDB); err != nil {
		return nil, err
	}

	return method.Outputs.Pack(true)
}
