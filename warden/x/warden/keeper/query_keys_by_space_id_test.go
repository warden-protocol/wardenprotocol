package keeper_test

import (
	"encoding/base64"
	"testing"

	"github.com/cosmos/cosmos-sdk/types/query"
	"github.com/stretchr/testify/require"

	keepertest "github.com/warden-protocol/wardenprotocol/warden/testutil/keeper"
	types "github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta3"
)

func Benchmark_QueryKeysBySpaceId(b *testing.B) {
	k, ctx := keepertest.WardenKeeper(b)

	pk, err := base64.StdEncoding.DecodeString("A8Ijpl1mphVgurSqcDfS4mVVSqgXVLubol7+Kgjay1I+")
	require.NoError(b, err)

	for i := 0; i < 100_000; i++ {
		err = k.KeysKeeper.New(
			ctx,
			&types.Key{
				Type:      types.KeyType_KEY_TYPE_ECDSA_SECP256K1,
				PublicKey: pk,
				SpaceId:   uint64(i),
			},
			types.KeyRequest{
				Id: uint64(i),
			},
		)
		require.NoError(b, err)
	}

	req := &types.QueryKeysBySpaceIdRequest{
		SpaceId: 9999,
		DeriveAddresses: []types.AddressType{
			types.AddressType_ADDRESS_TYPE_ETHEREUM,
			types.AddressType_ADDRESS_TYPE_OSMOSIS,
		},
		Pagination: &query.PageRequest{
			CountTotal: true,
			Limit:      1,
		},
	}
	b.ResetTimer()
	for i := 0; i < b.N; i++ {
		res, err := k.KeysBySpaceId(ctx, req)
		require.NoError(b, err)
		require.NotNil(b, res)
	}
}
