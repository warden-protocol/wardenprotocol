package slinky

import (
	"embed"
	"fmt"

	"cosmossdk.io/log"
	storetypes "cosmossdk.io/store/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	cmn "github.com/cosmos/evm/precompiles/common"
	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/vm"

	oraclekeeper "github.com/warden-protocol/connect/x/oracle/keeper"
	types "github.com/warden-protocol/connect/x/oracle/types"

	precommon "github.com/warden-protocol/wardenprotocol/precompiles/common"
)

var _ vm.PrecompiledContract = &Precompile{}

var (
	// Embed abi json file to the executable binary. Needed when importing as dependency.
	//
	//go:embed abi.json
	f   embed.FS
	ABI abi.ABI
)

func init() {
	var err error

	ABI, err = cmn.LoadABI(f, "abi.json")
	if err != nil {
		panic(err)
	}
}

// PrecompileAddress defines the contract address of the slinky precompile.
const PrecompileAddress = "0x0000000000000000000000000000000000000902"

// Precompile defines the precompiled contract for slinky.
type Precompile struct {
	cmn.Precompile

	oraclekeeper   oraclekeeper.Keeper
	eventsRegistry *precommon.EthEventsRegistry
	queryServer    types.QueryServer
}

func NewPrecompile(
	oraclekee oraclekeeper.Keeper,
	eventRegistry *precommon.EthEventsRegistry,
) *Precompile {
	return &Precompile{
		Precompile: cmn.Precompile{
			KvGasConfig:          storetypes.KVGasConfig(),
			TransientKVGasConfig: storetypes.TransientGasConfig(),
		},
		oraclekeeper:   oraclekee,
		eventsRegistry: eventRegistry,
		queryServer:    oraclekeeper.NewQueryServer(oraclekee),
	}
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

	method, err := ABI.MethodById(methodID)
	if err != nil {
		// This should never happen since this method is going to fail during Run
		return 0
	}

	return p.Precompile.RequiredGas(input, p.IsTransaction(method))
}

func (p Precompile) Run(evm *vm.EVM, contract *vm.Contract, readonly bool) ([]byte, error) {
	return p.RunNativeAction(evm, contract, func(ctx sdk.Context) ([]byte, error) {
		return p.Execute(ctx, contract, readonly)
	})
}

func (p Precompile) Execute(ctx sdk.Context, contract *vm.Contract, readOnly bool) ([]byte, error) {
	method, args, err := cmn.SetupABI(ABI, contract, readOnly, p.IsTransaction)
	if err != nil {
		return nil, err
	}

	var bz []byte

	switch method.Name {
	// queries
	case GetPrice:
		bz, err = p.GetPriceQuery(ctx, method, args)
	default:
		return nil, fmt.Errorf(cmn.ErrUnknownMethod, method.Name)
	}

	return bz, err
}

// IsTransaction checks if the given method name corresponds to a transaction or query.
func (*Precompile) IsTransaction(method *abi.Method) bool {
	switch method.Name {
	case GetPrice:
		return false
	}

	panic(fmt.Errorf("slinky precompile: method does not exist: %s", method))
}

// Logger returns a precompile-specific logger.
func (p *Precompile) Logger(ctx sdk.Context) log.Logger {
	return ctx.Logger().With("evm extension", "x/slinky")
}
