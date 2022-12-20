package types

import (
	"fmt"
	"testing"

	"github.com/ethereum/go-ethereum/common"
	"github.com/stretchr/testify/require"
)

func TestUnmarshalBlockNumberOrHash(t *testing.T) {
	bnh := new(BlockNumberOrHash)

	testCases := []struct {
		msg      string
		input    []byte
		malleate func()
		expPass  bool
	}{
		{
			"JSON input with block hash",
			[]byte("{\"blockHash\": \"0x579917054e325746fda5c3ee431d73d26255bc4e10b51163862368629ae19739\"}"),
			func() {
				require.Equal(t, *bnh.BlockHash, common.HexToHash("0x579917054e325746fda5c3ee431d73d26255bc4e10b51163862368629ae19739"))
				require.Nil(t, bnh.BlockNumber)
			},
			true,
		},
		{
			"JSON input with block number",
			[]byte("{\"blockNumber\": \"0x35\"}"),
			func() {
				require.Equal(t, *bnh.BlockNumber, BlockNumber(0x35))
				require.Nil(t, bnh.BlockHash)
			},
			true,
		},
		{
			"JSON input with block number latest",
			[]byte("{\"blockNumber\": \"latest\"}"),
			func() {
				require.Equal(t, *bnh.BlockNumber, EthLatestBlockNumber)
				require.Nil(t, bnh.BlockHash)
			},
			true,
		},
		{
			"JSON input with both block hash and block number",
			[]byte("{\"blockHash\": \"0x579917054e325746fda5c3ee431d73d26255bc4e10b51163862368629ae19739\", \"blockNumber\": \"0x35\"}"),
			func() {
			},
			false,
		},
		{
			"String input with block hash",
			[]byte("\"0x579917054e325746fda5c3ee431d73d26255bc4e10b51163862368629ae19739\""),
			func() {
				require.Equal(t, *bnh.BlockHash, common.HexToHash("0x579917054e325746fda5c3ee431d73d26255bc4e10b51163862368629ae19739"))
				require.Nil(t, bnh.BlockNumber)
			},
			true,
		},
		{
			"String input with block number",
			[]byte("\"0x35\""),
			func() {
				require.Equal(t, *bnh.BlockNumber, BlockNumber(0x35))
				require.Nil(t, bnh.BlockHash)
			},
			true,
		},
		{
			"String input with block number latest",
			[]byte("\"latest\""),
			func() {
				require.Equal(t, *bnh.BlockNumber, EthLatestBlockNumber)
				require.Nil(t, bnh.BlockHash)
			},
			true,
		},
		{
			"String input with block number overflow",
			[]byte("\"0xffffffffffffffffffffffffffffffffffffff\""),
			func() {
			},
			false,
		},
	}

	for _, tc := range testCases {
		fmt.Sprintf("Case %s", tc.msg)
		// reset input
		bnh = new(BlockNumberOrHash)
		err := bnh.UnmarshalJSON(tc.input)
		tc.malleate()
		if tc.expPass {
			require.NoError(t, err)
		} else {
			require.Error(t, err)
		}
	}
}
