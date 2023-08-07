package v4

import (
	"github.com/cosmos/cosmos-sdk/codec"
	storetypes "github.com/cosmos/cosmos-sdk/store/types"
	sdk "github.com/cosmos/cosmos-sdk/types"

	v4types "github.com/evmos/ethermint/x/evm/migrations/v4/types"
	"github.com/evmos/ethermint/x/evm/types"
)

// MigrateStore migrates the x/evm module state from the consensus version 3 to
// version 4. Specifically, it takes the parameters that are currently stored
// and managed by the Cosmos SDK params module and stores them directly into the x/evm module state.
func MigrateStore(
	ctx sdk.Context,
	storeKey storetypes.StoreKey,
	legacySubspace types.Subspace,
	cdc codec.BinaryCodec,
) error {
	var params types.Params

	legacySubspace.GetParamSetIfExists(ctx, &params)

	if err := params.Validate(); err != nil {
		return err
	}

	chainCfgBz := cdc.MustMarshal(&params.ChainConfig)
	extraEIPsBz := cdc.MustMarshal(&v4types.ExtraEIPs{EIPs: params.ExtraEIPs})

	store := ctx.KVStore(storeKey)

	store.Set(types.ParamStoreKeyEVMDenom, []byte(params.EvmDenom))
	store.Set(types.ParamStoreKeyExtraEIPs, extraEIPsBz)
	store.Set(types.ParamStoreKeyChainConfig, chainCfgBz)

	if params.AllowUnprotectedTxs {
		store.Set(types.ParamStoreKeyAllowUnprotectedTxs, []byte{0x01})
	}

	if params.EnableCall {
		store.Set(types.ParamStoreKeyEnableCall, []byte{0x01})
	}

	if params.EnableCreate {
		store.Set(types.ParamStoreKeyEnableCreate, []byte{0x01})
	}

	return nil
}
