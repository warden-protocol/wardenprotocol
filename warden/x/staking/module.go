// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/evmos/blob/main/LICENSE)

package staking

import (
	"fmt"

	"cosmossdk.io/core/appmodule"

	"github.com/cosmos/cosmos-sdk/codec"
	"github.com/cosmos/cosmos-sdk/types/module"
	"github.com/cosmos/cosmos-sdk/x/auth/exported"
	"github.com/cosmos/cosmos-sdk/x/staking"
	stakingkeeper "github.com/cosmos/cosmos-sdk/x/staking/keeper"
	"github.com/cosmos/cosmos-sdk/x/staking/types"

	"github.com/evmos/evmos/v20/x/staking/keeper"
)

var (
	_ module.AppModuleBasic      = AppModuleBasic{}
	_ module.AppModuleSimulation = AppModule{}
	_ module.HasServices         = AppModule{}
	_ module.HasInvariants       = AppModule{}
	_ module.HasABCIGenesis      = AppModule{}
	_ module.HasABCIEndBlock     = AppModule{}

	_ appmodule.AppModule       = AppModule{}
	_ appmodule.HasBeginBlocker = AppModule{}
)

// AppModuleBasic defines the basic application module used by the staking module.
type AppModuleBasic struct {
	*staking.AppModuleBasic
}

// AppModule represents a wrapper around the Cosmos SDK staking module AppModule and
// the Evmos custom staking module keeper.
type AppModule struct {
	*staking.AppModule
	keeper         *keeper.Keeper
	legacySubspace exported.Subspace
}

// NewAppModule creates a wrapper for the staking module.
func NewAppModule(
	cdc codec.Codec,
	k *keeper.Keeper,
	ak types.AccountKeeper,
	bk types.BankKeeper,
	ls exported.Subspace,
) AppModule {
	am := staking.NewAppModule(cdc, k.Keeper, ak, bk, ls)
	return AppModule{
		AppModule:      &am,
		keeper:         k,
		legacySubspace: ls,
	}
}

// RegisterServices registers module services.
func (am AppModule) RegisterServices(cfg module.Configurator) {
	// Override Staking Msg Server
	types.RegisterMsgServer(cfg.MsgServer(), keeper.NewMsgServerImpl(am.keeper))
	querier := stakingkeeper.Querier{Keeper: am.keeper.Keeper}
	types.RegisterQueryServer(cfg.QueryServer(), querier)

	// !! NOTE: when upgrading to a new cosmos-sdk version
	// !! Check if there're store migrations for the staking module
	// !! if so, you'll need to add them here
	m := stakingkeeper.NewMigrator(am.keeper.Keeper, am.legacySubspace)
	if err := cfg.RegisterMigration(types.ModuleName, 1, m.Migrate1to2); err != nil {
		panic(fmt.Sprintf("failed to migrate x/%s from version 1 to 2: %v", types.ModuleName, err))
	}
	if err := cfg.RegisterMigration(types.ModuleName, 2, m.Migrate2to3); err != nil {
		panic(fmt.Sprintf("failed to migrate x/%s from version 2 to 3: %v", types.ModuleName, err))
	}
	if err := cfg.RegisterMigration(types.ModuleName, 3, m.Migrate3to4); err != nil {
		panic(fmt.Sprintf("failed to migrate x/%s from version 3 to 4: %v", types.ModuleName, err))
	}
	if err := cfg.RegisterMigration(types.ModuleName, 4, m.Migrate4to5); err != nil {
		panic(fmt.Sprintf("failed to migrate x/%s from version 4 to 5: %v", types.ModuleName, err))
	}
}
