package keeper

import (
	"fmt"

	"github.com/cometbft/cometbft/libs/log"
	"github.com/cosmos/cosmos-sdk/codec"
	storetypes "github.com/cosmos/cosmos-sdk/store/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	paramtypes "github.com/cosmos/cosmos-sdk/x/params/types"

	bank "github.com/cosmos/cosmos-sdk/x/bank/keeper"
	"github.com/qredo/fusionchain/repo"
	policy "github.com/qredo/fusionchain/x/policy/keeper"
	"github.com/qredo/fusionchain/x/treasury/types"
)

type (
	Keeper struct {
		cdc            codec.BinaryCodec
		storeKey       storetypes.StoreKey
		memKey         storetypes.StoreKey
		paramstore     paramtypes.Subspace
		identityKeeper types.IdentityKeeper
		policyKeeper   *policy.Keeper
		bankKeeper     bank.Keeper
	}
)

func NewKeeper(
	cdc codec.BinaryCodec,
	storeKey,
	memKey storetypes.StoreKey,
	ps paramtypes.Subspace,
	identityKeeper types.IdentityKeeper,
	policyKeeper *policy.Keeper,
	bankKeeper bank.Keeper,
) *Keeper {
	// set KeyTable if it has not already been set
	if !ps.HasKeyTable() {
		ps = ps.WithKeyTable(types.ParamKeyTable())
	}

	return &Keeper{
		cdc:            cdc,
		storeKey:       storeKey,
		memKey:         memKey,
		paramstore:     ps,
		identityKeeper: identityKeeper,
		policyKeeper:   policyKeeper,
		bankKeeper:     bankKeeper,
	}
}

func (k Keeper) SignatureRequestsRepo() *repo.ObjectRepo[*types.SignRequest] {
	return &repo.ObjectRepo[*types.SignRequest]{
		Constructor: func() *types.SignRequest { return &types.SignRequest{} },
		StoreKey:    k.storeKey,
		Cdc:         k.cdc,
		CountKey:    types.KeyPrefix(types.SignRequestCountKey),
		ObjKey:      types.KeyPrefix(types.SignRequestKey),
	}
}

func (k Keeper) KeyRequestsRepo() *repo.ObjectRepo[*types.KeyRequest] {
	return &repo.ObjectRepo[*types.KeyRequest]{
		Constructor: func() *types.KeyRequest { return &types.KeyRequest{} },
		StoreKey:    k.storeKey,
		Cdc:         k.cdc,
		CountKey:    types.KeyPrefix(types.KeyRequestCountKey),
		ObjKey:      types.KeyPrefix(types.KeyRequestKey),
	}
}

func (k Keeper) SignTransactionRequestsRepo() *repo.ObjectRepo[*types.SignTransactionRequest] {
	return &repo.ObjectRepo[*types.SignTransactionRequest]{
		Constructor: func() *types.SignTransactionRequest { return &types.SignTransactionRequest{} },
		StoreKey:    k.storeKey,
		Cdc:         k.cdc,
		CountKey:    types.KeyPrefix(types.SignTransactionRequestCountKey),
		ObjKey:      types.KeyPrefix(types.SignTransactionRequestKey),
	}
}

func (Keeper) Logger(ctx sdk.Context) log.Logger {
	return ctx.Logger().With("module", fmt.Sprintf("x/%s", types.ModuleName))
}
