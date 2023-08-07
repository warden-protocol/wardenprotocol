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
	"bytes"
	"fmt"
	"math/big"
	"strconv"

	tmrpcclient "github.com/cometbft/cometbft/rpc/client"
	tmrpctypes "github.com/cometbft/cometbft/rpc/core/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	grpctypes "github.com/cosmos/cosmos-sdk/types/grpc"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/common/hexutil"
	ethtypes "github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/trie"
	rpctypes "github.com/evmos/ethermint/rpc/types"
	evmtypes "github.com/evmos/ethermint/x/evm/types"
	"github.com/pkg/errors"
	"google.golang.org/grpc"
	"google.golang.org/grpc/metadata"
)

// BlockNumber returns the current block number in abci app state. Because abci
// app state could lag behind from tendermint latest block, it's more stable for
// the client to use the latest block number in abci app state than tendermint
// rpc.
func (b *Backend) BlockNumber() (hexutil.Uint64, error) {
	// do any grpc query, ignore the response and use the returned block height
	var header metadata.MD
	_, err := b.queryClient.Params(b.ctx, &evmtypes.QueryParamsRequest{}, grpc.Header(&header))
	if err != nil {
		return hexutil.Uint64(0), err
	}

	blockHeightHeader := header.Get(grpctypes.GRPCBlockHeightHeader)
	if headerLen := len(blockHeightHeader); headerLen != 1 {
		return 0, fmt.Errorf("unexpected '%s' gRPC header length; got %d, expected: %d", grpctypes.GRPCBlockHeightHeader, headerLen, 1)
	}

	height, err := strconv.ParseUint(blockHeightHeader[0], 10, 64)
	if err != nil {
		return 0, fmt.Errorf("failed to parse block height: %w", err)
	}

	return hexutil.Uint64(height), nil
}

// GetBlockByNumber returns the JSON-RPC compatible Ethereum block identified by
// block number. Depending on fullTx it either returns the full transaction
// objects or if false only the hashes of the transactions.
func (b *Backend) GetBlockByNumber(blockNum rpctypes.BlockNumber, fullTx bool) (map[string]interface{}, error) {
	resBlock, err := b.TendermintBlockByNumber(blockNum)
	if err != nil {
		return nil, nil
	}

	// return if requested block height is greater than the current one
	if resBlock == nil || resBlock.Block == nil {
		return nil, nil
	}

	blockRes, err := b.TendermintBlockResultByNumber(&resBlock.Block.Height)
	if err != nil {
		b.logger.Debug("failed to fetch block result from Tendermint", "height", blockNum, "error", err.Error())
		return nil, nil
	}

	res, err := b.RPCBlockFromTendermintBlock(resBlock, blockRes, fullTx)
	if err != nil {
		b.logger.Debug("GetEthBlockFromTendermint failed", "height", blockNum, "error", err.Error())
		return nil, err
	}

	return res, nil
}

// GetBlockByHash returns the JSON-RPC compatible Ethereum block identified by
// hash.
func (b *Backend) GetBlockByHash(hash common.Hash, fullTx bool) (map[string]interface{}, error) {
	resBlock, err := b.TendermintBlockByHash(hash)
	if err != nil {
		return nil, err
	}

	if resBlock == nil {
		// block not found
		return nil, nil
	}

	blockRes, err := b.TendermintBlockResultByNumber(&resBlock.Block.Height)
	if err != nil {
		b.logger.Debug("failed to fetch block result from Tendermint", "block-hash", hash.String(), "error", err.Error())
		return nil, nil
	}

	res, err := b.RPCBlockFromTendermintBlock(resBlock, blockRes, fullTx)
	if err != nil {
		b.logger.Debug("GetEthBlockFromTendermint failed", "hash", hash, "error", err.Error())
		return nil, err
	}

	return res, nil
}

// GetBlockTransactionCountByHash returns the number of Ethereum transactions in
// the block identified by hash.
func (b *Backend) GetBlockTransactionCountByHash(hash common.Hash) *hexutil.Uint {
	sc, ok := b.clientCtx.Client.(tmrpcclient.SignClient)
	if !ok {
		b.logger.Error("invalid rpc client")
	}
	block, err := sc.BlockByHash(b.ctx, hash.Bytes())
	if err != nil {
		b.logger.Debug("block not found", "hash", hash.Hex(), "error", err.Error())
		return nil
	}

	if block.Block == nil {
		b.logger.Debug("block not found", "hash", hash.Hex())
		return nil
	}

	return b.GetBlockTransactionCount(block)
}

// GetBlockTransactionCountByNumber returns the number of Ethereum transactions
// in the block identified by number.
func (b *Backend) GetBlockTransactionCountByNumber(blockNum rpctypes.BlockNumber) *hexutil.Uint {
	block, err := b.TendermintBlockByNumber(blockNum)
	if err != nil {
		b.logger.Debug("block not found", "height", blockNum.Int64(), "error", err.Error())
		return nil
	}

	if block.Block == nil {
		b.logger.Debug("block not found", "height", blockNum.Int64())
		return nil
	}

	return b.GetBlockTransactionCount(block)
}

// GetBlockTransactionCount returns the number of Ethereum transactions in a
// given block.
func (b *Backend) GetBlockTransactionCount(block *tmrpctypes.ResultBlock) *hexutil.Uint {
	blockRes, err := b.TendermintBlockResultByNumber(&block.Block.Height)
	if err != nil {
		return nil
	}

	ethMsgs := b.EthMsgsFromTendermintBlock(block, blockRes)
	n := hexutil.Uint(len(ethMsgs))
	return &n
}

// TendermintBlockByNumber returns a Tendermint-formatted block for a given
// block number
func (b *Backend) TendermintBlockByNumber(blockNum rpctypes.BlockNumber) (*tmrpctypes.ResultBlock, error) {
	height := blockNum.Int64()
	if height <= 0 {
		// fetch the latest block number from the app state, more accurate than the tendermint block store state.
		n, err := b.BlockNumber()
		if err != nil {
			return nil, err
		}
		height = int64(n)
	}
	resBlock, err := b.clientCtx.Client.Block(b.ctx, &height)
	if err != nil {
		b.logger.Debug("tendermint client failed to get block", "height", height, "error", err.Error())
		return nil, err
	}

	if resBlock.Block == nil {
		b.logger.Debug("TendermintBlockByNumber block not found", "height", height)
		return nil, nil
	}

	return resBlock, nil
}

// TendermintBlockResultByNumber returns a Tendermint-formatted block result
// by block number
func (b *Backend) TendermintBlockResultByNumber(height *int64) (*tmrpctypes.ResultBlockResults, error) {
	sc, ok := b.clientCtx.Client.(tmrpcclient.SignClient)
	if !ok {
		return nil, errors.New("invalid rpc client")
	}
	return sc.BlockResults(b.ctx, height)
}

// TendermintBlockByHash returns a Tendermint-formatted block by block number
func (b *Backend) TendermintBlockByHash(blockHash common.Hash) (*tmrpctypes.ResultBlock, error) {
	sc, ok := b.clientCtx.Client.(tmrpcclient.SignClient)
	if !ok {
		return nil, errors.New("invalid rpc client")
	}
	resBlock, err := sc.BlockByHash(b.ctx, blockHash.Bytes())
	if err != nil {
		b.logger.Debug("tendermint client failed to get block", "blockHash", blockHash.Hex(), "error", err.Error())
		return nil, err
	}

	if resBlock == nil || resBlock.Block == nil {
		b.logger.Debug("TendermintBlockByHash block not found", "blockHash", blockHash.Hex())
		return nil, nil
	}

	return resBlock, nil
}

// BlockNumberFromTendermint returns the BlockNumber from BlockNumberOrHash
func (b *Backend) BlockNumberFromTendermint(blockNrOrHash rpctypes.BlockNumberOrHash) (rpctypes.BlockNumber, error) {
	switch {
	case blockNrOrHash.BlockHash == nil && blockNrOrHash.BlockNumber == nil:
		return rpctypes.EthEarliestBlockNumber, fmt.Errorf("types BlockHash and BlockNumber cannot be both nil")
	case blockNrOrHash.BlockHash != nil:
		blockNumber, err := b.BlockNumberFromTendermintByHash(*blockNrOrHash.BlockHash)
		if err != nil {
			return rpctypes.EthEarliestBlockNumber, err
		}
		return rpctypes.NewBlockNumber(blockNumber), nil
	case blockNrOrHash.BlockNumber != nil:
		return *blockNrOrHash.BlockNumber, nil
	default:
		return rpctypes.EthEarliestBlockNumber, nil
	}
}

// BlockNumberFromTendermintByHash returns the block height of given block hash
func (b *Backend) BlockNumberFromTendermintByHash(blockHash common.Hash) (*big.Int, error) {
	resBlock, err := b.TendermintBlockByHash(blockHash)
	if err != nil {
		return nil, err
	}
	if resBlock == nil {
		return nil, errors.Errorf("block not found for hash %s", blockHash.Hex())
	}
	return big.NewInt(resBlock.Block.Height), nil
}

// EthMsgsFromTendermintBlock returns all real MsgEthereumTxs from a
// Tendermint block. It also ensures consistency over the correct txs indexes
// across RPC endpoints
func (b *Backend) EthMsgsFromTendermintBlock(
	resBlock *tmrpctypes.ResultBlock,
	blockRes *tmrpctypes.ResultBlockResults,
) []*evmtypes.MsgEthereumTx {
	var result []*evmtypes.MsgEthereumTx
	block := resBlock.Block

	txResults := blockRes.TxsResults

	for i, tx := range block.Txs {
		// Check if tx exists on EVM by cross checking with blockResults:
		//  - Include unsuccessful tx that exceeds block gas limit
		//  - Exclude unsuccessful tx with any other error but ExceedBlockGasLimit
		if !rpctypes.TxSuccessOrExceedsBlockGasLimit(txResults[i]) {
			b.logger.Debug("invalid tx result code", "cosmos-hash", hexutil.Encode(tx.Hash()))
			continue
		}

		tx, err := b.clientCtx.TxConfig.TxDecoder()(tx)
		if err != nil {
			b.logger.Debug("failed to decode transaction in block", "height", block.Height, "error", err.Error())
			continue
		}

		for _, msg := range tx.GetMsgs() {
			ethMsg, ok := msg.(*evmtypes.MsgEthereumTx)
			if !ok {
				continue
			}

			ethMsg.Hash = ethMsg.AsTransaction().Hash().Hex()
			result = append(result, ethMsg)
		}
	}

	return result
}

// HeaderByNumber returns the block header identified by height.
func (b *Backend) HeaderByNumber(blockNum rpctypes.BlockNumber) (*ethtypes.Header, error) {
	resBlock, err := b.TendermintBlockByNumber(blockNum)
	if err != nil {
		return nil, err
	}

	if resBlock == nil {
		return nil, errors.Errorf("block not found for height %d", blockNum)
	}

	blockRes, err := b.TendermintBlockResultByNumber(&resBlock.Block.Height)
	if err != nil {
		return nil, fmt.Errorf("block result not found for height %d", resBlock.Block.Height)
	}

	bloom, err := b.BlockBloom(blockRes)
	if err != nil {
		b.logger.Debug("HeaderByNumber BlockBloom failed", "height", resBlock.Block.Height)
	}

	baseFee, err := b.BaseFee(blockRes)
	if err != nil {
		// handle the error for pruned node.
		b.logger.Error("failed to fetch Base Fee from prunned block. Check node prunning configuration", "height", resBlock.Block.Height, "error", err)
	}

	ethHeader := rpctypes.EthHeaderFromTendermint(resBlock.Block.Header, bloom, baseFee)
	return ethHeader, nil
}

// HeaderByHash returns the block header identified by hash.
func (b *Backend) HeaderByHash(blockHash common.Hash) (*ethtypes.Header, error) {
	resBlock, err := b.TendermintBlockByHash(blockHash)
	if err != nil {
		return nil, err
	}
	if resBlock == nil {
		return nil, errors.Errorf("block not found for hash %s", blockHash.Hex())
	}

	blockRes, err := b.TendermintBlockResultByNumber(&resBlock.Block.Height)
	if err != nil {
		return nil, errors.Errorf("block result not found for height %d", resBlock.Block.Height)
	}

	bloom, err := b.BlockBloom(blockRes)
	if err != nil {
		b.logger.Debug("HeaderByHash BlockBloom failed", "height", resBlock.Block.Height)
	}

	baseFee, err := b.BaseFee(blockRes)
	if err != nil {
		// handle the error for pruned node.
		b.logger.Error("failed to fetch Base Fee from prunned block. Check node prunning configuration", "height", resBlock.Block.Height, "error", err)
	}

	ethHeader := rpctypes.EthHeaderFromTendermint(resBlock.Block.Header, bloom, baseFee)
	return ethHeader, nil
}

// BlockBloom query block bloom filter from block results
func (b *Backend) BlockBloom(blockRes *tmrpctypes.ResultBlockResults) (ethtypes.Bloom, error) {
	for _, event := range blockRes.EndBlockEvents {
		if event.Type != evmtypes.EventTypeBlockBloom {
			continue
		}

		for _, attr := range event.Attributes {
			if bytes.Equal([]byte(attr.Key), bAttributeKeyEthereumBloom) {
				return ethtypes.BytesToBloom([]byte(attr.Value)), nil
			}
		}
	}
	return ethtypes.Bloom{}, errors.New("block bloom event is not found")
}

// RPCBlockFromTendermintBlock returns a JSON-RPC compatible Ethereum block from a
// given Tendermint block and its block result.
func (b *Backend) RPCBlockFromTendermintBlock(
	resBlock *tmrpctypes.ResultBlock,
	blockRes *tmrpctypes.ResultBlockResults,
	fullTx bool,
) (map[string]interface{}, error) {
	ethRPCTxs := []interface{}{}
	block := resBlock.Block

	baseFee, err := b.BaseFee(blockRes)
	if err != nil {
		// handle the error for pruned node.
		b.logger.Error("failed to fetch Base Fee from prunned block. Check node prunning configuration", "height", block.Height, "error", err)
	}

	msgs := b.EthMsgsFromTendermintBlock(resBlock, blockRes)
	for txIndex, ethMsg := range msgs {
		if !fullTx {
			hash := common.HexToHash(ethMsg.Hash)
			ethRPCTxs = append(ethRPCTxs, hash)
			continue
		}

		tx := ethMsg.AsTransaction()
		rpcTx, err := rpctypes.NewRPCTransaction(
			tx,
			common.BytesToHash(block.Hash()),
			uint64(block.Height),
			uint64(txIndex),
			baseFee,
			b.chainID,
		)
		if err != nil {
			b.logger.Debug("NewTransactionFromData for receipt failed", "hash", tx.Hash().Hex(), "error", err.Error())
			continue
		}
		ethRPCTxs = append(ethRPCTxs, rpcTx)
	}

	bloom, err := b.BlockBloom(blockRes)
	if err != nil {
		b.logger.Debug("failed to query BlockBloom", "height", block.Height, "error", err.Error())
	}

	req := &evmtypes.QueryValidatorAccountRequest{
		ConsAddress: sdk.ConsAddress(block.Header.ProposerAddress).String(),
	}

	var validatorAccAddr sdk.AccAddress

	ctx := rpctypes.ContextWithHeight(block.Height)
	res, err := b.queryClient.ValidatorAccount(ctx, req)
	if err != nil {
		b.logger.Debug(
			"failed to query validator operator address",
			"height", block.Height,
			"cons-address", req.ConsAddress,
			"error", err.Error(),
		)
		// use zero address as the validator operator address
		validatorAccAddr = sdk.AccAddress(common.Address{}.Bytes())
	} else {
		validatorAccAddr, err = sdk.AccAddressFromBech32(res.AccountAddress)
		if err != nil {
			return nil, err
		}
	}

	validatorAddr := common.BytesToAddress(validatorAccAddr)

	gasLimit, err := rpctypes.BlockMaxGasFromConsensusParams(ctx, b.clientCtx, block.Height)
	if err != nil {
		b.logger.Error("failed to query consensus params", "error", err.Error())
	}

	gasUsed := uint64(0)

	for _, txsResult := range blockRes.TxsResults {
		// workaround for cosmos-sdk bug. https://github.com/cosmos/cosmos-sdk/issues/10832
		if ShouldIgnoreGasUsed(txsResult) {
			// block gas limit has exceeded, other txs must have failed with same reason.
			break
		}
		gasUsed += uint64(txsResult.GetGasUsed())
	}

	formattedBlock := rpctypes.FormatBlock(
		block.Header, block.Size(),
		gasLimit, new(big.Int).SetUint64(gasUsed),
		ethRPCTxs, bloom, validatorAddr, baseFee,
	)
	return formattedBlock, nil
}

// EthBlockByNumber returns the Ethereum Block identified by number.
func (b *Backend) EthBlockByNumber(blockNum rpctypes.BlockNumber) (*ethtypes.Block, error) {
	resBlock, err := b.TendermintBlockByNumber(blockNum)
	if err != nil {
		return nil, err
	}
	if resBlock == nil {
		// block not found
		return nil, fmt.Errorf("block not found for height %d", blockNum)
	}

	blockRes, err := b.TendermintBlockResultByNumber(&resBlock.Block.Height)
	if err != nil {
		return nil, fmt.Errorf("block result not found for height %d", resBlock.Block.Height)
	}

	return b.EthBlockFromTendermintBlock(resBlock, blockRes)
}

// EthBlockFromTendermintBlock returns an Ethereum Block type from Tendermint block
// EthBlockFromTendermintBlock
func (b *Backend) EthBlockFromTendermintBlock(
	resBlock *tmrpctypes.ResultBlock,
	blockRes *tmrpctypes.ResultBlockResults,
) (*ethtypes.Block, error) {
	block := resBlock.Block
	height := block.Height
	bloom, err := b.BlockBloom(blockRes)
	if err != nil {
		b.logger.Debug("HeaderByNumber BlockBloom failed", "height", height)
	}

	baseFee, err := b.BaseFee(blockRes)
	if err != nil {
		// handle error for pruned node and log
		b.logger.Error("failed to fetch Base Fee from prunned block. Check node prunning configuration", "height", height, "error", err)
	}

	ethHeader := rpctypes.EthHeaderFromTendermint(block.Header, bloom, baseFee)
	msgs := b.EthMsgsFromTendermintBlock(resBlock, blockRes)

	txs := make([]*ethtypes.Transaction, len(msgs))
	for i, ethMsg := range msgs {
		txs[i] = ethMsg.AsTransaction()
	}

	// TODO: add tx receipts
	ethBlock := ethtypes.NewBlock(ethHeader, txs, nil, nil, trie.NewStackTrie(nil))
	return ethBlock, nil
}
