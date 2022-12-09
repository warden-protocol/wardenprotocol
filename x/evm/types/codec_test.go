package types

import (
	"testing"

	codectypes "github.com/cosmos/cosmos-sdk/codec/types"
	"github.com/stretchr/testify/require"
)

type caseAny struct {
	name    string
	any     *codectypes.Any
	expPass bool
}

func TestPackTxData(t *testing.T) {
	testCases := []struct {
		name    string
		txData  TxData
		expPass bool
	}{
		{
			"access list tx",
			&AccessListTx{},
			true,
		},
		{
			"legacy tx",
			&LegacyTx{},
			true,
		},
		{
			"nil",
			nil,
			false,
		},
	}

	testCasesAny := []caseAny{}

	for _, tc := range testCases {
		txDataAny, err := PackTxData(tc.txData)
		if tc.expPass {
			require.NoError(t, err, tc.name)
		} else {
			require.Error(t, err, tc.name)
		}

		testCasesAny = append(testCasesAny, caseAny{tc.name, txDataAny, tc.expPass})
	}

	for i, tc := range testCasesAny {
		cs, err := UnpackTxData(tc.any)
		if tc.expPass {
			require.NoError(t, err, tc.name)
			require.Equal(t, testCases[i].txData, cs, tc.name)
		} else {
			require.Error(t, err, tc.name)
		}
	}
}
