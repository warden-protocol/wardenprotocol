package keeper

import (
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"

	types "github.com/warden-protocol/wardenprotocol/warden/x/act/types/v1beta1"
)

func (k *Keeper) ImportState(ctx sdk.Context, genState types.GenesisState) error {
	err := k.templates.Import(ctx, genState.Templates, func(k types.Template) uint64 {
		return k.Id
	})
	if err != nil {
		return fmt.Errorf("failed to import templates: %w", err)
	}

	err = k.ActionKeeper.Import(ctx, genState.Actions)
	if err != nil {
		return fmt.Errorf("failed to import actions: %w", err)
	}

	return nil
}

func (k *Keeper) ExportState(ctx sdk.Context, genState *types.GenesisState) error {
	templates, err := k.templates.Export(ctx)
	if err != nil {
		return fmt.Errorf("failed to export templates: %w", err)
	}

	genState.Templates = templates

	actions, err := k.ActionKeeper.Coll().Export(ctx)
	if err != nil {
		return fmt.Errorf("failed to export actions: %w", err)
	}

	genState.Actions = actions

	return nil
}
