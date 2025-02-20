package async

import (
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/common"
	"github.com/evmos/evmos/v20/x/evm/core/vm"

	precommon "github.com/warden-protocol/wardenprotocol/precompiles/common"
	actmodulekeeper "github.com/warden-protocol/wardenprotocol/warden/x/async/keeper"
	asynctypes "github.com/warden-protocol/wardenprotocol/warden/x/async/types/v1beta1"
)

const (
	AddFutureMethod = "addFuture"
)

// AddFutureMethod constructs MsgAddFuture from args, passes it to msg server and packs corresponding abi output.
func (p *Precompile) AddFutureMethod(
	ctx sdk.Context,
	origin common.Address,
	stateDB vm.StateDB,
	method *abi.Method,
	args []interface{},
) ([]byte, error) {
	msgServer := actmodulekeeper.NewMsgServerImpl(p.asyncmodulekeeper)
	message, err := newMsgAddFuture(args, origin, method)

	if err != nil {
		return nil, err
	}

	p.Logger(ctx).Debug(
		"tx called",
		"method", method.Name,
		"args", args,
	)

	response, err := msgServer.AddFuture(ctx, message)
	if err != nil {
		return nil, err
	}

	if err = p.eventsRegistry.EmitEvents(ctx, stateDB, &origin); err != nil {
		return nil, err
	}

	return method.Outputs.Pack(response.Id)
}

func newMsgAddFuture(args []interface{}, origin common.Address, method *abi.Method) (*asynctypes.MsgAddFuture, error) {
	if len(args) != 3 {
		return nil, precommon.WrongArgsNumber{Expected: 3, Got: len(args)}
	}

	authority := precommon.Bech32StrFromAddress(origin)

	handler, ok := args[0].(string)
	if !ok {
		return nil, fmt.Errorf("expected string for handler, got %T", args[0])
	}

	input, ok := args[1].([]byte)
	if !ok {
		return nil, fmt.Errorf("expected []byte for input, got %T", args[1])
	}

	callbackAddressEth, ok := args[2].(common.Address)
	if !ok {
		return nil, fmt.Errorf("expected string for callback address, got %T", args[2])
	}

	var callbackAddress string
	if callbackAddressEth.String() == "0x0000000000000000000000000000000000000000" {
		callbackAddress = ""
	} else {
		callbackAddress = precommon.Bech32StrFromAddress(callbackAddressEth)
	}

	return &asynctypes.MsgAddFuture{
		Creator:  authority,
		Input:    input,
		Handler:  handler,
		Callback: callbackAddress,
	}, nil
}
