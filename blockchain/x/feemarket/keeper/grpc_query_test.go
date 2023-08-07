package keeper_test

import (
	sdkmath "cosmossdk.io/math"
	sdk "github.com/cosmos/cosmos-sdk/types"
	ethparams "github.com/ethereum/go-ethereum/params"
	"github.com/evmos/ethermint/x/feemarket/types"
)

func (suite *KeeperTestSuite) TestQueryParams() {
	testCases := []struct {
		name    string
		expPass bool
	}{
		{
			"pass",
			true,
		},
	}
	for _, tc := range testCases {
		params := suite.app.FeeMarketKeeper.GetParams(suite.ctx)
		exp := &types.QueryParamsResponse{Params: params}

		res, err := suite.queryClient.Params(suite.ctx.Context(), &types.QueryParamsRequest{})
		if tc.expPass {
			suite.Require().Equal(exp, res, tc.name)
			suite.Require().NoError(err)
		} else {
			suite.Require().Error(err)
		}
	}
}

func (suite *KeeperTestSuite) TestQueryBaseFee() {
	var (
		aux    sdkmath.Int
		expRes *types.QueryBaseFeeResponse
	)

	testCases := []struct {
		name     string
		malleate func()
		expPass  bool
	}{
		{
			"pass - default Base Fee",
			func() {
				initialBaseFee := sdkmath.NewInt(ethparams.InitialBaseFee)
				expRes = &types.QueryBaseFeeResponse{BaseFee: &initialBaseFee}
			},
			true,
		},
		{
			"pass - non-nil Base Fee",
			func() {
				baseFee := sdk.OneInt().BigInt()
				suite.app.FeeMarketKeeper.SetBaseFee(suite.ctx, baseFee)

				aux = sdkmath.NewIntFromBigInt(baseFee)
				expRes = &types.QueryBaseFeeResponse{BaseFee: &aux}
			},
			true,
		},
	}
	for _, tc := range testCases {
		tc.malleate()

		res, err := suite.queryClient.BaseFee(suite.ctx.Context(), &types.QueryBaseFeeRequest{})
		if tc.expPass {
			suite.Require().NotNil(res)
			suite.Require().Equal(expRes, res, tc.name)
			suite.Require().NoError(err)
		} else {
			suite.Require().Error(err)
		}
	}
}

func (suite *KeeperTestSuite) TestQueryBlockGas() {
	testCases := []struct {
		name    string
		expPass bool
	}{
		{
			"pass",
			true,
		},
	}
	for _, tc := range testCases {
		gas := suite.app.FeeMarketKeeper.GetBlockGasWanted(suite.ctx)
		exp := &types.QueryBlockGasResponse{Gas: int64(gas)}

		res, err := suite.queryClient.BlockGas(suite.ctx.Context(), &types.QueryBlockGasRequest{})
		if tc.expPass {
			suite.Require().Equal(exp, res, tc.name)
			suite.Require().NoError(err)
		} else {
			suite.Require().Error(err)
		}
	}
}
