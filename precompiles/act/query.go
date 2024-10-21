package act

import (
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/evmos/evmos/v20/x/evm/core/vm"

	precommon "github.com/warden-protocol/wardenprotocol/precompiles/common"
	actmodulekeeper "github.com/warden-protocol/wardenprotocol/warden/x/act/keeper"
	types "github.com/warden-protocol/wardenprotocol/warden/x/act/types/v1beta1"
)

const (
	ActionsQuery          = "actions"
	ActionByIdQuery       = "actionById"
	ActionsByAddressQuery = "actionsByAddress"
	TemplatesQuery        = "templates"
	TemplateByIdQuery     = "templateById"
)

// ActionsQuery actions query implementation, constructs QueryActionsRequest from args, passes it to query server and packs response into corresponding abi output.
func (p *Precompile) ActionsQuery(
	ctx sdk.Context,
	_ *vm.Contract,
	method *abi.Method,
	args []interface{},
) ([]byte, error) {
	queryServer := actmodulekeeper.NewQueryServerImpl(p.actmodulekeeper)

	req, err := newActionsQuery(method, args)
	if err != nil {
		return nil, err
	}

	res, err := queryServer.Actions(ctx, req)
	if err != nil {
		return nil, err
	}

	out, err := new(ActionsResponse).FromResponse(res)
	if err != nil {
		return nil, err
	}

	return method.Outputs.Pack(out)
}

func newActionsQuery(method *abi.Method, args []interface{}) (*types.QueryActionsRequest, error) {
	if len(args) != 1 {
		return nil, precommon.WrongArgsNumber{Expected: 1, Got: len(args)}
	}

	var input ActionsInput
	if err := method.Inputs.Copy(&input, args); err != nil {
		return nil, fmt.Errorf("error while unpacking args to ActionsInput struct: %w", err)
	}

	precommon.ClearPaginationKey(&input.Pagination)

	return &types.QueryActionsRequest{
		Pagination: &input.Pagination,
	}, nil
}

// ActionByIdQuery is actionById query implementation, constructs QueryActionByIdRequest from args, passes it to query server and packs response into corresponding abi output.
func (p *Precompile) ActionByIdQuery(
	ctx sdk.Context,
	_ *vm.Contract,
	method *abi.Method,
	args []interface{},
) ([]byte, error) {
	queryServer := actmodulekeeper.NewQueryServerImpl(p.actmodulekeeper)

	req, err := newActionByIdQuery(args)
	if err != nil {
		return nil, err
	}

	res, err := queryServer.ActionById(ctx, req)
	if err != nil {
		return nil, err
	}

	out, err := new(ActionByIdResponse).FromResponse(res)
	if err != nil {
		return nil, err
	}

	return method.Outputs.Pack(out)
}

func newActionByIdQuery(args []interface{}) (*types.QueryActionByIdRequest, error) {
	if len(args) != 1 {
		return nil, precommon.WrongArgsNumber{Expected: 1, Got: len(args)}
	}

	actionId, ok := args[0].(uint64)
	if !ok {
		return nil, fmt.Errorf("expected uint64 for actionId, got %T", args[0])
	}

	return &types.QueryActionByIdRequest{
		Id: actionId,
	}, nil
}

// ActionsByAddressQuery is actionsByAddress query implementation, Constructs QueryActionsByAddressRequest from args, passes it to query server and packs response into corresponding abi output.
func (p *Precompile) ActionsByAddressQuery(
	ctx sdk.Context,
	_ *vm.Contract,
	method *abi.Method,
	args []interface{},
) ([]byte, error) {
	queryServer := actmodulekeeper.NewQueryServerImpl(p.actmodulekeeper)

	req, err := newActionsByAddressQuery(method, args)
	if err != nil {
		return nil, err
	}

	res, err := queryServer.ActionsByAddress(ctx, req)
	if err != nil {
		return nil, err
	}

	out, err := new(ActionsByAddressResponse).FromResponse(res)
	if err != nil {
		return nil, err
	}

	return method.Outputs.Pack(out)
}

func newActionsByAddressQuery(method *abi.Method, args []interface{}) (*types.QueryActionsByAddressRequest, error) {
	if len(args) != 3 {
		return nil, precommon.WrongArgsNumber{Expected: 3, Got: len(args)}
	}

	var input ActionsByAddressInput
	if err := method.Inputs.Copy(&input, args); err != nil {
		return nil, fmt.Errorf("error while unpacking args to ActionsByAddressInput struct: %w", err)
	}

	precommon.ClearPaginationKey(&input.Pagination)

	return &types.QueryActionsByAddressRequest{
		Pagination: &input.Pagination,
		Address:    precommon.Bech32StrFromAddress(input.Address),
		Status:     types.ActionStatus(input.Status),
	}, nil
}

// TemplatesQuery is templates query implementation, constructs QueryTemplatesRequest from args, passes it to query server and packs response into corresponding abi output.
func (p *Precompile) TemplatesQuery(
	ctx sdk.Context,
	_ *vm.Contract,
	method *abi.Method,
	args []interface{},
) ([]byte, error) {
	queryServer := actmodulekeeper.NewQueryServerImpl(p.actmodulekeeper)

	req, err := newTemplatesQuery(method, args)
	if err != nil {
		return nil, err
	}

	res, err := queryServer.Templates(ctx, req)
	if err != nil {
		return nil, err
	}

	out, err := new(TemplatesResponse).FromResponse(res)
	if err != nil {
		return nil, err
	}

	return method.Outputs.Pack(out)
}

func newTemplatesQuery(method *abi.Method, args []interface{}) (*types.QueryTemplatesRequest, error) {
	if len(args) != 1 {
		return nil, precommon.WrongArgsNumber{Expected: 1, Got: len(args)}
	}

	var input TemplatesInput
	if err := method.Inputs.Copy(&input, args); err != nil {
		return nil, fmt.Errorf("error while unpacking args to TemplatesInput struct: %w", err)
	}

	precommon.ClearPaginationKey(&input.Pagination)

	return &types.QueryTemplatesRequest{
		Pagination: &input.Pagination,
		Creator:    input.Creator,
	}, nil
}

// TemplateByIdQuery is templateById query implementation, constructs QueryTemplateByIdRequest from args, passes it to query server and packs response into corresponding abi output.
func (p *Precompile) TemplateByIdQuery(
	ctx sdk.Context,
	_ *vm.Contract,
	method *abi.Method,
	args []interface{},
) ([]byte, error) {
	queryServer := actmodulekeeper.NewQueryServerImpl(p.actmodulekeeper)

	req, err := newTemplateByIdQuery(args)
	if err != nil {
		return nil, err
	}

	res, err := queryServer.TemplateById(ctx, req)
	if err != nil {
		return nil, err
	}

	out, err := new(TemplateByIdResponse).FromResponse(res)
	if err != nil {
		return nil, err
	}

	return method.Outputs.Pack(out)
}

func newTemplateByIdQuery(args []interface{}) (*types.QueryTemplateByIdRequest, error) {
	if len(args) != 1 {
		return nil, precommon.WrongArgsNumber{Expected: 1, Got: len(args)}
	}

	templateId, ok := args[0].(uint64)
	if !ok {
		return nil, fmt.Errorf("expected uint64 for templateId, got %T", args[0])
	}

	return &types.QueryTemplateByIdRequest{
		Id: templateId,
	}, nil
}
