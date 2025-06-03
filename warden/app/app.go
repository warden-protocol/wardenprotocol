package app

import (
	"encoding/json"
	"fmt"
	"io"
	"net/url"
	"os"
	"path/filepath"
	"time"

	"cosmossdk.io/depinject"
	"cosmossdk.io/log"
	storetypes "cosmossdk.io/store/types"
	circuitkeeper "cosmossdk.io/x/circuit/keeper"
	evidencekeeper "cosmossdk.io/x/evidence/keeper"
	feegrantkeeper "cosmossdk.io/x/feegrant/keeper"
	upgradekeeper "cosmossdk.io/x/upgrade/keeper"
	wasmkeeper "github.com/CosmWasm/wasmd/x/wasm/keeper"
	wasmtypes "github.com/CosmWasm/wasmd/x/wasm/types"
	abci "github.com/cometbft/cometbft/abci/types"
	tmproto "github.com/cometbft/cometbft/proto/tendermint/types"
	dbm "github.com/cosmos/cosmos-db"
	"github.com/cosmos/cosmos-sdk/baseapp"
	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/codec"
	codectypes "github.com/cosmos/cosmos-sdk/codec/types"
	"github.com/cosmos/cosmos-sdk/runtime"
	"github.com/cosmos/cosmos-sdk/server"
	"github.com/cosmos/cosmos-sdk/server/api"
	"github.com/cosmos/cosmos-sdk/server/config"
	servertypes "github.com/cosmos/cosmos-sdk/server/types"
	testdata_pulsar "github.com/cosmos/cosmos-sdk/testutil/testdata/testpb"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/module"
	"github.com/cosmos/cosmos-sdk/x/auth"
	authante "github.com/cosmos/cosmos-sdk/x/auth/ante"
	authkeeper "github.com/cosmos/cosmos-sdk/x/auth/keeper"
	authsims "github.com/cosmos/cosmos-sdk/x/auth/simulation"
	authtypes "github.com/cosmos/cosmos-sdk/x/auth/types"
	authzkeeper "github.com/cosmos/cosmos-sdk/x/authz/keeper"
	bankkeeper "github.com/cosmos/cosmos-sdk/x/bank/keeper"
	consensuskeeper "github.com/cosmos/cosmos-sdk/x/consensus/keeper"
	crisiskeeper "github.com/cosmos/cosmos-sdk/x/crisis/keeper"
	distrkeeper "github.com/cosmos/cosmos-sdk/x/distribution/keeper"
	epochskeeper "github.com/cosmos/cosmos-sdk/x/epochs/keeper"
	"github.com/cosmos/cosmos-sdk/x/genutil"
	genutiltypes "github.com/cosmos/cosmos-sdk/x/genutil/types"
	"github.com/cosmos/cosmos-sdk/x/gov"
	govclient "github.com/cosmos/cosmos-sdk/x/gov/client"
	govkeeper "github.com/cosmos/cosmos-sdk/x/gov/keeper"
	govtypes "github.com/cosmos/cosmos-sdk/x/gov/types"
	groupkeeper "github.com/cosmos/cosmos-sdk/x/group/keeper"
	mintkeeper "github.com/cosmos/cosmos-sdk/x/mint/keeper"
	minttypes "github.com/cosmos/cosmos-sdk/x/mint/types"
	paramsclient "github.com/cosmos/cosmos-sdk/x/params/client"
	paramskeeper "github.com/cosmos/cosmos-sdk/x/params/keeper"
	paramstypes "github.com/cosmos/cosmos-sdk/x/params/types"
	slashingkeeper "github.com/cosmos/cosmos-sdk/x/slashing/keeper"
	stakingkeeper "github.com/cosmos/cosmos-sdk/x/staking/keeper"
	evmante "github.com/cosmos/evm/ante"
	cosmosevmante "github.com/cosmos/evm/ante/evm"
	evmencodingcodec "github.com/cosmos/evm/encoding/codec"
	srvflags "github.com/cosmos/evm/server/flags"
	cosmosevmtypes "github.com/cosmos/evm/types"
	cosmosevmutils "github.com/cosmos/evm/utils"
	erc20keeper "github.com/cosmos/evm/x/erc20/keeper"
	erc20types "github.com/cosmos/evm/x/erc20/types"
	feemarketkeeper "github.com/cosmos/evm/x/feemarket/keeper"
	transferkeeper "github.com/cosmos/evm/x/ibc/transfer/keeper" // NOTE: override ICS20 keeper to support IBC transfers of ERC20 tokens
	precisebankkeeper "github.com/cosmos/evm/x/precisebank/keeper"
	evmkeeper "github.com/cosmos/evm/x/vm/keeper"
	evmtypes "github.com/cosmos/evm/x/vm/types"
	icacontrollerkeeper "github.com/cosmos/ibc-go/v10/modules/apps/27-interchain-accounts/controller/keeper"
	icahostkeeper "github.com/cosmos/ibc-go/v10/modules/apps/27-interchain-accounts/host/keeper"
	ibckeeper "github.com/cosmos/ibc-go/v10/modules/core/keeper"
	corevm "github.com/ethereum/go-ethereum/core/vm"
	_ "github.com/ethereum/go-ethereum/eth/tracers/js" // Force-load the tracer engines to trigger registration due to Go-Ethereum v1.10.15 changes
	_ "github.com/ethereum/go-ethereum/eth/tracers/native"
	marketmapkeeper "github.com/skip-mev/slinky/x/marketmap/keeper"
	oraclekeeper "github.com/skip-mev/slinky/x/oracle/keeper"
	"github.com/spf13/cast"

	"github.com/warden-protocol/wardenprotocol/precompiles"
	"github.com/warden-protocol/wardenprotocol/prophet"
	"github.com/warden-protocol/wardenprotocol/prophet/plugins/echo"
	"github.com/warden-protocol/wardenprotocol/prophet/plugins/http"
	"github.com/warden-protocol/wardenprotocol/prophet/plugins/pricepred"
	"github.com/warden-protocol/wardenprotocol/shield/ast"
	"github.com/warden-protocol/wardenprotocol/warden/x/act/cosmoshield"
	actmodulekeeper "github.com/warden-protocol/wardenprotocol/warden/x/act/keeper"
	asyncmodulekeeper "github.com/warden-protocol/wardenprotocol/warden/x/async/keeper"
	schedmodulekeeper "github.com/warden-protocol/wardenprotocol/warden/x/sched/keeper"
	wardenmodulekeeper "github.com/warden-protocol/wardenprotocol/warden/x/warden/keeper"
	wardentypes "github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta3"
)

const (
	Name         = "warden"
	ChainID      = "warden_1337-1"
	ChainDenom   = "award"
	DisplayDenom = "ward"
)

// DefaultNodeHome default home directories for the application daemon.
var DefaultNodeHome string

var (
	_ runtime.AppI            = (*App)(nil)
	_ servertypes.Application = (*App)(nil)
)

// App extends an ABCI application, but with most of its parameters exported.
// They are exported for convenience in creating helper functions, as object
// capabilities aren't needed for testing.
type App struct {
	*runtime.App
	legacyAmino       *codec.LegacyAmino
	appCodec          codec.Codec
	txConfig          client.TxConfig
	interfaceRegistry codectypes.InterfaceRegistry

	prophet *prophet.P

	// keepers
	AccountKeeper         authkeeper.AccountKeeper
	BankKeeper            bankkeeper.Keeper
	StakingKeeper         *stakingkeeper.Keeper
	SlashingKeeper        slashingkeeper.Keeper
	MintKeeper            mintkeeper.Keeper
	DistrKeeper           distrkeeper.Keeper
	GovKeeper             *govkeeper.Keeper
	CrisisKeeper          *crisiskeeper.Keeper
	UpgradeKeeper         *upgradekeeper.Keeper
	ParamsKeeper          paramskeeper.Keeper
	AuthzKeeper           authzkeeper.Keeper
	EvidenceKeeper        evidencekeeper.Keeper
	FeeGrantKeeper        feegrantkeeper.Keeper
	GroupKeeper           groupkeeper.Keeper
	ConsensusParamsKeeper consensuskeeper.Keeper
	CircuitBreakerKeeper  circuitkeeper.Keeper
	EpochsKeeper          epochskeeper.Keeper

	// IBC
	IBCKeeper           *ibckeeper.Keeper // IBC Keeper must be a pointer in the app, so we can SetRouter on it correctly
	ICAControllerKeeper icacontrollerkeeper.Keeper
	ICAHostKeeper       icahostkeeper.Keeper
	TransferKeeper      transferkeeper.Keeper // for cross-chain fungible token transfers

	// Wasm
	WasmKeeper     wasmkeeper.Keeper
	ContractKeeper *wasmkeeper.PermissionedKeeper

	WardenKeeper wardenmodulekeeper.Keeper
	ActKeeper    actmodulekeeper.Keeper
	AsyncKeeper  asyncmodulekeeper.Keeper
	SchedKeeper  schedmodulekeeper.Keeper

	// Slinky
	OracleKeeper    *oraclekeeper.Keeper
	MarketMapKeeper *marketmapkeeper.Keeper

	// evm
	FeeMarketKeeper   feemarketkeeper.Keeper
	EVMKeeper         *evmkeeper.Keeper
	Erc20Keeper       erc20keeper.Keeper
	PreciseBankKeeper precisebankkeeper.Keeper

	// simulation manager
	sm *module.SimulationManager

	// processes
	slinkyClient *SlinkyClient
}

func init() {
	// Update power reduction based on the new 18-decimal base unit
	sdk.DefaultPowerReduction = cosmosevmtypes.AttoPowerReduction

	userHomeDir, err := os.UserHomeDir()
	if err != nil {
		panic(err)
	}

	DefaultNodeHome = filepath.Join(userHomeDir, "."+Name)
}

// getGovProposalHandlers return the chain proposal handlers.
func getGovProposalHandlers() []govclient.ProposalHandler {
	var govProposalHandlers []govclient.ProposalHandler
	// this line is used by starport scaffolding # stargate/app/govProposalHandlers

	govProposalHandlers = append(
		govProposalHandlers,
		paramsclient.ProposalHandler,
		// this line is used by starport scaffolding # stargate/app/govProposalHandler
	)

	return govProposalHandlers
}

func ProvideCustomRegisterCrypto() runtime.CustomRegisterLegacyAminoCodec {
	return evmencodingcodec.RegisterLegacyAminoCodec
}

func ProvideCustomRegisterInterfaces() runtime.CustomRegisterInterfaces {
	return evmencodingcodec.RegisterInterfaces
}

func registerProphetHanlders(appOpts servertypes.AppOptions) {
	prophet.Register("echo", echo.Plugin{})

	if cast.ToBool(appOpts.Get("pricepred.enabled")) {
		u := cast.ToString(appOpts.Get("pricepred.url"))
		url, err := url.Parse(u)
		if err != nil {
			panic(fmt.Errorf("invalid pricepred url: %s", u))
		}

		prophet.Register("pricepred", pricepred.NewPricePredictorSolidity(url))
	}

	if cast.ToBool(appOpts.Get("http.enabled")) {
		urls := cast.ToStringSlice(appOpts.Get("http.urls"))
		timeout := cast.ToInt(appOpts.Get("http.timeout"))

		parsedURLs := make([]*url.URL, len(urls))

		for i, u := range urls {
			parsedURL, err := url.Parse(u)
			if err != nil {
				panic(fmt.Errorf("invalid http url: %s", u))
			}

			parsedURLs[i] = parsedURL
		}

		parsedTimeout := time.Duration(timeout) * time.Second

		prophet.Register("http", http.NewPlugin(parsedURLs, parsedTimeout))
	}
}

// AppConfig returns the default app config.
func AppConfig() depinject.Config {
	return depinject.Configs(
		// used in runtime.ProvideApp to register eth signing types
		depinject.Provide(ProvideCustomRegisterCrypto),
		depinject.Provide(ProvideCustomRegisterInterfaces),

		moduleConfig(),
		// will be used inside runtime.ProvideInterfaceRegistry
		depinject.Provide(ProvideMsgEthereumTxCustomGetSigner),
		// Loads the ao config from a YAML file.
		// appconfig.LoadYAML(AppConfigYAML),
		depinject.Supply(
			// supply custom module basics
			map[string]module.AppModuleBasic{
				genutiltypes.ModuleName: genutil.NewAppModuleBasic(genutiltypes.DefaultMessageValidator),
				govtypes.ModuleName:     gov.NewAppModuleBasic(getGovProposalHandlers()),
				// this line is used by starport scaffolding # stargate/appConfig/moduleBasic
			},
		),
	)
}

// NewTxConfig initializes a new TxConfig, equivalent to the one used by [App].
func NewTxConfig() client.TxConfig {
	var txConfig client.TxConfig

	appConfig := depinject.Configs(
		AppConfig(),
		depinject.Supply(
			log.NewNopLogger(),
		),
	)

	if err := depinject.Inject(appConfig,
		&txConfig,
	); err != nil {
		panic(err)
	}

	return txConfig
}

// New returns a reference to an initialized App.
func New(
	logger log.Logger,
	db dbm.DB,
	traceStore io.Writer,
	loadLatest bool,
	appOpts servertypes.AppOptions,
	evmChainID uint64,
	evmAppOptions EVMOptionsFn,
	wasmOpts []wasmkeeper.Option,
	baseAppOptions ...func(*baseapp.BaseApp),
) (*App, error) {
	registerProphetHanlders(appOpts)

	prophetP, err := prophet.New()
	if err != nil {
		panic(fmt.Errorf("failed to create prophet: %w", err))
	}

	var (
		app        = &App{}
		appBuilder *runtime.AppBuilder

		// merge the AppConfig and other configuration in one config
		appConfig = depinject.Configs(
			AppConfig(),
			depinject.Supply(
				// Supply the application options
				appOpts,
				// Supply with IBC keeper getter for the IBC modules with App Wiring.
				// The IBC Keeper cannot be passed because it has not been initiated yet.
				// Passing the getter, the app IBC Keeper will always be accessible.
				// This needs to be removed after IBC supports App Wiring.
				app.GetIBCKeeper,
				// Supply Wasm keeper, similar to what we do for IBC keeper, since it doesn't support App Wiring yet.
				app.GetWasmKeeper,
				app.GetEvmKeeper,
				app.GetFeemarketKeeper,
				// Supply the logger
				logger,

				// Supply the prophet
				prophetP,

				func() ast.Expander {
					// I don't know if a lazy function is the best way to do this.
					// x/act wants to access this ExpanderManager, but the
					// ExpanderManager depends on other modules (listed below),
					// that might depend on x/act.
					return cosmoshield.NewExpanderManager(
						cosmoshield.NewPrefixedExpander(
							wardentypes.ModuleName,
							app.WardenKeeper.ShieldExpander(),
						),
					)
				},

				// ADVANCED CONFIGURATION
				//
				// AUTH
				//
				// For providing a custom function required in auth to generate custom account types
				// add it below. By default the auth module uses simulation.RandomGenesisAccounts.
				//
				// authtypes.RandomGenesisAccountsFn(simulation.RandomGenesisAccounts),
				//
				// For providing a custom a base account type add it below.
				// By default the auth module uses authtypes.ProtoBaseAccount().
				//
				// func() authtypes.AccountI { return <- custom base account type -> }
				//
				// For providing a different address codec, add it below.
				// By default the auth module uses a Bech32 address codec,
				// with the prefix defined in the auth module configuration.
				//
				// func() address.Codec { return <- custom address codec type -> }

				//
				// STAKING
				//
				// For provinding a different validator and consensus address codec, add it below.
				// By default the staking module uses the bech32 prefix provided in the auth config,
				// and appends "valoper" and "valcons" for validator and consensus addresses respectively.
				// When providing a custom address codec in auth, custom address codecs must be provided here as well.
				//
				// func() runtime.ValidatorAddressCodec { return <- custom validator address codec type -> }
				// func() runtime.ConsensusAddressCodec { return <- custom consensus address codec type -> }

				//
				// MINT
				//

				// For providing a custom inflation function for x/mint add here your
				// custom function that implements the minttypes.InflationCalculationFn
				// interface.
			),
		)
	)

	if err := depinject.Inject(appConfig,
		&appBuilder,
		&app.appCodec,
		&app.legacyAmino,
		&app.txConfig,
		&app.interfaceRegistry,
		&app.prophet,
		&app.AccountKeeper,
		&app.BankKeeper,
		&app.StakingKeeper,
		&app.SlashingKeeper,
		&app.MintKeeper,
		&app.DistrKeeper,
		&app.GovKeeper,
		&app.CrisisKeeper,
		&app.UpgradeKeeper,
		&app.ParamsKeeper,
		&app.AuthzKeeper,
		&app.EvidenceKeeper,
		&app.FeeGrantKeeper,
		&app.GroupKeeper,
		&app.ConsensusParamsKeeper,
		&app.CircuitBreakerKeeper,
		&app.WardenKeeper,
		&app.ActKeeper,
		&app.AsyncKeeper,
		&app.SchedKeeper,
		&app.MarketMapKeeper,
		&app.OracleKeeper,
		&app.EpochsKeeper,
		// this line is used by starport scaffolding # stargate/app/keeperDefinition
	); err != nil {
		panic(err)
	}

	// Below we could construct and set an application specific mempool and
	// ABCI 1.0 PrepareProposal and ProcessProposal handlers. These defaults are
	// already set in the SDK's BaseApp, this shows an example of how to override
	// them.
	//
	// Example:
	//
	// app.App = appBuilder.Build(...)
	// nonceMempool := mempool.NewSenderNonceMempool()
	// abciPropHandler := NewDefaultProposalHandler(nonceMempool, app.App.BaseApp)
	//
	// app.App.BaseApp.SetMempool(nonceMempool)
	// app.App.BaseApp.SetPrepareProposal(abciPropHandler.PrepareProposalHandler())
	// app.App.BaseApp.SetProcessProposal(abciPropHandler.ProcessProposalHandler())
	//
	// Alternatively, you can construct BaseApp options, append those to
	// baseAppOptions and pass them to the appBuilder.
	//
	// Example:
	//
	// prepareOpt = func(app *baseapp.BaseApp) {
	// 	abciPropHandler := baseapp.NewDefaultProposalHandler(nonceMempool, app)
	// 	app.SetPrepareProposal(abciPropHandler.PrepareProposalHandler())
	// }
	// baseAppOptions = append(baseAppOptions, prepareOpt)
	//
	// create and set vote extension handler
	// voteExtOp := func(bApp *baseapp.BaseApp) {
	// 	voteExtHandler := NewVoteExtensionHandler()
	// 	voteExtHandler.SetHandlers(bApp)
	// }

	updatedBaseAppOptions := append(
		[]func(*baseapp.BaseApp){
			func(bApp *baseapp.BaseApp) {
				bApp.SetTxDecoder(app.txConfig.TxDecoder())
			},
		}, baseAppOptions...)

	app.App = appBuilder.Build(db, traceStore, updatedBaseAppOptions...)

	app.SetTxEncoder(app.txConfig.TxEncoder())

	if err := evmAppOptions(evmChainID); err != nil {
		panic(err)
	}

	app.MarketMapKeeper.SetHooks(app.OracleKeeper.Hooks())

	// oracle initialization
	app.initializeOracles(appOpts)

	if err := app.prophet.Run(appOpts.Get("rpc.laddr").(string)); err != nil {
		panic(fmt.Errorf("failed to run prophet: %w", err))
	}

	// register legacy modules
	wasmConfig := app.registerLegacyModules(appOpts, wasmOpts)

	// register streaming services
	if err := app.RegisterStreamingServices(appOpts, app.kvStoreKeys()); err != nil {
		return nil, err
	}

	// must be before Loading version
	// requires the snapshot store to be created and registered as a BaseAppOption
	// see cmd/wasmd/root.go: 206 - 214 approx
	if manager := app.SnapshotManager(); manager != nil {
		err := manager.RegisterExtensions(
			wasmkeeper.NewWasmSnapshotter(app.CommitMultiStore(), &app.WasmKeeper),
		)
		if err != nil {
			return nil, fmt.Errorf("failed to register snapshot extension: %w", err)
		}
	}

	/****  Module Options ****/

	app.ModuleManager.RegisterInvariants(app.CrisisKeeper)

	// add test gRPC service for testing gRPC queries in isolation
	testdata_pulsar.RegisterQueryServer(app.GRPCQueryRouter(), testdata_pulsar.QueryImpl{})

	// create the simulation manager and define the order of the modules for deterministic simulations
	//
	// NOTE: this is not required apps that don't use the simulator for fuzz testing
	// transactions
	overrideModules := map[string]module.AppModuleSimulation{
		authtypes.ModuleName: auth.NewAppModule(app.appCodec, app.AccountKeeper, authsims.RandomGenesisAccounts, app.GetSubspace(authtypes.ModuleName)),
	}
	app.sm = module.NewSimulationManagerFromAppModules(app.ModuleManager.Modules, overrideModules)

	app.sm.RegisterStoreDecoders()

	// A custom InitChainer can be set if extra pre-init-genesis logic is required.
	// By default, when using app wiring enabled module, this is not required.
	// For instance, the upgrade module will set automatically the module version map in its init genesis thanks to app wiring.
	// However, when registering a module manually (i.e. that does not support app wiring), the module version map
	// must be set manually as follow. The upgrade module will de-duplicate the module version map.

	app.SetInitChainer(func(ctx sdk.Context, req *abci.RequestInitChain) (*abci.ResponseInitChain, error) {
		if err := app.UpgradeKeeper.SetModuleVersionMap(ctx, app.ModuleManager.GetVersionMap()); err != nil {
			return nil, err
		}

		return app.InitChainer(ctx, req)
	})

	maxGasWanted := cast.ToUint64(appOpts.Get(srvflags.EVMMaxTxGasWanted))

	app.setAnteHandler(app.txConfig, wasmConfig, app.GetKey(wasmtypes.StoreKey), maxGasWanted)

	if err := app.Load(loadLatest); err != nil {
		return nil, err
	}

	if loadLatest {
		ctx := app.NewUncachedContext(true, tmproto.Header{})

		// Initialize pinned codes in wasmvm as they are not persisted there
		if err := app.WasmKeeper.InitializePinnedCodes(ctx); err != nil {
			return nil, fmt.Errorf("failed to initialize pinned codes: %w", err)
		}
	}

	return app, nil
}

// LegacyAmino returns App's amino codec.
//
// NOTE: This is solely to be used for testing purposes as it may be desirable
// for modules to register their own custom testing types.
func (app *App) LegacyAmino() *codec.LegacyAmino {
	return app.legacyAmino
}

// AppCodec returns App's app codec.
//
// NOTE: This is solely to be used for testing purposes as it may be desirable
// for modules to register their own custom testing types.
func (app *App) AppCodec() codec.Codec {
	return app.appCodec
}

// GetKey returns the KVStoreKey for the provided store key.
func (app *App) GetKey(storeKey string) *storetypes.KVStoreKey {
	kvStoreKey, ok := app.UnsafeFindStoreKey(storeKey).(*storetypes.KVStoreKey)
	if !ok {
		return nil
	}

	return kvStoreKey
}

// GetMemKey returns the MemoryStoreKey for the provided store key.
func (app *App) GetMemKey(storeKey string) *storetypes.MemoryStoreKey {
	key, ok := app.UnsafeFindStoreKey(storeKey).(*storetypes.MemoryStoreKey)
	if !ok {
		return nil
	}

	return key
}

func (app *App) GetTransientKey(storeKey string) *storetypes.TransientStoreKey {
	key, ok := app.UnsafeFindStoreKey(storeKey).(*storetypes.TransientStoreKey)
	if !ok {
		return nil
	}

	return key
}

// kvStoreKeys returns all the kv store keys registered inside App.
func (app *App) kvStoreKeys() map[string]*storetypes.KVStoreKey {
	keys := make(map[string]*storetypes.KVStoreKey)

	for _, k := range app.GetStoreKeys() {
		if kv, ok := k.(*storetypes.KVStoreKey); ok {
			keys[kv.Name()] = kv
		}
	}

	return keys
}

// GetSubspace returns a param subspace for a given module name.
func (app *App) GetSubspace(moduleName string) paramstypes.Subspace {
	subspace, _ := app.ParamsKeeper.GetSubspace(moduleName)

	return subspace
}

// SimulationManager implements the SimulationApp interface.
func (app *App) SimulationManager() *module.SimulationManager {
	return app.sm
}

// RegisterAPIRoutes registers all application module routes with the provided
// API server.
func (app *App) RegisterAPIRoutes(apiSvr *api.Server, apiConfig config.APIConfig) {
	app.App.RegisterAPIRoutes(apiSvr, apiConfig)
	// register swagger API in app.go so that other applications can override easily
	if err := server.RegisterSwaggerAPI(apiSvr.ClientCtx, apiSvr.Router, apiConfig.Swagger); err != nil {
		panic(err)
	}
}

// GetIBCKeeper returns the IBC keeper.
func (app *App) GetIBCKeeper() *ibckeeper.Keeper {
	return app.IBCKeeper
}

// GetWasmKeeper returns the Wasm keeper.
func (app *App) GetWasmKeeper() wasmkeeper.Keeper {
	return app.WasmKeeper
}

// GetEvmKeeper returns the Evm keeper.
func (app *App) GetEvmKeeper(_placeHolder int16) *evmkeeper.Keeper {
	return app.EVMKeeper
}

// GetFeemarketKeeper returns the Feemarket keeper.
func (app *App) GetFeemarketKeeper(_placeHolder int32) feemarketkeeper.Keeper {
	return app.FeeMarketKeeper
}

func (app *App) TxConfig() client.TxConfig {
	return app.txConfig
}

// GetMaccPerms returns a copy of the module account permissions
//
// NOTE: This is solely to be used for testing purposes.
func GetMaccPerms() map[string][]string {
	dup := make(map[string][]string)
	for _, perms := range moduleAccPerms {
		dup[perms.Account] = perms.Permissions
	}

	return dup
}

// BlockedAddresses returns all the app's blocked account addresses.
func BlockedAddresses() map[string]bool {
	result := make(map[string]bool)

	if len(blockAccAddrs) > 0 {
		for _, addr := range blockAccAddrs {
			result[addr] = true
		}
	} else {
		for addr := range GetMaccPerms() {
			result[addr] = true
		}
	}

	// Add static EVM precompiles
	blockedPrecompilesHex := evmtypes.AvailableStaticPrecompiles
	for _, addr := range corevm.PrecompiledAddressesBerlin {
		blockedPrecompilesHex = append(blockedPrecompilesHex, addr.Hex())
	}

	// Add warden precompiles
	blockedPrecompilesHex = append(blockedPrecompilesHex, precompiles.WardenPrecompilesAddresses()...)

	for _, precompile := range blockedPrecompilesHex {
		result[cosmosevmutils.EthHexToCosmosAddr(precompile).String()] = true
	}

	return result
}

// DefaultGenesis returns a default genesis from the registered AppModuleBasic's.
func (a *App) DefaultGenesis() map[string]json.RawMessage {
	genesis := a.App.DefaultGenesis()

	mintGenState := NewMintGenesisState()
	genesis[minttypes.ModuleName] = a.appCodec.MustMarshalJSON(mintGenState)

	evmGenState := NewEVMGenesisState()
	genesis[evmtypes.ModuleName] = a.appCodec.MustMarshalJSON(evmGenState)

	// NOTE: for the example chain implementation we are also adding a default token pair,
	// which is the base denomination of the chain (i.e. the Wevm contract)
	erc20GenState := NewErc20GenesisState()
	genesis[erc20types.ModuleName] = a.appCodec.MustMarshalJSON(erc20GenState)

	return genesis
}

func (app *App) setAnteHandler(txConfig client.TxConfig, wasmConfig wasmtypes.NodeConfig, txCounterStoreKey *storetypes.KVStoreKey, maxGasWanted uint64) {
	options := HandlerOptions{
		HandlerOptions: authante.HandlerOptions{
			ExtensionOptionChecker: cosmosevmtypes.HasDynamicFeeExtensionOption,
			FeegrantKeeper:         app.FeeGrantKeeper,
			SignModeHandler:        txConfig.SignModeHandler(),
			SigGasConsumer:         evmante.SigVerificationGasConsumer,
			// TxFeeChecker:           evmevmante.NewDynamicFeeChecker(app.FeeMarketKeeper),
		},
		AccountKeeper:         app.AccountKeeper,
		BankKeeper:            app.BankKeeper,
		IBCKeeper:             app.IBCKeeper,
		WasmConfig:            &wasmConfig,
		WasmKeeper:            &app.WasmKeeper,
		TXCounterStoreService: runtime.NewKVStoreService(txCounterStoreKey),
		CircuitKeeper:         &app.CircuitBreakerKeeper,
		EVMKeeper:             app.EVMKeeper,
		FeeMarketKeeper:       app.FeeMarketKeeper,
		Cdc:                   app.appCodec,
		TxFeeChecker:          cosmosevmante.NewDynamicFeeChecker(app.FeeMarketKeeper),

		MaxTxGasWanted: maxGasWanted,
	}

	if err := options.Validate(); err != nil {
		panic(fmt.Errorf("failed to create AnteHandler: %w", err))
	}

	anteHandler := NewAnteHandler(options)

	// Set the AnteHandler for the app
	app.SetAnteHandler(anteHandler)
}
