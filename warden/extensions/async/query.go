package async

import (
	"errors"
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/query"
	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/common"

	wardencommon "github.com/warden-protocol/wardenprotocol/warden/extensions/common"
	types "github.com/warden-protocol/wardenprotocol/warden/x/async/types/v1beta1"
)

const (
	FutureByIdMethod     = "futureById"
	FuturesMethod        = "futures"
	PendingFuturesMethod = "pendingFutures"
)

// FutureByIdMethod constructs QueryFutureByIdRequest from args, passes it to query server and packs response into corresponding abi output.
func (p Precompile) FutureByIdMethod(
	ctx sdk.Context,
	method *abi.Method,
	args []interface{},
) ([]byte, error) {
	req, err := newFutureByIdRequest(method, args)
	if err != nil {
		return nil, err
	}

	response, err := p.queryServer.FutureById(ctx, req)
	if err != nil {
		return nil, err
	}

	if response == nil {
		return nil, errors.New("received nil response from query server")
	}

	out, err := new(FutureByIdResponse).FromResponse(response)
	if err != nil {
		return nil, err
	}

	return method.Outputs.Pack(out)
}

func newFutureByIdRequest(method *abi.Method, args []interface{}) (*types.QueryFutureByIdRequest, error) {
	if len(args) != 1 {
		return nil, wardencommon.WrongArgsNumber{Expected: 1, Got: len(args)}
	}

	var input futureByIdInput
	if err := method.Inputs.Copy(&input, args); err != nil {
		return nil, fmt.Errorf("error while unpacking args to futureByIdInput struct: %w", err)
	}

	return &types.QueryFutureByIdRequest{
		Id: input.Id,
	}, nil
}

type futureByIdInput struct {
	Id uint64
}

// FuturesMethod constructs QueryFuturesRequest from args, passes it to query server and packs response into corresponding abi output.
func (p Precompile) FuturesMethod(
	ctx sdk.Context,
	method *abi.Method,
	args []interface{},
) ([]byte, error) {
	req, err := newFuturesRequest(method, args)
	if err != nil {
		return nil, err
	}

	response, err := p.queryServer.Futures(ctx, req)
	if err != nil {
		return nil, err
	}

	if response == nil {
		return nil, errors.New("received nil response from query server")
	}

	out, err := new(FuturesResponse).FromResponse(response)
	if err != nil {
		return nil, err
	}

	return method.Outputs.Pack(out)
}

func newFuturesRequest(method *abi.Method, args []interface{}) (*types.QueryFuturesRequest, error) {
	if len(args) != 2 {
		return nil, wardencommon.WrongArgsNumber{Expected: 2, Got: len(args)}
	}

	var input futuresInput
	if err := method.Inputs.Copy(&input, args); err != nil {
		return nil, fmt.Errorf("error while unpacking args to futuresInput struct: %w", err)
	}

	var creator string
	if input.Creator == (common.Address{}) {
		creator = ""
	} else {
		creator = wardencommon.Bech32StrFromAddress(input.Creator)
	}

	return &types.QueryFuturesRequest{
		Pagination: &input.PageRequest,
		Creator:    creator,
	}, nil
}

type futuresInput struct {
	PageRequest query.PageRequest `abi:"pagination"`
	Creator     common.Address    `abi:"creator"`
}

// PendingFuturesMethod constructs QueryPendingFuturesRequest from args, passes it to query server and packs response into corresponding abi output.
func (p Precompile) PendingFuturesMethod(
	ctx sdk.Context,
	method *abi.Method,
	args []interface{},
) ([]byte, error) {
	req, err := newPendingFuturesRequest(method, args)
	if err != nil {
		return nil, err
	}

	response, err := p.queryServer.PendingFutures(ctx, req)
	if err != nil {
		return nil, err
	}

	if response == nil {
		return nil, errors.New("received nil response from query server")
	}

	out, err := new(PendingFuturesResponse).FromResponse(response)
	if err != nil {
		return nil, err
	}

	return method.Outputs.Pack(out)
}

func newPendingFuturesRequest(method *abi.Method, args []interface{}) (*types.QueryPendingFuturesRequest, error) {
	if len(args) != 1 {
		return nil, wardencommon.WrongArgsNumber{Expected: 1, Got: len(args)}
	}

	var input pendingFuturesInput
	if err := method.Inputs.Copy(&input, args); err != nil {
		return nil, fmt.Errorf("error while unpacking args to pendingFuturesInput struct: %w", err)
	}

	return &types.QueryPendingFuturesRequest{
		Pagination: &input.PageRequest,
	}, nil
}

type pendingFuturesInput struct {
	PageRequest query.PageRequest `abi:"pagination"`
}
