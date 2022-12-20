package ante_test

import (
	"errors"
	"math/big"
	"strings"

	"github.com/cosmos/cosmos-sdk/types/tx/signing"
	authtypes "github.com/cosmos/cosmos-sdk/x/auth/types"

	sdk "github.com/cosmos/cosmos-sdk/types"

	"github.com/ethereum/go-ethereum/core/types"
	ethparams "github.com/ethereum/go-ethereum/params"
	"github.com/evmos/ethermint/tests"
	evmtypes "github.com/evmos/ethermint/x/evm/types"
)

func (suite AnteTestSuite) TestAnteHandler() {
	var acc authtypes.AccountI
	addr, privKey := tests.NewAddrKey()
	to := tests.GenerateAddress()

	setup := func() {
		suite.enableFeemarket = false
		suite.SetupTest() // reset

		acc = suite.app.AccountKeeper.NewAccountWithAddress(suite.ctx, addr.Bytes())
		suite.Require().NoError(acc.SetSequence(1))
		suite.app.AccountKeeper.SetAccount(suite.ctx, acc)

		suite.app.EvmKeeper.SetBalance(suite.ctx, addr, big.NewInt(10000000000))

		suite.app.FeeMarketKeeper.SetBaseFee(suite.ctx, big.NewInt(100))
	}

	testCases := []struct {
		name      string
		txFn      func() sdk.Tx
		checkTx   bool
		reCheckTx bool
		expPass   bool
	}{
		{
			"success - DeliverTx (contract)",
			func() sdk.Tx {
				signedContractTx := evmtypes.NewTxContract(
					suite.app.EvmKeeper.ChainID(),
					1,
					big.NewInt(10),
					100000,
					big.NewInt(150),
					big.NewInt(200),
					nil,
					nil,
					nil,
				)
				signedContractTx.From = addr.Hex()

				tx := suite.CreateTestTx(signedContractTx, privKey, 1, false)
				return tx
			},
			false, false, true,
		},
		{
			"success - CheckTx (contract)",
			func() sdk.Tx {
				signedContractTx := evmtypes.NewTxContract(
					suite.app.EvmKeeper.ChainID(),
					1,
					big.NewInt(10),
					100000,
					big.NewInt(150),
					big.NewInt(200),
					nil,
					nil,
					nil,
				)
				signedContractTx.From = addr.Hex()

				tx := suite.CreateTestTx(signedContractTx, privKey, 1, false)
				return tx
			},
			true, false, true,
		},
		{
			"success - ReCheckTx (contract)",
			func() sdk.Tx {
				signedContractTx := evmtypes.NewTxContract(
					suite.app.EvmKeeper.ChainID(),
					1,
					big.NewInt(10),
					100000,
					big.NewInt(150),
					big.NewInt(200),
					nil,
					nil,
					nil,
				)
				signedContractTx.From = addr.Hex()

				tx := suite.CreateTestTx(signedContractTx, privKey, 1, false)
				return tx
			},
			false, true, true,
		},
		{
			"success - DeliverTx",
			func() sdk.Tx {
				signedTx := evmtypes.NewTx(
					suite.app.EvmKeeper.ChainID(),
					1,
					&to,
					big.NewInt(10),
					100000,
					big.NewInt(150),
					big.NewInt(200),
					nil,
					nil,
					nil,
				)
				signedTx.From = addr.Hex()

				tx := suite.CreateTestTx(signedTx, privKey, 1, false)
				return tx
			},
			false, false, true,
		},
		{
			"success - CheckTx",
			func() sdk.Tx {
				signedTx := evmtypes.NewTx(
					suite.app.EvmKeeper.ChainID(),
					1,
					&to,
					big.NewInt(10),
					100000,
					big.NewInt(150),
					big.NewInt(200),
					nil,
					nil,
					nil,
				)
				signedTx.From = addr.Hex()

				tx := suite.CreateTestTx(signedTx, privKey, 1, false)
				return tx
			},
			true, false, true,
		},
		{
			"success - ReCheckTx",
			func() sdk.Tx {
				signedTx := evmtypes.NewTx(
					suite.app.EvmKeeper.ChainID(),
					1,
					&to,
					big.NewInt(10),
					100000,
					big.NewInt(150),
					big.NewInt(200),
					nil,
					nil,
					nil,
				)
				signedTx.From = addr.Hex()

				tx := suite.CreateTestTx(signedTx, privKey, 1, false)
				return tx
			}, false, true, true,
		},
		{
			"success - CheckTx (cosmos tx not signed)",
			func() sdk.Tx {
				signedTx := evmtypes.NewTx(
					suite.app.EvmKeeper.ChainID(),
					1,
					&to,
					big.NewInt(10),
					100000,
					big.NewInt(150),
					big.NewInt(200),
					nil,
					nil,
					nil,
				)
				signedTx.From = addr.Hex()

				tx := suite.CreateTestTx(signedTx, privKey, 1, false)
				return tx
			}, false, true, true,
		},
		{
			"fail - CheckTx (cosmos tx is not valid)",
			func() sdk.Tx {
				signedTx := evmtypes.NewTx(suite.app.EvmKeeper.ChainID(), 1, &to, big.NewInt(10), 100000, big.NewInt(1), nil, nil, nil, nil)
				signedTx.From = addr.Hex()

				txBuilder := suite.CreateTestTxBuilder(signedTx, privKey, 1, false)
				// bigger than MaxGasWanted
				txBuilder.SetGasLimit(uint64(1 << 63))
				return txBuilder.GetTx()
			}, true, false, false,
		},
		{
			"fail - CheckTx (memo too long)",
			func() sdk.Tx {
				signedTx := evmtypes.NewTx(suite.app.EvmKeeper.ChainID(), 1, &to, big.NewInt(10), 100000, big.NewInt(1), nil, nil, nil, nil)
				signedTx.From = addr.Hex()

				txBuilder := suite.CreateTestTxBuilder(signedTx, privKey, 1, false)
				txBuilder.SetMemo(strings.Repeat("*", 257))
				return txBuilder.GetTx()
			}, true, false, false,
		},
		{
			"fail - CheckTx (ExtensionOptionsEthereumTx not set)",
			func() sdk.Tx {
				signedTx := evmtypes.NewTx(suite.app.EvmKeeper.ChainID(), 1, &to, big.NewInt(10), 100000, big.NewInt(1), nil, nil, nil, nil)
				signedTx.From = addr.Hex()

				txBuilder := suite.CreateTestTxBuilder(signedTx, privKey, 1, false, true)
				return txBuilder.GetTx()
			}, true, false, false,
		},
		// Based on EVMBackend.SendTransaction, for cosmos tx, forcing null for some fields except ExtensionOptions, Fee, MsgEthereumTx
		// should be part of consensus
		{
			"fail - DeliverTx (cosmos tx signed)",
			func() sdk.Tx {
				nonce, err := suite.app.AccountKeeper.GetSequence(suite.ctx, acc.GetAddress())
				suite.Require().NoError(err)
				signedTx := evmtypes.NewTx(suite.app.EvmKeeper.ChainID(), nonce, &to, big.NewInt(10), 100000, big.NewInt(1), nil, nil, nil, nil)
				signedTx.From = addr.Hex()

				tx := suite.CreateTestTx(signedTx, privKey, 1, true)
				return tx
			}, false, false, false,
		},
		{
			"fail - DeliverTx (cosmos tx with memo)",
			func() sdk.Tx {
				nonce, err := suite.app.AccountKeeper.GetSequence(suite.ctx, acc.GetAddress())
				suite.Require().NoError(err)
				signedTx := evmtypes.NewTx(suite.app.EvmKeeper.ChainID(), nonce, &to, big.NewInt(10), 100000, big.NewInt(1), nil, nil, nil, nil)
				signedTx.From = addr.Hex()

				txBuilder := suite.CreateTestTxBuilder(signedTx, privKey, 1, false)
				txBuilder.SetMemo("memo for cosmos tx not allowed")
				return txBuilder.GetTx()
			}, false, false, false,
		},
		{
			"fail - DeliverTx (cosmos tx with timeoutheight)",
			func() sdk.Tx {
				nonce, err := suite.app.AccountKeeper.GetSequence(suite.ctx, acc.GetAddress())
				suite.Require().NoError(err)
				signedTx := evmtypes.NewTx(suite.app.EvmKeeper.ChainID(), nonce, &to, big.NewInt(10), 100000, big.NewInt(1), nil, nil, nil, nil)
				signedTx.From = addr.Hex()

				txBuilder := suite.CreateTestTxBuilder(signedTx, privKey, 1, false)
				txBuilder.SetTimeoutHeight(10)
				return txBuilder.GetTx()
			}, false, false, false,
		},
		{
			"fail - DeliverTx (invalid fee amount)",
			func() sdk.Tx {
				nonce, err := suite.app.AccountKeeper.GetSequence(suite.ctx, acc.GetAddress())
				suite.Require().NoError(err)
				signedTx := evmtypes.NewTx(suite.app.EvmKeeper.ChainID(), nonce, &to, big.NewInt(10), 100000, big.NewInt(1), nil, nil, nil, nil)
				signedTx.From = addr.Hex()

				txBuilder := suite.CreateTestTxBuilder(signedTx, privKey, 1, false)

				txData, err := evmtypes.UnpackTxData(signedTx.Data)
				suite.Require().NoError(err)

				expFee := txData.Fee()
				invalidFee := new(big.Int).Add(expFee, big.NewInt(1))
				invalidFeeAmount := sdk.Coins{sdk.NewCoin(evmtypes.DefaultEVMDenom, sdk.NewIntFromBigInt(invalidFee))}
				txBuilder.SetFeeAmount(invalidFeeAmount)
				return txBuilder.GetTx()
			}, false, false, false,
		},
		{
			"fail - DeliverTx (invalid fee gaslimit)",
			func() sdk.Tx {
				nonce, err := suite.app.AccountKeeper.GetSequence(suite.ctx, acc.GetAddress())
				suite.Require().NoError(err)
				signedTx := evmtypes.NewTx(suite.app.EvmKeeper.ChainID(), nonce, &to, big.NewInt(10), 100000, big.NewInt(1), nil, nil, nil, nil)
				signedTx.From = addr.Hex()

				txBuilder := suite.CreateTestTxBuilder(signedTx, privKey, 1, false)

				expGasLimit := signedTx.GetGas()
				invalidGasLimit := expGasLimit + 1
				txBuilder.SetGasLimit(invalidGasLimit)
				return txBuilder.GetTx()
			}, false, false, false,
		},
		{
			"success - DeliverTx EIP712 signed Cosmos Tx with MsgSend",
			func() sdk.Tx {
				from := acc.GetAddress()
				amount := sdk.NewCoins(sdk.NewCoin(evmtypes.DefaultEVMDenom, sdk.NewInt(20)))
				gas := uint64(200000)
				txBuilder := suite.CreateTestEIP712TxBuilderMsgSend(from, privKey, "ethermint_9000-1", gas, amount)
				return txBuilder.GetTx()
			}, false, false, true,
		},
		{
			"success - DeliverTx EIP712 signed Cosmos Tx with DelegateMsg",
			func() sdk.Tx {
				from := acc.GetAddress()
				coinAmount := sdk.NewCoin(evmtypes.DefaultEVMDenom, sdk.NewInt(20))
				amount := sdk.NewCoins(coinAmount)
				gas := uint64(200000)
				txBuilder := suite.CreateTestEIP712TxBuilderMsgDelegate(from, privKey, "ethermint_9000-1", gas, amount)
				return txBuilder.GetTx()
			}, false, false, true,
		},
		{
			"fails - DeliverTx EIP712 signed Cosmos Tx with wrong Chain ID",
			func() sdk.Tx {
				from := acc.GetAddress()
				amount := sdk.NewCoins(sdk.NewCoin(evmtypes.DefaultEVMDenom, sdk.NewInt(20)))
				gas := uint64(200000)
				txBuilder := suite.CreateTestEIP712TxBuilderMsgSend(from, privKey, "ethermint_9002-1", gas, amount)
				return txBuilder.GetTx()
			}, false, false, false,
		},
		{
			"fails - DeliverTx EIP712 signed Cosmos Tx with different gas fees",
			func() sdk.Tx {
				from := acc.GetAddress()
				amount := sdk.NewCoins(sdk.NewCoin(evmtypes.DefaultEVMDenom, sdk.NewInt(20)))
				gas := uint64(200000)
				txBuilder := suite.CreateTestEIP712TxBuilderMsgSend(from, privKey, "ethermint_9001-1", gas, amount)
				txBuilder.SetGasLimit(uint64(300000))
				txBuilder.SetFeeAmount(sdk.NewCoins(sdk.NewCoin(evmtypes.DefaultEVMDenom, sdk.NewInt(30))))
				return txBuilder.GetTx()
			}, false, false, false,
		},
		{
			"fails - DeliverTx EIP712 signed Cosmos Tx with empty signature",
			func() sdk.Tx {
				from := acc.GetAddress()
				amount := sdk.NewCoins(sdk.NewCoin(evmtypes.DefaultEVMDenom, sdk.NewInt(20)))
				gas := uint64(200000)
				txBuilder := suite.CreateTestEIP712TxBuilderMsgSend(from, privKey, "ethermint_9001-1", gas, amount)
				sigsV2 := signing.SignatureV2{}
				txBuilder.SetSignatures(sigsV2)
				return txBuilder.GetTx()
			}, false, false, false,
		},
		{
			"fails - DeliverTx EIP712 signed Cosmos Tx with invalid sequence",
			func() sdk.Tx {
				from := acc.GetAddress()
				amount := sdk.NewCoins(sdk.NewCoin(evmtypes.DefaultEVMDenom, sdk.NewInt(20)))
				gas := uint64(200000)
				txBuilder := suite.CreateTestEIP712TxBuilderMsgSend(from, privKey, "ethermint_9001-1", gas, amount)
				nonce, err := suite.app.AccountKeeper.GetSequence(suite.ctx, acc.GetAddress())
				suite.Require().NoError(err)
				sigsV2 := signing.SignatureV2{
					PubKey: privKey.PubKey(),
					Data: &signing.SingleSignatureData{
						SignMode: signing.SignMode_SIGN_MODE_LEGACY_AMINO_JSON,
					},
					Sequence: nonce - 1,
				}
				txBuilder.SetSignatures(sigsV2)
				return txBuilder.GetTx()
			}, false, false, false,
		},
		{
			"fails - DeliverTx EIP712 signed Cosmos Tx with invalid signMode",
			func() sdk.Tx {
				from := acc.GetAddress()
				amount := sdk.NewCoins(sdk.NewCoin(evmtypes.DefaultEVMDenom, sdk.NewInt(20)))
				gas := uint64(200000)
				txBuilder := suite.CreateTestEIP712TxBuilderMsgSend(from, privKey, "ethermint_9001-1", gas, amount)
				nonce, err := suite.app.AccountKeeper.GetSequence(suite.ctx, acc.GetAddress())
				suite.Require().NoError(err)
				sigsV2 := signing.SignatureV2{
					PubKey: privKey.PubKey(),
					Data: &signing.SingleSignatureData{
						SignMode: signing.SignMode_SIGN_MODE_UNSPECIFIED,
					},
					Sequence: nonce,
				}
				txBuilder.SetSignatures(sigsV2)
				return txBuilder.GetTx()
			}, false, false, false,
		},
		{
			"fails - invalid from",
			func() sdk.Tx {
				msg := evmtypes.NewTxContract(
					suite.app.EvmKeeper.ChainID(),
					1,
					big.NewInt(10),
					100000,
					big.NewInt(150),
					big.NewInt(200),
					nil,
					nil,
					nil,
				)
				msg.From = addr.Hex()
				tx := suite.CreateTestTx(msg, privKey, 1, false)
				msg = tx.GetMsgs()[0].(*evmtypes.MsgEthereumTx)
				msg.From = addr.Hex()
				return tx
			}, true, false, false,
		},
	}

	for _, tc := range testCases {
		suite.Run(tc.name, func() {
			setup()

			suite.ctx = suite.ctx.WithIsCheckTx(tc.checkTx).WithIsReCheckTx(tc.reCheckTx)

			// expConsumed := params.TxGasContractCreation + params.TxGas
			_, err := suite.anteHandler(suite.ctx, tc.txFn(), false)

			// suite.Require().Equal(consumed, ctx.GasMeter().GasConsumed())

			if tc.expPass {
				suite.Require().NoError(err)
				// suite.Require().Equal(int(expConsumed), int(suite.ctx.GasMeter().GasConsumed()))
			} else {
				suite.Require().Error(err)
			}
		})
	}
}

func (suite AnteTestSuite) TestAnteHandlerWithDynamicTxFee() {
	addr, privKey := tests.NewAddrKey()
	to := tests.GenerateAddress()

	testCases := []struct {
		name           string
		txFn           func() sdk.Tx
		enableLondonHF bool
		checkTx        bool
		reCheckTx      bool
		expPass        bool
	}{
		{
			"success - DeliverTx (contract)",
			func() sdk.Tx {
				signedContractTx := evmtypes.NewTxContract(
					suite.app.EvmKeeper.ChainID(),
					1,
					big.NewInt(10),
					100000,
					nil,
					big.NewInt(ethparams.InitialBaseFee+1),
					big.NewInt(1),
					nil,
					&types.AccessList{},
				)
				signedContractTx.From = addr.Hex()

				tx := suite.CreateTestTx(signedContractTx, privKey, 1, false)
				return tx
			},
			true,
			false, false, true,
		},
		{
			"success - CheckTx (contract)",
			func() sdk.Tx {
				signedContractTx := evmtypes.NewTxContract(
					suite.app.EvmKeeper.ChainID(),
					1,
					big.NewInt(10),
					100000,
					nil,
					big.NewInt(ethparams.InitialBaseFee+1),
					big.NewInt(1),
					nil,
					&types.AccessList{},
				)
				signedContractTx.From = addr.Hex()

				tx := suite.CreateTestTx(signedContractTx, privKey, 1, false)
				return tx
			},
			true,
			true, false, true,
		},
		{
			"success - ReCheckTx (contract)",
			func() sdk.Tx {
				signedContractTx := evmtypes.NewTxContract(
					suite.app.EvmKeeper.ChainID(),
					1,
					big.NewInt(10),
					100000,
					nil,
					big.NewInt(ethparams.InitialBaseFee+1),
					big.NewInt(1),
					nil,
					&types.AccessList{},
				)
				signedContractTx.From = addr.Hex()

				tx := suite.CreateTestTx(signedContractTx, privKey, 1, false)
				return tx
			},
			true,
			false, true, true,
		},
		{
			"success - DeliverTx",
			func() sdk.Tx {
				signedTx := evmtypes.NewTx(
					suite.app.EvmKeeper.ChainID(),
					1,
					&to,
					big.NewInt(10),
					100000,
					nil,
					big.NewInt(ethparams.InitialBaseFee+1),
					big.NewInt(1),
					nil,
					&types.AccessList{},
				)
				signedTx.From = addr.Hex()

				tx := suite.CreateTestTx(signedTx, privKey, 1, false)
				return tx
			},
			true,
			false, false, true,
		},
		{
			"success - CheckTx",
			func() sdk.Tx {
				signedTx := evmtypes.NewTx(
					suite.app.EvmKeeper.ChainID(),
					1,
					&to,
					big.NewInt(10),
					100000,
					nil,
					big.NewInt(ethparams.InitialBaseFee+1),
					big.NewInt(1),
					nil,
					&types.AccessList{},
				)
				signedTx.From = addr.Hex()

				tx := suite.CreateTestTx(signedTx, privKey, 1, false)
				return tx
			},
			true,
			true, false, true,
		},
		{
			"success - ReCheckTx",
			func() sdk.Tx {
				signedTx := evmtypes.NewTx(
					suite.app.EvmKeeper.ChainID(),
					1,
					&to,
					big.NewInt(10),
					100000,
					nil,
					big.NewInt(ethparams.InitialBaseFee+1),
					big.NewInt(1),
					nil,
					&types.AccessList{},
				)
				signedTx.From = addr.Hex()

				tx := suite.CreateTestTx(signedTx, privKey, 1, false)
				return tx
			},
			true,
			false, true, true,
		},
		{
			"success - CheckTx (cosmos tx not signed)",
			func() sdk.Tx {
				signedTx := evmtypes.NewTx(
					suite.app.EvmKeeper.ChainID(),
					1,
					&to,
					big.NewInt(10),
					100000,
					nil,
					big.NewInt(ethparams.InitialBaseFee+1),
					big.NewInt(1),
					nil,
					&types.AccessList{},
				)
				signedTx.From = addr.Hex()

				tx := suite.CreateTestTx(signedTx, privKey, 1, false)
				return tx
			},
			true,
			false, true, true,
		},
		{
			"fail - CheckTx (cosmos tx is not valid)",
			func() sdk.Tx {
				signedTx := evmtypes.NewTx(
					suite.app.EvmKeeper.ChainID(),
					1,
					&to,
					big.NewInt(10),
					100000,
					nil,
					big.NewInt(ethparams.InitialBaseFee+1),
					big.NewInt(1),
					nil,
					&types.AccessList{},
				)
				signedTx.From = addr.Hex()

				txBuilder := suite.CreateTestTxBuilder(signedTx, privKey, 1, false)
				// bigger than MaxGasWanted
				txBuilder.SetGasLimit(uint64(1 << 63))
				return txBuilder.GetTx()
			},
			true,
			true, false, false,
		},
		{
			"fail - CheckTx (memo too long)",
			func() sdk.Tx {
				signedTx := evmtypes.NewTx(
					suite.app.EvmKeeper.ChainID(),
					1,
					&to,
					big.NewInt(10),
					100000,
					nil,
					big.NewInt(ethparams.InitialBaseFee+1),
					big.NewInt(1),
					nil,
					&types.AccessList{},
				)
				signedTx.From = addr.Hex()

				txBuilder := suite.CreateTestTxBuilder(signedTx, privKey, 1, false)
				txBuilder.SetMemo(strings.Repeat("*", 257))
				return txBuilder.GetTx()
			},
			true,
			true, false, false,
		},
		{
			"fail - DynamicFeeTx without london hark fork",
			func() sdk.Tx {
				signedContractTx := evmtypes.NewTxContract(
					suite.app.EvmKeeper.ChainID(),
					1,
					big.NewInt(10),
					100000,
					nil,
					big.NewInt(ethparams.InitialBaseFee+1),
					big.NewInt(1),
					nil,
					&types.AccessList{},
				)
				signedContractTx.From = addr.Hex()

				tx := suite.CreateTestTx(signedContractTx, privKey, 1, false)
				return tx
			},
			false,
			false, false, false,
		},
	}

	for _, tc := range testCases {
		suite.Run(tc.name, func() {
			suite.enableFeemarket = true
			suite.enableLondonHF = tc.enableLondonHF
			suite.SetupTest() // reset

			acc := suite.app.AccountKeeper.NewAccountWithAddress(suite.ctx, addr.Bytes())
			suite.Require().NoError(acc.SetSequence(1))
			suite.app.AccountKeeper.SetAccount(suite.ctx, acc)

			suite.ctx = suite.ctx.WithIsCheckTx(tc.checkTx).WithIsReCheckTx(tc.reCheckTx)
			suite.app.EvmKeeper.SetBalance(suite.ctx, addr, big.NewInt((ethparams.InitialBaseFee+10)*100000))
			_, err := suite.anteHandler(suite.ctx, tc.txFn(), false)
			if tc.expPass {
				suite.Require().NoError(err)
			} else {
				suite.Require().Error(err)
			}
		})
	}
	suite.enableFeemarket = false
	suite.enableLondonHF = true
}

func (suite AnteTestSuite) TestAnteHandlerWithParams() {
	addr, privKey := tests.NewAddrKey()
	to := tests.GenerateAddress()

	testCases := []struct {
		name         string
		txFn         func() sdk.Tx
		enableCall   bool
		enableCreate bool
		expErr       error
	}{
		{
			"fail - Contract Creation Disabled",
			func() sdk.Tx {
				signedContractTx := evmtypes.NewTxContract(
					suite.app.EvmKeeper.ChainID(),
					1,
					big.NewInt(10),
					100000,
					nil,
					big.NewInt(ethparams.InitialBaseFee+1),
					big.NewInt(1),
					nil,
					&types.AccessList{},
				)
				signedContractTx.From = addr.Hex()

				tx := suite.CreateTestTx(signedContractTx, privKey, 1, false)
				return tx
			},
			true, false,
			evmtypes.ErrCreateDisabled,
		},
		{
			"success - Contract Creation Enabled",
			func() sdk.Tx {
				signedContractTx := evmtypes.NewTxContract(
					suite.app.EvmKeeper.ChainID(),
					1,
					big.NewInt(10),
					100000,
					nil,
					big.NewInt(ethparams.InitialBaseFee+1),
					big.NewInt(1),
					nil,
					&types.AccessList{},
				)
				signedContractTx.From = addr.Hex()

				tx := suite.CreateTestTx(signedContractTx, privKey, 1, false)
				return tx
			},
			true, true,
			nil,
		},
		{
			"fail - EVM Call Disabled",
			func() sdk.Tx {
				signedTx := evmtypes.NewTx(
					suite.app.EvmKeeper.ChainID(),
					1,
					&to,
					big.NewInt(10),
					100000,
					nil,
					big.NewInt(ethparams.InitialBaseFee+1),
					big.NewInt(1),
					nil,
					&types.AccessList{},
				)
				signedTx.From = addr.Hex()

				tx := suite.CreateTestTx(signedTx, privKey, 1, false)
				return tx
			},
			false, true,
			evmtypes.ErrCallDisabled,
		},
		{
			"success - EVM Call Enabled",
			func() sdk.Tx {
				signedTx := evmtypes.NewTx(
					suite.app.EvmKeeper.ChainID(),
					1,
					&to,
					big.NewInt(10),
					100000,
					nil,
					big.NewInt(ethparams.InitialBaseFee+1),
					big.NewInt(1),
					nil,
					&types.AccessList{},
				)
				signedTx.From = addr.Hex()

				tx := suite.CreateTestTx(signedTx, privKey, 1, false)
				return tx
			},
			true, true,
			nil,
		},
	}

	for _, tc := range testCases {
		suite.Run(tc.name, func() {
			suite.evmParamsOption = func(params *evmtypes.Params) {
				params.EnableCall = tc.enableCall
				params.EnableCreate = tc.enableCreate
			}
			suite.SetupTest() // reset

			acc := suite.app.AccountKeeper.NewAccountWithAddress(suite.ctx, addr.Bytes())
			suite.Require().NoError(acc.SetSequence(1))
			suite.app.AccountKeeper.SetAccount(suite.ctx, acc)

			suite.ctx = suite.ctx.WithIsCheckTx(true)
			suite.app.EvmKeeper.SetBalance(suite.ctx, addr, big.NewInt((ethparams.InitialBaseFee+10)*100000))
			_, err := suite.anteHandler(suite.ctx, tc.txFn(), false)
			if tc.expErr == nil {
				suite.Require().NoError(err)
			} else {
				suite.Require().Error(err)
				suite.Require().True(errors.Is(err, tc.expErr))
			}
		})
	}
	suite.evmParamsOption = nil
}
