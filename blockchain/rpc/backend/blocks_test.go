package backend

import (
	"fmt"
	"math/big"

	"github.com/cometbft/cometbft/abci/types"
	tmrpctypes "github.com/cometbft/cometbft/rpc/core/types"
	tmtypes "github.com/cometbft/cometbft/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/common/hexutil"
	ethtypes "github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/trie"
	"google.golang.org/grpc/metadata"

	"github.com/evmos/ethermint/rpc/backend/mocks"
	ethrpc "github.com/evmos/ethermint/rpc/types"
	"github.com/evmos/ethermint/tests"
	evmtypes "github.com/evmos/ethermint/x/evm/types"
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
				var header metadata.MD
				height := int64(1)
				queryClient := suite.backend.queryClient.QueryClient.(*mocks.EVMQueryClient)
				RegisterParamsInvalidHeight(queryClient, &header, int64(height))
			},
			0x0,
			false,
		},
		{
			"fail - invalid block header",
			func() {
				var header metadata.MD
				height := int64(1)
				queryClient := suite.backend.queryClient.QueryClient.(*mocks.EVMQueryClient)
				RegisterParamsInvalidHeader(queryClient, &header, int64(height))
			},
			0x0,
			false,
		},
		{
			"pass - app state header height 1",
			func() {
				var header metadata.MD
				height := int64(1)
				queryClient := suite.backend.queryClient.QueryClient.(*mocks.EVMQueryClient)
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

				queryClient := suite.backend.queryClient.QueryClient.(*mocks.EVMQueryClient)
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

				queryClient := suite.backend.queryClient.QueryClient.(*mocks.EVMQueryClient)
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
			"fail - tendermint failed to get block",
			common.BytesToHash(block.Hash()),
			true,
			sdk.NewInt(1).BigInt(),
			sdk.AccAddress(tests.GenerateAddress().Bytes()),
			nil,
			nil,
			func(hash common.Hash, baseFee sdk.Int, validator sdk.AccAddress, txBz []byte) {
				client := suite.backend.clientCtx.Client.(*mocks.Client)
				RegisterBlockByHashError(client, hash, txBz)
			},
			false,
			false,
		},
		{
			"noop - tendermint blockres not found",
			common.BytesToHash(block.Hash()),
			true,
			sdk.NewInt(1).BigInt(),
			sdk.AccAddress(tests.GenerateAddress().Bytes()),
			nil,
			nil,
			func(hash common.Hash, baseFee sdk.Int, validator sdk.AccAddress, txBz []byte) {
				client := suite.backend.clientCtx.Client.(*mocks.Client)
				RegisterBlockByHashNotFound(client, hash, txBz)
			},
			true,
			true,
		},
		{
			"noop - tendermint failed to fetch block result",
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

				RegisterBlockResultsError(client, height)
			},
			true,
			true,
		},
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

				queryClient := suite.backend.queryClient.QueryClient.(*mocks.EVMQueryClient)
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

				queryClient := suite.backend.queryClient.QueryClient.(*mocks.EVMQueryClient)
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

func (suite *BackendTestSuite) TestGetBlockTransactionCountByHash() {
	_, bz := suite.buildEthereumTx()
	block := tmtypes.MakeBlock(1, []tmtypes.Tx{bz}, nil, nil)
	emptyBlock := tmtypes.MakeBlock(1, []tmtypes.Tx{}, nil, nil)

	testCases := []struct {
		name         string
		hash         common.Hash
		registerMock func(common.Hash)
		expCount     hexutil.Uint
		expPass      bool
	}{
		{
			"fail - block not found",
			common.BytesToHash(emptyBlock.Hash()),
			func(hash common.Hash) {
				client := suite.backend.clientCtx.Client.(*mocks.Client)
				RegisterBlockByHashError(client, hash, nil)
			},
			hexutil.Uint(0),
			false,
		},
		{
			"fail - tendermint client failed to get block result",
			common.BytesToHash(emptyBlock.Hash()),
			func(hash common.Hash) {
				height := int64(1)
				client := suite.backend.clientCtx.Client.(*mocks.Client)
				RegisterBlockByHash(client, hash, nil)
				RegisterBlockResultsError(client, height)
			},
			hexutil.Uint(0),
			false,
		},
		{
			"pass - block without tx",
			common.BytesToHash(emptyBlock.Hash()),
			func(hash common.Hash) {
				height := int64(1)
				client := suite.backend.clientCtx.Client.(*mocks.Client)
				RegisterBlockByHash(client, hash, nil)
				RegisterBlockResults(client, height)
			},
			hexutil.Uint(0),
			true,
		},
		{
			"pass - block with tx",
			common.BytesToHash(block.Hash()),
			func(hash common.Hash) {
				height := int64(1)
				client := suite.backend.clientCtx.Client.(*mocks.Client)
				RegisterBlockByHash(client, hash, bz)
				RegisterBlockResults(client, height)
			},
			hexutil.Uint(1),
			true,
		},
	}
	for _, tc := range testCases {
		suite.Run(fmt.Sprintf("Case %s", tc.name), func() {
			suite.SetupTest() // reset test and queries

			tc.registerMock(tc.hash)
			count := suite.backend.GetBlockTransactionCountByHash(tc.hash)
			if tc.expPass {
				suite.Require().Equal(tc.expCount, *count)
			} else {
				suite.Require().Nil(count)
			}
		})
	}
}

func (suite *BackendTestSuite) TestGetBlockTransactionCountByNumber() {
	_, bz := suite.buildEthereumTx()
	block := tmtypes.MakeBlock(1, []tmtypes.Tx{bz}, nil, nil)
	emptyBlock := tmtypes.MakeBlock(1, []tmtypes.Tx{}, nil, nil)

	testCases := []struct {
		name         string
		blockNum     ethrpc.BlockNumber
		registerMock func(ethrpc.BlockNumber)
		expCount     hexutil.Uint
		expPass      bool
	}{
		{
			"fail - block not found",
			ethrpc.BlockNumber(emptyBlock.Height),
			func(blockNum ethrpc.BlockNumber) {
				height := blockNum.Int64()
				client := suite.backend.clientCtx.Client.(*mocks.Client)
				RegisterBlockError(client, height)
			},
			hexutil.Uint(0),
			false,
		},
		{
			"fail - tendermint client failed to get block result",
			ethrpc.BlockNumber(emptyBlock.Height),
			func(blockNum ethrpc.BlockNumber) {
				height := blockNum.Int64()
				client := suite.backend.clientCtx.Client.(*mocks.Client)
				RegisterBlock(client, height, nil)
				RegisterBlockResultsError(client, height)
			},
			hexutil.Uint(0),
			false,
		},
		{
			"pass - block without tx",
			ethrpc.BlockNumber(emptyBlock.Height),
			func(blockNum ethrpc.BlockNumber) {
				height := blockNum.Int64()
				client := suite.backend.clientCtx.Client.(*mocks.Client)
				RegisterBlock(client, height, nil)
				RegisterBlockResults(client, height)
			},
			hexutil.Uint(0),
			true,
		},
		{
			"pass - block with tx",
			ethrpc.BlockNumber(block.Height),
			func(blockNum ethrpc.BlockNumber) {
				height := blockNum.Int64()
				client := suite.backend.clientCtx.Client.(*mocks.Client)
				RegisterBlock(client, height, bz)
				RegisterBlockResults(client, height)
			},
			hexutil.Uint(1),
			true,
		},
	}
	for _, tc := range testCases {
		suite.Run(fmt.Sprintf("Case %s", tc.name), func() {
			suite.SetupTest() // reset test and queries

			tc.registerMock(tc.blockNum)
			count := suite.backend.GetBlockTransactionCountByNumber(tc.blockNum)
			if tc.expPass {
				suite.Require().Equal(tc.expCount, *count)
			} else {
				suite.Require().Nil(count)
			}
		})
	}
}

func (suite *BackendTestSuite) TestTendermintBlockByNumber() {
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
				var header metadata.MD
				appHeight := int64(1)
				queryClient := suite.backend.queryClient.QueryClient.(*mocks.EVMQueryClient)
				RegisterParamsError(queryClient, &header, appHeight)
			},
			false,
			false,
		},
		{
			"pass - blockNum < 0 with app state height >= 1",
			ethrpc.BlockNumber(-1),
			func(blockNum ethrpc.BlockNumber) {
				var header metadata.MD
				appHeight := int64(1)
				queryClient := suite.backend.queryClient.QueryClient.(*mocks.EVMQueryClient)
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
			resultBlock, err := suite.backend.TendermintBlockByNumber(tc.blockNumber)

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

func (suite *BackendTestSuite) TestTendermintBlockResultByNumber() {
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

			blockRes, err := suite.backend.TendermintBlockResultByNumber(&tc.blockNumber)

			if tc.expPass {
				suite.Require().NoError(err)
				suite.Require().Equal(expBlockRes, blockRes)
			} else {
				suite.Require().Error(err)
			}
		})
	}
}

func (suite *BackendTestSuite) TestBlockNumberFromTendermint() {
	var resBlock *tmrpctypes.ResultBlock

	_, bz := suite.buildEthereumTx()
	block := tmtypes.MakeBlock(1, []tmtypes.Tx{bz}, nil, nil)
	blockNum := ethrpc.NewBlockNumber(big.NewInt(block.Height))
	blockHash := common.BytesToHash(block.Hash())

	testCases := []struct {
		name         string
		blockNum     *ethrpc.BlockNumber
		hash         *common.Hash
		registerMock func(*common.Hash)
		expPass      bool
	}{
		{
			"error - without blockHash or blockNum",
			nil,
			nil,
			func(hash *common.Hash) {},
			false,
		},
		{
			"error - with blockHash, tendermint client failed to get block",
			nil,
			&blockHash,
			func(hash *common.Hash) {
				client := suite.backend.clientCtx.Client.(*mocks.Client)
				RegisterBlockByHashError(client, *hash, bz)
			},
			false,
		},
		{
			"pass - with blockHash",
			nil,
			&blockHash,
			func(hash *common.Hash) {
				client := suite.backend.clientCtx.Client.(*mocks.Client)
				resBlock, _ = RegisterBlockByHash(client, *hash, bz)
			},
			true,
		},
		{
			"pass - without blockHash & with blockNumber",
			&blockNum,
			nil,
			func(hash *common.Hash) {},
			true,
		},
	}
	for _, tc := range testCases {
		suite.Run(fmt.Sprintf("Case %s", tc.name), func() {
			suite.SetupTest() // reset test and queries

			blockNrOrHash := ethrpc.BlockNumberOrHash{
				BlockNumber: tc.blockNum,
				BlockHash:   tc.hash,
			}

			tc.registerMock(tc.hash)
			blockNum, err := suite.backend.BlockNumberFromTendermint(blockNrOrHash)

			if tc.expPass {
				suite.Require().NoError(err)
				if tc.hash == nil {
					suite.Require().Equal(*tc.blockNum, blockNum)
				} else {
					expHeight := ethrpc.NewBlockNumber(big.NewInt(resBlock.Block.Height))
					suite.Require().Equal(expHeight, blockNum)
				}
			} else {
				suite.Require().Error(err)
			}
		})
	}
}

func (suite *BackendTestSuite) TestBlockNumberFromTendermintByHash() {
	var resBlock *tmrpctypes.ResultBlock

	_, bz := suite.buildEthereumTx()
	block := tmtypes.MakeBlock(1, []tmtypes.Tx{bz}, nil, nil)
	emptyBlock := tmtypes.MakeBlock(1, []tmtypes.Tx{}, nil, nil)

	testCases := []struct {
		name         string
		hash         common.Hash
		registerMock func(common.Hash)
		expPass      bool
	}{
		{
			"fail - tendermint client failed to get block",
			common.BytesToHash(block.Hash()),
			func(hash common.Hash) {
				client := suite.backend.clientCtx.Client.(*mocks.Client)
				RegisterBlockByHashError(client, hash, bz)
			},
			false,
		},
		{
			"pass - block without tx",
			common.BytesToHash(emptyBlock.Hash()),
			func(hash common.Hash) {
				client := suite.backend.clientCtx.Client.(*mocks.Client)
				resBlock, _ = RegisterBlockByHash(client, hash, bz)
			},
			true,
		},
		{
			"pass - block with tx",
			common.BytesToHash(block.Hash()),
			func(hash common.Hash) {
				client := suite.backend.clientCtx.Client.(*mocks.Client)
				resBlock, _ = RegisterBlockByHash(client, hash, bz)
			},
			true,
		},
	}
	for _, tc := range testCases {
		suite.Run(fmt.Sprintf("Case %s", tc.name), func() {
			suite.SetupTest() // reset test and queries

			tc.registerMock(tc.hash)
			blockNum, err := suite.backend.BlockNumberFromTendermintByHash(tc.hash)
			if tc.expPass {
				expHeight := big.NewInt(resBlock.Block.Height)
				suite.Require().NoError(err)
				suite.Require().Equal(expHeight, blockNum)
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
							{Key: string(evmtypes.AttributeKeyEthereumTxHash)},
						},
					},
				},
			},
			ethtypes.Bloom{},
			false,
		},
		{
			"pass - block bloom attribute key",
			&tmrpctypes.ResultBlockResults{
				EndBlockEvents: []types.Event{
					{
						Type: evmtypes.EventTypeBlockBloom,
						Attributes: []types.EventAttribute{
							{Key: string(bAttributeKeyEthereumBloom)},
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

func (suite *BackendTestSuite) TestGetEthBlockFromTendermint() {
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
				queryClient := suite.backend.queryClient.QueryClient.(*mocks.EVMQueryClient)
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
				queryClient := suite.backend.queryClient.QueryClient.(*mocks.EVMQueryClient)
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
				queryClient := suite.backend.queryClient.QueryClient.(*mocks.EVMQueryClient)
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
				queryClient := suite.backend.queryClient.QueryClient.(*mocks.EVMQueryClient)
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
				queryClient := suite.backend.queryClient.QueryClient.(*mocks.EVMQueryClient)
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
				queryClient := suite.backend.queryClient.QueryClient.(*mocks.EVMQueryClient)
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
				queryClient := suite.backend.queryClient.QueryClient.(*mocks.EVMQueryClient)
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

			block, err := suite.backend.RPCBlockFromTendermintBlock(tc.resBlock, tc.blockRes, tc.fullTx)

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
						suite.backend.chainID,
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

func (suite *BackendTestSuite) TestEthMsgsFromTendermintBlock() {
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

			msgs := suite.backend.EthMsgsFromTendermintBlock(tc.resBlock, tc.blockRes)
			suite.Require().Equal(tc.expMsgs, msgs)
		})
	}
}

func (suite *BackendTestSuite) TestHeaderByNumber() {
	var expResultBlock *tmrpctypes.ResultBlock

	_, bz := suite.buildEthereumTx()

	testCases := []struct {
		name         string
		blockNumber  ethrpc.BlockNumber
		baseFee      *big.Int
		registerMock func(ethrpc.BlockNumber, sdk.Int)
		expPass      bool
	}{
		{
			"fail - tendermint client failed to get block",
			ethrpc.BlockNumber(1),
			sdk.NewInt(1).BigInt(),
			func(blockNum ethrpc.BlockNumber, baseFee sdk.Int) {
				height := blockNum.Int64()
				client := suite.backend.clientCtx.Client.(*mocks.Client)
				RegisterBlockError(client, height)
			},
			false,
		},
		{
			"fail - block not found for height",
			ethrpc.BlockNumber(1),
			sdk.NewInt(1).BigInt(),
			func(blockNum ethrpc.BlockNumber, baseFee sdk.Int) {
				height := blockNum.Int64()
				client := suite.backend.clientCtx.Client.(*mocks.Client)
				RegisterBlockNotFound(client, height)
			},
			false,
		},
		{
			"fail - block not found for height",
			ethrpc.BlockNumber(1),
			sdk.NewInt(1).BigInt(),
			func(blockNum ethrpc.BlockNumber, baseFee sdk.Int) {
				height := blockNum.Int64()
				client := suite.backend.clientCtx.Client.(*mocks.Client)
				RegisterBlock(client, height, nil)
				RegisterBlockResultsError(client, height)
			},
			false,
		},
		{
			"pass - without Base Fee, failed to fetch from prunned block",
			ethrpc.BlockNumber(1),
			nil,
			func(blockNum ethrpc.BlockNumber, baseFee sdk.Int) {
				height := blockNum.Int64()
				client := suite.backend.clientCtx.Client.(*mocks.Client)
				expResultBlock, _ = RegisterBlock(client, height, nil)
				RegisterBlockResults(client, height)

				queryClient := suite.backend.queryClient.QueryClient.(*mocks.EVMQueryClient)
				RegisterBaseFeeError(queryClient)
			},
			true,
		},
		{
			"pass - blockNum = 1, without tx",
			ethrpc.BlockNumber(1),
			sdk.NewInt(1).BigInt(),
			func(blockNum ethrpc.BlockNumber, baseFee sdk.Int) {
				height := blockNum.Int64()
				client := suite.backend.clientCtx.Client.(*mocks.Client)
				expResultBlock, _ = RegisterBlock(client, height, nil)
				RegisterBlockResults(client, height)

				queryClient := suite.backend.queryClient.QueryClient.(*mocks.EVMQueryClient)
				RegisterBaseFee(queryClient, baseFee)
			},
			true,
		},
		{
			"pass - blockNum = 1, with tx",
			ethrpc.BlockNumber(1),
			sdk.NewInt(1).BigInt(),
			func(blockNum ethrpc.BlockNumber, baseFee sdk.Int) {
				height := blockNum.Int64()
				client := suite.backend.clientCtx.Client.(*mocks.Client)
				expResultBlock, _ = RegisterBlock(client, height, bz)
				RegisterBlockResults(client, height)

				queryClient := suite.backend.queryClient.QueryClient.(*mocks.EVMQueryClient)
				RegisterBaseFee(queryClient, baseFee)
			},
			true,
		},
	}
	for _, tc := range testCases {
		suite.Run(fmt.Sprintf("Case %s", tc.name), func() {
			suite.SetupTest() // reset test and queries

			tc.registerMock(tc.blockNumber, sdk.NewIntFromBigInt(tc.baseFee))
			header, err := suite.backend.HeaderByNumber(tc.blockNumber)

			if tc.expPass {
				expHeader := ethrpc.EthHeaderFromTendermint(expResultBlock.Block.Header, ethtypes.Bloom{}, tc.baseFee)
				suite.Require().NoError(err)
				suite.Require().Equal(expHeader, header)
			} else {
				suite.Require().Error(err)
			}
		})
	}
}

func (suite *BackendTestSuite) TestHeaderByHash() {
	var expResultBlock *tmrpctypes.ResultBlock

	_, bz := suite.buildEthereumTx()
	block := tmtypes.MakeBlock(1, []tmtypes.Tx{bz}, nil, nil)
	emptyBlock := tmtypes.MakeBlock(1, []tmtypes.Tx{}, nil, nil)

	testCases := []struct {
		name         string
		hash         common.Hash
		baseFee      *big.Int
		registerMock func(common.Hash, sdk.Int)
		expPass      bool
	}{
		{
			"fail - tendermint client failed to get block",
			common.BytesToHash(block.Hash()),
			sdk.NewInt(1).BigInt(),
			func(hash common.Hash, baseFee sdk.Int) {
				client := suite.backend.clientCtx.Client.(*mocks.Client)
				RegisterBlockByHashError(client, hash, bz)
			},
			false,
		},
		{
			"fail - block not found for height",
			common.BytesToHash(block.Hash()),
			sdk.NewInt(1).BigInt(),
			func(hash common.Hash, baseFee sdk.Int) {
				client := suite.backend.clientCtx.Client.(*mocks.Client)
				RegisterBlockByHashNotFound(client, hash, bz)
			},
			false,
		},
		{
			"fail - block not found for height",
			common.BytesToHash(block.Hash()),
			sdk.NewInt(1).BigInt(),
			func(hash common.Hash, baseFee sdk.Int) {
				height := int64(1)
				client := suite.backend.clientCtx.Client.(*mocks.Client)
				RegisterBlockByHash(client, hash, bz)
				RegisterBlockResultsError(client, height)
			},
			false,
		},
		{
			"pass - without Base Fee, failed to fetch from prunned block",
			common.BytesToHash(block.Hash()),
			nil,
			func(hash common.Hash, baseFee sdk.Int) {
				height := int64(1)
				client := suite.backend.clientCtx.Client.(*mocks.Client)
				expResultBlock, _ = RegisterBlockByHash(client, hash, bz)
				RegisterBlockResults(client, height)

				queryClient := suite.backend.queryClient.QueryClient.(*mocks.EVMQueryClient)
				RegisterBaseFeeError(queryClient)
			},
			true,
		},
		{
			"pass - blockNum = 1, without tx",
			common.BytesToHash(emptyBlock.Hash()),
			sdk.NewInt(1).BigInt(),
			func(hash common.Hash, baseFee sdk.Int) {
				height := int64(1)
				client := suite.backend.clientCtx.Client.(*mocks.Client)
				expResultBlock, _ = RegisterBlockByHash(client, hash, nil)
				RegisterBlockResults(client, height)

				queryClient := suite.backend.queryClient.QueryClient.(*mocks.EVMQueryClient)
				RegisterBaseFee(queryClient, baseFee)
			},
			true,
		},
		{
			"pass - with tx",
			common.BytesToHash(block.Hash()),
			sdk.NewInt(1).BigInt(),
			func(hash common.Hash, baseFee sdk.Int) {
				height := int64(1)
				client := suite.backend.clientCtx.Client.(*mocks.Client)
				expResultBlock, _ = RegisterBlockByHash(client, hash, bz)
				RegisterBlockResults(client, height)

				queryClient := suite.backend.queryClient.QueryClient.(*mocks.EVMQueryClient)
				RegisterBaseFee(queryClient, baseFee)
			},
			true,
		},
	}
	for _, tc := range testCases {
		suite.Run(fmt.Sprintf("Case %s", tc.name), func() {
			suite.SetupTest() // reset test and queries

			tc.registerMock(tc.hash, sdk.NewIntFromBigInt(tc.baseFee))
			header, err := suite.backend.HeaderByHash(tc.hash)

			if tc.expPass {
				expHeader := ethrpc.EthHeaderFromTendermint(expResultBlock.Block.Header, ethtypes.Bloom{}, tc.baseFee)
				suite.Require().NoError(err)
				suite.Require().Equal(expHeader, header)
			} else {
				suite.Require().Error(err)
			}
		})
	}
}

func (suite *BackendTestSuite) TestEthBlockByNumber() {
	msgEthereumTx, bz := suite.buildEthereumTx()
	emptyBlock := tmtypes.MakeBlock(1, []tmtypes.Tx{}, nil, nil)

	testCases := []struct {
		name         string
		blockNumber  ethrpc.BlockNumber
		registerMock func(ethrpc.BlockNumber)
		expEthBlock  *ethtypes.Block
		expPass      bool
	}{
		{
			"fail - tendermint client failed to get block",
			ethrpc.BlockNumber(1),
			func(blockNum ethrpc.BlockNumber) {
				height := blockNum.Int64()
				client := suite.backend.clientCtx.Client.(*mocks.Client)
				RegisterBlockError(client, height)
			},
			nil,
			false,
		},
		{
			"fail - block result not found for height",
			ethrpc.BlockNumber(1),
			func(blockNum ethrpc.BlockNumber) {
				height := blockNum.Int64()
				client := suite.backend.clientCtx.Client.(*mocks.Client)
				RegisterBlock(client, height, nil)
				RegisterBlockResultsError(client, blockNum.Int64())
			},
			nil,
			false,
		},
		{
			"pass - block without tx",
			ethrpc.BlockNumber(1),
			func(blockNum ethrpc.BlockNumber) {
				height := blockNum.Int64()
				client := suite.backend.clientCtx.Client.(*mocks.Client)
				RegisterBlock(client, height, nil)

				RegisterBlockResults(client, blockNum.Int64())
				queryClient := suite.backend.queryClient.QueryClient.(*mocks.EVMQueryClient)
				baseFee := sdk.NewInt(1)
				RegisterBaseFee(queryClient, baseFee)
			},
			ethtypes.NewBlock(
				ethrpc.EthHeaderFromTendermint(
					emptyBlock.Header,
					ethtypes.Bloom{},
					sdk.NewInt(1).BigInt(),
				),
				[]*ethtypes.Transaction{},
				nil,
				nil,
				nil,
			),
			true,
		},
		{
			"pass - block with tx",
			ethrpc.BlockNumber(1),
			func(blockNum ethrpc.BlockNumber) {
				height := blockNum.Int64()
				client := suite.backend.clientCtx.Client.(*mocks.Client)
				RegisterBlock(client, height, bz)

				RegisterBlockResults(client, blockNum.Int64())
				queryClient := suite.backend.queryClient.QueryClient.(*mocks.EVMQueryClient)
				baseFee := sdk.NewInt(1)
				RegisterBaseFee(queryClient, baseFee)
			},
			ethtypes.NewBlock(
				ethrpc.EthHeaderFromTendermint(
					emptyBlock.Header,
					ethtypes.Bloom{},
					sdk.NewInt(1).BigInt(),
				),
				[]*ethtypes.Transaction{msgEthereumTx.AsTransaction()},
				nil,
				nil,
				trie.NewStackTrie(nil),
			),
			true,
		},
	}
	for _, tc := range testCases {
		suite.Run(fmt.Sprintf("Case %s", tc.name), func() {
			suite.SetupTest() // reset test and queries
			tc.registerMock(tc.blockNumber)

			ethBlock, err := suite.backend.EthBlockByNumber(tc.blockNumber)

			if tc.expPass {
				suite.Require().NoError(err)
				suite.Require().Equal(tc.expEthBlock.Header(), ethBlock.Header())
				suite.Require().Equal(tc.expEthBlock.Uncles(), ethBlock.Uncles())
				suite.Require().Equal(tc.expEthBlock.ReceiptHash(), ethBlock.ReceiptHash())
				for i, tx := range tc.expEthBlock.Transactions() {
					suite.Require().Equal(tx.Data(), ethBlock.Transactions()[i].Data())
				}

			} else {
				suite.Require().Error(err)
			}
		})
	}
}

func (suite *BackendTestSuite) TestEthBlockFromTendermintBlock() {
	msgEthereumTx, bz := suite.buildEthereumTx()
	emptyBlock := tmtypes.MakeBlock(1, []tmtypes.Tx{}, nil, nil)

	testCases := []struct {
		name         string
		baseFee      *big.Int
		resBlock     *tmrpctypes.ResultBlock
		blockRes     *tmrpctypes.ResultBlockResults
		registerMock func(sdk.Int, int64)
		expEthBlock  *ethtypes.Block
		expPass      bool
	}{
		{
			"pass - block without tx",
			sdk.NewInt(1).BigInt(),
			&tmrpctypes.ResultBlock{
				Block: emptyBlock,
			},
			&tmrpctypes.ResultBlockResults{
				Height:     1,
				TxsResults: []*types.ResponseDeliverTx{{Code: 0, GasUsed: 0}},
			},
			func(baseFee sdk.Int, blockNum int64) {
				queryClient := suite.backend.queryClient.QueryClient.(*mocks.EVMQueryClient)
				RegisterBaseFee(queryClient, baseFee)
			},
			ethtypes.NewBlock(
				ethrpc.EthHeaderFromTendermint(
					emptyBlock.Header,
					ethtypes.Bloom{},
					sdk.NewInt(1).BigInt(),
				),
				[]*ethtypes.Transaction{},
				nil,
				nil,
				nil,
			),
			true,
		},
		{
			"pass - block with tx",
			sdk.NewInt(1).BigInt(),
			&tmrpctypes.ResultBlock{
				Block: tmtypes.MakeBlock(1, []tmtypes.Tx{bz}, nil, nil),
			},
			&tmrpctypes.ResultBlockResults{
				Height:     1,
				TxsResults: []*types.ResponseDeliverTx{{Code: 0, GasUsed: 0}},
				EndBlockEvents: []types.Event{
					{
						Type: evmtypes.EventTypeBlockBloom,
						Attributes: []types.EventAttribute{
							{Key: string(bAttributeKeyEthereumBloom)},
						},
					},
				},
			},
			func(baseFee sdk.Int, blockNum int64) {
				queryClient := suite.backend.queryClient.QueryClient.(*mocks.EVMQueryClient)
				RegisterBaseFee(queryClient, baseFee)
			},
			ethtypes.NewBlock(
				ethrpc.EthHeaderFromTendermint(
					emptyBlock.Header,
					ethtypes.Bloom{},
					sdk.NewInt(1).BigInt(),
				),
				[]*ethtypes.Transaction{msgEthereumTx.AsTransaction()},
				nil,
				nil,
				trie.NewStackTrie(nil),
			),
			true,
		},
	}
	for _, tc := range testCases {
		suite.Run(fmt.Sprintf("Case %s", tc.name), func() {
			suite.SetupTest() // reset test and queries
			tc.registerMock(sdk.NewIntFromBigInt(tc.baseFee), tc.blockRes.Height)

			ethBlock, err := suite.backend.EthBlockFromTendermintBlock(tc.resBlock, tc.blockRes)

			if tc.expPass {
				suite.Require().NoError(err)
				suite.Require().Equal(tc.expEthBlock.Header(), ethBlock.Header())
				suite.Require().Equal(tc.expEthBlock.Uncles(), ethBlock.Uncles())
				suite.Require().Equal(tc.expEthBlock.ReceiptHash(), ethBlock.ReceiptHash())
				for i, tx := range tc.expEthBlock.Transactions() {
					suite.Require().Equal(tx.Data(), ethBlock.Transactions()[i].Data())
				}

			} else {
				suite.Require().Error(err)
			}
		})
	}
}
