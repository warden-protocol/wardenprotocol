package keeper_test

import (
	"reflect"

	"github.com/evmos/ethermint/x/feemarket/types"
)

func (suite *KeeperTestSuite) TestSetGetParams() {
	params := suite.app.FeeMarketKeeper.GetParams(suite.ctx)
	suite.app.FeeMarketKeeper.SetParams(suite.ctx, params)
	testCases := []struct {
		name      string
		paramsFun func() interface{}
		getFun    func() interface{}
		expected  bool
	}{
		{
			"success - Checks if the default params are set correctly",
			func() interface{} {
				return types.DefaultParams()
			},
			func() interface{} {
				return suite.app.FeeMarketKeeper.GetParams(suite.ctx)
			},
			true,
		},
		{
			"success - Check ElasticityMultiplier is set to 3 and can be retrieved correctly",
			func() interface{} {
				params.ElasticityMultiplier = 3
				suite.app.FeeMarketKeeper.SetParams(suite.ctx, params)
				return params.ElasticityMultiplier
			},
			func() interface{} {
				return suite.app.FeeMarketKeeper.GetParams(suite.ctx).ElasticityMultiplier
			},
			true,
		},
		{
			"success - Check BaseFeeEnabled is computed with its default params and can be retrieved correctly",
			func() interface{} {
				suite.app.FeeMarketKeeper.SetParams(suite.ctx, types.DefaultParams())
				return true
			},
			func() interface{} {
				return suite.app.FeeMarketKeeper.GetBaseFeeEnabled(suite.ctx)
			},
			true,
		},
		{
			"success - Check BaseFeeEnabled is computed with alternate params and can be retrieved correctly",
			func() interface{} {
				params.NoBaseFee = true
				params.EnableHeight = 5
				suite.app.FeeMarketKeeper.SetParams(suite.ctx, params)
				return true
			},
			func() interface{} {
				return suite.app.FeeMarketKeeper.GetBaseFeeEnabled(suite.ctx)
			},
			false,
		},
	}
	for _, tc := range testCases {
		suite.Run(tc.name, func() {
			outcome := reflect.DeepEqual(tc.paramsFun(), tc.getFun())
			suite.Require().Equal(tc.expected, outcome)
		})
	}
}
