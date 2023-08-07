package keeper_test

import (
	"math/big"

	sdkmath "cosmossdk.io/math"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/ethereum/go-ethereum/common"
	ethtypes "github.com/ethereum/go-ethereum/core/types"
	ethparams "github.com/ethereum/go-ethereum/params"
	"github.com/evmos/ethermint/x/evm/keeper"
	evmtypes "github.com/evmos/ethermint/x/evm/types"
)

func (suite *KeeperTestSuite) TestCheckSenderBalance() {
	hundredInt := sdkmath.NewInt(100)
	zeroInt := sdk.ZeroInt()
	oneInt := sdk.OneInt()
	fiveInt := sdkmath.NewInt(5)
	fiftyInt := sdkmath.NewInt(50)
	negInt := sdkmath.NewInt(-10)

	testCases := []struct {
		name            string
		to              string
		gasLimit        uint64
		gasPrice        *sdkmath.Int
		gasFeeCap       *big.Int
		gasTipCap       *big.Int
		cost            *sdkmath.Int
		from            string
		accessList      *ethtypes.AccessList
		expectPass      bool
		enableFeemarket bool
	}{
		{
			name:       "Enough balance",
			to:         suite.address.String(),
			gasLimit:   10,
			gasPrice:   &oneInt,
			cost:       &oneInt,
			from:       suite.address.String(),
			accessList: &ethtypes.AccessList{},
			expectPass: true,
		},
		{
			name:       "Equal balance",
			to:         suite.address.String(),
			gasLimit:   99,
			gasPrice:   &oneInt,
			cost:       &oneInt,
			from:       suite.address.String(),
			accessList: &ethtypes.AccessList{},
			expectPass: true,
		},
		{
			name:       "negative cost",
			to:         suite.address.String(),
			gasLimit:   1,
			gasPrice:   &oneInt,
			cost:       &negInt,
			from:       suite.address.String(),
			accessList: &ethtypes.AccessList{},
			expectPass: false,
		},
		{
			name:       "Higher gas limit, not enough balance",
			to:         suite.address.String(),
			gasLimit:   100,
			gasPrice:   &oneInt,
			cost:       &oneInt,
			from:       suite.address.String(),
			accessList: &ethtypes.AccessList{},
			expectPass: false,
		},
		{
			name:       "Higher gas price, enough balance",
			to:         suite.address.String(),
			gasLimit:   10,
			gasPrice:   &fiveInt,
			cost:       &oneInt,
			from:       suite.address.String(),
			accessList: &ethtypes.AccessList{},
			expectPass: true,
		},
		{
			name:       "Higher gas price, not enough balance",
			to:         suite.address.String(),
			gasLimit:   20,
			gasPrice:   &fiveInt,
			cost:       &oneInt,
			from:       suite.address.String(),
			accessList: &ethtypes.AccessList{},
			expectPass: false,
		},
		{
			name:       "Higher cost, enough balance",
			to:         suite.address.String(),
			gasLimit:   10,
			gasPrice:   &fiveInt,
			cost:       &fiftyInt,
			from:       suite.address.String(),
			accessList: &ethtypes.AccessList{},
			expectPass: true,
		},
		{
			name:       "Higher cost, not enough balance",
			to:         suite.address.String(),
			gasLimit:   10,
			gasPrice:   &fiveInt,
			cost:       &hundredInt,
			from:       suite.address.String(),
			accessList: &ethtypes.AccessList{},
			expectPass: false,
		},
		{
			name:            "Enough balance w/ enableFeemarket",
			to:              suite.address.String(),
			gasLimit:        10,
			gasFeeCap:       big.NewInt(1),
			cost:            &oneInt,
			from:            suite.address.String(),
			accessList:      &ethtypes.AccessList{},
			expectPass:      true,
			enableFeemarket: true,
		},
		{
			name:            "Equal balance w/ enableFeemarket",
			to:              suite.address.String(),
			gasLimit:        99,
			gasFeeCap:       big.NewInt(1),
			cost:            &oneInt,
			from:            suite.address.String(),
			accessList:      &ethtypes.AccessList{},
			expectPass:      true,
			enableFeemarket: true,
		},
		{
			name:            "negative cost w/ enableFeemarket",
			to:              suite.address.String(),
			gasLimit:        1,
			gasFeeCap:       big.NewInt(1),
			cost:            &negInt,
			from:            suite.address.String(),
			accessList:      &ethtypes.AccessList{},
			expectPass:      false,
			enableFeemarket: true,
		},
		{
			name:            "Higher gas limit, not enough balance w/ enableFeemarket",
			to:              suite.address.String(),
			gasLimit:        100,
			gasFeeCap:       big.NewInt(1),
			cost:            &oneInt,
			from:            suite.address.String(),
			accessList:      &ethtypes.AccessList{},
			expectPass:      false,
			enableFeemarket: true,
		},
		{
			name:            "Higher gas price, enough balance w/ enableFeemarket",
			to:              suite.address.String(),
			gasLimit:        10,
			gasFeeCap:       big.NewInt(5),
			cost:            &oneInt,
			from:            suite.address.String(),
			accessList:      &ethtypes.AccessList{},
			expectPass:      true,
			enableFeemarket: true,
		},
		{
			name:            "Higher gas price, not enough balance w/ enableFeemarket",
			to:              suite.address.String(),
			gasLimit:        20,
			gasFeeCap:       big.NewInt(5),
			cost:            &oneInt,
			from:            suite.address.String(),
			accessList:      &ethtypes.AccessList{},
			expectPass:      false,
			enableFeemarket: true,
		},
		{
			name:            "Higher cost, enough balance w/ enableFeemarket",
			to:              suite.address.String(),
			gasLimit:        10,
			gasFeeCap:       big.NewInt(5),
			cost:            &fiftyInt,
			from:            suite.address.String(),
			accessList:      &ethtypes.AccessList{},
			expectPass:      true,
			enableFeemarket: true,
		},
		{
			name:            "Higher cost, not enough balance w/ enableFeemarket",
			to:              suite.address.String(),
			gasLimit:        10,
			gasFeeCap:       big.NewInt(5),
			cost:            &hundredInt,
			from:            suite.address.String(),
			accessList:      &ethtypes.AccessList{},
			expectPass:      false,
			enableFeemarket: true,
		},
	}

	vmdb := suite.StateDB()
	vmdb.AddBalance(suite.address, hundredInt.BigInt())
	balance := vmdb.GetBalance(suite.address)
	suite.Require().Equal(balance, hundredInt.BigInt())
	err := vmdb.Commit()
	suite.Require().NoError(err, "Unexpected error while committing to vmdb: %d", err)

	for i, tc := range testCases {
		suite.Run(tc.name, func() {
			to := common.HexToAddress(tc.from)

			var amount, gasPrice, gasFeeCap, gasTipCap *big.Int
			if tc.cost != nil {
				amount = tc.cost.BigInt()
			}

			if tc.enableFeemarket {
				gasFeeCap = tc.gasFeeCap
				if tc.gasTipCap == nil {
					gasTipCap = oneInt.BigInt()
				} else {
					gasTipCap = tc.gasTipCap
				}
			} else {
				if tc.gasPrice != nil {
					gasPrice = tc.gasPrice.BigInt()
				}
			}

			tx := evmtypes.NewTx(zeroInt.BigInt(), 1, &to, amount, tc.gasLimit, gasPrice, gasFeeCap, gasTipCap, nil, tc.accessList)
			tx.From = tc.from

			txData, _ := evmtypes.UnpackTxData(tx.Data)

			acct := suite.app.EvmKeeper.GetAccountOrEmpty(suite.ctx, suite.address)
			err := keeper.CheckSenderBalance(
				sdkmath.NewIntFromBigInt(acct.Balance),
				txData,
			)

			if tc.expectPass {
				suite.Require().NoError(err, "valid test %d failed", i)
			} else {
				suite.Require().Error(err, "invalid test %d passed", i)
			}
		})
	}
}

// TestVerifyFeeAndDeductTxCostsFromUserBalance is a test method for both the VerifyFee
// function and the DeductTxCostsFromUserBalance method.
//
// NOTE: This method combines testing for both functions, because these used to be
// in one function and share a lot of the same setup.
// In practice, the two tested functions will also be sequentially executed.
func (suite *KeeperTestSuite) TestVerifyFeeAndDeductTxCostsFromUserBalance() {
	hundredInt := sdkmath.NewInt(100)
	zeroInt := sdk.ZeroInt()
	oneInt := sdkmath.NewInt(1)
	fiveInt := sdkmath.NewInt(5)
	fiftyInt := sdkmath.NewInt(50)

	// should be enough to cover all test cases
	initBalance := sdkmath.NewInt((ethparams.InitialBaseFee + 10) * 105)

	testCases := []struct {
		name             string
		gasLimit         uint64
		gasPrice         *sdkmath.Int
		gasFeeCap        *big.Int
		gasTipCap        *big.Int
		cost             *sdkmath.Int
		accessList       *ethtypes.AccessList
		expectPassVerify bool
		expectPassDeduct bool
		enableFeemarket  bool
		from             string
		malleate         func()
	}{
		{
			name:             "Enough balance",
			gasLimit:         10,
			gasPrice:         &oneInt,
			cost:             &oneInt,
			accessList:       &ethtypes.AccessList{},
			expectPassVerify: true,
			expectPassDeduct: true,
			from:             suite.address.String(),
		},
		{
			name:             "Equal balance",
			gasLimit:         100,
			gasPrice:         &oneInt,
			cost:             &oneInt,
			accessList:       &ethtypes.AccessList{},
			expectPassVerify: true,
			expectPassDeduct: true,
			from:             suite.address.String(),
		},
		{
			name:             "Higher gas limit, not enough balance",
			gasLimit:         105,
			gasPrice:         &oneInt,
			cost:             &oneInt,
			accessList:       &ethtypes.AccessList{},
			expectPassVerify: true,
			expectPassDeduct: false,
			from:             suite.address.String(),
		},
		{
			name:             "Higher gas price, enough balance",
			gasLimit:         20,
			gasPrice:         &fiveInt,
			cost:             &oneInt,
			accessList:       &ethtypes.AccessList{},
			expectPassVerify: true,
			expectPassDeduct: true,
			from:             suite.address.String(),
		},
		{
			name:             "Higher gas price, not enough balance",
			gasLimit:         20,
			gasPrice:         &fiftyInt,
			cost:             &oneInt,
			accessList:       &ethtypes.AccessList{},
			expectPassVerify: true,
			expectPassDeduct: false,
			from:             suite.address.String(),
		},
		// This case is expected to be true because the fees can be deducted, but the tx
		// execution is going to fail because there is no more balance to pay the cost
		{
			name:             "Higher cost, enough balance",
			gasLimit:         100,
			gasPrice:         &oneInt,
			cost:             &fiftyInt,
			accessList:       &ethtypes.AccessList{},
			expectPassVerify: true,
			expectPassDeduct: true,
			from:             suite.address.String(),
		},
		//  testcases with enableFeemarket enabled.
		{
			name:             "Invalid gasFeeCap w/ enableFeemarket",
			gasLimit:         10,
			gasFeeCap:        big.NewInt(1),
			gasTipCap:        big.NewInt(1),
			cost:             &oneInt,
			accessList:       &ethtypes.AccessList{},
			expectPassVerify: false,
			expectPassDeduct: true,
			enableFeemarket:  true,
			from:             suite.address.String(),
		},
		{
			name:             "empty tip fee is valid to deduct",
			gasLimit:         10,
			gasFeeCap:        big.NewInt(ethparams.InitialBaseFee),
			gasTipCap:        big.NewInt(1),
			cost:             &oneInt,
			accessList:       &ethtypes.AccessList{},
			expectPassVerify: true,
			expectPassDeduct: true,
			enableFeemarket:  true,
			from:             suite.address.String(),
		},
		{
			name:             "effectiveTip equal to gasTipCap",
			gasLimit:         100,
			gasFeeCap:        big.NewInt(ethparams.InitialBaseFee + 2),
			cost:             &oneInt,
			accessList:       &ethtypes.AccessList{},
			expectPassVerify: true,
			expectPassDeduct: true,
			enableFeemarket:  true,
			from:             suite.address.String(),
		},
		{
			name:             "effectiveTip equal to (gasFeeCap - baseFee)",
			gasLimit:         105,
			gasFeeCap:        big.NewInt(ethparams.InitialBaseFee + 1),
			gasTipCap:        big.NewInt(2),
			cost:             &oneInt,
			accessList:       &ethtypes.AccessList{},
			expectPassVerify: true,
			expectPassDeduct: true,
			enableFeemarket:  true,
			from:             suite.address.String(),
		},
		{
			name:             "Invalid from address",
			gasLimit:         10,
			gasPrice:         &oneInt,
			cost:             &oneInt,
			accessList:       &ethtypes.AccessList{},
			expectPassVerify: true,
			expectPassDeduct: false,
			from:             "abcdef",
		},
		{
			name:     "Enough balance - with access list",
			gasLimit: 10,
			gasPrice: &oneInt,
			cost:     &oneInt,
			accessList: &ethtypes.AccessList{
				ethtypes.AccessTuple{
					Address:     suite.address,
					StorageKeys: []common.Hash{},
				},
			},
			expectPassVerify: true,
			expectPassDeduct: true,
			from:             suite.address.String(),
		},
		{
			name:             "gasLimit < intrinsicGas during IsCheckTx",
			gasLimit:         1,
			gasPrice:         &oneInt,
			cost:             &oneInt,
			accessList:       &ethtypes.AccessList{},
			expectPassVerify: false,
			expectPassDeduct: true,
			from:             suite.address.String(),
			malleate: func() {
				suite.ctx = suite.ctx.WithIsCheckTx(true)
			},
		},
	}

	for i, tc := range testCases {
		suite.Run(tc.name, func() {
			suite.enableFeemarket = tc.enableFeemarket
			suite.SetupTest()
			vmdb := suite.StateDB()

			if tc.malleate != nil {
				tc.malleate()
			}
			var amount, gasPrice, gasFeeCap, gasTipCap *big.Int
			if tc.cost != nil {
				amount = tc.cost.BigInt()
			}

			if suite.enableFeemarket {
				if tc.gasFeeCap != nil {
					gasFeeCap = tc.gasFeeCap
				}
				if tc.gasTipCap == nil {
					gasTipCap = oneInt.BigInt()
				} else {
					gasTipCap = tc.gasTipCap
				}
				vmdb.AddBalance(suite.address, initBalance.BigInt())
				balance := vmdb.GetBalance(suite.address)
				suite.Require().Equal(balance, initBalance.BigInt())
			} else {
				if tc.gasPrice != nil {
					gasPrice = tc.gasPrice.BigInt()
				}

				vmdb.AddBalance(suite.address, hundredInt.BigInt())
				balance := vmdb.GetBalance(suite.address)
				suite.Require().Equal(balance, hundredInt.BigInt())
			}
			err := vmdb.Commit()
			suite.Require().NoError(err, "Unexpected error while committing to vmdb: %d", err)

			tx := evmtypes.NewTx(zeroInt.BigInt(), 1, &suite.address, amount, tc.gasLimit, gasPrice, gasFeeCap, gasTipCap, nil, tc.accessList)
			tx.From = tc.from

			txData, _ := evmtypes.UnpackTxData(tx.Data)

			evmParams := suite.app.EvmKeeper.GetParams(suite.ctx)
			ethCfg := evmParams.GetChainConfig().EthereumConfig(nil)
			baseFee := suite.app.EvmKeeper.GetBaseFee(suite.ctx, ethCfg)
			priority := evmtypes.GetTxPriority(txData, baseFee)

			fees, err := keeper.VerifyFee(txData, evmtypes.DefaultEVMDenom, baseFee, false, false, suite.ctx.IsCheckTx())
			if tc.expectPassVerify {
				suite.Require().NoError(err, "valid test %d failed - '%s'", i, tc.name)
				if tc.enableFeemarket {
					baseFee := suite.app.FeeMarketKeeper.GetBaseFee(suite.ctx)
					suite.Require().Equal(
						fees,
						sdk.NewCoins(
							sdk.NewCoin(evmtypes.DefaultEVMDenom, sdkmath.NewIntFromBigInt(txData.EffectiveFee(baseFee))),
						),
						"valid test %d failed, fee value is wrong  - '%s'", i, tc.name,
					)
					suite.Require().Equal(int64(0), priority)
				} else {
					suite.Require().Equal(
						fees,
						sdk.NewCoins(
							sdk.NewCoin(evmtypes.DefaultEVMDenom, tc.gasPrice.Mul(sdkmath.NewIntFromUint64(tc.gasLimit))),
						),
						"valid test %d failed, fee value is wrong  - '%s'", i, tc.name,
					)
				}
			} else {
				suite.Require().Error(err, "invalid test %d passed - '%s'", i, tc.name)
				suite.Require().Nil(fees, "invalid test %d passed. fees value must be nil - '%s'", i, tc.name)
			}

			err = suite.app.EvmKeeper.DeductTxCostsFromUserBalance(suite.ctx, fees, common.HexToAddress(tx.From))
			if tc.expectPassDeduct {
				suite.Require().NoError(err, "valid test %d failed - '%s'", i, tc.name)
			} else {
				suite.Require().Error(err, "invalid test %d passed - '%s'", i, tc.name)
			}
		})
	}
	suite.enableFeemarket = false // reset flag
}
