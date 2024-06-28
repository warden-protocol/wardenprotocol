package keeper_test

import (
	"testing"

	"github.com/stretchr/testify/require"

	keepertest "github.com/warden-protocol/wardenprotocol/warden/testutil/keeper"
	types "github.com/warden-protocol/wardenprotocol/warden/x/act/types/v1beta1"
)

func TestGetParams(t *testing.T) {
	k, ctx := keepertest.ActKeeper(t)
	params := types.DefaultParams()

	require.NoError(t, k.SetParams(ctx, params))
	require.EqualValues(t, params, k.GetParams(ctx))
}
