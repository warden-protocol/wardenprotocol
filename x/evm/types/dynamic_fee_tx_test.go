package types

import (
	"math/big"
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/ethereum/go-ethereum/common"
	ethtypes "github.com/ethereum/go-ethereum/core/types"
	"github.com/evmos/ethermint/tests"
	"github.com/stretchr/testify/suite"
)

type TxDataTestSuite struct {
	suite.Suite

	sdkInt         sdk.Int
	uint64         uint64
	bigInt         *big.Int
	overflowBigInt *big.Int
	sdkZeroInt     sdk.Int
	sdkMinusOneInt sdk.Int
	invalidAddr    string
	addr           common.Address
	hexAddr        string
}

func (suite *TxDataTestSuite) SetupTest() {
	suite.sdkInt = sdk.NewInt(100)
	suite.uint64 = suite.sdkInt.Uint64()
	suite.bigInt = big.NewInt(1)
	suite.overflowBigInt = big.NewInt(0).Exp(big.NewInt(10), big.NewInt(256), nil)
	suite.sdkZeroInt = sdk.ZeroInt()
	suite.sdkMinusOneInt = sdk.NewInt(-1)
	suite.invalidAddr = "123456"
	suite.addr = tests.GenerateAddress()
	suite.hexAddr = suite.addr.Hex()
}

func TestTxDataTestSuite(t *testing.T) {
	suite.Run(t, new(TxDataTestSuite))
}

func (suite *TxDataTestSuite) TestNewDynamicFeeTx() {
	testCases := []struct {
		name     string
		expError bool
		tx       *ethtypes.Transaction
	}{
		{
			"non-empty tx",
			false,
			ethtypes.NewTx(&ethtypes.DynamicFeeTx{
				Nonce:      1,
				Data:       []byte("data"),
				Gas:        100,
				Value:      big.NewInt(1),
				AccessList: ethtypes.AccessList{},
				To:         &suite.addr,
				V:          suite.bigInt,
				R:          suite.bigInt,
				S:          suite.bigInt,
			}),
		},
		{
			"value out of bounds tx",
			true,
			ethtypes.NewTx(&ethtypes.DynamicFeeTx{
				Nonce:      1,
				Data:       []byte("data"),
				Gas:        100,
				Value:      suite.overflowBigInt,
				AccessList: ethtypes.AccessList{},
				To:         &suite.addr,
				V:          suite.bigInt,
				R:          suite.bigInt,
				S:          suite.bigInt,
			}),
		},
		{
			"gas fee cap out of bounds tx",
			true,
			ethtypes.NewTx(&ethtypes.DynamicFeeTx{
				Nonce:      1,
				Data:       []byte("data"),
				Gas:        100,
				GasFeeCap:  suite.overflowBigInt,
				Value:      big.NewInt(1),
				AccessList: ethtypes.AccessList{},
				To:         &suite.addr,
				V:          suite.bigInt,
				R:          suite.bigInt,
				S:          suite.bigInt,
			}),
		},
		{
			"gas tip cap out of bounds tx",
			true,
			ethtypes.NewTx(&ethtypes.DynamicFeeTx{
				Nonce:      1,
				Data:       []byte("data"),
				Gas:        100,
				GasTipCap:  suite.overflowBigInt,
				Value:      big.NewInt(1),
				AccessList: ethtypes.AccessList{},
				To:         &suite.addr,
				V:          suite.bigInt,
				R:          suite.bigInt,
				S:          suite.bigInt,
			}),
		},
	}
	for _, tc := range testCases {
		tx, err := newDynamicFeeTx(tc.tx)

		if tc.expError {
			suite.Require().Error(err)
		} else {
			suite.Require().NoError(err)
			suite.Require().NotEmpty(tx)
			suite.Require().Equal(uint8(2), tx.TxType())
		}
	}
}

func (suite *TxDataTestSuite) TestDynamicFeeTxAsEthereumData() {
	feeConfig := &ethtypes.DynamicFeeTx{
		Nonce:      1,
		Data:       []byte("data"),
		Gas:        100,
		Value:      big.NewInt(1),
		AccessList: ethtypes.AccessList{},
		To:         &suite.addr,
		V:          suite.bigInt,
		R:          suite.bigInt,
		S:          suite.bigInt,
	}

	tx := ethtypes.NewTx(feeConfig)

	dynamicFeeTx, err := newDynamicFeeTx(tx)
	suite.Require().NoError(err)

	res := dynamicFeeTx.AsEthereumData()
	resTx := ethtypes.NewTx(res)

	suite.Require().Equal(feeConfig.Nonce, resTx.Nonce())
	suite.Require().Equal(feeConfig.Data, resTx.Data())
	suite.Require().Equal(feeConfig.Gas, resTx.Gas())
	suite.Require().Equal(feeConfig.Value, resTx.Value())
	suite.Require().Equal(feeConfig.AccessList, resTx.AccessList())
	suite.Require().Equal(feeConfig.To, resTx.To())
}

func (suite *TxDataTestSuite) TestDynamicFeeTxCopy() {
	tx := &DynamicFeeTx{}
	txCopy := tx.Copy()

	suite.Require().Equal(&DynamicFeeTx{}, txCopy)
	// TODO: Test for different pointers
}

func (suite *TxDataTestSuite) TestDynamicFeeTxGetChainID() {
	testCases := []struct {
		name string
		tx   DynamicFeeTx
		exp  *big.Int
	}{
		{
			"empty chainID",
			DynamicFeeTx{
				ChainID: nil,
			},
			nil,
		},
		{
			"non-empty chainID",
			DynamicFeeTx{
				ChainID: &suite.sdkInt,
			},
			(&suite.sdkInt).BigInt(),
		},
	}

	for _, tc := range testCases {
		actual := tc.tx.GetChainID()

		suite.Require().Equal(tc.exp, actual, tc.name)
	}
}

func (suite *TxDataTestSuite) TestDynamicFeeTxGetAccessList() {
	testCases := []struct {
		name string
		tx   DynamicFeeTx
		exp  ethtypes.AccessList
	}{
		{
			"empty accesses",
			DynamicFeeTx{
				Accesses: nil,
			},
			nil,
		},
		{
			"nil",
			DynamicFeeTx{
				Accesses: NewAccessList(nil),
			},
			nil,
		},
		{
			"non-empty accesses",
			DynamicFeeTx{
				Accesses: AccessList{
					{
						Address:     suite.hexAddr,
						StorageKeys: []string{},
					},
				},
			},
			ethtypes.AccessList{
				{
					Address:     suite.addr,
					StorageKeys: []common.Hash{},
				},
			},
		},
	}

	for _, tc := range testCases {
		actual := tc.tx.GetAccessList()

		suite.Require().Equal(tc.exp, actual, tc.name)
	}
}

func (suite *TxDataTestSuite) TestDynamicFeeTxGetData() {
	testCases := []struct {
		name string
		tx   DynamicFeeTx
	}{
		{
			"non-empty transaction",
			DynamicFeeTx{
				Data: nil,
			},
		},
	}

	for _, tc := range testCases {
		actual := tc.tx.GetData()

		suite.Require().Equal(tc.tx.Data, actual, tc.name)
	}
}

func (suite *TxDataTestSuite) TestDynamicFeeTxGetGas() {
	testCases := []struct {
		name string
		tx   DynamicFeeTx
		exp  uint64
	}{
		{
			"non-empty gas",
			DynamicFeeTx{
				GasLimit: suite.uint64,
			},
			suite.uint64,
		},
	}

	for _, tc := range testCases {
		actual := tc.tx.GetGas()

		suite.Require().Equal(tc.exp, actual, tc.name)
	}
}

func (suite *TxDataTestSuite) TestDynamicFeeTxGetGasPrice() {
	testCases := []struct {
		name string
		tx   DynamicFeeTx
		exp  *big.Int
	}{
		{
			"non-empty gasFeeCap",
			DynamicFeeTx{
				GasFeeCap: &suite.sdkInt,
			},
			(&suite.sdkInt).BigInt(),
		},
	}

	for _, tc := range testCases {
		actual := tc.tx.GetGasPrice()

		suite.Require().Equal(tc.exp, actual, tc.name)
	}
}

func (suite *TxDataTestSuite) TestDynamicFeeTxGetGasTipCap() {
	testCases := []struct {
		name string
		tx   DynamicFeeTx
		exp  *big.Int
	}{
		{
			"empty gasTipCap",
			DynamicFeeTx{
				GasTipCap: nil,
			},
			nil,
		},
		{
			"non-empty gasTipCap",
			DynamicFeeTx{
				GasTipCap: &suite.sdkInt,
			},
			(&suite.sdkInt).BigInt(),
		},
	}

	for _, tc := range testCases {
		actual := tc.tx.GetGasTipCap()

		suite.Require().Equal(tc.exp, actual, tc.name)
	}
}

func (suite *TxDataTestSuite) TestDynamicFeeTxGetGasFeeCap() {
	testCases := []struct {
		name string
		tx   DynamicFeeTx
		exp  *big.Int
	}{
		{
			"empty gasFeeCap",
			DynamicFeeTx{
				GasFeeCap: nil,
			},
			nil,
		},
		{
			"non-empty gasFeeCap",
			DynamicFeeTx{
				GasFeeCap: &suite.sdkInt,
			},
			(&suite.sdkInt).BigInt(),
		},
	}

	for _, tc := range testCases {
		actual := tc.tx.GetGasFeeCap()

		suite.Require().Equal(tc.exp, actual, tc.name)
	}
}

func (suite *TxDataTestSuite) TestDynamicFeeTxGetValue() {
	testCases := []struct {
		name string
		tx   DynamicFeeTx
		exp  *big.Int
	}{
		{
			"empty amount",
			DynamicFeeTx{
				Amount: nil,
			},
			nil,
		},
		{
			"non-empty amount",
			DynamicFeeTx{
				Amount: &suite.sdkInt,
			},
			(&suite.sdkInt).BigInt(),
		},
	}

	for _, tc := range testCases {
		actual := tc.tx.GetValue()

		suite.Require().Equal(tc.exp, actual, tc.name)
	}
}

func (suite *TxDataTestSuite) TestDynamicFeeTxGetNonce() {
	testCases := []struct {
		name string
		tx   DynamicFeeTx
		exp  uint64
	}{
		{
			"non-empty nonce",
			DynamicFeeTx{
				Nonce: suite.uint64,
			},
			suite.uint64,
		},
	}

	for _, tc := range testCases {
		actual := tc.tx.GetNonce()

		suite.Require().Equal(tc.exp, actual, tc.name)
	}
}

func (suite *TxDataTestSuite) TestDynamicFeeTxGetTo() {
	testCases := []struct {
		name string
		tx   DynamicFeeTx
		exp  *common.Address
	}{
		{
			"empty suite.address",
			DynamicFeeTx{
				To: "",
			},
			nil,
		},
		{
			"non-empty suite.address",
			DynamicFeeTx{
				To: suite.hexAddr,
			},
			&suite.addr,
		},
	}

	for _, tc := range testCases {
		actual := tc.tx.GetTo()

		suite.Require().Equal(tc.exp, actual, tc.name)
	}
}

func (suite *TxDataTestSuite) TestDynamicFeeTxSetSignatureValues() {
	testCases := []struct {
		name    string
		chainID *big.Int
		r       *big.Int
		v       *big.Int
		s       *big.Int
	}{
		{
			"empty values",
			nil,
			nil,
			nil,
			nil,
		},
		{
			"non-empty values",
			suite.bigInt,
			suite.bigInt,
			suite.bigInt,
			suite.bigInt,
		},
	}

	for _, tc := range testCases {
		tx := &DynamicFeeTx{}
		tx.SetSignatureValues(tc.chainID, tc.v, tc.r, tc.s)

		v, r, s := tx.GetRawSignatureValues()
		chainID := tx.GetChainID()

		suite.Require().Equal(tc.v, v, tc.name)
		suite.Require().Equal(tc.r, r, tc.name)
		suite.Require().Equal(tc.s, s, tc.name)
		suite.Require().Equal(tc.chainID, chainID, tc.name)
	}
}

func (suite *TxDataTestSuite) TestDynamicFeeTxValidate() {
	testCases := []struct {
		name     string
		tx       DynamicFeeTx
		expError bool
	}{
		{
			"empty",
			DynamicFeeTx{},
			true,
		},
		{
			"gas tip cap is nil",
			DynamicFeeTx{
				GasTipCap: nil,
			},
			true,
		},
		{
			"gas fee cap is nil",
			DynamicFeeTx{
				GasTipCap: &suite.sdkZeroInt,
			},
			true,
		},
		{
			"gas tip cap is negative",
			DynamicFeeTx{
				GasTipCap: &suite.sdkMinusOneInt,
				GasFeeCap: &suite.sdkZeroInt,
			},
			true,
		},
		{
			"gas tip cap is negative",
			DynamicFeeTx{
				GasTipCap: &suite.sdkZeroInt,
				GasFeeCap: &suite.sdkMinusOneInt,
			},
			true,
		},
		{
			"gas fee cap < gas tip cap",
			DynamicFeeTx{
				GasTipCap: &suite.sdkInt,
				GasFeeCap: &suite.sdkZeroInt,
			},
			true,
		},
		{
			"amount is negative",
			DynamicFeeTx{
				GasTipCap: &suite.sdkInt,
				GasFeeCap: &suite.sdkInt,
				Amount:    &suite.sdkMinusOneInt,
			},
			true,
		},
		{
			"to suite.address is invalid",
			DynamicFeeTx{
				GasTipCap: &suite.sdkInt,
				GasFeeCap: &suite.sdkInt,
				Amount:    &suite.sdkInt,
				To:        suite.invalidAddr,
			},
			true,
		},
		{
			"chain ID not present on AccessList txs",
			DynamicFeeTx{
				GasTipCap: &suite.sdkInt,
				GasFeeCap: &suite.sdkInt,
				Amount:    &suite.sdkInt,
				To:        suite.hexAddr,
				ChainID:   nil,
			},
			true,
		},
		{
			"no errors",
			DynamicFeeTx{
				GasTipCap: &suite.sdkInt,
				GasFeeCap: &suite.sdkInt,
				Amount:    &suite.sdkInt,
				To:        suite.hexAddr,
				ChainID:   &suite.sdkInt,
			},
			false,
		},
	}

	for _, tc := range testCases {
		err := tc.tx.Validate()

		if tc.expError {
			suite.Require().Error(err, tc.name)
			continue
		}

		suite.Require().NoError(err, tc.name)
	}
}

func (suite *TxDataTestSuite) TestDynamicFeeTxFeeCost() {
	tx := &DynamicFeeTx{}
	suite.Require().Panics(func() { tx.Fee() }, "should panic")
	suite.Require().Panics(func() { tx.Cost() }, "should panic")
}
