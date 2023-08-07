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
	"bytes"

	codectypes "github.com/cosmos/cosmos-sdk/codec/types"
	authtypes "github.com/cosmos/cosmos-sdk/x/auth/types"

	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/crypto"
)

var (
	_ authtypes.AccountI                 = (*EthAccount)(nil)
	_ EthAccountI                        = (*EthAccount)(nil)
	_ authtypes.GenesisAccount           = (*EthAccount)(nil)
	_ codectypes.UnpackInterfacesMessage = (*EthAccount)(nil)
)

var emptyCodeHash = crypto.Keccak256(nil)

const (
	// AccountTypeEOA defines the type for externally owned accounts (EOAs)
	AccountTypeEOA = int8(iota + 1)
	// AccountTypeContract defines the type for contract accounts
	AccountTypeContract
)

// EthAccountI represents the interface of an EVM compatible account
type EthAccountI interface {
	authtypes.AccountI
	// EthAddress returns the ethereum Address representation of the AccAddress
	EthAddress() common.Address
	// CodeHash is the keccak256 hash of the contract code (if any)
	GetCodeHash() common.Hash
	// SetCodeHash sets the code hash to the account fields
	SetCodeHash(code common.Hash) error
	// Type returns the type of Ethereum Account (EOA or Contract)
	Type() int8
}

// ----------------------------------------------------------------------------
// Main Ethermint account
// ----------------------------------------------------------------------------

// ProtoAccount defines the prototype function for BaseAccount used for an
// AccountKeeper.
func ProtoAccount() authtypes.AccountI {
	return &EthAccount{
		BaseAccount: &authtypes.BaseAccount{},
		CodeHash:    common.BytesToHash(emptyCodeHash).String(),
	}
}

// GetBaseAccount returns base account.
func (acc EthAccount) GetBaseAccount() *authtypes.BaseAccount {
	return acc.BaseAccount
}

// EthAddress returns the account address ethereum format.
func (acc EthAccount) EthAddress() common.Address {
	return common.BytesToAddress(acc.GetAddress().Bytes())
}

// GetCodeHash returns the account code hash in byte format
func (acc EthAccount) GetCodeHash() common.Hash {
	return common.HexToHash(acc.CodeHash)
}

// SetCodeHash sets the account code hash to the EthAccount fields
func (acc *EthAccount) SetCodeHash(codeHash common.Hash) error {
	acc.CodeHash = codeHash.Hex()
	return nil
}

// Type returns the type of Ethereum Account (EOA or Contract)
func (acc EthAccount) Type() int8 {
	if bytes.Equal(emptyCodeHash, common.HexToHash(acc.CodeHash).Bytes()) {
		return AccountTypeEOA
	}
	return AccountTypeContract
}
