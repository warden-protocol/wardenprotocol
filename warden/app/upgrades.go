package app

import (
	"context"
	"fmt"

	upgradetypes "cosmossdk.io/x/upgrade/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/module"
	"github.com/cosmos/evm/x/erc20/types"
	evmtypes "github.com/cosmos/evm/x/vm/types"
	"github.com/ethereum/go-ethereum/common"
)

func (app App) RegisterUpgradeHandlers() {
	evmtypes.SetDefaultEvmCoinInfo(evmtypes.EvmCoinInfo{
		Denom:         "award",
		ExtendedDenom: "award",
		DisplayDenom:  "WARD",
		Decimals:      18,
	})

	app.UpgradeKeeper.SetUpgradeHandler("v0.7.4", func(ctx context.Context, plan upgradetypes.Plan, fromVM module.VersionMap) (module.VersionMap, error) {
		sdkCtx := sdk.UnwrapSDKContext(ctx)

		nativeErc20Address := "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"
		pair := types.NewTokenPair(
			common.HexToAddress(nativeErc20Address),
			"award",
			types.OWNER_MODULE,
		)

		if err := app.Erc20Keeper.SetToken(sdkCtx, pair); err != nil {
			return nil, fmt.Errorf("erc20 set token: %w", err)
		}

		if err := app.Erc20Keeper.EnableNativePrecompile(sdkCtx, common.HexToAddress(nativeErc20Address)); err != nil {
			return nil, fmt.Errorf("erc20 enable native precompile: %w", err)
		}

		return app.ModuleManager.RunMigrations(ctx, app.Configurator(), fromVM)
	})
}
