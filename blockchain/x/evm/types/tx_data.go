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
	"math/big"

	"github.com/ethereum/go-ethereum/common"
	ethtypes "github.com/ethereum/go-ethereum/core/types"
)

var (
	_ TxData = &LegacyTx{}
	_ TxData = &AccessListTx{}
	_ TxData = &DynamicFeeTx{}
)

// TxData implements the Ethereum transaction tx structure. It is used
// solely as intended in Ethereum abiding by the protocol.
type TxData interface {
	// TODO: embed ethtypes.TxData. See https://github.com/ethereum/go-ethereum/issues/23154

	TxType() byte
	Copy() TxData
	GetChainID() *big.Int
	GetAccessList() ethtypes.AccessList
	GetData() []byte
	GetNonce() uint64
	GetGas() uint64
	GetGasPrice() *big.Int
	GetGasTipCap() *big.Int
	GetGasFeeCap() *big.Int
	GetValue() *big.Int
	GetTo() *common.Address

	GetRawSignatureValues() (v, r, s *big.Int)
	SetSignatureValues(chainID, v, r, s *big.Int)

	AsEthereumData() ethtypes.TxData
	Validate() error

	// static fee
	Fee() *big.Int
	Cost() *big.Int

	// effective gasPrice/fee/cost according to current base fee
	EffectiveGasPrice(baseFee *big.Int) *big.Int
	EffectiveFee(baseFee *big.Int) *big.Int
	EffectiveCost(baseFee *big.Int) *big.Int
}

// NOTE: All non-protected transactions (i.e non EIP155 signed) will fail if the
// AllowUnprotectedTxs parameter is disabled.
func NewTxDataFromTx(tx *ethtypes.Transaction) (TxData, error) {
	var txData TxData
	var err error
	switch tx.Type() {
	case ethtypes.DynamicFeeTxType:
		txData, err = newDynamicFeeTx(tx)
	case ethtypes.AccessListTxType:
		txData, err = newAccessListTx(tx)
	default:
		txData, err = newLegacyTx(tx)
	}
	if err != nil {
		return nil, err
	}

	return txData, nil
}

// DeriveChainID derives the chain id from the given v parameter.
//
// CONTRACT: v value is either:
//
//   - {0,1} + CHAIN_ID * 2 + 35, if EIP155 is used
//   - {0,1} + 27, otherwise
//
// Ref: https://github.com/ethereum/EIPs/blob/master/EIPS/eip-155.md
func DeriveChainID(v *big.Int) *big.Int {
	if v == nil || v.Sign() < 1 {
		return nil
	}

	if v.BitLen() <= 64 {
		v := v.Uint64()
		if v == 27 || v == 28 {
			return new(big.Int)
		}

		if v < 35 {
			return nil
		}

		// V MUST be of the form {0,1} + CHAIN_ID * 2 + 35
		return new(big.Int).SetUint64((v - 35) / 2)
	}
	v = new(big.Int).Sub(v, big.NewInt(35))
	return v.Div(v, big.NewInt(2))
}

func rawSignatureValues(vBz, rBz, sBz []byte) (v, r, s *big.Int) {
	if len(vBz) > 0 {
		v = new(big.Int).SetBytes(vBz)
	}
	if len(rBz) > 0 {
		r = new(big.Int).SetBytes(rBz)
	}
	if len(sBz) > 0 {
		s = new(big.Int).SetBytes(sBz)
	}
	return v, r, s
}

func fee(gasPrice *big.Int, gas uint64) *big.Int {
	gasLimit := new(big.Int).SetUint64(gas)
	return new(big.Int).Mul(gasPrice, gasLimit)
}

func cost(fee, value *big.Int) *big.Int {
	if value != nil {
		return new(big.Int).Add(fee, value)
	}
	return fee
}
