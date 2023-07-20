package keeper

import (
	"fmt"
	"strings"

	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	paramtypes "github.com/cosmos/cosmos-sdk/x/params/types"
	"github.com/tendermint/tendermint/libs/log"
	"gitlab.qredo.com/qrdochain/fusionchain/x/qassets/types"
	treasury "gitlab.qredo.com/qrdochain/fusionchain/x/treasury/keeper"
	treasurytypes "gitlab.qredo.com/qrdochain/fusionchain/x/treasury/types"
)

type (
	Keeper struct {
		cdc            codec.BinaryCodec
		storeKey       sdk.StoreKey
		memKey         sdk.StoreKey
		paramstore     paramtypes.Subspace
		bankKeeper     types.BankKeeper
		treasuryKeeper treasury.Keeper
	}
)

func NewKeeper(
	cdc codec.BinaryCodec,
	storeKey,
	memKey sdk.StoreKey,
	ps paramtypes.Subspace,
	bankKeeper types.BankKeeper,
	treasuryKeeper treasury.Keeper,
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

func (k Keeper) NewCoins(ctx sdk.Context, walletID uint64, isToken bool, tokenName string, tokenContractAddr string, amount uint64) (sdk.Coins, error) {
	wallet, err := k.treasuryKeeper.WalletById(sdk.WrapSDKContext(ctx), &treasurytypes.QueryWalletByIdRequest{Id: walletID})
	if err != nil {
		return nil, err
	}
	denom := strings.Trim(wallet.Wallet.Type.String(), "WALLET_TYPE_")
	if isToken {
		denom += ":" + tokenName + ":" + tokenContractAddr
	}
	return sdk.NewCoins(sdk.NewCoin(denom, sdk.NewIntFromUint64(amount))), nil
}

func (k Keeper) Mint(ctx sdk.Context, sender string, fromWalletID uint64, toWorkspaceWalletAddr string, isToken bool, tokenName string, tokenContractAddr string, amount uint64) error {
	coins, err := k.NewCoins(ctx, fromWalletID, isToken, tokenName, tokenContractAddr, amount)
	if err != nil {
		return err
	}
	if err := k.bankKeeper.MintCoins(ctx, types.ModuleName, coins); err != nil {
		return sdkerrors.Wrap(err, "mint coins")
	}
	if err := k.bankKeeper.SendCoinsFromModuleToAccount(ctx, types.ModuleName, sdk.AccAddress(toWorkspaceWalletAddr), coins); err != nil {
		return sdkerrors.Wrap(err, "transfer from module")
	}
	k.Logger(ctx).Info("Minted", "amount", coins)
	return nil
}

func (k Keeper) Burn(ctx sdk.Context, sender string, fromWorkspaceWalletAddr string, toWalletID uint64, isToken bool, tokenName string, tokenContractAddr string, amount uint64) error {
	coins, err := k.NewCoins(ctx, toWalletID, isToken, tokenName, tokenContractAddr, amount)
	if err != nil {
		return err
	}
	if err := k.bankKeeper.SendCoinsFromAccountToModule(ctx, sdk.AccAddress(fromWorkspaceWalletAddr), types.ModuleName, coins); err != nil {
		return sdkerrors.Wrap(err, "transfer to module")
	}
	if err := k.bankKeeper.BurnCoins(ctx, types.ModuleName, coins); err != nil {
		return sdkerrors.Wrap(err, "burn coins")
	}
	k.Logger(ctx).Info("Burned", "amount", coins)
	return nil
}
