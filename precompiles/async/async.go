package async

import (
	"embed"
	"fmt"

	"cosmossdk.io/log"
	storetypes "cosmossdk.io/store/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	evmcmn "github.com/cosmos/evm/precompiles/common"
	"github.com/ethereum/go-ethereum/accounts/abi"
	ethcmn "github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/vm"

	"github.com/warden-protocol/wardenprotocol/precompiles/common"
	asyncmodulekeeper "github.com/warden-protocol/wardenprotocol/warden/x/async/keeper"
	types "github.com/warden-protocol/wardenprotocol/warden/x/async/types/v1beta1"
)

var _ vm.PrecompiledContract = &Precompile{}

const PrecompileAddress = "0x0000000000000000000000000000000000000903"

var (
	// Embed abi json file to the executable binary. Needed when importing as dependency.
	//
	//go:embed abi.json
	f   embed.FS
	ABI abi.ABI
)

func init() {
	var err error

	ABI, err = evmcmn.LoadABI(f, "abi.json")
	if err != nil {
		panic(err)
	}
}

// Precompile defines the precompiled contract for x/async.
type Precompile struct {
	evmcmn.Precompile

	asyncmodulekeeper asyncmodulekeeper.Keeper
	eventsRegistry    *common.EthEventsRegistry
	queryServer       types.QueryServer
}

func NewPrecompile(
	asynckeeper asyncmodulekeeper.Keeper,
	bankKeeper evmcmn.BankKeeper,
	er *common.EthEventsRegistry,
) *Precompile {
	return &Precompile{
		Precompile: evmcmn.Precompile{
			KvGasConfig:          storetypes.KVGasConfig(),
			TransientKVGasConfig: storetypes.TransientGasConfig(),
		},
		asyncmodulekeeper: asynckeeper,
		eventsRegistry:    er,
		queryServer:       asyncmodulekeeper.NewQueryServerImpl(asynckeeper),
	}
}

// Address implements vm.PrecompiledContract.
func (p *Precompile) Address() ethcmn.Address {
	return ethcmn.HexToAddress(PrecompileAddress)
}

// RequiredGas implements vm.PrecompiledContract.
// Subtle: this method shadows the method (Precompile).RequiredGas of Precompile.Precompile.
func (p *Precompile) RequiredGas(input []byte) uint64 {
	// NOTE: This check avoid panicking when trying to decode the method ID
	if len(input) < 4 {
		return 0
	}

	methodID := input[:4]

	method, err := ABI.MethodById(methodID)
	if err != nil {
		// This should never happen since this method is going to fail during Run
		return 0
	}

	return p.Precompile.RequiredGas(input, p.IsTransaction(method))
}

// Run implements vm.PrecompiledContract.
func (p Precompile) Run(evm *vm.EVM, contract *vm.Contract, readonly bool) ([]byte, error) {
	return p.RunNativeAction(evm, contract, func(ctx sdk.Context) ([]byte, error) {
		return p.Execute(ctx, evm.StateDB, evm.Origin, contract, readonly)
	})
}

func (p Precompile) Execute(ctx sdk.Context, stateDB vm.StateDB, origin ethcmn.Address, contract *vm.Contract, readOnly bool) ([]byte, error) {
	method, args, err := evmcmn.SetupABI(ABI, contract, readOnly, p.IsTransaction)
	if err != nil {
		return nil, err
	}

	var bz []byte

	switch method.Name {
	// transactions
	case AddTaskMethod:
		bz, err = p.AddTaskMethod(ctx, origin, stateDB, method, args)
	// queries
	case TaskByIdMethod:
		bz, err = p.TaskByIdMethod(ctx, method, args)
	case TasksMethod:
		bz, err = p.TasksMethod(ctx, method, args)
	case PendingTasksMethod:
		bz, err = p.PendingTasksMethod(ctx, method, args)
	case PluginsMethod:
		bz, err = p.PluginsMethod(ctx, method, args)
	default:
		return nil, fmt.Errorf(evmcmn.ErrUnknownMethod, method.Name)
	}

	return bz, err
}

func (p *Precompile) IsTransaction(method *abi.Method) bool {
	switch method.Name {
	// transactions
	case AddTaskMethod:
		return true
	// queries
	case TaskByIdMethod,
		TasksMethod,
		PendingTasksMethod,
		PluginsMethod:
		return false
	}

	panic(fmt.Errorf("async precompile: method not exists: %s", method))
}

// Logger returns a precompile-specific logger.
func (p *Precompile) Logger(ctx sdk.Context) log.Logger {
	return ctx.Logger().With("evm extension", "async")
}
