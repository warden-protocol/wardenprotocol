package app

import (
	"context"
	"fmt"
	"slices"
	"time"

	storetypes "cosmossdk.io/store/types"
	upgradetypes "cosmossdk.io/x/upgrade/types"
	tmtypes "github.com/cometbft/cometbft/proto/tendermint/types"
	"github.com/cosmos/cosmos-sdk/baseapp"
	"github.com/cosmos/cosmos-sdk/server/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/module"
	authtypes "github.com/cosmos/cosmos-sdk/x/auth/types"
	consensustypes "github.com/cosmos/cosmos-sdk/x/consensus/types"
	govtypes "github.com/cosmos/cosmos-sdk/x/gov/types"

	oraclepreblock "github.com/skip-mev/slinky/abci/preblock/oracle"
	"github.com/skip-mev/slinky/abci/proposals"
	"github.com/skip-mev/slinky/abci/strategies/aggregator"
	compression "github.com/skip-mev/slinky/abci/strategies/codec"
	"github.com/skip-mev/slinky/abci/strategies/currencypair"
	"github.com/skip-mev/slinky/abci/ve"
	"github.com/skip-mev/slinky/cmd/constants"
	oracleconfig "github.com/skip-mev/slinky/oracle/config"
	"github.com/skip-mev/slinky/pkg/math/voteweighted"
	oracleclient "github.com/skip-mev/slinky/service/clients/oracle"
	servicemetrics "github.com/skip-mev/slinky/service/metrics"
	"github.com/skip-mev/slinky/x/alerts"
	"github.com/skip-mev/slinky/x/incentives"
	marketmaptypes "github.com/skip-mev/slinky/x/marketmap/types"
	oracletypes "github.com/skip-mev/slinky/x/oracle/types"
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
	initializeABCIExtensions(app, oracleMetrics)
}

func initializeABCIExtensions(app *App, oracleMetrics servicemetrics.Metrics) {
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

type AppUpgrade struct {
	Name         string
	Handler      upgradetypes.UpgradeHandler
	StoreUpgrade storetypes.StoreUpgrades
}

// createSlinkyUpgrader returns the upgrade name and an upgrade handler that:
// - runs migrations
// - updates the consensus keeper params with a vote extension enable height. (height of upgrade + 10).
// - adds the core markets to x/marketmap keeper.
// additionally, it returns the required StoreUpgrades needed for the new slinky modules added to this chain.
func createSlinkyUpgrader(app *App) AppUpgrade {
	return AppUpgrade{
		Name: "v03-to-v04",
		Handler: func(ctx context.Context, _ upgradetypes.Plan, fromVM module.VersionMap) (module.VersionMap, error) {
			migrations, err := app.ModuleManager.RunMigrations(ctx, app.Configurator(), fromVM)
			if err != nil {
				return nil, err
			}
			// upgrade consensus params to enable vote extensions
			consensusParams, err := app.ConsensusParamsKeeper.Params(ctx, nil)
			if err != nil {
				return nil, err
			}
			sdkCtx := sdk.UnwrapSDKContext(ctx)
			consensusParams.Params.Abci = &tmtypes.ABCIParams{
				VoteExtensionsEnableHeight: sdkCtx.BlockHeight() + int64(10),
			}
			_, err = app.ConsensusParamsKeeper.UpdateParams(ctx, &consensustypes.MsgUpdateParams{
				Authority: app.ConsensusParamsKeeper.GetAuthority(),
				Block:     consensusParams.Params.Block,
				Evidence:  consensusParams.Params.Evidence,
				Validator: consensusParams.Params.Validator,
				Abci:      consensusParams.Params.Abci,
			})
			if err != nil {
				return nil, err
			}

			// add core markets
			coreMarkets := constants.CoreMarketMap
			markets := coreMarkets.Markets
			keys := make([]string, 0, len(markets))
			for name := range markets {
				keys = append(keys, name)
			}
			slices.Sort(keys)

			// iterates over slice and not map
			for _, marketName := range keys {
				// create market
				market := markets[marketName]
				err = app.MarketMapKeeper.CreateMarket(sdkCtx, market)
				if err != nil {
					return nil, err
				}

				// invoke hooks
				err = app.MarketMapKeeper.Hooks().AfterMarketCreated(sdkCtx, market)
				if err != nil {
					return nil, err
				}
			}

			err = app.MarketMapKeeper.SetParams(
				sdkCtx,
				marketmaptypes.Params{
					Admin: authtypes.NewModuleAddress(govtypes.ModuleName).String(), // governance. allows gov to add or remove market authorities.
					// market authority addresses may add and update markets to the x/marketmap module.
					MarketAuthorities: []string{
						"warden1ua63s43u2p4v38pxhcxmps0tj2gudyw2rctzk3",          // skip multisig
						authtypes.NewModuleAddress(govtypes.ModuleName).String(), // governance
					}},
			)
			if err != nil {
				return nil, fmt.Errorf("failed to set x/marketmap params: %w", err)
			}
			return migrations, nil
		},
		StoreUpgrade: storetypes.StoreUpgrades{
			Added: []string{
				marketmaptypes.ModuleName,
				oracletypes.ModuleName,
				incentives.AppModuleBasic{}.Name(),
				alerts.AppModuleBasic{}.Name(),
			},
		},
	}
}
