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
	"errors"
	"fmt"

	"github.com/ethereum/go-ethereum/common"
	ethtypes "github.com/ethereum/go-ethereum/core/types"

	ethermint "github.com/evmos/ethermint/types"
)

// NewTransactionLogs creates a new NewTransactionLogs instance.
func NewTransactionLogs(hash common.Hash, logs []*Log) TransactionLogs {
	return TransactionLogs{
		Hash: hash.String(),
		Logs: logs,
	}
}

// NewTransactionLogsFromEth creates a new NewTransactionLogs instance using []*ethtypes.Log.
func NewTransactionLogsFromEth(hash common.Hash, ethlogs []*ethtypes.Log) TransactionLogs {
	return TransactionLogs{
		Hash: hash.String(),
		Logs: NewLogsFromEth(ethlogs),
	}
}

// Validate performs a basic validation of a GenesisAccount fields.
func (tx TransactionLogs) Validate() error {
	if ethermint.IsEmptyHash(tx.Hash) {
		return fmt.Errorf("hash cannot be the empty %s", tx.Hash)
	}

	for i, log := range tx.Logs {
		if log == nil {
			return fmt.Errorf("log %d cannot be nil", i)
		}
		if err := log.Validate(); err != nil {
			return fmt.Errorf("invalid log %d: %w", i, err)
		}
		if log.TxHash != tx.Hash {
			return fmt.Errorf("log tx hash mismatch (%s ≠ %s)", log.TxHash, tx.Hash)
		}
	}
	return nil
}

// EthLogs returns the Ethereum type Logs from the Transaction Logs.
func (tx TransactionLogs) EthLogs() []*ethtypes.Log {
	return LogsToEthereum(tx.Logs)
}

// Validate performs a basic validation of an ethereum Log fields.
func (log *Log) Validate() error {
	if err := ethermint.ValidateAddress(log.Address); err != nil {
		return fmt.Errorf("invalid log address %w", err)
	}
	if ethermint.IsEmptyHash(log.BlockHash) {
		return fmt.Errorf("block hash cannot be the empty %s", log.BlockHash)
	}
	if log.BlockNumber == 0 {
		return errors.New("block number cannot be zero")
	}
	if ethermint.IsEmptyHash(log.TxHash) {
		return fmt.Errorf("tx hash cannot be the empty %s", log.TxHash)
	}
	return nil
}

// ToEthereum returns the Ethereum type Log from a Ethermint proto compatible Log.
func (log *Log) ToEthereum() *ethtypes.Log {
	topics := make([]common.Hash, len(log.Topics))
	for i, topic := range log.Topics {
		topics[i] = common.HexToHash(topic)
	}

	return &ethtypes.Log{
		Address:     common.HexToAddress(log.Address),
		Topics:      topics,
		Data:        log.Data,
		BlockNumber: log.BlockNumber,
		TxHash:      common.HexToHash(log.TxHash),
		TxIndex:     uint(log.TxIndex),
		Index:       uint(log.Index),
		BlockHash:   common.HexToHash(log.BlockHash),
		Removed:     log.Removed,
	}
}

func NewLogsFromEth(ethlogs []*ethtypes.Log) []*Log {
	var logs []*Log //nolint: prealloc
	for _, ethlog := range ethlogs {
		logs = append(logs, NewLogFromEth(ethlog))
	}

	return logs
}

// LogsToEthereum casts the Ethermint Logs to a slice of Ethereum Logs.
func LogsToEthereum(logs []*Log) []*ethtypes.Log {
	var ethLogs []*ethtypes.Log //nolint: prealloc
	for i := range logs {
		ethLogs = append(ethLogs, logs[i].ToEthereum())
	}
	return ethLogs
}

// NewLogFromEth creates a new Log instance from a Ethereum type Log.
func NewLogFromEth(log *ethtypes.Log) *Log {
	topics := make([]string, len(log.Topics))
	for i, topic := range log.Topics {
		topics[i] = topic.String()
	}

	return &Log{
		Address:     log.Address.String(),
		Topics:      topics,
		Data:        log.Data,
		BlockNumber: log.BlockNumber,
		TxHash:      log.TxHash.String(),
		TxIndex:     uint64(log.TxIndex),
		Index:       uint64(log.Index),
		BlockHash:   log.BlockHash.String(),
		Removed:     log.Removed,
	}
}
