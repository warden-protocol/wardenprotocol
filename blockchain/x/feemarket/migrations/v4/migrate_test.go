package v4_test

import (
	"testing"

	"github.com/cosmos/cosmos-sdk/testutil"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/stretchr/testify/require"
	"gitlab.qredo.com/qrdochain/fusionchain/app"
	"gitlab.qredo.com/qrdochain/fusionchain/encoding"
	v4 "gitlab.qredo.com/qrdochain/fusionchain/x/feemarket/migrations/v4"
	"gitlab.qredo.com/qrdochain/fusionchain/x/feemarket/types"
)

type mockSubspace struct {
	ps types.Params
}

func newMockSubspaceEmpty() mockSubspace {
	return mockSubspace{}
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
	tKey := sdk.NewTransientStoreKey("transient_test")
	ctx := testutil.DefaultContext(storeKey, tKey)
	kvStore := ctx.KVStore(storeKey)

	legacySubspaceEmpty := newMockSubspaceEmpty()
	require.Error(t, v4.MigrateStore(ctx, storeKey, legacySubspaceEmpty, cdc))

	legacySubspace := newMockSubspace(types.DefaultParams())
	require.NoError(t, v4.MigrateStore(ctx, storeKey, legacySubspace, cdc))

	paramsBz := kvStore.Get(types.ParamsKey)
	var params types.Params
	cdc.MustUnmarshal(paramsBz, &params)

	require.Equal(t, params, legacySubspace.ps)
}
