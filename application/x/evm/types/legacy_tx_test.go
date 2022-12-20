package types

import (
	"math/big"

	"github.com/ethereum/go-ethereum/common"
	ethtypes "github.com/ethereum/go-ethereum/core/types"
)

func (suite *TxDataTestSuite) TestNewLegacyTx() {
	testCases := []struct {
		name string
		tx   *ethtypes.Transaction
	}{
		{
			"non-empty Transaction",
			ethtypes.NewTx(&ethtypes.AccessListTx{
				Nonce:      1,
				Data:       []byte("data"),
				Gas:        100,
				Value:      big.NewInt(1),
				AccessList: ethtypes.AccessList{},
				To:         &suite.addr,
				V:          big.NewInt(1),
				R:          big.NewInt(1),
				S:          big.NewInt(1),
			}),
		},
	}

	for _, tc := range testCases {
		tx, err := newLegacyTx(tc.tx)
		suite.Require().NoError(err)

		suite.Require().NotEmpty(tc.tx)
		suite.Require().Equal(uint8(0), tx.TxType())
	}
}

func (suite *TxDataTestSuite) TestLegacyTxTxType() {
	tx := LegacyTx{}
	actual := tx.TxType()

	suite.Require().Equal(uint8(0), actual)
}

func (suite *TxDataTestSuite) TestLegacyTxCopy() {
	tx := &LegacyTx{}
	txData := tx.Copy()

	suite.Require().Equal(&LegacyTx{}, txData)
	// TODO: Test for different pointers
}

func (suite *TxDataTestSuite) TestLegacyTxGetChainID() {
	tx := LegacyTx{}
	actual := tx.GetChainID()

	suite.Require().Nil(actual)
}

func (suite *TxDataTestSuite) TestLegacyTxGetAccessList() {
	tx := LegacyTx{}
	actual := tx.GetAccessList()

	suite.Require().Nil(actual)
}

func (suite *TxDataTestSuite) TestLegacyTxGetData() {
	testCases := []struct {
		name string
		tx   LegacyTx
	}{
		{
			"non-empty transaction",
			LegacyTx{
				Data: nil,
			},
		},
	}

	for _, tc := range testCases {
		actual := tc.tx.GetData()

		suite.Require().Equal(tc.tx.Data, actual, tc.name)
	}
}

func (suite *TxDataTestSuite) TestLegacyTxGetGas() {
	testCases := []struct {
		name string
		tx   LegacyTx
		exp  uint64
	}{
		{
			"non-empty gas",
			LegacyTx{
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

func (suite *TxDataTestSuite) TestLegacyTxGetGasPrice() {
	testCases := []struct {
		name string
		tx   LegacyTx
		exp  *big.Int
	}{
		{
			"empty gasPrice",
			LegacyTx{
				GasPrice: nil,
			},
			nil,
		},
		{
			"non-empty gasPrice",
			LegacyTx{
				GasPrice: &suite.sdkInt,
			},
			(&suite.sdkInt).BigInt(),
		},
	}

	for _, tc := range testCases {
		actual := tc.tx.GetGasFeeCap()

		suite.Require().Equal(tc.exp, actual, tc.name)
	}
}

func (suite *TxDataTestSuite) TestLegacyTxGetGasTipCap() {
	testCases := []struct {
		name string
		tx   LegacyTx
		exp  *big.Int
	}{
		{
			"non-empty gasPrice",
			LegacyTx{
				GasPrice: &suite.sdkInt,
			},
			(&suite.sdkInt).BigInt(),
		},
	}

	for _, tc := range testCases {
		actual := tc.tx.GetGasTipCap()

		suite.Require().Equal(tc.exp, actual, tc.name)
	}
}

func (suite *TxDataTestSuite) TestLegacyTxGetGasFeeCap() {
	testCases := []struct {
		name string
		tx   LegacyTx
		exp  *big.Int
	}{
		{
			"non-empty gasPrice",
			LegacyTx{
				GasPrice: &suite.sdkInt,
			},
			(&suite.sdkInt).BigInt(),
		},
	}

	for _, tc := range testCases {
		actual := tc.tx.GetGasFeeCap()

		suite.Require().Equal(tc.exp, actual, tc.name)
	}
}

func (suite *TxDataTestSuite) TestLegacyTxGetValue() {
	testCases := []struct {
		name string
		tx   LegacyTx
		exp  *big.Int
	}{
		{
			"empty amount",
			LegacyTx{
				Amount: nil,
			},
			nil,
		},
		{
			"non-empty amount",
			LegacyTx{
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

func (suite *TxDataTestSuite) TestLegacyTxGetNonce() {
	testCases := []struct {
		name string
		tx   LegacyTx
		exp  uint64
	}{
		{
			"none-empty nonce",
			LegacyTx{
				Nonce: suite.uint64,
			},
			suite.uint64,
		},
	}
	for _, tc := range testCases {
		actual := tc.tx.GetNonce()

		suite.Require().Equal(tc.exp, actual)
	}
}

func (suite *TxDataTestSuite) TestLegacyTxGetTo() {
	testCases := []struct {
		name string
		tx   LegacyTx
		exp  *common.Address
	}{
		{
			"empty address",
			LegacyTx{
				To: "",
			},
			nil,
		},
		{
			"non-empty address",
			LegacyTx{
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

func (suite *TxDataTestSuite) TestLegacyTxAsEthereumData() {
	tx := &LegacyTx{}
	txData := tx.AsEthereumData()

	suite.Require().Equal(&ethtypes.LegacyTx{}, txData)
}

func (suite *TxDataTestSuite) TestLegacyTxSetSignatureValues() {
	testCases := []struct {
		name string
		v    *big.Int
		r    *big.Int
		s    *big.Int
	}{
		{
			"non-empty values",
			suite.bigInt,
			suite.bigInt,
			suite.bigInt,
		},
	}
	for _, tc := range testCases {
		tx := &LegacyTx{}
		tx.SetSignatureValues(nil, tc.v, tc.r, tc.s)

		v, r, s := tx.GetRawSignatureValues()

		suite.Require().Equal(tc.v, v, tc.name)
		suite.Require().Equal(tc.r, r, tc.name)
		suite.Require().Equal(tc.s, s, tc.name)
	}
}

func (suite *TxDataTestSuite) TestLegacyTxValidate() {
	testCases := []struct {
		name     string
		tx       LegacyTx
		expError bool
	}{
		{
			"empty",
			LegacyTx{},
			true,
		},
		{
			"gas price is nil",
			LegacyTx{
				GasPrice: nil,
			},
			true,
		},
		{
			"gas price is negative",
			LegacyTx{
				GasPrice: &suite.sdkMinusOneInt,
			},
			true,
		},
		{
			"amount is negative",
			LegacyTx{
				GasPrice: &suite.sdkInt,
				Amount:   &suite.sdkMinusOneInt,
			},
			true,
		},
		{
			"to address is invalid",
			LegacyTx{
				GasPrice: &suite.sdkInt,
				Amount:   &suite.sdkInt,
				To:       suite.invalidAddr,
			},
			true,
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

func (suite *TxDataTestSuite) TestLegacyTxFeeCost() {
	tx := &LegacyTx{}

	suite.Require().Panics(func() { tx.Fee() }, "should panice")
	suite.Require().Panics(func() { tx.Cost() }, "should panice")
}
