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

// ICallbackMetaData contains all meta data concerning the ICallback contract.
var ICallbackMetaData = &bind.MetaData{
	ABI: "[{\"inputs\":[{\"internalType\":\"uint64\",\"name\":\"id\",\"type\":\"uint64\"},{\"internalType\":\"bytes\",\"name\":\"output\",\"type\":\"bytes\"}],\"name\":\"cb\",\"outputs\":[{\"internalType\":\"bytes\",\"name\":\"\",\"type\":\"bytes\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"}]",
}

// ICallbackABI is the input ABI used to generate the binding from.
// Deprecated: Use ICallbackMetaData.ABI instead.
var ICallbackABI = ICallbackMetaData.ABI

// ICallback is an auto generated Go binding around an Ethereum contract.
type ICallback struct {
	ICallbackCaller     // Read-only binding to the contract
	ICallbackTransactor // Write-only binding to the contract
	ICallbackFilterer   // Log filterer for contract events
}

// ICallbackCaller is an auto generated read-only Go binding around an Ethereum contract.
type ICallbackCaller struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// ICallbackTransactor is an auto generated write-only Go binding around an Ethereum contract.
type ICallbackTransactor struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// ICallbackFilterer is an auto generated log filtering Go binding around an Ethereum contract events.
type ICallbackFilterer struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// ICallbackSession is an auto generated Go binding around an Ethereum contract,
// with pre-set call and transact options.
type ICallbackSession struct {
	Contract     *ICallback        // Generic contract binding to set the session for
	CallOpts     bind.CallOpts     // Call options to use throughout this session
	TransactOpts bind.TransactOpts // Transaction auth options to use throughout this session
}

// ICallbackCallerSession is an auto generated read-only Go binding around an Ethereum contract,
// with pre-set call options.
type ICallbackCallerSession struct {
	Contract *ICallbackCaller // Generic contract caller binding to set the session for
	CallOpts bind.CallOpts    // Call options to use throughout this session
}

// ICallbackTransactorSession is an auto generated write-only Go binding around an Ethereum contract,
// with pre-set transact options.
type ICallbackTransactorSession struct {
	Contract     *ICallbackTransactor // Generic contract transactor binding to set the session for
	TransactOpts bind.TransactOpts    // Transaction auth options to use throughout this session
}

// ICallbackRaw is an auto generated low-level Go binding around an Ethereum contract.
type ICallbackRaw struct {
	Contract *ICallback // Generic contract binding to access the raw methods on
}

// ICallbackCallerRaw is an auto generated low-level read-only Go binding around an Ethereum contract.
type ICallbackCallerRaw struct {
	Contract *ICallbackCaller // Generic read-only contract binding to access the raw methods on
}

// ICallbackTransactorRaw is an auto generated low-level write-only Go binding around an Ethereum contract.
type ICallbackTransactorRaw struct {
	Contract *ICallbackTransactor // Generic write-only contract binding to access the raw methods on
}

// NewICallback creates a new instance of ICallback, bound to a specific deployed contract.
func NewICallback(address common.Address, backend bind.ContractBackend) (*ICallback, error) {
	contract, err := bindICallback(address, backend, backend, backend)
	if err != nil {
		return nil, err
	}
	return &ICallback{ICallbackCaller: ICallbackCaller{contract: contract}, ICallbackTransactor: ICallbackTransactor{contract: contract}, ICallbackFilterer: ICallbackFilterer{contract: contract}}, nil
}

// NewICallbackCaller creates a new read-only instance of ICallback, bound to a specific deployed contract.
func NewICallbackCaller(address common.Address, caller bind.ContractCaller) (*ICallbackCaller, error) {
	contract, err := bindICallback(address, caller, nil, nil)
	if err != nil {
		return nil, err
	}
	return &ICallbackCaller{contract: contract}, nil
}

// NewICallbackTransactor creates a new write-only instance of ICallback, bound to a specific deployed contract.
func NewICallbackTransactor(address common.Address, transactor bind.ContractTransactor) (*ICallbackTransactor, error) {
	contract, err := bindICallback(address, nil, transactor, nil)
	if err != nil {
		return nil, err
	}
	return &ICallbackTransactor{contract: contract}, nil
}

// NewICallbackFilterer creates a new log filterer instance of ICallback, bound to a specific deployed contract.
func NewICallbackFilterer(address common.Address, filterer bind.ContractFilterer) (*ICallbackFilterer, error) {
	contract, err := bindICallback(address, nil, nil, filterer)
	if err != nil {
		return nil, err
	}
	return &ICallbackFilterer{contract: contract}, nil
}

// bindICallback binds a generic wrapper to an already deployed contract.
func bindICallback(address common.Address, caller bind.ContractCaller, transactor bind.ContractTransactor, filterer bind.ContractFilterer) (*bind.BoundContract, error) {
	parsed, err := ICallbackMetaData.GetAbi()
	if err != nil {
		return nil, err
	}
	return bind.NewBoundContract(address, *parsed, caller, transactor, filterer), nil
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_ICallback *ICallbackRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _ICallback.Contract.ICallbackCaller.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_ICallback *ICallbackRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _ICallback.Contract.ICallbackTransactor.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_ICallback *ICallbackRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _ICallback.Contract.ICallbackTransactor.contract.Transact(opts, method, params...)
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_ICallback *ICallbackCallerRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _ICallback.Contract.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_ICallback *ICallbackTransactorRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _ICallback.Contract.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_ICallback *ICallbackTransactorRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _ICallback.Contract.contract.Transact(opts, method, params...)
}

// Cb is a paid mutator transaction binding the contract method 0x9b90a190.
//
// Solidity: function cb(uint64 id, bytes output) returns(bytes)
func (_ICallback *ICallbackTransactor) Cb(opts *bind.TransactOpts, id uint64, output []byte) (*types.Transaction, error) {
	return _ICallback.contract.Transact(opts, "cb", id, output)
}

// Cb is a paid mutator transaction binding the contract method 0x9b90a190.
//
// Solidity: function cb(uint64 id, bytes output) returns(bytes)
func (_ICallback *ICallbackSession) Cb(id uint64, output []byte) (*types.Transaction, error) {
	return _ICallback.Contract.Cb(&_ICallback.TransactOpts, id, output)
}

// Cb is a paid mutator transaction binding the contract method 0x9b90a190.
//
// Solidity: function cb(uint64 id, bytes output) returns(bytes)
func (_ICallback *ICallbackTransactorSession) Cb(id uint64, output []byte) (*types.Transaction, error) {
	return _ICallback.Contract.Cb(&_ICallback.TransactOpts, id, output)
}
