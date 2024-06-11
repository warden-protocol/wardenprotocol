package keeper_test

import (
	"testing"

	"github.com/stretchr/testify/require"

	keepertest "github.com/warden-protocol/wardenprotocol/warden/testutil/keeper"
	"github.com/warden-protocol/wardenprotocol/warden/x/intent/types"
)

func TestSimulateIntentQuery(t *testing.T) {
	keeper, ctx := keepertest.IntentKeeper(t)

	response, err := keeper.SimulateIntent(ctx, &types.QuerySimulateIntentRequest{Definition: "1 + 2 * 2 <= 5"})

	require.NoError(t, err)
	require.Equal(t, &types.QuerySimulateIntentResponse{Evaluation: "true"}, response)

	_, err = keeper.SimulateIntent(ctx, &types.QuerySimulateIntentRequest{Definition: "1 + 2 * 2 <="})
	require.Error(t, err)
}
