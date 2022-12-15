package types

import (
	"math/big"

	ethtypes "github.com/ethereum/go-ethereum/core/types"
)

func (suite *TxDataTestSuite) TestAccessListTxCopy() {
	tx := &AccessListTx{}
	txCopy := tx.Copy()

	suite.Require().Equal(&AccessListTx{}, txCopy)
}

func (suite *TxDataTestSuite) TestAccessListTxGetGasTipCap() {
	testCases := []struct {
		name string
		tx   AccessListTx
		exp  *big.Int
	}{
		{
			"non-empty gasPrice",
			AccessListTx{
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

func (suite *TxDataTestSuite) TestAccessListTxGetGasFeeCap() {
	testCases := []struct {
		name string
		tx   AccessListTx
		exp  *big.Int
	}{
		{
			"non-empty gasPrice",
			AccessListTx{
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

func (suite *TxDataTestSuite) TestAccessListTxCost() {
	testCases := []struct {
		name string
		tx   AccessListTx
		exp  *big.Int
	}{
		{
			"non-empty access list tx",
			AccessListTx{
				GasPrice: &suite.sdkInt,
				GasLimit: uint64(1),
				Amount:   &suite.sdkZeroInt,
			},
			(&suite.sdkInt).BigInt(),
		},
	}

	for _, tc := range testCases {
		actual := tc.tx.Cost()

		suite.Require().Equal(tc.exp, actual, tc.name)
	}
}

func (suite *TxDataTestSuite) TestAccessListTxEffectiveCost() {
	testCases := []struct {
		name    string
		tx      AccessListTx
		baseFee *big.Int
		exp     *big.Int
	}{
		{
			"non-empty access list tx",
			AccessListTx{
				GasPrice: &suite.sdkInt,
				GasLimit: uint64(1),
				Amount:   &suite.sdkZeroInt,
			},
			(&suite.sdkInt).BigInt(),
			(&suite.sdkInt).BigInt(),
		},
	}

	for _, tc := range testCases {
		actual := tc.tx.EffectiveCost(tc.baseFee)

		suite.Require().Equal(tc.exp, actual, tc.name)
	}
}

func (suite *TxDataTestSuite) TestAccessListTxType() {
	testCases := []struct {
		name string
		tx   AccessListTx
	}{
		{
			"non-empty access list tx",
			AccessListTx{},
		},
	}

	for _, tc := range testCases {
		actual := tc.tx.TxType()

		suite.Require().Equal(uint8(ethtypes.AccessListTxType), actual, tc.name)
	}
}
