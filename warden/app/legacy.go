package app

import (
	"fmt"
	"path/filepath"

	"cosmossdk.io/core/appmodule"
	storetypes "cosmossdk.io/store/types"
	"github.com/CosmWasm/wasmd/x/wasm"
	wasmkeeper "github.com/CosmWasm/wasmd/x/wasm/keeper"
	wasmtypes "github.com/CosmWasm/wasmd/x/wasm/types"
	"github.com/cosmos/cosmos-sdk/client/flags"
	cdctypes "github.com/cosmos/cosmos-sdk/codec/types"
	"github.com/cosmos/cosmos-sdk/runtime"
	servertypes "github.com/cosmos/cosmos-sdk/server/types"
	authtypes "github.com/cosmos/cosmos-sdk/x/auth/types"
	distrkeeper "github.com/cosmos/cosmos-sdk/x/distribution/keeper"
	govtypes "github.com/cosmos/cosmos-sdk/x/gov/types"
	govv1beta1 "github.com/cosmos/cosmos-sdk/x/gov/types/v1beta1"
	paramstypes "github.com/cosmos/cosmos-sdk/x/params/types"
	ibchookskeeper "github.com/cosmos/ibc-apps/modules/ibc-hooks/v8/keeper"
	"github.com/cosmos/ibc-go/modules/capability"
	capabilitykeeper "github.com/cosmos/ibc-go/modules/capability/keeper"
	capabilitytypes "github.com/cosmos/ibc-go/modules/capability/types"
	icamodule "github.com/cosmos/ibc-go/v8/modules/apps/27-interchain-accounts"
	icacontroller "github.com/cosmos/ibc-go/v8/modules/apps/27-interchain-accounts/controller"
	icacontrollerkeeper "github.com/cosmos/ibc-go/v8/modules/apps/27-interchain-accounts/controller/keeper"
	icacontrollertypes "github.com/cosmos/ibc-go/v8/modules/apps/27-interchain-accounts/controller/types"
	icahost "github.com/cosmos/ibc-go/v8/modules/apps/27-interchain-accounts/host"
	icahostkeeper "github.com/cosmos/ibc-go/v8/modules/apps/27-interchain-accounts/host/keeper"
	icahosttypes "github.com/cosmos/ibc-go/v8/modules/apps/27-interchain-accounts/host/types"
	icatypes "github.com/cosmos/ibc-go/v8/modules/apps/27-interchain-accounts/types"
	ibcfee "github.com/cosmos/ibc-go/v8/modules/apps/29-fee"
	ibcfeekeeper "github.com/cosmos/ibc-go/v8/modules/apps/29-fee/keeper"
	ibcfeetypes "github.com/cosmos/ibc-go/v8/modules/apps/29-fee/types"
	ibctransferkeeper "github.com/cosmos/ibc-go/v8/modules/apps/transfer/keeper"
	ibctransfertypes "github.com/cosmos/ibc-go/v8/modules/apps/transfer/types"
	ibc "github.com/cosmos/ibc-go/v8/modules/core"
	ibcclienttypes "github.com/cosmos/ibc-go/v8/modules/core/02-client/types" //nolint:all
	ibcconnectiontypes "github.com/cosmos/ibc-go/v8/modules/core/03-connection/types"
	porttypes "github.com/cosmos/ibc-go/v8/modules/core/05-port/types"
	ibcexported "github.com/cosmos/ibc-go/v8/modules/core/exported"
	ibckeeper "github.com/cosmos/ibc-go/v8/modules/core/keeper"
	solomachine "github.com/cosmos/ibc-go/v8/modules/light-clients/06-solomachine"
	ibctm "github.com/cosmos/ibc-go/v8/modules/light-clients/07-tendermint"
	"github.com/ethereum/go-ethereum/core/vm"
	"github.com/spf13/cast"

	// ibctransfer "github.com/cosmos/ibc-go/v8/modules/apps/transfer"
	ibchooks "github.com/cosmos/ibc-apps/modules/ibc-hooks/v8"
	ibchookstypes "github.com/cosmos/ibc-apps/modules/ibc-hooks/v8/types"
	gmpmiddleware "github.com/warden-protocol/wardenprotocol/warden/app/gmp"
	wasminterop "github.com/warden-protocol/wardenprotocol/warden/app/wasm-interop"
	gmpkeeper "github.com/warden-protocol/wardenprotocol/warden/x/gmp/keeper"
	gmpmodule "github.com/warden-protocol/wardenprotocol/warden/x/gmp/module"
	gmptypes "github.com/warden-protocol/wardenprotocol/warden/x/gmp/types"
	"github.com/warden-protocol/wardenprotocol/warden/x/ibctransfer/keeper"
	ibctransfer "github.com/warden-protocol/wardenprotocol/warden/x/ibctransfer/module"
	wardenkeeper "github.com/warden-protocol/wardenprotocol/warden/x/warden/keeper"

	// evmos
	srvflags "github.com/evmos/evmos/v18/server/flags"
	"github.com/evmos/evmos/v18/x/evm"
	evmkeeper "github.com/evmos/evmos/v18/x/evm/keeper"
	evmtypes "github.com/evmos/evmos/v18/x/evm/types"
	"github.com/evmos/evmos/v18/x/feemarket"
	feemarketkeeper "github.com/evmos/evmos/v18/x/feemarket/keeper"
	feemarkettypes "github.com/evmos/evmos/v18/x/feemarket/types"
	// this line is used by starport scaffolding # ibc/app/import
)

// registerLegacyModules register IBC and WASM keepers and non dependency inject modules.
func (app *App) registerLegacyModules(appOpts servertypes.AppOptions, wasmOpts []wasmkeeper.Option) wasmtypes.WasmConfig {
	// set up non depinject support modules store keys
	if err := app.RegisterStores(
		storetypes.NewKVStoreKey(capabilitytypes.StoreKey),
		storetypes.NewKVStoreKey(ibcexported.StoreKey),
		storetypes.NewKVStoreKey(ibctransfertypes.StoreKey),
		storetypes.NewKVStoreKey(ibcfeetypes.StoreKey),
		storetypes.NewKVStoreKey(icahosttypes.StoreKey),
		storetypes.NewKVStoreKey(icacontrollertypes.StoreKey),
		storetypes.NewKVStoreKey(ibchookstypes.StoreKey),
		storetypes.NewKVStoreKey(gmptypes.StoreKey),
		storetypes.NewMemoryStoreKey(capabilitytypes.MemStoreKey),
		storetypes.NewTransientStoreKey(paramstypes.TStoreKey),
		// wasm kv store
		storetypes.NewKVStoreKey(wasmtypes.StoreKey),
		// evm kv store
		storetypes.NewKVStoreKey(evmtypes.StoreKey),
		storetypes.NewTransientStoreKey(evmtypes.TransientKey),
		// feemarket kv store
		storetypes.NewKVStoreKey(feemarkettypes.StoreKey),
		storetypes.NewTransientStoreKey(feemarkettypes.TransientKey),
	); err != nil {
		panic(err)
	}

	// register the key tables for legacy param subspaces
	keyTable := ibcclienttypes.ParamKeyTable()
	keyTable.RegisterParamSet(&ibcconnectiontypes.Params{})
	app.ParamsKeeper.Subspace(ibcexported.ModuleName).WithKeyTable(keyTable)
	app.ParamsKeeper.Subspace(ibctransfertypes.ModuleName).WithKeyTable(ibctransfertypes.ParamKeyTable())
	app.ParamsKeeper.Subspace(icacontrollertypes.SubModuleName).WithKeyTable(icacontrollertypes.ParamKeyTable())
	app.ParamsKeeper.Subspace(icahosttypes.SubModuleName).WithKeyTable(icahosttypes.ParamKeyTable())
	// evmOS subspaces
	app.ParamsKeeper.Subspace(evmtypes.ModuleName).WithKeyTable(evmtypes.ParamKeyTable()) //nolint:staticcheck
	app.ParamsKeeper.Subspace(feemarkettypes.ModuleName).WithKeyTable(feemarkettypes.ParamKeyTable())

	// add capability keeper and ScopeToModule for ibc module
	app.CapabilityKeeper = capabilitykeeper.NewKeeper(
		app.AppCodec(),
		app.GetKey(capabilitytypes.StoreKey),
		app.GetMemKey(capabilitytypes.MemStoreKey),
	)

	// add capability keeper and ScopeToModule for ibc module
	scopedIBCKeeper := app.CapabilityKeeper.ScopeToModule(ibcexported.ModuleName)
	scopedIBCTransferKeeper := app.CapabilityKeeper.ScopeToModule(ibctransfertypes.ModuleName)
	scopedICAControllerKeeper := app.CapabilityKeeper.ScopeToModule(icacontrollertypes.SubModuleName)
	scopedICAHostKeeper := app.CapabilityKeeper.ScopeToModule(icahosttypes.SubModuleName)

	// Create IBC keeper
	app.IBCKeeper = ibckeeper.NewKeeper(
		app.appCodec,
		app.GetKey(ibcexported.StoreKey),
		app.GetSubspace(ibcexported.ModuleName),
		app.StakingKeeper,
		app.UpgradeKeeper,
		scopedIBCKeeper,
		authtypes.NewModuleAddress(govtypes.ModuleName).String(),
	)

	// Register the proposal types
	// Deprecated: Avoid adding new handlers, instead use the new proposal flow
	// by granting the governance module the right to execute the message.
	// See: https://docs.cosmos.network/main/modules/gov#proposal-messages
	govRouter := govv1beta1.NewRouter()
	govRouter.AddRoute(govtypes.RouterKey, govv1beta1.ProposalHandler)

	app.IBCFeeKeeper = ibcfeekeeper.NewKeeper(
		app.appCodec, app.GetKey(ibcfeetypes.StoreKey),
		app.IBCKeeper.ChannelKeeper, // may be replaced with IBC middleware
		app.IBCKeeper.ChannelKeeper,
		app.IBCKeeper.PortKeeper, app.AccountKeeper, app.BankKeeper,
	)

	app.GmpKeeper = gmpkeeper.NewKeeper(
		app.appCodec,
		app.GetKey(gmptypes.ModuleName),
		authtypes.NewModuleAddress(govtypes.ModuleName).String(),
		app.TransferKeeper,
	)

	// Create Transfer Keepers
	ibcTransferKeeper := ibctransferkeeper.NewKeeper(
		app.appCodec,
		app.GetKey(ibctransfertypes.StoreKey),
		app.GetSubspace(ibctransfertypes.ModuleName),
		app.IBCFeeKeeper,
		app.IBCKeeper.ChannelKeeper,
		app.IBCKeeper.PortKeeper,
		app.AccountKeeper,
		app.BankKeeper,
		scopedIBCTransferKeeper,
		authtypes.NewModuleAddress(govtypes.ModuleName).String(),
	)

	app.IBCHooksKeeper = ibchookskeeper.NewKeeper(
		app.GetKey(ibchookstypes.StoreKey),
	)
	wasmHooks := ibchooks.NewWasmHooks(&app.IBCHooksKeeper, nil, AccountAddressPrefix)
	app.Ics20WasmHooks = &wasmHooks
	app.HooksICS4Wrapper = ibchooks.NewICS4Middleware(
		app.IBCKeeper.ChannelKeeper,
		app.Ics20WasmHooks,
	)

	// Create IBC transfer keeper
	app.TransferKeeper = keeper.NewKeeper(
		app.appCodec,
		app.GetKey(ibctransfertypes.StoreKey),
		app.GetSubspace(ibctransfertypes.ModuleName),
		app.HooksICS4Wrapper,
		app.IBCKeeper.ChannelKeeper,
		app.IBCKeeper.PortKeeper,
		app.AccountKeeper,
		app.BankKeeper,
		scopedIBCTransferKeeper,
		app.GmpKeeper,
	)
	app.TransferKeeper.Keeper = ibcTransferKeeper

	// Reassign the GMP transfer keeper
	app.GmpKeeper.IBCKeeper = &app.TransferKeeper

	// Create interchain account keepers
	app.ICAHostKeeper = icahostkeeper.NewKeeper(
		app.appCodec,
		app.GetKey(icahosttypes.StoreKey),
		app.GetSubspace(icahosttypes.SubModuleName),
		app.IBCFeeKeeper, // use ics29 fee as ics4Wrapper in middleware stack
		app.IBCKeeper.ChannelKeeper,
		app.IBCKeeper.PortKeeper,
		app.AccountKeeper,
		scopedICAHostKeeper,
		app.MsgServiceRouter(),
		authtypes.NewModuleAddress(govtypes.ModuleName).String(),
	)
	app.ICAControllerKeeper = icacontrollerkeeper.NewKeeper(
		app.appCodec,
		app.GetKey(icacontrollertypes.StoreKey),
		app.GetSubspace(icacontrollertypes.SubModuleName),
		app.IBCFeeKeeper, // use ics29 fee as ics4Wrapper in middleware stack
		app.IBCKeeper.ChannelKeeper,
		app.IBCKeeper.PortKeeper,
		scopedICAControllerKeeper,
		app.MsgServiceRouter(),
		authtypes.NewModuleAddress(govtypes.ModuleName).String(),
	)
	app.GovKeeper.SetLegacyRouter(govRouter)

	// wasm keepers
	scopedWasmKeeper := app.CapabilityKeeper.ScopeToModule(wasmtypes.ModuleName)

	app.ParamsKeeper.Subspace(wasmtypes.ModuleName)

	homePath := cast.ToString(appOpts.Get(flags.FlagHome))
	wasmDir := filepath.Join(homePath, "wasm")
	wasmConfig, err := wasm.ReadWasmConfig(appOpts)
	if err != nil {
		panic(fmt.Sprintf("error while reading wasm config: %s", err))
	}

	encoders := WardenProtocolCustomEncoder()
	queryPlugins := WardenProtocolCustomQueryPlugin(app.WardenKeeper)
	wasmOpts = append(wasmOpts, wasmkeeper.WithMessageEncoders(&encoders), wasmkeeper.WithQueryPlugins(&queryPlugins))

	app.WasmKeeper = wasmkeeper.NewKeeper(
		app.AppCodec(),
		runtime.NewKVStoreService(app.GetKey(wasmtypes.StoreKey)),
		app.AccountKeeper,
		app.BankKeeper,
		app.StakingKeeper,
		distrkeeper.NewQuerier(app.DistrKeeper),
		app.IBCFeeKeeper, // ISC4 Wrapper: fee IBC middleware
		app.IBCKeeper.ChannelKeeper,
		app.IBCKeeper.PortKeeper,
		scopedWasmKeeper,
		app.TransferKeeper,
		app.MsgServiceRouter(),
		app.GRPCQueryRouter(),
		wasmDir,
		wasmConfig,
		AllCapabilities(),
		authtypes.NewModuleAddress(govtypes.ModuleName).String(),
		wasmOpts...,
	)

	app.ContractKeeper = wasmkeeper.NewDefaultPermissionKeeper(&app.WasmKeeper)
	// evmOS keepers
	app.FeeMarketKeeper = feemarketkeeper.NewKeeper(
		app.appCodec,
		authtypes.NewModuleAddress(govtypes.ModuleName),
		app.GetKey(feemarkettypes.StoreKey),
		app.GetTransientKey(feemarkettypes.TransientKey),
		app.GetSubspace(feemarkettypes.ModuleName),
	)

	tracer := cast.ToString(appOpts.Get(srvflags.EVMTracer))

	app.EvmKeeper = evmkeeper.NewKeeper(
		app.appCodec,
		app.GetKey(evmtypes.StoreKey),
		app.GetTransientKey(evmtypes.TransientKey),
		authtypes.NewModuleAddress(govtypes.ModuleName),
		app.AccountKeeper,
		app.BankKeeper,
		app.StakingKeeper,
		app.FeeMarketKeeper,
		tracer,
		app.GetSubspace(evmtypes.ModuleName),
	)

	// NOTE: we are just adding the default Ethereum precompiles here.
	// Additional precompiles could be added if desired.
	app.EvmKeeper.WithPrecompiles(
		vm.PrecompiledContractsBerlin,
	)

	// integration point for custom authentication modules
	var noAuthzModule porttypes.IBCModule
	icaControllerIBCModule := ibcfee.NewIBCMiddleware(
		icacontroller.NewIBCMiddleware(noAuthzModule, app.ICAControllerKeeper),
		app.IBCFeeKeeper,
	)

	icaHostIBCModule := ibcfee.NewIBCMiddleware(icahost.NewIBCModule(app.ICAHostKeeper), app.IBCFeeKeeper)

	// Create fee enabled wasm ibc Stack
	var wasmStack porttypes.IBCModule
	wasmStack = wasm.NewIBCHandler(app.WasmKeeper, app.IBCKeeper.ChannelKeeper, app.IBCFeeKeeper)
	wasmStack = ibcfee.NewIBCMiddleware(wasmStack, app.IBCFeeKeeper)

	var ibcStack porttypes.IBCModule
	ibcStack = ibctransfer.NewIBCModule(app.TransferKeeper)
	ibcStack = ibcfee.NewIBCMiddleware(ibcStack, app.IBCFeeKeeper)
	ibcStack = ibchooks.NewIBCMiddleware(ibcStack, &app.HooksICS4Wrapper)
	ibcStack = gmpmiddleware.NewIBCMiddleware(
		ibcStack,
		gmpmiddleware.NewGmpHandler(app.GmpKeeper, authtypes.NewModuleAddress(gmptypes.ModuleName).String()),
	)

	// Create static IBC router, add transfer route, then set and seal it
	ibcRouter := porttypes.NewRouter().
		AddRoute(ibctransfertypes.ModuleName, ibcStack).
		AddRoute(wasmtypes.ModuleName, wasmStack).
		AddRoute(icacontrollertypes.SubModuleName, icaControllerIBCModule).
		AddRoute(icahosttypes.SubModuleName, icaHostIBCModule)

	// this line is used by starport scaffolding # ibc/app/module

	app.IBCKeeper.SetRouter(ibcRouter)

	app.ScopedIBCKeeper = scopedIBCKeeper
	app.ScopedIBCTransferKeeper = scopedIBCTransferKeeper
	app.ScopedICAHostKeeper = scopedICAHostKeeper
	app.ScopedICAControllerKeeper = scopedICAControllerKeeper
	app.Ics20WasmHooks.ContractKeeper = &app.WasmKeeper

	// register IBC modules
	if err := app.RegisterModules(
		ibc.NewAppModule(app.IBCKeeper),
		ibctransfer.NewAppModule(app.TransferKeeper),
		ibcfee.NewAppModule(app.IBCFeeKeeper),
		icamodule.NewAppModule(&app.ICAControllerKeeper, &app.ICAHostKeeper),
		capability.NewAppModule(app.appCodec, *app.CapabilityKeeper, false),
		gmpmodule.NewAppModule(app.appCodec, app.GmpKeeper),
		ibctm.AppModule{},
		solomachine.AppModule{},
		ibchooks.NewAppModule(app.AccountKeeper),
		//wasm module
		wasm.NewAppModule(app.AppCodec(), &app.WasmKeeper, app.StakingKeeper, app.AccountKeeper, app.BankKeeper, app.MsgServiceRouter(), app.GetSubspace(wasmtypes.ModuleName)),
		// evmOS modules
		feemarket.NewAppModule(app.FeeMarketKeeper, app.GetSubspace(feemarkettypes.ModuleName)),
		evm.NewAppModule(app.EvmKeeper, &app.AccountKeeper, app.GetSubspace(evmtypes.ModuleName)),
	); err != nil {
		panic(err)
	}
	return wasmConfig
}

// Since the IBC and WASM modules don't support dependency injection, we need to
// manually register the modules on the client side.
// This needs to be removed after IBC supports App Wiring.
func RegisterLegacyModules(registry cdctypes.InterfaceRegistry) map[string]appmodule.AppModule {
	modules := map[string]appmodule.AppModule{
		ibcexported.ModuleName:      ibc.AppModule{},
		ibctransfertypes.ModuleName: ibctransfer.AppModule{},
		ibcfeetypes.ModuleName:      ibcfee.AppModule{},
		icatypes.ModuleName:         icamodule.AppModule{},
		capabilitytypes.ModuleName:  capability.AppModule{},
		ibctm.ModuleName:            ibctm.AppModule{},
		solomachine.ModuleName:      solomachine.AppModule{},
		gmptypes.ModuleName:         gmpmodule.AppModule{},
		wasmtypes.ModuleName:        wasm.AppModule{},
		evmtypes.ModuleName:         evm.AppModule{},
		feemarkettypes.ModuleName:   feemarket.AppModule{},
	}

	for _, module := range modules {
		if mod, ok := module.(interface {
			RegisterInterfaces(registry cdctypes.InterfaceRegistry)
		}); ok {
			mod.RegisterInterfaces(registry)
		}
	}

	return modules
}

func WardenProtocolCustomEncoder() wasmkeeper.MessageEncoders {
	return wasmkeeper.MessageEncoders{
		Custom: wasminterop.EncodeCustomMsg,
	}
}

func WardenProtocolCustomQueryPlugin(wardenKeeper wardenkeeper.Keeper) wasmkeeper.QueryPlugins {
	return wasmkeeper.QueryPlugins{
		Custom: wasminterop.CustomQuerier(wardenKeeper),
	}
}
