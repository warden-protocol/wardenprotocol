package v010

import (
	"math/big"

	sdk "github.com/cosmos/cosmos-sdk/types"

	paramtypes "github.com/cosmos/cosmos-sdk/x/params/types"
	"github.com/evmos/ethermint/x/feemarket/migrations/v010/types"
	v09types "github.com/evmos/ethermint/x/feemarket/migrations/v09/types"
)

// KeyPrefixBaseFeeV1 is the base fee key prefix used in version 1
var KeyPrefixBaseFeeV1 = []byte{2}

// MigrateStore migrates the BaseFee value from the store to the params for
// In-Place Store migration logic.
func MigrateStore(ctx sdk.Context, paramstore *paramtypes.Subspace, storeKey sdk.StoreKey) error {
	baseFee := types.DefaultParams().BaseFee

	store := ctx.KVStore(storeKey)

	if !paramstore.HasKeyTable() {
		ps := paramstore.WithKeyTable(types.ParamKeyTable())
		paramstore = &ps
	}

	switch {
	case store.Has(KeyPrefixBaseFeeV1):
		bz := store.Get(KeyPrefixBaseFeeV1)
		baseFee = sdk.NewIntFromBigInt(new(big.Int).SetBytes(bz))
	case paramstore.Has(ctx, types.ParamStoreKeyNoBaseFee):
		paramstore.GetIfExists(ctx, types.ParamStoreKeyBaseFee, &baseFee)
	}

	var (
		noBaseFee                                bool
		baseFeeChangeDenom, elasticityMultiplier uint32
		enableHeight                             int64
	)

	paramstore.GetIfExists(ctx, types.ParamStoreKeyNoBaseFee, &noBaseFee)
	paramstore.GetIfExists(ctx, types.ParamStoreKeyBaseFeeChangeDenominator, &baseFeeChangeDenom)
	paramstore.GetIfExists(ctx, types.ParamStoreKeyElasticityMultiplier, &elasticityMultiplier)
	paramstore.GetIfExists(ctx, types.ParamStoreKeyEnableHeight, &enableHeight)

	params := types.Params{
		NoBaseFee:                noBaseFee,
		BaseFeeChangeDenominator: baseFeeChangeDenom,
		ElasticityMultiplier:     elasticityMultiplier,
		BaseFee:                  baseFee,
		EnableHeight:             enableHeight,
	}

	paramstore.SetParamSet(ctx, &params)
	store.Delete(KeyPrefixBaseFeeV1)
	return nil
}

// MigrateJSON accepts exported v0.9 x/feemarket genesis state and migrates it to
// v0.10 x/feemarket genesis state. The migration includes:
// - Migrate BaseFee to Params
func MigrateJSON(oldState v09types.GenesisState) types.GenesisState {
	return types.GenesisState{
		Params: types.Params{
			NoBaseFee:                oldState.Params.NoBaseFee,
			BaseFeeChangeDenominator: oldState.Params.BaseFeeChangeDenominator,
			ElasticityMultiplier:     oldState.Params.ElasticityMultiplier,
			EnableHeight:             oldState.Params.EnableHeight,
			BaseFee:                  oldState.BaseFee,
		},
		BlockGas: oldState.BlockGas,
	}
}
