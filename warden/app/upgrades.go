package app

import (
	"context"
	"fmt"

	"cosmossdk.io/core/comet"
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

	app.UpgradeKeeper.SetUpgradeHandler("v1.0.0", func(ctx context.Context, plan upgradetypes.Plan, fromVM module.VersionMap) (module.VersionMap, error) {
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

	// No state changes. Registered so that nodes still on the previous binary
	// halt at the upgrade height instead of diverging once misbehaviour is
	// reported at or below recoveryEvidenceHeight.
	app.UpgradeKeeper.SetUpgradeHandler("v1.0.3", func(ctx context.Context, plan upgradetypes.Plan, fromVM module.VersionMap) (module.VersionMap, error) {
		return app.ModuleManager.RunMigrations(ctx, app.Configurator(), fromVM)
	})
}

var emergencyUpgradeHeight int64 = 4476100

func (app *App) emergencyUpgrade4476100(ctx sdk.Context) error {
	origEvts := ctx.EventManager().Events()

	fromTo := map[string]string{
		"0xFaa234ae14182A08ca8a8754647E2059077c5C66": "0x277607345D6e78343532431a65467C0046639F8e",
		"0xDf61AbCC605a592e3Cf3f1E1e0Fe66AB9b155a8f": "0x4da9DD8356d85c660e779daBceb8AAf5Af76180f",
		"0xF7a54B20E5734B842D96b1cD48c698031B52f4f2": "0xA1b1bd13DcDcfA3F832721b86ba39ccBa4e2a147",
		"0xD449C7385a9DAECB5251DDc406A4B35Be75ce6F8": "0x4da9DD8356d85c660e779daBceb8AAf5Af76180f",
		"0x0a0255F0F1260795116f759C38dAAccC882C695A": "0x277607345D6e78343532431a65467C0046639F8e",
		"0x1a1736d41B580744f5161552580D4DD18c560498": "0xA1b1bd13DcDcfA3F832721b86ba39ccBa4e2a147",
		"0xb61e178d2C99596B23ED144c6bF892fD37532440": "0xA1b1bd13DcDcfA3F832721b86ba39ccBa4e2a147",
	}

	for fromS, toS := range fromTo {
		from := sdk.AccAddress(common.FromHex(fromS))
		to := sdk.AccAddress(common.FromHex(toS))
		coins := app.BankKeeper.GetAllBalances(ctx, from)

		if err := app.BankKeeper.SendCoins(ctx, from, to, coins); err != nil {
			ctx.Logger().Error("error executing upgrader", "err", err)
			return err
		}
	}

	ctx.EventManager().OverrideEvents(origEvts)

	return nil
}

// recoveryEvidenceHeight is the last height replaced by the 2026-08-23 recovery
// restart. Misbehaviour reported at or below it is ignored; every height above
// it is still slashed.
const recoveryEvidenceHeight int64 = 10136091

type recoveryFilteredBlockInfo struct{ comet.BlockInfo }

func (b recoveryFilteredBlockInfo) GetEvidence() comet.EvidenceList {
	src := b.BlockInfo.GetEvidence()
	kept := make(filteredEvidenceList, 0, src.Len())

	for i := 0; i < src.Len(); i++ {
		if ev := src.Get(i); ev.Height() > recoveryEvidenceHeight {
			kept = append(kept, ev)
		}
	}

	return kept
}

type filteredEvidenceList []comet.Evidence

func (l filteredEvidenceList) Len() int                 { return len(l) }
func (l filteredEvidenceList) Get(i int) comet.Evidence { return l[i] }
