package v3_test

import (
	"fmt"
	v3 "github.com/evmos/ethermint/x/evm/migrations/v3"
	"testing"

	"github.com/stretchr/testify/require"

	"github.com/cosmos/cosmos-sdk/testutil"
	sdk "github.com/cosmos/cosmos-sdk/types"
	paramtypes "github.com/cosmos/cosmos-sdk/x/params/types"

	"github.com/evmos/ethermint/encoding"

	"github.com/evmos/ethermint/app"
	v3types "github.com/evmos/ethermint/x/evm/migrations/v3/types"
	"github.com/evmos/ethermint/x/evm/types"
)

func TestMigrateStore(t *testing.T) {
	encCfg := encoding.MakeConfig(app.ModuleBasics)
	evmKey := sdk.NewKVStoreKey(types.StoreKey)
	tEvmKey := sdk.NewTransientStoreKey(fmt.Sprintf("%s_test", types.StoreKey))
	ctx := testutil.DefaultContext(evmKey, tEvmKey)
	paramstore := paramtypes.NewSubspace(
		encCfg.Marshaler, encCfg.Amino, evmKey, tEvmKey, "evm",
	).WithKeyTable(v3types.ParamKeyTable())

	params := v3types.DefaultParams()
	paramstore.SetParamSet(ctx, &params)

	require.Panics(t, func() {
		var preMigrationConfig types.ChainConfig
		paramstore.Get(ctx, types.ParamStoreKeyChainConfig, &preMigrationConfig)
	})
	var preMigrationConfig v3types.ChainConfig
	paramstore.Get(ctx, types.ParamStoreKeyChainConfig, &preMigrationConfig)
	require.NotNil(t, preMigrationConfig.MergeForkBlock)

	paramstore = paramtypes.NewSubspace(
		encCfg.Marshaler, encCfg.Amino, evmKey, tEvmKey, "evm",
	).WithKeyTable(types.ParamKeyTable())
	err := v3.MigrateStore(ctx, &paramstore)
	require.NoError(t, err)

	updatedDefaultConfig := types.DefaultChainConfig()

	var postMigrationConfig types.ChainConfig
	paramstore.Get(ctx, types.ParamStoreKeyChainConfig, &postMigrationConfig)
	require.Equal(t, postMigrationConfig.GrayGlacierBlock, updatedDefaultConfig.GrayGlacierBlock)
	require.Equal(t, postMigrationConfig.MergeNetsplitBlock, updatedDefaultConfig.MergeNetsplitBlock)
	require.Panics(t, func() {
		var preMigrationConfig v3types.ChainConfig
		paramstore.Get(ctx, types.ParamStoreKeyChainConfig, &preMigrationConfig)
	})
}
