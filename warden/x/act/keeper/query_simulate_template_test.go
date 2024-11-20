package keeper_test

import (
	"testing"

	"github.com/stretchr/testify/require"

	keepertest "github.com/warden-protocol/wardenprotocol/warden/testutil/keeper"
	types "github.com/warden-protocol/wardenprotocol/warden/x/act/types/v1beta1"
)

func TestSimulateTemplateQuery(t *testing.T) {
	keeper, ctx := keepertest.ActKeeper(t)

	response, err := keeper.SimulateTemplate(ctx, &types.QuerySimulateTemplateRequest{Definition: "1 + 2 * 2 <= 5"})

	require.NoError(t, err)
	require.Equal(t, &types.QuerySimulateTemplateResponse{Evaluation: "true"}, response)

	_, err = keeper.SimulateTemplate(ctx, &types.QuerySimulateTemplateRequest{Definition: "1 + 2 * 2 <="})
	require.Error(t, err)
}
