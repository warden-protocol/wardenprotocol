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

const (
	// ModuleName string name of module
	ModuleName = "feemarket"

	// StoreKey key for base fee and block gas used.
	// The Fee Market module should use a prefix store.
	StoreKey = ModuleName

	// RouterKey uses module name for routing
	RouterKey = ModuleName

	// TransientKey is the key to access the FeeMarket transient store, that is reset
	// during the Commit phase.
	TransientKey = "transient_" + ModuleName
)

// prefix bytes for the feemarket persistent store
const (
	prefixBlockGasWanted    = iota + 1
	deprecatedPrefixBaseFee // unused
)

const (
	prefixTransientBlockGasUsed = iota + 1
)

// KVStore key prefixes
var (
	KeyPrefixBlockGasWanted = []byte{prefixBlockGasWanted}
)

// Transient Store key prefixes
var (
	KeyPrefixTransientBlockGasWanted = []byte{prefixTransientBlockGasUsed}
)
