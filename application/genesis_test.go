package blackbird_test

import (
	"testing"

	keepertest "blackbird/testutil/keeper"
	"blackbird/testutil/nullify"
	"gitlab.qredo.com/qrdochain/fusionchain/x/blackbird"
	"gitlab.qredo.com/qrdochain/fusionchain/x/blackbird/types"
	"github.com/stretchr/testify/require"
)

func TestGenesis(t *testing.T) {
	genesisState := types.GenesisState{
		Params: types.DefaultParams(),

		// this line is used by starport scaffolding # genesis/test/state
	}

	k, ctx := keepertest.BlackbirdKeeper(t)
	blackbird.InitGenesis(ctx, *k, genesisState)
	got := blackbird.ExportGenesis(ctx, *k)
	require.NotNil(t, got)

	nullify.Fill(&genesisState)
	nullify.Fill(got)

	// this line is used by starport scaffolding # genesis/test/assert
}
