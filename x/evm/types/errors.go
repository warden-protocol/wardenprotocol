package types

import (
	"errors"
	"fmt"

	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/ethereum/go-ethereum/common"

	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/common/hexutil"
	"github.com/ethereum/go-ethereum/core/vm"
)

const (
	codeErrInvalidState      = uint32(iota) + 2 // NOTE: code 1 is reserved for internal errors
	codeErrExecutionReverted                    // IMPORTANT: Do not move this error as it complies with the JSON-RPC error standard
	codeErrChainConfigNotFound
	codeErrInvalidChainConfig
	codeErrZeroAddress
	codeErrEmptyHash
	codeErrBloomNotFound
	codeErrTxReceiptNotFound
	codeErrCreateDisabled
	codeErrCallDisabled
	codeErrInvalidAmount
	codeErrInvalidGasPrice
	codeErrInvalidGasFee
	codeErrVMExecution
	codeErrInvalidRefund
	codeErrInconsistentGas
	codeErrInvalidGasCap
	codeErrInvalidBaseFee
	codeErrGasOverflow
	codeErrInvalidAccount
	codeErrInvalidGasLimit
)

var ErrPostTxProcessing = errors.New("failed to execute post processing")

var (
	// ErrInvalidState returns an error resulting from an invalid Storage State.
	ErrInvalidState = sdkerrors.Register(ModuleName, codeErrInvalidState, "invalid storage state")

	// ErrExecutionReverted returns an error resulting from an error in EVM execution.
	ErrExecutionReverted = sdkerrors.Register(ModuleName, codeErrExecutionReverted, vm.ErrExecutionReverted.Error())

	// ErrChainConfigNotFound returns an error if the chain config cannot be found on the store.
	ErrChainConfigNotFound = sdkerrors.Register(ModuleName, codeErrChainConfigNotFound, "chain configuration not found")

	// ErrInvalidChainConfig returns an error resulting from an invalid ChainConfig.
	ErrInvalidChainConfig = sdkerrors.Register(ModuleName, codeErrInvalidChainConfig, "invalid chain configuration")

	// ErrZeroAddress returns an error resulting from an zero (empty) ethereum Address.
	ErrZeroAddress = sdkerrors.Register(ModuleName, codeErrZeroAddress, "invalid zero address")

	// ErrEmptyHash returns an error resulting from an empty ethereum Hash.
	ErrEmptyHash = sdkerrors.Register(ModuleName, codeErrEmptyHash, "empty hash")

	// ErrBloomNotFound returns an error if the block bloom cannot be found on the store.
	ErrBloomNotFound = sdkerrors.Register(ModuleName, codeErrBloomNotFound, "block bloom not found")

	// ErrTxReceiptNotFound returns an error if the transaction receipt could not be found
	ErrTxReceiptNotFound = sdkerrors.Register(ModuleName, codeErrTxReceiptNotFound, "transaction receipt not found")

	// ErrCreateDisabled returns an error if the EnableCreate parameter is false.
	ErrCreateDisabled = sdkerrors.Register(ModuleName, codeErrCreateDisabled, "EVM Create operation is disabled")

	// ErrCallDisabled returns an error if the EnableCall parameter is false.
	ErrCallDisabled = sdkerrors.Register(ModuleName, codeErrCallDisabled, "EVM Call operation is disabled")

	// ErrInvalidAmount returns an error if a tx contains an invalid amount.
	ErrInvalidAmount = sdkerrors.Register(ModuleName, codeErrInvalidAmount, "invalid transaction amount")

	// ErrInvalidGasPrice returns an error if an invalid gas price is provided to the tx.
	ErrInvalidGasPrice = sdkerrors.Register(ModuleName, codeErrInvalidGasPrice, "invalid gas price")

	// ErrInvalidGasFee returns an error if the tx gas fee is out of bound.
	ErrInvalidGasFee = sdkerrors.Register(ModuleName, codeErrInvalidGasFee, "invalid gas fee")

	// ErrVMExecution returns an error resulting from an error in EVM execution.
	ErrVMExecution = sdkerrors.Register(ModuleName, codeErrVMExecution, "evm transaction execution failed")

	// ErrInvalidRefund returns an error if a the gas refund value is invalid.
	ErrInvalidRefund = sdkerrors.Register(ModuleName, codeErrInvalidRefund, "invalid gas refund amount")

	// ErrInconsistentGas returns an error if a the gas differs from the expected one.
	ErrInconsistentGas = sdkerrors.Register(ModuleName, codeErrInconsistentGas, "inconsistent gas")

	// ErrInvalidGasCap returns an error if a the gas cap value is negative or invalid
	ErrInvalidGasCap = sdkerrors.Register(ModuleName, codeErrInvalidGasCap, "invalid gas cap")

	// ErrInvalidBaseFee returns an error if a the base fee cap value is invalid
	ErrInvalidBaseFee = sdkerrors.Register(ModuleName, codeErrInvalidBaseFee, "invalid base fee")

	// ErrGasOverflow returns an error if gas computation overlow/underflow
	ErrGasOverflow = sdkerrors.Register(ModuleName, codeErrGasOverflow, "gas computation overflow/underflow")

	// ErrInvalidAccount returns an error if the account is not an EVM compatible account
	ErrInvalidAccount = sdkerrors.Register(ModuleName, codeErrInvalidAccount, "account type is not a valid ethereum account")

	// ErrInvalidGasLimit returns an error if gas limit value is invalid
	ErrInvalidGasLimit = sdkerrors.Register(ModuleName, codeErrInvalidGasLimit, "invalid gas limit")
)

// NewExecErrorWithReason unpacks the revert return bytes and returns a wrapped error
// with the return reason.
func NewExecErrorWithReason(revertReason []byte) *RevertError {
	result := common.CopyBytes(revertReason)
	reason, errUnpack := abi.UnpackRevert(result)
	err := errors.New("execution reverted")
	if errUnpack == nil {
		err = fmt.Errorf("execution reverted: %v", reason)
	}
	return &RevertError{
		error:  err,
		reason: hexutil.Encode(result),
	}
}

// RevertError is an API error that encompass an EVM revert with JSON error
// code and a binary data blob.
type RevertError struct {
	error
	reason string // revert reason hex encoded
}

// ErrorCode returns the JSON error code for a revert.
// See: https://github.com/ethereum/wiki/wiki/JSON-RPC-Error-Codes-Improvement-Proposal
func (e *RevertError) ErrorCode() int {
	return 3
}

// ErrorData returns the hex encoded revert reason.
func (e *RevertError) ErrorData() interface{} {
	return e.reason
}
