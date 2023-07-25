package keeper

import (
	"fmt"
	"strings"

	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	paramtypes "github.com/cosmos/cosmos-sdk/x/params/types"
	"github.com/tendermint/tendermint/libs/log"
	identity "gitlab.qredo.com/qrdochain/fusionchain/x/identity/keeper"
	identitytypes "gitlab.qredo.com/qrdochain/fusionchain/x/identity/types"
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
		identityKeeper identity.Keeper
	}
)

func NewKeeper(
	cdc codec.BinaryCodec,
	storeKey,
	memKey sdk.StoreKey,
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

func (k Keeper) validateMsg(ctx sdk.Context, sender string, walletID *uint64, workspaceAddr *string) error {
	if walletID != nil {
		wallet, _ := k.treasuryKeeper.WalletsRepo().Get(ctx, *walletID)
		key, _ := k.treasuryKeeper.KeysRepo().Get(ctx, wallet.KeyId)
		workspace, _ := k.identityKeeper.GetWorkspace(ctx, key.WorkspaceId)
		isOwner := false
		for _, owner := range workspace.Owners {
			if sender == owner {
				isOwner = true
				break
			}
		}
		if !isOwner {
			return fmt.Errorf("sender is not a workspace owner")
		}
		return nil
	}
	if workspaceAddr != nil {
		workspace, err := k.identityKeeper.WorkspacesByOwner(sdk.WrapSDKContext(ctx), &identitytypes.QueryWorkspacesByOwnerRequest{Owner: sender})
		if err != nil {
			return err
		}
		isMatching := false
		for _, workspace := range workspace.Workspaces {
			if workspace.Address == *workspaceAddr {
				isMatching = true
				break
			}
		}
		if !isMatching {
			return fmt.Errorf("sender is not a workspace owner")
		}
		return nil
	}
	return fmt.Errorf("invalid message format")
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
		wallet, err := k.treasuryKeeper.WalletById(sdk.WrapSDKContext(ctx), &treasurytypes.QueryWalletByIdRequest{Id: *walletID})
		if err != nil {
			return nil, nil, err
		}
		denom = "q" + strings.ReplaceAll(strings.TrimPrefix(wallet.Wallet.Type.String(), "WALLET_TYPE_"), "_", "-")
		if isToken {
			denom += "/" + tokenName + "/" + tokenContractAddr
		}
	}
	return sdk.NewCoins(sdk.NewCoin(denom, sdk.NewIntFromUint64(amount))), addr, nil
}

func (k Keeper) Mint(ctx sdk.Context, sender string, fromWalletID uint64, toWorkspaceAddr string, isToken bool, tokenName string, tokenContractAddr string, amount uint64) error {
	if err := k.validateMsg(ctx, sender, &fromWalletID, nil); err != nil {
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
	if err := k.validateMsg(ctx, sender, nil, &fromWorkspaceAddr); err != nil {
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
	if err := k.validateMsg(ctx, sender, nil, &fromWorkspaceAddr); err != nil {
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
