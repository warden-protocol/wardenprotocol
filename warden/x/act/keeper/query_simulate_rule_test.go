package keeper_test

import (
	"testing"

	"github.com/stretchr/testify/require"

	keepertest "github.com/warden-protocol/wardenprotocol/warden/testutil/keeper"
	types "github.com/warden-protocol/wardenprotocol/warden/x/act/types/v1beta1"
)

func TestSimulateRuleQuery(t *testing.T) {
	keeper, ctx := keepertest.ActKeeper(t)

	response, err := keeper.SimulateRule(ctx, &types.QuerySimulateRuleRequest{Definition: "1 + 2 * 2 <= 5"})

	require.NoError(t, err)
	require.Equal(t, &types.QuerySimulateRuleResponse{Evaluation: "true"}, response)

	_, err = keeper.SimulateRule(ctx, &types.QuerySimulateRuleRequest{Definition: "1 + 2 * 2 <="})
	require.Error(t, err)
}
