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
package importer

import (
	"math/big"

	"github.com/ethereum/go-ethereum/common"
	ethcons "github.com/ethereum/go-ethereum/consensus"
	ethstate "github.com/ethereum/go-ethereum/core/state"
	ethtypes "github.com/ethereum/go-ethereum/core/types"
	ethrpc "github.com/ethereum/go-ethereum/rpc"
)

// ChainContext implements Ethereum's core.ChainContext and consensus.Engine
// interfaces. It is needed in order to apply and process Ethereum
// transactions. There should only be a single implementation in Ethermint. For
// the purposes of Ethermint, it should be support retrieving headers and
// consensus parameters from  the current blockchain to be used during
// transaction processing.
//
// NOTE: Ethermint will distribute the fees out to validators, so the structure
// and functionality of this is a WIP and subject to change.
type ChainContext struct {
	Coinbase        common.Address
	headersByNumber map[uint64]*ethtypes.Header
}

// NewChainContext generates new ChainContext based on Ethereum's core.ChainContext and
// consensus.Engine interfaces in order to process Ethereum transactions.
func NewChainContext() *ChainContext {
	return &ChainContext{
		headersByNumber: make(map[uint64]*ethtypes.Header),
	}
}

// Engine implements Ethereum's core.ChainContext interface. As a ChainContext
// implements the consensus.Engine interface, it is simply returned.
func (cc *ChainContext) Engine() ethcons.Engine {
	return cc
}

// SetHeader implements Ethereum's core.ChainContext interface. It sets the
// header for the given block number.
func (cc *ChainContext) SetHeader(number uint64, header *ethtypes.Header) {
	cc.headersByNumber[number] = header
}

// GetHeader implements Ethereum's core.ChainContext interface.
//
// TODO: The Cosmos SDK supports retreiving such information in contexts and
// multi-store, so this will be need to be integrated.
func (cc *ChainContext) GetHeader(_ common.Hash, number uint64) *ethtypes.Header {
	if header, ok := cc.headersByNumber[number]; ok {
		return header
	}

	return nil
}

// Author implements Ethereum's consensus.Engine interface. It is responsible
// for returned the address of the validtor to receive any fees. This function
// is only invoked if the given author in the ApplyTransaction call is nil.
//
// NOTE: Ethermint will distribute the fees out to validators, so the structure
// and functionality of this is a WIP and subject to change.
func (cc *ChainContext) Author(_ *ethtypes.Header) (common.Address, error) {
	return cc.Coinbase, nil
}

// APIs implements Ethereum's consensus.Engine interface. It currently performs
// a no-op.
//
// TODO: Do we need to support such RPC APIs? This will tie into a bigger
// discussion on if we want to support web3.
func (cc *ChainContext) APIs(_ ethcons.ChainHeaderReader) []ethrpc.API {
	return nil
}

// CalcDifficulty implements Ethereum's consensus.Engine interface. It currently
// performs a no-op.
func (cc *ChainContext) CalcDifficulty(_ ethcons.ChainHeaderReader, _ uint64, _ *ethtypes.Header) *big.Int {
	return nil
}

// Finalize implements Ethereum's consensus.Engine interface. It currently
// performs a no-op.
//
// TODO: Figure out if this needs to be hooked up to any part of the ABCI?
func (cc *ChainContext) Finalize(
	_ ethcons.ChainHeaderReader, _ *ethtypes.Header, _ *ethstate.StateDB,
	_ []*ethtypes.Transaction, _ []*ethtypes.Header) {
}

// FinalizeAndAssemble runs any post-transaction state modifications (e.g. block
// rewards) and assembles the final block.
//
// Note: The block header and state database might be updated to reflect any
// consensus rules that happen at finalization (e.g. block rewards).
// TODO: Figure out if this needs to be hooked up to any part of the ABCI?
func (cc *ChainContext) FinalizeAndAssemble(_ ethcons.ChainHeaderReader,
	_ *ethtypes.Header,
	_ *ethstate.StateDB,
	_ []*ethtypes.Transaction,
	_ []*ethtypes.Header,
	_ []*ethtypes.Receipt,
) (*ethtypes.Block, error) {
	return nil, nil
}

// Prepare implements Ethereum's consensus.Engine interface. It currently
// performs a no-op.
//
// TODO: Figure out if this needs to be hooked up to any part of the ABCI?
func (cc *ChainContext) Prepare(_ ethcons.ChainHeaderReader, _ *ethtypes.Header) error {
	return nil
}

// Seal implements Ethereum's consensus.Engine interface. It currently
// performs a no-op.
//
// TODO: Figure out if this needs to be hooked up to any part of the ABCI?
func (cc *ChainContext) Seal(_ ethcons.ChainHeaderReader, _ *ethtypes.Block, _ chan<- *ethtypes.Block, _ <-chan struct{}) error {
	return nil
}

// SealHash implements Ethereum's consensus.Engine interface. It returns the
// hash of a block prior to it being sealed.
func (cc *ChainContext) SealHash(_ *ethtypes.Header) common.Hash {
	return common.Hash{}
}

// VerifyHeader implements Ethereum's consensus.Engine interface. It currently
// performs a no-op.
//
// TODO: Figure out if this needs to be hooked up to any part of the Cosmos SDK
// handlers?
func (cc *ChainContext) VerifyHeader(_ ethcons.ChainHeaderReader, _ *ethtypes.Header, _ bool) error {
	return nil
}

// VerifyHeaders implements Ethereum's consensus.Engine interface. It
// currently performs a no-op.
//
// TODO: Figure out if this needs to be hooked up to any part of the Cosmos SDK
// handlers?
func (cc *ChainContext) VerifyHeaders(_ ethcons.ChainHeaderReader, _ []*ethtypes.Header, _ []bool) (chan<- struct{}, <-chan error) {
	return nil, nil
}

// VerifySeal implements Ethereum's consensus.Engine interface. It currently
// performs a no-op.
//
// TODO: Figure out if this needs to be hooked up to any part of the Cosmos SDK
// handlers?
func (cc *ChainContext) VerifySeal(_ ethcons.ChainHeaderReader, _ *ethtypes.Header) error {
	return nil
}

// VerifyUncles implements Ethereum's consensus.Engine interface. It currently
// performs a no-op.
func (cc *ChainContext) VerifyUncles(_ ethcons.ChainReader, _ *ethtypes.Block) error {
	return nil
}

// Close implements Ethereum's consensus.Engine interface. It terminates any
// background threads maintained by the consensus engine. It currently performs
// a no-op.
func (cc *ChainContext) Close() error {
	return nil
}
