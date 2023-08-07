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
package statedb

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/vm"
)

// ExtStateDB defines an extension to the interface provided by the go-ethereum
// codebase to support additional state transition functionalities. In particular
// it supports appending a new entry to the state journal through
// AppendJournalEntry so that the state can be reverted after running
// stateful precompiled contracts.
type ExtStateDB interface {
	vm.StateDB
	AppendJournalEntry(JournalEntry)
}

// Keeper provide underlying storage of StateDB
type Keeper interface {
	// Read methods
	GetAccount(ctx sdk.Context, addr common.Address) *Account
	GetState(ctx sdk.Context, addr common.Address, key common.Hash) common.Hash
	GetCode(ctx sdk.Context, codeHash common.Hash) []byte
	// the callback returns false to break early
	ForEachStorage(ctx sdk.Context, addr common.Address, cb func(key, value common.Hash) bool)

	// Write methods, only called by `StateDB.Commit()`
	SetAccount(ctx sdk.Context, addr common.Address, account Account) error
	SetState(ctx sdk.Context, addr common.Address, key common.Hash, value []byte)
	SetCode(ctx sdk.Context, codeHash []byte, code []byte)
	DeleteAccount(ctx sdk.Context, addr common.Address) error
}
