package slinky

import (
	"errors"
	"fmt"
	"math/big"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/vm"

	slinkytypes "github.com/warden-protocol/connect/pkg/types"
	oracletypes "github.com/warden-protocol/connect/x/oracle/types"

	wardencommon "github.com/warden-protocol/wardenprotocol/precompiles/common"
)

const (
	GetPrice = "getPrice"
)

// GetPriceQuery constructs GetPriceRequest from args, passes it to query server and packs response into corresponding abi output.
func (p Precompile) GetPriceQuery(
	ctx sdk.Context,
	origin common.Address,
	stateDB vm.StateDB,
	method *abi.Method,
	args []interface{},
) ([]byte, error) {
	req, err := newGetPriceRequest(method, args)
	if err != nil {
		return nil, err
	}

	response, err := p.queryServer.GetPrice(ctx, req)
	if err != nil {
		return nil, err
	}

	if response == nil {
		return nil, errors.New("received nil response from query server")
	}

	out, err := new(GetPriceResponse).FromResponse(response)
	if err != nil {
		return nil, err
	}

	packedOutput, err := method.Outputs.Pack(out)
	if err != nil {
		return nil, fmt.Errorf("failed to pack output: %w", err)
	}

	return packedOutput, nil
}

func (o *GetPriceResponse) FromResponse(res *oracletypes.GetPriceResponse) (*GetPriceResponse, error) {
	if res.Price == nil {
		return nil, errors.New("received nil price in get price response")
	}

	o.Id = res.Id
	o.Nonce = res.Nonce
	o.Decimals = res.Decimals
	o.Price = QuotePrice{
		BlockHeight:    res.Price.BlockHeight,
		Price:          res.Price.Price.BigInt(),
		BlockTimestamp: big.NewInt(res.Price.BlockTimestamp.Unix()),
	}

	return o, nil
}

func newGetPriceRequest(method *abi.Method, args []interface{}) (*oracletypes.GetPriceRequest, error) {
	if len(args) != 2 {
		return nil, wardencommon.WrongArgsNumber{Expected: 2, Got: len(args)}
	}

	var input struct {
		Base  string
		Quote string
	}

	if err := method.Inputs.Copy(&input, args); err != nil {
		return nil, fmt.Errorf("failed to unpack arguments into get price input: %w", err)
	}

	return &oracletypes.GetPriceRequest{
		CurrencyPair: slinkytypes.CurrencyPair{Base: input.Base, Quote: input.Quote},
	}, nil
}
