package act

import (
	"fmt"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/vm"
	cmn "github.com/evmos/evmos/v18/precompiles/common"
	precommon "github.com/warden-protocol/wardenprotocol/precompiles/common"
	actmodulekeeper "github.com/warden-protocol/wardenprotocol/warden/x/act/keeper"
	types "github.com/warden-protocol/wardenprotocol/warden/x/act/types/v1beta1"
)

const (
	CheckActionMethod    = "checkAction"
	NewTemplateMethod    = "newTemplate"
	RevokeActionMethod   = "revokeAction"
	UpdateTemplateMethod = "updateTemplate"
	VoteForActionMethod  = "voteForAction"
)

func (p Precompile) CheckActionMethod(
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
		"args", fmt.Sprintf(
			"{ action_id: %d, creator: %s }",
			message.ActionId,
			message.Creator,
		),
	)

	response, err := msgServer.CheckAction(ctx, message)

	if err != nil {
		return nil, err
	}

	// TODO AT: Add event

	return method.Outputs.Pack(response.Status)
}

func newMsgCheckAction(args []interface{}, origin common.Address) (*types.MsgCheckAction, error) {
	if len(args) != 1 {
		return nil, fmt.Errorf(cmn.ErrInvalidNumberOfArgs, 1, len(args))
	}

	authority := precommon.Bech32StrFromAddress(origin)

	return &types.MsgCheckAction{
		Creator:  authority,
		ActionId: args[0].(uint64),
	}, nil
}

func (p Precompile) NewTemplateMethod(
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
		"args", fmt.Sprintf(
			"{ creator: %d, name: %s, definition: %s }",
			message.Creator,
			message.Name,
			message.Definition,
		),
	)

	response, err := msgServer.NewTemplate(ctx, message)

	if err != nil {
		return nil, err
	}

	// TODO AT: Add event

	return method.Outputs.Pack(response.Id)
}

func newMsgNewTemplate(args []interface{}, origin common.Address) (*types.MsgNewTemplate, error) {
	if len(args) != 2 {
		return nil, fmt.Errorf(cmn.ErrInvalidNumberOfArgs, 2, len(args))
	}

	authority := precommon.Bech32StrFromAddress(origin)
	name := args[0].(string)
	definition := args[1].(string)

	return &types.MsgNewTemplate{
		Creator:    authority,
		Name:       name,
		Definition: definition,
	}, nil
}

func (p Precompile) RevokeActionMethod(
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
		"args", fmt.Sprintf(
			"{ action_id: %d, creator: %s }",
			message.ActionId,
			message.Creator,
		),
	)

	_, err = msgServer.RevokeAction(ctx, message)
	if err != nil {
		return nil, err
	}

	// TODO AT: Add event

	// TODO AT: What to return
	return method.Outputs.Pack(true)
}

func newMsgRevokeAction(args []interface{}, origin common.Address) (*types.MsgRevokeAction, error) {
	if len(args) != 1 {
		return nil, fmt.Errorf(cmn.ErrInvalidNumberOfArgs, 1, len(args))
	}

	authority := precommon.Bech32StrFromAddress(origin)

	return &types.MsgRevokeAction{
		Creator:  authority,
		ActionId: args[0].(uint64),
	}, nil
}

func (p Precompile) UpdateTemplateMethod(
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
		"args", fmt.Sprintf(
			"{ creator: %s, template_id: %s, name: %s, definition: %s }",
			message.Creator,
			message.Id,
			message.Name,
			message.Definition,
		),
	)

	_, err = msgServer.UpdateTemplate(ctx, message)
	if err != nil {
		return nil, err
	}

	// TODO AT: Add event

	return method.Outputs.Pack(true)
}

func newMsgUpdateTemplate(args []interface{}, origin common.Address) (*types.MsgUpdateTemplate, error) {
	if len(args) != 3 {
		return nil, fmt.Errorf(cmn.ErrInvalidNumberOfArgs, 3, len(args))
	}

	authority := precommon.Bech32StrFromAddress(origin)
	templateId := args[0].(uint64)
	name := args[1].(string)
	definition := args[2].(string)

	return &types.MsgUpdateTemplate{
		Creator:    authority,
		Id:         templateId,
		Name:       name,
		Definition: definition,
	}, nil
}

func (p Precompile) VoteForActionMethod(
	ctx sdk.Context,
	origin common.Address,
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
		"args", fmt.Sprintf(
			"{ participant: %d, action_id: %s, vote_type: %v }",
			message.Participant,
			message.ActionId,
			message.VoteType,
		),
	)

	response, err := msgServer.VoteForAction(ctx, message)

	if err != nil {
		return nil, err
	}

	// TODO AT: Add event

	return method.Outputs.Pack(response.Status)
}

func newMsgVoteForAction(args []interface{}, origin common.Address) (*types.MsgVoteForAction, error) {
	if len(args) != 1 {
		return nil, fmt.Errorf(cmn.ErrInvalidNumberOfArgs, 1, len(args))
	}

	authority := precommon.Bech32StrFromAddress(origin)
	actionId := args[0].(uint64)
	voteType := args[1].(types.ActionVoteType)

	return &types.MsgVoteForAction{
		Participant: authority,
		ActionId:    actionId,
		VoteType:    voteType,
	}, nil
}
