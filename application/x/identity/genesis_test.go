package identity_test

import (
	"testing"

	keepertest "gitlab.qredo.com/qrdochain/fusionchain/testutil/keeper"
	"gitlab.qredo.com/qrdochain/fusionchain/testutil/nullify"
	"gitlab.qredo.com/qrdochain/fusionchain/x/identity"
	"gitlab.qredo.com/qrdochain/fusionchain/x/identity/types"
	"github.com/stretchr/testify/require"
)

func TestGenesis(t *testing.T) {
	genesisState := types.GenesisState{
		Params: types.DefaultParams(),

		// this line is used by starport scaffolding # genesis/test/state
	}

	k, ctx := keepertest.IdentityKeeper(t)
	identity.InitGenesis(ctx, *k, genesisState)
	got := identity.ExportGenesis(ctx, *k)
	require.NotNil(t, got)

	nullify.Fill(&genesisState)
	nullify.Fill(got)

	// this line is used by starport scaffolding # genesis/test/assert
}
