package intent_test

import (
	"testing"

	"github.com/stretchr/testify/require"
	keepertest "github.com/warden-protocol/wardenprotocol/warden/testutil/keeper"
	"github.com/warden-protocol/wardenprotocol/warden/testutil/nullify"
	"github.com/warden-protocol/wardenprotocol/warden/x/intent/module"
	"github.com/warden-protocol/wardenprotocol/warden/x/intent/types"
)

func TestGenesis(t *testing.T) {
	genesisState := types.GenesisState{
		Params: types.DefaultParams(),

		// this line is used by starport scaffolding # genesis/test/state
	}

	k, ctx := keepertest.IntentKeeper(t)
	intent.InitGenesis(ctx, k, genesisState)
	got := intent.ExportGenesis(ctx, k)
	require.NotNil(t, got)

	nullify.Fill(&genesisState)
	nullify.Fill(got)

	// this line is used by starport scaffolding # genesis/test/assert
}
