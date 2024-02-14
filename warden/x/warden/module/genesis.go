package warden

import (
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"

	"github.com/warden-protocol/wardenprotocol/warden/x/warden/keeper"
	"github.com/warden-protocol/wardenprotocol/warden/x/warden/types"
)

// InitGenesis initializes the module's state from a provided genesis state.
func InitGenesis(ctx sdk.Context, k keeper.Keeper, genState types.GenesisState) {
	// this line is used by starport scaffolding # genesis/module/init
	err := k.SetParams(ctx, genState.Params)
	if err != nil {
		panic(err)
	}

	for _, kr := range genState.Keychains {
		addr, err := k.CreateKeychain(ctx, *kr)
		if err != nil {
			panic(err)
		}

		if addr != kr.Address {
			panic(fmt.Errorf("keychain address mismatch: should be %s, got %s. Update your genesis file to use %s.", addr, kr.Address, addr))
		}
	}

	for _, r := range genState.Spaces {
		addr, err := k.CreateSpace(ctx, *r)
		if err != nil {
			panic(err)
		}

		if addr != r.Address {
			panic(fmt.Errorf("space address mismatch: should be %s, got %s. Update your genesis file to use %s.", addr, r.Address, addr))
		}
	}
}

// ExportGenesis returns the module's exported genesis.
func ExportGenesis(ctx sdk.Context, k keeper.Keeper) *types.GenesisState {
	genesis := types.DefaultGenesis()
	genesis.Params = k.GetParams(ctx)

	// this line is used by starport scaffolding # genesis/module/export

	return genesis
}
