package types

import (
	"testing"

	"github.com/stretchr/testify/require"

	"github.com/evmos/ethermint/tests"

	"github.com/ethereum/go-ethereum/common"
)

func TestTransactionLogsValidate(t *testing.T) {
	addr := tests.GenerateAddress().String()

	testCases := []struct {
		name    string
		txLogs  TransactionLogs
		expPass bool
	}{
		{
			"valid log",
			TransactionLogs{
				Hash: common.BytesToHash([]byte("tx_hash")).String(),
				Logs: []*Log{
					{
						Address:     addr,
						Topics:      []string{common.BytesToHash([]byte("topic")).String()},
						Data:        []byte("data"),
						BlockNumber: 1,
						TxHash:      common.BytesToHash([]byte("tx_hash")).String(),
						TxIndex:     1,
						BlockHash:   common.BytesToHash([]byte("block_hash")).String(),
						Index:       1,
						Removed:     false,
					},
				},
			},
			true,
		},
		{
			"empty hash",
			TransactionLogs{
				Hash: common.Hash{}.String(),
			},
			false,
		},
		{
			"nil log",
			TransactionLogs{
				Hash: common.BytesToHash([]byte("tx_hash")).String(),
				Logs: []*Log{nil},
			},
			false,
		},
		{
			"invalid log",
			TransactionLogs{
				Hash: common.BytesToHash([]byte("tx_hash")).String(),
				Logs: []*Log{{}},
			},
			false,
		},
		{
			"hash mismatch log",
			TransactionLogs{
				Hash: common.BytesToHash([]byte("tx_hash")).String(),
				Logs: []*Log{
					{
						Address:     addr,
						Topics:      []string{common.BytesToHash([]byte("topic")).String()},
						Data:        []byte("data"),
						BlockNumber: 1,
						TxHash:      common.BytesToHash([]byte("other_hash")).String(),
						TxIndex:     1,
						BlockHash:   common.BytesToHash([]byte("block_hash")).String(),
						Index:       1,
						Removed:     false,
					},
				},
			},
			false,
		},
	}

	for _, tc := range testCases {
		tc := tc
		err := tc.txLogs.Validate()
		if tc.expPass {
			require.NoError(t, err, tc.name)
		} else {
			require.Error(t, err, tc.name)
		}
	}
}

func TestValidateLog(t *testing.T) {
	addr := tests.GenerateAddress().String()

	testCases := []struct {
		name    string
		log     *Log
		expPass bool
	}{
		{
			"valid log",
			&Log{
				Address:     addr,
				Topics:      []string{common.BytesToHash([]byte("topic")).String()},
				Data:        []byte("data"),
				BlockNumber: 1,
				TxHash:      common.BytesToHash([]byte("tx_hash")).String(),
				TxIndex:     1,
				BlockHash:   common.BytesToHash([]byte("block_hash")).String(),
				Index:       1,
				Removed:     false,
			},
			true,
		},
		{
			"empty log", &Log{}, false,
		},
		{
			"zero address",
			&Log{
				Address: common.Address{}.String(),
			},
			false,
		},
		{
			"empty block hash",
			&Log{
				Address:   addr,
				BlockHash: common.Hash{}.String(),
			},
			false,
		},
		{
			"zero block number",
			&Log{
				Address:     addr,
				BlockHash:   common.BytesToHash([]byte("block_hash")).String(),
				BlockNumber: 0,
			},
			false,
		},
		{
			"empty tx hash",
			&Log{
				Address:     addr,
				BlockHash:   common.BytesToHash([]byte("block_hash")).String(),
				BlockNumber: 1,
				TxHash:      common.Hash{}.String(),
			},
			false,
		},
	}

	for _, tc := range testCases {
		tc := tc
		err := tc.log.Validate()
		if tc.expPass {
			require.NoError(t, err, tc.name)
		} else {
			require.Error(t, err, tc.name)
		}
	}
}

func TestConversionFunctions(t *testing.T) {
	addr := tests.GenerateAddress().String()

	txLogs := TransactionLogs{
		Hash: common.BytesToHash([]byte("tx_hash")).String(),
		Logs: []*Log{
			{
				Address:     addr,
				Topics:      []string{common.BytesToHash([]byte("topic")).String()},
				Data:        []byte("data"),
				BlockNumber: 1,
				TxHash:      common.BytesToHash([]byte("tx_hash")).String(),
				TxIndex:     1,
				BlockHash:   common.BytesToHash([]byte("block_hash")).String(),
				Index:       1,
				Removed:     false,
			},
		},
	}

	// convert valid log to eth logs and back (and validate)
	conversionLogs := NewTransactionLogsFromEth(common.BytesToHash([]byte("tx_hash")), txLogs.EthLogs())
	conversionErr := conversionLogs.Validate()

	// create new transaction logs as copy of old valid one (and validate)
	copyLogs := NewTransactionLogs(common.BytesToHash([]byte("tx_hash")), txLogs.Logs)
	copyErr := copyLogs.Validate()

	require.Nil(t, conversionErr)
	require.Nil(t, copyErr)
}
