package types

import (
	"fmt"
	"math/big"

	"github.com/ethereum/go-ethereum/common"
	//"github.com/ethereum/go-ethereum/common/hexutil"
	ethtypes "github.com/ethereum/go-ethereum/core/types"
)

func (suite *TxDataTestSuite) TestTxArgsString() {
	testCases := []struct {
		name           string
		txArgs         TransactionArgs
		expectedString string
	}{
		{
			"empty tx args",
			TransactionArgs{},
			"TransactionArgs{From:<nil>, To:<nil>, Gas:<nil>, Nonce:<nil>, Data:<nil>, Input:<nil>, AccessList:<nil>}",
		},
		{
			"tx args with fields",
			TransactionArgs{
				From:       &suite.addr,
				To:         &suite.addr,
				Gas:        &suite.hexUint64,
				Nonce:      &suite.hexUint64,
				Input:      &suite.hexInputBytes,
				Data:       &suite.hexDataBytes,
				AccessList: &ethtypes.AccessList{},
			},
			fmt.Sprintf("TransactionArgs{From:%v, To:%v, Gas:%v, Nonce:%v, Data:%v, Input:%v, AccessList:%v}",
				&suite.addr,
				&suite.addr,
				&suite.hexUint64,
				&suite.hexUint64,
				&suite.hexDataBytes,
				&suite.hexInputBytes,
				&ethtypes.AccessList{}),
		},
	}
	for _, tc := range testCases {
		outputString := tc.txArgs.String()
		suite.Require().Equal(outputString, tc.expectedString)
	}
}

func (suite *TxDataTestSuite) TestConvertTxArgsEthTx() {
	testCases := []struct {
		name   string
		txArgs TransactionArgs
	}{
		{
			"empty tx args",
			TransactionArgs{},
		},
		{
			"no nil args",
			TransactionArgs{
				From:                 &suite.addr,
				To:                   &suite.addr,
				Gas:                  &suite.hexUint64,
				GasPrice:             &suite.hexBigInt,
				MaxFeePerGas:         &suite.hexBigInt,
				MaxPriorityFeePerGas: &suite.hexBigInt,
				Value:                &suite.hexBigInt,
				Nonce:                &suite.hexUint64,
				Data:                 &suite.hexDataBytes,
				Input:                &suite.hexInputBytes,
				AccessList:           &ethtypes.AccessList{{Address: suite.addr, StorageKeys: []common.Hash{{0}}}},
				ChainID:              &suite.hexBigInt,
			},
		},
		{
			"max fee per gas nil, but access list not nil",
			TransactionArgs{
				From:                 &suite.addr,
				To:                   &suite.addr,
				Gas:                  &suite.hexUint64,
				GasPrice:             &suite.hexBigInt,
				MaxFeePerGas:         nil,
				MaxPriorityFeePerGas: &suite.hexBigInt,
				Value:                &suite.hexBigInt,
				Nonce:                &suite.hexUint64,
				Data:                 &suite.hexDataBytes,
				Input:                &suite.hexInputBytes,
				AccessList:           &ethtypes.AccessList{{Address: suite.addr, StorageKeys: []common.Hash{{0}}}},
				ChainID:              &suite.hexBigInt,
			},
		},
	}
	for _, tc := range testCases {
		res := tc.txArgs.ToTransaction()
		suite.Require().NotNil(res)
	}
}

func (suite *TxDataTestSuite) TestToMessageEVM() {
	testCases := []struct {
		name         string
		txArgs       TransactionArgs
		globalGasCap uint64
		baseFee      *big.Int
		expError     bool
	}{
		{
			"empty tx args",
			TransactionArgs{},
			uint64(0),
			nil,
			false,
		},
		{
			"specify gasPrice and (maxFeePerGas or maxPriorityFeePerGas)",
			TransactionArgs{
				From:                 &suite.addr,
				To:                   &suite.addr,
				Gas:                  &suite.hexUint64,
				GasPrice:             &suite.hexBigInt,
				MaxFeePerGas:         &suite.hexBigInt,
				MaxPriorityFeePerGas: &suite.hexBigInt,
				Value:                &suite.hexBigInt,
				Nonce:                &suite.hexUint64,
				Data:                 &suite.hexDataBytes,
				Input:                &suite.hexInputBytes,
				AccessList:           &ethtypes.AccessList{{Address: suite.addr, StorageKeys: []common.Hash{{0}}}},
				ChainID:              &suite.hexBigInt,
			},
			uint64(0),
			nil,
			true,
		},
		{
			"non-1559 execution, zero gas cap",
			TransactionArgs{
				From:                 &suite.addr,
				To:                   &suite.addr,
				Gas:                  &suite.hexUint64,
				GasPrice:             &suite.hexBigInt,
				MaxFeePerGas:         nil,
				MaxPriorityFeePerGas: nil,
				Value:                &suite.hexBigInt,
				Nonce:                &suite.hexUint64,
				Data:                 &suite.hexDataBytes,
				Input:                &suite.hexInputBytes,
				AccessList:           &ethtypes.AccessList{{Address: suite.addr, StorageKeys: []common.Hash{{0}}}},
				ChainID:              &suite.hexBigInt,
			},
			uint64(0),
			nil,
			false,
		},
		{
			"non-1559 execution, nonzero gas cap",
			TransactionArgs{
				From:                 &suite.addr,
				To:                   &suite.addr,
				Gas:                  &suite.hexUint64,
				GasPrice:             &suite.hexBigInt,
				MaxFeePerGas:         nil,
				MaxPriorityFeePerGas: nil,
				Value:                &suite.hexBigInt,
				Nonce:                &suite.hexUint64,
				Data:                 &suite.hexDataBytes,
				Input:                &suite.hexInputBytes,
				AccessList:           &ethtypes.AccessList{{Address: suite.addr, StorageKeys: []common.Hash{{0}}}},
				ChainID:              &suite.hexBigInt,
			},
			uint64(1),
			nil,
			false,
		},
		{
			"1559-type execution, nil gas price",
			TransactionArgs{
				From:                 &suite.addr,
				To:                   &suite.addr,
				Gas:                  &suite.hexUint64,
				GasPrice:             nil,
				MaxFeePerGas:         &suite.hexBigInt,
				MaxPriorityFeePerGas: &suite.hexBigInt,
				Value:                &suite.hexBigInt,
				Nonce:                &suite.hexUint64,
				Data:                 &suite.hexDataBytes,
				Input:                &suite.hexInputBytes,
				AccessList:           &ethtypes.AccessList{{Address: suite.addr, StorageKeys: []common.Hash{{0}}}},
				ChainID:              &suite.hexBigInt,
			},
			uint64(1),
			suite.bigInt,
			false,
		},
		{
			"1559-type execution, non-nil gas price",
			TransactionArgs{
				From:                 &suite.addr,
				To:                   &suite.addr,
				Gas:                  &suite.hexUint64,
				GasPrice:             &suite.hexBigInt,
				MaxFeePerGas:         nil,
				MaxPriorityFeePerGas: nil,
				Value:                &suite.hexBigInt,
				Nonce:                &suite.hexUint64,
				Data:                 &suite.hexDataBytes,
				Input:                &suite.hexInputBytes,
				AccessList:           &ethtypes.AccessList{{Address: suite.addr, StorageKeys: []common.Hash{{0}}}},
				ChainID:              &suite.hexBigInt,
			},
			uint64(1),
			suite.bigInt,
			false,
		},
	}
	for _, tc := range testCases {
		res, err := tc.txArgs.ToMessage(tc.globalGasCap, tc.baseFee)

		if tc.expError {
			suite.Require().NotNil(err)
		} else {
			suite.Require().Nil(err)
			suite.Require().NotNil(res)
		}
	}
}

func (suite *TxDataTestSuite) TestGetFrom() {
	testCases := []struct {
		name       string
		txArgs     TransactionArgs
		expAddress common.Address
	}{
		{
			"empty from field",
			TransactionArgs{},
			common.Address{},
		},
		{
			"non-empty from field",
			TransactionArgs{
				From: &suite.addr,
			},
			suite.addr,
		},
	}
	for _, tc := range testCases {
		retrievedAddress := tc.txArgs.GetFrom()
		suite.Require().Equal(retrievedAddress, tc.expAddress)
	}
}

func (suite *TxDataTestSuite) TestGetData() {
	testCases := []struct {
		name           string
		txArgs         TransactionArgs
		expectedOutput []byte
	}{
		{
			"empty input and data fields",
			TransactionArgs{
				Data:  nil,
				Input: nil,
			},
			nil,
		},
		{
			"empty input field, non-empty data field",
			TransactionArgs{
				Data:  &suite.hexDataBytes,
				Input: nil,
			},
			[]byte("data"),
		},
		{
			"non-empty input and data fields",
			TransactionArgs{
				Data:  &suite.hexDataBytes,
				Input: &suite.hexInputBytes,
			},
			[]byte("input"),
		},
	}
	for _, tc := range testCases {
		retrievedData := tc.txArgs.GetData()
		suite.Require().Equal(retrievedData, tc.expectedOutput)
	}
}
