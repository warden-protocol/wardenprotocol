package slinky

import (
	"embed"
	"fmt"

	"cosmossdk.io/log"

	storetypes "cosmossdk.io/store/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/common"
	cmn "github.com/evmos/evmos/v20/precompiles/common"
	"github.com/evmos/evmos/v20/x/evm/core/vm"

	precommon "github.com/warden-protocol/wardenprotocol/precompiles/common"

	oraclekeeper "github.com/skip-mev/slinky/x/oracle/keeper"
	types "github.com/skip-mev/slinky/x/oracle/types"
)

var _ vm.PrecompiledContract = &Precompile{}

// Embed abi json file to the executable binary. Needed when importing as dependency.
//
//go:embed abi.json
var f embed.FS

// PrecompileAddress defines the contract address of the x/warden precompile.
const PrecompileAddress = "0x0000000000000000000000000000000000000902"

// Precompile defines the precompiled contract for x/warden.
type Precompile struct {
	cmn.Precompile
	oraclekeeper   oraclekeeper.Keeper
	eventsRegistry *precommon.EthEventsRegistry
	queryServer    types.QueryServer
}

// LoadABI loads the x/warden ABI from the embedded abi.json file
// for the x/warden precompile.
func LoadABI() (abi.ABI, error) {
	return cmn.LoadABI(f, "abi.json")
}

func NewPrecompile(
	oraclekee oraclekeeper.Keeper,
	e *precommon.EthEventsRegistry) (*Precompile, error) {
	abi, err := LoadABI()
	if err != nil {
		return nil, err
	}

	p := Precompile{
		Precompile: cmn.Precompile{
			ABI:                  abi,
			KvGasConfig:          storetypes.KVGasConfig(),
			TransientKVGasConfig: storetypes.TransientGasConfig(),
		},
		oraclekeeper:   oraclekee,
		eventsRegistry: e,
		queryServer:    oraclekeeper.NewQueryServer(oraclekee),
	}

	p.SetAddress(common.HexToAddress(PrecompileAddress))

	return &p, nil
}

// Address implements vm.PrecompiledContract.
func (*Precompile) Address() common.Address {
	return common.HexToAddress(PrecompileAddress)
}

// RequiredGas returns the required bare minimum gas to execute the precompile.
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

	return p.Precompile.RequiredGas(input, p.IsTransaction(method.Name))
}

// Run implements vm.PrecompiledContract.
func (p *Precompile) Run(evm *vm.EVM, contract *vm.Contract, readOnly bool) (bz []byte, err error) {
	ctx, stateDB, snapshot, method, initialGas, args, err := p.RunSetup(evm, contract, readOnly, p.IsTransaction)
	if err != nil {
		return nil, err
	}

	// This handles any out of gas errors that may occur during the execution of a precompile tx or query.
	// It avoids panics and returns the out of gas error so the EVM can continue gracefully.
	defer cmn.HandleGasError(ctx, contract, initialGas, &err)()

	switch method.Name {
	// queries
	case CoinPrice:
		bz, err = p.CoinPriceQuery(ctx, evm.Origin, stateDB, method, args)
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
}

// IsTransaction checks if the given method name corresponds to a transaction or query.
func (*Precompile) IsTransaction(method string) bool {
	switch method {
	case CoinPrice:
		return false
	}

	panic(fmt.Errorf("slinky precompile: method not exists: %s", method))
}

// Logger returns a precompile-specific logger.
func (p *Precompile) Logger(ctx sdk.Context) log.Logger {
	return ctx.Logger().With("evm extension", "x/slinky")
}
