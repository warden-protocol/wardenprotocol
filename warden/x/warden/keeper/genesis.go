package keeper

import (
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"

	types "github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta3"
)

func (k *Keeper) ImportState(ctx sdk.Context, genState types.GenesisState) error {
	err := k.keychains.Import(ctx, genState.Keychains, func(k types.Keychain) uint64 {
		return k.Id
	})
	if err != nil {
		return fmt.Errorf("failed to import keychains: %w", err)
	}

	err = k.SpacesKeeper.Import(ctx, genState.Spaces)
	if err != nil {
		return fmt.Errorf("failed to import spaces: %w", err)
	}

	err = k.keyRequests.Import(ctx, genState.KeyRequests, func(req types.KeyRequest) uint64 {
		return req.Id
	})
	if err != nil {
		return fmt.Errorf("failed to import key requests: %w", err)
	}

	for _, key := range genState.Keys {
		err := k.KeysKeeper.Set(ctx, &key)
		if err != nil {
			return fmt.Errorf("failed to import keys: %w", err)
		}
	}

	err = k.signRequests.Import(ctx, genState.SignRequests, func(req types.SignRequest) uint64 {
		return req.Id
	})
	if err != nil {
		return fmt.Errorf("failed to import signature requests: %w", err)
	}

	return nil
}

func (k *Keeper) ExportState(ctx sdk.Context, genState *types.GenesisState) error {
	keychains, err := k.keychains.Export(ctx)
	if err != nil {
		return fmt.Errorf("failed to export keychains: %w", err)
	}

	genState.Keychains = keychains

	spaces, err := k.SpacesKeeper.Coll().Export(ctx)
	if err != nil {
		return fmt.Errorf("failed to export spaces: %w", err)
	}

	genState.Spaces = spaces

	keyRequests, err := k.keyRequests.Export(ctx)
	if err != nil {
		return fmt.Errorf("failed to export key requests: %w", err)
	}

	genState.KeyRequests = keyRequests

	keysIter, err := k.KeysKeeper.Coll().Iterate(ctx, nil)
	if err != nil {
		return fmt.Errorf("failed to iterate keys: %w", err)
	}

	defer keysIter.Close()

	keys, err := keysIter.Values()
	if err != nil {
		return fmt.Errorf("failed to export keys: %w", err)
	}

	genState.Keys = keys

	SignRequests, err := k.signRequests.Export(ctx)
	if err != nil {
		return fmt.Errorf("failed to export signature requests: %w", err)
	}

	genState.SignRequests = SignRequests

	return nil
}
