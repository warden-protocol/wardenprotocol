package keeper

import (
	sdk "github.com/cosmos/cosmos-sdk/types"

	v010 "github.com/evmos/ethermint/x/feemarket/migrations/v010"
	v011 "github.com/evmos/ethermint/x/feemarket/migrations/v011"
)

// Migrator is a struct for handling in-place store migrations.
type Migrator struct {
	keeper Keeper
}

// NewMigrator returns a new Migrator.
func NewMigrator(keeper Keeper) Migrator {
	return Migrator{
		keeper: keeper,
	}
}

// Migrate1to2 migrates the store from consensus version v1 to v2
func (m Migrator) Migrate1to2(ctx sdk.Context) error {
	return v010.MigrateStore(ctx, &m.keeper.paramSpace, m.keeper.storeKey)
}

// Migrate2to3 migrates the store from consensus version v2 to v3
func (m Migrator) Migrate2to3(ctx sdk.Context) error {
	return v011.MigrateStore(ctx, &m.keeper.paramSpace)
}
