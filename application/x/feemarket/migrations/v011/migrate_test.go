package v011_test

import (
	"fmt"
	"testing"

	"github.com/stretchr/testify/require"

	"github.com/cosmos/cosmos-sdk/testutil"
	sdk "github.com/cosmos/cosmos-sdk/types"
	paramtypes "github.com/cosmos/cosmos-sdk/x/params/types"

	"github.com/evmos/ethermint/encoding"

	"github.com/evmos/ethermint/app"
	v010types "github.com/evmos/ethermint/x/feemarket/migrations/v010/types"
	v011 "github.com/evmos/ethermint/x/feemarket/migrations/v011"
	"github.com/evmos/ethermint/x/feemarket/types"
	feemarkettypes "github.com/evmos/ethermint/x/feemarket/types"
)

func init() {
	// modify defaults through global
	types.DefaultMinGasPrice = sdk.NewDecWithPrec(25, 3)
}

func TestMigrateStore(t *testing.T) {
	encCfg := encoding.MakeConfig(app.ModuleBasics)
	feemarketKey := sdk.NewKVStoreKey(feemarkettypes.StoreKey)
	tFeeMarketKey := sdk.NewTransientStoreKey(fmt.Sprintf("%s_test", feemarkettypes.StoreKey))
	ctx := testutil.DefaultContext(feemarketKey, tFeeMarketKey)
	paramstore := paramtypes.NewSubspace(
		encCfg.Marshaler, encCfg.Amino, feemarketKey, tFeeMarketKey, "feemarket",
	)

	paramstore = paramstore.WithKeyTable(feemarkettypes.ParamKeyTable())
	require.True(t, paramstore.HasKeyTable())

	// check no MinGasPrice param
	require.False(t, paramstore.Has(ctx, feemarkettypes.ParamStoreKeyMinGasPrice))
	require.False(t, paramstore.Has(ctx, feemarkettypes.ParamStoreKeyMinGasMultiplier))

	// Run migrations
	err := v011.MigrateStore(ctx, &paramstore)
	require.NoError(t, err)

	// Make sure the params are set
	require.True(t, paramstore.Has(ctx, feemarkettypes.ParamStoreKeyMinGasPrice))
	require.True(t, paramstore.Has(ctx, feemarkettypes.ParamStoreKeyMinGasMultiplier))

	var (
		minGasPrice      sdk.Dec
		minGasMultiplier sdk.Dec
	)

	// Make sure the new params are set
	require.NotPanics(t, func() {
		paramstore.Get(ctx, feemarkettypes.ParamStoreKeyMinGasPrice, &minGasPrice)
		paramstore.Get(ctx, feemarkettypes.ParamStoreKeyMinGasMultiplier, &minGasMultiplier)
	})

	// check the params are updated
	require.Equal(t, types.DefaultMinGasPrice.String(), minGasPrice.String())
	require.False(t, minGasPrice.IsZero())
	require.Equal(t, types.DefaultMinGasMultiplier.String(), minGasMultiplier.String())
}

func TestMigrateJSON(t *testing.T) {
	rawJson := `{
		"block_gas": "0",
		"params": {
			"base_fee_change_denominator": 8,
			"elasticity_multiplier": 2,
			"enable_height": "0",
			"base_fee": "1000000000",
			"no_base_fee": false
		}
  }`
	encCfg := encoding.MakeConfig(app.ModuleBasics)
	var genState v010types.GenesisState
	err := encCfg.Marshaler.UnmarshalJSON([]byte(rawJson), &genState)
	require.NoError(t, err)

	migratedGenState := v011.MigrateJSON(genState)

	require.Equal(t, types.DefaultMinGasPrice, migratedGenState.Params.MinGasPrice)
	require.Equal(t, types.DefaultMinGasMultiplier, migratedGenState.Params.MinGasMultiplier)
}
