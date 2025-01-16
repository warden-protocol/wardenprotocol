package async

import (
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/common"
	"github.com/evmos/evmos/v20/x/evm/core/vm"

	precommon "github.com/warden-protocol/wardenprotocol/precompiles/common"
	actmodulekeeper "github.com/warden-protocol/wardenprotocol/warden/x/async/keeper"
	acttypes "github.com/warden-protocol/wardenprotocol/warden/x/async/types/v1beta1"
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

func newMsgAddFuture(args []interface{}, origin common.Address, method *abi.Method) (*acttypes.MsgAddFuture, error) {
	if len(args) != 2 {
		return nil, precommon.WrongArgsNumber{Expected: 2, Got: len(args)}
	}

	authority := precommon.Bech32StrFromAddress(origin)

	var input addFutureInput
	if err := method.Inputs.Copy(&input, args); err != nil {
		return nil, fmt.Errorf("error while unpacking args to addFutureInput struct: %w", err)
	}

	return &acttypes.MsgAddFuture{
		Creator: authority,
		Input:   input.Input,
		Handler: input.Handler,
	}, nil
}

type addFutureInput struct {
	Handler string
	Input   []byte
}
