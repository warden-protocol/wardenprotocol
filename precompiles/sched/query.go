package sched

import (
	"errors"
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/query"
	"github.com/ethereum/go-ethereum/accounts/abi"

	wardencommon "github.com/warden-protocol/wardenprotocol/precompiles/common"
	types "github.com/warden-protocol/wardenprotocol/warden/x/sched/types/v1beta1"
)

const (
	CallbackByIdMethod = "callbackById"
	CallbacksMethod    = "callbacks"
	GetAddressMethod   = "getAddress"
)

func (p Precompile) CallbackByIdMethod(
	ctx sdk.Context,
	method *abi.Method,
	args []any,
) ([]byte, error) {
	req, err := newCallbackByIdRequest(method, args)
	if err != nil {
		return nil, err
	}

	response, err := p.queryServer.CallbackById(ctx, req)
	if err != nil {
		return nil, err
	}

	if response == nil {
		return nil, errors.New("received nil response from query server")
	}

	out, err := new(CallbackByIdResponse).FromResponse(response)
	if err != nil {
		return nil, err
	}

	return method.Outputs.Pack(out)
}

func newCallbackByIdRequest(method *abi.Method, args []any) (*types.QueryCallbackByIdRequest, error) {
	if len(args) != 1 {
		return nil, wardencommon.WrongArgsNumber{Expected: 1, Got: len(args)}
	}

	var input callbackByIdInput
	if err := method.Inputs.Copy(&input, args); err != nil {
		return nil, fmt.Errorf("error while unpacking args to callbackByIdInput struct: %w", err)
	}

	return &types.QueryCallbackByIdRequest{
		Id: input.Id,
	}, nil
}

type callbackByIdInput struct {
	Id uint64
}

func (p Precompile) CallbacksMethod(
	ctx sdk.Context,
	method *abi.Method,
	args []any,
) ([]byte, error) {
	req, err := newCallbacksRequest(method, args)
	if err != nil {
		return nil, err
	}

	response, err := p.queryServer.Callbacks(ctx, req)
	if err != nil {
		return nil, err
	}

	if response == nil {
		return nil, errors.New("received nil response from query server")
	}

	out, err := new(CallbacksResponse).FromResponse(response)
	if err != nil {
		return nil, err
	}

	return method.Outputs.Pack(out)
}

func newCallbacksRequest(method *abi.Method, args []any) (*types.QueryCallbacksRequest, error) {
	if len(args) != 1 {
		return nil, wardencommon.WrongArgsNumber{Expected: 1, Got: len(args)}
	}

	var input callbacksInput
	if err := method.Inputs.Copy(&input, args); err != nil {
		return nil, fmt.Errorf("error while unpacking args to callbacksInput struct: %w", err)
	}

	return &types.QueryCallbacksRequest{
		Pagination: &input.PageRequest,
	}, nil
}

type callbacksInput struct {
	PageRequest query.PageRequest `abi:"pagination"`
}

func (p Precompile) GetAddressMethod(
	ctx sdk.Context,
	method *abi.Method,
	args []any,
) ([]byte, error) {
	if len(args) != 0 {
		return nil, wardencommon.WrongArgsNumber{Expected: 0, Got: len(args)}
	}

	sdkAddress := p.schedKeeper.GetModuleAddress()

	address, err := wardencommon.AddressFromBech32Str(sdkAddress.String())

	if err != nil {
		return nil, err
	}

	return method.Outputs.Pack(address)
}
