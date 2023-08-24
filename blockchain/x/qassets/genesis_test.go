package qassets_test

import (
	"testing"

	"github.com/stretchr/testify/require"
	keepertest "github.com/qredo/fusionchain/testutil/keeper"
	"github.com/qredo/fusionchain/testutil/nullify"
	"github.com/qredo/fusionchain/x/qassets"
	"github.com/qredo/fusionchain/x/qassets/types"
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
