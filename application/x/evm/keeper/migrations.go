package keeper

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	v2 "gitlab.qredo.com/qrdochain/fusionchain/x/evm/migrations/v2"
	v3 "gitlab.qredo.com/qrdochain/fusionchain/x/evm/migrations/v3"
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
	return v2.MigrateStore(ctx, &m.keeper.paramSpace)
}

// Migrate2to3 migrates the store from consensus version v2 to v3
func (m Migrator) Migrate2to3(ctx sdk.Context) error {
	return v3.MigrateStore(ctx, &m.keeper.paramSpace)
}
