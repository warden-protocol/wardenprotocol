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
	"github.com/ethereum/go-ethereum/core/vm"

	"github.com/warden-protocol/wardenprotocol/precompiles/common"
	schedkeeper "github.com/warden-protocol/wardenprotocol/warden/x/sched/keeper"
	types "github.com/warden-protocol/wardenprotocol/warden/x/sched/types/v1beta1"
)

var _ vm.PrecompiledContract = &Precompile{}

const PrecompileAddress = "0x0000000000000000000000000000000000000905"

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

// Precompile defines the precompiled contract for x/sched.
type Precompile struct {
	evmcmn.Precompile

	schedKeeper    schedkeeper.Keeper
	evmKeeper      *evmkeeper.Keeper
	eventsRegistry *common.EthEventsRegistry
	queryServer    types.QueryServer
}

func NewPrecompile(
	schedKeeper schedkeeper.Keeper,
	evmKeeper *evmkeeper.Keeper,
	bankKeeper evmcmn.BankKeeper,
	er *common.EthEventsRegistry,
) *Precompile {
	return &Precompile{
		Precompile: evmcmn.Precompile{
			KvGasConfig:          storetypes.KVGasConfig(),
			TransientKVGasConfig: storetypes.TransientGasConfig(),
		},
		schedKeeper:    schedKeeper,
		evmKeeper:      evmKeeper,
		eventsRegistry: er,
		queryServer:    schedkeeper.NewQueryServerImpl(schedKeeper),
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

func (p Precompile) Run(evm *vm.EVM, contract *vm.Contract, readonly bool) ([]byte, error) {
	return p.RunNativeAction(evm, contract, func(ctx sdk.Context) ([]byte, error) {
		return p.Execute(ctx, evm, contract, readonly)
	})
}

func (p Precompile) Execute(ctx sdk.Context, evm *vm.EVM, contract *vm.Contract, readOnly bool) ([]byte, error) {
	method, args, err := evmcmn.SetupABI(ABI, contract, readOnly, p.IsTransaction)
	if err != nil {
		return nil, err
	}

	var bz []byte

	switch method.Name {
	// transactions
	case ExecuteCallbacksMethod:
		bz, err = p.ExecuteCallbacksMethod(ctx, evm, method, args)

	// queries
	case CallbackByIdMethod:
		bz, err = p.CallbackByIdMethod(ctx, method, args)
	case CallbacksMethod:
		bz, err = p.CallbacksMethod(ctx, method, args)
	case GetAddressMethod:
		bz, err = p.GetAddressMethod(ctx, method, args)
	}

	return bz, err
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
