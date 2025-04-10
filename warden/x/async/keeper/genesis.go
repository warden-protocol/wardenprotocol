package keeper

import (
	sdk "github.com/cosmos/cosmos-sdk/types"

	"github.com/warden-protocol/wardenprotocol/prophet"
	types "github.com/warden-protocol/wardenprotocol/warden/x/async/types/v1beta1"
)

func (k *Keeper) ImportState(ctx sdk.Context, genState types.GenesisState) error {
	return nil
}

func (k *Keeper) ExportState(ctx sdk.Context, genState *types.GenesisState) error {
	return nil
}

func (k *Keeper) AddProphetPlugins(ctx sdk.Context) error {
	for _, p := range prophet.RegisteredPlugins() {
		if err := k.AddPlugin(ctx, types.Plugin{
			Id:          p,
			Creator:     "",
			Description: "",
		}); err != nil {
			return err
		}
	}

	return nil
}
