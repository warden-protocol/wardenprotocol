package config

import (
	"maps"
	"sort"
	"time"

	clienthelpers "cosmossdk.io/client/v2/helpers"
	wasmtypes "github.com/CosmWasm/wasmd/x/wasm/types"
	serverconfig "github.com/cosmos/cosmos-sdk/server/config"
	authtypes "github.com/cosmos/cosmos-sdk/x/auth/types"
	distrtypes "github.com/cosmos/cosmos-sdk/x/distribution/types"
	govtypes "github.com/cosmos/cosmos-sdk/x/gov/types"
	minttypes "github.com/cosmos/cosmos-sdk/x/mint/types"
	stakingtypes "github.com/cosmos/cosmos-sdk/x/staking/types"
	cosmosevmserverconfig "github.com/cosmos/evm/server/config"
	cosmosevmutils "github.com/cosmos/evm/utils"
	erc20types "github.com/cosmos/evm/x/erc20/types"
	feemarkettypes "github.com/cosmos/evm/x/feemarket/types"
	precisebanktypes "github.com/cosmos/evm/x/precisebank/types"
	evmtypes "github.com/cosmos/evm/x/vm/types"
	ibctransfertypes "github.com/cosmos/ibc-go/v10/modules/apps/transfer/types"
	corevm "github.com/ethereum/go-ethereum/core/vm"

	oracleconfig "github.com/warden-protocol/connect/oracle/config"

	httpconfig "github.com/warden-protocol/wardenprotocol/prophet/plugins/http/config"
	pfpconfig "github.com/warden-protocol/wardenprotocol/prophet/plugins/pfp/config"
	pricepredconfig "github.com/warden-protocol/wardenprotocol/prophet/plugins/pricepred/config"
	quantkitconfig "github.com/warden-protocol/wardenprotocol/prophet/plugins/quantkit/config"
	veniceconfig "github.com/warden-protocol/wardenprotocol/prophet/plugins/venice/config"
	veniceimgconfig "github.com/warden-protocol/wardenprotocol/prophet/plugins/veniceimg/config"
)

func MustGetDefaultNodeHome() string {
	defaultNodeHome, err := clienthelpers.GetNodeHomeDirectory(".warden")
	if err != nil {
		panic(err)
	}

	return defaultNodeHome
}

// module account permissions.
var maccPerms = map[string][]string{
	authtypes.FeeCollectorName:     nil,
	distrtypes.ModuleName:          nil,
	ibctransfertypes.ModuleName:    {authtypes.Minter, authtypes.Burner},
	minttypes.ModuleName:           {authtypes.Minter},
	stakingtypes.BondedPoolName:    {authtypes.Burner, authtypes.Staking},
	stakingtypes.NotBondedPoolName: {authtypes.Burner, authtypes.Staking},
	govtypes.ModuleName:            {authtypes.Burner},

	// Cosmos EVM modules
	evmtypes.ModuleName:         {authtypes.Minter, authtypes.Burner},
	feemarkettypes.ModuleName:   nil,
	erc20types.ModuleName:       {authtypes.Minter, authtypes.Burner},
	precisebanktypes.ModuleName: {authtypes.Minter, authtypes.Burner},

	// CosmWasm module
	wasmtypes.ModuleName: {authtypes.Burner},
}

// BlockedAddresses returns all the app's blocked account addresses.
//
// Note, this includes:
//   - module accounts
//   - Ethereum's native precompiled smart contracts
//   - Cosmos EVM' available static precompiled contracts
func BlockedAddresses() map[string]bool {
	blockedAddrs := make(map[string]bool)

	maccPerms := GetMaccPerms()

	accs := make([]string, 0, len(maccPerms))
	for acc := range maccPerms {
		accs = append(accs, acc)
	}

	sort.Strings(accs)

	for _, acc := range accs {
		blockedAddrs[authtypes.NewModuleAddress(acc).String()] = true
	}

	blockedPrecompilesHex := evmtypes.AvailableStaticPrecompiles
	for _, addr := range corevm.PrecompiledAddressesBerlin {
		blockedPrecompilesHex = append(blockedPrecompilesHex, addr.Hex())
	}

	for _, precompile := range blockedPrecompilesHex {
		blockedAddrs[cosmosevmutils.Bech32StringFromHexAddress(precompile)] = true
	}

	return blockedAddrs
}

// GetMaccPerms returns a copy of the module account permissions.
func GetMaccPerms() map[string][]string {
	return maps.Clone(maccPerms)
}

type WardenAppConfig struct {
	serverconfig.Config

	Oracle oracleconfig.AppConfig `mapstructure:"oracle" json:"oracle"`

	EVM     cosmosevmserverconfig.EVMConfig
	JSONRPC cosmosevmserverconfig.JSONRPCConfig
	TLS     cosmosevmserverconfig.TLSConfig

	// Prophet plugins
	PricePred pricepredconfig.Config `mapstructure:"pricepred"`
	Http      httpconfig.Config      `mapstructure:"http"`
	PFP       pfpconfig.Config       `mapstructure:"pfp"`
	Quantkit  quantkitconfig.Config  `mapstructure:"quantkit"`
	Venice    veniceconfig.Config    `mapstructure:"venice"`
	Veniceimg veniceimgconfig.Config `mapstructure:"veniceimg"`
}

// InitAppConfig helps to override default appConfig template and configs.
// return "", nil if no custom configuration is required for the application.
func InitAppConfig(denom string, evmChainID uint64) (string, any) {
	// Optionally allow the chain developer to overwrite the SDK's default
	// server config.
	srvCfg := serverconfig.DefaultConfig()
	// The SDK's default minimum gas price is set to "" (empty value) inside
	// app.toml. If left empty by validators, the node will halt on startup.
	// However, the chain developer can set a default app.toml value for their
	// validators here.
	//
	// In summary:
	// - if you leave srvCfg.MinGasPrices = "", all validators MUST tweak their
	//   own app.toml config,
	// - if you set srvCfg.MinGasPrices non-empty, validators CAN tweak their
	//   own app.toml to override, or use this default value.
	//
	// In this example application, we set the min gas prices to 0.
	srvCfg.MinGasPrices = "0" + denom

	evmCfg := cosmosevmserverconfig.DefaultEVMConfig()
	evmCfg.EVMChainID = evmChainID

	evmJsonRpcCfg := cosmosevmserverconfig.DefaultJSONRPCConfig()
	evmJsonRpcCfg.Enable = true

	oracleCfg := oracleconfig.AppConfig{
		Enabled:        true,
		OracleAddress:  "localhost:8080",
		ClientTimeout:  time.Second * 2,
		MetricsEnabled: true,
	}

	pricePredictionConfig := pricepredconfig.DefaultConfig()
	httpConfig := httpconfig.DefaultConfig()
	pfpConfig := pfpconfig.DefaultConfig()
	quantkitConfig := quantkitconfig.DefaultConfig()
	veniceConfig := veniceconfig.DefaultConfig()
	veniceimgConfig := veniceimgconfig.DefaultConfig()

	customAppConfig := WardenAppConfig{
		Config:  *srvCfg,
		Oracle:  oracleCfg,
		EVM:     *evmCfg,
		JSONRPC: *evmJsonRpcCfg,
		TLS:     *cosmosevmserverconfig.DefaultTLSConfig(),

		PricePred: *pricePredictionConfig,
		Http:      *httpConfig,
		PFP:       *pfpConfig,
		Quantkit:  *quantkitConfig,
		Venice:    *veniceConfig,
		Veniceimg: *veniceimgConfig,
	}

	customAppTemplate := serverconfig.DefaultConfigTemplate +
		oracleconfig.DefaultConfigTemplate +
		cosmosevmserverconfig.DefaultEVMConfigTemplate +
		pricepredconfig.DefaultConfigTemplate +
		httpconfig.DefaultConfigTemplate +
		pfpconfig.DefaultConfigTemplate +
		quantkitconfig.DefaultConfigTemplate +
		veniceconfig.DefaultConfigTemplate +
		veniceimgconfig.DefaultConfigTemplate

	return customAppTemplate, customAppConfig
}
