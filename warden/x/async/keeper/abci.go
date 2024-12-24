package keeper

import "context"

func (k Keeper) BeginBlocker(ctx context.Context) error {
	return nil
}

func (k Keeper) EndBlocker(ctx context.Context) error {
	return nil
}
