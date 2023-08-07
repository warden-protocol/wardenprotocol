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
package types

import (
	"github.com/ethereum/go-ethereum/common"
)

const (
	// ModuleName string name of module
	ModuleName = "evm"

	// StoreKey key for ethereum storage data, account code (StateDB) or block
	// related data for Web3.
	// The EVM module should use a prefix store.
	StoreKey = ModuleName

	// TransientKey is the key to access the EVM transient store, that is reset
	// during the Commit phase.
	TransientKey = "transient_" + ModuleName

	// RouterKey uses module name for routing
	RouterKey = ModuleName
)

// prefix bytes for the EVM persistent store
const (
	prefixCode = iota + 1
	prefixStorage
	prefixParams
)

// prefix bytes for the EVM transient store
const (
	prefixTransientBloom = iota + 1
	prefixTransientTxIndex
	prefixTransientLogSize
	prefixTransientGasUsed
)

// KVStore key prefixes
var (
	KeyPrefixCode    = []byte{prefixCode}
	KeyPrefixStorage = []byte{prefixStorage}
	KeyPrefixParams  = []byte{prefixParams}
)

// Transient Store key prefixes
var (
	KeyPrefixTransientBloom   = []byte{prefixTransientBloom}
	KeyPrefixTransientTxIndex = []byte{prefixTransientTxIndex}
	KeyPrefixTransientLogSize = []byte{prefixTransientLogSize}
	KeyPrefixTransientGasUsed = []byte{prefixTransientGasUsed}
)

// AddressStoragePrefix returns a prefix to iterate over a given account storage.
func AddressStoragePrefix(address common.Address) []byte {
	return append(KeyPrefixStorage, address.Bytes()...)
}

// StateKey defines the full key under which an account state is stored.
func StateKey(address common.Address, key []byte) []byte {
	return append(AddressStoragePrefix(address), key...)
}
