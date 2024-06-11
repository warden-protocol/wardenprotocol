package app

import (
	"context"
	"time"

	"github.com/cosmos/cosmos-sdk/baseapp"
	"github.com/cosmos/cosmos-sdk/server/types"

	oraclepreblock "github.com/skip-mev/slinky/abci/preblock/oracle"
	"github.com/skip-mev/slinky/abci/proposals"
	"github.com/skip-mev/slinky/abci/strategies/aggregator"
	compression "github.com/skip-mev/slinky/abci/strategies/codec"
	"github.com/skip-mev/slinky/abci/strategies/currencypair"
	"github.com/skip-mev/slinky/abci/ve"
	oracleconfig "github.com/skip-mev/slinky/oracle/config"
	"github.com/skip-mev/slinky/pkg/math/voteweighted"
	oracleclient "github.com/skip-mev/slinky/service/clients/oracle"
	servicemetrics "github.com/skip-mev/slinky/service/metrics"
)

func (app *App) initializeOracle(appOpts types.AppOptions) {
	// Read general config from app-opts, and construct oracle service.
	cfg, err := oracleconfig.ReadConfigFromAppOpts(appOpts)
	if err != nil {
		panic(err)
	}

	// If app level instrumentation is enabled, then wrap the oracle service with a metrics client
	// to get metrics on the oracle service (for ABCI++). This will allow the instrumentation to track
	// latency in VerifyVoteExtension requests and more.
	oracleMetrics, err := servicemetrics.NewMetricsFromConfig(cfg, app.ChainID())
	if err != nil {
		panic(err)
	}

	// Create the oracle service.
	app.oracleClient, err = oracleclient.NewClientFromConfig(
		cfg,
		app.Logger().With("client", "oracle"),
		oracleMetrics,
	)
	if err != nil {
		panic(err)
	}

	// Connect to the oracle service (default timeout of 5 seconds).
	go func() {
		if err := app.oracleClient.Start(context.Background()); err != nil {
			app.Logger().Error("failed to start oracle client", "err", err)
			panic(err)
		}

		app.Logger().Info("started oracle client", "address", cfg.OracleAddress)
	}()
	initializeABCIextensions(app, oracleMetrics)
}

func initializeABCIextensions(app *App, oracleMetrics servicemetrics.Metrics) {
	// Create the proposal handler that will be used to fill proposals with
	// transactions and oracle data.
	proposalHandler := proposals.NewProposalHandler(
		app.Logger(),
		baseapp.NoOpPrepareProposal(),
		baseapp.NoOpProcessProposal(),
		ve.NewDefaultValidateVoteExtensionsFn(app.StakingKeeper),
		compression.NewCompressionVoteExtensionCodec(
			compression.NewDefaultVoteExtensionCodec(),
			compression.NewZLibCompressor(),
		),
		compression.NewCompressionExtendedCommitCodec(
			compression.NewDefaultExtendedCommitCodec(),
			compression.NewZStdCompressor(),
		),
		currencypair.NewDeltaCurrencyPairStrategy(app.OracleKeeper),
		oracleMetrics,
	)
	app.SetPrepareProposal(proposalHandler.PrepareProposalHandler())
	app.SetProcessProposal(proposalHandler.ProcessProposalHandler())

	// Create the aggregation function that will be used to aggregate oracle data
	// from each validator.
	aggregatorFn := voteweighted.MedianFromContext(
		app.Logger(),
		app.StakingKeeper,
		voteweighted.DefaultPowerThreshold,
	)

	// Create the pre-finalize block hook that will be used to apply oracle data
	// to the state before any transactions are executed (in finalize block).
	oraclePreBlockHandler := oraclepreblock.NewOraclePreBlockHandler(
		app.Logger(),
		aggregatorFn,
		app.OracleKeeper,
		oracleMetrics,
		currencypair.NewDeltaCurrencyPairStrategy(app.OracleKeeper),
		compression.NewCompressionVoteExtensionCodec(
			compression.NewDefaultVoteExtensionCodec(),
			compression.NewZLibCompressor(),
		),
		compression.NewCompressionExtendedCommitCodec(
			compression.NewDefaultExtendedCommitCodec(),
			compression.NewZStdCompressor(),
		),
	)

	app.SetPreBlocker(oraclePreBlockHandler.PreBlocker())

	// Create the vote extensions handler that will be used to extend and verify
	// vote extensions (i.e. oracle data).
	cps := currencypair.NewDeltaCurrencyPairStrategy(app.OracleKeeper)
	veCodec := compression.NewCompressionVoteExtensionCodec(
		compression.NewDefaultVoteExtensionCodec(),
		compression.NewZLibCompressor(),
	)
	extCommitCodec := compression.NewCompressionExtendedCommitCodec(
		compression.NewDefaultExtendedCommitCodec(),
		compression.NewZStdCompressor(),
	)
	voteExtensionsHandler := ve.NewVoteExtensionHandler(
		app.Logger(),
		app.oracleClient,
		time.Second,
		cps,
		veCodec,
		aggregator.NewOraclePriceApplier(
			aggregator.NewDefaultVoteAggregator(
				app.Logger(),
				aggregatorFn,
				// we need a separate price strategy here, so that we can optimistically apply the latest prices
				// and extend our vote based on these prices
				currencypair.NewDeltaCurrencyPairStrategy(app.OracleKeeper),
			),
			app.OracleKeeper,
			veCodec,
			extCommitCodec,
			app.Logger(),
		),
		oracleMetrics,
	)
	app.SetExtendVoteHandler(voteExtensionsHandler.ExtendVoteHandler())
	app.SetVerifyVoteExtensionHandler(voteExtensionsHandler.VerifyVoteExtensionHandler())
}
