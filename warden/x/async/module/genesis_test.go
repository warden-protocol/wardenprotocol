package async_test

import (
	"testing"

	"github.com/stretchr/testify/require"

	keepertest "github.com/warden-protocol/wardenprotocol/warden/testutil/keeper"
	"github.com/warden-protocol/wardenprotocol/warden/testutil/nullify"
	async "github.com/warden-protocol/wardenprotocol/warden/x/async/module"
	types "github.com/warden-protocol/wardenprotocol/warden/x/async/types/v1beta1"
)

func TestGenesis(t *testing.T) {
	genesisState := types.GenesisState{
		Params: types.DefaultParams(),

		// this line is used by starport scaffolding # genesis/test/state
	}

	k, ctx := keepertest.AsyncKeeper(t)
	async.InitGenesis(ctx, k, genesisState)
	got := async.ExportGenesis(ctx, k)
	require.NotNil(t, got)

	nullify.Fill(&genesisState)
	nullify.Fill(got)
	// this line is used by starport scaffolding # genesis/test/assert
}
