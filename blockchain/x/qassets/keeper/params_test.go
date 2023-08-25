package keeper_test

import (
	"testing"

	testkeeper "github.com/qredo/fusionchain/testutil/keeper"
	"github.com/qredo/fusionchain/x/qassets/types"
	"github.com/stretchr/testify/require"
)

func TestGetParams(t *testing.T) {
	k, ctx := testkeeper.QassetsKeeper(t)
	params := types.DefaultParams()

	k.SetParams(ctx, params)

	require.EqualValues(t, params, k.GetParams(ctx))
}
