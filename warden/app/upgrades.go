package app

import (
	"context"
	"fmt"

	upgradetypes "cosmossdk.io/x/upgrade/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/module"
	evmtypes "github.com/cosmos/evm/x/vm/types"
)

func (app App) RegisterUpgradeHandlers() {
	app.UpgradeKeeper.SetUpgradeHandler("v0.7.2", func(ctx context.Context, plan upgradetypes.Plan, fromVM module.VersionMap) (module.VersionMap, error) {
		sdkCtx := sdk.UnwrapSDKContext(ctx)

		if err := app.EVMKeeper.AddPreinstalls(sdkCtx, evmtypes.DefaultPreinstalls); err != nil { //nolint
			return nil, fmt.Errorf("enable preinstalls: %w", err)
		}

		return app.ModuleManager.RunMigrations(ctx, app.Configurator(), fromVM)
	})
}
