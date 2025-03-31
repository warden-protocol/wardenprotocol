package json

import (
	"embed"
	"fmt"

	"cosmossdk.io/log"
	storetypes "cosmossdk.io/store/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/ethereum/go-ethereum/accounts/abi"
	ethcmn "github.com/ethereum/go-ethereum/common"
	evmoscmn "github.com/evmos/evmos/v20/precompiles/common"
	"github.com/evmos/evmos/v20/x/evm/core/vm"
)

var _ vm.PrecompiledContract = &Precompile{}

const PrecompileAddress = "0x0000000000000000000000000000000000000905"

// Embed abi json file to the executable binary. Needed when importing as dependency.
//
//go:embed abi.json
var f embed.FS

// Precompile defines the precompiled contract for x/async.
type Precompile struct {
	evmoscmn.Precompile
}

// LoadABI loads the x/async ABI from the embedded abi.json file
// for the x/async precompile.
func LoadABI() (abi.ABI, error) {
	return evmoscmn.LoadABI(f, "abi.json")
}

func NewPrecompile() (*Precompile, error) {
	abi, err := LoadABI()
	if err != nil {
		return nil, err
	}

	p := Precompile{
		Precompile: evmoscmn.Precompile{
			ABI:                  abi,
			KvGasConfig:          storetypes.KVGasConfig(),
			TransientKVGasConfig: storetypes.TransientGasConfig(),
		},
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

	return p.Precompile.RequiredGas(input, p.IsTransaction(method.Name))
}

// Run implements vm.PrecompiledContract.
func (p *Precompile) Run(evm *vm.EVM, contract *vm.Contract, readonly bool) (bz []byte, err error) {
	ctx, stateDB, snapshot, method, initialGas, args, err := p.RunSetup(evm, contract, readonly, p.IsTransaction)
	if err != nil {
		return nil, err
	}

	// This handles any out of gas errors that may occur during the execution of a precompile tx or query.
	// It avoids panics and returns the out of gas error so the EVM can continue gracefully.
	defer evmoscmn.HandleGasError(ctx, contract, initialGas, &err)()

	switch method.Name {
	// queries
	case SetStringMethod:
		bz, err = p.SetString(ctx, method, args)
	case SetBoolMethod:
		bz, err = p.SetBool(ctx, method, args)
	case SetAddressMethod:
		bz, err = p.SetAddressValue(ctx, method, args)
	case SetInt256Method:
		bz, err = p.SetInt256(ctx, method, args)
	case SetUint256Method:
		bz, err = p.SetUint256(ctx, method, args)
	// case SetBytesMethod:
	// 	bz, err = p.SetBytes(ctx, method, args)
	case SetObjectMethod:
		bz, err = p.SetObject(ctx, method, args)
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

func (p *Precompile) IsTransaction(method string) bool {
	switch method {
	// queries
	case SetStringMethod,
		SetBoolMethod,
		SetAddressMethod,
		SetInt256Method,
		SetUint256Method,
		// SetBytesMethod,
		SetStringArrayMethod,
		SetUintArrayMethod,
		SetIntArrayMethod,
		SetBoolArrayMethod,
		SetAddressArrayMethod,
		SetObjectsArrayMethod,
		SetObjectMethod:
		return false
	}

	panic(fmt.Errorf("json precompile: method not exists: %s", method))
}

// Logger returns a precompile-specific logger.
func (p *Precompile) Logger(ctx sdk.Context) log.Logger {
	return ctx.Logger().With("evm extension", "json")
}
