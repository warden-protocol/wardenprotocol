package keeper

import (
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/warden-protocol/wardenprotocol/warden/x/warden/types"
)

func (k *Keeper) ImportState(ctx sdk.Context, genState types.GenesisState) error {
	for _, kr := range genState.Keychains {
		id, err := k.keychains.Append(ctx, kr)
		if err != nil {
			panic(err)
		}

		if id != kr.Id {
			return fmt.Errorf("keychain ID mismatch: expected %d, got %d. Update your genesis file to use %d.", id, kr.Id, id)
		}
	}

	for _, space := range genState.Spaces {
		id, err := k.spaces.Append(ctx, space)
		if err != nil {
			panic(err)
		}

		if id != space.Id {
			return fmt.Errorf("space ID mismatch: expected %d, got %d. Update your genesis file to use %d.", id, space.Id, id)
		}
	}

	return nil
}
