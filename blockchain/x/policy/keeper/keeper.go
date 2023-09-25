package keeper

import (
	"fmt"

	"github.com/cometbft/cometbft/libs/log"
	"github.com/cosmos/cosmos-sdk/codec"
	cdctypes "github.com/cosmos/cosmos-sdk/codec/types"
	storetypes "github.com/cosmos/cosmos-sdk/store/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	paramtypes "github.com/cosmos/cosmos-sdk/x/params/types"

	"github.com/qredo/fusionchain/policy"
	"github.com/qredo/fusionchain/repo"
	"github.com/qredo/fusionchain/x/policy/types"
)

type (
	Keeper struct {
		cdc                     codec.BinaryCodec
		storeKey                storetypes.StoreKey
		memKey                  storetypes.StoreKey
		paramstore              paramtypes.Subspace
		actionHandlers          map[string]func(sdk.Context, *types.Action, *cdctypes.Any) (any, error)
		policyGeneratorHandlers map[string]func(sdk.Context, *cdctypes.Any) (policy.Policy, error)
	}
)

func NewKeeper(
	cdc codec.BinaryCodec,
	storeKey,
	memKey storetypes.StoreKey,
	ps paramtypes.Subspace,

) *Keeper {
	// set KeyTable if it has not already been set
	if !ps.HasKeyTable() {
		ps = ps.WithKeyTable(types.ParamKeyTable())
	}

	return &Keeper{
		cdc:        cdc,
		storeKey:   storeKey,
		memKey:     memKey,
		paramstore: ps,

		actionHandlers:          make(map[string]func(sdk.Context, *types.Action, *cdctypes.Any) (any, error)),
		policyGeneratorHandlers: make(map[string]func(sdk.Context, *cdctypes.Any) (policy.Policy, error)),
	}
}

func (Keeper) Logger(ctx sdk.Context) log.Logger {
	return ctx.Logger().With("module", fmt.Sprintf("x/%s", types.ModuleName))
}

func (k Keeper) PolicyRepo() *repo.ObjectRepo[*types.Policy] {
	return &repo.ObjectRepo[*types.Policy]{
		Constructor: func() *types.Policy { return &types.Policy{} },
		StoreKey:    k.storeKey,
		Cdc:         k.cdc,
		CountKey:    types.KeyPrefix(types.PolicyCountKey),
		ObjKey:      types.KeyPrefix(types.PolicyKey),
	}
}
