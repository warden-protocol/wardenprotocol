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

// Embed abi json file to the executable binary. Needed when importing as dependency.
//
//go:embed abi.json
var f embed.FS

// Precompile defines the precompiled contract for x/act.
type Precompile struct {
	evmcmn.Precompile
	actmodulekeeper actmodulekeeper.Keeper
	eventsRegistry  *common.EthEventsRegistry
	queryServer     types.QueryServer
}

// LoadABI loads the x/act ABI from the embedded abi.json file
// for the x/act precompile.
func LoadABI() (abi.ABI, error) {
	return evmcmn.LoadABI(f, "abi.json")
}

func NewPrecompile(actkeeper actmodulekeeper.Keeper, er *common.EthEventsRegistry) (*Precompile, error) {
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
		actmodulekeeper: actkeeper,
		eventsRegistry:  er,
		queryServer:     actmodulekeeper.NewQueryServerImpl(actkeeper),
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
	ctx, stateDB, snapshot, method, initialGas, args, err := p.RunSetup(evm, contract, readonly, p.IsTransaction)
	if err != nil {
		return nil, err
	}

	// This handles any out of gas errors that may occur during the execution of a precompile tx or query.
	// It avoids panics and returns the out of gas error so the EVM can continue gracefully.
	defer evmcmn.HandleGasError(ctx, contract, initialGas, &err, stateDB, snapshot)()

	return p.RunAtomic(snapshot, stateDB, func() ([]byte, error) {
		switch method.Name {
		// transactions
		case CheckActionMethod:
			bz, err = p.CheckActionMethod(ctx, evm.Origin, stateDB, method, args)
		case NewTemplateMethod:
			bz, err = p.NewTemplateMethod(ctx, evm.Origin, stateDB, method, args)
		case RevokeActionMethod:
			bz, err = p.RevokeActionMethod(ctx, evm.Origin, stateDB, method, args)
		case UpdateTemplateMethod:
			bz, err = p.UpdateTemplateMethod(ctx, evm.Origin, stateDB, method, args)
		case VoteForActionMethod:
			bz, err = p.VoteForActionMethod(ctx, evm.Origin, contract.CallerAddress, stateDB, method, args)
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
		}

		if err != nil {
			return nil, err
		}

		cost := ctx.GasMeter().GasConsumed() - initialGas

		if !contract.UseGas(cost) {
			return nil, vm.ErrOutOfGas
		}

		if err := p.AddJournalEntries(stateDB, snapshot); err != nil {
			return nil, err
		}

		return bz, nil
	})
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
