package async

import (
	"errors"
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/query"
	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/common"

	wardencommon "github.com/warden-protocol/wardenprotocol/precompiles/common"
	types "github.com/warden-protocol/wardenprotocol/warden/x/async/types/v1beta1"
)

const (
	PluginsMethod      = "plugins"
	TaskByIdMethod     = "taskById"
	TasksMethod        = "tasks"
	PendingTasksMethod = "pendingTasks"
)

func (p Precompile) PluginsMethod(
	ctx sdk.Context,
	method *abi.Method,
	args []any,
) ([]byte, error) {
	req, err := newPluginsRequest(method, args)
	if err != nil {
		return nil, err
	}

	response, err := p.queryServer.Plugins(ctx, req)
	if err != nil {
		return nil, err
	}

	if response == nil {
		return nil, errors.New("received nil response from query server")
	}

	out, err := new(PluginsResponse).FromResponse(response)
	if err != nil {
		return nil, err
	}

	return method.Outputs.Pack(out)
}

func newPluginsRequest(method *abi.Method, args []any) (*types.QueryPluginsRequest, error) {
	if len(args) != 1 {
		return nil, wardencommon.WrongArgsNumber{Expected: 1, Got: len(args)}
	}

	var input pluginsInput
	if err := method.Inputs.Copy(&input, args); err != nil {
		return nil, fmt.Errorf("error while unpacking args: %w", err)
	}

	return &types.QueryPluginsRequest{
		Pagination: &input.PageRequest,
	}, nil
}

type pluginsInput struct {
	PageRequest query.PageRequest `abi:"pagination"`
}

// TaskByIdMethod constructs QueryTaskByIdRequest from args, passes it to query server and packs response into corresponding abi output.
func (p Precompile) TaskByIdMethod(
	ctx sdk.Context,
	method *abi.Method,
	args []interface{},
) ([]byte, error) {
	req, err := newTaskByIdRequest(method, args)
	if err != nil {
		return nil, err
	}

	response, err := p.queryServer.TaskById(ctx, req)
	if err != nil {
		return nil, err
	}

	if response == nil {
		return nil, errors.New("received nil response from query server")
	}

	out, err := new(TaskByIdResponse).FromResponse(response)
	if err != nil {
		return nil, err
	}

	return method.Outputs.Pack(out)
}

func newTaskByIdRequest(method *abi.Method, args []interface{}) (*types.QueryTaskByIdRequest, error) {
	if len(args) != 1 {
		return nil, wardencommon.WrongArgsNumber{Expected: 1, Got: len(args)}
	}

	var input taskByIdInput
	if err := method.Inputs.Copy(&input, args); err != nil {
		return nil, fmt.Errorf("error while unpacking args to taskByIdInput struct: %w", err)
	}

	return &types.QueryTaskByIdRequest{
		Id: input.Id,
	}, nil
}

type taskByIdInput struct {
	Id uint64
}

// TasksMethod constructs QueryTasksRequest from args, passes it to query server and packs response into corresponding abi output.
func (p Precompile) TasksMethod(
	ctx sdk.Context,
	method *abi.Method,
	args []interface{},
) ([]byte, error) {
	req, err := newTasksRequest(method, args)
	if err != nil {
		return nil, err
	}

	response, err := p.queryServer.Tasks(ctx, req)
	if err != nil {
		return nil, err
	}

	if response == nil {
		return nil, errors.New("received nil response from query server")
	}

	out, err := new(TasksResponse).FromResponse(response)
	if err != nil {
		return nil, err
	}

	return method.Outputs.Pack(out)
}

func newTasksRequest(method *abi.Method, args []interface{}) (*types.QueryTasksRequest, error) {
	if len(args) != 2 {
		return nil, wardencommon.WrongArgsNumber{Expected: 2, Got: len(args)}
	}

	var input tasksInput
	if err := method.Inputs.Copy(&input, args); err != nil {
		return nil, fmt.Errorf("error while unpacking args to tasksInput struct: %w", err)
	}

	var creator string
	if input.Creator == (common.Address{}) {
		creator = ""
	} else {
		creator = wardencommon.Bech32StrFromAddress(input.Creator)
	}

	return &types.QueryTasksRequest{
		Pagination: &input.PageRequest,
		Creator:    creator,
	}, nil
}

type tasksInput struct {
	PageRequest query.PageRequest `abi:"pagination"`
	Creator     common.Address    `abi:"creator"`
}

// PendingTasksMethod constructs QueryPendingTasksRequest from args, passes it to query server and packs response into corresponding abi output.
func (p Precompile) PendingTasksMethod(
	ctx sdk.Context,
	method *abi.Method,
	args []interface{},
) ([]byte, error) {
	req, err := newPendingTasksRequest(method, args)
	if err != nil {
		return nil, err
	}

	response, err := p.queryServer.PendingTasks(ctx, req)
	if err != nil {
		return nil, err
	}

	if response == nil {
		return nil, errors.New("received nil response from query server")
	}

	out, err := new(PendingTasksResponse).FromResponse(response)
	if err != nil {
		return nil, err
	}

	return method.Outputs.Pack(out)
}

func newPendingTasksRequest(method *abi.Method, args []interface{}) (*types.QueryPendingTasksRequest, error) {
	if len(args) != 1 {
		return nil, wardencommon.WrongArgsNumber{Expected: 1, Got: len(args)}
	}

	var input pendingTasksInput
	if err := method.Inputs.Copy(&input, args); err != nil {
		return nil, fmt.Errorf("error while unpacking args to pendingTasksInput struct: %w", err)
	}

	return &types.QueryPendingTasksRequest{
		Pagination: &input.PageRequest,
	}, nil
}

type pendingTasksInput struct {
	PageRequest query.PageRequest `abi:"pagination"`
}
