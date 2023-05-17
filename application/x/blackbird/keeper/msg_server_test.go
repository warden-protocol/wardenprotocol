package keeper_test

import (
	"context"
	"testing"

	keepertest "blackbird/testutil/keeper"
	"blackbird/x/blackbird/keeper"
	"blackbird/x/blackbird/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func setupMsgServer(t testing.TB) (types.MsgServer, context.Context) {
	k, ctx := keepertest.BlackbirdKeeper(t)
	return keeper.NewMsgServerImpl(*k), sdk.WrapSDKContext(ctx)
}
