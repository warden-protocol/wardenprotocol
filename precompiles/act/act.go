package act

import (
	"embed"

	"cosmossdk.io/log"
	storetypes "cosmossdk.io/store/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/vm"
	cmn "github.com/evmos/evmos/v18/precompiles/common"
)

var _ vm.PrecompiledContract = &Precompile{}

// Embed abi json file to the executable binary. Needed when importing as dependency.
//
//go:embed abi.json
var f embed.FS

// Precompile defines the precompiled contract for x/act.
type Precompile struct {
	cmn.Precompile
}

// LoadABI loads the x/act ABI from the embedded abi.json file
// for the x/act precompile.
func LoadABI() (abi.ABI, error) {
	return cmn.LoadABI(f, "abi.json")
}

func NewPrecompile() (*Precompile, error) {
	abi, err := LoadABI()
	if err != nil {
		return nil, err
	}

	return &Precompile{
		Precompile: cmn.Precompile{
			ABI:                  abi,
			KvGasConfig:          storetypes.KVGasConfig(),
			TransientKVGasConfig: storetypes.TransientGasConfig(),
		},
	}, nil
}

// Address implements vm.PrecompiledContract.
func (p *Precompile) Address() common.Address {
	panic("unimplemented")
}

// RequiredGas implements vm.PrecompiledContract.
// Subtle: this method shadows the method (Precompile).RequiredGas of Precompile.Precompile.
func (p *Precompile) RequiredGas(input []byte) uint64 {
	panic("unimplemented")
}

// Run implements vm.PrecompiledContract.
func (p *Precompile) Run(evm *vm.EVM, contract *vm.Contract, readonly bool) ([]byte, error) {
	panic("unimplemented")
}

// IsTransaction checks if the given method name corresponds to a transaction or query.
//
// Available staking transactions are:
//
//	-
func (Precompile) IsTransaction(method string) bool {
	switch method {
	// TODO: split tx and queries
	default:
		return false
	}
}

// Logger returns a precompile-specific logger.
func (p Precompile) Logger(ctx sdk.Context) log.Logger {
	return ctx.Logger().With("evm extension", "x/act")
}
