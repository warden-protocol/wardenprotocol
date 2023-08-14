package keeper_test

import (
	"context"
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	keepertest "gitlab.qredo.com/qrdochain/fusionchain/testutil/keeper"
	"gitlab.qredo.com/qrdochain/fusionchain/x/treasury/keeper"
	"gitlab.qredo.com/qrdochain/fusionchain/x/treasury/types"
)

func setupMsgServer(t testing.TB) (types.MsgServer, context.Context) {
	k, ctx := keepertest.TreasuryKeeper(t)
	return keeper.NewMsgServerImpl(*k), sdk.WrapSDKContext(ctx)
}
