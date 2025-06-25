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
	srvflags "github.com/cosmos/evm/server/flags"
	"github.com/cosmos/evm/x/erc20"
	erc20keeper "github.com/cosmos/evm/x/erc20/keeper"
	erc20types "github.com/cosmos/evm/x/erc20/types"
	erc20v2 "github.com/cosmos/evm/x/erc20/v2"
	"github.com/cosmos/evm/x/feemarket"
	feemarketkeeper "github.com/cosmos/evm/x/feemarket/keeper"
	feemarkettypes "github.com/cosmos/evm/x/feemarket/types"
	ibccallbackskeeper "github.com/cosmos/evm/x/ibc/callbacks/keeper"
	"github.com/cosmos/evm/x/ibc/transfer"
	transferkeeper "github.com/cosmos/evm/x/ibc/transfer/keeper" // NOTE: override ICS20 keeper to support IBC transfers of ERC20 tokens
	transferv2 "github.com/cosmos/evm/x/ibc/transfer/v2"
	"github.com/cosmos/evm/x/precisebank"
	precisebankkeeper "github.com/cosmos/evm/x/precisebank/keeper"
	precisebanktypes "github.com/cosmos/evm/x/precisebank/types"
	evm "github.com/cosmos/evm/x/vm"
	evmkeeper "github.com/cosmos/evm/x/vm/keeper"
	evmtypes "github.com/cosmos/evm/x/vm/types"
	icamodule "github.com/cosmos/ibc-go/v10/modules/apps/27-interchain-accounts"
	icacontroller "github.com/cosmos/ibc-go/v10/modules/apps/27-interchain-accounts/controller"
	icacontrollerkeeper "github.com/cosmos/ibc-go/v10/modules/apps/27-interchain-accounts/controller/keeper"
	icacontrollertypes "github.com/cosmos/ibc-go/v10/modules/apps/27-interchain-accounts/controller/types"
	icahost "github.com/cosmos/ibc-go/v10/modules/apps/27-interchain-accounts/host"
	icahostkeeper "github.com/cosmos/ibc-go/v10/modules/apps/27-interchain-accounts/host/keeper"
	icahosttypes "github.com/cosmos/ibc-go/v10/modules/apps/27-interchain-accounts/host/types"
	icatypes "github.com/cosmos/ibc-go/v10/modules/apps/27-interchain-accounts/types"
	ibccallbacks "github.com/cosmos/ibc-go/v10/modules/apps/callbacks"
	ibctransfer "github.com/cosmos/ibc-go/v10/modules/apps/transfer"
	ibctransfertypes "github.com/cosmos/ibc-go/v10/modules/apps/transfer/types"
	ibc "github.com/cosmos/ibc-go/v10/modules/core"
	ibcclienttypes "github.com/cosmos/ibc-go/v10/modules/core/02-client/types"
	ibcconnectiontypes "github.com/cosmos/ibc-go/v10/modules/core/03-connection/types"
	porttypes "github.com/cosmos/ibc-go/v10/modules/core/05-port/types"
	ibcapi "github.com/cosmos/ibc-go/v10/modules/core/api"
	ibcexported "github.com/cosmos/ibc-go/v10/modules/core/exported"
	ibckeeper "github.com/cosmos/ibc-go/v10/modules/core/keeper"
	solomachine "github.com/cosmos/ibc-go/v10/modules/light-clients/06-solomachine"
	ibctm "github.com/cosmos/ibc-go/v10/modules/light-clients/07-tendermint"
	_ "github.com/ethereum/go-ethereum/eth/tracers/js" // Force-load the tracer engines to trigger registration due to Go-Ethereum v1.10.15 changes
	_ "github.com/ethereum/go-ethereum/eth/tracers/native"
	"github.com/spf13/cast"

	wasminterop "github.com/warden-protocol/wardenprotocol/warden/app/wasm-interop"
	wardenkeeper "github.com/warden-protocol/wardenprotocol/warden/x/warden/keeper"
)

// registerLegacyModules register IBC and WASM keepers and non dependency inject modules.
func (app *App) registerLegacyModules(appOpts servertypes.AppOptions, wasmOpts []wasmkeeper.Option) wasmtypes.NodeConfig {
	// set up non depinject support modules store keys
	if err := app.RegisterStores(
		storetypes.NewKVStoreKey(ibcexported.StoreKey),
		storetypes.NewKVStoreKey(ibctransfertypes.StoreKey),
		storetypes.NewKVStoreKey(icahosttypes.StoreKey),
		storetypes.NewKVStoreKey(icacontrollertypes.StoreKey),
		storetypes.NewTransientStoreKey(paramstypes.TStoreKey),
		// wasm kv store
		storetypes.NewKVStoreKey(wasmtypes.StoreKey),
		// evm kv store
		storetypes.NewKVStoreKey(evmtypes.StoreKey),
		storetypes.NewTransientStoreKey(evmtypes.TransientKey),
		storetypes.NewKVStoreKey(erc20types.StoreKey),
		storetypes.NewKVStoreKey(precisebanktypes.StoreKey),
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
	// evm subspaces
	app.ParamsKeeper.Subspace(evmtypes.ModuleName).WithKeyTable(evmtypes.ParamKeyTable()) //nolint:staticcheck
	app.ParamsKeeper.Subspace(feemarkettypes.ModuleName).WithKeyTable(feemarkettypes.ParamKeyTable())
	app.ParamsKeeper.Subspace(erc20types.ModuleName)

	authAddr := authtypes.NewModuleAddress(govtypes.ModuleName).String()

	// Create IBC keeper
	app.IBCKeeper = ibckeeper.NewKeeper(
		app.appCodec,
		runtime.NewKVStoreService(app.GetKey(ibcexported.StoreKey)),
		app.GetSubspace(ibcexported.ModuleName),
		app.UpgradeKeeper,
		authAddr,
	)

	// Register the proposal types
	// Deprecated: Avoid adding new handlers, instead use the new proposal flow
	// by granting the governance module the right to execute the message.
	// See: https://docs.cosmos.network/main/modules/gov#proposal-messages
	govRouter := govv1beta1.NewRouter()
	govRouter.AddRoute(govtypes.RouterKey, govv1beta1.ProposalHandler)

	// Create interchain account keepers
	app.ICAHostKeeper = icahostkeeper.NewKeeper(
		app.appCodec,
		runtime.NewKVStoreService(app.GetKey(icahosttypes.StoreKey)),
		app.GetSubspace(icahosttypes.SubModuleName),
		app.IBCKeeper.ChannelKeeper,
		app.IBCKeeper.ChannelKeeper,
		app.AccountKeeper,
		app.MsgServiceRouter(),
		app.GRPCQueryRouter(),
		authAddr,
	)

	app.ICAControllerKeeper = icacontrollerkeeper.NewKeeper(
		app.appCodec,
		runtime.NewKVStoreService(app.GetKey(icacontrollertypes.StoreKey)),
		app.GetSubspace(icacontrollertypes.SubModuleName),
		app.IBCKeeper.ChannelKeeper,
		app.IBCKeeper.ChannelKeeper,
		app.MsgServiceRouter(),
		authAddr,
	)
	app.GovKeeper.SetLegacyRouter(govRouter)

	// Cosmos EVM keepers
	app.FeeMarketKeeper = feemarketkeeper.NewKeeper(
		app.appCodec,
		authtypes.NewModuleAddress(govtypes.ModuleName),
		app.GetKey(feemarkettypes.StoreKey),
		app.GetTransientKey(feemarkettypes.TransientKey),
	)

	// Set up PreciseBank keeper
	//
	// NOTE: PreciseBank is not needed if SDK use 18 decimals for gas coin. Use BankKeeper instead.
	app.PreciseBankKeeper = precisebankkeeper.NewKeeper(
		app.appCodec,
		app.GetKey(precisebanktypes.StoreKey),
		app.BankKeeper,
		app.AccountKeeper,
	)

	tracer := cast.ToString(appOpts.Get(srvflags.EVMTracer))

	app.EVMKeeper = evmkeeper.NewKeeper(
		app.appCodec,
		app.GetKey(evmtypes.StoreKey),
		app.GetTransientKey(evmtypes.TransientKey),
		authtypes.NewModuleAddress(govtypes.ModuleName),
		app.AccountKeeper,
		app.PreciseBankKeeper,
		app.StakingKeeper,
		app.FeeMarketKeeper,
		&app.Erc20Keeper,
		tracer,
	)

	app.Erc20Keeper = erc20keeper.NewKeeper(
		app.GetKey(erc20types.StoreKey),
		app.AppCodec(),
		authtypes.NewModuleAddress(govtypes.ModuleName),
		app.AccountKeeper,
		app.BankKeeper,
		app.EVMKeeper,
		app.StakingKeeper,
		&app.TransferKeeper,
	)

	// instantiate IBC transfer keeper AFTER the ERC-20 keeper to use it in the instantiation
	app.TransferKeeper = transferkeeper.NewKeeper(
		app.appCodec,
		runtime.NewKVStoreService(app.GetKey(ibctransfertypes.StoreKey)),
		app.GetSubspace(ibctransfertypes.ModuleName),
		app.IBCKeeper.ChannelKeeper,
		app.IBCKeeper.ChannelKeeper,
		app.MsgServiceRouter(),
		app.AccountKeeper,
		app.BankKeeper,
		app.Erc20Keeper,
		authAddr,
	)

	// WASM keepers

	app.ParamsKeeper.Subspace(wasmtypes.ModuleName)

	homePath := cast.ToString(appOpts.Get(flags.FlagHome))
	wasmDir := filepath.Join(homePath, "wasm")

	nodeConfig, err := wasm.ReadNodeConfig(appOpts)
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
		app.IBCKeeper.ChannelKeeper,
		app.IBCKeeper.ChannelKeeper,
		app.TransferKeeper,
		app.MsgServiceRouter(),
		app.GRPCQueryRouter(),
		wasmDir,
		nodeConfig,
		wasmtypes.VMConfig{},
		AllCapabilities(),
		authtypes.NewModuleAddress(govtypes.ModuleName).String(),
		wasmOpts...,
	)

	app.ContractKeeper = wasmkeeper.NewDefaultPermissionKeeper(&app.WasmKeeper)

	// Create fee enabled wasm ibc Stack
	wasmStackIBCHandler := wasm.NewIBCHandler(app.WasmKeeper, app.IBCKeeper.ChannelKeeper, app.IBCKeeper.ChannelKeeper)

	// Create Interchain Accounts Stack
	// SendPacket, since it is originating from the application to core IBC:
	// icaAuthModuleKeeper.SendTx -> icaController.SendPacket -> fee.SendPacket -> channel.SendPacket
	var icaControllerStack porttypes.IBCModule
	// integration point for custom authentication modules
	// see https://medium.com/the-interchain-foundation/ibc-go-v6-changes-to-interchain-accounts-and-how-it-impacts-your-chain-806c185300d7
	var noAuthzModule porttypes.IBCModule
	icaControllerStack = icacontroller.NewIBCMiddlewareWithAuth(noAuthzModule, app.ICAControllerKeeper)
	icaControllerStack = icacontroller.NewIBCMiddlewareWithAuth(icaControllerStack, app.ICAControllerKeeper)
	icaControllerStack = ibccallbacks.NewIBCMiddleware(icaControllerStack, app.IBCKeeper.ChannelKeeper, wasmStackIBCHandler, wasm.DefaultMaxIBCCallbackGas)
	icaICS4Wrapper := icaControllerStack.(porttypes.ICS4Wrapper)
	// Since the callbacks middleware itself is an ics4wrapper, it needs to be passed to the ica controller keeper
	app.ICAControllerKeeper.WithICS4Wrapper(icaICS4Wrapper)

	// RecvPacket, message that originates from core IBC and goes down to app, the flow is:
	// channel.RecvPacket -> icaHost.OnRecvPacket
	icaHostStack := icahost.NewIBCModule(app.ICAHostKeeper)

	// Create Transfer Stack
	var transferStack porttypes.IBCModule
	transferStack = transfer.NewIBCModule(app.TransferKeeper)
	maxCallbackGas := uint64(1_000_000)
	transferStack = erc20.NewIBCMiddleware(app.Erc20Keeper, transferStack)
	app.CallbackKeeper = ibccallbackskeeper.NewKeeper(
		app.AccountKeeper,
		app.EVMKeeper,
		app.Erc20Keeper,
	)
	transferStack = ibccallbacks.NewIBCMiddleware(transferStack, app.IBCKeeper.ChannelKeeper, app.CallbackKeeper, maxCallbackGas)
	transferStack = ibccallbacks.NewIBCMiddleware(transferStack, app.IBCKeeper.ChannelKeeper, wasmStackIBCHandler, wasm.DefaultMaxIBCCallbackGas)
	transferICS4Wrapper := transferStack.(porttypes.ICS4Wrapper)
	// Since the callbacks middleware itself is an ics4wrapper, it needs to be passed to the ica controller keeper
	app.TransferKeeper.WithICS4Wrapper(transferICS4Wrapper)

	var transferStackV2 ibcapi.IBCModule
	transferStackV2 = transferv2.NewIBCModule(app.TransferKeeper)
	transferStackV2 = erc20v2.NewIBCMiddleware(transferStackV2, app.Erc20Keeper)

	// Create static IBC router, add transfer route, then set and seal it
	ibcRouter := porttypes.NewRouter().
		AddRoute(ibctransfertypes.ModuleName, transferStack).
		AddRoute(wasmtypes.ModuleName, wasmStackIBCHandler).
		AddRoute(icacontrollertypes.SubModuleName, icaControllerStack).
		AddRoute(icahosttypes.SubModuleName, icaHostStack)

	ibcRouterV2 := ibcapi.NewRouter()
	ibcRouterV2.AddRoute(ibctransfertypes.ModuleName, transferStackV2)

	// this line is used by starport scaffolding # ibc/app/module

	app.IBCKeeper.SetRouter(ibcRouter)
	app.IBCKeeper.SetRouterV2(ibcRouterV2)

	clientKeeper := app.IBCKeeper.ClientKeeper
	storeProvider := app.IBCKeeper.ClientKeeper.GetStoreProvider()
	tmLightClientModule := ibctm.NewLightClientModule(app.appCodec, storeProvider)
	clientKeeper.AddRoute(ibctm.ModuleName, &tmLightClientModule)

	// NOTE: we are just adding the default Ethereum precompiles here.
	// Additional precompiles could be added if desired.
	// Configure EVM precompiles
	precompiles := NewAvailableStaticPrecompiles(
		*app.StakingKeeper,
		app.DistrKeeper,
		app.PreciseBankKeeper,
		app.Erc20Keeper,
		app.TransferKeeper,
		app.IBCKeeper.ChannelKeeper,
		app.EVMKeeper,
		*app.GovKeeper,
		app.SlashingKeeper,
		app.EvidenceKeeper,
		app.AppCodec(),
		app.WardenKeeper,
		app.ActKeeper,
		app.OracleKeeper,
		app.AsyncKeeper,
		app.SchedKeeper,
	)

	app.EVMKeeper.WithStaticPrecompiles(
		precompiles,
	)

	// register IBC modules
	if err := app.RegisterModules(
		solomachine.AppModule{},
		ibc.NewAppModule(app.IBCKeeper),
		icamodule.NewAppModule(&app.ICAControllerKeeper, &app.ICAHostKeeper),
		ibctm.NewAppModule(tmLightClientModule),
		transfer.NewAppModule(app.TransferKeeper),
		// wasm module
		wasm.NewAppModule(app.AppCodec(), &app.WasmKeeper, app.StakingKeeper, app.AccountKeeper, app.BankKeeper, app.MsgServiceRouter(), app.GetSubspace(wasmtypes.ModuleName)),
		// evm modules
		evm.NewAppModule(app.EVMKeeper, app.AccountKeeper, app.AccountKeeper.AddressCodec()),
		feemarket.NewAppModule(app.FeeMarketKeeper),
		erc20.NewAppModule(app.Erc20Keeper, app.AccountKeeper),
		precisebank.NewAppModule(app.PreciseBankKeeper, app.BankKeeper, app.AccountKeeper),
	); err != nil {
		panic(err)
	}

	return nodeConfig
}

// Since the IBC and WASM modules don't support dependency injection, we need to
// manually register the modules on the client side.
// This needs to be removed after IBC supports App Wiring.
func RegisterLegacyModules(registry cdctypes.InterfaceRegistry) map[string]appmodule.AppModule {
	modules := map[string]appmodule.AppModule{
		ibcexported.ModuleName: ibc.AppModule{},
		ibctransfertypes.ModuleName: transfer.AppModule{
			AppModule: &ibctransfer.AppModule{},
		},
		icatypes.ModuleName:       icamodule.AppModule{},
		ibctm.ModuleName:          ibctm.AppModule{},
		solomachine.ModuleName:    solomachine.AppModule{},
		wasmtypes.ModuleName:      wasm.AppModule{},
		evmtypes.ModuleName:       evm.AppModule{},
		feemarkettypes.ModuleName: feemarket.AppModule{},
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
