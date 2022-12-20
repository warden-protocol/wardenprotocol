package backend

import (
	"fmt"
	"math/big"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/common/hexutil"
	ethtypes "github.com/ethereum/go-ethereum/core/types"
	"github.com/tendermint/tendermint/abci/types"
	tmrpctypes "github.com/tendermint/tendermint/rpc/core/types"
	tmtypes "github.com/tendermint/tendermint/types"
	"google.golang.org/grpc/metadata"

	"github.com/evmos/ethermint/rpc/backend/mocks"
	ethrpc "github.com/evmos/ethermint/rpc/types"
	"github.com/evmos/ethermint/tests"
	evmtypes "github.com/evmos/ethermint/x/evm/types"
	feemarkettypes "github.com/evmos/ethermint/x/feemarket/types"
)

func (suite *BackendTestSuite) TestBlockNumber() {
	testCases := []struct {
		name           string
		registerMock   func()
		expBlockNumber hexutil.Uint64
		expPass        bool
	}{
		{
			"fail - invalid block header height",
			func() {
				height := int64(1)
				var header metadata.MD
				queryClient := suite.backend.queryClient.QueryClient.(*mocks.QueryClient)
				RegisterParamsInvalidHeight(queryClient, &header, int64(height))
			},
			0x0,
			false,
		},
		{
			"fail - invalid block header",
			func() {
				height := int64(1)
				var header metadata.MD
				queryClient := suite.backend.queryClient.QueryClient.(*mocks.QueryClient)
				RegisterParamsInvalidHeader(queryClient, &header, int64(height))
			},
			0x0,
			false,
		},
		{
			"pass - app state header height 1",
			func() {
				height := int64(1)
				var header metadata.MD
				queryClient := suite.backend.queryClient.QueryClient.(*mocks.QueryClient)
				RegisterParams(queryClient, &header, int64(height))
			},
			0x1,
			true,
		},
	}
	for _, tc := range testCases {
		suite.Run(fmt.Sprintf("Case %s", tc.name), func() {
			suite.SetupTest() // reset test and queries
			tc.registerMock()

			blockNumber, err := suite.backend.BlockNumber()

			if tc.expPass {
				suite.Require().NoError(err)
				suite.Require().Equal(tc.expBlockNumber, blockNumber)
			} else {
				suite.Require().Error(err)
			}
		})
	}
}

func (suite *BackendTestSuite) TestGetBlockByNumber() {
	var (
		blockRes *tmrpctypes.ResultBlockResults
		resBlock *tmrpctypes.ResultBlock
	)
	msgEthereumTx, bz := suite.buildEthereumTx()

	testCases := []struct {
		name         string
		blockNumber  ethrpc.BlockNumber
		fullTx       bool
		baseFee      *big.Int
		validator    sdk.AccAddress
		tx           *evmtypes.MsgEthereumTx
		txBz         []byte
		registerMock func(ethrpc.BlockNumber, sdk.Int, sdk.AccAddress, []byte)
		expNoop      bool
		expPass      bool
	}{
		{
			"pass - tendermint block not found",
			ethrpc.BlockNumber(1),
			true,
			sdk.NewInt(1).BigInt(),
			sdk.AccAddress(tests.GenerateAddress().Bytes()),
			nil,
			nil,
			func(blockNum ethrpc.BlockNumber, _ sdk.Int, _ sdk.AccAddress, _ []byte) {
				height := blockNum.Int64()
				client := suite.backend.clientCtx.Client.(*mocks.Client)
				RegisterBlockError(client, height)
			},
			true,
			true,
		},
		{
			"pass - block not found (e.g. request block height that is greater than current one)",
			ethrpc.BlockNumber(1),
			true,
			sdk.NewInt(1).BigInt(),
			sdk.AccAddress(tests.GenerateAddress().Bytes()),
			nil,
			nil,
			func(blockNum ethrpc.BlockNumber, baseFee sdk.Int, validator sdk.AccAddress, txBz []byte) {
				height := blockNum.Int64()
				client := suite.backend.clientCtx.Client.(*mocks.Client)
				resBlock, _ = RegisterBlockNotFound(client, height)
			},
			true,
			true,
		},
		{
			"pass - block results error",
			ethrpc.BlockNumber(1),
			true,
			sdk.NewInt(1).BigInt(),
			sdk.AccAddress(tests.GenerateAddress().Bytes()),
			nil,
			nil,
			func(blockNum ethrpc.BlockNumber, baseFee sdk.Int, validator sdk.AccAddress, txBz []byte) {
				height := blockNum.Int64()
				client := suite.backend.clientCtx.Client.(*mocks.Client)
				resBlock, _ = RegisterBlock(client, height, txBz)
				RegisterBlockResultsError(client, blockNum.Int64())
			},
			true,
			true,
		},
		{
			"pass - without tx",
			ethrpc.BlockNumber(1),
			true,
			sdk.NewInt(1).BigInt(),
			sdk.AccAddress(tests.GenerateAddress().Bytes()),
			nil,
			nil,
			func(blockNum ethrpc.BlockNumber, baseFee sdk.Int, validator sdk.AccAddress, txBz []byte) {
				height := blockNum.Int64()
				client := suite.backend.clientCtx.Client.(*mocks.Client)
				resBlock, _ = RegisterBlock(client, height, txBz)
				blockRes, _ = RegisterBlockResults(client, blockNum.Int64())
				RegisterConsensusParams(client, height)

				queryClient := suite.backend.queryClient.QueryClient.(*mocks.QueryClient)
				RegisterBaseFee(queryClient, baseFee)
				RegisterValidatorAccount(queryClient, validator)
			},
			false,
			true,
		},
		{
			"pass - with tx",
			ethrpc.BlockNumber(1),
			true,
			sdk.NewInt(1).BigInt(),
			sdk.AccAddress(tests.GenerateAddress().Bytes()),
			msgEthereumTx,
			bz,
			func(blockNum ethrpc.BlockNumber, baseFee sdk.Int, validator sdk.AccAddress, txBz []byte) {
				height := blockNum.Int64()
				client := suite.backend.clientCtx.Client.(*mocks.Client)
				resBlock, _ = RegisterBlock(client, height, txBz)
				blockRes, _ = RegisterBlockResults(client, blockNum.Int64())
				RegisterConsensusParams(client, height)

				queryClient := suite.backend.queryClient.QueryClient.(*mocks.QueryClient)
				RegisterBaseFee(queryClient, baseFee)
				RegisterValidatorAccount(queryClient, validator)
			},
			false,
			true,
		},
	}
	for _, tc := range testCases {
		suite.Run(fmt.Sprintf("Case %s", tc.name), func() {
			suite.SetupTest() // reset test and queries
			tc.registerMock(tc.blockNumber, sdk.NewIntFromBigInt(tc.baseFee), tc.validator, tc.txBz)

			block, err := suite.backend.GetBlockByNumber(tc.blockNumber, tc.fullTx)

			if tc.expPass {
				if tc.expNoop {
					suite.Require().Nil(block)
				} else {
					expBlock := suite.buildFormattedBlock(
						blockRes,
						resBlock,
						tc.fullTx,
						tc.tx,
						tc.validator,
						tc.baseFee,
					)
					suite.Require().Equal(expBlock, block)
				}
				suite.Require().NoError(err)

			} else {
				suite.Require().Error(err)
			}
		})
	}
}

func (suite *BackendTestSuite) TestGetBlockByHash() {
	var (
		blockRes *tmrpctypes.ResultBlockResults
		resBlock *tmrpctypes.ResultBlock
	)
	msgEthereumTx, bz := suite.buildEthereumTx()

	block := tmtypes.MakeBlock(1, []tmtypes.Tx{bz}, nil, nil)

	testCases := []struct {
		name         string
		hash         common.Hash
		fullTx       bool
		baseFee      *big.Int
		validator    sdk.AccAddress
		tx           *evmtypes.MsgEthereumTx
		txBz         []byte
		registerMock func(common.Hash, sdk.Int, sdk.AccAddress, []byte)
		expNoop      bool
		expPass      bool
	}{
		{
			"pass - without tx",
			common.BytesToHash(block.Hash()),
			true,
			sdk.NewInt(1).BigInt(),
			sdk.AccAddress(tests.GenerateAddress().Bytes()),
			nil,
			nil,
			func(hash common.Hash, baseFee sdk.Int, validator sdk.AccAddress, txBz []byte) {
				height := int64(1)
				client := suite.backend.clientCtx.Client.(*mocks.Client)
				resBlock, _ = RegisterBlockByHash(client, hash, txBz)

				blockRes, _ = RegisterBlockResults(client, height)
				RegisterConsensusParams(client, height)

				queryClient := suite.backend.queryClient.QueryClient.(*mocks.QueryClient)
				RegisterBaseFee(queryClient, baseFee)
				RegisterValidatorAccount(queryClient, validator)
			},
			false,
			true,
		},
		{
			"pass - with tx",
			common.BytesToHash(block.Hash()),
			true,
			sdk.NewInt(1).BigInt(),
			sdk.AccAddress(tests.GenerateAddress().Bytes()),
			msgEthereumTx,
			bz,
			func(hash common.Hash, baseFee sdk.Int, validator sdk.AccAddress, txBz []byte) {
				height := int64(1)
				client := suite.backend.clientCtx.Client.(*mocks.Client)
				resBlock, _ = RegisterBlockByHash(client, hash, txBz)

				blockRes, _ = RegisterBlockResults(client, height)
				RegisterConsensusParams(client, height)

				queryClient := suite.backend.queryClient.QueryClient.(*mocks.QueryClient)
				RegisterBaseFee(queryClient, baseFee)
				RegisterValidatorAccount(queryClient, validator)
			},
			false,
			true,
		},
	}
	for _, tc := range testCases {
		suite.Run(fmt.Sprintf("Case %s", tc.name), func() {
			suite.SetupTest() // reset test and queries
			tc.registerMock(tc.hash, sdk.NewIntFromBigInt(tc.baseFee), tc.validator, tc.txBz)

			block, err := suite.backend.GetBlockByHash(tc.hash, tc.fullTx)

			if tc.expPass {
				if tc.expNoop {
					suite.Require().Nil(block)
				} else {
					expBlock := suite.buildFormattedBlock(
						blockRes,
						resBlock,
						tc.fullTx,
						tc.tx,
						tc.validator,
						tc.baseFee,
					)
					suite.Require().Equal(expBlock, block)
				}
				suite.Require().NoError(err)

			} else {
				suite.Require().Error(err)
			}
		})
	}
}

func (suite *BackendTestSuite) TestGetTendermintBlockByNumber() {
	var expResultBlock *tmrpctypes.ResultBlock

	testCases := []struct {
		name         string
		blockNumber  ethrpc.BlockNumber
		registerMock func(ethrpc.BlockNumber)
		found        bool
		expPass      bool
	}{
		{
			"fail - client error",
			ethrpc.BlockNumber(1),
			func(blockNum ethrpc.BlockNumber) {
				height := blockNum.Int64()
				client := suite.backend.clientCtx.Client.(*mocks.Client)
				RegisterBlockError(client, height)
			},
			false,
			false,
		},
		{
			"noop - block not found",
			ethrpc.BlockNumber(1),
			func(blockNum ethrpc.BlockNumber) {
				height := blockNum.Int64()
				client := suite.backend.clientCtx.Client.(*mocks.Client)
				RegisterBlockNotFound(client, height)
			},
			false,
			true,
		},
		{
			"fail - blockNum < 0 with app state height error",
			ethrpc.BlockNumber(-1),
			func(_ ethrpc.BlockNumber) {
				appHeight := int64(1)
				var header metadata.MD
				queryClient := suite.backend.queryClient.QueryClient.(*mocks.QueryClient)
				RegisterParamsError(queryClient, &header, appHeight)
			},
			false,
			false,
		},
		{
			"pass - blockNum < 0 with app state height >= 1",
			ethrpc.BlockNumber(-1),
			func(blockNum ethrpc.BlockNumber) {
				appHeight := int64(1)
				var header metadata.MD
				queryClient := suite.backend.queryClient.QueryClient.(*mocks.QueryClient)
				RegisterParams(queryClient, &header, appHeight)

				tmHeight := appHeight
				client := suite.backend.clientCtx.Client.(*mocks.Client)
				expResultBlock, _ = RegisterBlock(client, tmHeight, nil)
			},
			true,
			true,
		},
		{
			"pass - blockNum = 0 (defaults to blockNum = 1 due to a difference between tendermint heights and geth heights",
			ethrpc.BlockNumber(0),
			func(blockNum ethrpc.BlockNumber) {
				height := blockNum.Int64()
				client := suite.backend.clientCtx.Client.(*mocks.Client)
				expResultBlock, _ = RegisterBlock(client, height, nil)
			},
			true,
			true,
		},
		{
			"pass - blockNum = 1",
			ethrpc.BlockNumber(1),
			func(blockNum ethrpc.BlockNumber) {
				height := blockNum.Int64()
				client := suite.backend.clientCtx.Client.(*mocks.Client)
				expResultBlock, _ = RegisterBlock(client, height, nil)
			},
			true,
			true,
		},
	}
	for _, tc := range testCases {
		suite.Run(fmt.Sprintf("Case %s", tc.name), func() {
			suite.SetupTest() // reset test and queries

			tc.registerMock(tc.blockNumber)
			resultBlock, err := suite.backend.GetTendermintBlockByNumber(tc.blockNumber)

			if tc.expPass {
				suite.Require().NoError(err)

				if !tc.found {
					suite.Require().Nil(resultBlock)
				} else {
					suite.Require().Equal(expResultBlock, resultBlock)
					suite.Require().Equal(expResultBlock.Block.Header.Height, resultBlock.Block.Header.Height)
				}
			} else {
				suite.Require().Error(err)
			}
		})
	}
}

func (suite *BackendTestSuite) TestGetTendermintBlockResultByNumber() {
	var expBlockRes *tmrpctypes.ResultBlockResults

	testCases := []struct {
		name         string
		blockNumber  int64
		registerMock func(int64)
		expPass      bool
	}{
		{
			"fail",
			1,
			func(blockNum int64) {
				client := suite.backend.clientCtx.Client.(*mocks.Client)
				RegisterBlockResultsError(client, blockNum)
			},
			false,
		},
		{
			"pass",
			1,
			func(blockNum int64) {
				client := suite.backend.clientCtx.Client.(*mocks.Client)
				RegisterBlockResults(client, blockNum)

				expBlockRes = &tmrpctypes.ResultBlockResults{
					Height:     blockNum,
					TxsResults: []*types.ResponseDeliverTx{{Code: 0, GasUsed: 0}},
				}
			},
			true,
		},
	}
	for _, tc := range testCases {
		suite.Run(fmt.Sprintf("Case %s", tc.name), func() {
			suite.SetupTest() // reset test and queries
			tc.registerMock(tc.blockNumber)

			blockRes, err := suite.backend.GetTendermintBlockResultByNumber(&tc.blockNumber)

			if tc.expPass {
				suite.Require().NoError(err)
				suite.Require().Equal(expBlockRes, blockRes)
			} else {
				suite.Require().Error(err)
			}
		})
	}
}

func (suite *BackendTestSuite) TestBlockBloom() {
	testCases := []struct {
		name          string
		blockRes      *tmrpctypes.ResultBlockResults
		expBlockBloom ethtypes.Bloom
		expPass       bool
	}{
		{
			"fail - empty block result",
			&tmrpctypes.ResultBlockResults{},
			ethtypes.Bloom{},
			false,
		},
		{
			"fail - non block bloom event type",
			&tmrpctypes.ResultBlockResults{
				EndBlockEvents: []types.Event{{Type: evmtypes.EventTypeEthereumTx}},
			},
			ethtypes.Bloom{},
			false,
		},
		{
			"fail - nonblock bloom attribute key",
			&tmrpctypes.ResultBlockResults{
				EndBlockEvents: []types.Event{
					{
						Type: evmtypes.EventTypeBlockBloom,
						Attributes: []types.EventAttribute{
							{Key: []byte(evmtypes.AttributeKeyEthereumTxHash)},
						},
					},
				},
			},
			ethtypes.Bloom{},
			false,
		},
		{
			"pass - nonblock bloom attribute key",
			&tmrpctypes.ResultBlockResults{
				EndBlockEvents: []types.Event{
					{
						Type: evmtypes.EventTypeBlockBloom,
						Attributes: []types.EventAttribute{
							{Key: []byte(bAttributeKeyEthereumBloom)},
						},
					},
				},
			},
			ethtypes.Bloom{},
			true,
		},
	}
	for _, tc := range testCases {
		suite.Run(fmt.Sprintf("Case %s", tc.name), func() {
			blockBloom, err := suite.backend.BlockBloom(tc.blockRes)

			if tc.expPass {
				suite.Require().NoError(err)
				suite.Require().Equal(tc.expBlockBloom, blockBloom)
			} else {
				suite.Require().Error(err)
			}
		})
	}
}

func (suite *BackendTestSuite) TestEthBlockFromTendermint() {
	msgEthereumTx, bz := suite.buildEthereumTx()
	emptyBlock := tmtypes.MakeBlock(1, []tmtypes.Tx{}, nil, nil)

	testCases := []struct {
		name         string
		baseFee      *big.Int
		validator    sdk.AccAddress
		height       int64
		resBlock     *tmrpctypes.ResultBlock
		blockRes     *tmrpctypes.ResultBlockResults
		fullTx       bool
		registerMock func(sdk.Int, sdk.AccAddress, int64)
		expTxs       bool
		expPass      bool
	}{
		{
			"pass - block without tx",
			sdk.NewInt(1).BigInt(),
			sdk.AccAddress(common.Address{}.Bytes()),
			int64(1),
			&tmrpctypes.ResultBlock{Block: emptyBlock},
			&tmrpctypes.ResultBlockResults{
				Height:     1,
				TxsResults: []*types.ResponseDeliverTx{{Code: 0, GasUsed: 0}},
			},
			false,
			func(baseFee sdk.Int, validator sdk.AccAddress, height int64) {
				queryClient := suite.backend.queryClient.QueryClient.(*mocks.QueryClient)
				RegisterBaseFee(queryClient, baseFee)
				RegisterValidatorAccount(queryClient, validator)

				client := suite.backend.clientCtx.Client.(*mocks.Client)
				RegisterConsensusParams(client, height)
			},
			false,
			true,
		},
		{
			"pass - block with tx - with BaseFee error",
			nil,
			sdk.AccAddress(tests.GenerateAddress().Bytes()),
			int64(1),
			&tmrpctypes.ResultBlock{
				Block: tmtypes.MakeBlock(1, []tmtypes.Tx{bz}, nil, nil),
			},
			&tmrpctypes.ResultBlockResults{
				Height:     1,
				TxsResults: []*types.ResponseDeliverTx{{Code: 0, GasUsed: 0}},
			},
			true,
			func(baseFee sdk.Int, validator sdk.AccAddress, height int64) {
				queryClient := suite.backend.queryClient.QueryClient.(*mocks.QueryClient)
				RegisterBaseFeeError(queryClient)
				RegisterValidatorAccount(queryClient, validator)

				client := suite.backend.clientCtx.Client.(*mocks.Client)
				RegisterConsensusParams(client, height)
			},
			true,
			true,
		},
		{
			"pass - block with tx - with ValidatorAccount error",
			sdk.NewInt(1).BigInt(),
			sdk.AccAddress(common.Address{}.Bytes()),
			int64(1),
			&tmrpctypes.ResultBlock{
				Block: tmtypes.MakeBlock(1, []tmtypes.Tx{bz}, nil, nil),
			},
			&tmrpctypes.ResultBlockResults{
				Height:     1,
				TxsResults: []*types.ResponseDeliverTx{{Code: 0, GasUsed: 0}},
			},
			true,
			func(baseFee sdk.Int, validator sdk.AccAddress, height int64) {
				queryClient := suite.backend.queryClient.QueryClient.(*mocks.QueryClient)
				RegisterBaseFee(queryClient, baseFee)
				RegisterValidatorAccountError(queryClient)

				client := suite.backend.clientCtx.Client.(*mocks.Client)
				RegisterConsensusParams(client, height)
			},
			true,
			true,
		},
		{
			"pass - block with tx - with ConsensusParams error - BlockMaxGas defaults to max uint32",
			sdk.NewInt(1).BigInt(),
			sdk.AccAddress(tests.GenerateAddress().Bytes()),
			int64(1),
			&tmrpctypes.ResultBlock{
				Block: tmtypes.MakeBlock(1, []tmtypes.Tx{bz}, nil, nil),
			},
			&tmrpctypes.ResultBlockResults{
				Height:     1,
				TxsResults: []*types.ResponseDeliverTx{{Code: 0, GasUsed: 0}},
			},
			true,
			func(baseFee sdk.Int, validator sdk.AccAddress, height int64) {
				queryClient := suite.backend.queryClient.QueryClient.(*mocks.QueryClient)
				RegisterBaseFee(queryClient, baseFee)
				RegisterValidatorAccount(queryClient, validator)

				client := suite.backend.clientCtx.Client.(*mocks.Client)
				RegisterConsensusParamsError(client, height)
			},
			true,
			true,
		},
		{
			"pass - block with tx - with ShouldIgnoreGasUsed - empty txs",
			sdk.NewInt(1).BigInt(),
			sdk.AccAddress(tests.GenerateAddress().Bytes()),
			int64(1),
			&tmrpctypes.ResultBlock{
				Block: tmtypes.MakeBlock(1, []tmtypes.Tx{bz}, nil, nil),
			},
			&tmrpctypes.ResultBlockResults{
				Height: 1,
				TxsResults: []*types.ResponseDeliverTx{
					{
						Code:    11,
						GasUsed: 0,
						Log:     "no block gas left to run tx: out of gas",
					},
				},
			},
			true,
			func(baseFee sdk.Int, validator sdk.AccAddress, height int64) {
				queryClient := suite.backend.queryClient.QueryClient.(*mocks.QueryClient)
				RegisterBaseFee(queryClient, baseFee)
				RegisterValidatorAccount(queryClient, validator)

				client := suite.backend.clientCtx.Client.(*mocks.Client)
				RegisterConsensusParams(client, height)
			},
			false,
			true,
		},
		{
			"pass - block with tx - non fullTx",
			sdk.NewInt(1).BigInt(),
			sdk.AccAddress(tests.GenerateAddress().Bytes()),
			int64(1),
			&tmrpctypes.ResultBlock{
				Block: tmtypes.MakeBlock(1, []tmtypes.Tx{bz}, nil, nil),
			},
			&tmrpctypes.ResultBlockResults{
				Height:     1,
				TxsResults: []*types.ResponseDeliverTx{{Code: 0, GasUsed: 0}},
			},
			false,
			func(baseFee sdk.Int, validator sdk.AccAddress, height int64) {
				queryClient := suite.backend.queryClient.QueryClient.(*mocks.QueryClient)
				RegisterBaseFee(queryClient, baseFee)
				RegisterValidatorAccount(queryClient, validator)

				client := suite.backend.clientCtx.Client.(*mocks.Client)
				RegisterConsensusParams(client, height)
			},
			true,
			true,
		},
		{
			"pass - block with tx",
			sdk.NewInt(1).BigInt(),
			sdk.AccAddress(tests.GenerateAddress().Bytes()),
			int64(1),
			&tmrpctypes.ResultBlock{
				Block: tmtypes.MakeBlock(1, []tmtypes.Tx{bz}, nil, nil),
			},
			&tmrpctypes.ResultBlockResults{
				Height:     1,
				TxsResults: []*types.ResponseDeliverTx{{Code: 0, GasUsed: 0}},
			},
			true,
			func(baseFee sdk.Int, validator sdk.AccAddress, height int64) {
				queryClient := suite.backend.queryClient.QueryClient.(*mocks.QueryClient)
				RegisterBaseFee(queryClient, baseFee)
				RegisterValidatorAccount(queryClient, validator)

				client := suite.backend.clientCtx.Client.(*mocks.Client)
				RegisterConsensusParams(client, height)
			},
			true,
			true,
		},
	}
	for _, tc := range testCases {
		suite.Run(fmt.Sprintf("Case %s", tc.name), func() {
			suite.SetupTest() // reset test and queries
			tc.registerMock(sdk.NewIntFromBigInt(tc.baseFee), tc.validator, tc.height)

			block, err := suite.backend.EthBlockFromTendermint(tc.resBlock, tc.blockRes, tc.fullTx)

			var expBlock map[string]interface{}
			header := tc.resBlock.Block.Header
			gasLimit := int64(^uint32(0)) // for `MaxGas = -1` (DefaultConsensusParams)
			gasUsed := new(big.Int).SetUint64(uint64(tc.blockRes.TxsResults[0].GasUsed))

			root := common.Hash{}.Bytes()
			receipt := ethtypes.NewReceipt(root, false, gasUsed.Uint64())
			bloom := ethtypes.CreateBloom(ethtypes.Receipts{receipt})

			ethRPCTxs := []interface{}{}

			if tc.expTxs {
				if tc.fullTx {
					rpcTx, err := ethrpc.NewRPCTransaction(
						msgEthereumTx.AsTransaction(),
						common.BytesToHash(header.Hash()),
						uint64(header.Height),
						uint64(0),
						tc.baseFee,
					)
					suite.Require().NoError(err)
					ethRPCTxs = []interface{}{rpcTx}
				} else {
					ethRPCTxs = []interface{}{common.HexToHash(msgEthereumTx.Hash)}
				}
			}

			expBlock = ethrpc.FormatBlock(
				header,
				tc.resBlock.Block.Size(),
				gasLimit,
				gasUsed,
				ethRPCTxs,
				bloom,
				common.BytesToAddress(tc.validator.Bytes()),
				tc.baseFee,
			)

			if tc.expPass {
				suite.Require().Equal(expBlock, block)
				suite.Require().NoError(err)
			} else {
				suite.Require().Error(err)
			}
		})
	}
}

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
				queryClient := suite.backend.queryClient.QueryClient.(*mocks.QueryClient)
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
				queryClient := suite.backend.queryClient.QueryClient.(*mocks.QueryClient)
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
				queryClient := suite.backend.queryClient.QueryClient.(*mocks.QueryClient)
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
							{Value: []byte{0x1}},
						},
					},
				},
			},
			func() {
				queryClient := suite.backend.queryClient.QueryClient.(*mocks.QueryClient)
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
							{Value: []byte(baseFee.String())},
						},
					},
				},
			},
			func() {
				queryClient := suite.backend.queryClient.QueryClient.(*mocks.QueryClient)
				RegisterBaseFeeError(queryClient)
			},
			baseFee.BigInt(),
			true,
		},
		{
			"fail - base fee or london fork not enabled",
			&tmrpctypes.ResultBlockResults{Height: 1},
			func() {
				queryClient := suite.backend.queryClient.QueryClient.(*mocks.QueryClient)
				RegisterBaseFeeDisabled(queryClient)
			},
			nil,
			true,
		},
		{
			"pass",
			&tmrpctypes.ResultBlockResults{Height: 1},
			func() {
				queryClient := suite.backend.queryClient.QueryClient.(*mocks.QueryClient)
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

func (suite *BackendTestSuite) TestGetEthereumMsgsFromTendermintBlock() {
	msgEthereumTx, bz := suite.buildEthereumTx()

	testCases := []struct {
		name     string
		resBlock *tmrpctypes.ResultBlock
		blockRes *tmrpctypes.ResultBlockResults
		expMsgs  []*evmtypes.MsgEthereumTx
	}{
		{
			"tx in not included in block - unsuccessful tx without ExceedBlockGasLimit error",
			&tmrpctypes.ResultBlock{
				Block: tmtypes.MakeBlock(1, []tmtypes.Tx{bz}, nil, nil),
			},
			&tmrpctypes.ResultBlockResults{
				TxsResults: []*types.ResponseDeliverTx{
					{
						Code: 1,
					},
				},
			},
			[]*evmtypes.MsgEthereumTx(nil),
		},
		{
			"tx included in block - unsuccessful tx with ExceedBlockGasLimit error",
			&tmrpctypes.ResultBlock{
				Block: tmtypes.MakeBlock(1, []tmtypes.Tx{bz}, nil, nil),
			},
			&tmrpctypes.ResultBlockResults{
				TxsResults: []*types.ResponseDeliverTx{
					{
						Code: 1,
						Log:  ethrpc.ExceedBlockGasLimitError,
					},
				},
			},
			[]*evmtypes.MsgEthereumTx{msgEthereumTx},
		},
		{
			"pass",
			&tmrpctypes.ResultBlock{
				Block: tmtypes.MakeBlock(1, []tmtypes.Tx{bz}, nil, nil),
			},
			&tmrpctypes.ResultBlockResults{
				TxsResults: []*types.ResponseDeliverTx{
					{
						Code: 0,
						Log:  ethrpc.ExceedBlockGasLimitError,
					},
				},
			},
			[]*evmtypes.MsgEthereumTx{msgEthereumTx},
		},
	}
	for _, tc := range testCases {
		suite.Run(fmt.Sprintf("Case %s", tc.name), func() {

			suite.SetupTest() // reset test and queries

			msgs := suite.backend.GetEthereumMsgsFromTendermintBlock(tc.resBlock, tc.blockRes)
			suite.Require().Equal(tc.expMsgs, msgs)
		})
	}
}
