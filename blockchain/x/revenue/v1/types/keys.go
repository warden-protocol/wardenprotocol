// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:LGPL-3.0-only

package types

import sdk "github.com/cosmos/cosmos-sdk/types"

// constants
const (
	// module name
	ModuleName = "revenue"

	// StoreKey to be used when creating the KVStore
	StoreKey = ModuleName

	// RouterKey to be used for message routing
	RouterKey = ModuleName
)

// prefix bytes for the fees persistent store
const (
	prefixRevenue = iota + 1
	prefixDeployer
	prefixWithdrawer
)

// KVStore key prefixes
var (
	KeyPrefixRevenue    = []byte{prefixRevenue}
	KeyPrefixDeployer   = []byte{prefixDeployer}
	KeyPrefixWithdrawer = []byte{prefixWithdrawer}
)

// GetKeyPrefixDeployer returns the KVStore key prefix for storing
// registered revenue contract for a deployer
func GetKeyPrefixDeployer(deployerAddress sdk.AccAddress) []byte {
	return append(KeyPrefixDeployer, deployerAddress.Bytes()...)
}

// GetKeyPrefixWithdrawer returns the KVStore key prefix for storing
// registered revenue contract for a withdrawer
func GetKeyPrefixWithdrawer(withdrawerAddress sdk.AccAddress) []byte {
	return append(KeyPrefixWithdrawer, withdrawerAddress.Bytes()...)
}
