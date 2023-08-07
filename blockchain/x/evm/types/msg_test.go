package types_test

import (
	"fmt"
	"math/big"
	"reflect"
	"strings"
	"testing"

	sdkmath "cosmossdk.io/math"
	"github.com/stretchr/testify/suite"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/crypto/keyring"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/evmos/ethermint/crypto/ethsecp256k1"
	"github.com/evmos/ethermint/tests"

	"github.com/ethereum/go-ethereum/common"
	ethtypes "github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/crypto"

	"github.com/evmos/ethermint/app"
	"github.com/evmos/ethermint/encoding"
	"github.com/evmos/ethermint/x/evm/types"
)

const invalidFromAddress = "0x0000"

type MsgsTestSuite struct {
	suite.Suite

	signer        keyring.Signer
	from          common.Address
	to            common.Address
	chainID       *big.Int
	hundredBigInt *big.Int

	clientCtx client.Context
}

func TestMsgsTestSuite(t *testing.T) {
	suite.Run(t, new(MsgsTestSuite))
}

func (suite *MsgsTestSuite) SetupTest() {
	from, privFrom := tests.NewAddrKey()

	suite.signer = tests.NewSigner(privFrom)
	suite.from = from
	suite.to = tests.GenerateAddress()
	suite.chainID = big.NewInt(1)
	suite.hundredBigInt = big.NewInt(100)

	encodingConfig := encoding.MakeConfig(app.ModuleBasics)
	suite.clientCtx = client.Context{}.WithTxConfig(encodingConfig.TxConfig)
}

func (suite *MsgsTestSuite) TestMsgEthereumTx_Constructor() {
	msg := types.NewTx(nil, 0, &suite.to, nil, 100000, nil, nil, nil, []byte("test"), nil)

	// suite.Require().Equal(msg.Data.To, suite.to.Hex())
	suite.Require().Equal(msg.Route(), types.RouterKey)
	suite.Require().Equal(msg.Type(), types.TypeMsgEthereumTx)
	// suite.Require().NotNil(msg.To())
	suite.Require().Equal(msg.GetMsgs(), []sdk.Msg{msg})
	suite.Require().Panics(func() { msg.GetSigners() })
	suite.Require().Panics(func() { msg.GetSignBytes() })

	msg = types.NewTxContract(nil, 0, nil, 100000, nil, nil, nil, []byte("test"), nil)
	suite.Require().NotNil(msg)
	// suite.Require().Empty(msg.Data.To)
	// suite.Require().Nil(msg.To())
}

func (suite *MsgsTestSuite) TestMsgEthereumTx_BuildTx() {
	testCases := []struct {
		name     string
		msg      *types.MsgEthereumTx
		expError bool
	}{
		{
			"build tx - pass",
			types.NewTx(nil, 0, &suite.to, nil, 100000, big.NewInt(1), big.NewInt(1), big.NewInt(0), []byte("test"), nil),
			false,
		},
		{
			"build tx - fail: nil data",
			types.NewTx(nil, 0, &suite.to, nil, 100000, big.NewInt(1), big.NewInt(1), big.NewInt(0), []byte("test"), nil),
			true,
		},
	}

	for _, tc := range testCases {
		if strings.Contains(tc.name, "nil data") {
			tc.msg.Data = nil
		}

		tx, err := tc.msg.BuildTx(suite.clientCtx.TxConfig.NewTxBuilder(), "aphoton")
		if tc.expError {
			suite.Require().Error(err)
		} else {
			suite.Require().NoError(err)

			suite.Require().Empty(tx.GetMemo())
			suite.Require().Empty(tx.GetTimeoutHeight())
			suite.Require().Equal(uint64(100000), tx.GetGas())
			suite.Require().Equal(sdk.NewCoins(sdk.NewCoin("aphoton", sdkmath.NewInt(100000))), tx.GetFee())
		}
	}
}

func (suite *MsgsTestSuite) TestMsgEthereumTx_ValidateBasic() {
	hundredInt := big.NewInt(100)
	zeroInt := big.NewInt(0)
	minusOneInt := big.NewInt(-1)
	exp_2_255 := new(big.Int).Exp(big.NewInt(2), big.NewInt(255), nil)

	testCases := []struct {
		msg        string
		to         string
		amount     *big.Int
		gasLimit   uint64
		gasPrice   *big.Int
		gasFeeCap  *big.Int
		gasTipCap  *big.Int
		from       string
		accessList *ethtypes.AccessList
		chainID    *big.Int
		expectPass bool
	}{
		{
			msg:        "pass with recipient - Legacy Tx",
			to:         suite.to.Hex(),
			amount:     hundredInt,
			gasLimit:   1000,
			gasPrice:   hundredInt,
			gasFeeCap:  nil,
			gasTipCap:  nil,
			expectPass: true,
		},
		{
			msg:        "pass with recipient - AccessList Tx",
			to:         suite.to.Hex(),
			amount:     hundredInt,
			gasLimit:   1000,
			gasPrice:   zeroInt,
			gasFeeCap:  nil,
			gasTipCap:  nil,
			accessList: &ethtypes.AccessList{},
			chainID:    hundredInt,
			expectPass: true,
		},
		{
			msg:        "pass with recipient - DynamicFee Tx",
			to:         suite.to.Hex(),
			amount:     hundredInt,
			gasLimit:   1000,
			gasPrice:   zeroInt,
			gasFeeCap:  hundredInt,
			gasTipCap:  zeroInt,
			accessList: &ethtypes.AccessList{},
			chainID:    hundredInt,
			expectPass: true,
		},
		{
			msg:        "pass contract - Legacy Tx",
			to:         "",
			amount:     hundredInt,
			gasLimit:   1000,
			gasPrice:   hundredInt,
			gasFeeCap:  nil,
			gasTipCap:  nil,
			expectPass: true,
		},
		{
			msg:        "invalid recipient",
			to:         invalidFromAddress,
			amount:     minusOneInt,
			gasLimit:   1000,
			gasPrice:   hundredInt,
			expectPass: false,
		},
		{
			msg:        "nil amount - Legacy Tx",
			to:         suite.to.Hex(),
			amount:     nil,
			gasLimit:   1000,
			gasPrice:   hundredInt,
			gasFeeCap:  nil,
			gasTipCap:  nil,
			expectPass: true,
		},
		{
			msg:        "negative amount - Legacy Tx",
			to:         suite.to.Hex(),
			amount:     minusOneInt,
			gasLimit:   1000,
			gasPrice:   hundredInt,
			gasFeeCap:  nil,
			gasTipCap:  nil,
			expectPass: false,
		},
		{
			msg:        "zero gas limit - Legacy Tx",
			to:         suite.to.Hex(),
			amount:     hundredInt,
			gasLimit:   0,
			gasPrice:   hundredInt,
			gasFeeCap:  nil,
			gasTipCap:  nil,
			expectPass: false,
		},
		{
			msg:        "nil gas price - Legacy Tx",
			to:         suite.to.Hex(),
			amount:     hundredInt,
			gasLimit:   1000,
			gasPrice:   nil,
			gasFeeCap:  nil,
			gasTipCap:  nil,
			expectPass: false,
		},
		{
			msg:        "negative gas price - Legacy Tx",
			to:         suite.to.Hex(),
			amount:     hundredInt,
			gasLimit:   1000,
			gasPrice:   minusOneInt,
			gasFeeCap:  nil,
			gasTipCap:  nil,
			expectPass: false,
		},
		{
			msg:        "zero gas price - Legacy Tx",
			to:         suite.to.Hex(),
			amount:     hundredInt,
			gasLimit:   1000,
			gasPrice:   zeroInt,
			gasFeeCap:  nil,
			gasTipCap:  nil,
			expectPass: true,
		},
		{
			msg:        "invalid from address - Legacy Tx",
			to:         suite.to.Hex(),
			amount:     hundredInt,
			gasLimit:   1000,
			gasPrice:   zeroInt,
			gasFeeCap:  nil,
			gasTipCap:  nil,
			from:       invalidFromAddress,
			expectPass: false,
		},
		{
			msg:        "out of bound gas fee - Legacy Tx",
			to:         suite.to.Hex(),
			amount:     hundredInt,
			gasLimit:   1000,
			gasPrice:   exp_2_255,
			gasFeeCap:  nil,
			gasTipCap:  nil,
			expectPass: false,
		},
		{
			msg:        "nil amount - AccessListTx",
			to:         suite.to.Hex(),
			amount:     nil,
			gasLimit:   1000,
			gasPrice:   hundredInt,
			gasFeeCap:  nil,
			gasTipCap:  nil,
			accessList: &ethtypes.AccessList{},
			chainID:    hundredInt,
			expectPass: true,
		},
		{
			msg:        "negative amount - AccessListTx",
			to:         suite.to.Hex(),
			amount:     minusOneInt,
			gasLimit:   1000,
			gasPrice:   hundredInt,
			gasFeeCap:  nil,
			gasTipCap:  nil,
			accessList: &ethtypes.AccessList{},
			chainID:    nil,
			expectPass: false,
		},
		{
			msg:        "zero gas limit - AccessListTx",
			to:         suite.to.Hex(),
			amount:     hundredInt,
			gasLimit:   0,
			gasPrice:   zeroInt,
			gasFeeCap:  nil,
			gasTipCap:  nil,
			accessList: &ethtypes.AccessList{},
			chainID:    hundredInt,
			expectPass: false,
		},
		{
			msg:        "nil gas price - AccessListTx",
			to:         suite.to.Hex(),
			amount:     hundredInt,
			gasLimit:   1000,
			gasPrice:   nil,
			gasFeeCap:  nil,
			gasTipCap:  nil,
			accessList: &ethtypes.AccessList{},
			chainID:    hundredInt,
			expectPass: false,
		},
		{
			msg:        "negative gas price - AccessListTx",
			to:         suite.to.Hex(),
			amount:     hundredInt,
			gasLimit:   1000,
			gasPrice:   minusOneInt,
			gasFeeCap:  nil,
			gasTipCap:  nil,
			accessList: &ethtypes.AccessList{},
			chainID:    nil,
			expectPass: false,
		},
		{
			msg:        "zero gas price - AccessListTx",
			to:         suite.to.Hex(),
			amount:     hundredInt,
			gasLimit:   1000,
			gasPrice:   zeroInt,
			gasFeeCap:  nil,
			gasTipCap:  nil,
			accessList: &ethtypes.AccessList{},
			chainID:    hundredInt,
			expectPass: true,
		},
		{
			msg:        "invalid from address - AccessListTx",
			to:         suite.to.Hex(),
			amount:     hundredInt,
			gasLimit:   1000,
			gasPrice:   zeroInt,
			gasFeeCap:  nil,
			gasTipCap:  nil,
			from:       invalidFromAddress,
			accessList: &ethtypes.AccessList{},
			chainID:    hundredInt,
			expectPass: false,
		},
		{
			msg:        "chain ID not set on AccessListTx",
			to:         suite.to.Hex(),
			amount:     hundredInt,
			gasLimit:   1000,
			gasPrice:   zeroInt,
			gasFeeCap:  nil,
			gasTipCap:  nil,
			accessList: &ethtypes.AccessList{},
			chainID:    nil,
			expectPass: false,
		},
		{
			msg:        "nil tx.Data - AccessList Tx",
			to:         suite.to.Hex(),
			amount:     hundredInt,
			gasLimit:   1000,
			gasPrice:   zeroInt,
			gasFeeCap:  nil,
			gasTipCap:  nil,
			accessList: &ethtypes.AccessList{},
			chainID:    hundredInt,
			expectPass: false,
		},
	}

	for _, tc := range testCases {
		suite.Run(tc.msg, func() {
			to := common.HexToAddress(tc.from)

			tx := types.NewTx(tc.chainID, 1, &to, tc.amount, tc.gasLimit, tc.gasPrice, tc.gasFeeCap, tc.gasTipCap, nil, tc.accessList)
			tx.From = tc.from

			// apply nil assignment here to test ValidateBasic function instead of NewTx
			if strings.Contains(tc.msg, "nil tx.Data") {
				tx.Data = nil
			}

			err := tx.ValidateBasic()

			if tc.expectPass {
				suite.Require().NoError(err)
			} else {
				suite.Require().Error(err)
			}
		})
	}
}

func (suite *MsgsTestSuite) TestMsgEthereumTx_ValidateBasicAdvanced() {
	hundredInt := big.NewInt(100)
	testCases := []struct {
		msg        string
		msgBuilder func() *types.MsgEthereumTx
		expectPass bool
	}{
		{
			"fails - invalid tx hash",
			func() *types.MsgEthereumTx {
				msg := types.NewTxContract(
					hundredInt,
					1,
					big.NewInt(10),
					100000,
					big.NewInt(150),
					big.NewInt(200),
					nil,
					nil,
					nil,
				)
				msg.Hash = "0x00"
				return msg
			},
			false,
		},
		{
			"fails - invalid size",
			func() *types.MsgEthereumTx {
				msg := types.NewTxContract(
					hundredInt,
					1,
					big.NewInt(10),
					100000,
					big.NewInt(150),
					big.NewInt(200),
					nil,
					nil,
					nil,
				)
				msg.Size_ = 1
				return msg
			},
			false,
		},
	}

	for _, tc := range testCases {
		suite.Run(tc.msg, func() {
			err := tc.msgBuilder().ValidateBasic()
			if tc.expectPass {
				suite.Require().NoError(err)
			} else {
				suite.Require().Error(err)
			}
		})
	}
}

func (suite *MsgsTestSuite) TestMsgEthereumTx_Sign() {
	testCases := []struct {
		msg        string
		tx         *types.MsgEthereumTx
		ethSigner  ethtypes.Signer
		malleate   func(tx *types.MsgEthereumTx)
		expectPass bool
	}{
		{
			"pass - EIP2930 signer",
			types.NewTx(suite.chainID, 0, &suite.to, nil, 100000, nil, nil, nil, []byte("test"), &ethtypes.AccessList{}),
			ethtypes.NewEIP2930Signer(suite.chainID),
			func(tx *types.MsgEthereumTx) { tx.From = suite.from.Hex() },
			true,
		},
		{
			"pass - EIP155 signer",
			types.NewTx(suite.chainID, 0, &suite.to, nil, 100000, nil, nil, nil, []byte("test"), nil),
			ethtypes.NewEIP155Signer(suite.chainID),
			func(tx *types.MsgEthereumTx) { tx.From = suite.from.Hex() },
			true,
		},
		{
			"pass - Homestead signer",
			types.NewTx(suite.chainID, 0, &suite.to, nil, 100000, nil, nil, nil, []byte("test"), nil),
			ethtypes.HomesteadSigner{},
			func(tx *types.MsgEthereumTx) { tx.From = suite.from.Hex() },
			true,
		},
		{
			"pass - Frontier signer",
			types.NewTx(suite.chainID, 0, &suite.to, nil, 100000, nil, nil, nil, []byte("test"), nil),
			ethtypes.FrontierSigner{},
			func(tx *types.MsgEthereumTx) { tx.From = suite.from.Hex() },
			true,
		},
		{
			"no from address ",
			types.NewTx(suite.chainID, 0, &suite.to, nil, 100000, nil, nil, nil, []byte("test"), &ethtypes.AccessList{}),
			ethtypes.NewEIP2930Signer(suite.chainID),
			func(tx *types.MsgEthereumTx) { tx.From = "" },
			false,
		},
		{
			"from address ≠ signer address",
			types.NewTx(suite.chainID, 0, &suite.to, nil, 100000, nil, nil, nil, []byte("test"), &ethtypes.AccessList{}),
			ethtypes.NewEIP2930Signer(suite.chainID),
			func(tx *types.MsgEthereumTx) { tx.From = suite.to.Hex() },
			false,
		},
	}

	for i, tc := range testCases {
		tc.malleate(tc.tx)

		err := tc.tx.Sign(tc.ethSigner, suite.signer)
		if tc.expectPass {
			suite.Require().NoError(err, "valid test %d failed: %s", i, tc.msg)

			sender, err := tc.tx.GetSender(suite.chainID)
			suite.Require().NoError(err, tc.msg)
			suite.Require().Equal(tc.tx.From, sender.Hex(), tc.msg)
		} else {
			suite.Require().Error(err, "invalid test %d passed: %s", i, tc.msg)
		}
	}
}

func (suite *MsgsTestSuite) TestMsgEthereumTx_Getters() {
	testCases := []struct {
		name      string
		tx        *types.MsgEthereumTx
		ethSigner ethtypes.Signer
		exp       *big.Int
	}{
		{
			"get fee - pass",
			types.NewTx(suite.chainID, 0, &suite.to, nil, 50, suite.hundredBigInt, nil, nil, nil, &ethtypes.AccessList{}),
			ethtypes.NewEIP2930Signer(suite.chainID),
			big.NewInt(5000),
		},
		{
			"get fee - fail: nil data",
			types.NewTx(suite.chainID, 0, &suite.to, nil, 50, suite.hundredBigInt, nil, nil, nil, &ethtypes.AccessList{}),
			ethtypes.NewEIP2930Signer(suite.chainID),
			nil,
		},
		{
			"get effective fee - pass",
			types.NewTx(suite.chainID, 0, &suite.to, nil, 50, suite.hundredBigInt, nil, nil, nil, &ethtypes.AccessList{}),
			ethtypes.NewEIP2930Signer(suite.chainID),
			big.NewInt(5000),
		},
		{
			"get effective fee - fail: nil data",
			types.NewTx(suite.chainID, 0, &suite.to, nil, 50, suite.hundredBigInt, nil, nil, nil, &ethtypes.AccessList{}),
			ethtypes.NewEIP2930Signer(suite.chainID),
			nil,
		},
		{
			"get gas - pass",
			types.NewTx(suite.chainID, 0, &suite.to, nil, 50, suite.hundredBigInt, nil, nil, nil, &ethtypes.AccessList{}),
			ethtypes.NewEIP2930Signer(suite.chainID),
			big.NewInt(50),
		},
		{
			"get gas - fail: nil data",
			types.NewTx(suite.chainID, 0, &suite.to, nil, 50, suite.hundredBigInt, nil, nil, nil, &ethtypes.AccessList{}),
			ethtypes.NewEIP2930Signer(suite.chainID),
			big.NewInt(0),
		},
	}

	var fee, effFee *big.Int
	for _, tc := range testCases {
		if strings.Contains(tc.name, "nil data") {
			tc.tx.Data = nil
		}
		if strings.Contains(tc.name, "get fee") {
			fee = tc.tx.GetFee()
			suite.Require().Equal(tc.exp, fee)
		} else if strings.Contains(tc.name, "get effective fee") {
			effFee = tc.tx.GetEffectiveFee(big.NewInt(0))
			suite.Require().Equal(tc.exp, effFee)
		} else if strings.Contains(tc.name, "get gas") {
			gas := tc.tx.GetGas()
			suite.Require().Equal(tc.exp.Uint64(), gas)
		}
	}
}

func (suite *MsgsTestSuite) TestFromEthereumTx() {
	privkey, _ := ethsecp256k1.GenerateKey()
	ethPriv, err := privkey.ToECDSA()
	suite.Require().NoError(err)

	// 10^80 is more than 256 bits
	exp_10_80 := new(big.Int).Mul(big.NewInt(1), new(big.Int).Exp(big.NewInt(10), big.NewInt(80), nil))

	testCases := []struct {
		msg        string
		expectPass bool
		buildTx    func() *ethtypes.Transaction
	}{
		{"success, normal tx", true, func() *ethtypes.Transaction {
			tx := ethtypes.NewTx(&ethtypes.AccessListTx{
				Nonce:    0,
				Data:     nil,
				To:       &suite.to,
				Value:    big.NewInt(10),
				GasPrice: big.NewInt(1),
				Gas:      21000,
			})
			tx, err := ethtypes.SignTx(tx, ethtypes.NewEIP2930Signer(suite.chainID), ethPriv)
			suite.Require().NoError(err)
			return tx
		}},
		{"success, DynamicFeeTx", true, func() *ethtypes.Transaction {
			tx := ethtypes.NewTx(&ethtypes.DynamicFeeTx{
				Nonce: 0,
				Data:  nil,
				To:    &suite.to,
				Value: big.NewInt(10),
				Gas:   21000,
			})
			tx, err := ethtypes.SignTx(tx, ethtypes.NewLondonSigner(suite.chainID), ethPriv)
			suite.Require().NoError(err)
			return tx
		}},
		{"fail, value bigger than 256bits - AccessListTx", false, func() *ethtypes.Transaction {
			tx := ethtypes.NewTx(&ethtypes.AccessListTx{
				Nonce:    0,
				Data:     nil,
				To:       &suite.to,
				Value:    exp_10_80,
				GasPrice: big.NewInt(1),
				Gas:      21000,
			})
			tx, err := ethtypes.SignTx(tx, ethtypes.NewEIP2930Signer(suite.chainID), ethPriv)
			suite.Require().NoError(err)
			return tx
		}},
		{"fail, gas price bigger than 256bits - AccessListTx", false, func() *ethtypes.Transaction {
			tx := ethtypes.NewTx(&ethtypes.AccessListTx{
				Nonce:    0,
				Data:     nil,
				To:       &suite.to,
				Value:    big.NewInt(1),
				GasPrice: exp_10_80,
				Gas:      21000,
			})
			tx, err := ethtypes.SignTx(tx, ethtypes.NewEIP2930Signer(suite.chainID), ethPriv)
			suite.Require().NoError(err)
			return tx
		}},
		{"fail, value bigger than 256bits - LegacyTx", false, func() *ethtypes.Transaction {
			tx := ethtypes.NewTx(&ethtypes.LegacyTx{
				Nonce:    0,
				Data:     nil,
				To:       &suite.to,
				Value:    exp_10_80,
				GasPrice: big.NewInt(1),
				Gas:      21000,
			})
			tx, err := ethtypes.SignTx(tx, ethtypes.NewEIP2930Signer(suite.chainID), ethPriv)
			suite.Require().NoError(err)
			return tx
		}},
		{"fail, gas price bigger than 256bits - LegacyTx", false, func() *ethtypes.Transaction {
			tx := ethtypes.NewTx(&ethtypes.LegacyTx{
				Nonce:    0,
				Data:     nil,
				To:       &suite.to,
				Value:    big.NewInt(1),
				GasPrice: exp_10_80,
				Gas:      21000,
			})
			tx, err := ethtypes.SignTx(tx, ethtypes.NewEIP2930Signer(suite.chainID), ethPriv)
			suite.Require().NoError(err)
			return tx
		}},
	}

	for _, tc := range testCases {
		ethTx := tc.buildTx()
		tx := &types.MsgEthereumTx{}
		err := tx.FromEthereumTx(ethTx)
		if tc.expectPass {
			suite.Require().NoError(err)

			// round-trip test
			suite.Require().NoError(assertEqual(tx.AsTransaction(), ethTx))
		} else {
			suite.Require().Error(err)
		}
	}
}

// TestTransactionCoding tests serializing/de-serializing to/from rlp and JSON.
// adapted from go-ethereum
func (suite *MsgsTestSuite) TestTransactionCoding() {
	key, err := crypto.GenerateKey()
	if err != nil {
		suite.T().Fatalf("could not generate key: %v", err)
	}
	var (
		signer    = ethtypes.NewEIP2930Signer(common.Big1)
		addr      = common.HexToAddress("0x0000000000000000000000000000000000000001")
		recipient = common.HexToAddress("095e7baea6a6c7c4c2dfeb977efac326af552d87")
		accesses  = ethtypes.AccessList{{Address: addr, StorageKeys: []common.Hash{{0}}}}
	)
	for i := uint64(0); i < 500; i++ {
		var txdata ethtypes.TxData
		switch i % 5 {
		case 0:
			// Legacy tx.
			txdata = &ethtypes.LegacyTx{
				Nonce:    i,
				To:       &recipient,
				Gas:      1,
				GasPrice: big.NewInt(2),
				Data:     []byte("abcdef"),
			}
		case 1:
			// Legacy tx contract creation.
			txdata = &ethtypes.LegacyTx{
				Nonce:    i,
				Gas:      1,
				GasPrice: big.NewInt(2),
				Data:     []byte("abcdef"),
			}
		case 2:
			// Tx with non-zero access list.
			txdata = &ethtypes.AccessListTx{
				ChainID:    big.NewInt(1),
				Nonce:      i,
				To:         &recipient,
				Gas:        123457,
				GasPrice:   big.NewInt(10),
				AccessList: accesses,
				Data:       []byte("abcdef"),
			}
		case 3:
			// Tx with empty access list.
			txdata = &ethtypes.AccessListTx{
				ChainID:  big.NewInt(1),
				Nonce:    i,
				To:       &recipient,
				Gas:      123457,
				GasPrice: big.NewInt(10),
				Data:     []byte("abcdef"),
			}
		case 4:
			// Contract creation with access list.
			txdata = &ethtypes.AccessListTx{
				ChainID:    big.NewInt(1),
				Nonce:      i,
				Gas:        123457,
				GasPrice:   big.NewInt(10),
				AccessList: accesses,
			}
		}
		tx, err := ethtypes.SignNewTx(key, signer, txdata)
		if err != nil {
			suite.T().Fatalf("could not sign transaction: %v", err)
		}
		// RLP
		parsedTx, err := encodeDecodeBinary(tx)
		if err != nil {
			suite.T().Fatal(err)
		}
		assertEqual(parsedTx.AsTransaction(), tx)
	}
}

func encodeDecodeBinary(tx *ethtypes.Transaction) (*types.MsgEthereumTx, error) {
	data, err := tx.MarshalBinary()
	if err != nil {
		return nil, fmt.Errorf("rlp encoding failed: %v", err)
	}
	parsedTx := &types.MsgEthereumTx{}
	if err := parsedTx.UnmarshalBinary(data); err != nil {
		return nil, fmt.Errorf("rlp decoding failed: %v", err)
	}
	return parsedTx, nil
}

func assertEqual(orig *ethtypes.Transaction, cpy *ethtypes.Transaction) error {
	// compare nonce, price, gaslimit, recipient, amount, payload, V, R, S
	if want, got := orig.Hash(), cpy.Hash(); want != got {
		return fmt.Errorf("parsed tx differs from original tx, want %v, got %v", want, got)
	}
	if want, got := orig.ChainId(), cpy.ChainId(); want.Cmp(got) != 0 {
		return fmt.Errorf("invalid chain id, want %d, got %d", want, got)
	}
	if orig.AccessList() != nil {
		if !reflect.DeepEqual(orig.AccessList(), cpy.AccessList()) {
			return fmt.Errorf("access list wrong")
		}
	}
	return nil
}
