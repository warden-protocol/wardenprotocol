package app

import (
	"context"

	upgradetypes "cosmossdk.io/x/upgrade/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/module"
	evmtypes "github.com/cosmos/evm/x/vm/types"
)

func (app App) RegisterUpgradeHandlers() {
	evmtypes.SetDefaultEvmCoinInfo(evmtypes.EvmCoinInfo{
		Denom:         "award",
		ExtendedDenom: "award",
		DisplayDenom:  "WARD",
		Decimals:      18,
	})

	app.UpgradeKeeper.SetUpgradeHandler("v0.7.7", func(ctx context.Context, plan upgradetypes.Plan, fromVM module.VersionMap) (module.VersionMap, error) {
		sdkCtx := sdk.UnwrapSDKContext(ctx)

		params := app.EVMKeeper.GetParams(sdkCtx)

		var newPrecompiles []string

		for _, addr := range params.ActiveStaticPrecompiles {
			if addr == "0x0000000000000000000000000000000000000802" ||
				addr == "0x0000000000000000000000000000000000000900" ||
				addr == "0x0000000000000000000000000000000000000901" ||
				addr == "0x0000000000000000000000000000000000000902" ||
				addr == "0x0000000000000000000000000000000000000903" ||
				addr == "0x0000000000000000000000000000000000000904" ||
				addr == "0x0000000000000000000000000000000000000905" {
				continue
			}

			newPrecompiles = append(newPrecompiles, addr)
		}

		params.ActiveStaticPrecompiles = newPrecompiles

		if err := app.EVMKeeper.SetParams(sdkCtx, params); err != nil {
			return fromVM, err
		}

		return app.ModuleManager.RunMigrations(ctx, app.Configurator(), fromVM)
	})
}
