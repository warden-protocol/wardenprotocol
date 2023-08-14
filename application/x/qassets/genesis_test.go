package qassets_test

import (
	"testing"

	"github.com/stretchr/testify/require"
	keepertest "gitlab.qredo.com/qrdochain/fusionchain/testutil/keeper"
	"gitlab.qredo.com/qrdochain/fusionchain/testutil/nullify"
	"gitlab.qredo.com/qrdochain/fusionchain/x/qassets"
	"gitlab.qredo.com/qrdochain/fusionchain/x/qassets/types"
)

func TestGenesis(t *testing.T) {
	genesisState := types.GenesisState{
		Params: types.DefaultParams(),

		// this line is used by starport scaffolding # genesis/test/state
	}

	k, ctx := keepertest.QassetsKeeper(t)
	qassets.InitGenesis(ctx, *k, genesisState)
	got := qassets.ExportGenesis(ctx, *k)
	require.NotNil(t, got)

	nullify.Fill(&genesisState)
	nullify.Fill(got)

	// this line is used by starport scaffolding # genesis/test/assert
}
