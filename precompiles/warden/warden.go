package warden

import (
	"embed"
	"fmt"

	"cosmossdk.io/log"
	storetypes "cosmossdk.io/store/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	evmcmn "github.com/cosmos/evm/precompiles/common"
	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/vm"

	precommon "github.com/warden-protocol/wardenprotocol/precompiles/common"
	actmodulekeeper "github.com/warden-protocol/wardenprotocol/warden/x/act/keeper"
	acttypes "github.com/warden-protocol/wardenprotocol/warden/x/act/types/v1beta1"
	wardenmodulekeeper "github.com/warden-protocol/wardenprotocol/warden/x/warden/keeper"
	types "github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta3"
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

	ABI, err = evmcmn.LoadABI(f, "abi.json")
	if err != nil {
		panic(err)
	}
}

// PrecompileAddress defines the contract address of the x/warden precompile.
const PrecompileAddress = "0x0000000000000000000000000000000000000900"

// Precompile defines the precompiled contract for x/warden.
type Precompile struct {
	evmcmn.Precompile

	wardenkeeper   wardenmodulekeeper.Keeper
	actkeeper      actmodulekeeper.Keeper
	eventsRegistry *precommon.EthEventsRegistry
	queryServer    types.QueryServer
	actQueryServer acttypes.QueryServer
}

func NewPrecompile(
	wardenkeeper wardenmodulekeeper.Keeper,
	actkeeper actmodulekeeper.Keeper,
	bankKeeper evmcmn.BankKeeper,
	e *precommon.EthEventsRegistry,
) *Precompile {
	return &Precompile{
		Precompile: evmcmn.Precompile{
			KvGasConfig:          storetypes.KVGasConfig(),
			TransientKVGasConfig: storetypes.TransientGasConfig(),
		},
		wardenkeeper:   wardenkeeper,
		actkeeper:      actkeeper,
		eventsRegistry: e,
		queryServer:    wardenmodulekeeper.NewQueryServerImpl(wardenkeeper),
		actQueryServer: actmodulekeeper.NewQueryServerImpl(actkeeper),
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
		return p.Execute(ctx, evm.StateDB, contract, readonly)
	})
}

func (p Precompile) Execute(ctx sdk.Context, stateDB vm.StateDB, contract *vm.Contract, readOnly bool) ([]byte, error) {
	method, args, err := evmcmn.SetupABI(ABI, contract, readOnly, p.IsTransaction)
	if err != nil {
		return nil, err
	}

	var bz []byte

	switch method.Name {
	// transactions
	case AddKeychainAdminMethod:
		bz, err = p.AddKeychainAdminMethod(ctx, contract, stateDB, method, args)
	case AddKeychainWriterMethod:
		bz, err = p.AddKeychainWriterMethod(ctx, contract, stateDB, method, args)
	case FulfilKeyRequestMethod:
		bz, err = p.FulfilKeyRequestMethod(ctx, contract, types.KeyRequestStatus_KEY_REQUEST_STATUS_FULFILLED, stateDB, method, args)
	case RejectKeyRequestMethod:
		bz, err = p.FulfilKeyRequestMethod(ctx, contract, types.KeyRequestStatus_KEY_REQUEST_STATUS_REJECTED, stateDB, method, args)
	case FulfilSignRequestMethod:
		bz, err = p.FulfilSignRequestMethod(ctx, contract, types.SignRequestStatus_SIGN_REQUEST_STATUS_FULFILLED, stateDB, method, args)
	case RejectSignRequestMethod:
		bz, err = p.FulfilSignRequestMethod(ctx, contract, types.SignRequestStatus_SIGN_REQUEST_STATUS_REJECTED, stateDB, method, args)
	case NewKeychainMethod:
		bz, err = p.NewKeychainMethod(ctx, contract, stateDB, method, args)
	case NewSpaceMethod:
		bz, err = p.NewSpaceMethod(ctx, contract, stateDB, method, args)
	case RemoveKeychainAdminMethod:
		bz, err = p.RemoveKeychainAdminMethod(ctx, contract, stateDB, method, args)
	case UpdateKeychainMethod:
		bz, err = p.UpdateKeychainMethod(ctx, contract, stateDB, method, args)
	case AddSpaceOwnerMethod:
		bz, err = p.AddSpaceOwnerMethod(ctx, contract, contract.Caller(), stateDB, method, args)
	case RemoveSpaceOwnerMethod:
		bz, err = p.RemoveSpaceOwnerMethod(ctx, contract, contract.Caller(), stateDB, method, args)
	case NewKeyRequestMethod:
		bz, err = p.NewKeyRequestMethod(ctx, contract, contract.Caller(), stateDB, method, args)
	case NewSignRequestMethod:
		bz, err = p.NewSignRequestMethod(ctx, contract, contract.Caller(), stateDB, method, args)
	case UpdateKeyMethod:
		bz, err = p.UpdateKeyMethod(ctx, contract, contract.Caller(), stateDB, method, args)
	case UpdateSpaceMethod:
		bz, err = p.UpdateSpaceMethod(ctx, contract, contract.Caller(), stateDB, method, args)
	// queries
	case AllKeysMethod:
		bz, err = p.AllKeysMethod(ctx, stateDB, method, args)
	case KeyByIdMethod:
		bz, err = p.KeyByIdMethod(ctx, stateDB, method, args)
	case KeysBySpaceIdMethod:
		bz, err = p.KeysBySpaceIdMethod(ctx, stateDB, method, args)
	case KeyRequestMethod:
		bz, err = p.KeyRequestMethod(ctx, stateDB, method, args)
	case KeyRequestsMethod:
		bz, err = p.KeyRequestsMethod(ctx, stateDB, method, args)
	case KeychainMethod:
		bz, err = p.KeychainMethod(ctx, stateDB, method, args)
	case KeychainsMethod:
		bz, err = p.KeychainsMethod(ctx, stateDB, method, args)
	case SignRequestByIdMethod:
		bz, err = p.SignRequestByIdMethod(ctx, stateDB, method, args)
	case SignRequestsMethod:
		bz, err = p.SignRequestsMethod(ctx, stateDB, method, args)
	case SpaceByIdMethod:
		bz, err = p.SpaceByIdMethod(ctx, stateDB, method, args)
	case SpacesMethod:
		bz, err = p.SpacesMethod(ctx, stateDB, method, args)
	case SpacesByOwnerMethod:
		bz, err = p.SpacesByOwnerMethod(ctx, stateDB, method, args)
	default:
		return nil, fmt.Errorf(evmcmn.ErrUnknownMethod, method.Name)
	}

	return bz, err
}

// IsTransaction checks if the given method name corresponds to a transaction or query.
//
// Available warden transactions are:
//
//	-
func (*Precompile) IsTransaction(method *abi.Method) bool {
	switch method.Name {
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
