package keeper

import (
	"cosmossdk.io/collections"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/warden-protocol/wardenprotocol/warden/x/intent/types"
)

func (k *Keeper) ImportState(ctx sdk.Context, genState types.GenesisState) error {
	for _, action := range genState.Actions {
		if err := k.ActionKeeper.Set(ctx, action); err != nil {
			return err
		}

		for _, addr := range action.Mentions {
			key := collections.Join(sdk.MustAccAddressFromBech32(addr), action.Id)
			if err := k.ActionKeeper.actionByAddress.Set(ctx, key, action.Id); err != nil {
				return err
			}
		}
	}

	for _, rule := range genState.Intents {
		if err := k.intents.Set(ctx, rule.Id, rule); err != nil {
			return err
		}
	}

	return nil
}

func (k *Keeper) ExportState(ctx sdk.Context, genState *types.GenesisState) error {
	actionsIter, err := k.ActionKeeper.Coll().Iterate(ctx, nil)
	if err != nil {
		return err
	}
	defer actionsIter.Close()

	genState.Actions, err = actionsIter.Values()
	if err != nil {
		return err
	}

	intentsIter, err := k.intents.Iterate(ctx, nil)
	if err != nil {
		return err
	}
	defer intentsIter.Close()

	genState.Intents, err = intentsIter.Values()
	if err != nil {
		return err
	}

	return nil
}
