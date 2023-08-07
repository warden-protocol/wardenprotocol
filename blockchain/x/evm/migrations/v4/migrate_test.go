package v4_test

import (
	"testing"

	"github.com/stretchr/testify/require"

	"github.com/evmos/ethermint/x/evm/types"

	"github.com/cosmos/cosmos-sdk/testutil"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/evmos/ethermint/app"
	"github.com/evmos/ethermint/encoding"
	v4 "github.com/evmos/ethermint/x/evm/migrations/v4"
	v4types "github.com/evmos/ethermint/x/evm/migrations/v4/types"
)

type mockSubspace struct {
	ps types.Params
}

func newMockSubspace(ps types.Params) mockSubspace {
	return mockSubspace{ps: ps}
}

func (ms mockSubspace) GetParamSetIfExists(ctx sdk.Context, ps types.LegacyParams) {
	*ps.(*types.Params) = ms.ps
}

func TestMigrate(t *testing.T) {
	encCfg := encoding.MakeConfig(app.ModuleBasics)
	cdc := encCfg.Codec

	storeKey := sdk.NewKVStoreKey(types.ModuleName)
	tKey := sdk.NewTransientStoreKey(types.TransientKey)
	ctx := testutil.DefaultContext(storeKey, tKey)
	kvStore := ctx.KVStore(storeKey)

	legacySubspace := newMockSubspace(types.DefaultParams())
	require.NoError(t, v4.MigrateStore(ctx, storeKey, legacySubspace, cdc))

	// Get all the new parameters from the kvStore
	var evmDenom string
	bz := kvStore.Get(types.ParamStoreKeyEVMDenom)
	evmDenom = string(bz)

	allowUnprotectedTx := kvStore.Has(types.ParamStoreKeyAllowUnprotectedTxs)
	enableCreate := kvStore.Has(types.ParamStoreKeyEnableCreate)
	enableCall := kvStore.Has(types.ParamStoreKeyEnableCall)

	var chainCfg v4types.V4ChainConfig
	bz = kvStore.Get(types.ParamStoreKeyChainConfig)
	cdc.MustUnmarshal(bz, &chainCfg)

	var extraEIPs v4types.ExtraEIPs
	bz = kvStore.Get(types.ParamStoreKeyExtraEIPs)
	cdc.MustUnmarshal(bz, &extraEIPs)
	require.Equal(t, []int64(nil), extraEIPs.EIPs)

	params := v4types.V4Params{
		EvmDenom:            evmDenom,
		AllowUnprotectedTxs: allowUnprotectedTx,
		EnableCreate:        enableCreate,
		EnableCall:          enableCall,
		V4ChainConfig:       chainCfg,
		ExtraEIPs:           extraEIPs,
	}

	require.Equal(t, legacySubspace.ps.EnableCall, params.EnableCall)
	require.Equal(t, legacySubspace.ps.EnableCreate, params.EnableCreate)
	require.Equal(t, legacySubspace.ps.AllowUnprotectedTxs, params.AllowUnprotectedTxs)
	require.Equal(t, legacySubspace.ps.ExtraEIPs, params.ExtraEIPs.EIPs)
	require.EqualValues(t, legacySubspace.ps.ChainConfig, params.V4ChainConfig)
}
