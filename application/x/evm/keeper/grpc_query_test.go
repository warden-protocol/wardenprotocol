package keeper_test

import (
	"encoding/json"
	"fmt"
	"math/big"

	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/common/hexutil"
	"github.com/ethereum/go-ethereum/core/vm"
	"github.com/ethereum/go-ethereum/crypto"
	ethlogger "github.com/ethereum/go-ethereum/eth/tracers/logger"
	ethparams "github.com/ethereum/go-ethereum/params"
	"github.com/evmos/ethermint/x/evm/statedb"

	sdk "github.com/cosmos/cosmos-sdk/types"

	"github.com/evmos/ethermint/crypto/ethsecp256k1"
	"github.com/evmos/ethermint/server/config"
	ethermint "github.com/evmos/ethermint/types"
	"github.com/evmos/ethermint/x/evm/types"
)

// Not valid Ethereum address
const invalidAddress = "0x0000"

func (suite *KeeperTestSuite) TestQueryAccount() {
	var (
		req        *types.QueryAccountRequest
		expAccount *types.QueryAccountResponse
	)

	testCases := []struct {
		msg      string
		malleate func()
		expPass  bool
	}{
		{
			"invalid address",
			func() {
				expAccount = &types.QueryAccountResponse{
					Balance:  "0",
					CodeHash: common.BytesToHash(crypto.Keccak256(nil)).Hex(),
					Nonce:    0,
				}
				req = &types.QueryAccountRequest{
					Address: invalidAddress,
				}
			},
			false,
		},
		{
			"success",
			func() {
				amt := sdk.Coins{ethermint.NewPhotonCoinInt64(100)}
				err := suite.app.BankKeeper.MintCoins(suite.ctx, types.ModuleName, amt)
				suite.Require().NoError(err)
				err = suite.app.BankKeeper.SendCoinsFromModuleToAccount(suite.ctx, types.ModuleName, suite.address.Bytes(), amt)
				suite.Require().NoError(err)

				expAccount = &types.QueryAccountResponse{
					Balance:  "100",
					CodeHash: common.BytesToHash(crypto.Keccak256(nil)).Hex(),
					Nonce:    0,
				}
				req = &types.QueryAccountRequest{
					Address: suite.address.String(),
				}
			},
			true,
		},
	}

	for _, tc := range testCases {
		suite.Run(fmt.Sprintf("Case %s", tc.msg), func() {
			suite.SetupTest() // reset

			tc.malleate()
			ctx := sdk.WrapSDKContext(suite.ctx)
			res, err := suite.queryClient.Account(ctx, req)

			if tc.expPass {
				suite.Require().NoError(err)
				suite.Require().NotNil(res)

				suite.Require().Equal(expAccount, res)
			} else {
				suite.Require().Error(err)
			}
		})
	}
}

func (suite *KeeperTestSuite) TestQueryCosmosAccount() {
	var (
		req        *types.QueryCosmosAccountRequest
		expAccount *types.QueryCosmosAccountResponse
	)

	testCases := []struct {
		msg      string
		malleate func()
		expPass  bool
	}{
		{
			"invalid address",
			func() {
				expAccount = &types.QueryCosmosAccountResponse{
					CosmosAddress: sdk.AccAddress(common.Address{}.Bytes()).String(),
				}
				req = &types.QueryCosmosAccountRequest{
					Address: invalidAddress,
				}
			},
			false,
		},
		{
			"success",
			func() {
				expAccount = &types.QueryCosmosAccountResponse{
					CosmosAddress: sdk.AccAddress(suite.address.Bytes()).String(),
					Sequence:      0,
					AccountNumber: 0,
				}
				req = &types.QueryCosmosAccountRequest{
					Address: suite.address.String(),
				}
			},
			true,
		},
		{
			"success with seq and account number",
			func() {
				acc := suite.app.AccountKeeper.GetAccount(suite.ctx, suite.address.Bytes())
				suite.Require().NoError(acc.SetSequence(10))
				suite.Require().NoError(acc.SetAccountNumber(1))
				suite.app.AccountKeeper.SetAccount(suite.ctx, acc)

				expAccount = &types.QueryCosmosAccountResponse{
					CosmosAddress: sdk.AccAddress(suite.address.Bytes()).String(),
					Sequence:      10,
					AccountNumber: 1,
				}
				req = &types.QueryCosmosAccountRequest{
					Address: suite.address.String(),
				}
			},
			true,
		},
	}

	for _, tc := range testCases {
		suite.Run(fmt.Sprintf("Case %s", tc.msg), func() {
			suite.SetupTest() // reset

			tc.malleate()
			ctx := sdk.WrapSDKContext(suite.ctx)
			res, err := suite.queryClient.CosmosAccount(ctx, req)

			if tc.expPass {
				suite.Require().NoError(err)
				suite.Require().NotNil(res)

				suite.Require().Equal(expAccount, res)
			} else {
				suite.Require().Error(err)
			}
		})
	}
}

func (suite *KeeperTestSuite) TestQueryBalance() {
	var (
		req        *types.QueryBalanceRequest
		expBalance string
	)

	testCases := []struct {
		msg      string
		malleate func()
		expPass  bool
	}{
		{
			"invalid address",
			func() {
				expBalance = "0"
				req = &types.QueryBalanceRequest{
					Address: invalidAddress,
				}
			},
			false,
		},
		{
			"success",
			func() {
				amt := sdk.Coins{ethermint.NewPhotonCoinInt64(100)}
				err := suite.app.BankKeeper.MintCoins(suite.ctx, types.ModuleName, amt)
				suite.Require().NoError(err)
				err = suite.app.BankKeeper.SendCoinsFromModuleToAccount(suite.ctx, types.ModuleName, suite.address.Bytes(), amt)
				suite.Require().NoError(err)

				expBalance = "100"
				req = &types.QueryBalanceRequest{
					Address: suite.address.String(),
				}
			},
			true,
		},
	}

	for _, tc := range testCases {
		suite.Run(fmt.Sprintf("Case %s", tc.msg), func() {
			suite.SetupTest() // reset

			tc.malleate()
			ctx := sdk.WrapSDKContext(suite.ctx)
			res, err := suite.queryClient.Balance(ctx, req)

			if tc.expPass {
				suite.Require().NoError(err)
				suite.Require().NotNil(res)

				suite.Require().Equal(expBalance, res.Balance)
			} else {
				suite.Require().Error(err)
			}
		})
	}
}

func (suite *KeeperTestSuite) TestQueryStorage() {
	var (
		req      *types.QueryStorageRequest
		expValue string
	)

	testCases := []struct {
		msg      string
		malleate func(vm.StateDB)
		expPass  bool
	}{
		{
			"invalid address",
			func(vm.StateDB) {
				req = &types.QueryStorageRequest{
					Address: invalidAddress,
				}
			},
			false,
		},
		{
			"success",
			func(vmdb vm.StateDB) {
				key := common.BytesToHash([]byte("key"))
				value := common.BytesToHash([]byte("value"))
				expValue = value.String()
				vmdb.SetState(suite.address, key, value)
				req = &types.QueryStorageRequest{
					Address: suite.address.String(),
					Key:     key.String(),
				}
			},
			true,
		},
	}

	for _, tc := range testCases {
		suite.Run(fmt.Sprintf("Case %s", tc.msg), func() {
			suite.SetupTest() // reset

			vmdb := suite.StateDB()
			tc.malleate(vmdb)
			suite.Require().NoError(vmdb.Commit())

			ctx := sdk.WrapSDKContext(suite.ctx)
			res, err := suite.queryClient.Storage(ctx, req)

			if tc.expPass {
				suite.Require().NoError(err)
				suite.Require().NotNil(res)

				suite.Require().Equal(expValue, res.Value)
			} else {
				suite.Require().Error(err)
			}
		})
	}
}

func (suite *KeeperTestSuite) TestQueryCode() {
	var (
		req     *types.QueryCodeRequest
		expCode []byte
	)

	testCases := []struct {
		msg      string
		malleate func(vm.StateDB)
		expPass  bool
	}{
		{
			"invalid address",
			func(vm.StateDB) {
				req = &types.QueryCodeRequest{
					Address: invalidAddress,
				}
				exp := &types.QueryCodeResponse{}
				expCode = exp.Code
			},
			false,
		},
		{
			"success",
			func(vmdb vm.StateDB) {
				expCode = []byte("code")
				vmdb.SetCode(suite.address, expCode)

				req = &types.QueryCodeRequest{
					Address: suite.address.String(),
				}
			},
			true,
		},
	}

	for _, tc := range testCases {
		suite.Run(fmt.Sprintf("Case %s", tc.msg), func() {
			suite.SetupTest() // reset

			vmdb := suite.StateDB()
			tc.malleate(vmdb)
			suite.Require().NoError(vmdb.Commit())

			ctx := sdk.WrapSDKContext(suite.ctx)
			res, err := suite.queryClient.Code(ctx, req)

			if tc.expPass {
				suite.Require().NoError(err)
				suite.Require().NotNil(res)

				suite.Require().Equal(expCode, res.Code)
			} else {
				suite.Require().Error(err)
			}
		})
	}
}

func (suite *KeeperTestSuite) TestQueryTxLogs() {
	var expLogs []*types.Log
	txHash := common.BytesToHash([]byte("tx_hash"))
	txIndex := uint(1)
	logIndex := uint(1)

	testCases := []struct {
		msg      string
		malleate func(vm.StateDB)
	}{
		{
			"empty logs",
			func(vm.StateDB) {
				expLogs = nil
			},
		},
		{
			"success",
			func(vmdb vm.StateDB) {
				expLogs = []*types.Log{
					{
						Address:     suite.address.String(),
						Topics:      []string{common.BytesToHash([]byte("topic")).String()},
						Data:        []byte("data"),
						BlockNumber: 1,
						TxHash:      txHash.String(),
						TxIndex:     uint64(txIndex),
						BlockHash:   common.BytesToHash(suite.ctx.HeaderHash()).Hex(),
						Index:       uint64(logIndex),
						Removed:     false,
					},
				}

				for _, log := range types.LogsToEthereum(expLogs) {
					vmdb.AddLog(log)
				}
			},
		},
	}

	for _, tc := range testCases {
		suite.Run(fmt.Sprintf("Case %s", tc.msg), func() {
			suite.SetupTest() // reset

			vmdb := statedb.New(suite.ctx, suite.app.EvmKeeper, statedb.NewTxConfig(common.BytesToHash(suite.ctx.HeaderHash().Bytes()), txHash, txIndex, logIndex))
			tc.malleate(vmdb)
			suite.Require().NoError(vmdb.Commit())

			logs := vmdb.Logs()
			suite.Require().Equal(expLogs, types.NewLogsFromEth(logs))
		})
	}
}

func (suite *KeeperTestSuite) TestQueryParams() {
	ctx := sdk.WrapSDKContext(suite.ctx)
	expParams := types.DefaultParams()

	res, err := suite.queryClient.Params(ctx, &types.QueryParamsRequest{})
	suite.Require().NoError(err)
	suite.Require().Equal(expParams, res.Params)
}

func (suite *KeeperTestSuite) TestQueryValidatorAccount() {
	var (
		req        *types.QueryValidatorAccountRequest
		expAccount *types.QueryValidatorAccountResponse
	)

	testCases := []struct {
		msg      string
		malleate func()
		expPass  bool
	}{
		{
			"invalid address",
			func() {
				expAccount = &types.QueryValidatorAccountResponse{
					AccountAddress: sdk.AccAddress(common.Address{}.Bytes()).String(),
				}
				req = &types.QueryValidatorAccountRequest{
					ConsAddress: "",
				}
			},
			false,
		},
		{
			"success",
			func() {
				expAccount = &types.QueryValidatorAccountResponse{
					AccountAddress: sdk.AccAddress(suite.address.Bytes()).String(),
					Sequence:       0,
					AccountNumber:  0,
				}
				req = &types.QueryValidatorAccountRequest{
					ConsAddress: suite.consAddress.String(),
				}
			},
			true,
		},
		{
			"success with seq and account number",
			func() {
				acc := suite.app.AccountKeeper.GetAccount(suite.ctx, suite.address.Bytes())
				suite.Require().NoError(acc.SetSequence(10))
				suite.Require().NoError(acc.SetAccountNumber(1))
				suite.app.AccountKeeper.SetAccount(suite.ctx, acc)

				expAccount = &types.QueryValidatorAccountResponse{
					AccountAddress: sdk.AccAddress(suite.address.Bytes()).String(),
					Sequence:       10,
					AccountNumber:  1,
				}
				req = &types.QueryValidatorAccountRequest{
					ConsAddress: suite.consAddress.String(),
				}
			},
			true,
		},
	}

	for _, tc := range testCases {
		suite.Run(fmt.Sprintf("Case %s", tc.msg), func() {
			suite.SetupTest() // reset

			tc.malleate()
			ctx := sdk.WrapSDKContext(suite.ctx)
			res, err := suite.queryClient.ValidatorAccount(ctx, req)

			if tc.expPass {
				suite.Require().NoError(err)
				suite.Require().NotNil(res)

				suite.Require().Equal(expAccount, res)
			} else {
				suite.Require().Error(err)
			}
		})
	}
}

func (suite *KeeperTestSuite) TestEstimateGas() {
	gasHelper := hexutil.Uint64(20000)

	var (
		args   types.TransactionArgs
		gasCap uint64
	)
	testCases := []struct {
		msg             string
		malleate        func()
		expPass         bool
		expGas          uint64
		enableFeemarket bool
	}{
		// should success, because transfer value is zero
		{"default args", func() {
			args = types.TransactionArgs{To: &common.Address{}}
		}, true, 21000, false},
		// should fail, because the default From address(zero address) don't have fund
		{"not enough balance", func() {
			args = types.TransactionArgs{To: &common.Address{}, Value: (*hexutil.Big)(big.NewInt(100))}
		}, false, 0, false},
		// should success, enough balance now
		{"enough balance", func() {
			args = types.TransactionArgs{To: &common.Address{}, From: &suite.address, Value: (*hexutil.Big)(big.NewInt(100))}
		}, false, 0, false},
		// should success, because gas limit lower than 21000 is ignored
		{"gas exceed allowance", func() {
			args = types.TransactionArgs{To: &common.Address{}, Gas: &gasHelper}
		}, true, 21000, false},
		// should fail, invalid gas cap
		{"gas exceed global allowance", func() {
			args = types.TransactionArgs{To: &common.Address{}}
			gasCap = 20000
		}, false, 0, false},
		// estimate gas of an erc20 contract deployment, the exact gas number is checked with geth
		{"contract deployment", func() {
			ctorArgs, err := types.ERC20Contract.ABI.Pack("", &suite.address, sdk.NewIntWithDecimal(1000, 18).BigInt())
			suite.Require().NoError(err)
			data := append(types.ERC20Contract.Bin, ctorArgs...)
			args = types.TransactionArgs{
				From: &suite.address,
				Data: (*hexutil.Bytes)(&data),
			}
		}, true, 1186778, false},
		// estimate gas of an erc20 transfer, the exact gas number is checked with geth
		{"erc20 transfer", func() {
			contractAddr := suite.DeployTestContract(suite.T(), suite.address, sdk.NewIntWithDecimal(1000, 18).BigInt())
			suite.Commit()
			transferData, err := types.ERC20Contract.ABI.Pack("transfer", common.HexToAddress("0x378c50D9264C63F3F92B806d4ee56E9D86FfB3Ec"), big.NewInt(1000))
			suite.Require().NoError(err)
			args = types.TransactionArgs{To: &contractAddr, From: &suite.address, Data: (*hexutil.Bytes)(&transferData)}
		}, true, 51880, false},

		// repeated tests with enableFeemarket
		{"default args w/ enableFeemarket", func() {
			args = types.TransactionArgs{To: &common.Address{}}
		}, true, 21000, true},
		{"not enough balance w/ enableFeemarket", func() {
			args = types.TransactionArgs{To: &common.Address{}, Value: (*hexutil.Big)(big.NewInt(100))}
		}, false, 0, true},
		{"enough balance w/ enableFeemarket", func() {
			args = types.TransactionArgs{To: &common.Address{}, From: &suite.address, Value: (*hexutil.Big)(big.NewInt(100))}
		}, false, 0, true},
		{"gas exceed allowance w/ enableFeemarket", func() {
			args = types.TransactionArgs{To: &common.Address{}, Gas: &gasHelper}
		}, true, 21000, true},
		{"gas exceed global allowance w/ enableFeemarket", func() {
			args = types.TransactionArgs{To: &common.Address{}}
			gasCap = 20000
		}, false, 0, true},
		{"contract deployment w/ enableFeemarket", func() {
			ctorArgs, err := types.ERC20Contract.ABI.Pack("", &suite.address, sdk.NewIntWithDecimal(1000, 18).BigInt())
			suite.Require().NoError(err)
			data := append(types.ERC20Contract.Bin, ctorArgs...)
			args = types.TransactionArgs{
				From: &suite.address,
				Data: (*hexutil.Bytes)(&data),
			}
		}, true, 1186778, true},
		{"erc20 transfer w/ enableFeemarket", func() {
			contractAddr := suite.DeployTestContract(suite.T(), suite.address, sdk.NewIntWithDecimal(1000, 18).BigInt())
			suite.Commit()
			transferData, err := types.ERC20Contract.ABI.Pack("transfer", common.HexToAddress("0x378c50D9264C63F3F92B806d4ee56E9D86FfB3Ec"), big.NewInt(1000))
			suite.Require().NoError(err)
			args = types.TransactionArgs{To: &contractAddr, From: &suite.address, Data: (*hexutil.Bytes)(&transferData)}
		}, true, 51880, true},
	}

	for _, tc := range testCases {
		suite.Run(fmt.Sprintf("Case %s", tc.msg), func() {
			suite.enableFeemarket = tc.enableFeemarket
			suite.SetupTest()
			gasCap = 25_000_000
			tc.malleate()

			args, err := json.Marshal(&args)
			suite.Require().NoError(err)
			req := types.EthCallRequest{
				Args:   args,
				GasCap: gasCap,
			}

			rsp, err := suite.queryClient.EstimateGas(sdk.WrapSDKContext(suite.ctx), &req)
			if tc.expPass {
				suite.Require().NoError(err)
				suite.Require().Equal(int64(tc.expGas), int64(rsp.Gas))
			} else {
				suite.Require().Error(err)
			}
		})
	}
	suite.enableFeemarket = false // reset flag
}

func (suite *KeeperTestSuite) TestTraceTx() {
	// TODO deploy contract that triggers internal transactions
	var (
		txMsg        *types.MsgEthereumTx
		traceConfig  *types.TraceConfig
		predecessors []*types.MsgEthereumTx
	)

	testCases := []struct {
		msg             string
		malleate        func()
		expPass         bool
		traceResponse   string
		enableFeemarket bool
	}{
		{
			msg: "default trace",
			malleate: func() {
				traceConfig = nil
				predecessors = []*types.MsgEthereumTx{}
			},
			expPass:       true,
			traceResponse: "{\"gas\":34828,\"failed\":false,\"returnValue\":\"0000000000000000000000000000000000000000000000000000000000000001\",\"structLogs\":[{\"pc\":0,\"op\":\"PUSH1\",\"gas\":",
		},
		{
			msg: "default trace with filtered response",
			malleate: func() {
				traceConfig = &types.TraceConfig{
					DisableStack:   true,
					DisableStorage: true,
					EnableMemory:   false,
				}
				predecessors = []*types.MsgEthereumTx{}
			},
			expPass:         true,
			traceResponse:   "{\"gas\":34828,\"failed\":false,\"returnValue\":\"0000000000000000000000000000000000000000000000000000000000000001\",\"structLogs\":[{\"pc\":0,\"op\":\"PUSH1\",\"gas\":",
			enableFeemarket: false,
		},
		{
			msg: "javascript tracer",
			malleate: func() {
				traceConfig = &types.TraceConfig{
					Tracer: "{data: [], fault: function(log) {}, step: function(log) { if(log.op.toString() == \"CALL\") this.data.push(log.stack.peek(0)); }, result: function() { return this.data; }}",
				}
				predecessors = []*types.MsgEthereumTx{}
			},
			expPass:       true,
			traceResponse: "[]",
		},
		{
			msg: "default trace with enableFeemarket",
			malleate: func() {
				traceConfig = &types.TraceConfig{
					DisableStack:   true,
					DisableStorage: true,
					EnableMemory:   false,
				}
				predecessors = []*types.MsgEthereumTx{}
			},
			expPass:         true,
			traceResponse:   "{\"gas\":34828,\"failed\":false,\"returnValue\":\"0000000000000000000000000000000000000000000000000000000000000001\",\"structLogs\":[{\"pc\":0,\"op\":\"PUSH1\",\"gas\":",
			enableFeemarket: true,
		},
		{
			msg: "javascript tracer with enableFeemarket",
			malleate: func() {
				traceConfig = &types.TraceConfig{
					Tracer: "{data: [], fault: function(log) {}, step: function(log) { if(log.op.toString() == \"CALL\") this.data.push(log.stack.peek(0)); }, result: function() { return this.data; }}",
				}
				predecessors = []*types.MsgEthereumTx{}
			},
			expPass:         true,
			traceResponse:   "[]",
			enableFeemarket: true,
		},
		{
			msg: "default tracer with predecessors",
			malleate: func() {
				traceConfig = nil

				// increase nonce to avoid address collision
				vmdb := suite.StateDB()
				vmdb.SetNonce(suite.address, vmdb.GetNonce(suite.address)+1)
				suite.Require().NoError(vmdb.Commit())

				contractAddr := suite.DeployTestContract(suite.T(), suite.address, sdk.NewIntWithDecimal(1000, 18).BigInt())
				suite.Commit()
				// Generate token transfer transaction
				firstTx := suite.TransferERC20Token(suite.T(), contractAddr, suite.address, common.HexToAddress("0x378c50D9264C63F3F92B806d4ee56E9D86FfB3Ec"), sdk.NewIntWithDecimal(1, 18).BigInt())
				txMsg = suite.TransferERC20Token(suite.T(), contractAddr, suite.address, common.HexToAddress("0x378c50D9264C63F3F92B806d4ee56E9D86FfB3Ec"), sdk.NewIntWithDecimal(1, 18).BigInt())
				suite.Commit()

				predecessors = append(predecessors, firstTx)
			},
			expPass:         true,
			traceResponse:   "{\"gas\":34828,\"failed\":false,\"returnValue\":\"0000000000000000000000000000000000000000000000000000000000000001\",\"structLogs\":[{\"pc\":0,\"op\":\"PUSH1\",\"gas\":",
			enableFeemarket: false,
		},
	}

	for _, tc := range testCases {
		suite.Run(fmt.Sprintf("Case %s", tc.msg), func() {
			suite.enableFeemarket = tc.enableFeemarket
			suite.SetupTest()
			// Deploy contract
			contractAddr := suite.DeployTestContract(suite.T(), suite.address, sdk.NewIntWithDecimal(1000, 18).BigInt())
			suite.Commit()
			// Generate token transfer transaction
			txMsg = suite.TransferERC20Token(suite.T(), contractAddr, suite.address, common.HexToAddress("0x378c50D9264C63F3F92B806d4ee56E9D86FfB3Ec"), sdk.NewIntWithDecimal(1, 18).BigInt())
			suite.Commit()

			tc.malleate()
			traceReq := types.QueryTraceTxRequest{
				Msg:          txMsg,
				TraceConfig:  traceConfig,
				Predecessors: predecessors,
			}
			res, err := suite.queryClient.TraceTx(sdk.WrapSDKContext(suite.ctx), &traceReq)
			suite.Require().NoError(err)

			if tc.expPass {
				suite.Require().NoError(err)
				// if data is to big, slice the result
				if len(res.Data) > 150 {
					suite.Require().Equal(tc.traceResponse, string(res.Data[:150]))
				} else {
					suite.Require().Equal(tc.traceResponse, string(res.Data))
				}
				if traceConfig == nil || traceConfig.Tracer == "" {
					var result ethlogger.ExecutionResult
					suite.Require().NoError(json.Unmarshal(res.Data, &result))
					suite.Require().Positive(result.Gas)
				}
			} else {
				suite.Require().Error(err)
			}
		})
	}

	suite.enableFeemarket = false // reset flag
}

func (suite *KeeperTestSuite) TestTraceBlock() {
	var (
		txs         []*types.MsgEthereumTx
		traceConfig *types.TraceConfig
	)

	testCases := []struct {
		msg             string
		malleate        func()
		expPass         bool
		traceResponse   string
		enableFeemarket bool
	}{
		{
			msg: "default trace",
			malleate: func() {
				traceConfig = nil
			},
			expPass:       true,
			traceResponse: "[{\"result\":{\"gas\":34828,\"failed\":false,\"returnValue\":\"0000000000000000000000000000000000000000000000000000000000000001\",\"structLogs\":[{\"pc\":0,\"op\":\"PU",
		},
		{
			msg: "filtered trace",
			malleate: func() {
				traceConfig = &types.TraceConfig{
					DisableStack:   true,
					DisableStorage: true,
					EnableMemory:   false,
				}
			},
			expPass:       true,
			traceResponse: "[{\"result\":{\"gas\":34828,\"failed\":false,\"returnValue\":\"0000000000000000000000000000000000000000000000000000000000000001\",\"structLogs\":[{\"pc\":0,\"op\":\"PU",
		},
		{
			msg: "javascript tracer",
			malleate: func() {
				traceConfig = &types.TraceConfig{
					Tracer: "{data: [], fault: function(log) {}, step: function(log) { if(log.op.toString() == \"CALL\") this.data.push(log.stack.peek(0)); }, result: function() { return this.data; }}",
				}
			},
			expPass:       true,
			traceResponse: "[{\"result\":[]}]",
		},
		{
			msg: "default trace with enableFeemarket and filtered return",
			malleate: func() {
				traceConfig = &types.TraceConfig{
					DisableStack:   true,
					DisableStorage: true,
					EnableMemory:   false,
				}
			},
			expPass:         true,
			traceResponse:   "[{\"result\":{\"gas\":34828,\"failed\":false,\"returnValue\":\"0000000000000000000000000000000000000000000000000000000000000001\",\"structLogs\":[{\"pc\":0,\"op\":\"PU",
			enableFeemarket: true,
		},
		{
			msg: "javascript tracer with enableFeemarket",
			malleate: func() {
				traceConfig = &types.TraceConfig{
					Tracer: "{data: [], fault: function(log) {}, step: function(log) { if(log.op.toString() == \"CALL\") this.data.push(log.stack.peek(0)); }, result: function() { return this.data; }}",
				}
			},
			expPass:         true,
			traceResponse:   "[{\"result\":[]}]",
			enableFeemarket: true,
		},
		{
			msg: "tracer with multiple transactions",
			malleate: func() {
				traceConfig = nil

				// increase nonce to avoid address collision
				vmdb := suite.StateDB()
				vmdb.SetNonce(suite.address, vmdb.GetNonce(suite.address)+1)
				suite.Require().NoError(vmdb.Commit())

				contractAddr := suite.DeployTestContract(suite.T(), suite.address, sdk.NewIntWithDecimal(1000, 18).BigInt())
				suite.Commit()
				// create multiple transactions in the same block
				firstTx := suite.TransferERC20Token(suite.T(), contractAddr, suite.address, common.HexToAddress("0x378c50D9264C63F3F92B806d4ee56E9D86FfB3Ec"), sdk.NewIntWithDecimal(1, 18).BigInt())
				secondTx := suite.TransferERC20Token(suite.T(), contractAddr, suite.address, common.HexToAddress("0x378c50D9264C63F3F92B806d4ee56E9D86FfB3Ec"), sdk.NewIntWithDecimal(1, 18).BigInt())
				suite.Commit()
				// overwrite txs to include only the ones on new block
				txs = append([]*types.MsgEthereumTx{}, firstTx, secondTx)
			},
			expPass:         true,
			traceResponse:   "[{\"result\":{\"gas\":34828,\"failed\":false,\"returnValue\":\"0000000000000000000000000000000000000000000000000000000000000001\",\"structLogs\":[{\"pc\":0,\"op\":\"PU",
			enableFeemarket: false,
		},
	}

	for _, tc := range testCases {
		suite.Run(fmt.Sprintf("Case %s", tc.msg), func() {
			txs = []*types.MsgEthereumTx{}
			suite.enableFeemarket = tc.enableFeemarket
			suite.SetupTest()
			// Deploy contract
			contractAddr := suite.DeployTestContract(suite.T(), suite.address, sdk.NewIntWithDecimal(1000, 18).BigInt())
			suite.Commit()
			// Generate token transfer transaction
			txMsg := suite.TransferERC20Token(suite.T(), contractAddr, suite.address, common.HexToAddress("0x378c50D9264C63F3F92B806d4ee56E9D86FfB3Ec"), sdk.NewIntWithDecimal(1, 18).BigInt())
			suite.Commit()

			txs = append(txs, txMsg)

			tc.malleate()
			traceReq := types.QueryTraceBlockRequest{
				Txs:         txs,
				TraceConfig: traceConfig,
			}
			res, err := suite.queryClient.TraceBlock(sdk.WrapSDKContext(suite.ctx), &traceReq)

			if tc.expPass {
				suite.Require().NoError(err)
				// if data is to big, slice the result
				if len(res.Data) > 150 {
					suite.Require().Equal(tc.traceResponse, string(res.Data[:150]))
				} else {
					suite.Require().Equal(tc.traceResponse, string(res.Data))
				}
			} else {
				suite.Require().Error(err)
			}
		})
	}

	suite.enableFeemarket = false // reset flag
}

func (suite *KeeperTestSuite) TestNonceInQuery() {
	suite.SetupTest()
	priv, err := ethsecp256k1.GenerateKey()
	suite.Require().NoError(err)
	address := common.BytesToAddress(priv.PubKey().Address().Bytes())
	suite.Require().Equal(uint64(0), suite.app.EvmKeeper.GetNonce(suite.ctx, address))
	supply := sdk.NewIntWithDecimal(1000, 18).BigInt()

	// accupy nonce 0
	_ = suite.DeployTestContract(suite.T(), address, supply)

	// do an EthCall/EstimateGas with nonce 0
	ctorArgs, err := types.ERC20Contract.ABI.Pack("", address, supply)
	data := append(types.ERC20Contract.Bin, ctorArgs...)
	args, err := json.Marshal(&types.TransactionArgs{
		From: &address,
		Data: (*hexutil.Bytes)(&data),
	})
	suite.Require().NoError(err)

	_, err = suite.queryClient.EstimateGas(sdk.WrapSDKContext(suite.ctx), &types.EthCallRequest{
		Args:   args,
		GasCap: uint64(config.DefaultGasCap),
	})
	suite.Require().NoError(err)

	_, err = suite.queryClient.EthCall(sdk.WrapSDKContext(suite.ctx), &types.EthCallRequest{
		Args:   args,
		GasCap: uint64(config.DefaultGasCap),
	})
	suite.Require().NoError(err)
}

func (suite *KeeperTestSuite) TestQueryBaseFee() {
	var (
		aux    sdk.Int
		expRes *types.QueryBaseFeeResponse
	)

	testCases := []struct {
		name            string
		malleate        func()
		expPass         bool
		enableFeemarket bool
		enableLondonHF  bool
	}{
		{
			"pass - default Base Fee",
			func() {
				initialBaseFee := sdk.NewInt(ethparams.InitialBaseFee)
				expRes = &types.QueryBaseFeeResponse{BaseFee: &initialBaseFee}
			},
			true, true, true,
		},
		{
			"pass - non-nil Base Fee",
			func() {
				baseFee := sdk.OneInt().BigInt()
				suite.app.FeeMarketKeeper.SetBaseFee(suite.ctx, baseFee)

				aux = sdk.NewIntFromBigInt(baseFee)
				expRes = &types.QueryBaseFeeResponse{BaseFee: &aux}
			},
			true, true, true,
		},
		{
			"pass - nil Base Fee when london hardfork not activated",
			func() {
				baseFee := sdk.OneInt().BigInt()
				suite.app.FeeMarketKeeper.SetBaseFee(suite.ctx, baseFee)

				expRes = &types.QueryBaseFeeResponse{}
			},
			true, true, false,
		},
		{
			"pass - zero Base Fee when feemarket not activated",
			func() {
				baseFee := sdk.ZeroInt()
				expRes = &types.QueryBaseFeeResponse{BaseFee: &baseFee}
			},
			true, false, true,
		},
	}
	for _, tc := range testCases {
		suite.Run(tc.name, func() {
			suite.enableFeemarket = tc.enableFeemarket
			suite.enableLondonHF = tc.enableLondonHF
			suite.SetupTest()

			tc.malleate()

			res, err := suite.queryClient.BaseFee(suite.ctx.Context(), &types.QueryBaseFeeRequest{})
			if tc.expPass {
				suite.Require().NotNil(res)
				suite.Require().Equal(expRes, res, tc.name)
				suite.Require().NoError(err)
			} else {
				suite.Require().Error(err)
			}
		})
	}
	suite.enableFeemarket = false
	suite.enableLondonHF = true
}
