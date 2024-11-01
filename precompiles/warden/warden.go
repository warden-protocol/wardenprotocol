package warden

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
	actkeeper "github.com/warden-protocol/wardenprotocol/warden/x/act/keeper"
	wardenmodulekeeper "github.com/warden-protocol/wardenprotocol/warden/x/warden/keeper"
	"github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta3"
	types "github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta3"
)

var _ vm.PrecompiledContract = &Precompile{}

// Embed abi json file to the executable binary. Needed when importing as dependency.
//
//go:embed abi.json
var f embed.FS

// PrecompileAddress defines the contract address of the x/warden precompile.
const PrecompileAddress = "0x0000000000000000000000000000000000000900"

// Precompile defines the precompiled contract for x/warden.
type Precompile struct {
	cmn.Precompile
	wardenkeeper   wardenmodulekeeper.Keeper
	actkeeper      actkeeper.Keeper
	eventsRegistry *precommon.EthEventsRegistry
	queryServer    types.QueryServer
}

// LoadABI loads the x/warden ABI from the embedded abi.json file
// for the x/warden precompile.
func LoadABI() (abi.ABI, error) {
	return cmn.LoadABI(f, "abi.json")
}

func NewPrecompile(wardenkeeper wardenmodulekeeper.Keeper, actkeeper actkeeper.Keeper, e *precommon.EthEventsRegistry) (*Precompile, error) {
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
		wardenkeeper:   wardenkeeper,
		actkeeper:      actkeeper,
		eventsRegistry: e,
		queryServer:    wardenmodulekeeper.NewQueryServerImpl(wardenkeeper),
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
	// transactions
	case AddKeychainAdminMethod:
		bz, err = p.AddKeychainAdminMethod(ctx, evm.Origin, stateDB, method, args)
	case AddKeychainWriterMethod:
		bz, err = p.AddKeychainWriterMethod(ctx, evm.Origin, stateDB, method, args)
	case FulfilKeyRequestMethod:
		bz, err = p.FulfilKeyRequestMethod(ctx, evm.Origin, v1beta3.KeyRequestStatus_KEY_REQUEST_STATUS_FULFILLED, stateDB, method, args)
	case RejectKeyRequestMethod:
		bz, err = p.FulfilKeyRequestMethod(ctx, evm.Origin, v1beta3.KeyRequestStatus_KEY_REQUEST_STATUS_REJECTED, stateDB, method, args)
	case FulfilSignRequestMethod:
		bz, err = p.FulfilSignRequestMethod(ctx, evm.Origin, v1beta3.SignRequestStatus_SIGN_REQUEST_STATUS_FULFILLED, stateDB, method, args)
	case RejectSignRequestMethod:
		bz, err = p.FulfilSignRequestMethod(ctx, evm.Origin, v1beta3.SignRequestStatus_SIGN_REQUEST_STATUS_REJECTED, stateDB, method, args)
	case NewKeychainMethod:
		bz, err = p.NewKeychainMethod(ctx, evm.Origin, stateDB, method, args)
	case NewSpaceMethod:
		bz, err = p.NewSpaceMethod(ctx, evm.Origin, stateDB, method, args)
	case RemoveKeychainAdminMethod:
		bz, err = p.RemoveKeychainAdminMethod(ctx, evm.Origin, stateDB, method, args)
	case UpdateKeychainMethod:
		bz, err = p.UpdateKeychainMethod(ctx, evm.Origin, stateDB, method, args)
	case AddSpaceOwnerMethod:
		bz, err = p.AddSpaceOwnerMethod(ctx, evm.Origin, stateDB, method, args)
	case RemoveSpaceOwnerMethod:
		bz, err = p.RemoveSpaceOwnerMethod(ctx, evm.Origin, stateDB, method, args)
	case NewKeyRequestMethod:
		bz, err = p.NewKeyRequestMethod(ctx, evm.Origin, stateDB, method, args)
	case NewSignRequestMethod:
		bz, err = p.NewSignRequestMethod(ctx, evm.Origin, stateDB, method, args)
	case UpdateKeyMethod:
		bz, err = p.UpdateKeyMethod(ctx, evm.Origin, stateDB, method, args)
	case UpdateSpaceMethod:
		bz, err = p.UpdateSpaceMethod(ctx, evm.Origin, stateDB, method, args)

	// queries
	case AllKeysMethod:
		bz, err = p.AllKeysMethod(ctx, evm.Origin, stateDB, method, args)
	case KeyByIdMethod:
		bz, err = p.KeyByIdMethod(ctx, evm.Origin, stateDB, method, args)
	case KeysBySpaceIdMethod:
		bz, err = p.KeysBySpaceIdMethod(ctx, evm.Origin, stateDB, method, args)
	case KeyRequestMethod:
		bz, err = p.KeyRequestMethod(ctx, evm.Origin, stateDB, method, args)
	case KeyRequestsMethod:
		bz, err = p.KeyRequestsMethod(ctx, evm.Origin, stateDB, method, args)
	case KeychainMethod:
		bz, err = p.KeychainMethod(ctx, evm.Origin, stateDB, method, args)
	case KeychainsMethod:
		bz, err = p.KeychainsMethod(ctx, evm.Origin, stateDB, method, args)
	case SignRequestByIdMethod:
		bz, err = p.SignRequestByIdMethod(ctx, evm.Origin, stateDB, method, args)
	case SignRequestsMethod:
		bz, err = p.SignRequestsMethod(ctx, evm.Origin, stateDB, method, args)
	case SpaceByIdMethod:
		bz, err = p.SpaceByIdMethod(ctx, evm.Origin, stateDB, method, args)
	case SpacesMethod:
		bz, err = p.SpacesMethod(ctx, evm.Origin, stateDB, method, args)
	case SpacesByOwnerMethod:
		bz, err = p.SpacesByOwnerMethod(ctx, evm.Origin, stateDB, method, args)
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
//
// Available warden transactions are:
//
//	-
func (*Precompile) IsTransaction(method string) bool {
	switch method {
	case AddKeychainAdminMethod,
		AddKeychainWriterMethod,
		FulfilKeyRequestMethod,
		RejectKeyRequestMethod,
		FulfilSignRequestMethod,
		RejectSignRequestMethod,
		NewKeychainMethod,
		NewSpaceMethod,
		RemoveKeychainAdminMethod,
		UpdateKeychainMethod,
		AddSpaceOwnerMethod,
		RemoveSpaceOwnerMethod,
		NewKeyRequestMethod,
		NewSignRequestMethod,
		UpdateKeyMethod,
		UpdateSpaceMethod:
		return true
	case AllKeysMethod,
		KeyByIdMethod,
		KeysBySpaceIdMethod,
		KeyRequestMethod,
		KeyRequestsMethod,
		KeychainMethod,
		KeychainsMethod,
		SignRequestByIdMethod,
		SignRequestsMethod,
		SpaceByIdMethod,
		SpacesMethod,
		SpacesByOwnerMethod:
		return false
	}

	panic(fmt.Errorf("warden precompile: method not exists: %s", method))
}

// Logger returns a precompile-specific logger.
func (p *Precompile) Logger(ctx sdk.Context) log.Logger {
	return ctx.Logger().With("evm extension", "x/warden")
}
