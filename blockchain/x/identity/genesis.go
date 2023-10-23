package identity

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/qredo/fusionchain/x/identity/keeper"
	"github.com/qredo/fusionchain/x/identity/types"
)

// InitGenesis initializes the module's state from a provided genesis state.
func InitGenesis(ctx sdk.Context, k keeper.Keeper, genState types.GenesisState) {
	// this line is used by starport scaffolding # genesis/module/init
	k.SetParams(ctx, genState.Params)

	for i := range genState.Keyrings {
		k.SetKeyring(ctx, &genState.Keyrings[i])
	}
	k.SetKeyringCount(ctx, uint64(len(genState.Keyrings)))

	for i := range genState.Workspaces {
		k.SetWorkspace(ctx, &genState.Workspaces[i])
	}
	k.SetWorkspaceCount(ctx, uint64(len(genState.Workspaces)))
}

// ExportGenesis returns the module's exported genesis
func ExportGenesis(ctx sdk.Context, k keeper.Keeper) *types.GenesisState {
	genesis := types.DefaultGenesis()
	genesis.Params = k.GetParams(ctx)

	// this line is used by starport scaffolding # genesis/module/export

	return genesis
}
