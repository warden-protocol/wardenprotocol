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
	schedtypes "github.com/warden-protocol/wardenprotocol/warden/x/sched/types/v1beta1"
)

const (
	AddTaskMethod = "addTask"
)

// AddTaskMethod constructs MsgAddTask from args, passes it to msg server and packs corresponding abi output.
func (p *Precompile) AddTaskMethod(
	ctx sdk.Context,
	origin common.Address,
	stateDB vm.StateDB,
	method *abi.Method,
	args []interface{},
) ([]byte, error) {
	msgServer := actmodulekeeper.NewMsgServerImpl(p.asyncmodulekeeper)
	message, err := newMsgAddTask(args, origin, method)
	if err != nil {
		return nil, err
	}

	p.Logger(ctx).Debug(
		"tx called",
		"method", method.Name,
		"args", args,
	)

	response, err := msgServer.AddTask(ctx, message)
	if err != nil {
		return nil, err
	}

	if err = p.eventsRegistry.EmitEvents(ctx, stateDB, &origin); err != nil {
		return nil, err
	}

	return method.Outputs.Pack(response.Id)
}

func newMsgAddTask(args []interface{}, origin common.Address, method *abi.Method) (*asynctypes.MsgAddTask, error) {
	if len(args) != 4 {
		return nil, precommon.WrongArgsNumber{Expected: 4, Got: len(args)}
	}

	authority := precommon.Bech32StrFromAddress(origin)

	var input addTaskInput
	if err := method.Inputs.Copy(&input, args); err != nil {
		return nil, fmt.Errorf("error while unpacking args to addTaskInput struct: %w", err)
	}

	var callbackParams *schedtypes.CallbackParams
	if input.CallbackParams.AddressValue.String() != "0x0000000000000000000000000000000000000000" {

		callbackParams = &schedtypes.CallbackParams{
			Address:  precommon.Bech32StrFromAddress(input.CallbackParams.AddressValue),
			GasLimit: input.CallbackParams.GasLimit,
		}
	}

	return &asynctypes.MsgAddTask{
		Creator:        authority,
		Input:          input.Input,
		Plugin:         input.Plugin,
		MaxFee:         mapCoins(input.MaxFee),
		CallbackParams: callbackParams,
	}, nil
}

type addTaskInput struct {
	Plugin         string
	Input          []byte
	MaxFee         []TypesCoin
	CallbackParams callbackParams
}

type callbackParams struct {
	AddressValue common.Address
	GasLimit     uint64
}
