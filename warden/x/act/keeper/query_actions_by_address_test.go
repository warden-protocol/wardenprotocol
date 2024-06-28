package keeper_test

import (
	"fmt"
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/query"
	"github.com/stretchr/testify/require"

	keepertest "github.com/warden-protocol/wardenprotocol/warden/testutil/keeper"
	types "github.com/warden-protocol/wardenprotocol/warden/x/act/types/v1beta1"
)

func init() {
	config := sdk.GetConfig()
	config.SetBech32PrefixForAccount("warden", "wardenpub")
}

func Benchmark_QueryActionsByAddress(b *testing.B) {
	k, ctx := keepertest.ActKeeper(b)

	// create many actions, each with a unique address
	for i := 0; i < 100_000; i++ {
		addr := sdk.MustBech32ifyAddressBytes(sdk.GetConfig().GetBech32AccountAddrPrefix(), []byte(fmt.Sprintf("address-%d", i)))

		_, err := k.ActionKeeper.New(
			ctx,
			&types.Action{
				Rule: types.Rule{
					Id: uint64(i),
				},
				Mentions: []string{
					addr,
				},
			},
		)
		require.NoError(b, err)
	}

	// query actions by a single address
	address := sdk.MustBech32ifyAddressBytes(sdk.GetConfig().GetBech32AccountAddrPrefix(), []byte(fmt.Sprintf("address-%d", 100)))
	req := &types.QueryActionsByAddressRequest{
		Address: address,
		Pagination: &query.PageRequest{
			// CountTotal helps investigate the performance of the pagination
			CountTotal: true,
			Limit:      1,
		},
	}
	b.ResetTimer()
	for i := 0; i < b.N; i++ {
		res, err := k.ActionsByAddress(ctx, req)
		require.NoError(b, err)
		require.NotNil(b, res)
	}
}
