package keeper_test

import (
	"context"
	"testing"

	"github.com/stretchr/testify/require"

	keepertest "github.com/warden-protocol/wardenprotocol/warden/testutil/keeper"
	"github.com/warden-protocol/wardenprotocol/warden/x/warden/keeper"
	types "github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta3"
)

func setupMsgServer(t testing.TB) (keeper.Keeper, types.MsgServer, context.Context) {
	k, ctx := keepertest.WardenKeeper(t)
	return k, keeper.NewMsgServerImpl(k), ctx
}

func TestMsgServer(t *testing.T) {
	k, ms, ctx := setupMsgServer(t)
	require.NotNil(t, ms)
	require.NotNil(t, ctx)
	require.NotEmpty(t, k)
}
