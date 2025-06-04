package app

import (
	"time"

	runtimev1alpha1 "cosmossdk.io/api/cosmos/app/runtime/v1alpha1"
	appv1alpha1 "cosmossdk.io/api/cosmos/app/v1alpha1"
	authmodulev1 "cosmossdk.io/api/cosmos/auth/module/v1"
	authzmodulev1 "cosmossdk.io/api/cosmos/authz/module/v1"
	bankmodulev1 "cosmossdk.io/api/cosmos/bank/module/v1"
	circuitmodulev1 "cosmossdk.io/api/cosmos/circuit/module/v1"
	consensusmodulev1 "cosmossdk.io/api/cosmos/consensus/module/v1"
	crisismodulev1 "cosmossdk.io/api/cosmos/crisis/module/v1"
	distrmodulev1 "cosmossdk.io/api/cosmos/distribution/module/v1"
	evidencemodulev1 "cosmossdk.io/api/cosmos/evidence/module/v1"
	feegrantmodulev1 "cosmossdk.io/api/cosmos/feegrant/module/v1"
	genutilmodulev1 "cosmossdk.io/api/cosmos/genutil/module/v1"
	govmodulev1 "cosmossdk.io/api/cosmos/gov/module/v1"
	groupmodulev1 "cosmossdk.io/api/cosmos/group/module/v1"
	mintmodulev1 "cosmossdk.io/api/cosmos/mint/module/v1"
	paramsmodulev1 "cosmossdk.io/api/cosmos/params/module/v1"
	slashingmodulev1 "cosmossdk.io/api/cosmos/slashing/module/v1"
	stakingmodulev1 "cosmossdk.io/api/cosmos/staking/module/v1"
	txconfigv1 "cosmossdk.io/api/cosmos/tx/config/v1"
	upgrademodulev1 "cosmossdk.io/api/cosmos/upgrade/module/v1"
	vestingmodulev1 "cosmossdk.io/api/cosmos/vesting/module/v1"
	"cosmossdk.io/core/appconfig"
	"cosmossdk.io/depinject"
	_ "cosmossdk.io/x/circuit" // import for side-effects
	circuittypes "cosmossdk.io/x/circuit/types"
	_ "cosmossdk.io/x/evidence" // import for side-effects
	evidencetypes "cosmossdk.io/x/evidence/types"
	"cosmossdk.io/x/feegrant"
	_ "cosmossdk.io/x/feegrant/module" // import for side-effects
	"cosmossdk.io/x/tx/signing"
	_ "cosmossdk.io/x/upgrade" // import for side-effects
	upgradetypes "cosmossdk.io/x/upgrade/types"
	wasmtypes "github.com/CosmWasm/wasmd/x/wasm/types"
	"github.com/cosmos/cosmos-sdk/runtime"
	sdk "github.com/cosmos/cosmos-sdk/types"
	_ "github.com/cosmos/cosmos-sdk/x/auth/tx/config" // import for side-effects
	authtypes "github.com/cosmos/cosmos-sdk/x/auth/types"
	_ "github.com/cosmos/cosmos-sdk/x/auth/vesting" // import for side-effects
	vestingtypes "github.com/cosmos/cosmos-sdk/x/auth/vesting/types"
	"github.com/cosmos/cosmos-sdk/x/authz"
	_ "github.com/cosmos/cosmos-sdk/x/authz/module" // import for side-effects
	_ "github.com/cosmos/cosmos-sdk/x/bank"         // import for side-effects
	banktypes "github.com/cosmos/cosmos-sdk/x/bank/types"
	_ "github.com/cosmos/cosmos-sdk/x/consensus" // import for side-effects
	consensustypes "github.com/cosmos/cosmos-sdk/x/consensus/types"
	_ "github.com/cosmos/cosmos-sdk/x/crisis" // import for side-effects
	crisistypes "github.com/cosmos/cosmos-sdk/x/crisis/types"
	_ "github.com/cosmos/cosmos-sdk/x/distribution" // import for side-effects
	distrtypes "github.com/cosmos/cosmos-sdk/x/distribution/types"
	genutiltypes "github.com/cosmos/cosmos-sdk/x/genutil/types"
	govtypes "github.com/cosmos/cosmos-sdk/x/gov/types"
	"github.com/cosmos/cosmos-sdk/x/group"
	_ "github.com/cosmos/cosmos-sdk/x/group/module" // import for side-effects
	_ "github.com/cosmos/cosmos-sdk/x/mint"         // import for side-effects
	minttypes "github.com/cosmos/cosmos-sdk/x/mint/types"
	_ "github.com/cosmos/cosmos-sdk/x/params" // import for side-effects
	paramstypes "github.com/cosmos/cosmos-sdk/x/params/types"
	_ "github.com/cosmos/cosmos-sdk/x/slashing" // import for side-effects
	slashingtypes "github.com/cosmos/cosmos-sdk/x/slashing/types"
	_ "github.com/cosmos/cosmos-sdk/x/staking" // import for side-effects
	stakingtypes "github.com/cosmos/cosmos-sdk/x/staking/types"
	erc20types "github.com/cosmos/evm/x/erc20/types"
	feemarkettypes "github.com/cosmos/evm/x/feemarket/types"
	precisebanktypes "github.com/cosmos/evm/x/precisebank/types"
	evmtypes "github.com/cosmos/evm/x/vm/types"
	_ "github.com/cosmos/ibc-go/v10/modules/apps/27-interchain-accounts" // import for side-effects
	icatypes "github.com/cosmos/ibc-go/v10/modules/apps/27-interchain-accounts/types"
	ibctransfertypes "github.com/cosmos/ibc-go/v10/modules/apps/transfer/types"
	ibcexported "github.com/cosmos/ibc-go/v10/modules/core/exported"
	_ "github.com/ethereum/go-ethereum/eth/tracers/js"
	_ "github.com/ethereum/go-ethereum/eth/tracers/native"
	marketmapmodulev1 "github.com/skip-mev/slinky/api/slinky/marketmap/module/v1"
	oraclemodulev1 "github.com/skip-mev/slinky/api/slinky/oracle/module/v1"
	_ "github.com/skip-mev/slinky/x/marketmap" // import for side-effects
	marketmaptypes "github.com/skip-mev/slinky/x/marketmap/types"
	_ "github.com/skip-mev/slinky/x/oracle" // import for side-effects
	oracletypes "github.com/skip-mev/slinky/x/oracle/types"
	"google.golang.org/protobuf/types/known/durationpb"

	actmodulev1 "github.com/warden-protocol/wardenprotocol/api/warden/act/module"
	asyncmodulev1 "github.com/warden-protocol/wardenprotocol/api/warden/async/module"
	schedmodulev1 "github.com/warden-protocol/wardenprotocol/api/warden/sched/module"
	wardenmodulev1 "github.com/warden-protocol/wardenprotocol/api/warden/warden/module"
	wardenconfig "github.com/warden-protocol/wardenprotocol/cmd/wardend/config"
	_ "github.com/warden-protocol/wardenprotocol/warden/x/act/module" // import for side-effects
	actmoduletypes "github.com/warden-protocol/wardenprotocol/warden/x/act/types/v1beta1"
	_ "github.com/warden-protocol/wardenprotocol/warden/x/async/module" // import for side-effects
	asyncmoduletypes "github.com/warden-protocol/wardenprotocol/warden/x/async/types/v1beta1"
	_ "github.com/warden-protocol/wardenprotocol/warden/x/sched/module" // import for side-effects
	schedmoduletypes "github.com/warden-protocol/wardenprotocol/warden/x/sched/types/v1beta1"
	_ "github.com/warden-protocol/wardenprotocol/warden/x/warden/module" // import for side-effects
	wardenmoduletypes "github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta3"
)

func init() {
	config := sdk.GetConfig()

	wardenconfig.SetBech32Prefixes(config)
	wardenconfig.SetBip44CoinType(config)

	config.Seal()
}

// ProvideMsgEthereumTxCustomGetSigner provides the CustomGetSigners method for the EthereumTx.
func ProvideMsgEthereumTxCustomGetSigner() signing.CustomGetSigner {
	return evmtypes.MsgEthereumTxCustomGetSigner
}

var (
	// NOTE: The genutils module must occur after staking so that pools are
	// properly initialized with tokens from genesis accounts.
	// NOTE: The genutils module must also occur after auth so that it can access the params from auth.
	// NOTE: wasm module should be at the end as it can call other module functionality direct or via message dispatching during
	// genesis phase. For example bank transfer, auth account check, staking, ...
	genesisModuleOrder = []string{
		// cosmos-sdk/ibc modules
		authtypes.ModuleName,
		banktypes.ModuleName,
		distrtypes.ModuleName,
		stakingtypes.ModuleName,
		slashingtypes.ModuleName,
		govtypes.ModuleName,
		minttypes.ModuleName,
		crisistypes.ModuleName,
		ibcexported.ModuleName,
		// evm modules
		evmtypes.ModuleName,
		// NOTE: feemarket module needs to be initialized before genutil module:
		// gentx transactions use MinGasPriceDecorator.AnteHandle
		feemarkettypes.ModuleName,
		erc20types.ModuleName,
		precisebanktypes.ModuleName,

		genutiltypes.ModuleName,
		evidencetypes.ModuleName,
		authz.ModuleName,
		ibctransfertypes.ModuleName,
		icatypes.ModuleName,
		feegrant.ModuleName,
		paramstypes.ModuleName,
		upgradetypes.ModuleName,
		vestingtypes.ModuleName,
		circuittypes.ModuleName,
		group.ModuleName,
		consensustypes.ModuleName,
		circuittypes.ModuleName,
		// chain modules
		wardenmoduletypes.ModuleName,
		actmoduletypes.ModuleName,
		asyncmoduletypes.ModuleName,
		schedmoduletypes.ModuleName,
		// wasm module
		wasmtypes.ModuleName,
		// slinky modules
		oracletypes.ModuleName,
		// market map genesis must be called AFTER all consuming modules (i.e. x/oracle, etc.)
		marketmaptypes.ModuleName,

		// this line is used by starport scaffolding # stargate/app/initGenesis
	}

	beginBlockers = []string{
		minttypes.ModuleName,

		// ibc modules
		ibcexported.ModuleName,
		ibctransfertypes.ModuleName,
		icatypes.ModuleName,
		wasmtypes.ModuleName,

		// evm modules
		erc20types.ModuleName,
		feemarkettypes.ModuleName,
		evmtypes.ModuleName,

		// cosmos sdk modules

		distrtypes.ModuleName,
		slashingtypes.ModuleName,
		evidencetypes.ModuleName,
		stakingtypes.ModuleName,
		authz.ModuleName,
		genutiltypes.ModuleName,

		// chain modules
		wardenmoduletypes.ModuleName,
		actmoduletypes.ModuleName,
		asyncmoduletypes.ModuleName,
		schedmoduletypes.ModuleName,
		// slinky modules
		oracletypes.ModuleName,
		marketmaptypes.ModuleName,
		precisebanktypes.ModuleName,
		vestingtypes.ModuleName,
		// this line is used by starport scaffolding # stargate/app/beginBlockers
	}

	endBlockers = []string{
		// cosmos sdk modules
		crisistypes.ModuleName,
		govtypes.ModuleName,
		stakingtypes.ModuleName,
		feegrant.ModuleName,
		group.ModuleName,
		genutiltypes.ModuleName,
		// ibc modules
		ibcexported.ModuleName,
		ibctransfertypes.ModuleName,
		icatypes.ModuleName,
		wasmtypes.ModuleName,
		// chain modules
		wardenmoduletypes.ModuleName,
		actmoduletypes.ModuleName,
		asyncmoduletypes.ModuleName,
		schedmoduletypes.ModuleName,
		// slinky modules
		oracletypes.ModuleName,
		marketmaptypes.ModuleName,

		// evm modules
		evmtypes.ModuleName,
		feemarkettypes.ModuleName,
		erc20types.ModuleName,

		precisebanktypes.ModuleName,
		vestingtypes.ModuleName,
		// this line is used by starport scaffolding # stargate/app/endBlockers
	}

	preBlockers = []string{
		upgradetypes.ModuleName,
		// this line is used by starport scaffolding # stargate/app/preBlockers
	}

	// module account permissions.
	moduleAccPerms = []*authmodulev1.ModuleAccountPermission{
		{Account: authtypes.FeeCollectorName},
		{Account: distrtypes.ModuleName},
		{Account: minttypes.ModuleName, Permissions: []string{authtypes.Minter}},
		{Account: stakingtypes.BondedPoolName, Permissions: []string{authtypes.Burner, stakingtypes.ModuleName}},
		{Account: stakingtypes.NotBondedPoolName, Permissions: []string{authtypes.Burner, stakingtypes.ModuleName}},
		{Account: govtypes.ModuleName, Permissions: []string{authtypes.Burner}},
		{Account: ibctransfertypes.ModuleName, Permissions: []string{authtypes.Minter, authtypes.Burner}},
		{Account: icatypes.ModuleName},
		{Account: actmoduletypes.ModuleName},
		{Account: asyncmoduletypes.ModuleName},
		{Account: schedmoduletypes.ModuleName},
		{Account: oracletypes.ModuleName, Permissions: []string{}},
		{Account: wardenmoduletypes.ModuleName, Permissions: []string{}},
		{Account: evmtypes.ModuleName, Permissions: []string{authtypes.Minter, authtypes.Burner}},         // Allows EVM module to mint/burn
		{Account: feemarkettypes.ModuleName, Permissions: nil},                                            // Fee market doesn't need permissions
		{Account: erc20types.ModuleName, Permissions: []string{authtypes.Minter, authtypes.Burner}},       // Allows erc20 module to mint/burn for token pairs
		{Account: precisebanktypes.ModuleName, Permissions: []string{authtypes.Minter, authtypes.Burner}}, // Allows precise bank module to mint/burn for token pairs
		// this line is used by starport scaffolding # stargate/app/maccPerms
	}

	// blocked account addresses.
	blockAccAddrs = []string{
		authtypes.FeeCollectorName,
		distrtypes.ModuleName,
		minttypes.ModuleName,
		stakingtypes.BondedPoolName,
		stakingtypes.NotBondedPoolName,
		// We allow the following module accounts to receive funds:
		// govtypes.ModuleName
	}
)

func moduleConfig() depinject.Config {
	// appConfig application configuration (used by depinject)
	cfg := appconfig.Compose(
		&appv1alpha1.Config{
			Modules: []*appv1alpha1.ModuleConfig{
				{
					Name: runtime.ModuleName,
					Config: appconfig.WrapAny(&runtimev1alpha1.Module{
						AppName:       Name,
						PreBlockers:   preBlockers,
						BeginBlockers: beginBlockers,
						EndBlockers:   endBlockers,
						InitGenesis:   genesisModuleOrder,
						OverrideStoreKeys: []*runtimev1alpha1.StoreKeyConfig{
							{
								ModuleName: authtypes.ModuleName,
								KvStoreKey: "acc",
							},
						},
						// When ExportGenesis is not specified, the export genesis module order
						// is equal to the init genesis order
						// ExportGenesis: genesisModuleOrder,
						// Uncomment if you want to set a custom migration order here.
						// OrderMigrations: nil,
					}),
				},
				{
					Name: authtypes.ModuleName,
					Config: appconfig.WrapAny(&authmodulev1.Module{
						Bech32Prefix:             wardenconfig.Bech32PrefixAccAddr,
						ModuleAccountPermissions: moduleAccPerms,
						// By default modules authority is the governance module. This is configurable with the following:
						// Authority: "group", // A custom module authority can be set using a module name
						// Authority: "cosmos1cwwv22j5ca08ggdv9c2uky355k908694z577tv", // or a specific address
					}),
				},
				{
					Name:   vestingtypes.ModuleName,
					Config: appconfig.WrapAny(&vestingmodulev1.Module{}),
				},
				{
					Name: banktypes.ModuleName,
					Config: appconfig.WrapAny(&bankmodulev1.Module{
						BlockedModuleAccountsOverride: blockAccAddrs,
					}),
				},
				{
					Name: stakingtypes.ModuleName,
					Config: appconfig.WrapAny(&stakingmodulev1.Module{
						// NOTE: specifying a prefix is only necessary when using bech32 addresses
						// If not specfied, the auth Bech32Prefix appended with "valoper" and "valcons" is used by default
						Bech32PrefixValidator: wardenconfig.Bech32PrefixValAddr,
						Bech32PrefixConsensus: wardenconfig.Bech32PrefixConsAddr,
					}),
				},
				{
					Name:   slashingtypes.ModuleName,
					Config: appconfig.WrapAny(&slashingmodulev1.Module{}),
				},
				{
					Name:   paramstypes.ModuleName,
					Config: appconfig.WrapAny(&paramsmodulev1.Module{}),
				},
				{
					Name: "tx",
					Config: appconfig.WrapAny(&txconfigv1.Config{
						SkipAnteHandler: true,
					}),
				},
				{
					Name:   oracletypes.ModuleName,
					Config: appconfig.WrapAny(&oraclemodulev1.Module{}),
				},
				{
					Name:   genutiltypes.ModuleName,
					Config: appconfig.WrapAny(&genutilmodulev1.Module{}),
				},
				{
					Name:   authz.ModuleName,
					Config: appconfig.WrapAny(&authzmodulev1.Module{}),
				},
				{
					Name:   upgradetypes.ModuleName,
					Config: appconfig.WrapAny(&upgrademodulev1.Module{}),
				},
				{
					Name:   distrtypes.ModuleName,
					Config: appconfig.WrapAny(&distrmodulev1.Module{}),
				},
				{
					Name:   evidencetypes.ModuleName,
					Config: appconfig.WrapAny(&evidencemodulev1.Module{}),
				},
				{
					Name:   minttypes.ModuleName,
					Config: appconfig.WrapAny(&mintmodulev1.Module{}),
				},
				{
					Name: group.ModuleName,
					Config: appconfig.WrapAny(&groupmodulev1.Module{
						MaxExecutionPeriod: durationpb.New(time.Second * 1209600),
						MaxMetadataLen:     255,
					}),
				},
				{
					Name:   feegrant.ModuleName,
					Config: appconfig.WrapAny(&feegrantmodulev1.Module{}),
				},
				{
					Name:   govtypes.ModuleName,
					Config: appconfig.WrapAny(&govmodulev1.Module{}),
				},
				{
					Name:   crisistypes.ModuleName,
					Config: appconfig.WrapAny(&crisismodulev1.Module{}),
				},
				{
					Name:   consensustypes.ModuleName,
					Config: appconfig.WrapAny(&consensusmodulev1.Module{}),
				},
				{
					Name:   circuittypes.ModuleName,
					Config: appconfig.WrapAny(&circuitmodulev1.Module{}),
				},
				{
					Name:   wardenmoduletypes.ModuleName,
					Config: appconfig.WrapAny(&wardenmodulev1.Module{}),
				},
				{
					Name:   actmoduletypes.ModuleName,
					Config: appconfig.WrapAny(&actmodulev1.Module{}),
				},
				{
					Name:   asyncmoduletypes.ModuleName,
					Config: appconfig.WrapAny(&asyncmodulev1.Module{}),
				},
				{
					Name:   schedmoduletypes.ModuleName,
					Config: appconfig.WrapAny(&schedmodulev1.Module{}),
				},
				{
					Name: marketmaptypes.ModuleName,
					Config: appconfig.WrapAny(&marketmapmodulev1.Module{
						Authority: authtypes.NewModuleAddress(govtypes.ModuleName).String(),
					}),
				},
				// this line is used by starport scaffolding # stargate/app/moduleConfig
			},
		})

	return cfg
}
