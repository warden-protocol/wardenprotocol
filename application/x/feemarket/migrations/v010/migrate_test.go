package v010_test

import (
	"fmt"
	"testing"

	"github.com/stretchr/testify/require"

	"github.com/cosmos/cosmos-sdk/testutil"
	sdk "github.com/cosmos/cosmos-sdk/types"
	paramtypes "github.com/cosmos/cosmos-sdk/x/params/types"

	"github.com/evmos/ethermint/encoding"

	"github.com/evmos/ethermint/app"
	feemarketkeeper "github.com/evmos/ethermint/x/feemarket/keeper"
	v010 "github.com/evmos/ethermint/x/feemarket/migrations/v010"
	v09types "github.com/evmos/ethermint/x/feemarket/migrations/v09/types"
	"github.com/evmos/ethermint/x/feemarket/types"
	feemarkettypes "github.com/evmos/ethermint/x/feemarket/types"
)

func TestMigrateStore(t *testing.T) {
	encCfg := encoding.MakeConfig(app.ModuleBasics)
	feemarketKey := sdk.NewKVStoreKey(feemarkettypes.StoreKey)
	tFeeMarketKey := sdk.NewTransientStoreKey(fmt.Sprintf("%s_test", feemarkettypes.StoreKey))
	ctx := testutil.DefaultContext(feemarketKey, tFeeMarketKey)
	paramstore := paramtypes.NewSubspace(
		encCfg.Marshaler, encCfg.Amino, feemarketKey, tFeeMarketKey, "feemarket",
	)
	fmKeeper := feemarketkeeper.NewKeeper(encCfg.Marshaler, paramstore, feemarketKey, tFeeMarketKey)
	fmKeeper.SetParams(ctx, types.DefaultParams())
	require.True(t, paramstore.HasKeyTable())

	// check that the fee market is not nil
	err := v010.MigrateStore(ctx, &paramstore, feemarketKey)
	require.NoError(t, err)
	require.False(t, ctx.KVStore(feemarketKey).Has(v010.KeyPrefixBaseFeeV1))

	params := fmKeeper.GetParams(ctx)
	require.False(t, params.BaseFee.IsNil())

	baseFee := fmKeeper.GetBaseFee(ctx)
	require.NotNil(t, baseFee)

	require.Equal(t, baseFee.Int64(), params.BaseFee.Int64())
}

func TestMigrateJSON(t *testing.T) {
	rawJson := `{
		"base_fee": "669921875",
		"block_gas": "0",
		"params": {
			"base_fee_change_denominator": 8,
			"elasticity_multiplier": 2,
			"enable_height": "0",
			"initial_base_fee": "1000000000",
			"no_base_fee": false
		}
  }`
	encCfg := encoding.MakeConfig(app.ModuleBasics)
	var genState v09types.GenesisState
	err := encCfg.Marshaler.UnmarshalJSON([]byte(rawJson), &genState)
	require.NoError(t, err)

	migratedGenState := v010.MigrateJSON(genState)

	require.Equal(t, int64(669921875), migratedGenState.Params.BaseFee.Int64())
}
