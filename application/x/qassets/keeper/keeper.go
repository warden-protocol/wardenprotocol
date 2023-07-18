package keeper

import (
	"fmt"

	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	paramtypes "github.com/cosmos/cosmos-sdk/x/params/types"
	"github.com/tendermint/tendermint/libs/log"
	"gitlab.qredo.com/qrdochain/fusionchain/x/qassets/types"
)

type (
	Keeper struct {
		cdc        codec.BinaryCodec
		storeKey   sdk.StoreKey
		memKey     sdk.StoreKey
		paramstore paramtypes.Subspace
		bankKeeper types.BankKeeper
	}
)

func NewKeeper(
	cdc codec.BinaryCodec,
	storeKey,
	memKey sdk.StoreKey,
	ps paramtypes.Subspace,
	bankKeeper types.BankKeeper,
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
		bankKeeper: bankKeeper,
	}
}

func (k Keeper) Logger(ctx sdk.Context) log.Logger {
	return ctx.Logger().With("module", fmt.Sprintf("x/%s", types.ModuleName))
}

func (k Keeper) Mint(ctx sdk.Context, msg *QAssetMsg) error {
	coins := sdk.NewCoins(sdk.NewCoin(msg.Denom.String(), sdk.NewInt(msg.Amount)))
	if err := k.bankKeeper.MintCoins(ctx, types.ModuleName, coins); err != nil {
		return sdkerrors.Wrap(err, "mint coins")
	}
	if err := k.bankKeeper.SendCoinsFromModuleToAccount(ctx, types.ModuleName, msg.Address, coins); err != nil {
		return sdkerrors.Wrap(err, "transfer from module")
	}
	moduleLogger(ctx).Info("Minted", "amount", coins)
	return nil
}

func (k Keeper) Burn(ctx sdk.Context, msg *QAssetMsg) error {
	coins := sdk.NewCoins(sdk.NewCoin(msg.Denom.String(), sdk.NewInt(msg.Amount)))
	if err := k.bankKeeper.SendCoinsFromAccountToModule(ctx, msg.Address, types.ModuleName, coins); err != nil {
		return sdkerrors.Wrap(err, "transfer to module")
	}
	if err := k.bankKeeper.BurnCoins(ctx, types.ModuleName, coins); err != nil {
		return sdkerrors.Wrap(err, "burn coins")
	}
	moduleLogger(ctx).Info("Burned", "amount", coins)
	return nil
}
