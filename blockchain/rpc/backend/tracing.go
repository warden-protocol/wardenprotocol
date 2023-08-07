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
package backend

import (
	"encoding/json"
	"fmt"

	tmrpctypes "github.com/cometbft/cometbft/rpc/core/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/common/hexutil"
	rpctypes "github.com/evmos/ethermint/rpc/types"
	evmtypes "github.com/evmos/ethermint/x/evm/types"
	"github.com/pkg/errors"
)

// TraceTransaction returns the structured logs created during the execution of EVM
// and returns them as a JSON object.
func (b *Backend) TraceTransaction(hash common.Hash, config *evmtypes.TraceConfig) (interface{}, error) {
	// Get transaction by hash
	transaction, err := b.GetTxByEthHash(hash)
	if err != nil {
		b.logger.Debug("tx not found", "hash", hash)
		return nil, err
	}

	// check if block number is 0
	if transaction.Height == 0 {
		return nil, errors.New("genesis is not traceable")
	}

	blk, err := b.TendermintBlockByNumber(rpctypes.BlockNumber(transaction.Height))
	if err != nil {
		b.logger.Debug("block not found", "height", transaction.Height)
		return nil, err
	}

	// check tx index is not out of bound
	if uint32(len(blk.Block.Txs)) < transaction.TxIndex {
		b.logger.Debug("tx index out of bounds", "index", transaction.TxIndex, "hash", hash.String(), "height", blk.Block.Height)
		return nil, fmt.Errorf("transaction not included in block %v", blk.Block.Height)
	}

	var predecessors []*evmtypes.MsgEthereumTx
	for _, txBz := range blk.Block.Txs[:transaction.TxIndex] {
		tx, err := b.clientCtx.TxConfig.TxDecoder()(txBz)
		if err != nil {
			b.logger.Debug("failed to decode transaction in block", "height", blk.Block.Height, "error", err.Error())
			continue
		}
		for _, msg := range tx.GetMsgs() {
			ethMsg, ok := msg.(*evmtypes.MsgEthereumTx)
			if !ok {
				continue
			}

			predecessors = append(predecessors, ethMsg)
		}
	}

	tx, err := b.clientCtx.TxConfig.TxDecoder()(blk.Block.Txs[transaction.TxIndex])
	if err != nil {
		b.logger.Debug("tx not found", "hash", hash)
		return nil, err
	}

	// add predecessor messages in current cosmos tx
	for i := 0; i < int(transaction.MsgIndex); i++ {
		ethMsg, ok := tx.GetMsgs()[i].(*evmtypes.MsgEthereumTx)
		if !ok {
			continue
		}
		predecessors = append(predecessors, ethMsg)
	}

	ethMessage, ok := tx.GetMsgs()[transaction.MsgIndex].(*evmtypes.MsgEthereumTx)
	if !ok {
		b.logger.Debug("invalid transaction type", "type", fmt.Sprintf("%T", tx))
		return nil, fmt.Errorf("invalid transaction type %T", tx)
	}

	traceTxRequest := evmtypes.QueryTraceTxRequest{
		Msg:             ethMessage,
		Predecessors:    predecessors,
		BlockNumber:     blk.Block.Height,
		BlockTime:       blk.Block.Time,
		BlockHash:       common.Bytes2Hex(blk.BlockID.Hash),
		ProposerAddress: sdk.ConsAddress(blk.Block.ProposerAddress),
		ChainId:         b.chainID.Int64(),
	}

	if config != nil {
		traceTxRequest.TraceConfig = config
	}

	// minus one to get the context of block beginning
	contextHeight := transaction.Height - 1
	if contextHeight < 1 {
		// 0 is a special value in `ContextWithHeight`
		contextHeight = 1
	}
	traceResult, err := b.queryClient.TraceTx(rpctypes.ContextWithHeight(contextHeight), &traceTxRequest)
	if err != nil {
		return nil, err
	}

	// Response format is unknown due to custom tracer config param
	// More information can be found here https://geth.ethereum.org/docs/dapp/tracing-filtered
	var decodedResult interface{}
	err = json.Unmarshal(traceResult.Data, &decodedResult)
	if err != nil {
		return nil, err
	}

	return decodedResult, nil
}

// TraceBlock configures a new tracer according to the provided configuration, and
// executes all the transactions contained within. The return value will be one item
// per transaction, dependent on the requested tracer.
func (b *Backend) TraceBlock(height rpctypes.BlockNumber,
	config *evmtypes.TraceConfig,
	block *tmrpctypes.ResultBlock,
) ([]*evmtypes.TxTraceResult, error) {
	txs := block.Block.Txs
	txsLength := len(txs)

	if txsLength == 0 {
		// If there are no transactions return empty array
		return []*evmtypes.TxTraceResult{}, nil
	}
	blockRes, err := b.TendermintBlockResultByNumber(&block.Block.Height)
	if err != nil {
		b.logger.Debug("block result not found", "height", block.Block.Height, "error", err.Error())
		return nil, nil
	}
	txDecoder := b.clientCtx.TxConfig.TxDecoder()

	var txsMessages []*evmtypes.MsgEthereumTx
	for i, tx := range txs {
		if !rpctypes.TxSuccessOrExceedsBlockGasLimit(blockRes.TxsResults[i]) {
			b.logger.Debug("invalid tx result code", "cosmos-hash", hexutil.Encode(tx.Hash()))
			continue
		}
		decodedTx, err := txDecoder(tx)
		if err != nil {
			b.logger.Error("failed to decode transaction", "hash", txs[i].Hash(), "error", err.Error())
			continue
		}

		for _, msg := range decodedTx.GetMsgs() {
			ethMessage, ok := msg.(*evmtypes.MsgEthereumTx)
			if !ok {
				// Just considers Ethereum transactions
				continue
			}
			txsMessages = append(txsMessages, ethMessage)
		}
	}

	// minus one to get the context at the beginning of the block
	contextHeight := height - 1
	if contextHeight < 1 {
		// 0 is a special value for `ContextWithHeight`.
		contextHeight = 1
	}
	ctxWithHeight := rpctypes.ContextWithHeight(int64(contextHeight))

	traceBlockRequest := &evmtypes.QueryTraceBlockRequest{
		Txs:             txsMessages,
		TraceConfig:     config,
		BlockNumber:     block.Block.Height,
		BlockTime:       block.Block.Time,
		BlockHash:       common.Bytes2Hex(block.BlockID.Hash),
		ProposerAddress: sdk.ConsAddress(block.Block.ProposerAddress),
		ChainId:         b.chainID.Int64(),
	}

	res, err := b.queryClient.TraceBlock(ctxWithHeight, traceBlockRequest)
	if err != nil {
		return nil, err
	}

	decodedResults := make([]*evmtypes.TxTraceResult, txsLength)
	if err := json.Unmarshal(res.Data, &decodedResults); err != nil {
		return nil, err
	}

	return decodedResults, nil
}
