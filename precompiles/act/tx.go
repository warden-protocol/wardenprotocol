package act

import (
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/evm/x/vm/core/vm"
	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/common"

	precommon "github.com/warden-protocol/wardenprotocol/precompiles/common"
	actmodulekeeper "github.com/warden-protocol/wardenprotocol/warden/x/act/keeper"
	acttypes "github.com/warden-protocol/wardenprotocol/warden/x/act/types/v1beta1"
)

const (
	CheckActionMethod    = "checkAction"
	NewTemplateMethod    = "newTemplate"
	RevokeActionMethod   = "revokeAction"
	UpdateTemplateMethod = "updateTemplate"
	VoteForActionMethod  = "voteForAction"
)

// CheckActionMethod constructs MsgCheckAction from args, passes it to msg server and packs corresponding abi output.
func (p *Precompile) CheckActionMethod(
	ctx sdk.Context,
	origin common.Address,
	stateDB vm.StateDB,
	method *abi.Method,
	args []interface{},
) ([]byte, error) {
	msgServer := actmodulekeeper.NewMsgServerImpl(p.actmodulekeeper)

	message, err := newMsgCheckAction(args, origin)
	if err != nil {
		return nil, err
	}

	p.Logger(ctx).Debug(
		"tx called",
		"method", method.Name,
		"args", args,
	)

	response, err := msgServer.CheckAction(ctx, message)
	if err != nil {
		return nil, err
	}

	if err = p.eventsRegistry.EmitEvents(ctx, stateDB, &origin); err != nil {
		return nil, err
	}

	return method.Outputs.Pack(response.Status)
}

func newMsgCheckAction(args []interface{}, origin common.Address) (*acttypes.MsgCheckAction, error) {
	if len(args) != 1 {
		return nil, precommon.WrongArgsNumber{Expected: 1, Got: len(args)}
	}

	authority := precommon.Bech32StrFromAddress(origin)

	actionId, ok := args[0].(uint64)
	if !ok {
		return nil, fmt.Errorf("expected uint64 for actionId, got %T", args[0])
	}

	return &acttypes.MsgCheckAction{
		Creator:  authority,
		ActionId: actionId,
	}, nil
}

// NewTemplateMethod constructs MsgNewTemplate from args, passes it to msg server and packs corresponding abi output.
func (p *Precompile) NewTemplateMethod(
	ctx sdk.Context,
	origin common.Address,
	stateDB vm.StateDB,
	method *abi.Method,
	args []interface{},
) ([]byte, error) {
	msgServer := actmodulekeeper.NewMsgServerImpl(p.actmodulekeeper)

	message, err := newMsgNewTemplate(args, origin)
	if err != nil {
		return nil, err
	}

	p.Logger(ctx).Debug(
		"tx called",
		"method", method.Name,
		"args", args,
	)

	response, err := msgServer.NewTemplate(ctx, message)
	if err != nil {
		return nil, err
	}

	if err = p.eventsRegistry.EmitEvents(ctx, stateDB, &origin); err != nil {
		return nil, err
	}

	return method.Outputs.Pack(response.Id)
}

func newMsgNewTemplate(args []interface{}, origin common.Address) (*acttypes.MsgNewTemplate, error) {
	if len(args) != 2 {
		return nil, precommon.WrongArgsNumber{Expected: 2, Got: len(args)}
	}

	authority := precommon.Bech32StrFromAddress(origin)

	name, ok := args[0].(string)
	if !ok {
		return nil, fmt.Errorf("expected string for name, got %T", args[0])
	}

	definition, ok := args[1].(string)
	if !ok {
		return nil, fmt.Errorf("expected string for definition, got %T", args[1])
	}

	return &acttypes.MsgNewTemplate{
		Creator:    authority,
		Name:       name,
		Definition: definition,
	}, nil
}

// RevokeActionMethod constructs MsgRevokeAction from args, passes it to msg server and packs corresponding abi output.
func (p *Precompile) RevokeActionMethod(
	ctx sdk.Context,
	origin common.Address,
	stateDB vm.StateDB,
	method *abi.Method,
	args []interface{},
) ([]byte, error) {
	msgServer := actmodulekeeper.NewMsgServerImpl(p.actmodulekeeper)

	message, err := newMsgRevokeAction(args, origin)
	if err != nil {
		return nil, err
	}

	p.Logger(ctx).Debug(
		"tx called",
		"method", method.Name,
		"args", args,
	)

	_, err = msgServer.RevokeAction(ctx, message)
	if err != nil {
		return nil, err
	}

	if err = p.eventsRegistry.EmitEvents(ctx, stateDB, &origin); err != nil {
		return nil, err
	}

	return method.Outputs.Pack(true)
}

func newMsgRevokeAction(args []interface{}, origin common.Address) (*acttypes.MsgRevokeAction, error) {
	if len(args) != 1 {
		return nil, precommon.WrongArgsNumber{Expected: 1, Got: len(args)}
	}

	authority := precommon.Bech32StrFromAddress(origin)

	actionId, ok := args[0].(uint64)
	if !ok {
		return nil, fmt.Errorf("expected uint64 for actionId, got %T", args[0])
	}

	return &acttypes.MsgRevokeAction{
		Creator:  authority,
		ActionId: actionId,
	}, nil
}

// UpdateTemplateMethod constructs MsgUpdateTemplate from args, passes it to msg server and packs corresponding abi output.
func (p *Precompile) UpdateTemplateMethod(
	ctx sdk.Context,
	origin common.Address,
	stateDB vm.StateDB,
	method *abi.Method,
	args []interface{},
) ([]byte, error) {
	msgServer := actmodulekeeper.NewMsgServerImpl(p.actmodulekeeper)

	message, err := newMsgUpdateTemplate(args, origin)
	if err != nil {
		return nil, err
	}

	p.Logger(ctx).Debug(
		"tx called",
		"method", method.Name,
		"args", args,
	)

	_, err = msgServer.UpdateTemplate(ctx, message)
	if err != nil {
		return nil, err
	}

	if err = p.eventsRegistry.EmitEvents(ctx, stateDB, &origin); err != nil {
		return nil, err
	}

	return method.Outputs.Pack(true)
}

func newMsgUpdateTemplate(args []interface{}, origin common.Address) (*acttypes.MsgUpdateTemplate, error) {
	if len(args) != 3 {
		return nil, precommon.WrongArgsNumber{Expected: 3, Got: len(args)}
	}

	authority := precommon.Bech32StrFromAddress(origin)

	templateId, ok := args[0].(uint64)
	if !ok {
		return nil, fmt.Errorf("expected uint64 for templateId, got %T", args[0])
	}

	name, ok := args[1].(string)
	if !ok {
		return nil, fmt.Errorf("expected string for name, got %T", args[1])
	}

	definition, ok := args[2].(string)
	if !ok {
		return nil, fmt.Errorf("expected string for definition, got %T", args[2])
	}

	return &acttypes.MsgUpdateTemplate{
		Creator:    authority,
		Id:         templateId,
		Name:       name,
		Definition: definition,
	}, nil
}

// VoteForActionMethod constructs MsgVoteForAction from args, passes it to msg server and packs corresponding abi output.
func (p *Precompile) VoteForActionMethod(
	ctx sdk.Context,
	origin common.Address,
	caller common.Address,
	stateDB vm.StateDB,
	method *abi.Method,
	args []interface{},
) ([]byte, error) {
	msgServer := actmodulekeeper.NewMsgServerImpl(p.actmodulekeeper)

	message, err := newMsgVoteForAction(args, origin)
	if err != nil {
		return nil, err
	}

	p.Logger(ctx).Debug(
		"tx called",
		"method", method.Name,
		"args", args,
	)

	response, err := msgServer.VoteForAction(ctx, message)
	if err != nil {
		return nil, err
	}

	if err := p.tryVoteAsSender(ctx, msgServer, message.ActionId, caller); err != nil {
		return nil, err
	}

	if err = p.eventsRegistry.EmitEvents(ctx, stateDB, &origin); err != nil {
		return nil, err
	}

	return method.Outputs.Pack(response.Status)
}

func newMsgVoteForAction(args []interface{}, origin common.Address) (*acttypes.MsgVoteForAction, error) {
	if len(args) != 2 {
		return nil, precommon.WrongArgsNumber{Expected: 2, Got: len(args)}
	}

	authority := precommon.Bech32StrFromAddress(origin)

	actionId, ok := args[0].(uint64)
	if !ok {
		return nil, fmt.Errorf("expected uint64 for actionId, got %T", args[0])
	}

	voteType, ok := args[1].(uint8)
	if !ok {
		return nil, fmt.Errorf("expected uint8 for voteType, got %T", args[1])
	}

	return &acttypes.MsgVoteForAction{
		Participant: authority,
		ActionId:    actionId,
		VoteType:    acttypes.ActionVoteType(voteType),
	}, nil
}

// tryVoteAsSender attempts to vote for an action as the sender of the action.
// This is useful if the contract attempts to vote for an action.
// If the action is not in the pending state, this function does nothing.
// If the action is in the pending state, it attempts to vote for the action
// with an approved vote type. If the vote is successful, this function returns
// nil. If the vote fails, this function returns the error.
func (p Precompile) tryVoteAsSender(
	ctx sdk.Context,
	msgServer acttypes.MsgServer,
	actionId uint64,
	caller common.Address,
) error {
	actionResponse, err := p.queryServer.ActionById(ctx, &acttypes.QueryActionByIdRequest{
		Id: actionId,
	})
	if err != nil {
		return err
	}

	action := actionResponse.Action

	if action.GetStatus() != acttypes.ActionStatus_ACTION_STATUS_PENDING {
		return nil
	}

	participant := precommon.Bech32StrFromAddress(caller)

	_, err = msgServer.VoteForAction(ctx, &acttypes.MsgVoteForAction{
		Participant: participant,
		ActionId:    action.GetId(),
		VoteType:    acttypes.ActionVoteType_VOTE_TYPE_APPROVED,
	})
	if err != nil {
		return err
	}

	return nil
}
