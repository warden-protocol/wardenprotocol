package keeper_test

import (
	"math/big"

	"github.com/sashaduke/fusion/x/feemarket/keeper"
	v010 "github.com/sashaduke/fusion/x/feemarket/migrations/v010"
)

func (suite *KeeperTestSuite) TestMigration1To2() {
	suite.SetupTest()
	storeKey := suite.app.GetKey("feemarket")
	store := suite.ctx.KVStore(storeKey)
	baseFee := big.NewInt(1000)
	store.Set(v010.KeyPrefixBaseFeeV1, baseFee.Bytes())
	m := keeper.NewMigrator(suite.app.FeeMarketKeeper)
	err := m.Migrate1to2(suite.ctx)
	suite.Require().NoError(err)
	suite.Require().Equal(baseFee, suite.app.FeeMarketKeeper.GetBaseFee(suite.ctx))
}
