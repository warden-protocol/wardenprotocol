package keeper

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	types "github.com/warden-protocol/wardenprotocol/warden/x/async/types/v1beta1"
)

func (k *Keeper) ImportState(ctx sdk.Context, genState types.GenesisState) error {
	return k.handlers.Import(ctx, genState.Handlers)
}

func (k *Keeper) ExportState(ctx sdk.Context, genState *types.GenesisState) error {
	handlers, err := k.handlers.Export(ctx)
	if err != nil {
		return err
	}
	genState.Handlers = handlers
	return nil
}
