package backend

import (
	"fmt"
	"math/big"

	"github.com/ethereum/go-ethereum/common/hexutil"
	ethrpc "github.com/ethereum/go-ethereum/rpc"
	rpc "github.com/evmos/ethermint/rpc/types"
	"github.com/evmos/ethermint/tests"
	"google.golang.org/grpc/metadata"

	"github.com/cometbft/cometbft/abci/types"
	tmrpctypes "github.com/cometbft/cometbft/rpc/core/types"
	sdk "github.com/cosmos/cosmos-sdk/types"

	"github.com/evmos/ethermint/rpc/backend/mocks"
	evmtypes "github.com/evmos/ethermint/x/evm/types"
	feemarkettypes "github.com/evmos/ethermint/x/feemarket/types"
)

func (suite *BackendTestSuite) TestBaseFee() {
	baseFee := sdk.NewInt(1)

	testCases := []struct {
		name         string
		blockRes     *tmrpctypes.ResultBlockResults
		registerMock func()
		expBaseFee   *big.Int
		expPass      bool
	}{
		{
			"fail - grpc BaseFee error",
			&tmrpctypes.ResultBlockResults{Height: 1},
			func() {
				queryClient := suite.backend.queryClient.QueryClient.(*mocks.EVMQueryClient)
				RegisterBaseFeeError(queryClient)
			},
			nil,
			false,
		},
		{
			"fail - grpc BaseFee error - with non feemarket block event",
			&tmrpctypes.ResultBlockResults{
				Height: 1,
				BeginBlockEvents: []types.Event{
					{
						Type: evmtypes.EventTypeBlockBloom,
					},
				},
			},
			func() {
				queryClient := suite.backend.queryClient.QueryClient.(*mocks.EVMQueryClient)
				RegisterBaseFeeError(queryClient)
			},
			nil,
			false,
		},
		{
			"fail - grpc BaseFee error - with feemarket block event",
			&tmrpctypes.ResultBlockResults{
				Height: 1,
				BeginBlockEvents: []types.Event{
					{
						Type: feemarkettypes.EventTypeFeeMarket,
					},
				},
			},
			func() {
				queryClient := suite.backend.queryClient.QueryClient.(*mocks.EVMQueryClient)
				RegisterBaseFeeError(queryClient)
			},
			nil,
			false,
		},
		{
			"fail - grpc BaseFee error - with feemarket block event with wrong attribute value",
			&tmrpctypes.ResultBlockResults{
				Height: 1,
				BeginBlockEvents: []types.Event{
					{
						Type: feemarkettypes.EventTypeFeeMarket,
						Attributes: []types.EventAttribute{
							{Value: "/1"},
						},
					},
				},
			},
			func() {
				queryClient := suite.backend.queryClient.QueryClient.(*mocks.EVMQueryClient)
				RegisterBaseFeeError(queryClient)
			},
			nil,
			false,
		},
		{
			"fail - grpc baseFee error - with feemarket block event with baseFee attribute value",
			&tmrpctypes.ResultBlockResults{
				Height: 1,
				BeginBlockEvents: []types.Event{
					{
						Type: feemarkettypes.EventTypeFeeMarket,
						Attributes: []types.EventAttribute{
							{Value: baseFee.String()},
						},
					},
				},
			},
			func() {
				queryClient := suite.backend.queryClient.QueryClient.(*mocks.EVMQueryClient)
				RegisterBaseFeeError(queryClient)
			},
			baseFee.BigInt(),
			true,
		},
		{
			"fail - base fee or london fork not enabled",
			&tmrpctypes.ResultBlockResults{Height: 1},
			func() {
				queryClient := suite.backend.queryClient.QueryClient.(*mocks.EVMQueryClient)
				RegisterBaseFeeDisabled(queryClient)
			},
			nil,
			true,
		},
		{
			"pass",
			&tmrpctypes.ResultBlockResults{Height: 1},
			func() {
				queryClient := suite.backend.queryClient.QueryClient.(*mocks.EVMQueryClient)
				RegisterBaseFee(queryClient, baseFee)
			},
			baseFee.BigInt(),
			true,
		},
	}
	for _, tc := range testCases {
		suite.Run(fmt.Sprintf("Case %s", tc.name), func() {
			suite.SetupTest() // reset test and queries
			tc.registerMock()

			baseFee, err := suite.backend.BaseFee(tc.blockRes)

			if tc.expPass {
				suite.Require().NoError(err)
				suite.Require().Equal(tc.expBaseFee, baseFee)
			} else {
				suite.Require().Error(err)
			}
		})
	}
}

func (suite *BackendTestSuite) TestChainId() {
	expChainId := (*hexutil.Big)(big.NewInt(9000))
	testCases := []struct {
		name         string
		registerMock func()
		expChainId   *hexutil.Big
		expPass      bool
	}{
		{
			"pass - block is at or past the EIP-155 replay-protection fork block, return chainID from config ",
			func() {
				var header metadata.MD
				queryClient := suite.backend.queryClient.QueryClient.(*mocks.EVMQueryClient)
				RegisterParamsInvalidHeight(queryClient, &header, int64(1))
			},
			expChainId,
			true,
		},
	}

	for _, tc := range testCases {
		suite.Run(fmt.Sprintf("case %s", tc.name), func() {
			suite.SetupTest() // reset test and queries
			tc.registerMock()

			chainId, err := suite.backend.ChainID()
			if tc.expPass {
				suite.Require().NoError(err)
				suite.Require().Equal(tc.expChainId, chainId)
			} else {
				suite.Require().Error(err)
			}
		})
	}
}

func (suite *BackendTestSuite) TestGetCoinbase() {
	validatorAcc := sdk.AccAddress(tests.GenerateAddress().Bytes())
	testCases := []struct {
		name         string
		registerMock func()
		accAddr      sdk.AccAddress
		expPass      bool
	}{
		{
			"fail - Can't retrieve status from node",
			func() {
				client := suite.backend.clientCtx.Client.(*mocks.Client)
				RegisterStatusError(client)
			},
			validatorAcc,
			false,
		},
		{
			"fail - Can't query validator account",
			func() {
				client := suite.backend.clientCtx.Client.(*mocks.Client)
				queryClient := suite.backend.queryClient.QueryClient.(*mocks.EVMQueryClient)
				RegisterStatus(client)
				RegisterValidatorAccountError(queryClient)
			},
			validatorAcc,
			false,
		},
		{
			"pass - Gets coinbase account",
			func() {
				client := suite.backend.clientCtx.Client.(*mocks.Client)
				queryClient := suite.backend.queryClient.QueryClient.(*mocks.EVMQueryClient)
				RegisterStatus(client)
				RegisterValidatorAccount(queryClient, validatorAcc)
			},
			validatorAcc,
			true,
		},
	}

	for _, tc := range testCases {
		suite.Run(fmt.Sprintf("case %s", tc.name), func() {
			suite.SetupTest() // reset test and queries
			tc.registerMock()

			accAddr, err := suite.backend.GetCoinbase()

			if tc.expPass {
				suite.Require().Equal(tc.accAddr, accAddr)
			} else {
				suite.Require().Error(err)
			}
		})
	}
}

func (suite *BackendTestSuite) TestSuggestGasTipCap() {
	testCases := []struct {
		name         string
		registerMock func()
		baseFee      *big.Int
		expGasTipCap *big.Int
		expPass      bool
	}{
		{
			"pass - London hardfork not enabled or feemarket not enabled ",
			func() {},
			nil,
			big.NewInt(0),
			true,
		},
		{
			"pass - Gets the suggest gas tip cap ",
			func() {},
			nil,
			big.NewInt(0),
			true,
		},
	}

	for _, tc := range testCases {
		suite.Run(fmt.Sprintf("case %s", tc.name), func() {
			suite.SetupTest() // reset test and queries
			tc.registerMock()

			maxDelta, err := suite.backend.SuggestGasTipCap(tc.baseFee)

			if tc.expPass {
				suite.Require().Equal(tc.expGasTipCap, maxDelta)
			} else {
				suite.Require().Error(err)
			}
		})
	}
}

func (suite *BackendTestSuite) TestGlobalMinGasPrice() {
	testCases := []struct {
		name           string
		registerMock   func()
		expMinGasPrice sdk.Dec
		expPass        bool
	}{
		{
			"fail - Can't get FeeMarket params",
			func() {
				feeMarketCleint := suite.backend.queryClient.FeeMarket.(*mocks.FeeMarketQueryClient)
				RegisterFeeMarketParamsError(feeMarketCleint, int64(1))
			},
			sdk.ZeroDec(),
			false,
		},
	}

	for _, tc := range testCases {
		suite.Run(fmt.Sprintf("case %s", tc.name), func() {
			suite.SetupTest() // reset test and queries
			tc.registerMock()

			globalMinGasPrice, err := suite.backend.GlobalMinGasPrice()

			if tc.expPass {
				suite.Require().Equal(tc.expMinGasPrice, globalMinGasPrice)
			} else {
				suite.Require().Error(err)
			}
		})
	}
}

func (suite *BackendTestSuite) TestFeeHistory() {
	testCases := []struct {
		name           string
		registerMock   func(validator sdk.AccAddress)
		userBlockCount ethrpc.DecimalOrHex
		latestBlock    ethrpc.BlockNumber
		expFeeHistory  *rpc.FeeHistoryResult
		validator      sdk.AccAddress
		expPass        bool
	}{
		{
			"fail - can't get params ",
			func(validator sdk.AccAddress) {
				var header metadata.MD
				queryClient := suite.backend.queryClient.QueryClient.(*mocks.EVMQueryClient)
				suite.backend.cfg.JSONRPC.FeeHistoryCap = 0
				RegisterParamsError(queryClient, &header, ethrpc.BlockNumber(1).Int64())
			},
			1,
			-1,
			nil,
			nil,
			false,
		},
		{
			"fail - user block count higher than max block count ",
			func(validator sdk.AccAddress) {
				var header metadata.MD
				queryClient := suite.backend.queryClient.QueryClient.(*mocks.EVMQueryClient)
				suite.backend.cfg.JSONRPC.FeeHistoryCap = 0
				RegisterParams(queryClient, &header, ethrpc.BlockNumber(1).Int64())
			},
			1,
			-1,
			nil,
			nil,
			false,
		},
		{
			"fail - Tendermint block fetching error ",
			func(validator sdk.AccAddress) {
				client := suite.backend.clientCtx.Client.(*mocks.Client)
				suite.backend.cfg.JSONRPC.FeeHistoryCap = 2
				var header metadata.MD
				queryClient := suite.backend.queryClient.QueryClient.(*mocks.EVMQueryClient)
				RegisterParams(queryClient, &header, 1)
				RegisterBlockError(client, ethrpc.BlockNumber(1).Int64())
			},
			1,
			1,
			nil,
			nil,
			false,
		},
		{
			"fail - Eth block fetching error",
			func(validator sdk.AccAddress) {
				client := suite.backend.clientCtx.Client.(*mocks.Client)
				suite.backend.cfg.JSONRPC.FeeHistoryCap = 2
				var header metadata.MD
				queryClient := suite.backend.queryClient.QueryClient.(*mocks.EVMQueryClient)
				RegisterParams(queryClient, &header, 1)
				RegisterBlock(client, ethrpc.BlockNumber(1).Int64(), nil)
				RegisterBlockResultsError(client, 1)
			},
			1,
			1,
			nil,
			nil,
			true,
		},
		{
			"fail - Invalid base fee",
			func(validator sdk.AccAddress) {
				// baseFee := sdk.NewInt(1)
				queryClient := suite.backend.queryClient.QueryClient.(*mocks.EVMQueryClient)
				client := suite.backend.clientCtx.Client.(*mocks.Client)
				suite.backend.cfg.JSONRPC.FeeHistoryCap = 2
				var header metadata.MD
				RegisterParams(queryClient, &header, 1)
				RegisterBlock(client, ethrpc.BlockNumber(1).Int64(), nil)
				RegisterBlockResults(client, 1)
				RegisterBaseFeeError(queryClient)
				RegisterValidatorAccount(queryClient, validator)
				RegisterConsensusParams(client, 1)
			},
			1,
			1,
			nil,
			sdk.AccAddress(tests.GenerateAddress().Bytes()),
			false,
		},
		{
			"pass - Valid FeeHistoryResults object",
			func(validator sdk.AccAddress) {
				var header metadata.MD
				baseFee := sdk.NewInt(1)
				queryClient := suite.backend.queryClient.QueryClient.(*mocks.EVMQueryClient)
				fQueryClient := suite.backend.queryClient.FeeMarket.(*mocks.FeeMarketQueryClient)
				client := suite.backend.clientCtx.Client.(*mocks.Client)
				suite.backend.cfg.JSONRPC.FeeHistoryCap = 2
				RegisterBlock(client, ethrpc.BlockNumber(1).Int64(), nil)
				RegisterBlockResults(client, 1)
				RegisterBaseFee(queryClient, baseFee)
				RegisterValidatorAccount(queryClient, validator)
				RegisterConsensusParams(client, 1)
				RegisterParams(queryClient, &header, 1)
				RegisterParamsWithoutHeader(queryClient, 1)
				RegisterFeeMarketParams(fQueryClient, 1)
			},
			1,
			1,
			&rpc.FeeHistoryResult{
				OldestBlock:  (*hexutil.Big)(big.NewInt(1)),
				BaseFee:      []*hexutil.Big{(*hexutil.Big)(big.NewInt(1)), (*hexutil.Big)(big.NewInt(1))},
				GasUsedRatio: []float64{0},
				Reward:       [][]*hexutil.Big{{(*hexutil.Big)(big.NewInt(0)), (*hexutil.Big)(big.NewInt(0)), (*hexutil.Big)(big.NewInt(0)), (*hexutil.Big)(big.NewInt(0))}},
			},
			sdk.AccAddress(tests.GenerateAddress().Bytes()),
			true,
		},
	}

	for _, tc := range testCases {
		suite.Run(fmt.Sprintf("case %s", tc.name), func() {
			suite.SetupTest() // reset test and queries
			tc.registerMock(tc.validator)

			feeHistory, err := suite.backend.FeeHistory(tc.userBlockCount, tc.latestBlock, []float64{25, 50, 75, 100})
			if tc.expPass {
				suite.Require().NoError(err)
				suite.Require().Equal(feeHistory, tc.expFeeHistory)
			} else {
				suite.Require().Error(err)
			}
		})
	}
}
