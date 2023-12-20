// Copyright 2023 Qredo Ltd.
// This file is part of the Fusion library.
//
// The Fusion library is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// You should have received a copy of the GNU Lesser General Public License
// along with the Fusion library. If not, see https://github.com/qredo/fusionchain/blob/main/LICENSE
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

	identity "github.com/qredo/fusionchain/x/identity/keeper"
	"github.com/qredo/fusionchain/x/qassets/types"
	treasury "github.com/qredo/fusionchain/x/treasury/keeper"
	treasurytypes "github.com/qredo/fusionchain/x/treasury/types"
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

func (Keeper) Logger(ctx sdk.Context) log.Logger {
	return ctx.Logger().With("module", fmt.Sprintf("x/%s", types.ModuleName))
}

func (k Keeper) validate(ctx sdk.Context, sender string, workspaceAddr string, walletType *treasurytypes.WalletType) error {
	if walletType != nil && *walletType == treasurytypes.WalletType_WALLET_TYPE_UNSPECIFIED {
		return fmt.Errorf("error minting qasset: wallet type is unspecified")
	}
	workspace := k.identityKeeper.GetWorkspace(ctx, workspaceAddr)
	if workspace == nil {
		return fmt.Errorf("workspace %s not found", workspaceAddr)
	}
	if !workspace.IsOwner(sender) {
		return fmt.Errorf("sender %s is not an owner of workspace %s", sender, workspaceAddr)
	}
	return nil
}

func (Keeper) setupQAsset(
	_ sdk.Context,
	workspaceAddr string,
	walletType *treasurytypes.WalletType,
	isToken bool,
	tokenName string,
	tokenContractAddr string,
	amount uint64,
	qAssetDenom *string,
) (sdk.Coins, sdk.AccAddress, error) {
	addr, err := sdk.AccAddressFromBech32(workspaceAddr)
	if err != nil {
		return nil, nil, err
	}
	var denom string
	if walletType != nil {
		denom = "q" + strings.ReplaceAll(strings.TrimPrefix(walletType.String(), "WALLET_TYPE_"), "_", "-")
		if isToken {
			denom += "/" + tokenName + "/" + tokenContractAddr
		}
	}
	if qAssetDenom != nil {
		denom = *qAssetDenom
	}
	return sdk.NewCoins(sdk.NewCoin(denom, sdk.NewIntFromUint64(amount))), addr, nil
}

func (k Keeper) Mint(
	ctx sdk.Context,
	sender string,
	workspaceAddr string,
	walletType treasurytypes.WalletType,
	isToken bool,
	tokenName string,
	tokenContractAddr string,
	amount uint64,
) error {
	if err := k.validate(ctx, sender, workspaceAddr, &walletType); err != nil {
		return err
	}
	coins, addr, err := k.setupQAsset(ctx, workspaceAddr, &walletType, isToken, tokenName, tokenContractAddr, amount, nil)
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

func (k Keeper) Burn(
	ctx sdk.Context,
	sender string,
	workspaceAddr string,
	walletType treasurytypes.WalletType,
	isToken bool,
	tokenName string,
	tokenContractAddr string,
	amount uint64,
) error {
	if err := k.validate(ctx, sender, workspaceAddr, &walletType); err != nil {
		return err
	}
	coins, addr, err := k.setupQAsset(ctx, workspaceAddr, &walletType, isToken, tokenName, tokenContractAddr, amount, nil)
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
	if err := k.validate(ctx, sender, fromWorkspaceAddr, nil); err != nil {
		return err
	}
	coins, fromAddr, err := k.setupQAsset(ctx, fromWorkspaceAddr, nil, false, "", "", amount, &qAssetDenom)
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
