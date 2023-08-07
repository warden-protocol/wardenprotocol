package backend

import (
	"encoding/json"

	tmtypes "github.com/cometbft/cometbft/types"
	"github.com/ethereum/go-ethereum/common"
	ethtypes "github.com/ethereum/go-ethereum/core/types"
	"github.com/evmos/ethermint/rpc/backend/mocks"
	ethrpc "github.com/evmos/ethermint/rpc/types"
	evmtypes "github.com/evmos/ethermint/x/evm/types"
)

func (suite *BackendTestSuite) TestGetLogs() {
	_, bz := suite.buildEthereumTx()
	block := tmtypes.MakeBlock(1, []tmtypes.Tx{bz}, nil, nil)
	logs := make([]*evmtypes.Log, 0, 1)
	var log evmtypes.Log
	json.Unmarshal([]byte{0x7b, 0x22, 0x74, 0x65, 0x73, 0x74, 0x22, 0x3a, 0x20, 0x22, 0x68, 0x65, 0x6c, 0x6c, 0x6f, 0x22, 0x7d}, &log)
	logs = append(logs, &log)

	testCases := []struct {
		name         string
		registerMock func(hash common.Hash)
		blockHash    common.Hash
		expLogs      [][]*ethtypes.Log
		expPass      bool
	}{
		{
			"fail - no block with that hash",
			func(hash common.Hash) {
				client := suite.backend.clientCtx.Client.(*mocks.Client)
				RegisterBlockByHashNotFound(client, hash, bz)
			},
			common.Hash{},
			nil,
			false,
		},
		{
			"fail - error fetching block by hash",
			func(hash common.Hash) {
				client := suite.backend.clientCtx.Client.(*mocks.Client)
				RegisterBlockByHashError(client, hash, bz)
			},
			common.Hash{},
			nil,
			false,
		},
		{
			"fail - error getting block results",
			func(hash common.Hash) {
				client := suite.backend.clientCtx.Client.(*mocks.Client)
				RegisterBlockByHash(client, hash, bz)
				RegisterBlockResultsError(client, 1)
			},
			common.Hash{},
			nil,
			false,
		},
		{
			"success - getting logs with block hash",
			func(hash common.Hash) {
				client := suite.backend.clientCtx.Client.(*mocks.Client)
				RegisterBlockByHash(client, hash, bz)
				RegisterBlockResultsWithEventLog(client, ethrpc.BlockNumber(1).Int64())
			},
			common.BytesToHash(block.Hash()),
			[][]*ethtypes.Log{evmtypes.LogsToEthereum(logs)},
			true,
		},
	}

	for _, tc := range testCases {
		suite.Run(tc.name, func() {
			suite.SetupTest()

			tc.registerMock(tc.blockHash)
			logs, err := suite.backend.GetLogs(tc.blockHash)

			if tc.expPass {
				suite.Require().NoError(err)
				suite.Require().Equal(tc.expLogs, logs)
			} else {
				suite.Require().Error(err)
			}
		})
	}
}

func (suite *BackendTestSuite) TestBloomStatus() {
	testCases := []struct {
		name         string
		registerMock func()
		expResult    uint64
		expPass      bool
	}{
		{
			"pass - returns the BloomBitsBlocks and the number of processed sections maintained",
			func() {},
			4096,
			true,
		},
	}

	for _, tc := range testCases {
		suite.Run(tc.name, func() {
			suite.SetupTest()

			tc.registerMock()
			bloom, _ := suite.backend.BloomStatus()

			if tc.expPass {
				suite.Require().Equal(tc.expResult, bloom)
			}
		})
	}
}
