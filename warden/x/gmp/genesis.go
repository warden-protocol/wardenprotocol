package gmp

import (
	sdk "github.com/cosmos/cosmos-sdk/types"

	"github.com/warden-protocol/warden/x/gmp/keeper"
	"github.com/warden-protocol/warden/x/gmp/types"
)

// InitGenesis initializes the x/gmp module's state from a provided genesis
// state.
func InitGenesis(ctx sdk.Context, keeper keeper.Keeper, genState types.GenesisState) {
	keeper.SetParams(ctx, genState.Params)
}

// ExportGenesis returns the x/gmp module's exported genesis.
func ExportGenesis(ctx sdk.Context, keeper keeper.Keeper) *types.GenesisState {
	genesisState := types.DefaultGenesisState()
	genesisState.Params = keeper.GetParams(ctx)
	return genesisState
}
