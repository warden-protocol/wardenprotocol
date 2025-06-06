package cmd

import (
	"time"

	cmtcfg "github.com/cometbft/cometbft/config"
	serverconfig "github.com/cosmos/cosmos-sdk/server/config"
	evmservercfg "github.com/cosmos/evm/server/config"
	oracleconfig "github.com/skip-mev/slinky/oracle/config"

	httpconfig "github.com/warden-protocol/wardenprotocol/prophet/plugins/http/config"
	pricepredconfig "github.com/warden-protocol/wardenprotocol/prophet/plugins/pricepred/config"
	veniceconfig "github.com/warden-protocol/wardenprotocol/prophet/plugins/venice/config"
)

// initCometBFTConfig helps to override default CometBFT Config values.
// return cmtcfg.DefaultConfig if no custom configuration is required for the application.
func initCometBFTConfig() *cmtcfg.Config {
	cfg := cmtcfg.DefaultConfig()

	// these values put a higher strain on node memory
	// cfg.P2P.MaxNumInboundPeers = 100
	// cfg.P2P.MaxNumOutboundPeers = 40

	return cfg
}

// initAppConfig helps to override default appConfig template and configs.
// return "", nil if no custom configuration is required for the application.
func initAppConfig(evmChainID uint64) (string, interface{}) {
	// The following code snippet is just for reference.
	type CustomAppConfig struct {
		serverconfig.Config `mapstructure:",squash"`

		Oracle  oracleconfig.AppConfig     `mapstructure:"oracle"`
		EVM     evmservercfg.EVMConfig     `mapstructure:"evm"`
		JSONRPC evmservercfg.JSONRPCConfig `mapstructure:"json-rpc"`
		TLS     evmservercfg.TLSConfig     `mapstructure:"tls"`
		// Rosetta evmservercfg.RosettaConfig `mapstructure:"rosetta"` TODO AT: Check how to use rosetta

		// Prophet plugins
		PricePred pricepredconfig.Config `mapstructure:"pricepred"`
		Http      httpconfig.Config      `mapstructure:"http"`
		Venice    veniceconfig.Config    `mapstructure:"venice"`
	}

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
	// In tests, we set the min gas prices to 0.
	// srvCfg.MinGasPrices = "0stake"
	// srvCfg.BaseConfig.IAVLDisableFastNode = true // disable fastnode by default

	oracleConfig := oracleconfig.AppConfig{
		Enabled:        true,
		OracleAddress:  "localhost:8080",
		ClientTimeout:  time.Second * 2,
		MetricsEnabled: false,
	}

	jsonRpcConfig := evmservercfg.DefaultJSONRPCConfig()
	jsonRpcConfig.Enable = true
	tlsConfig := evmservercfg.DefaultTLSConfig()

	pricePredictionConfig := pricepredconfig.DefaultConfig()
	httpConfig := httpconfig.DefaultConfig()
	veniceConfig := veniceconfig.DefaultConfig()

	evmConfig := evmservercfg.DefaultEVMConfig()
	evmConfig.EVMChainID = evmChainID

	customAppConfig := CustomAppConfig{
		Config:  *srvCfg,
		Oracle:  oracleConfig,
		EVM:     *evmConfig,
		JSONRPC: *jsonRpcConfig,
		TLS:     *tlsConfig,
		// Rosetta:   *evmservercfg.DefaultRosettaConfig(),
		PricePred: *pricePredictionConfig,
		Http:      *httpConfig,
		Venice:    *veniceConfig,
	}

	customAppTemplate := serverconfig.DefaultConfigTemplate +
		oracleconfig.DefaultConfigTemplate +
		evmservercfg.DefaultEVMConfigTemplate +
		// evmservercfg.DefaultRosettaConfigTemplate +
		pricepredconfig.DefaultConfigTemplate +
		httpconfig.DefaultConfigTemplate +
		veniceconfig.DefaultConfigTemplate

	// Edit the default template file
	//
	// customAppTemplate := serverconfig.DefaultConfigTemplate + `
	// [wasm]
	// # This is the maximum sdk gas (wasm and storage) that we allow for any x/wasm "smart" queries
	// query_gas_limit = 300000
	// # This is the number of wasm vm instances we keep cached in memory for speed-up
	// # Warning: this is currently unstable and may lead to crashes, best to keep for 0 unless testing locally
	// lru_size = 0`

	return customAppTemplate, customAppConfig
}
