package keeper_test

import (
	"github.com/sashaduke/fusion/x/feemarket/types"
)

func (suite *KeeperTestSuite) TestSetGetParams() {
	params := suite.app.FeeMarketKeeper.GetParams(suite.ctx)
	suite.Require().Equal(types.DefaultParams(), params)
	params.ElasticityMultiplier = 3
	suite.app.FeeMarketKeeper.SetParams(suite.ctx, params)
	newParams := suite.app.FeeMarketKeeper.GetParams(suite.ctx)
	suite.Require().Equal(newParams, params)
}
