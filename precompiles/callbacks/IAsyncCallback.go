// Code generated - DO NOT EDIT.
// This file is a generated binding and any manual changes will be lost.

package callbacks

import (
	"errors"
	"math/big"
	"strings"

	ethereum "github.com/ethereum/go-ethereum"
	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/event"
)

// Reference imports to suppress errors if they are not otherwise used.
var (
	_ = errors.New
	_ = big.NewInt
	_ = strings.NewReader
	_ = ethereum.NotFound
	_ = bind.Bind
	_ = common.Big1
	_ = types.BloomLookup
	_ = event.NewSubscription
	_ = abi.ConvertType
)

// IAsyncCallbackMetaData contains all meta data concerning the IAsyncCallback contract.
var IAsyncCallbackMetaData = &bind.MetaData{
	ABI: "[{\"inputs\":[{\"internalType\":\"uint64\",\"name\":\"id\",\"type\":\"uint64\"},{\"internalType\":\"bytes\",\"name\":\"output\",\"type\":\"bytes\"}],\"name\":\"cb\",\"outputs\":[{\"internalType\":\"bytes\",\"name\":\"\",\"type\":\"bytes\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"}]",
}

// IAsyncCallbackABI is the input ABI used to generate the binding from.
// Deprecated: Use IAsyncCallbackMetaData.ABI instead.
var IAsyncCallbackABI = IAsyncCallbackMetaData.ABI

// IAsyncCallback is an auto generated Go binding around an Ethereum contract.
type IAsyncCallback struct {
	IAsyncCallbackCaller     // Read-only binding to the contract
	IAsyncCallbackTransactor // Write-only binding to the contract
	IAsyncCallbackFilterer   // Log filterer for contract events
}

// IAsyncCallbackCaller is an auto generated read-only Go binding around an Ethereum contract.
type IAsyncCallbackCaller struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// IAsyncCallbackTransactor is an auto generated write-only Go binding around an Ethereum contract.
type IAsyncCallbackTransactor struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// IAsyncCallbackFilterer is an auto generated log filtering Go binding around an Ethereum contract events.
type IAsyncCallbackFilterer struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// IAsyncCallbackSession is an auto generated Go binding around an Ethereum contract,
// with pre-set call and transact options.
type IAsyncCallbackSession struct {
	Contract     *IAsyncCallback   // Generic contract binding to set the session for
	CallOpts     bind.CallOpts     // Call options to use throughout this session
	TransactOpts bind.TransactOpts // Transaction auth options to use throughout this session
}

// IAsyncCallbackCallerSession is an auto generated read-only Go binding around an Ethereum contract,
// with pre-set call options.
type IAsyncCallbackCallerSession struct {
	Contract *IAsyncCallbackCaller // Generic contract caller binding to set the session for
	CallOpts bind.CallOpts         // Call options to use throughout this session
}

// IAsyncCallbackTransactorSession is an auto generated write-only Go binding around an Ethereum contract,
// with pre-set transact options.
type IAsyncCallbackTransactorSession struct {
	Contract     *IAsyncCallbackTransactor // Generic contract transactor binding to set the session for
	TransactOpts bind.TransactOpts         // Transaction auth options to use throughout this session
}

// IAsyncCallbackRaw is an auto generated low-level Go binding around an Ethereum contract.
type IAsyncCallbackRaw struct {
	Contract *IAsyncCallback // Generic contract binding to access the raw methods on
}

// IAsyncCallbackCallerRaw is an auto generated low-level read-only Go binding around an Ethereum contract.
type IAsyncCallbackCallerRaw struct {
	Contract *IAsyncCallbackCaller // Generic read-only contract binding to access the raw methods on
}

// IAsyncCallbackTransactorRaw is an auto generated low-level write-only Go binding around an Ethereum contract.
type IAsyncCallbackTransactorRaw struct {
	Contract *IAsyncCallbackTransactor // Generic write-only contract binding to access the raw methods on
}

// NewIAsyncCallback creates a new instance of IAsyncCallback, bound to a specific deployed contract.
func NewIAsyncCallback(address common.Address, backend bind.ContractBackend) (*IAsyncCallback, error) {
	contract, err := bindIAsyncCallback(address, backend, backend, backend)
	if err != nil {
		return nil, err
	}
	return &IAsyncCallback{IAsyncCallbackCaller: IAsyncCallbackCaller{contract: contract}, IAsyncCallbackTransactor: IAsyncCallbackTransactor{contract: contract}, IAsyncCallbackFilterer: IAsyncCallbackFilterer{contract: contract}}, nil
}

// NewIAsyncCallbackCaller creates a new read-only instance of IAsyncCallback, bound to a specific deployed contract.
func NewIAsyncCallbackCaller(address common.Address, caller bind.ContractCaller) (*IAsyncCallbackCaller, error) {
	contract, err := bindIAsyncCallback(address, caller, nil, nil)
	if err != nil {
		return nil, err
	}
	return &IAsyncCallbackCaller{contract: contract}, nil
}

// NewIAsyncCallbackTransactor creates a new write-only instance of IAsyncCallback, bound to a specific deployed contract.
func NewIAsyncCallbackTransactor(address common.Address, transactor bind.ContractTransactor) (*IAsyncCallbackTransactor, error) {
	contract, err := bindIAsyncCallback(address, nil, transactor, nil)
	if err != nil {
		return nil, err
	}
	return &IAsyncCallbackTransactor{contract: contract}, nil
}

// NewIAsyncCallbackFilterer creates a new log filterer instance of IAsyncCallback, bound to a specific deployed contract.
func NewIAsyncCallbackFilterer(address common.Address, filterer bind.ContractFilterer) (*IAsyncCallbackFilterer, error) {
	contract, err := bindIAsyncCallback(address, nil, nil, filterer)
	if err != nil {
		return nil, err
	}
	return &IAsyncCallbackFilterer{contract: contract}, nil
}

// bindIAsyncCallback binds a generic wrapper to an already deployed contract.
func bindIAsyncCallback(address common.Address, caller bind.ContractCaller, transactor bind.ContractTransactor, filterer bind.ContractFilterer) (*bind.BoundContract, error) {
	parsed, err := IAsyncCallbackMetaData.GetAbi()
	if err != nil {
		return nil, err
	}
	return bind.NewBoundContract(address, *parsed, caller, transactor, filterer), nil
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_IAsyncCallback *IAsyncCallbackRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _IAsyncCallback.Contract.IAsyncCallbackCaller.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_IAsyncCallback *IAsyncCallbackRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _IAsyncCallback.Contract.IAsyncCallbackTransactor.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_IAsyncCallback *IAsyncCallbackRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _IAsyncCallback.Contract.IAsyncCallbackTransactor.contract.Transact(opts, method, params...)
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_IAsyncCallback *IAsyncCallbackCallerRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _IAsyncCallback.Contract.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_IAsyncCallback *IAsyncCallbackTransactorRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _IAsyncCallback.Contract.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_IAsyncCallback *IAsyncCallbackTransactorRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _IAsyncCallback.Contract.contract.Transact(opts, method, params...)
}

// Cb is a paid mutator transaction binding the contract method 0x9b90a190.
//
// Solidity: function cb(uint64 id, bytes output) returns(bytes)
func (_IAsyncCallback *IAsyncCallbackTransactor) Cb(opts *bind.TransactOpts, id uint64, output []byte) (*types.Transaction, error) {
	return _IAsyncCallback.contract.Transact(opts, "cb", id, output)
}

// Cb is a paid mutator transaction binding the contract method 0x9b90a190.
//
// Solidity: function cb(uint64 id, bytes output) returns(bytes)
func (_IAsyncCallback *IAsyncCallbackSession) Cb(id uint64, output []byte) (*types.Transaction, error) {
	return _IAsyncCallback.Contract.Cb(&_IAsyncCallback.TransactOpts, id, output)
}

// Cb is a paid mutator transaction binding the contract method 0x9b90a190.
//
// Solidity: function cb(uint64 id, bytes output) returns(bytes)
func (_IAsyncCallback *IAsyncCallbackTransactorSession) Cb(id uint64, output []byte) (*types.Transaction, error) {
	return _IAsyncCallback.Contract.Cb(&_IAsyncCallback.TransactOpts, id, output)
}
