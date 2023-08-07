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

	errorsmod "cosmossdk.io/errors"
	sdkmath "cosmossdk.io/math"
	errortypes "github.com/cosmos/cosmos-sdk/types/errors"

	"github.com/ethereum/go-ethereum/common"
	ethtypes "github.com/ethereum/go-ethereum/core/types"

	"github.com/evmos/ethermint/types"
)

func newAccessListTx(tx *ethtypes.Transaction) (*AccessListTx, error) {
	txData := &AccessListTx{
		Nonce:    tx.Nonce(),
		Data:     tx.Data(),
		GasLimit: tx.Gas(),
	}

	v, r, s := tx.RawSignatureValues()
	if to := tx.To(); to != nil {
		txData.To = to.Hex()
	}

	if tx.Value() != nil {
		amountInt, err := types.SafeNewIntFromBigInt(tx.Value())
		if err != nil {
			return nil, err
		}
		txData.Amount = &amountInt
	}

	if tx.GasPrice() != nil {
		gasPriceInt, err := types.SafeNewIntFromBigInt(tx.GasPrice())
		if err != nil {
			return nil, err
		}
		txData.GasPrice = &gasPriceInt
	}

	if tx.AccessList() != nil {
		al := tx.AccessList()
		txData.Accesses = NewAccessList(&al)
	}

	txData.SetSignatureValues(tx.ChainId(), v, r, s)
	return txData, nil
}

// TxType returns the tx type
func (tx *AccessListTx) TxType() uint8 {
	return ethtypes.AccessListTxType
}

// Copy returns an instance with the same field values
func (tx *AccessListTx) Copy() TxData {
	return &AccessListTx{
		ChainID:  tx.ChainID,
		Nonce:    tx.Nonce,
		GasPrice: tx.GasPrice,
		GasLimit: tx.GasLimit,
		To:       tx.To,
		Amount:   tx.Amount,
		Data:     common.CopyBytes(tx.Data),
		Accesses: tx.Accesses,
		V:        common.CopyBytes(tx.V),
		R:        common.CopyBytes(tx.R),
		S:        common.CopyBytes(tx.S),
	}
}

// GetChainID returns the chain id field from the AccessListTx
func (tx *AccessListTx) GetChainID() *big.Int {
	if tx.ChainID == nil {
		return nil
	}

	return tx.ChainID.BigInt()
}

// GetAccessList returns the AccessList field.
func (tx *AccessListTx) GetAccessList() ethtypes.AccessList {
	if tx.Accesses == nil {
		return nil
	}
	return *tx.Accesses.ToEthAccessList()
}

// GetData returns the a copy of the input data bytes.
func (tx *AccessListTx) GetData() []byte {
	return common.CopyBytes(tx.Data)
}

// GetGas returns the gas limit.
func (tx *AccessListTx) GetGas() uint64 {
	return tx.GasLimit
}

// GetGasPrice returns the gas price field.
func (tx *AccessListTx) GetGasPrice() *big.Int {
	if tx.GasPrice == nil {
		return nil
	}
	return tx.GasPrice.BigInt()
}

// GetGasTipCap returns the gas price field.
func (tx *AccessListTx) GetGasTipCap() *big.Int {
	return tx.GetGasPrice()
}

// GetGasFeeCap returns the gas price field.
func (tx *AccessListTx) GetGasFeeCap() *big.Int {
	return tx.GetGasPrice()
}

// GetValue returns the tx amount.
func (tx *AccessListTx) GetValue() *big.Int {
	if tx.Amount == nil {
		return nil
	}

	return tx.Amount.BigInt()
}

// GetNonce returns the account sequence for the transaction.
func (tx *AccessListTx) GetNonce() uint64 { return tx.Nonce }

// GetTo returns the pointer to the recipient address.
func (tx *AccessListTx) GetTo() *common.Address {
	if tx.To == "" {
		return nil
	}
	to := common.HexToAddress(tx.To)
	return &to
}

// AsEthereumData returns an AccessListTx transaction tx from the proto-formatted
// TxData defined on the Cosmos EVM.
func (tx *AccessListTx) AsEthereumData() ethtypes.TxData {
	v, r, s := tx.GetRawSignatureValues()
	return &ethtypes.AccessListTx{
		ChainID:    tx.GetChainID(),
		Nonce:      tx.GetNonce(),
		GasPrice:   tx.GetGasPrice(),
		Gas:        tx.GetGas(),
		To:         tx.GetTo(),
		Value:      tx.GetValue(),
		Data:       tx.GetData(),
		AccessList: tx.GetAccessList(),
		V:          v,
		R:          r,
		S:          s,
	}
}

// GetRawSignatureValues returns the V, R, S signature values of the transaction.
// The return values should not be modified by the caller.
func (tx *AccessListTx) GetRawSignatureValues() (v, r, s *big.Int) {
	return rawSignatureValues(tx.V, tx.R, tx.S)
}

// SetSignatureValues sets the signature values to the transaction.
func (tx *AccessListTx) SetSignatureValues(chainID, v, r, s *big.Int) {
	if v != nil {
		tx.V = v.Bytes()
	}
	if r != nil {
		tx.R = r.Bytes()
	}
	if s != nil {
		tx.S = s.Bytes()
	}
	if chainID != nil {
		chainIDInt := sdkmath.NewIntFromBigInt(chainID)
		tx.ChainID = &chainIDInt
	}
}

// Validate performs a stateless validation of the tx fields.
func (tx AccessListTx) Validate() error {
	gasPrice := tx.GetGasPrice()
	if gasPrice == nil {
		return errorsmod.Wrap(ErrInvalidGasPrice, "cannot be nil")
	}
	if !types.IsValidInt256(gasPrice) {
		return errorsmod.Wrap(ErrInvalidGasPrice, "out of bound")
	}

	if gasPrice.Sign() == -1 {
		return errorsmod.Wrapf(ErrInvalidGasPrice, "gas price cannot be negative %s", gasPrice)
	}

	amount := tx.GetValue()
	// Amount can be 0
	if amount != nil && amount.Sign() == -1 {
		return errorsmod.Wrapf(ErrInvalidAmount, "amount cannot be negative %s", amount)
	}
	if !types.IsValidInt256(amount) {
		return errorsmod.Wrap(ErrInvalidAmount, "out of bound")
	}

	if !types.IsValidInt256(tx.Fee()) {
		return errorsmod.Wrap(ErrInvalidGasFee, "out of bound")
	}

	if tx.To != "" {
		if err := types.ValidateAddress(tx.To); err != nil {
			return errorsmod.Wrap(err, "invalid to address")
		}
	}

	if tx.GetChainID() == nil {
		return errorsmod.Wrap(
			errortypes.ErrInvalidChainID,
			"chain ID must be present on AccessList txs",
		)
	}

	return nil
}

// Fee returns gasprice * gaslimit.
func (tx AccessListTx) Fee() *big.Int {
	return fee(tx.GetGasPrice(), tx.GetGas())
}

// Cost returns amount + gasprice * gaslimit.
func (tx AccessListTx) Cost() *big.Int {
	return cost(tx.Fee(), tx.GetValue())
}

// EffectiveGasPrice is the same as GasPrice for AccessListTx
func (tx AccessListTx) EffectiveGasPrice(_ *big.Int) *big.Int {
	return tx.GetGasPrice()
}

// EffectiveFee is the same as Fee for AccessListTx
func (tx AccessListTx) EffectiveFee(_ *big.Int) *big.Int {
	return tx.Fee()
}

// EffectiveCost is the same as Cost for AccessListTx
func (tx AccessListTx) EffectiveCost(_ *big.Int) *big.Int {
	return tx.Cost()
}
