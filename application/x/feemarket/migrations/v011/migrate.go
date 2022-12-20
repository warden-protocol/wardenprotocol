package v011

import (
	sdk "github.com/cosmos/cosmos-sdk/types"

	paramtypes "github.com/cosmos/cosmos-sdk/x/params/types"
	v010types "github.com/evmos/ethermint/x/feemarket/migrations/v010/types"
	"github.com/evmos/ethermint/x/feemarket/types"
)

// MigrateStore adds the MinGasPrice param with a value of 0
// and MinGasMultiplier to 0,5
func MigrateStore(ctx sdk.Context, paramstore *paramtypes.Subspace) error {
	if !paramstore.HasKeyTable() {
		ps := paramstore.WithKeyTable(types.ParamKeyTable())
		paramstore = &ps
	}

	// add MinGasPrice
	paramstore.Set(ctx, types.ParamStoreKeyMinGasPrice, types.DefaultMinGasPrice)
	// add MinGasMultiplier
	paramstore.Set(ctx, types.ParamStoreKeyMinGasMultiplier, types.DefaultMinGasMultiplier)
	return nil
}

// MigrateJSON accepts exported v0.10 x/feemarket genesis state and migrates it to
// v0.11 x/feemarket genesis state. The migration includes:
// - add MinGasPrice param
// - add MinGasMultiplier param
func MigrateJSON(oldState v010types.GenesisState) types.GenesisState {
	return types.GenesisState{
		Params: types.Params{
			NoBaseFee:                oldState.Params.NoBaseFee,
			BaseFeeChangeDenominator: oldState.Params.BaseFeeChangeDenominator,
			ElasticityMultiplier:     oldState.Params.ElasticityMultiplier,
			EnableHeight:             oldState.Params.EnableHeight,
			BaseFee:                  oldState.Params.BaseFee,
			MinGasPrice:              types.DefaultMinGasPrice,
			MinGasMultiplier:         types.DefaultMinGasMultiplier,
		},
		BlockGas: oldState.BlockGas,
	}
}
