package app

import (
	"context"
	"fmt"

	upgradetypes "cosmossdk.io/x/upgrade/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/module"
	banktypes "github.com/cosmos/cosmos-sdk/x/bank/types"
	evmtypes "github.com/cosmos/evm/x/vm/types"
)

func (app App) RegisterUpgradeHandlers() {
	app.UpgradeKeeper.SetUpgradeHandler("v0.7.2", func(ctx context.Context, plan upgradetypes.Plan, fromVM module.VersionMap) (module.VersionMap, error) {
		sdkCtx := sdk.UnwrapSDKContext(ctx)

		// cosmos/evm requires denom metadata to be set starting from v0.5.
		// Set metadata, if not already present.
		denom := "award"
		if _, metadataFound := app.BankKeeper.GetDenomMetaData(ctx, denom); !metadataFound {
			app.BankKeeper.SetDenomMetaData(ctx, banktypes.Metadata{
				Description: "The native token for Warden Protocol.",
				DenomUnits: []*banktypes.DenomUnit{
					{Denom: denom},
					{Denom: "ward", Exponent: 18},
				},
				Base:    denom,
				Display: "ward",
				Name:    "WARD",
				Symbol:  "WARD",
			})
		}

		// Initialize EvmCoinInfo in the module store.
		if err := app.EVMKeeper.InitEvmCoinInfo(sdkCtx); err != nil {
			return nil, err
		}

		// Enable default preinstalls.
		if err := app.EVMKeeper.AddPreinstalls(sdkCtx, evmtypes.DefaultPreinstalls); err != nil { //nolint
			return nil, fmt.Errorf("enable preinstalls: %w", err)
		}

		return app.ModuleManager.RunMigrations(ctx, app.Configurator(), fromVM)
	})
}
