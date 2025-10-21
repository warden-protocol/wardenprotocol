package act

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
	actmodulekeeper "github.com/warden-protocol/wardenprotocol/warden/x/act/keeper"
	types "github.com/warden-protocol/wardenprotocol/warden/x/act/types/v1beta1"
)

var _ vm.PrecompiledContract = &Precompile{}

const PrecompileAddress = "0x0000000000000000000000000000000000000901"

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

// Precompile defines the precompiled contract for x/act.
type Precompile struct {
	evmcmn.Precompile

	actmodulekeeper actmodulekeeper.Keeper
	eventsRegistry  *common.EthEventsRegistry
	queryServer     types.QueryServer
}

func NewPrecompile(
	actkeeper actmodulekeeper.Keeper,
	bankKeeper evmcmn.BankKeeper,
	er *common.EthEventsRegistry,
) *Precompile {
	return &Precompile{
		Precompile: evmcmn.Precompile{
			KvGasConfig:          storetypes.KVGasConfig(),
			TransientKVGasConfig: storetypes.TransientGasConfig(),
		},
		actmodulekeeper: actkeeper,
		eventsRegistry:  er,
		queryServer:     actmodulekeeper.NewQueryServerImpl(actkeeper),
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
func (p *Precompile) Run(evm *vm.EVM, contract *vm.Contract, readonly bool) (bz []byte, err error) {
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
	case CheckActionMethod:
		bz, err = p.CheckActionMethod(ctx, origin, stateDB, method, args)
	case NewTemplateMethod:
		bz, err = p.NewTemplateMethod(ctx, origin, stateDB, method, args)
	case RevokeActionMethod:
		bz, err = p.RevokeActionMethod(ctx, origin, stateDB, method, args)
	case UpdateTemplateMethod:
		bz, err = p.UpdateTemplateMethod(ctx, origin, stateDB, method, args)
	case VoteForActionMethod:
		bz, err = p.VoteForActionMethod(ctx, origin, contract.Caller(), stateDB, method, args)
	// queries
	case ActionsQuery:
		bz, err = p.ActionsQuery(ctx, contract, method, args)
	case ActionByIdQuery:
		bz, err = p.ActionByIdQuery(ctx, contract, method, args)
	case ActionsByAddressQuery:
		bz, err = p.ActionsByAddressQuery(ctx, contract, method, args)
	case TemplatesQuery:
		bz, err = p.TemplatesQuery(ctx, contract, method, args)
	case TemplateByIdQuery:
		bz, err = p.TemplateByIdQuery(ctx, contract, method, args)
	default:
		return nil, fmt.Errorf(evmcmn.ErrUnknownMethod, method.Name)
	}

	return bz, err
}

func (p *Precompile) IsTransaction(method *abi.Method) bool {
	switch method.Name {
	// transactions
	case CheckActionMethod,
		NewTemplateMethod,
		RevokeActionMethod,
		UpdateTemplateMethod,
		VoteForActionMethod:
		return true
	// queries
	case ActionsQuery,
		ActionByIdQuery,
		ActionsByAddressQuery,
		TemplatesQuery,
		TemplateByIdQuery:
		return false
	}

	panic(fmt.Errorf("act precompile: method not exists: %s", method))
}

// Logger returns a precompile-specific logger.
func (p *Precompile) Logger(ctx sdk.Context) log.Logger {
	return ctx.Logger().With("evm extension", "act")
}
