package keeper_test

import (
	"testing"

	testkeeper "blackbird/testutil/keeper"
	"github.com/sashaduke/fusion/x/blackbird/types"
	"github.com/stretchr/testify/require"
)

func TestGetParams(t *testing.T) {
	k, ctx := testkeeper.BlackbirdKeeper(t)
	params := types.DefaultParams()

	k.SetParams(ctx, params)

	require.EqualValues(t, params, k.GetParams(ctx))
}
