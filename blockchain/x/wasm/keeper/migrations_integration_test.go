package keeper_test

import (
	"testing"

	tmproto "github.com/cometbft/cometbft/proto/tendermint/types"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/module"
	upgradetypes "github.com/cosmos/cosmos-sdk/x/upgrade/types"

	"github.com/CosmWasm/wasmd/app"
	"github.com/qredo/fusionchain/x/wasm/types"
)

func TestModuleMigrations(t *testing.T) {
	wasmApp := app.Setup(t)

	upgradeHandler := func(ctx sdk.Context, plan upgradetypes.Plan, fromVM module.VersionMap) (module.VersionMap, error) { //nolint:unparam
		return wasmApp.ModuleManager.RunMigrations(ctx, wasmApp.Configurator(), fromVM)
	}

	specs := map[string]struct {
		setup        func(ctx sdk.Context)
		startVersion uint64
		exp          types.Params
	}{
		"with legacy params migrated": {
			startVersion: 1,
			setup: func(ctx sdk.Context) {
				params := types.Params{
					CodeUploadAccess:             types.AllowNobody,
					InstantiateDefaultPermission: types.AccessTypeNobody,
				}
				sp, _ := wasmApp.ParamsKeeper.GetSubspace(types.ModuleName)
				sp.SetParamSet(ctx, &params)
			},
			exp: types.Params{
				CodeUploadAccess:             types.AllowNobody,
				InstantiateDefaultPermission: types.AccessTypeNobody,
			},
		},
		"fresh from genesis": {
			startVersion: wasmApp.ModuleManager.GetVersionMap()[types.ModuleName], // latest
			setup:        func(ctx sdk.Context) {},
			exp:          types.DefaultParams(),
		},
	}
	for name, spec := range specs {
		t.Run(name, func(t *testing.T) {
			ctx, _ := wasmApp.BaseApp.NewContext(false, tmproto.Header{}).CacheContext()
			spec.setup(ctx)

			fromVM := wasmApp.UpgradeKeeper.GetModuleVersionMap(ctx)
			fromVM[types.ModuleName] = spec.startVersion
			_, err := upgradeHandler(ctx, upgradetypes.Plan{Name: "testing"}, fromVM)
			require.NoError(t, err)

			// when
			gotVM, err := wasmApp.ModuleManager.RunMigrations(ctx, wasmApp.Configurator(), fromVM)

			// then
			require.NoError(t, err)
			var expModuleVersion uint64 = 4
			assert.Equal(t, expModuleVersion, gotVM[types.ModuleName])
			gotParams := wasmApp.WasmKeeper.GetParams(ctx)
			assert.Equal(t, spec.exp, gotParams)
		})
	}
}

func TestAccessConfigMigrations(t *testing.T) {
	addr := "cosmos1vx8knpllrj7n963p9ttd80w47kpacrhuts497x"
	address, err := sdk.AccAddressFromBech32(addr)
	require.NoError(t, err)

	wasmApp := app.Setup(t)

	upgradeHandler := func(ctx sdk.Context, plan upgradetypes.Plan, fromVM module.VersionMap) (module.VersionMap, error) { //nolint:unparam
		return wasmApp.ModuleManager.RunMigrations(ctx, wasmApp.Configurator(), fromVM)
	}

	ctx, _ := wasmApp.BaseApp.NewContext(false, tmproto.Header{}).CacheContext()

	// any address permission
	code1, err := storeCode(ctx, wasmApp, types.AccessTypeAnyOfAddresses.With(address))
	require.NoError(t, err)

	// allow everybody permission
	code2, err := storeCode(ctx, wasmApp, types.AllowEverybody)
	require.NoError(t, err)

	// allow nobody permission
	code3, err := storeCode(ctx, wasmApp, types.AllowNobody)
	require.NoError(t, err)

	fromVM := wasmApp.UpgradeKeeper.GetModuleVersionMap(ctx)
	fromVM[types.ModuleName] = wasmApp.ModuleManager.GetVersionMap()[types.ModuleName]
	_, err = upgradeHandler(ctx, upgradetypes.Plan{Name: "testing"}, fromVM)
	require.NoError(t, err)

	// when
	gotVM, err := wasmApp.ModuleManager.RunMigrations(ctx, wasmApp.Configurator(), fromVM)

	// then
	require.NoError(t, err)
	var expModuleVersion uint64 = 4
	assert.Equal(t, expModuleVersion, gotVM[types.ModuleName])

	// any address was not migrated
	assert.Equal(t, types.AccessTypeAnyOfAddresses.With(address), wasmApp.WasmKeeper.GetCodeInfo(ctx, code1).InstantiateConfig)

	// allow everybody was not migrated
	assert.Equal(t, types.AllowEverybody, wasmApp.WasmKeeper.GetCodeInfo(ctx, code2).InstantiateConfig)

	// allow nodoby was not migrated
	assert.Equal(t, types.AllowNobody, wasmApp.WasmKeeper.GetCodeInfo(ctx, code3).InstantiateConfig)
}

func storeCode(ctx sdk.Context, wasmApp *app.WasmApp, instantiatePermission types.AccessConfig) (codeID uint64, err error) {
	msg := types.MsgStoreCodeFixture(func(m *types.MsgStoreCode) {
		m.WASMByteCode = wasmContract
		m.InstantiatePermission = &instantiatePermission
	})
	rsp, err := wasmApp.MsgServiceRouter().Handler(msg)(ctx, msg)
	if err != nil {
		return
	}

	var result types.MsgStoreCodeResponse
	err = wasmApp.AppCodec().Unmarshal(rsp.Data, &result)
	if err != nil {
		return
	}

	codeID = result.CodeID
	return
}
