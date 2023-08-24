package identity_test

import (
	"testing"

	keepertest "github.com/qredo/fusionchain/testutil/keeper"
	"github.com/qredo/fusionchain/testutil/nullify"
	"github.com/qredo/fusionchain/x/identity"
	"github.com/qredo/fusionchain/x/identity/types"
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
