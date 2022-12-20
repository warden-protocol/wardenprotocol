package keeper_test

import (
	"github.com/evmos/ethermint/x/evm/types"
)

func (suite *KeeperTestSuite) TestParams() {
	params := suite.app.EvmKeeper.GetParams(suite.ctx)
	suite.Require().Equal(types.DefaultParams(), params)
	params.EvmDenom = "inj"
	suite.app.EvmKeeper.SetParams(suite.ctx, params)
	newParams := suite.app.EvmKeeper.GetParams(suite.ctx)
	suite.Require().Equal(newParams, params)
}
