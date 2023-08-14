package keeper_test

import (
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/stretchr/testify/require"
	testkeeper "gitlab.qredo.com/qrdochain/fusionchain/testutil/keeper"
	"gitlab.qredo.com/qrdochain/fusionchain/x/qassets/types"
)

func TestParamsQuery(t *testing.T) {
	keeper, ctx := testkeeper.QassetsKeeper(t)
	wctx := sdk.WrapSDKContext(ctx)
	params := types.DefaultParams()
	keeper.SetParams(ctx, params)

	response, err := keeper.Params(wctx, &types.QueryParamsRequest{})
	require.NoError(t, err)
	require.Equal(t, &types.QueryParamsResponse{Params: params}, response)
}
