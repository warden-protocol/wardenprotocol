package v5_test

import (
	"testing"

	"github.com/cosmos/cosmos-sdk/testutil"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/stretchr/testify/require"

	"github.com/evmos/ethermint/app"
	"github.com/evmos/ethermint/encoding"
	v5 "github.com/evmos/ethermint/x/evm/migrations/v5"
	v5types "github.com/evmos/ethermint/x/evm/migrations/v5/types"
	"github.com/evmos/ethermint/x/evm/types"
)

func TestMigrate(t *testing.T) {
	encCfg := encoding.MakeConfig(app.ModuleBasics)
	cdc := encCfg.Codec

	storeKey := sdk.NewKVStoreKey(types.ModuleName)
	tKey := sdk.NewTransientStoreKey("transient_test")
	ctx := testutil.DefaultContext(storeKey, tKey)
	kvStore := ctx.KVStore(storeKey)

	extraEIPs := v5types.V5ExtraEIPs{EIPs: types.AvailableExtraEIPs}
	extraEIPsBz := cdc.MustMarshal(&extraEIPs)
	chainConfig := types.DefaultChainConfig()
	chainConfigBz := cdc.MustMarshal(&chainConfig)

	// Set the params in the store
	kvStore.Set(types.ParamStoreKeyEVMDenom, []byte("aphoton"))
	kvStore.Set(types.ParamStoreKeyEnableCreate, []byte{0x01})
	kvStore.Set(types.ParamStoreKeyEnableCall, []byte{0x01})
	kvStore.Set(types.ParamStoreKeyAllowUnprotectedTxs, []byte{0x01})
	kvStore.Set(types.ParamStoreKeyExtraEIPs, extraEIPsBz)
	kvStore.Set(types.ParamStoreKeyChainConfig, chainConfigBz)

	err := v5.MigrateStore(ctx, storeKey, cdc)
	require.NoError(t, err)

	paramsBz := kvStore.Get(types.KeyPrefixParams)
	var params types.Params
	cdc.MustUnmarshal(paramsBz, &params)

	// test that the params have been migrated correctly
	require.Equal(t, "aphoton", params.EvmDenom)
	require.True(t, params.EnableCreate)
	require.True(t, params.EnableCall)
	require.True(t, params.AllowUnprotectedTxs)
	require.Equal(t, chainConfig, params.ChainConfig)
	require.Equal(t, extraEIPs.EIPs, params.ExtraEIPs)

	// check that the keys are deleted
	require.False(t, kvStore.Has(types.ParamStoreKeyEVMDenom))
	require.False(t, kvStore.Has(types.ParamStoreKeyEnableCreate))
	require.False(t, kvStore.Has(types.ParamStoreKeyEnableCall))
	require.False(t, kvStore.Has(types.ParamStoreKeyAllowUnprotectedTxs))
	require.False(t, kvStore.Has(types.ParamStoreKeyExtraEIPs))
	require.False(t, kvStore.Has(types.ParamStoreKeyChainConfig))
}
