package revenue_test

// import (
// 	"fmt"
// 	"testing"
// 	"time"

// 	"github.com/cometbft/cometbft/crypto/tmhash"
// 	tmproto "github.com/cometbft/cometbft/proto/tendermint/types"
// 	tmversion "github.com/cometbft/cometbft/proto/tendermint/version"
// 	"github.com/cometbft/cometbft/version"
// 	sdk "github.com/cosmos/cosmos-sdk/types"
// 	"github.com/stretchr/testify/suite"

// 	utiltx "github.com/qredo/fusionchain/testutil/tx"
// 	"github.com/qredo/fusionchain/utils"
// 	feemarkettypes "github.com/evmos/ethermint/x/feemarket/types"

// 	"github.com/qredo/fusionchain/app"
// 	revenue "github.com/qredo/fusionchain/x/revenue/v1"
// 	"github.com/qredo/fusionchain/x/revenue/v1/types"
// )

// type GenesisTestSuite struct {
// 	suite.Suite

// 	ctx sdk.Context

// 	app     *app.Evmos
// 	genesis types.GenesisState
// }

// func (suite *GenesisTestSuite) SetupTest() {
// 	// consensus key
// 	consAddress := sdk.ConsAddress(utiltx.GenerateAddress().Bytes())
// 	chainID := utils.TestnetChainID + "-1"
// 	suite.app = app.Setup(false, feemarkettypes.DefaultGenesisState(), chainID)
// 	suite.ctx = suite.app.BaseApp.NewContext(false, tmproto.Header{
// 		Height:          1,
// 		ChainID:         chainID,
// 		Time:            time.Now().UTC(),
// 		ProposerAddress: consAddress.Bytes(),

// 		Version: tmversion.Consensus{
// 			Block: version.BlockProtocol,
// 		},
// 		LastBlockId: tmproto.BlockID{
// 			Hash: tmhash.Sum([]byte("block_id")),
// 			PartSetHeader: tmproto.PartSetHeader{
// 				Total: 11,
// 				Hash:  tmhash.Sum([]byte("partset_header")),
// 			},
// 		},
// 		AppHash:            tmhash.Sum([]byte("app")),
// 		DataHash:           tmhash.Sum([]byte("data")),
// 		EvidenceHash:       tmhash.Sum([]byte("evidence")),
// 		ValidatorsHash:     tmhash.Sum([]byte("validators")),
// 		NextValidatorsHash: tmhash.Sum([]byte("next_validators")),
// 		ConsensusHash:      tmhash.Sum([]byte("consensus")),
// 		LastResultsHash:    tmhash.Sum([]byte("last_result")),
// 	})

// 	suite.genesis = *types.DefaultGenesisState()
// }

// func TestGenesisTestSuite(t *testing.T) {
// 	suite.Run(t, new(GenesisTestSuite))
// }

// func (suite *GenesisTestSuite) TestRevenueInitGenesis() {
// 	testCases := []struct {
// 		name     string
// 		genesis  types.GenesisState
// 		expPanic bool
// 	}{
// 		{
// 			"default genesis",
// 			suite.genesis,
// 			false,
// 		},
// 		{
// 			"custom genesis - revenue disabled",
// 			types.GenesisState{
// 				Params: types.Params{
// 					EnableRevenue:            false,
// 					DeveloperShares:          types.DefaultDeveloperShares,
// 					AddrDerivationCostCreate: types.DefaultAddrDerivationCostCreate,
// 				},
// 			},
// 			false,
// 		},
// 	}

// 	for _, tc := range testCases {
// 		suite.Run(fmt.Sprintf("Case %s", tc.name), func() {
// 			suite.SetupTest() // reset

// 			if tc.expPanic {
// 				suite.Require().Panics(func() {
// 					revenue.InitGenesis(suite.ctx, suite.app.RevenueKeeper, tc.genesis)
// 				})
// 			} else {
// 				suite.Require().NotPanics(func() {
// 					revenue.InitGenesis(suite.ctx, suite.app.RevenueKeeper, tc.genesis)
// 				})

// 				params := suite.app.RevenueKeeper.GetParams(suite.ctx)
// 				suite.Require().Equal(tc.genesis.Params, params)
// 			}
// 		})
// 	}
// }

// func (suite *GenesisTestSuite) TestRevenueExportGenesis() {
// 	revenue.InitGenesis(suite.ctx, suite.app.RevenueKeeper, suite.genesis)

// 	genesisExported := revenue.ExportGenesis(suite.ctx, suite.app.RevenueKeeper)
// 	suite.Require().Equal(genesisExported.Params, suite.genesis.Params)
// }
