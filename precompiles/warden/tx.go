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

func (p Precompile) AddSpaceOwnerMethod(
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

	msgAddKeychainAdminResponse, err := msgServer.AddKeychainAdmin(ctx, msgAddKeychainAdmin)

	if err != nil {
		return nil, err
	}

	if err = p.EmitAddKeychainAdminEvent(ctx, stateDB, *newAdmin); err != nil {
		return nil, err
	}

	return method.Outputs.Pack(msgAddKeychainAdminResponse)
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
	stateDB vm.StateDB,
	method *abi.Method,
	args []interface{},
) ([]byte, error) {
	msgServer := wardenkeeper.NewMsgServerImpl(p.wardenkeeper)

	msgFulfilKeyRequest, err := newMsgFulfilKeyRequest(args, origin)

	if err != nil {
		return nil, err
	}

	p.Logger(ctx).Debug(
		"tx called",
		"method", method.Name,
		"args", fmt.Sprintf(
			"{ authority: %s, request_id: %d, status: %s resul: %s }",
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

func (p Precompile) RejectKeyRequestMethod(
	ctx sdk.Context,
	origin common.Address,
	stateDB vm.StateDB,
	method *abi.Method,
	args []interface{},
) ([]byte, error) {
	panic("Not implemented")
	// msgServer := wardenkeeper.NewMsgServerImpl(p.wardenkeeper)

	// msgFulfilKeyRequest, err := newMsgFulfilKeyRequest(args, origin)
}

func (p Precompile) FulfilSignRequestMethod(
	ctx sdk.Context,
	origin common.Address,
	stateDB vm.StateDB,
	method *abi.Method,
	args []interface{},
) ([]byte, error) {
	panic("Not implemented")
}

func (p Precompile) NewKeychainMethod(
	ctx sdk.Context,
	origin common.Address,
	stateDB vm.StateDB,
	method *abi.Method,
	args []interface{},
) ([]byte, error) {
	panic("Not implemented")
}

func (p Precompile) NewSpaceMethod(
	ctx sdk.Context,
	origin common.Address,
	stateDB vm.StateDB,
	method *abi.Method,
	args []interface{},
) ([]byte, error) {
	panic("Not implemented")
}

func (p Precompile) RemoveKeychainAdminMethod(
	ctx sdk.Context,
	origin common.Address,
	stateDB vm.StateDB,
	method *abi.Method,
	args []interface{},
) ([]byte, error) {
	panic("Not implemented")
}

func (p Precompile) UpdateKeychainMethod(
	ctx sdk.Context,
	origin common.Address,
	stateDB vm.StateDB,
	method *abi.Method,
	args []interface{},
) ([]byte, error) {
	panic("Not implemented")
}
