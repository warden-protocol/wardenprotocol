// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:LGPL-3.0-only

package keeper

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	v2 "github.com/qredo/fusionchain/x/revenue/v1/migrations/v2"
	"github.com/qredo/fusionchain/x/revenue/v1/types"
)

// Migrator is a struct for handling in-place store migrations.
type Migrator struct {
	keeper         Keeper
	legacySubspace types.Subspace
}

// NewMigrator returns a new Migrator.
func NewMigrator(keeper Keeper, legacySubspace types.Subspace) Migrator {
	return Migrator{
		keeper:         keeper,
		legacySubspace: legacySubspace,
	}
}

// Migrate1to2 migrates the store from consensus version 1 to 2
func (m Migrator) Migrate1to2(ctx sdk.Context) error {
	return v2.MigrateStore(ctx, m.keeper.storeKey, m.legacySubspace, m.keeper.cdc)
}
