package keeper_test

import (
	"context"
	"testing"

	keepertest "github.com/qredo/fusionchain/testutil/keeper"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/qredo/fusionchain/x/blackbird/keeper"
	"github.com/qredo/fusionchain/x/blackbird/types"
)

func setupMsgServer(t testing.TB) (types.MsgServer, context.Context) {
	k, ctx := keepertest.BlackbirdKeeper(t)
	return keeper.NewMsgServerImpl(*k), sdk.WrapSDKContext(ctx)
}
