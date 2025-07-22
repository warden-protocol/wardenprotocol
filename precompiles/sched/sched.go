package sched

import (
	"embed"

	"cosmossdk.io/log"
	storetypes "cosmossdk.io/store/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	evmcmn "github.com/cosmos/evm/precompiles/common"
	evmkeeper "github.com/cosmos/evm/x/vm/keeper"
	"github.com/ethereum/go-ethereum/accounts/abi"
	ethcmn "github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/tracing"
	"github.com/ethereum/go-ethereum/core/vm"

	"github.com/warden-protocol/wardenprotocol/precompiles/common"
	schedkeeper "github.com/warden-protocol/wardenprotocol/warden/x/sched/keeper"
	types "github.com/warden-protocol/wardenprotocol/warden/x/sched/types/v1beta1"
)

var _ vm.PrecompiledContract = &Precompile{}

const PrecompileAddress = "0x0000000000000000000000000000000000000905"

// Embed abi json file to the executable binary. Needed when importing as dependency.
//
//go:embed abi.json
var f embed.FS

// Precompile defines the precompiled contract for x/sched.
type Precompile struct {
	evmcmn.Precompile

	schedKeeper    schedkeeper.Keeper
	evmKeeper      *evmkeeper.Keeper
	eventsRegistry *common.EthEventsRegistry
	queryServer    types.QueryServer
}

// LoadABI loads the x/sched ABI from the embedded abi.json file
// for the x/sched precompile.
func LoadABI() (abi.ABI, error) {
	return evmcmn.LoadABI(f, "abi.json")
}

func NewPrecompile(schedKeeper schedkeeper.Keeper, evmKeeper *evmkeeper.Keeper, er *common.EthEventsRegistry) (*Precompile, error) {
	abi, err := LoadABI()
	if err != nil {
		return nil, err
	}

	p := Precompile{
		Precompile: evmcmn.Precompile{
			ABI:                  abi,
			KvGasConfig:          storetypes.KVGasConfig(),
			TransientKVGasConfig: storetypes.TransientGasConfig(),
		},
		schedKeeper:    schedKeeper,
		evmKeeper:      evmKeeper,
		eventsRegistry: er,
		queryServer:    schedkeeper.NewQueryServerImpl(schedKeeper),
	}

	p.SetAddress(p.Address())

	return &p, nil
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

	method, err := p.MethodById(methodID)
	if err != nil {
		// This should never happen since this method is going to fail during Run
		return 0
	}

	return p.Precompile.RequiredGas(input, p.IsTransaction(method))
}

// Run implements vm.PrecompiledContract.
func (p *Precompile) Run(evm *vm.EVM, contract *vm.Contract, readonly bool) (bz []byte, err error) {
	ctx, stateDB, method, initialGas, args, err := p.RunSetup(evm, contract, readonly, p.IsTransaction)
	if err != nil {
		return nil, err
	}

	p.GetBalanceHandler().BeforeBalanceChange(ctx)

	// This handles any out of gas errors that may occur during the execution of a precompile tx or query.
	// It avoids panics and returns the out of gas error so the EVM can continue gracefully.
	defer evmcmn.HandleGasError(ctx, contract, initialGas, &err)()

	switch method.Name {
	// transactions
	case ExecuteCallbacksMethod:
		bz, err = p.ExecuteCallbacksMethod(ctx, evm, stateDB, method, args)

	// queries
	case CallbackByIdMethod:
		bz, err = p.CallbackByIdMethod(ctx, method, args)
	case CallbacksMethod:
		bz, err = p.CallbacksMethod(ctx, method, args)
	case GetAddressMethod:
		bz, err = p.GetAddressMethod(ctx, method, args)
	}

	if err != nil {
		return nil, err
	}

	cost := ctx.GasMeter().GasConsumed() - initialGas

	if !contract.UseGas(cost, nil, tracing.GasChangeCallPrecompiledContract) {
		return nil, vm.ErrOutOfGas
	}

	if err = p.GetBalanceHandler().AfterBalanceChange(ctx, stateDB); err != nil {
		return nil, err
	}

	return bz, nil
}

func (p *Precompile) IsTransaction(method *abi.Method) bool {
	switch method.Name {
	default:
		return false
	}
}

// Logger returns a precompile-specific logger.
func (p *Precompile) Logger(ctx sdk.Context) log.Logger {
	return ctx.Logger().With("evm extension", "sched")
}
