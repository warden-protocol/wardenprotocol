package ante_test

import (
	"math/big"

	sdkmath "cosmossdk.io/math"
	sdk "github.com/cosmos/cosmos-sdk/types"
	banktypes "github.com/cosmos/cosmos-sdk/x/bank/types"
	ethtypes "github.com/ethereum/go-ethereum/core/types"
	"github.com/evmos/ethermint/app/ante"
	"github.com/evmos/ethermint/tests"
	evmtypes "github.com/evmos/ethermint/x/evm/types"
)

var execTypes = []struct {
	name      string
	isCheckTx bool
	simulate  bool
}{
	{"deliverTx", false, false},
	{"deliverTxSimulate", false, true},
}

func (s AnteTestSuite) TestMinGasPriceDecorator() {
	denom := evmtypes.DefaultEVMDenom
	testMsg := banktypes.MsgSend{
		FromAddress: "evmos1x8fhpj9nmhqk8z9kpgjt95ck2xwyue0ptzkucp",
		ToAddress:   "evmos1dx67l23hz9l0k9hcher8xz04uj7wf3yu26l2yn",
		Amount:      sdk.Coins{sdk.Coin{Amount: sdkmath.NewInt(10), Denom: denom}},
	}

	testCases := []struct {
		name                string
		malleate            func() sdk.Tx
		expPass             bool
		errMsg              string
		allowPassOnSimulate bool
	}{
		{
			"invalid cosmos tx type",
			func() sdk.Tx {
				return &invalidTx{}
			},
			false,
			"invalid transaction type",
			false,
		},
		{
			"valid cosmos tx with MinGasPrices = 0, gasPrice = 0",
			func() sdk.Tx {
				params := s.app.FeeMarketKeeper.GetParams(s.ctx)
				params.MinGasPrice = sdk.ZeroDec()
				s.app.FeeMarketKeeper.SetParams(s.ctx, params)

				txBuilder := s.CreateTestCosmosTxBuilder(sdkmath.NewInt(0), denom, &testMsg)
				return txBuilder.GetTx()
			},
			true,
			"",
			false,
		},
		{
			"valid cosmos tx with MinGasPrices = 0, gasPrice > 0",
			func() sdk.Tx {
				params := s.app.FeeMarketKeeper.GetParams(s.ctx)
				params.MinGasPrice = sdk.ZeroDec()
				s.app.FeeMarketKeeper.SetParams(s.ctx, params)

				txBuilder := s.CreateTestCosmosTxBuilder(sdkmath.NewInt(10), denom, &testMsg)
				return txBuilder.GetTx()
			},
			true,
			"",
			false,
		},
		{
			"valid cosmos tx with MinGasPrices = 10, gasPrice = 10",
			func() sdk.Tx {
				params := s.app.FeeMarketKeeper.GetParams(s.ctx)
				params.MinGasPrice = sdk.NewDec(10)
				s.app.FeeMarketKeeper.SetParams(s.ctx, params)

				txBuilder := s.CreateTestCosmosTxBuilder(sdkmath.NewInt(10), denom, &testMsg)
				return txBuilder.GetTx()
			},
			true,
			"",
			false,
		},
		{
			"invalid cosmos tx with MinGasPrices = 10, gasPrice = 0",
			func() sdk.Tx {
				params := s.app.FeeMarketKeeper.GetParams(s.ctx)
				params.MinGasPrice = sdk.NewDec(10)
				s.app.FeeMarketKeeper.SetParams(s.ctx, params)

				txBuilder := s.CreateTestCosmosTxBuilder(sdkmath.NewInt(0), denom, &testMsg)
				return txBuilder.GetTx()
			},
			false,
			"provided fee < minimum global fee",
			true,
		},
		{
			"invalid cosmos tx with wrong denom",
			func() sdk.Tx {
				params := s.app.FeeMarketKeeper.GetParams(s.ctx)
				params.MinGasPrice = sdk.NewDec(10)
				s.app.FeeMarketKeeper.SetParams(s.ctx, params)

				txBuilder := s.CreateTestCosmosTxBuilder(sdkmath.NewInt(10), "stake", &testMsg)
				return txBuilder.GetTx()
			},
			false,
			"provided fee < minimum global fee",
			true,
		},
	}

	for _, et := range execTypes {
		for _, tc := range testCases {
			s.Run(et.name+"_"+tc.name, func() {
				// s.SetupTest(et.isCheckTx)
				ctx := s.ctx.WithIsReCheckTx(et.isCheckTx)
				dec := ante.NewMinGasPriceDecorator(s.app.FeeMarketKeeper, s.app.EvmKeeper)
				_, err := dec.AnteHandle(ctx, tc.malleate(), et.simulate, NextFn)

				if tc.expPass || (et.simulate && tc.allowPassOnSimulate) {
					s.Require().NoError(err, tc.name)
				} else {
					s.Require().Error(err, tc.name)
					s.Require().Contains(err.Error(), tc.errMsg, tc.name)
				}
			})
		}
	}
}

func (s AnteTestSuite) TestEthMinGasPriceDecorator() {
	denom := evmtypes.DefaultEVMDenom
	from, privKey := tests.NewAddrKey()
	to := tests.GenerateAddress()
	emptyAccessList := ethtypes.AccessList{}

	testCases := []struct {
		name     string
		malleate func() sdk.Tx
		expPass  bool
		errMsg   string
	}{
		{
			"invalid tx type",
			func() sdk.Tx {
				params := s.app.FeeMarketKeeper.GetParams(s.ctx)
				params.MinGasPrice = sdk.NewDec(10)
				s.app.FeeMarketKeeper.SetParams(s.ctx, params)
				return &invalidTx{}
			},
			false,
			"invalid message type",
		},
		{
			"wrong tx type",
			func() sdk.Tx {
				params := s.app.FeeMarketKeeper.GetParams(s.ctx)
				params.MinGasPrice = sdk.NewDec(10)
				s.app.FeeMarketKeeper.SetParams(s.ctx, params)
				testMsg := banktypes.MsgSend{
					FromAddress: "evmos1x8fhpj9nmhqk8z9kpgjt95ck2xwyue0ptzkucp",
					ToAddress:   "evmos1dx67l23hz9l0k9hcher8xz04uj7wf3yu26l2yn",
					Amount:      sdk.Coins{sdk.Coin{Amount: sdkmath.NewInt(10), Denom: denom}},
				}
				txBuilder := s.CreateTestCosmosTxBuilder(sdkmath.NewInt(0), denom, &testMsg)
				return txBuilder.GetTx()
			},
			false,
			"invalid message type",
		},
		{
			"valid: invalid tx type with MinGasPrices = 0",
			func() sdk.Tx {
				params := s.app.FeeMarketKeeper.GetParams(s.ctx)
				params.MinGasPrice = sdk.ZeroDec()
				s.app.FeeMarketKeeper.SetParams(s.ctx, params)
				return &invalidTx{}
			},
			true,
			"",
		},
		{
			"valid legacy tx with MinGasPrices = 0, gasPrice = 0",
			func() sdk.Tx {
				params := s.app.FeeMarketKeeper.GetParams(s.ctx)
				params.MinGasPrice = sdk.ZeroDec()
				s.app.FeeMarketKeeper.SetParams(s.ctx, params)

				msg := s.BuildTestEthTx(from, to, nil, make([]byte, 0), big.NewInt(0), nil, nil, nil)
				return s.CreateTestTx(msg, privKey, 1, false)
			},
			true,
			"",
		},
		{
			"valid legacy tx with MinGasPrices = 0, gasPrice > 0",
			func() sdk.Tx {
				params := s.app.FeeMarketKeeper.GetParams(s.ctx)
				params.MinGasPrice = sdk.ZeroDec()
				s.app.FeeMarketKeeper.SetParams(s.ctx, params)

				msg := s.BuildTestEthTx(from, to, nil, make([]byte, 0), big.NewInt(10), nil, nil, nil)
				return s.CreateTestTx(msg, privKey, 1, false)
			},
			true,
			"",
		},
		{
			"valid legacy tx with MinGasPrices = 10, gasPrice = 10",
			func() sdk.Tx {
				params := s.app.FeeMarketKeeper.GetParams(s.ctx)
				params.MinGasPrice = sdk.NewDec(10)
				s.app.FeeMarketKeeper.SetParams(s.ctx, params)

				msg := s.BuildTestEthTx(from, to, nil, make([]byte, 0), big.NewInt(10), nil, nil, nil)
				return s.CreateTestTx(msg, privKey, 1, false)
			},
			true,
			"",
		},
		{
			"invalid legacy tx with MinGasPrices = 10, gasPrice = 0",
			func() sdk.Tx {
				params := s.app.FeeMarketKeeper.GetParams(s.ctx)
				params.MinGasPrice = sdk.NewDec(10)
				s.app.FeeMarketKeeper.SetParams(s.ctx, params)

				msg := s.BuildTestEthTx(from, to, nil, make([]byte, 0), big.NewInt(0), nil, nil, nil)
				return s.CreateTestTx(msg, privKey, 1, false)
			},
			false,
			"provided fee < minimum global fee",
		},
		{
			"valid dynamic tx with MinGasPrices = 0, EffectivePrice = 0",
			func() sdk.Tx {
				params := s.app.FeeMarketKeeper.GetParams(s.ctx)
				params.MinGasPrice = sdk.ZeroDec()
				s.app.FeeMarketKeeper.SetParams(s.ctx, params)

				msg := s.BuildTestEthTx(from, to, nil, make([]byte, 0), nil, big.NewInt(0), big.NewInt(0), &emptyAccessList)
				return s.CreateTestTx(msg, privKey, 1, false)
			},
			true,
			"",
		},
		{
			"valid dynamic tx with MinGasPrices = 0, EffectivePrice > 0",
			func() sdk.Tx {
				params := s.app.FeeMarketKeeper.GetParams(s.ctx)
				params.MinGasPrice = sdk.ZeroDec()
				s.app.FeeMarketKeeper.SetParams(s.ctx, params)

				msg := s.BuildTestEthTx(from, to, nil, make([]byte, 0), nil, big.NewInt(100), big.NewInt(50), &emptyAccessList)
				return s.CreateTestTx(msg, privKey, 1, false)
			},
			true,
			"",
		},
		{
			"valid dynamic tx with MinGasPrices < EffectivePrice",
			func() sdk.Tx {
				params := s.app.FeeMarketKeeper.GetParams(s.ctx)
				params.MinGasPrice = sdk.NewDec(10)
				s.app.FeeMarketKeeper.SetParams(s.ctx, params)

				msg := s.BuildTestEthTx(from, to, nil, make([]byte, 0), nil, big.NewInt(100), big.NewInt(100), &emptyAccessList)
				return s.CreateTestTx(msg, privKey, 1, false)
			},
			true,
			"",
		},
		{
			"invalid dynamic tx with MinGasPrices > EffectivePrice",
			func() sdk.Tx {
				params := s.app.FeeMarketKeeper.GetParams(s.ctx)
				params.MinGasPrice = sdk.NewDec(10)
				s.app.FeeMarketKeeper.SetParams(s.ctx, params)

				msg := s.BuildTestEthTx(from, to, nil, make([]byte, 0), nil, big.NewInt(0), big.NewInt(0), &emptyAccessList)
				return s.CreateTestTx(msg, privKey, 1, false)
			},
			false,
			"provided fee < minimum global fee",
		},
		{
			"invalid dynamic tx with MinGasPrices > BaseFee, MinGasPrices > EffectivePrice",
			func() sdk.Tx {
				params := s.app.FeeMarketKeeper.GetParams(s.ctx)
				params.MinGasPrice = sdk.NewDec(100)
				s.app.FeeMarketKeeper.SetParams(s.ctx, params)

				feemarketParams := s.app.FeeMarketKeeper.GetParams(s.ctx)
				feemarketParams.BaseFee = sdkmath.NewInt(10)
				s.app.FeeMarketKeeper.SetParams(s.ctx, feemarketParams)

				msg := s.BuildTestEthTx(from, to, nil, make([]byte, 0), nil, big.NewInt(1000), big.NewInt(0), &emptyAccessList)
				return s.CreateTestTx(msg, privKey, 1, false)
			},
			false,
			"provided fee < minimum global fee",
		},
		{
			"valid dynamic tx with MinGasPrices > BaseFee, MinGasPrices < EffectivePrice (big GasTipCap)",
			func() sdk.Tx {
				params := s.app.FeeMarketKeeper.GetParams(s.ctx)
				params.MinGasPrice = sdk.NewDec(100)
				s.app.FeeMarketKeeper.SetParams(s.ctx, params)

				feemarketParams := s.app.FeeMarketKeeper.GetParams(s.ctx)
				feemarketParams.BaseFee = sdkmath.NewInt(10)
				s.app.FeeMarketKeeper.SetParams(s.ctx, feemarketParams)

				msg := s.BuildTestEthTx(from, to, nil, make([]byte, 0), nil, big.NewInt(1000), big.NewInt(101), &emptyAccessList)
				return s.CreateTestTx(msg, privKey, 1, false)
			},
			true,
			"",
		},
	}

	for _, et := range execTypes {
		for _, tc := range testCases {
			s.Run(et.name+"_"+tc.name, func() {
				// s.SetupTest(et.isCheckTx)
				s.SetupTest()
				dec := ante.NewEthMinGasPriceDecorator(s.app.FeeMarketKeeper, s.app.EvmKeeper)
				_, err := dec.AnteHandle(s.ctx, tc.malleate(), et.simulate, NextFn)

				if tc.expPass {
					s.Require().NoError(err, tc.name)
				} else {
					s.Require().Error(err, tc.name)
					s.Require().Contains(err.Error(), tc.errMsg, tc.name)
				}
			})
		}
	}
}

func (suite AnteTestSuite) TestEthMempoolFeeDecorator() {
	// TODO: add test
}
