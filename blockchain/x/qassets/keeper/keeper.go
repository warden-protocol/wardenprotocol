package keeper

import (
	"fmt"
	"strings"

	sdkerrors "cosmossdk.io/errors"
	"github.com/cometbft/cometbft/libs/log"
	"github.com/cosmos/cosmos-sdk/codec"
	storetypes "github.com/cosmos/cosmos-sdk/store/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	paramtypes "github.com/cosmos/cosmos-sdk/x/params/types"
	identity "gitlab.qredo.com/qrdochain/fusionchain/x/identity/keeper"
	"gitlab.qredo.com/qrdochain/fusionchain/x/qassets/types"
	treasury "gitlab.qredo.com/qrdochain/fusionchain/x/treasury/keeper"
)

type (
	Keeper struct {
		cdc            codec.BinaryCodec
		storeKey       storetypes.StoreKey
		memKey         storetypes.StoreKey
		paramstore     paramtypes.Subspace
		bankKeeper     types.BankKeeper
		treasuryKeeper treasury.Keeper
		identityKeeper identity.Keeper
	}
)

func NewKeeper(
	cdc codec.BinaryCodec,
	storeKey,
	memKey storetypes.StoreKey,
	ps paramtypes.Subspace,
	bankKeeper types.BankKeeper,
	treasuryKeeper treasury.Keeper,
	identityKeeper identity.Keeper,
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
		bankKeeper:     bankKeeper,
		treasuryKeeper: treasuryKeeper,
		identityKeeper: identityKeeper,
	}
}

func (k Keeper) Logger(ctx sdk.Context) log.Logger {
	return ctx.Logger().With("module", fmt.Sprintf("x/%s", types.ModuleName))
}

func (k Keeper) validateWallet(ctx sdk.Context, sender string, walletID uint64) error {
	wallet, _ := k.treasuryKeeper.WalletsRepo().Get(ctx, walletID)
	key, _ := k.treasuryKeeper.KeysRepo().Get(ctx, wallet.KeyId)
	workspace := k.identityKeeper.GetWorkspace(ctx, key.WorkspaceAddr)
	if workspace == nil {
		return fmt.Errorf("workspace is nil")
	}
	if !workspace.IsOwner(sender) {
		return fmt.Errorf("sender is not a workspace owner")
	}
	return nil
}

func (k Keeper) validateWorkspace(ctx sdk.Context, sender string, workspaceAddr string) error {
	workspace := k.identityKeeper.GetWorkspace(ctx, sender)
	if workspace != nil {
		return fmt.Errorf("workspace is nil")
	}
	if !workspace.IsOwner(sender) {
		return fmt.Errorf("sender is not a workspace owner")
	}
	return nil
}

func (k Keeper) setupQAsset(ctx sdk.Context, walletID *uint64, workspaceAddr string, isToken bool, tokenName string, tokenContractAddr string, amount uint64, qAssetDenom *string) (sdk.Coins, sdk.AccAddress, error) {
	addr, err := sdk.AccAddressFromBech32(workspaceAddr)
	if err != nil {
		return nil, nil, err
	}
	var denom string
	if qAssetDenom != nil {
		denom = *qAssetDenom
	}
	if walletID != nil {
		wallet, found := k.treasuryKeeper.WalletsRepo().Get(ctx, *walletID)
		if !found {
			return nil, nil, fmt.Errorf("wallet not found")
		}
		denom = "q" + strings.ReplaceAll(strings.TrimPrefix(wallet.Type.String(), "WALLET_TYPE_"), "_", "-")
		if isToken {
			denom += "/" + tokenName + "/" + tokenContractAddr
		}
	}
	return sdk.NewCoins(sdk.NewCoin(denom, sdk.NewIntFromUint64(amount))), addr, nil
}

func (k Keeper) Mint(ctx sdk.Context, sender string, fromWalletID uint64, toWorkspaceAddr string, isToken bool, tokenName string, tokenContractAddr string, amount uint64) error {
	if err := k.validateWallet(ctx, sender, fromWalletID); err != nil {
		return err
	}
	coins, addr, err := k.setupQAsset(ctx, &fromWalletID, toWorkspaceAddr, isToken, tokenName, tokenContractAddr, amount, nil)
	if err != nil {
		return err
	}
	if err := k.bankKeeper.MintCoins(ctx, types.ModuleName, coins); err != nil {
		return sdkerrors.Wrap(err, "mint qassets")
	}
	if err := k.bankKeeper.SendCoinsFromModuleToAccount(ctx, types.ModuleName, addr, coins); err != nil {
		return sdkerrors.Wrap(err, "transfer qassets from module")
	}
	k.Logger(ctx).Info("Minted", "amount", coins)
	return nil
}

func (k Keeper) Burn(ctx sdk.Context, sender string, fromWorkspaceAddr string, toWalletID uint64, isToken bool, tokenName string, tokenContractAddr string, amount uint64) error {
	if err := k.validateWorkspace(ctx, sender, fromWorkspaceAddr); err != nil {
		return err
	}
	coins, addr, err := k.setupQAsset(ctx, &toWalletID, fromWorkspaceAddr, isToken, tokenName, tokenContractAddr, amount, nil)
	if err != nil {
		return err
	}
	if err := k.bankKeeper.SendCoinsFromAccountToModule(ctx, addr, types.ModuleName, coins); err != nil {
		return sdkerrors.Wrap(err, "transfer qassets to module")
	}
	if err := k.bankKeeper.BurnCoins(ctx, types.ModuleName, coins); err != nil {
		return sdkerrors.Wrap(err, "burn qassets")
	}
	k.Logger(ctx).Info("Burned", "amount", coins)
	return nil
}

func (k Keeper) Send(ctx sdk.Context, sender string, fromWorkspaceAddr string, toWorkspaceAddr string, qAssetDenom string, amount uint64) error {
	if err := k.validateWorkspace(ctx, sender, fromWorkspaceAddr); err != nil {
		return err
	}
	coins, fromAddr, err := k.setupQAsset(ctx, nil, fromWorkspaceAddr, false, "", "", amount, &qAssetDenom)
	if err != nil {
		return err
	}
	toAddr, err := sdk.AccAddressFromBech32(toWorkspaceAddr)
	if err != nil {
		return err
	}
	if err := k.bankKeeper.SendCoinsFromAccountToModule(ctx, fromAddr, types.ModuleName, coins); err != nil {
		return sdkerrors.Wrap(err, "transfer qassets to module")
	}
	if err := k.bankKeeper.SendCoinsFromModuleToAccount(ctx, types.ModuleName, toAddr, coins); err != nil {
		return sdkerrors.Wrap(err, "transfer qassets from module")
	}
	k.Logger(ctx).Info("Sent", "amount", coins)
	return nil
}
