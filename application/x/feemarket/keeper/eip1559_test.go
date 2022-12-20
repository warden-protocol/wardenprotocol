package keeper_test

import (
	"fmt"
	"math/big"

	sdk "github.com/cosmos/cosmos-sdk/types"
	abci "github.com/tendermint/tendermint/abci/types"
)

func (suite *KeeperTestSuite) TestCalculateBaseFee() {
	testCases := []struct {
		name                 string
		NoBaseFee            bool
		blockHeight          int64
		parentBlockGasWanted uint64
		minGasPrice          sdk.Dec
		expFee               *big.Int
	}{
		{
			"without BaseFee",
			true,
			0,
			0,
			sdk.ZeroDec(),
			nil,
		},
		{
			"with BaseFee - initial EIP-1559 block",
			false,
			0,
			0,
			sdk.ZeroDec(),
			suite.app.FeeMarketKeeper.GetParams(suite.ctx).BaseFee.BigInt(),
		},
		{
			"with BaseFee - parent block wanted the same gas as its target (ElasticityMultiplier = 2)",
			false,
			1,
			50,
			sdk.ZeroDec(),
			suite.app.FeeMarketKeeper.GetParams(suite.ctx).BaseFee.BigInt(),
		},
		{
			"with BaseFee - parent block wanted the same gas as its target, with higher min gas price (ElasticityMultiplier = 2)",
			false,
			1,
			50,
			sdk.NewDec(1500000000),
			suite.app.FeeMarketKeeper.GetParams(suite.ctx).BaseFee.BigInt(),
		},
		{
			"with BaseFee - parent block wanted more gas than its target (ElasticityMultiplier = 2)",
			false,
			1,
			100,
			sdk.ZeroDec(),
			big.NewInt(1125000000),
		},
		{
			"with BaseFee - parent block wanted more gas than its target, with higher min gas price (ElasticityMultiplier = 2)",
			false,
			1,
			100,
			sdk.NewDec(1500000000),
			big.NewInt(1125000000),
		},
		{
			"with BaseFee - Parent gas wanted smaller than parent gas target (ElasticityMultiplier = 2)",
			false,
			1,
			25,
			sdk.ZeroDec(),
			big.NewInt(937500000),
		},
		{
			"with BaseFee - Parent gas wanted smaller than parent gas target, with higher min gas price (ElasticityMultiplier = 2)",
			false,
			1,
			25,
			sdk.NewDec(1500000000),
			big.NewInt(1500000000),
		},
	}
	for _, tc := range testCases {
		suite.Run(fmt.Sprintf("Case %s", tc.name), func() {
			suite.SetupTest() // reset

			params := suite.app.FeeMarketKeeper.GetParams(suite.ctx)
			params.NoBaseFee = tc.NoBaseFee
			params.MinGasPrice = tc.minGasPrice
			suite.app.FeeMarketKeeper.SetParams(suite.ctx, params)

			// Set block height
			suite.ctx = suite.ctx.WithBlockHeight(tc.blockHeight)

			// Set parent block gas
			suite.app.FeeMarketKeeper.SetBlockGasWanted(suite.ctx, tc.parentBlockGasWanted)

			// Set next block target/gasLimit through Consensus Param MaxGas
			blockParams := abci.BlockParams{
				MaxGas:   100,
				MaxBytes: 10,
			}
			consParams := abci.ConsensusParams{Block: &blockParams}
			suite.ctx = suite.ctx.WithConsensusParams(&consParams)

			fee := suite.app.FeeMarketKeeper.CalculateBaseFee(suite.ctx)
			if tc.NoBaseFee {
				suite.Require().Nil(fee, tc.name)
			} else {
				suite.Require().Equal(tc.expFee, fee, tc.name)
			}
		})
	}
}
