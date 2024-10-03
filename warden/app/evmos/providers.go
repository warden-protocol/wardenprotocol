package evmos

import (
	storetypes "cosmossdk.io/store/types"
	"github.com/cosmos/cosmos-sdk/codec"
	"github.com/cosmos/cosmos-sdk/runtime"
	sdk "github.com/cosmos/cosmos-sdk/types"
	authcodec "github.com/cosmos/cosmos-sdk/x/auth/codec"
	authkeeper "github.com/cosmos/cosmos-sdk/x/auth/keeper"
	authtypes "github.com/cosmos/cosmos-sdk/x/auth/types"
	bankkeeper "github.com/cosmos/cosmos-sdk/x/bank/keeper"
	govtypes "github.com/cosmos/cosmos-sdk/x/gov/types"
	stakingtypes "github.com/cosmos/cosmos-sdk/x/staking/types"
	evmstakingkeeper "github.com/evmos/evmos/v20/x/staking/keeper"
)

func ProvideEvmosStaking(appCodec codec.Codec, accountKeeper authkeeper.AccountKeeper, bankKeeper bankkeeper.Keeper) *evmstakingkeeper.Keeper {
	storeKey := storetypes.NewKVStoreKey(stakingtypes.StoreKey)
	keeper := evmstakingkeeper.NewKeeper(
		appCodec,
		runtime.NewKVStoreService(storeKey),
		accountKeeper,
		bankKeeper,
		authtypes.NewModuleAddress(govtypes.ModuleName).String(),
		authcodec.NewBech32Codec(sdk.GetConfig().GetBech32ValidatorAddrPrefix()),
		authcodec.NewBech32Codec(sdk.GetConfig().GetBech32ConsensusAddrPrefix()),
	)

	return keeper
}
