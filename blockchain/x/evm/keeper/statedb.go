// Copyright 2021 Evmos Foundation
// This file is part of Evmos' Ethermint library.
//
// The Ethermint library is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// The Ethermint library is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License
// along with the Ethermint library. If not, see https://github.com/evmos/ethermint/blob/main/LICENSE
package keeper

import (
	"fmt"
	"math/big"

	sdkmath "cosmossdk.io/math"

	errorsmod "cosmossdk.io/errors"
	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/ethereum/go-ethereum/common"
	ethermint "github.com/evmos/ethermint/types"
	"github.com/evmos/ethermint/x/evm/statedb"
	"github.com/evmos/ethermint/x/evm/types"
)

var _ statedb.Keeper = &Keeper{}

// ----------------------------------------------------------------------------
// StateDB Keeper implementation
// ----------------------------------------------------------------------------

// GetAccount returns nil if account is not exist, returns error if it's not `EthAccountI`
func (k *Keeper) GetAccount(ctx sdk.Context, addr common.Address) *statedb.Account {
	acct := k.GetAccountWithoutBalance(ctx, addr)
	if acct == nil {
		return nil
	}

	acct.Balance = k.GetBalance(ctx, addr)
	return acct
}

// GetState loads contract state from database, implements `statedb.Keeper` interface.
func (k *Keeper) GetState(ctx sdk.Context, addr common.Address, key common.Hash) common.Hash {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.AddressStoragePrefix(addr))

	value := store.Get(key.Bytes())
	if len(value) == 0 {
		return common.Hash{}
	}

	return common.BytesToHash(value)
}

// GetCode loads contract code from database, implements `statedb.Keeper` interface.
func (k *Keeper) GetCode(ctx sdk.Context, codeHash common.Hash) []byte {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefixCode)
	return store.Get(codeHash.Bytes())
}

// ForEachStorage iterate contract storage, callback return false to break early
func (k *Keeper) ForEachStorage(ctx sdk.Context, addr common.Address, cb func(key, value common.Hash) bool) {
	store := ctx.KVStore(k.storeKey)
	prefix := types.AddressStoragePrefix(addr)

	iterator := sdk.KVStorePrefixIterator(store, prefix)
	defer iterator.Close()

	for ; iterator.Valid(); iterator.Next() {
		key := common.BytesToHash(iterator.Key())
		value := common.BytesToHash(iterator.Value())

		// check if iteration stops
		if !cb(key, value) {
			return
		}
	}
}

// SetBalance update account's balance, compare with current balance first, then decide to mint or burn.
func (k *Keeper) SetBalance(ctx sdk.Context, addr common.Address, amount *big.Int) error {
	cosmosAddr := sdk.AccAddress(addr.Bytes())

	params := k.GetParams(ctx)
	coin := k.bankKeeper.GetBalance(ctx, cosmosAddr, params.EvmDenom)
	balance := coin.Amount.BigInt()
	delta := new(big.Int).Sub(amount, balance)
	switch delta.Sign() {
	case 1:
		// mint
		coins := sdk.NewCoins(sdk.NewCoin(params.EvmDenom, sdkmath.NewIntFromBigInt(delta)))
		if err := k.bankKeeper.MintCoins(ctx, types.ModuleName, coins); err != nil {
			return err
		}
		if err := k.bankKeeper.SendCoinsFromModuleToAccount(ctx, types.ModuleName, cosmosAddr, coins); err != nil {
			return err
		}
	case -1:
		// burn
		coins := sdk.NewCoins(sdk.NewCoin(params.EvmDenom, sdkmath.NewIntFromBigInt(new(big.Int).Neg(delta))))
		if err := k.bankKeeper.SendCoinsFromAccountToModule(ctx, cosmosAddr, types.ModuleName, coins); err != nil {
			return err
		}
		if err := k.bankKeeper.BurnCoins(ctx, types.ModuleName, coins); err != nil {
			return err
		}
	default:
		// not changed
	}
	return nil
}

// SetAccount updates nonce/balance/codeHash together.
func (k *Keeper) SetAccount(ctx sdk.Context, addr common.Address, account statedb.Account) error {
	// update account
	cosmosAddr := sdk.AccAddress(addr.Bytes())
	acct := k.accountKeeper.GetAccount(ctx, cosmosAddr)
	if acct == nil {
		acct = k.accountKeeper.NewAccountWithAddress(ctx, cosmosAddr)
	}

	if err := acct.SetSequence(account.Nonce); err != nil {
		return err
	}

	codeHash := common.BytesToHash(account.CodeHash)

	if ethAcct, ok := acct.(ethermint.EthAccountI); ok {
		if err := ethAcct.SetCodeHash(codeHash); err != nil {
			return err
		}
	}

	k.accountKeeper.SetAccount(ctx, acct)

	if err := k.SetBalance(ctx, addr, account.Balance); err != nil {
		return err
	}

	k.Logger(ctx).Debug(
		"account updated",
		"ethereum-address", addr.Hex(),
		"nonce", account.Nonce,
		"codeHash", codeHash.Hex(),
		"balance", account.Balance,
	)
	return nil
}

// SetState update contract storage, delete if value is empty.
func (k *Keeper) SetState(ctx sdk.Context, addr common.Address, key common.Hash, value []byte) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.AddressStoragePrefix(addr))
	action := "updated"
	if len(value) == 0 {
		store.Delete(key.Bytes())
		action = "deleted"
	} else {
		store.Set(key.Bytes(), value)
	}
	k.Logger(ctx).Debug(
		fmt.Sprintf("state %s", action),
		"ethereum-address", addr.Hex(),
		"key", key.Hex(),
	)
}

// SetCode set contract code, delete if code is empty.
func (k *Keeper) SetCode(ctx sdk.Context, codeHash, code []byte) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefixCode)

	// store or delete code
	action := "updated"
	if len(code) == 0 {
		store.Delete(codeHash)
		action = "deleted"
	} else {
		store.Set(codeHash, code)
	}
	k.Logger(ctx).Debug(
		fmt.Sprintf("code %s", action),
		"code-hash", common.BytesToHash(codeHash).Hex(),
	)
}

// DeleteAccount handles contract's suicide call:
// - clear balance
// - remove code
// - remove states
// - remove auth account
func (k *Keeper) DeleteAccount(ctx sdk.Context, addr common.Address) error {
	cosmosAddr := sdk.AccAddress(addr.Bytes())
	acct := k.accountKeeper.GetAccount(ctx, cosmosAddr)
	if acct == nil {
		return nil
	}

	// NOTE: only Ethereum accounts (contracts) can be selfdestructed
	_, ok := acct.(ethermint.EthAccountI)
	if !ok {
		return errorsmod.Wrapf(types.ErrInvalidAccount, "type %T, address %s", acct, addr)
	}

	// clear balance
	if err := k.SetBalance(ctx, addr, new(big.Int)); err != nil {
		return err
	}

	// clear storage
	k.ForEachStorage(ctx, addr, func(key, _ common.Hash) bool {
		k.SetState(ctx, addr, key, nil)
		return true
	})

	// remove auth account
	k.accountKeeper.RemoveAccount(ctx, acct)

	k.Logger(ctx).Debug(
		"account suicided",
		"ethereum-address", addr.Hex(),
		"cosmos-address", cosmosAddr.String(),
	)

	return nil
}
