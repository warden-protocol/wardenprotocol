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
package web3

import (
	"github.com/evmos/ethermint/version"

	"github.com/ethereum/go-ethereum/common/hexutil"
	"github.com/ethereum/go-ethereum/crypto"
)

// PublicAPI is the web3_ prefixed set of APIs in the Web3 JSON-RPC spec.
type PublicAPI struct{}

// NewPublicAPI creates an instance of the Web3 API.
func NewPublicAPI() *PublicAPI {
	return &PublicAPI{}
}

// ClientVersion returns the client version in the Web3 user agent format.
func (a *PublicAPI) ClientVersion() string {
	return version.Version()
}

// Sha3 returns the keccak-256 hash of the passed-in input.
func (a *PublicAPI) Sha3(input string) hexutil.Bytes {
	return crypto.Keccak256(hexutil.Bytes(input))
}
