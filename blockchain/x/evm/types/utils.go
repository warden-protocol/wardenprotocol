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
	"fmt"
	"math/big"

	"github.com/cosmos/gogoproto/proto"

	errorsmod "cosmossdk.io/errors"
	sdk "github.com/cosmos/cosmos-sdk/types"

	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/common/math"
	ethtypes "github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/crypto"
)

// DefaultPriorityReduction is the default amount of price values required for 1 unit of priority.
// Because priority is `int64` while price is `big.Int`, it's necessary to scale down the range to keep it more pratical.
// The default value is the same as the `sdk.DefaultPowerReduction`.
var DefaultPriorityReduction = sdk.DefaultPowerReduction

var EmptyCodeHash = crypto.Keccak256(nil)

// DecodeTxResponse decodes a protobuf-encoded byte slice into TxResponse
func DecodeTxResponse(in []byte) (*MsgEthereumTxResponse, error) {
	responses, err := DecodeTxResponses(in)
	if err != nil {
		return nil, err
	}
	if len(responses) == 0 {
		return &MsgEthereumTxResponse{}, nil
	}
	return responses[0], nil
}

// DecodeTxResponses decodes a protobuf-encoded byte slice into TxResponses
func DecodeTxResponses(in []byte) ([]*MsgEthereumTxResponse, error) {
	var txMsgData sdk.TxMsgData
	if err := proto.Unmarshal(in, &txMsgData); err != nil {
		return nil, err
	}

	responses := make([]*MsgEthereumTxResponse, len(txMsgData.MsgResponses))
	for i, res := range txMsgData.MsgResponses {
		var response MsgEthereumTxResponse
		if err := proto.Unmarshal(res.Value, &response); err != nil {
			return nil, errorsmod.Wrap(err, "failed to unmarshal tx response message data")
		}
		responses[i] = &response
	}
	return responses, nil
}

// DecodeTxLogsFromEvents decodes a protobuf-encoded byte slice into ethereum logs
func DecodeTxLogsFromEvents(in []byte) ([]*ethtypes.Log, error) {
	txResponses, err := DecodeTxResponses(in)
	if err != nil {
		return nil, err
	}
	var txLogs []*Log
	for _, response := range txResponses {
		txLogs = append(txLogs, response.Logs...)
	}
	return LogsToEthereum(txLogs), nil
}

// EncodeTransactionLogs encodes TransactionLogs slice into a protobuf-encoded byte slice.
func EncodeTransactionLogs(res *TransactionLogs) ([]byte, error) {
	return proto.Marshal(res)
}

// DecodeTransactionLogs decodes an protobuf-encoded byte slice into TransactionLogs
func DecodeTransactionLogs(data []byte) (TransactionLogs, error) {
	var logs TransactionLogs
	err := proto.Unmarshal(data, &logs)
	if err != nil {
		return TransactionLogs{}, err
	}
	return logs, nil
}

// UnwrapEthereumMsg extract MsgEthereumTx from wrapping sdk.Tx
func UnwrapEthereumMsg(tx *sdk.Tx, ethHash common.Hash) (*MsgEthereumTx, error) {
	if tx == nil {
		return nil, fmt.Errorf("invalid tx: nil")
	}

	for _, msg := range (*tx).GetMsgs() {
		ethMsg, ok := msg.(*MsgEthereumTx)
		if !ok {
			return nil, fmt.Errorf("invalid tx type: %T", tx)
		}
		txHash := ethMsg.AsTransaction().Hash()
		ethMsg.Hash = txHash.Hex()
		if txHash == ethHash {
			return ethMsg, nil
		}
	}

	return nil, fmt.Errorf("eth tx not found: %s", ethHash)
}

// BinSearch execute the binary search and hone in on an executable gas limit
func BinSearch(lo, hi uint64, executable func(uint64) (bool, *MsgEthereumTxResponse, error)) (uint64, error) {
	for lo+1 < hi {
		mid := (hi + lo) / 2
		failed, _, err := executable(mid)
		// If the error is not nil(consensus error), it means the provided message
		// call or transaction will never be accepted no matter how much gas it is
		// assigned. Return the error directly, don't struggle any more.
		if err != nil {
			return 0, err
		}
		if failed {
			lo = mid
		} else {
			hi = mid
		}
	}
	return hi, nil
}

// EffectiveGasPrice compute the effective gas price based on eip-1159 rules
// `effectiveGasPrice = min(baseFee + tipCap, feeCap)`
func EffectiveGasPrice(baseFee *big.Int, feeCap *big.Int, tipCap *big.Int) *big.Int {
	return math.BigMin(new(big.Int).Add(tipCap, baseFee), feeCap)
}
