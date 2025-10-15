package app

import (
	"fmt"

	"cosmossdk.io/log"
	servertypes "github.com/cosmos/cosmos-sdk/server/types"
	evmconfig "github.com/cosmos/evm/config"
	evmmempool "github.com/cosmos/evm/mempool"
	evmtypes "github.com/cosmos/evm/x/vm/types"
)

// configureEVMMempool sets up the EVM mempool and related handlers using viper configuration.
func (app *App) configureEVMMempool(appOpts servertypes.AppOptions, logger log.Logger) error {
	if evmtypes.GetChainConfig() == nil {
		logger.Debug("evm chain config is not set, skipping mempool configuration")
		return nil
	}

	mempoolConfig, err := app.createMempoolConfig(appOpts, logger)
	if err != nil {
		return fmt.Errorf("failed to get mempool config: %w", err)
	}

	cosmosPoolMaxTx := evmconfig.GetCosmosPoolMaxTx(appOpts, logger)

	evmMempool := evmmempool.NewExperimentalEVMMempool(
		app.CreateQueryContext,
		logger,
		app.EVMKeeper,
		app.FeeMarketKeeper,
		app.txConfig,
		app.clientCtx,
		mempoolConfig,
		cosmosPoolMaxTx,
	)
	app.EVMMempool = evmMempool
	app.SetMempool(evmMempool)
	checkTxHandler := evmmempool.NewCheckTxHandler(evmMempool)
	app.SetCheckTxHandler(checkTxHandler)

	return nil
}

// createMempoolConfig creates a new EVMMempoolConfig with the default configuration
// and overrides it with values from appOpts if they exist and are non-zero.
func (app *App) createMempoolConfig(appOpts servertypes.AppOptions, logger log.Logger) (*evmmempool.EVMMempoolConfig, error) {
	return &evmmempool.EVMMempoolConfig{
		AnteHandler:      app.GetAnteHandler(),
		LegacyPoolConfig: evmconfig.GetLegacyPoolConfig(appOpts, logger),
		BlockGasLimit:    evmconfig.GetBlockGasLimit(appOpts, logger),
		MinTip:           evmconfig.GetMinTip(appOpts, logger),
	}, nil
}
