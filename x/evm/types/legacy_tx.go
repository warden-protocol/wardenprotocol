package types

import (
	"math/big"

	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/ethereum/go-ethereum/common"
	ethtypes "github.com/ethereum/go-ethereum/core/types"
	"github.com/evmos/ethermint/types"
)

func newLegacyTx(tx *ethtypes.Transaction) (*LegacyTx, error) {
	txData := &LegacyTx{
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

	txData.SetSignatureValues(tx.ChainId(), v, r, s)
	return txData, nil
}

// TxType returns the tx type
func (tx *LegacyTx) TxType() uint8 {
	return ethtypes.LegacyTxType
}

// Copy returns an instance with the same field values
func (tx *LegacyTx) Copy() TxData {
	return &LegacyTx{
		Nonce:    tx.Nonce,
		GasPrice: tx.GasPrice,
		GasLimit: tx.GasLimit,
		To:       tx.To,
		Amount:   tx.Amount,
		Data:     common.CopyBytes(tx.Data),
		V:        common.CopyBytes(tx.V),
		R:        common.CopyBytes(tx.R),
		S:        common.CopyBytes(tx.S),
	}
}

// GetChainID returns the chain id field from the derived signature values
func (tx *LegacyTx) GetChainID() *big.Int {
	v, _, _ := tx.GetRawSignatureValues()
	return DeriveChainID(v)
}

// GetAccessList returns nil
func (tx *LegacyTx) GetAccessList() ethtypes.AccessList {
	return nil
}

// GetData returns the a copy of the input data bytes.
func (tx *LegacyTx) GetData() []byte {
	return common.CopyBytes(tx.Data)
}

// GetGas returns the gas limit.
func (tx *LegacyTx) GetGas() uint64 {
	return tx.GasLimit
}

// GetGasPrice returns the gas price field.
func (tx *LegacyTx) GetGasPrice() *big.Int {
	if tx.GasPrice == nil {
		return nil
	}
	return tx.GasPrice.BigInt()
}

// GetGasTipCap returns the gas price field.
func (tx *LegacyTx) GetGasTipCap() *big.Int {
	return tx.GetGasPrice()
}

// GetGasFeeCap returns the gas price field.
func (tx *LegacyTx) GetGasFeeCap() *big.Int {
	return tx.GetGasPrice()
}

// GetValue returns the tx amount.
func (tx *LegacyTx) GetValue() *big.Int {
	if tx.Amount == nil {
		return nil
	}
	return tx.Amount.BigInt()
}

// GetNonce returns the account sequence for the transaction.
func (tx *LegacyTx) GetNonce() uint64 { return tx.Nonce }

// GetTo returns the pointer to the recipient address.
func (tx *LegacyTx) GetTo() *common.Address {
	if tx.To == "" {
		return nil
	}
	to := common.HexToAddress(tx.To)
	return &to
}

// AsEthereumData returns an AccessListTx transaction tx from the proto-formatted
// TxData defined on the Cosmos EVM.
func (tx *LegacyTx) AsEthereumData() ethtypes.TxData {
	v, r, s := tx.GetRawSignatureValues()
	return &ethtypes.LegacyTx{
		Nonce:    tx.GetNonce(),
		GasPrice: tx.GetGasPrice(),
		Gas:      tx.GetGas(),
		To:       tx.GetTo(),
		Value:    tx.GetValue(),
		Data:     tx.GetData(),
		V:        v,
		R:        r,
		S:        s,
	}
}

// GetRawSignatureValues returns the V, R, S signature values of the transaction.
// The return values should not be modified by the caller.
func (tx *LegacyTx) GetRawSignatureValues() (v, r, s *big.Int) {
	return rawSignatureValues(tx.V, tx.R, tx.S)
}

// SetSignatureValues sets the signature values to the transaction.
func (tx *LegacyTx) SetSignatureValues(_, v, r, s *big.Int) {
	if v != nil {
		tx.V = v.Bytes()
	}
	if r != nil {
		tx.R = r.Bytes()
	}
	if s != nil {
		tx.S = s.Bytes()
	}
}

// Validate performs a stateless validation of the tx fields.
func (tx LegacyTx) Validate() error {
	gasPrice := tx.GetGasPrice()
	if gasPrice == nil {
		return sdkerrors.Wrap(ErrInvalidGasPrice, "gas price cannot be nil")
	}

	if gasPrice.Sign() == -1 {
		return sdkerrors.Wrapf(ErrInvalidGasPrice, "gas price cannot be negative %s", gasPrice)
	}
	if !types.IsValidInt256(gasPrice) {
		return sdkerrors.Wrap(ErrInvalidGasPrice, "out of bound")
	}
	if !types.IsValidInt256(tx.Fee()) {
		return sdkerrors.Wrap(ErrInvalidGasFee, "out of bound")
	}

	amount := tx.GetValue()
	// Amount can be 0
	if amount != nil && amount.Sign() == -1 {
		return sdkerrors.Wrapf(ErrInvalidAmount, "amount cannot be negative %s", amount)
	}
	if !types.IsValidInt256(amount) {
		return sdkerrors.Wrap(ErrInvalidAmount, "out of bound")
	}

	if tx.To != "" {
		if err := types.ValidateAddress(tx.To); err != nil {
			return sdkerrors.Wrap(err, "invalid to address")
		}
	}

	return nil
}

// Fee returns gasprice * gaslimit.
func (tx LegacyTx) Fee() *big.Int {
	return fee(tx.GetGasPrice(), tx.GetGas())
}

// Cost returns amount + gasprice * gaslimit.
func (tx LegacyTx) Cost() *big.Int {
	return cost(tx.Fee(), tx.GetValue())
}

// EffectiveFee is the same as Fee for LegacyTx
func (tx LegacyTx) EffectiveFee(baseFee *big.Int) *big.Int {
	return tx.Fee()
}

// EffectiveCost is the same as Cost for LegacyTx
func (tx LegacyTx) EffectiveCost(baseFee *big.Int) *big.Int {
	return tx.Cost()
}
