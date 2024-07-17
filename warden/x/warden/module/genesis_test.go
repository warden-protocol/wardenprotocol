package warden_test

import (
	"testing"

	"github.com/stretchr/testify/require"
	keepertest "github.com/warden-protocol/wardenprotocol/warden/testutil/keeper"
	"github.com/warden-protocol/wardenprotocol/warden/testutil/nullify"
	"github.com/warden-protocol/wardenprotocol/warden/x/warden/module"
	types "github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta3"
)

func TestGenesis(t *testing.T) {
	genesisState := types.GenesisState{
		Params: types.DefaultParams(),

		// this line is used by starport scaffolding # genesis/test/state
	}

	k, ctx := keepertest.WardenKeeper(t)
	warden.InitGenesis(ctx, k, genesisState)
	got := warden.ExportGenesis(ctx, k)
	require.NotNil(t, got)

	nullify.Fill(&genesisState)
	nullify.Fill(got)

	// this line is used by starport scaffolding # genesis/test/assert
}
