package keeper_test

import (
	"reflect"

	"github.com/evmos/ethermint/x/evm/types"
)

func (suite *KeeperTestSuite) TestParams() {
	params := suite.app.EvmKeeper.GetParams(suite.ctx)
	suite.app.EvmKeeper.SetParams(suite.ctx, params)
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
				return suite.app.EvmKeeper.GetParams(suite.ctx)
			},
			true,
		},
		{
			"success - EvmDenom param is set to \"inj\" and can be retrieved correctly",
			func() interface{} {
				params.EvmDenom = "inj"
				suite.app.EvmKeeper.SetParams(suite.ctx, params)
				return params.EvmDenom
			},
			func() interface{} {
				evmParams := suite.app.EvmKeeper.GetParams(suite.ctx)
				return evmParams.GetEvmDenom()
			},
			true,
		},
		{
			"success - Check EnableCreate param is set to false and can be retrieved correctly",
			func() interface{} {
				params.EnableCreate = false
				suite.app.EvmKeeper.SetParams(suite.ctx, params)
				return params.EnableCreate
			},
			func() interface{} {
				evmParams := suite.app.EvmKeeper.GetParams(suite.ctx)
				return evmParams.GetEnableCreate()
			},
			true,
		},
		{
			"success - Check EnableCall param is set to false and can be retrieved correctly",
			func() interface{} {
				params.EnableCall = false
				suite.app.EvmKeeper.SetParams(suite.ctx, params)
				return params.EnableCall
			},
			func() interface{} {
				evmParams := suite.app.EvmKeeper.GetParams(suite.ctx)
				return evmParams.GetEnableCall()
			},
			true,
		},
		{
			"success - Check AllowUnprotectedTxs param is set to false and can be retrieved correctly",
			func() interface{} {
				params.AllowUnprotectedTxs = false
				suite.app.EvmKeeper.SetParams(suite.ctx, params)
				return params.AllowUnprotectedTxs
			},
			func() interface{} {
				evmParams := suite.app.EvmKeeper.GetParams(suite.ctx)
				return evmParams.GetAllowUnprotectedTxs()
			},
			true,
		},
		{
			"success - Check ChainConfig param is set to the default value and can be retrieved correctly",
			func() interface{} {
				params.ChainConfig = types.DefaultChainConfig()
				suite.app.EvmKeeper.SetParams(suite.ctx, params)
				return params.ChainConfig
			},
			func() interface{} {
				evmParams := suite.app.EvmKeeper.GetParams(suite.ctx)
				return evmParams.GetChainConfig()
			},
			true,
		},
	}
	for _, tc := range testCases {
		suite.Run(tc.name, func() {
			outcome := reflect.DeepEqual(tc.paramsFun(), tc.getFun())
			suite.Require().Equal(tc.expected, outcome)
		})
	}
}
