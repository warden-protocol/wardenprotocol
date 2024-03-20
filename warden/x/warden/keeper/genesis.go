package keeper

import (
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
	types "github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta2"
)

func (k *Keeper) ImportState(ctx sdk.Context, genState types.GenesisState) error {
	err := k.keychains.Import(ctx, genState.Keychains, func(k types.Keychain) uint64 {
		return k.Id
	})
	if err != nil {
		return fmt.Errorf("failed to import keychains: %w", err)
	}

	err = k.spaces.Import(ctx, genState.Spaces, func(k types.Space) uint64 {
		return k.Id
	})
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
		err := k.keys.Set(ctx, key.Id, key)
		if err != nil {
			return fmt.Errorf("failed to import keys: %w", err)
		}
	}

	err = k.signatureRequests.Import(ctx, genState.SignatureRequests, func(req types.SignRequest) uint64 {
		return req.Id
	})
	if err != nil {
		return fmt.Errorf("failed to import signature requests: %w", err)
	}

	err = k.signTransactionRequests.Import(ctx, genState.SignTransactionRequests, func(req types.SignTransactionRequest) uint64 {
		return req.Id
	})
	if err != nil {
		return fmt.Errorf("failed to import sign transaction requests: %w", err)
	}

	return nil
}

func (k *Keeper) ExportState(ctx sdk.Context, genState *types.GenesisState) error {
	keychains, err := k.keychains.Export(ctx)
	if err != nil {
		return fmt.Errorf("failed to export keychains: %w", err)
	}
	genState.Keychains = keychains

	spaces, err := k.spaces.Export(ctx)
	if err != nil {
		return fmt.Errorf("failed to export spaces: %w", err)
	}
	genState.Spaces = spaces

	keyRequests, err := k.keyRequests.Export(ctx)
	if err != nil {
		return fmt.Errorf("failed to export key requests: %w", err)
	}
	genState.KeyRequests = keyRequests

	keysIter, err := k.keys.Iterate(ctx, nil)
	if err != nil {
		return fmt.Errorf("failed to iterate keys: %w", err)
	}
	defer keysIter.Close()
	keys, err := keysIter.Values()
	if err != nil {
		return fmt.Errorf("failed to export keys: %w", err)
	}
	genState.Keys = keys

	signatureRequests, err := k.signatureRequests.Export(ctx)
	if err != nil {
		return fmt.Errorf("failed to export signature requests: %w", err)
	}
	genState.SignatureRequests = signatureRequests

	signTransactionRequests, err := k.signTransactionRequests.Export(ctx)
	if err != nil {
		return fmt.Errorf("failed to export sign transaction requests: %w", err)
	}
	genState.SignTransactionRequests = signTransactionRequests

	return nil
}
