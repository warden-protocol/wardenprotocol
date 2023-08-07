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
package indexer

import (
	"fmt"

	errorsmod "cosmossdk.io/errors"
	dbm "github.com/cometbft/cometbft-db"
	abci "github.com/cometbft/cometbft/abci/types"
	"github.com/cometbft/cometbft/libs/log"
	tmtypes "github.com/cometbft/cometbft/types"
	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"
	authante "github.com/cosmos/cosmos-sdk/x/auth/ante"
	"github.com/ethereum/go-ethereum/common"
	rpctypes "github.com/evmos/ethermint/rpc/types"

	ethermint "github.com/evmos/ethermint/types"
	evmtypes "github.com/evmos/ethermint/x/evm/types"
)

const (
	KeyPrefixTxHash  = 1
	KeyPrefixTxIndex = 2

	// TxIndexKeyLength is the length of tx-index key
	TxIndexKeyLength = 1 + 8 + 8
)

var _ ethermint.EVMTxIndexer = &KVIndexer{}

// KVIndexer implements a eth tx indexer on a KV db.
type KVIndexer struct {
	db        dbm.DB
	logger    log.Logger
	clientCtx client.Context
}

// NewKVIndexer creates the KVIndexer
func NewKVIndexer(db dbm.DB, logger log.Logger, clientCtx client.Context) *KVIndexer {
	return &KVIndexer{db, logger, clientCtx}
}

// IndexBlock index all the eth txs in a block through the following steps:
// - Iterates over all of the Txs in Block
// - Parses eth Tx infos from cosmos-sdk events for every TxResult
// - Iterates over all the messages of the Tx
// - Builds and stores a indexer.TxResult based on parsed events for every message
func (kv *KVIndexer) IndexBlock(block *tmtypes.Block, txResults []*abci.ResponseDeliverTx) error {
	height := block.Header.Height

	batch := kv.db.NewBatch()
	defer batch.Close()

	// record index of valid eth tx during the iteration
	var ethTxIndex int32
	for txIndex, tx := range block.Txs {
		result := txResults[txIndex]
		if !rpctypes.TxSuccessOrExceedsBlockGasLimit(result) {
			continue
		}

		tx, err := kv.clientCtx.TxConfig.TxDecoder()(tx)
		if err != nil {
			kv.logger.Error("Fail to decode tx", "err", err, "block", height, "txIndex", txIndex)
			continue
		}

		if !isEthTx(tx) {
			continue
		}

		txs, err := rpctypes.ParseTxResult(result, tx)
		if err != nil {
			kv.logger.Error("Fail to parse event", "err", err, "block", height, "txIndex", txIndex)
			continue
		}

		var cumulativeGasUsed uint64
		for msgIndex, msg := range tx.GetMsgs() {
			ethMsg := msg.(*evmtypes.MsgEthereumTx)
			txHash := common.HexToHash(ethMsg.Hash)

			txResult := ethermint.TxResult{
				Height:     height,
				TxIndex:    uint32(txIndex),
				MsgIndex:   uint32(msgIndex),
				EthTxIndex: ethTxIndex,
			}
			if result.Code != abci.CodeTypeOK {
				// exceeds block gas limit scenario, set gas used to gas limit because that's what's charged by ante handler.
				// some old versions don't emit any events, so workaround here directly.
				txResult.GasUsed = ethMsg.GetGas()
				txResult.Failed = true
			} else {
				parsedTx := txs.GetTxByMsgIndex(msgIndex)
				if parsedTx == nil {
					kv.logger.Error("msg index not found in events", "msgIndex", msgIndex)
					continue
				}
				if parsedTx.EthTxIndex >= 0 && parsedTx.EthTxIndex != ethTxIndex {
					kv.logger.Error("eth tx index don't match", "expect", ethTxIndex, "found", parsedTx.EthTxIndex)
				}
				txResult.GasUsed = parsedTx.GasUsed
				txResult.Failed = parsedTx.Failed
			}

			cumulativeGasUsed += txResult.GasUsed
			txResult.CumulativeGasUsed = cumulativeGasUsed
			ethTxIndex++

			if err := saveTxResult(kv.clientCtx.Codec, batch, txHash, &txResult); err != nil {
				return errorsmod.Wrapf(err, "IndexBlock %d", height)
			}
		}
	}
	if err := batch.Write(); err != nil {
		return errorsmod.Wrapf(err, "IndexBlock %d, write batch", block.Height)
	}
	return nil
}

// LastIndexedBlock returns the latest indexed block number, returns -1 if db is empty
func (kv *KVIndexer) LastIndexedBlock() (int64, error) {
	return LoadLastBlock(kv.db)
}

// FirstIndexedBlock returns the first indexed block number, returns -1 if db is empty
func (kv *KVIndexer) FirstIndexedBlock() (int64, error) {
	return LoadFirstBlock(kv.db)
}

// GetByTxHash finds eth tx by eth tx hash
func (kv *KVIndexer) GetByTxHash(hash common.Hash) (*ethermint.TxResult, error) {
	bz, err := kv.db.Get(TxHashKey(hash))
	if err != nil {
		return nil, errorsmod.Wrapf(err, "GetByTxHash %s", hash.Hex())
	}
	if len(bz) == 0 {
		return nil, fmt.Errorf("tx not found, hash: %s", hash.Hex())
	}
	var txKey ethermint.TxResult
	if err := kv.clientCtx.Codec.Unmarshal(bz, &txKey); err != nil {
		return nil, errorsmod.Wrapf(err, "GetByTxHash %s", hash.Hex())
	}
	return &txKey, nil
}

// GetByBlockAndIndex finds eth tx by block number and eth tx index
func (kv *KVIndexer) GetByBlockAndIndex(blockNumber int64, txIndex int32) (*ethermint.TxResult, error) {
	bz, err := kv.db.Get(TxIndexKey(blockNumber, txIndex))
	if err != nil {
		return nil, errorsmod.Wrapf(err, "GetByBlockAndIndex %d %d", blockNumber, txIndex)
	}
	if len(bz) == 0 {
		return nil, fmt.Errorf("tx not found, block: %d, eth-index: %d", blockNumber, txIndex)
	}
	return kv.GetByTxHash(common.BytesToHash(bz))
}

// TxHashKey returns the key for db entry: `tx hash -> tx result struct`
func TxHashKey(hash common.Hash) []byte {
	return append([]byte{KeyPrefixTxHash}, hash.Bytes()...)
}

// TxIndexKey returns the key for db entry: `(block number, tx index) -> tx hash`
func TxIndexKey(blockNumber int64, txIndex int32) []byte {
	bz1 := sdk.Uint64ToBigEndian(uint64(blockNumber))
	bz2 := sdk.Uint64ToBigEndian(uint64(txIndex))
	return append(append([]byte{KeyPrefixTxIndex}, bz1...), bz2...)
}

// LoadLastBlock returns the latest indexed block number, returns -1 if db is empty
func LoadLastBlock(db dbm.DB) (int64, error) {
	it, err := db.ReverseIterator([]byte{KeyPrefixTxIndex}, []byte{KeyPrefixTxIndex + 1})
	if err != nil {
		return 0, errorsmod.Wrap(err, "LoadLastBlock")
	}
	defer it.Close()
	if !it.Valid() {
		return -1, nil
	}
	return parseBlockNumberFromKey(it.Key())
}

// LoadFirstBlock loads the first indexed block, returns -1 if db is empty
func LoadFirstBlock(db dbm.DB) (int64, error) {
	it, err := db.Iterator([]byte{KeyPrefixTxIndex}, []byte{KeyPrefixTxIndex + 1})
	if err != nil {
		return 0, errorsmod.Wrap(err, "LoadFirstBlock")
	}
	defer it.Close()
	if !it.Valid() {
		return -1, nil
	}
	return parseBlockNumberFromKey(it.Key())
}

// isEthTx check if the tx is an eth tx
func isEthTx(tx sdk.Tx) bool {
	extTx, ok := tx.(authante.HasExtensionOptionsTx)
	if !ok {
		return false
	}
	opts := extTx.GetExtensionOptions()
	if len(opts) != 1 || opts[0].GetTypeUrl() != "/ethermint.evm.v1.ExtensionOptionsEthereumTx" {
		return false
	}
	return true
}

// saveTxResult index the txResult into the kv db batch
func saveTxResult(codec codec.Codec, batch dbm.Batch, txHash common.Hash, txResult *ethermint.TxResult) error {
	bz := codec.MustMarshal(txResult)
	if err := batch.Set(TxHashKey(txHash), bz); err != nil {
		return errorsmod.Wrap(err, "set tx-hash key")
	}
	if err := batch.Set(TxIndexKey(txResult.Height, txResult.EthTxIndex), txHash.Bytes()); err != nil {
		return errorsmod.Wrap(err, "set tx-index key")
	}
	return nil
}

func parseBlockNumberFromKey(key []byte) (int64, error) {
	if len(key) != TxIndexKeyLength {
		return 0, fmt.Errorf("wrong tx index key length, expect: %d, got: %d", TxIndexKeyLength, len(key))
	}

	return int64(sdk.BigEndianToUint64(key[1:9])), nil
}
