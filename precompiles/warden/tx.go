package warden

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/vm"

	wardencommon "github.com/warden-protocol/wardenprotocol/precompiles/common"
	actkeeper "github.com/warden-protocol/wardenprotocol/warden/x/act/keeper"
	"github.com/warden-protocol/wardenprotocol/warden/x/act/types/v1beta1"
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

// AddKeychainAdminMethod constructs MsgAddKeychainAdminRequest from args, passes it to msg server and packs corresponding abi output.
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
		"args", args,
	)

	if _, err := msgServer.AddKeychainAdmin(ctx, msgAddKeychainAdmin); err != nil {
		return nil, err
	}

	if err = p.eventsRegistry.EmitEvents(ctx, stateDB, newAdmin); err != nil {
		return nil, err
	}

	return method.Outputs.Pack(true)
}

// AddKeychainWriterMethod constructs MsgAddKeychainWriter from args, passes it to msg server and packs corresponding abi output.
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
		"args", args,
	)

	if _, err = msgServer.AddKeychainWriter(ctx, msgAddKeychainWriter); err != nil {
		return nil, err
	}

	if err = p.eventsRegistry.EmitEvents(ctx, stateDB, newWriterAddress); err != nil {
		return nil, err
	}

	return method.Outputs.Pack(true)
}

// FulfilKeyRequestMethod constructs MsgFulfilKeyRequest from args, passes it to msg server and packs corresponding abi output.
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
		"args", args,
	)

	if _, err = msgServer.FulfilKeyRequest(ctx, msgFulfilKeyRequest); err != nil {
		return nil, err
	}

	if err = p.eventsRegistry.EmitEvents(ctx, stateDB, nil); err != nil {
		return nil, err
	}

	return method.Outputs.Pack(true)
}

// FulfilSignRequestMethod constructs MsgFulfilSignRequest from args, passes it to msg server and packs corresponding abi output.
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
		"args", args,
	)

	if _, err = msgServer.FulfilSignRequest(ctx, msgFulfilSignRequest); err != nil {
		return nil, err
	}

	if err = p.eventsRegistry.EmitEvents(ctx, stateDB, nil); err != nil {
		return nil, err
	}

	return method.Outputs.Pack(true)
}

// NewKeychainMethod constructs MsgNewKeychain from args, passes it to msg server and packs corresponding abi output.
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
		"args", args,
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

// NewSpaceMethod constructs MsgNewSpace from args, passes it to msg server and packs corresponding abi output.
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
		"args", args,
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

// RemoveKeychainAdminMethod constructs MsgRemoveKeychainAdminRequest from args, passes it to msg server and packs corresponding abi output.
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
		"args", args,
	)

	if _, err := msgServer.RemoveKeychainAdmin(ctx, msgRemoveKeychainAdmin); err != nil {
		return nil, err
	}

	if err = p.eventsRegistry.EmitEvents(ctx, stateDB, admin); err != nil {
		return nil, err
	}

	return method.Outputs.Pack(true)
}

// UpdateKeychainMethod constructs MsgUpdateKeychain from args, passes it to msg server and packs corresponding abi output.
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
		"args", args,
	)

	if _, err = msgServer.UpdateKeychain(ctx, msgUpdateKeychain); err != nil {
		return nil, err
	}

	if err = p.eventsRegistry.EmitEvents(ctx, stateDB, &origin); err != nil {
		return nil, err
	}

	return method.Outputs.Pack(true)
}

// AddSpaceOwnerMethod constructs MsgAddSpaceOwner wrapped by MsgNewAction from args, passes it to msg server and packs corresponding abi output.
func (p Precompile) AddSpaceOwnerMethod(
	ctx sdk.Context,
	origin common.Address,
	caller common.Address,
	stateDB vm.StateDB,
	method *abi.Method,
	args []interface{},
) ([]byte, error) {
	msgServer := actkeeper.NewMsgServerImpl(p.actkeeper)

	msgNewAction, err := newMsgAddSpaceOwner(args, origin, p.actkeeper.GetModuleAddress())
	if err != nil {
		return nil, err
	}

	p.Logger(ctx).Debug(
		"tx called",
		"method", method.Name,
		"args", args,
	)

	newActResult, err := msgServer.NewAction(ctx, msgNewAction)
	if err != nil {
		return nil, err
	}

	if err := p.tryVoteAsSender(ctx, msgServer, newActResult.Id, caller); err != nil {
		return nil, err
	}

	if err := p.eventsRegistry.EmitEvents(ctx, stateDB, &origin); err != nil {
		return nil, err
	}

	return method.Outputs.Pack(true)
}

// tryVoteAsSender attempts to vote for an action as the sender of the action.
// This is useful if the contract attempts to vote for an action.
// If the action is not in the pending state, this function does nothing.
// If the action is in the pending state, it attempts to vote for the action
// with an approved vote type. If the vote is successful, this function returns
// nil. If the vote fails, this function returns the error.
func (p Precompile) tryVoteAsSender(
	ctx sdk.Context,
	msgServer v1beta1.MsgServer,
	actionId uint64,
	caller common.Address,
) error {
	actionResponse, err := p.actQueryServer.ActionById(ctx, &v1beta1.QueryActionByIdRequest{
		Id: actionId,
	})
	if err != nil {
		return err
	}

	action := actionResponse.Action

	if action.GetStatus() != v1beta1.ActionStatus_ACTION_STATUS_PENDING {
		return nil
	}

	participant := wardencommon.Bech32StrFromAddress(caller)

	_, err = msgServer.VoteForAction(ctx, &v1beta1.MsgVoteForAction{
		Participant: participant,
		ActionId:    action.GetId(),
		VoteType:    v1beta1.ActionVoteType_VOTE_TYPE_APPROVED,
	})
	if err != nil {
		return err
	}

	return nil
}

// RemoveSpaceOwnerMethod constructs MsgRemoveSpaceOwner wrapped by MsgNewAction from args, passes it to msg server and packs corresponding abi output.
func (p Precompile) RemoveSpaceOwnerMethod(
	ctx sdk.Context,
	origin common.Address,
	caller common.Address,
	stateDB vm.StateDB,
	method *abi.Method,
	args []interface{},
) ([]byte, error) {
	msgServer := actkeeper.NewMsgServerImpl(p.actkeeper)

	msgNewAction, err := newMsgRemoveSpaceOwner(args, origin, p.actkeeper.GetModuleAddress())
	if err != nil {
		return nil, err
	}

	p.Logger(ctx).Debug(
		"tx called",
		"method", method.Name,
		"args", args,
	)

	newActResult, err := msgServer.NewAction(ctx, msgNewAction)
	if err != nil {
		return nil, err
	}

	if err := p.tryVoteAsSender(ctx, msgServer, newActResult.Id, caller); err != nil {
		return nil, err
	}

	if err = p.eventsRegistry.EmitEvents(ctx, stateDB, &origin); err != nil {
		return nil, err
	}

	return method.Outputs.Pack(true)
}

// NewKeyRequestMethod constructs MsgNewKeyRequest wrapped by MsgNewAction from args, passes it to msg server and packs corresponding abi output.
func (p Precompile) NewKeyRequestMethod(
	ctx sdk.Context,
	origin common.Address,
	caller common.Address,
	stateDB vm.StateDB,
	method *abi.Method,
	args []interface{},
) ([]byte, error) {
	msgServer := actkeeper.NewMsgServerImpl(p.actkeeper)

	msgNewAction, err := newMsgNewKeyRequest(method, args, origin, p.actkeeper.GetModuleAddress())
	if err != nil {
		return nil, err
	}

	p.Logger(ctx).Debug(
		"tx called",
		"method", method.Name,
		"args", args,
	)

	newActResult, err := msgServer.NewAction(ctx, msgNewAction)
	if err != nil {
		return nil, err
	}

	if err := p.tryVoteAsSender(ctx, msgServer, newActResult.Id, caller); err != nil {
		return nil, err
	}

	if err = p.eventsRegistry.EmitEvents(ctx, stateDB, &origin); err != nil {
		return nil, err
	}

	return method.Outputs.Pack(true)
}

// NewSignRequestMethod constructs MsgNewSignRequest wrapped by MsgNewAction from args, passes it to msg server and packs corresponding abi output.
func (p Precompile) NewSignRequestMethod(
	ctx sdk.Context,
	origin common.Address,
	caller common.Address,
	stateDB vm.StateDB,
	method *abi.Method,
	args []interface{},
) ([]byte, error) {
	msgServer := actkeeper.NewMsgServerImpl(p.actkeeper)

	msgNewAction, err := newMsgNewSignRequest(method, args, origin, p.actkeeper.GetModuleAddress())
	if err != nil {
		return nil, err
	}

	p.Logger(ctx).Debug(
		"tx called",
		"method", method.Name,
		"args", args,
	)

	newActResult, err := msgServer.NewAction(ctx, msgNewAction)
	if err != nil {
		return nil, err
	}

	if err := p.tryVoteAsSender(ctx, msgServer, newActResult.Id, caller); err != nil {
		return nil, err
	}

	if err = p.eventsRegistry.EmitEvents(ctx, stateDB, &origin); err != nil {
		return nil, err
	}

	return method.Outputs.Pack(true)
}

// UpdateKeyMethod constructs MsgUpdateKey wrapped by MsgNewAction from args, passes it to msg server and packs corresponding abi output.
func (p Precompile) UpdateKeyMethod(
	ctx sdk.Context,
	origin common.Address,
	caller common.Address,
	stateDB vm.StateDB,
	method *abi.Method,
	args []interface{},
) ([]byte, error) {
	msgServer := actkeeper.NewMsgServerImpl(p.actkeeper)

	msgNewAction, err := newMsgUpdateKey(args, origin, p.actkeeper.GetModuleAddress())
	if err != nil {
		return nil, err
	}

	p.Logger(ctx).Debug(
		"tx called",
		"method", method.Name,
		"args", args,
	)

	newActResult, err := msgServer.NewAction(ctx, msgNewAction)
	if err != nil {
		return nil, err
	}

	if err := p.tryVoteAsSender(ctx, msgServer, newActResult.Id, caller); err != nil {
		return nil, err
	}

	if err = p.eventsRegistry.EmitEvents(ctx, stateDB, &origin); err != nil {
		return nil, err
	}

	return method.Outputs.Pack(true)
}

// UpdateSpaceMethod constructs MsgUpdateSpace wrapped by MsgNewAction from args, passes it to msg server and packs corresponding abi output.
func (p Precompile) UpdateSpaceMethod(
	ctx sdk.Context,
	origin common.Address,
	caller common.Address,
	stateDB vm.StateDB,
	method *abi.Method,
	args []interface{},
) ([]byte, error) {
	msgServer := actkeeper.NewMsgServerImpl(p.actkeeper)

	msgNewAction, err := newMsgUpdateSpace(args, origin, p.actkeeper.GetModuleAddress())
	if err != nil {
		return nil, err
	}

	p.Logger(ctx).Debug(
		"tx called",
		"method", method.Name,
		"args", args,
	)

	newActResult, err := msgServer.NewAction(ctx, msgNewAction)
	if err != nil {
		return nil, err
	}

	if err := p.tryVoteAsSender(ctx, msgServer, newActResult.Id, caller); err != nil {
		return nil, err
	}

	if err = p.eventsRegistry.EmitEvents(ctx, stateDB, &origin); err != nil {
		return nil, err
	}

	return method.Outputs.Pack(true)
}
