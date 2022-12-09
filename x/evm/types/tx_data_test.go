package types

import (
	"math/big"
	"testing"

	"github.com/stretchr/testify/require"

	sdk "github.com/cosmos/cosmos-sdk/types"
)

func TestTxData_chainID(t *testing.T) {
	chainID := sdk.NewInt(1)

	testCases := []struct {
		msg        string
		data       TxData
		expChainID *big.Int
	}{
		{
			"access list tx", &AccessListTx{Accesses: AccessList{}, ChainID: &chainID}, big.NewInt(1),
		},
		{
			"access list tx, nil chain ID", &AccessListTx{Accesses: AccessList{}}, nil,
		},
		{
			"legacy tx, derived", &LegacyTx{}, nil,
		},
	}

	for _, tc := range testCases {
		chainID := tc.data.GetChainID()
		require.Equal(t, chainID, tc.expChainID, tc.msg)
	}
}

func TestTxData_DeriveChainID(t *testing.T) {
	bitLen64, ok := new(big.Int).SetString("0x8000000000000000", 0)
	require.True(t, ok)

	bitLen80, ok := new(big.Int).SetString("0x80000000000000000000", 0)
	require.True(t, ok)

	expBitLen80, ok := new(big.Int).SetString("302231454903657293676526", 0)
	require.True(t, ok)

	testCases := []struct {
		msg        string
		data       TxData
		expChainID *big.Int
	}{
		{
			"v = -1", &LegacyTx{V: big.NewInt(-1).Bytes()}, nil,
		},
		{
			"v = 0", &LegacyTx{V: big.NewInt(0).Bytes()}, nil,
		},
		{
			"v = 1", &LegacyTx{V: big.NewInt(1).Bytes()}, nil,
		},
		{
			"v = 27", &LegacyTx{V: big.NewInt(27).Bytes()}, new(big.Int),
		},
		{
			"v = 28", &LegacyTx{V: big.NewInt(28).Bytes()}, new(big.Int),
		},
		{
			"Ethereum mainnet", &LegacyTx{V: big.NewInt(37).Bytes()}, big.NewInt(1),
		},
		{
			"chain ID 9000", &LegacyTx{V: big.NewInt(18035).Bytes()}, big.NewInt(9000),
		},
		{
			"bit len 64", &LegacyTx{V: bitLen64.Bytes()}, big.NewInt(4611686018427387886),
		},
		{
			"bit len 80", &LegacyTx{V: bitLen80.Bytes()}, expBitLen80,
		},
		{
			"v = nil ", &LegacyTx{V: nil}, nil,
		},
	}

	for _, tc := range testCases {
		v, _, _ := tc.data.GetRawSignatureValues()

		chainID := DeriveChainID(v)
		require.Equal(t, tc.expChainID, chainID, tc.msg)
	}
}
