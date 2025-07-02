package app

import (
	"context"
	"math/big"
	"time"

	"cosmossdk.io/log"
	cometabci "github.com/cometbft/cometbft/abci/types"
	"github.com/cosmos/cosmos-sdk/baseapp"
	"github.com/cosmos/cosmos-sdk/server/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/mempool"
	stakingkeeper "github.com/cosmos/cosmos-sdk/x/staking/keeper"
	oraclepreblock "github.com/skip-mev/slinky/abci/preblock/oracle"
	"github.com/skip-mev/slinky/abci/proposals"
	"github.com/skip-mev/slinky/abci/strategies/aggregator"
	compression "github.com/skip-mev/slinky/abci/strategies/codec"
	"github.com/skip-mev/slinky/abci/strategies/currencypair"
	"github.com/skip-mev/slinky/abci/ve"
	vetypes "github.com/skip-mev/slinky/abci/ve/types"
	slinkyaggregator "github.com/skip-mev/slinky/aggregator"
	oracleconfig "github.com/skip-mev/slinky/oracle/config"
	"github.com/skip-mev/slinky/pkg/math/voteweighted"
	slinkytypes "github.com/skip-mev/slinky/pkg/types"
	oracleclient "github.com/skip-mev/slinky/service/clients/oracle"
	servicemetrics "github.com/skip-mev/slinky/service/metrics"
	oraclekeeper "github.com/skip-mev/slinky/x/oracle/keeper"

	"github.com/warden-protocol/wardenprotocol/warden/abciutil"
	"github.com/warden-protocol/wardenprotocol/warden/app/vemanager"
)

func (app *App) initializeOracles(appOpts types.AppOptions) {
	app.setupMempool()
	baseProposalHandler := app.baseProposalHandler()
	app.setupSlinkyClient(appOpts)
	app.setupABCILifecycle(
		baseProposalHandler.PrepareProposalHandler(),
		baseProposalHandler.ProcessProposalHandler(),
	)
}

func (app *App) setupMempool() {
	// force NoOpMempool as required by x/evm
	noopMempool := mempool.NoOpMempool{}
	app.SetMempool(noopMempool)
}

func (app *App) setupSlinkyClient(appOpts types.AppOptions) {
	chainID := app.ChainID()

	c, err := NewSlinkyClient(app.Logger(), chainID, appOpts, app.StakingKeeper, app.OracleKeeper)
	if err != nil {
		panic(err)
	}

	app.slinkyClient = c
}

func (app *App) baseProposalHandler() *baseapp.DefaultProposalHandler {
	mempool := app.Mempool()
	return baseapp.NewDefaultProposalHandler(mempool, app)
}

type SlinkyClient struct {
	logger         log.Logger
	cfg            oracleconfig.AppConfig
	metrics        servicemetrics.Metrics
	client         oracleclient.OracleClient
	veCodec        compression.VoteExtensionCodec
	wrappedVECodec compression.VoteExtensionCodec
	extCommitCodec compression.ExtendedCommitCodec
	stakingKeeper  *stakingkeeper.Keeper
	oracleKeeper   *oraclekeeper.Keeper
}

func NewSlinkyClient(
	logger log.Logger,
	chainID string,
	appOpts types.AppOptions,
	stakingKeeper *stakingkeeper.Keeper,
	oracleKeeper *oraclekeeper.Keeper,
) (*SlinkyClient, error) {
	// Read general config from app-opts, and construct oracle service.
	cfg, err := oracleconfig.ReadConfigFromAppOpts(appOpts)
	if err != nil {
		return nil, err
	}

	// If app level instrumentation is enabled, then wrap the oracle service with a metrics client
	// to get metrics on the oracle service (for ABCI++). This will allow the instrumentation to track
	// latency in VerifyVoteExtension requests and more.
	metrics, err := servicemetrics.NewMetricsFromConfig(cfg, chainID)
	if err != nil {
		return nil, err
	}

	// Create the oracle service.
	client, err := oracleclient.NewClientFromConfig(
		cfg,
		logger.With("client", "oracle"),
		metrics,
	)
	if err != nil {
		return nil, err
	}

	// Connect to the oracle service (default timeout of 5 seconds).
	go func() {
		if err := client.Start(context.Background()); err != nil {
			logger.Error("failed to start oracle client", "err", err)
			// It's okay to panic here because an error here means that the
			// address was misconfigured.
			// In case the oracle server is not running, this won't be an error
			// and the application will continue to run as expected.
			panic(err)
		}

		logger.Info("started oracle client", "address", cfg.OracleAddress)
	}()

	veCodec := compression.NewCompressionVoteExtensionCodec(
		compression.NewDefaultVoteExtensionCodec(),
		compression.NewZLibCompressor(),
	)

	return &SlinkyClient{
		logger:  logger,
		cfg:     cfg,
		metrics: metrics,
		client:  client,
		veCodec: veCodec,
		wrappedVECodec: &WardenSlinkyCodec{
			slinkyCodec: veCodec,
		},
		extCommitCodec: compression.NewCompressionExtendedCommitCodec(
			compression.NewDefaultExtendedCommitCodec(),
			compression.NewZStdCompressor(),
		),
		stakingKeeper: stakingKeeper,
		oracleKeeper:  oracleKeeper,
	}, nil
}

func (sc *SlinkyClient) ProposalHandler(
	prepareProposalHandler sdk.PrepareProposalHandler,
	processProposalHandler sdk.ProcessProposalHandler,
) *proposals.ProposalHandler {
	return proposals.NewProposalHandler(
		sc.logger,
		prepareProposalHandler,
		processProposalHandler,
		ve.NewDefaultValidateVoteExtensionsFn(sc.stakingKeeper),
		sc.wrappedVECodec,
		sc.extCommitCodec,
		currencypair.NewDeltaCurrencyPairStrategy(sc.oracleKeeper),
		sc.metrics,
	)
}

func (sc *SlinkyClient) AggregatorFn() slinkyaggregator.AggregateFnFromContext[string, map[slinkytypes.CurrencyPair]*big.Int] {
	// Create the aggregation function that will be used to aggregate oracle data
	// from each validator.
	return voteweighted.MedianFromContext(
		sc.logger,
		sc.stakingKeeper,
		voteweighted.DefaultPowerThreshold,
	)
}

func (sc *SlinkyClient) PreblockHandler() *oraclepreblock.PreBlockHandler {
	return oraclepreblock.NewOraclePreBlockHandler(
		sc.logger,
		sc.AggregatorFn(),
		sc.oracleKeeper,
		sc.metrics,
		currencypair.NewDeltaCurrencyPairStrategy(sc.oracleKeeper),
		sc.wrappedVECodec,
		sc.extCommitCodec,
	)
}

func (sc *SlinkyClient) VoteExtensionHandler() *ve.VoteExtensionHandler {
	cps := currencypair.NewDeltaCurrencyPairStrategy(sc.oracleKeeper)

	return ve.NewVoteExtensionHandler(
		sc.logger,
		sc.client,
		time.Second,
		cps,
		sc.veCodec,
		aggregator.NewOraclePriceApplier(
			aggregator.NewDefaultVoteAggregator(
				sc.logger,
				sc.AggregatorFn(),
				// we need a separate price strategy here, so that we can optimistically apply the latest prices
				// and extend our vote based on these prices
				currencypair.NewDeltaCurrencyPairStrategy(sc.oracleKeeper),
			),
			sc.oracleKeeper,
			sc.wrappedVECodec,
			sc.extCommitCodec,
			sc.logger,
		),
		sc.metrics,
	)
}

func (app *App) setupABCILifecycle(
	basePrepareProposalHandler sdk.PrepareProposalHandler,
	baseProcessProposalHandler sdk.ProcessProposalHandler,
) {
	slinkyProposalHandler := app.slinkyClient.ProposalHandler(
		basePrepareProposalHandler,
		baseProcessProposalHandler,
	)
	slinkyPreBlockHandler := app.slinkyClient.PreblockHandler()
	slinkyVEHandler := app.slinkyClient.VoteExtensionHandler()

	processProposalHandlers := append(
		abciutil.ProcessProposalHandlers{},
		slinkyProposalHandler.ProcessProposalHandler(),
		app.AsyncKeeper.ProcessProposalHandler(),
	)
	app.SetProcessProposal(processProposalHandlers.ProcessProposalHandler())

	app.SetPreBlocker(combinePreBlocker(
		slinkyPreBlockHandler.WrappedPreBlocker(app.ModuleManager),
		app.AsyncKeeper.PreBlocker(),
	))

	veManager := vemanager.NewVoteExtensionManager()

	// register slinky handlers
	veManager.Register(
		slinkyVEHandler.ExtendVoteHandler(),
		slinkyVEHandler.VerifyVoteExtensionHandler(),
	)

	// register x/async handlers
	veManager.Register(
		app.AsyncKeeper.ExtendVoteHandler(),
		app.AsyncKeeper.VerifyVoteExtensionHandler(),
	)

	prepareProposalHandlers := append(abciutil.PrepareProposalHandlers{},
		slinkyProposalHandler.PrepareProposalHandler(),
		app.AsyncKeeper.PrepareProposalHandler(),
	)
	app.SetPrepareProposal(prepareProposalHandlers.PrepareProposalHandler())

	app.SetExtendVoteHandler(veManager.ExtendVoteHandler())
	app.SetVerifyVoteExtensionHandler(veManager.VerifyVoteExtensionHandler())
}

func combinePreBlocker(a, b sdk.PreBlocker) sdk.PreBlocker {
	return func(ctx sdk.Context, req *cometabci.RequestFinalizeBlock) (*sdk.ResponsePreBlock, error) {
		respA, err := a(ctx, req)
		if err != nil {
			return respA, err
		}

		respB, err := b(ctx, req)
		if err != nil {
			return respB, err
		}

		return &sdk.ResponsePreBlock{
			ConsensusParamsChanged: respA.ConsensusParamsChanged || respB.ConsensusParamsChanged,
		}, nil
	}
}

// WardenSlinkyCodec wraps slinky's codec.VoteExtensionCodec to support our
// custom vote extension format (vemanager.VE).
type WardenSlinkyCodec struct {
	slinkyCodec compression.VoteExtensionCodec
}

var _ compression.VoteExtensionCodec = (*WardenSlinkyCodec)(nil)

// Decode a vote extension []byte into a vemanager.VE, then decode the first
// vote extension item using the wrapped slinky codec.
func (a *WardenSlinkyCodec) Decode(b []byte) (vetypes.OracleVoteExtension, error) {
	var w vemanager.VoteExtensions

	if err := w.Unmarshal(b); err != nil {
		// Backwards compatibility: during the upgrade from just Slinky's VE to
		// the new vemanager.VoteExtensions format, we saw that nodes still
		// could receive a Slinky VE, from the blocks before the
		// upgrade.
		//
		// After the upgrade to v0.6 the following line should be safe to be
		// changed to simply return the error.
		return a.slinkyCodec.Decode(b)
	}

	if len(w.Extensions) == 0 {
		return a.slinkyCodec.Decode(nil)
	}

	return a.slinkyCodec.Decode(w.Extensions[0])
}

func (a *WardenSlinkyCodec) Encode(ve vetypes.OracleVoteExtension) ([]byte, error) {
	return a.slinkyCodec.Encode(ve)
}
