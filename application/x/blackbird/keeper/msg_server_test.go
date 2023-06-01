package keeper_test

import (
	"context"
	"testing"

	keepertest "blackbird/testutil/keeper"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"gitlab.qredo.com/qrdochain/fusionchain/x/blackbird/keeper"
	"gitlab.qredo.com/qrdochain/fusionchain/x/blackbird/types"
)

func setupMsgServer(t testing.TB) (types.MsgServer, context.Context) {
	k, ctx := keepertest.BlackbirdKeeper(t)
	return keeper.NewMsgServerImpl(*k), sdk.WrapSDKContext(ctx)
}
