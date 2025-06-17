// Code generated - DO NOT EDIT.
// This file is a generated binding and any manual changes will be lost.

package abigen

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

// MessageDispatcherMetaData contains all meta data concerning the MessageDispatcher contract.
var MessageDispatcherMetaData = &bind.MetaData{
	ABI: "[{\"type\":\"constructor\",\"inputs\":[{\"name\":\"_mailbox\",\"type\":\"address\",\"internalType\":\"address\"}],\"stateMutability\":\"nonpayable\"},{\"type\":\"function\",\"name\":\"PACKAGE_VERSION\",\"inputs\":[],\"outputs\":[{\"name\":\"\",\"type\":\"string\",\"internalType\":\"string\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"authorized\",\"inputs\":[],\"outputs\":[{\"name\":\"\",\"type\":\"address\",\"internalType\":\"address\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"dispatchMessage\",\"inputs\":[{\"name\":\"toChainId\",\"type\":\"uint256\",\"internalType\":\"uint256\"},{\"name\":\"to\",\"type\":\"address\",\"internalType\":\"address\"},{\"name\":\"data\",\"type\":\"bytes\",\"internalType\":\"bytes\"}],\"outputs\":[{\"name\":\"id\",\"type\":\"bytes32\",\"internalType\":\"bytes32\"}],\"stateMutability\":\"nonpayable\"},{\"type\":\"function\",\"name\":\"hook\",\"inputs\":[],\"outputs\":[{\"name\":\"\",\"type\":\"address\",\"internalType\":\"contractIPostDispatchHook\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"interchainSecurityModule\",\"inputs\":[],\"outputs\":[{\"name\":\"\",\"type\":\"address\",\"internalType\":\"contractIInterchainSecurityModule\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"isAuthorized\",\"inputs\":[{\"name\":\"_authorized\",\"type\":\"address\",\"internalType\":\"address\"}],\"outputs\":[{\"name\":\"\",\"type\":\"bool\",\"internalType\":\"bool\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"localDomain\",\"inputs\":[],\"outputs\":[{\"name\":\"\",\"type\":\"uint32\",\"internalType\":\"uint32\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"mailbox\",\"inputs\":[],\"outputs\":[{\"name\":\"\",\"type\":\"address\",\"internalType\":\"contractIMailbox\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"owner\",\"inputs\":[],\"outputs\":[{\"name\":\"\",\"type\":\"address\",\"internalType\":\"address\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"renounceOwnership\",\"inputs\":[],\"outputs\":[],\"stateMutability\":\"nonpayable\"},{\"type\":\"function\",\"name\":\"setHook\",\"inputs\":[{\"name\":\"_hook\",\"type\":\"address\",\"internalType\":\"address\"}],\"outputs\":[],\"stateMutability\":\"nonpayable\"},{\"type\":\"function\",\"name\":\"setInterchainSecurityModule\",\"inputs\":[{\"name\":\"_module\",\"type\":\"address\",\"internalType\":\"address\"}],\"outputs\":[],\"stateMutability\":\"nonpayable\"},{\"type\":\"function\",\"name\":\"transferOwnership\",\"inputs\":[{\"name\":\"newOwner\",\"type\":\"address\",\"internalType\":\"address\"}],\"outputs\":[],\"stateMutability\":\"nonpayable\"},{\"type\":\"event\",\"name\":\"HookSet\",\"inputs\":[{\"name\":\"_hook\",\"type\":\"address\",\"indexed\":false,\"internalType\":\"address\"}],\"anonymous\":false},{\"type\":\"event\",\"name\":\"Initialized\",\"inputs\":[{\"name\":\"version\",\"type\":\"uint8\",\"indexed\":false,\"internalType\":\"uint8\"}],\"anonymous\":false},{\"type\":\"event\",\"name\":\"IsmSet\",\"inputs\":[{\"name\":\"_ism\",\"type\":\"address\",\"indexed\":false,\"internalType\":\"address\"}],\"anonymous\":false},{\"type\":\"event\",\"name\":\"MessageDispatched\",\"inputs\":[{\"name\":\"messageId\",\"type\":\"bytes32\",\"indexed\":true,\"internalType\":\"bytes32\"},{\"name\":\"from\",\"type\":\"address\",\"indexed\":true,\"internalType\":\"address\"},{\"name\":\"toChainId\",\"type\":\"uint256\",\"indexed\":true,\"internalType\":\"uint256\"},{\"name\":\"to\",\"type\":\"address\",\"indexed\":false,\"internalType\":\"address\"},{\"name\":\"data\",\"type\":\"bytes\",\"indexed\":false,\"internalType\":\"bytes\"}],\"anonymous\":false},{\"type\":\"event\",\"name\":\"OwnershipTransferred\",\"inputs\":[{\"name\":\"previousOwner\",\"type\":\"address\",\"indexed\":true,\"internalType\":\"address\"},{\"name\":\"newOwner\",\"type\":\"address\",\"indexed\":true,\"internalType\":\"address\"}],\"anonymous\":false}]",
}

// MessageDispatcherABI is the input ABI used to generate the binding from.
// Deprecated: Use MessageDispatcherMetaData.ABI instead.
var MessageDispatcherABI = MessageDispatcherMetaData.ABI

// MessageDispatcher is an auto generated Go binding around an Ethereum contract.
type MessageDispatcher struct {
	MessageDispatcherCaller     // Read-only binding to the contract
	MessageDispatcherTransactor // Write-only binding to the contract
	MessageDispatcherFilterer   // Log filterer for contract events
}

// MessageDispatcherCaller is an auto generated read-only Go binding around an Ethereum contract.
type MessageDispatcherCaller struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// MessageDispatcherTransactor is an auto generated write-only Go binding around an Ethereum contract.
type MessageDispatcherTransactor struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// MessageDispatcherFilterer is an auto generated log filtering Go binding around an Ethereum contract events.
type MessageDispatcherFilterer struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// MessageDispatcherSession is an auto generated Go binding around an Ethereum contract,
// with pre-set call and transact options.
type MessageDispatcherSession struct {
	Contract     *MessageDispatcher // Generic contract binding to set the session for
	CallOpts     bind.CallOpts      // Call options to use throughout this session
	TransactOpts bind.TransactOpts  // Transaction auth options to use throughout this session
}

// MessageDispatcherCallerSession is an auto generated read-only Go binding around an Ethereum contract,
// with pre-set call options.
type MessageDispatcherCallerSession struct {
	Contract *MessageDispatcherCaller // Generic contract caller binding to set the session for
	CallOpts bind.CallOpts            // Call options to use throughout this session
}

// MessageDispatcherTransactorSession is an auto generated write-only Go binding around an Ethereum contract,
// with pre-set transact options.
type MessageDispatcherTransactorSession struct {
	Contract     *MessageDispatcherTransactor // Generic contract transactor binding to set the session for
	TransactOpts bind.TransactOpts            // Transaction auth options to use throughout this session
}

// MessageDispatcherRaw is an auto generated low-level Go binding around an Ethereum contract.
type MessageDispatcherRaw struct {
	Contract *MessageDispatcher // Generic contract binding to access the raw methods on
}

// MessageDispatcherCallerRaw is an auto generated low-level read-only Go binding around an Ethereum contract.
type MessageDispatcherCallerRaw struct {
	Contract *MessageDispatcherCaller // Generic read-only contract binding to access the raw methods on
}

// MessageDispatcherTransactorRaw is an auto generated low-level write-only Go binding around an Ethereum contract.
type MessageDispatcherTransactorRaw struct {
	Contract *MessageDispatcherTransactor // Generic write-only contract binding to access the raw methods on
}

// NewMessageDispatcher creates a new instance of MessageDispatcher, bound to a specific deployed contract.
func NewMessageDispatcher(address common.Address, backend bind.ContractBackend) (*MessageDispatcher, error) {
	contract, err := bindMessageDispatcher(address, backend, backend, backend)
	if err != nil {
		return nil, err
	}
	return &MessageDispatcher{MessageDispatcherCaller: MessageDispatcherCaller{contract: contract}, MessageDispatcherTransactor: MessageDispatcherTransactor{contract: contract}, MessageDispatcherFilterer: MessageDispatcherFilterer{contract: contract}}, nil
}

// NewMessageDispatcherCaller creates a new read-only instance of MessageDispatcher, bound to a specific deployed contract.
func NewMessageDispatcherCaller(address common.Address, caller bind.ContractCaller) (*MessageDispatcherCaller, error) {
	contract, err := bindMessageDispatcher(address, caller, nil, nil)
	if err != nil {
		return nil, err
	}
	return &MessageDispatcherCaller{contract: contract}, nil
}

// NewMessageDispatcherTransactor creates a new write-only instance of MessageDispatcher, bound to a specific deployed contract.
func NewMessageDispatcherTransactor(address common.Address, transactor bind.ContractTransactor) (*MessageDispatcherTransactor, error) {
	contract, err := bindMessageDispatcher(address, nil, transactor, nil)
	if err != nil {
		return nil, err
	}
	return &MessageDispatcherTransactor{contract: contract}, nil
}

// NewMessageDispatcherFilterer creates a new log filterer instance of MessageDispatcher, bound to a specific deployed contract.
func NewMessageDispatcherFilterer(address common.Address, filterer bind.ContractFilterer) (*MessageDispatcherFilterer, error) {
	contract, err := bindMessageDispatcher(address, nil, nil, filterer)
	if err != nil {
		return nil, err
	}
	return &MessageDispatcherFilterer{contract: contract}, nil
}

// bindMessageDispatcher binds a generic wrapper to an already deployed contract.
func bindMessageDispatcher(address common.Address, caller bind.ContractCaller, transactor bind.ContractTransactor, filterer bind.ContractFilterer) (*bind.BoundContract, error) {
	parsed, err := MessageDispatcherMetaData.GetAbi()
	if err != nil {
		return nil, err
	}
	return bind.NewBoundContract(address, *parsed, caller, transactor, filterer), nil
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_MessageDispatcher *MessageDispatcherRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _MessageDispatcher.Contract.MessageDispatcherCaller.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_MessageDispatcher *MessageDispatcherRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _MessageDispatcher.Contract.MessageDispatcherTransactor.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_MessageDispatcher *MessageDispatcherRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _MessageDispatcher.Contract.MessageDispatcherTransactor.contract.Transact(opts, method, params...)
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_MessageDispatcher *MessageDispatcherCallerRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _MessageDispatcher.Contract.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_MessageDispatcher *MessageDispatcherTransactorRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _MessageDispatcher.Contract.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_MessageDispatcher *MessageDispatcherTransactorRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _MessageDispatcher.Contract.contract.Transact(opts, method, params...)
}

// PACKAGEVERSION is a free data retrieval call binding the contract method 0x93c44847.
//
// Solidity: function PACKAGE_VERSION() view returns(string)
func (_MessageDispatcher *MessageDispatcherCaller) PACKAGEVERSION(opts *bind.CallOpts) (string, error) {
	var out []interface{}
	err := _MessageDispatcher.contract.Call(opts, &out, "PACKAGE_VERSION")

	if err != nil {
		return *new(string), err
	}

	out0 := *abi.ConvertType(out[0], new(string)).(*string)

	return out0, err

}

// PACKAGEVERSION is a free data retrieval call binding the contract method 0x93c44847.
//
// Solidity: function PACKAGE_VERSION() view returns(string)
func (_MessageDispatcher *MessageDispatcherSession) PACKAGEVERSION() (string, error) {
	return _MessageDispatcher.Contract.PACKAGEVERSION(&_MessageDispatcher.CallOpts)
}

// PACKAGEVERSION is a free data retrieval call binding the contract method 0x93c44847.
//
// Solidity: function PACKAGE_VERSION() view returns(string)
func (_MessageDispatcher *MessageDispatcherCallerSession) PACKAGEVERSION() (string, error) {
	return _MessageDispatcher.Contract.PACKAGEVERSION(&_MessageDispatcher.CallOpts)
}

// Authorized is a free data retrieval call binding the contract method 0x456cb7c6.
//
// Solidity: function authorized() view returns(address)
func (_MessageDispatcher *MessageDispatcherCaller) Authorized(opts *bind.CallOpts) (common.Address, error) {
	var out []interface{}
	err := _MessageDispatcher.contract.Call(opts, &out, "authorized")

	if err != nil {
		return *new(common.Address), err
	}

	out0 := *abi.ConvertType(out[0], new(common.Address)).(*common.Address)

	return out0, err

}

// Authorized is a free data retrieval call binding the contract method 0x456cb7c6.
//
// Solidity: function authorized() view returns(address)
func (_MessageDispatcher *MessageDispatcherSession) Authorized() (common.Address, error) {
	return _MessageDispatcher.Contract.Authorized(&_MessageDispatcher.CallOpts)
}

// Authorized is a free data retrieval call binding the contract method 0x456cb7c6.
//
// Solidity: function authorized() view returns(address)
func (_MessageDispatcher *MessageDispatcherCallerSession) Authorized() (common.Address, error) {
	return _MessageDispatcher.Contract.Authorized(&_MessageDispatcher.CallOpts)
}

// Hook is a free data retrieval call binding the contract method 0x7f5a7c7b.
//
// Solidity: function hook() view returns(address)
func (_MessageDispatcher *MessageDispatcherCaller) Hook(opts *bind.CallOpts) (common.Address, error) {
	var out []interface{}
	err := _MessageDispatcher.contract.Call(opts, &out, "hook")

	if err != nil {
		return *new(common.Address), err
	}

	out0 := *abi.ConvertType(out[0], new(common.Address)).(*common.Address)

	return out0, err

}

// Hook is a free data retrieval call binding the contract method 0x7f5a7c7b.
//
// Solidity: function hook() view returns(address)
func (_MessageDispatcher *MessageDispatcherSession) Hook() (common.Address, error) {
	return _MessageDispatcher.Contract.Hook(&_MessageDispatcher.CallOpts)
}

// Hook is a free data retrieval call binding the contract method 0x7f5a7c7b.
//
// Solidity: function hook() view returns(address)
func (_MessageDispatcher *MessageDispatcherCallerSession) Hook() (common.Address, error) {
	return _MessageDispatcher.Contract.Hook(&_MessageDispatcher.CallOpts)
}

// InterchainSecurityModule is a free data retrieval call binding the contract method 0xde523cf3.
//
// Solidity: function interchainSecurityModule() view returns(address)
func (_MessageDispatcher *MessageDispatcherCaller) InterchainSecurityModule(opts *bind.CallOpts) (common.Address, error) {
	var out []interface{}
	err := _MessageDispatcher.contract.Call(opts, &out, "interchainSecurityModule")

	if err != nil {
		return *new(common.Address), err
	}

	out0 := *abi.ConvertType(out[0], new(common.Address)).(*common.Address)

	return out0, err

}

// InterchainSecurityModule is a free data retrieval call binding the contract method 0xde523cf3.
//
// Solidity: function interchainSecurityModule() view returns(address)
func (_MessageDispatcher *MessageDispatcherSession) InterchainSecurityModule() (common.Address, error) {
	return _MessageDispatcher.Contract.InterchainSecurityModule(&_MessageDispatcher.CallOpts)
}

// InterchainSecurityModule is a free data retrieval call binding the contract method 0xde523cf3.
//
// Solidity: function interchainSecurityModule() view returns(address)
func (_MessageDispatcher *MessageDispatcherCallerSession) InterchainSecurityModule() (common.Address, error) {
	return _MessageDispatcher.Contract.InterchainSecurityModule(&_MessageDispatcher.CallOpts)
}

// IsAuthorized is a free data retrieval call binding the contract method 0xfe9fbb80.
//
// Solidity: function isAuthorized(address _authorized) view returns(bool)
func (_MessageDispatcher *MessageDispatcherCaller) IsAuthorized(opts *bind.CallOpts, _authorized common.Address) (bool, error) {
	var out []interface{}
	err := _MessageDispatcher.contract.Call(opts, &out, "isAuthorized", _authorized)

	if err != nil {
		return *new(bool), err
	}

	out0 := *abi.ConvertType(out[0], new(bool)).(*bool)

	return out0, err

}

// IsAuthorized is a free data retrieval call binding the contract method 0xfe9fbb80.
//
// Solidity: function isAuthorized(address _authorized) view returns(bool)
func (_MessageDispatcher *MessageDispatcherSession) IsAuthorized(_authorized common.Address) (bool, error) {
	return _MessageDispatcher.Contract.IsAuthorized(&_MessageDispatcher.CallOpts, _authorized)
}

// IsAuthorized is a free data retrieval call binding the contract method 0xfe9fbb80.
//
// Solidity: function isAuthorized(address _authorized) view returns(bool)
func (_MessageDispatcher *MessageDispatcherCallerSession) IsAuthorized(_authorized common.Address) (bool, error) {
	return _MessageDispatcher.Contract.IsAuthorized(&_MessageDispatcher.CallOpts, _authorized)
}

// LocalDomain is a free data retrieval call binding the contract method 0x8d3638f4.
//
// Solidity: function localDomain() view returns(uint32)
func (_MessageDispatcher *MessageDispatcherCaller) LocalDomain(opts *bind.CallOpts) (uint32, error) {
	var out []interface{}
	err := _MessageDispatcher.contract.Call(opts, &out, "localDomain")

	if err != nil {
		return *new(uint32), err
	}

	out0 := *abi.ConvertType(out[0], new(uint32)).(*uint32)

	return out0, err

}

// LocalDomain is a free data retrieval call binding the contract method 0x8d3638f4.
//
// Solidity: function localDomain() view returns(uint32)
func (_MessageDispatcher *MessageDispatcherSession) LocalDomain() (uint32, error) {
	return _MessageDispatcher.Contract.LocalDomain(&_MessageDispatcher.CallOpts)
}

// LocalDomain is a free data retrieval call binding the contract method 0x8d3638f4.
//
// Solidity: function localDomain() view returns(uint32)
func (_MessageDispatcher *MessageDispatcherCallerSession) LocalDomain() (uint32, error) {
	return _MessageDispatcher.Contract.LocalDomain(&_MessageDispatcher.CallOpts)
}

// Mailbox is a free data retrieval call binding the contract method 0xd5438eae.
//
// Solidity: function mailbox() view returns(address)
func (_MessageDispatcher *MessageDispatcherCaller) Mailbox(opts *bind.CallOpts) (common.Address, error) {
	var out []interface{}
	err := _MessageDispatcher.contract.Call(opts, &out, "mailbox")

	if err != nil {
		return *new(common.Address), err
	}

	out0 := *abi.ConvertType(out[0], new(common.Address)).(*common.Address)

	return out0, err

}

// Mailbox is a free data retrieval call binding the contract method 0xd5438eae.
//
// Solidity: function mailbox() view returns(address)
func (_MessageDispatcher *MessageDispatcherSession) Mailbox() (common.Address, error) {
	return _MessageDispatcher.Contract.Mailbox(&_MessageDispatcher.CallOpts)
}

// Mailbox is a free data retrieval call binding the contract method 0xd5438eae.
//
// Solidity: function mailbox() view returns(address)
func (_MessageDispatcher *MessageDispatcherCallerSession) Mailbox() (common.Address, error) {
	return _MessageDispatcher.Contract.Mailbox(&_MessageDispatcher.CallOpts)
}

// Owner is a free data retrieval call binding the contract method 0x8da5cb5b.
//
// Solidity: function owner() view returns(address)
func (_MessageDispatcher *MessageDispatcherCaller) Owner(opts *bind.CallOpts) (common.Address, error) {
	var out []interface{}
	err := _MessageDispatcher.contract.Call(opts, &out, "owner")

	if err != nil {
		return *new(common.Address), err
	}

	out0 := *abi.ConvertType(out[0], new(common.Address)).(*common.Address)

	return out0, err

}

// Owner is a free data retrieval call binding the contract method 0x8da5cb5b.
//
// Solidity: function owner() view returns(address)
func (_MessageDispatcher *MessageDispatcherSession) Owner() (common.Address, error) {
	return _MessageDispatcher.Contract.Owner(&_MessageDispatcher.CallOpts)
}

// Owner is a free data retrieval call binding the contract method 0x8da5cb5b.
//
// Solidity: function owner() view returns(address)
func (_MessageDispatcher *MessageDispatcherCallerSession) Owner() (common.Address, error) {
	return _MessageDispatcher.Contract.Owner(&_MessageDispatcher.CallOpts)
}

// DispatchMessage is a paid mutator transaction binding the contract method 0xfe39827b.
//
// Solidity: function dispatchMessage(uint256 toChainId, address to, bytes data) returns(bytes32 id)
func (_MessageDispatcher *MessageDispatcherTransactor) DispatchMessage(opts *bind.TransactOpts, toChainId *big.Int, to common.Address, data []byte) (*types.Transaction, error) {
	return _MessageDispatcher.contract.Transact(opts, "dispatchMessage", toChainId, to, data)
}

// DispatchMessage is a paid mutator transaction binding the contract method 0xfe39827b.
//
// Solidity: function dispatchMessage(uint256 toChainId, address to, bytes data) returns(bytes32 id)
func (_MessageDispatcher *MessageDispatcherSession) DispatchMessage(toChainId *big.Int, to common.Address, data []byte) (*types.Transaction, error) {
	return _MessageDispatcher.Contract.DispatchMessage(&_MessageDispatcher.TransactOpts, toChainId, to, data)
}

// DispatchMessage is a paid mutator transaction binding the contract method 0xfe39827b.
//
// Solidity: function dispatchMessage(uint256 toChainId, address to, bytes data) returns(bytes32 id)
func (_MessageDispatcher *MessageDispatcherTransactorSession) DispatchMessage(toChainId *big.Int, to common.Address, data []byte) (*types.Transaction, error) {
	return _MessageDispatcher.Contract.DispatchMessage(&_MessageDispatcher.TransactOpts, toChainId, to, data)
}

// RenounceOwnership is a paid mutator transaction binding the contract method 0x715018a6.
//
// Solidity: function renounceOwnership() returns()
func (_MessageDispatcher *MessageDispatcherTransactor) RenounceOwnership(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _MessageDispatcher.contract.Transact(opts, "renounceOwnership")
}

// RenounceOwnership is a paid mutator transaction binding the contract method 0x715018a6.
//
// Solidity: function renounceOwnership() returns()
func (_MessageDispatcher *MessageDispatcherSession) RenounceOwnership() (*types.Transaction, error) {
	return _MessageDispatcher.Contract.RenounceOwnership(&_MessageDispatcher.TransactOpts)
}

// RenounceOwnership is a paid mutator transaction binding the contract method 0x715018a6.
//
// Solidity: function renounceOwnership() returns()
func (_MessageDispatcher *MessageDispatcherTransactorSession) RenounceOwnership() (*types.Transaction, error) {
	return _MessageDispatcher.Contract.RenounceOwnership(&_MessageDispatcher.TransactOpts)
}

// SetHook is a paid mutator transaction binding the contract method 0x3dfd3873.
//
// Solidity: function setHook(address _hook) returns()
func (_MessageDispatcher *MessageDispatcherTransactor) SetHook(opts *bind.TransactOpts, _hook common.Address) (*types.Transaction, error) {
	return _MessageDispatcher.contract.Transact(opts, "setHook", _hook)
}

// SetHook is a paid mutator transaction binding the contract method 0x3dfd3873.
//
// Solidity: function setHook(address _hook) returns()
func (_MessageDispatcher *MessageDispatcherSession) SetHook(_hook common.Address) (*types.Transaction, error) {
	return _MessageDispatcher.Contract.SetHook(&_MessageDispatcher.TransactOpts, _hook)
}

// SetHook is a paid mutator transaction binding the contract method 0x3dfd3873.
//
// Solidity: function setHook(address _hook) returns()
func (_MessageDispatcher *MessageDispatcherTransactorSession) SetHook(_hook common.Address) (*types.Transaction, error) {
	return _MessageDispatcher.Contract.SetHook(&_MessageDispatcher.TransactOpts, _hook)
}

// SetInterchainSecurityModule is a paid mutator transaction binding the contract method 0x0e72cc06.
//
// Solidity: function setInterchainSecurityModule(address _module) returns()
func (_MessageDispatcher *MessageDispatcherTransactor) SetInterchainSecurityModule(opts *bind.TransactOpts, _module common.Address) (*types.Transaction, error) {
	return _MessageDispatcher.contract.Transact(opts, "setInterchainSecurityModule", _module)
}

// SetInterchainSecurityModule is a paid mutator transaction binding the contract method 0x0e72cc06.
//
// Solidity: function setInterchainSecurityModule(address _module) returns()
func (_MessageDispatcher *MessageDispatcherSession) SetInterchainSecurityModule(_module common.Address) (*types.Transaction, error) {
	return _MessageDispatcher.Contract.SetInterchainSecurityModule(&_MessageDispatcher.TransactOpts, _module)
}

// SetInterchainSecurityModule is a paid mutator transaction binding the contract method 0x0e72cc06.
//
// Solidity: function setInterchainSecurityModule(address _module) returns()
func (_MessageDispatcher *MessageDispatcherTransactorSession) SetInterchainSecurityModule(_module common.Address) (*types.Transaction, error) {
	return _MessageDispatcher.Contract.SetInterchainSecurityModule(&_MessageDispatcher.TransactOpts, _module)
}

// TransferOwnership is a paid mutator transaction binding the contract method 0xf2fde38b.
//
// Solidity: function transferOwnership(address newOwner) returns()
func (_MessageDispatcher *MessageDispatcherTransactor) TransferOwnership(opts *bind.TransactOpts, newOwner common.Address) (*types.Transaction, error) {
	return _MessageDispatcher.contract.Transact(opts, "transferOwnership", newOwner)
}

// TransferOwnership is a paid mutator transaction binding the contract method 0xf2fde38b.
//
// Solidity: function transferOwnership(address newOwner) returns()
func (_MessageDispatcher *MessageDispatcherSession) TransferOwnership(newOwner common.Address) (*types.Transaction, error) {
	return _MessageDispatcher.Contract.TransferOwnership(&_MessageDispatcher.TransactOpts, newOwner)
}

// TransferOwnership is a paid mutator transaction binding the contract method 0xf2fde38b.
//
// Solidity: function transferOwnership(address newOwner) returns()
func (_MessageDispatcher *MessageDispatcherTransactorSession) TransferOwnership(newOwner common.Address) (*types.Transaction, error) {
	return _MessageDispatcher.Contract.TransferOwnership(&_MessageDispatcher.TransactOpts, newOwner)
}

// MessageDispatcherHookSetIterator is returned from FilterHookSet and is used to iterate over the raw logs and unpacked data for HookSet events raised by the MessageDispatcher contract.
type MessageDispatcherHookSetIterator struct {
	Event *MessageDispatcherHookSet // Event containing the contract specifics and raw log

	contract *bind.BoundContract // Generic contract to use for unpacking event data
	event    string              // Event name to use for unpacking event data

	logs chan types.Log        // Log channel receiving the found contract events
	sub  ethereum.Subscription // Subscription for errors, completion and termination
	done bool                  // Whether the subscription completed delivering logs
	fail error                 // Occurred error to stop iteration
}

// Next advances the iterator to the subsequent event, returning whether there
// are any more events found. In case of a retrieval or parsing error, false is
// returned and Error() can be queried for the exact failure.
func (it *MessageDispatcherHookSetIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(MessageDispatcherHookSet)
			if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
				it.fail = err
				return false
			}
			it.Event.Raw = log
			return true

		default:
			return false
		}
	}
	// Iterator still in progress, wait for either a data or an error event
	select {
	case log := <-it.logs:
		it.Event = new(MessageDispatcherHookSet)
		if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
			it.fail = err
			return false
		}
		it.Event.Raw = log
		return true

	case err := <-it.sub.Err():
		it.done = true
		it.fail = err
		return it.Next()
	}
}

// Error returns any retrieval or parsing error occurred during filtering.
func (it *MessageDispatcherHookSetIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *MessageDispatcherHookSetIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// MessageDispatcherHookSet represents a HookSet event raised by the MessageDispatcher contract.
type MessageDispatcherHookSet struct {
	Hook common.Address
	Raw  types.Log // Blockchain specific contextual infos
}

// FilterHookSet is a free log retrieval operation binding the contract event 0x4eab7b127c764308788622363ad3e9532de3dfba7845bd4f84c125a22544255a.
//
// Solidity: event HookSet(address _hook)
func (_MessageDispatcher *MessageDispatcherFilterer) FilterHookSet(opts *bind.FilterOpts) (*MessageDispatcherHookSetIterator, error) {

	logs, sub, err := _MessageDispatcher.contract.FilterLogs(opts, "HookSet")
	if err != nil {
		return nil, err
	}
	return &MessageDispatcherHookSetIterator{contract: _MessageDispatcher.contract, event: "HookSet", logs: logs, sub: sub}, nil
}

// WatchHookSet is a free log subscription operation binding the contract event 0x4eab7b127c764308788622363ad3e9532de3dfba7845bd4f84c125a22544255a.
//
// Solidity: event HookSet(address _hook)
func (_MessageDispatcher *MessageDispatcherFilterer) WatchHookSet(opts *bind.WatchOpts, sink chan<- *MessageDispatcherHookSet) (event.Subscription, error) {

	logs, sub, err := _MessageDispatcher.contract.WatchLogs(opts, "HookSet")
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(MessageDispatcherHookSet)
				if err := _MessageDispatcher.contract.UnpackLog(event, "HookSet", log); err != nil {
					return err
				}
				event.Raw = log

				select {
				case sink <- event:
				case err := <-sub.Err():
					return err
				case <-quit:
					return nil
				}
			case err := <-sub.Err():
				return err
			case <-quit:
				return nil
			}
		}
	}), nil
}

// ParseHookSet is a log parse operation binding the contract event 0x4eab7b127c764308788622363ad3e9532de3dfba7845bd4f84c125a22544255a.
//
// Solidity: event HookSet(address _hook)
func (_MessageDispatcher *MessageDispatcherFilterer) ParseHookSet(log types.Log) (*MessageDispatcherHookSet, error) {
	event := new(MessageDispatcherHookSet)
	if err := _MessageDispatcher.contract.UnpackLog(event, "HookSet", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// MessageDispatcherInitializedIterator is returned from FilterInitialized and is used to iterate over the raw logs and unpacked data for Initialized events raised by the MessageDispatcher contract.
type MessageDispatcherInitializedIterator struct {
	Event *MessageDispatcherInitialized // Event containing the contract specifics and raw log

	contract *bind.BoundContract // Generic contract to use for unpacking event data
	event    string              // Event name to use for unpacking event data

	logs chan types.Log        // Log channel receiving the found contract events
	sub  ethereum.Subscription // Subscription for errors, completion and termination
	done bool                  // Whether the subscription completed delivering logs
	fail error                 // Occurred error to stop iteration
}

// Next advances the iterator to the subsequent event, returning whether there
// are any more events found. In case of a retrieval or parsing error, false is
// returned and Error() can be queried for the exact failure.
func (it *MessageDispatcherInitializedIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(MessageDispatcherInitialized)
			if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
				it.fail = err
				return false
			}
			it.Event.Raw = log
			return true

		default:
			return false
		}
	}
	// Iterator still in progress, wait for either a data or an error event
	select {
	case log := <-it.logs:
		it.Event = new(MessageDispatcherInitialized)
		if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
			it.fail = err
			return false
		}
		it.Event.Raw = log
		return true

	case err := <-it.sub.Err():
		it.done = true
		it.fail = err
		return it.Next()
	}
}

// Error returns any retrieval or parsing error occurred during filtering.
func (it *MessageDispatcherInitializedIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *MessageDispatcherInitializedIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// MessageDispatcherInitialized represents a Initialized event raised by the MessageDispatcher contract.
type MessageDispatcherInitialized struct {
	Version uint8
	Raw     types.Log // Blockchain specific contextual infos
}

// FilterInitialized is a free log retrieval operation binding the contract event 0x7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb3847402498.
//
// Solidity: event Initialized(uint8 version)
func (_MessageDispatcher *MessageDispatcherFilterer) FilterInitialized(opts *bind.FilterOpts) (*MessageDispatcherInitializedIterator, error) {

	logs, sub, err := _MessageDispatcher.contract.FilterLogs(opts, "Initialized")
	if err != nil {
		return nil, err
	}
	return &MessageDispatcherInitializedIterator{contract: _MessageDispatcher.contract, event: "Initialized", logs: logs, sub: sub}, nil
}

// WatchInitialized is a free log subscription operation binding the contract event 0x7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb3847402498.
//
// Solidity: event Initialized(uint8 version)
func (_MessageDispatcher *MessageDispatcherFilterer) WatchInitialized(opts *bind.WatchOpts, sink chan<- *MessageDispatcherInitialized) (event.Subscription, error) {

	logs, sub, err := _MessageDispatcher.contract.WatchLogs(opts, "Initialized")
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(MessageDispatcherInitialized)
				if err := _MessageDispatcher.contract.UnpackLog(event, "Initialized", log); err != nil {
					return err
				}
				event.Raw = log

				select {
				case sink <- event:
				case err := <-sub.Err():
					return err
				case <-quit:
					return nil
				}
			case err := <-sub.Err():
				return err
			case <-quit:
				return nil
			}
		}
	}), nil
}

// ParseInitialized is a log parse operation binding the contract event 0x7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb3847402498.
//
// Solidity: event Initialized(uint8 version)
func (_MessageDispatcher *MessageDispatcherFilterer) ParseInitialized(log types.Log) (*MessageDispatcherInitialized, error) {
	event := new(MessageDispatcherInitialized)
	if err := _MessageDispatcher.contract.UnpackLog(event, "Initialized", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// MessageDispatcherIsmSetIterator is returned from FilterIsmSet and is used to iterate over the raw logs and unpacked data for IsmSet events raised by the MessageDispatcher contract.
type MessageDispatcherIsmSetIterator struct {
	Event *MessageDispatcherIsmSet // Event containing the contract specifics and raw log

	contract *bind.BoundContract // Generic contract to use for unpacking event data
	event    string              // Event name to use for unpacking event data

	logs chan types.Log        // Log channel receiving the found contract events
	sub  ethereum.Subscription // Subscription for errors, completion and termination
	done bool                  // Whether the subscription completed delivering logs
	fail error                 // Occurred error to stop iteration
}

// Next advances the iterator to the subsequent event, returning whether there
// are any more events found. In case of a retrieval or parsing error, false is
// returned and Error() can be queried for the exact failure.
func (it *MessageDispatcherIsmSetIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(MessageDispatcherIsmSet)
			if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
				it.fail = err
				return false
			}
			it.Event.Raw = log
			return true

		default:
			return false
		}
	}
	// Iterator still in progress, wait for either a data or an error event
	select {
	case log := <-it.logs:
		it.Event = new(MessageDispatcherIsmSet)
		if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
			it.fail = err
			return false
		}
		it.Event.Raw = log
		return true

	case err := <-it.sub.Err():
		it.done = true
		it.fail = err
		return it.Next()
	}
}

// Error returns any retrieval or parsing error occurred during filtering.
func (it *MessageDispatcherIsmSetIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *MessageDispatcherIsmSetIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// MessageDispatcherIsmSet represents a IsmSet event raised by the MessageDispatcher contract.
type MessageDispatcherIsmSet struct {
	Ism common.Address
	Raw types.Log // Blockchain specific contextual infos
}

// FilterIsmSet is a free log retrieval operation binding the contract event 0xc47cbcc588c67679e52261c45cc315e56562f8d0ccaba16facb9093ff9498799.
//
// Solidity: event IsmSet(address _ism)
func (_MessageDispatcher *MessageDispatcherFilterer) FilterIsmSet(opts *bind.FilterOpts) (*MessageDispatcherIsmSetIterator, error) {

	logs, sub, err := _MessageDispatcher.contract.FilterLogs(opts, "IsmSet")
	if err != nil {
		return nil, err
	}
	return &MessageDispatcherIsmSetIterator{contract: _MessageDispatcher.contract, event: "IsmSet", logs: logs, sub: sub}, nil
}

// WatchIsmSet is a free log subscription operation binding the contract event 0xc47cbcc588c67679e52261c45cc315e56562f8d0ccaba16facb9093ff9498799.
//
// Solidity: event IsmSet(address _ism)
func (_MessageDispatcher *MessageDispatcherFilterer) WatchIsmSet(opts *bind.WatchOpts, sink chan<- *MessageDispatcherIsmSet) (event.Subscription, error) {

	logs, sub, err := _MessageDispatcher.contract.WatchLogs(opts, "IsmSet")
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(MessageDispatcherIsmSet)
				if err := _MessageDispatcher.contract.UnpackLog(event, "IsmSet", log); err != nil {
					return err
				}
				event.Raw = log

				select {
				case sink <- event:
				case err := <-sub.Err():
					return err
				case <-quit:
					return nil
				}
			case err := <-sub.Err():
				return err
			case <-quit:
				return nil
			}
		}
	}), nil
}

// ParseIsmSet is a log parse operation binding the contract event 0xc47cbcc588c67679e52261c45cc315e56562f8d0ccaba16facb9093ff9498799.
//
// Solidity: event IsmSet(address _ism)
func (_MessageDispatcher *MessageDispatcherFilterer) ParseIsmSet(log types.Log) (*MessageDispatcherIsmSet, error) {
	event := new(MessageDispatcherIsmSet)
	if err := _MessageDispatcher.contract.UnpackLog(event, "IsmSet", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// MessageDispatcherMessageDispatchedIterator is returned from FilterMessageDispatched and is used to iterate over the raw logs and unpacked data for MessageDispatched events raised by the MessageDispatcher contract.
type MessageDispatcherMessageDispatchedIterator struct {
	Event *MessageDispatcherMessageDispatched // Event containing the contract specifics and raw log

	contract *bind.BoundContract // Generic contract to use for unpacking event data
	event    string              // Event name to use for unpacking event data

	logs chan types.Log        // Log channel receiving the found contract events
	sub  ethereum.Subscription // Subscription for errors, completion and termination
	done bool                  // Whether the subscription completed delivering logs
	fail error                 // Occurred error to stop iteration
}

// Next advances the iterator to the subsequent event, returning whether there
// are any more events found. In case of a retrieval or parsing error, false is
// returned and Error() can be queried for the exact failure.
func (it *MessageDispatcherMessageDispatchedIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(MessageDispatcherMessageDispatched)
			if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
				it.fail = err
				return false
			}
			it.Event.Raw = log
			return true

		default:
			return false
		}
	}
	// Iterator still in progress, wait for either a data or an error event
	select {
	case log := <-it.logs:
		it.Event = new(MessageDispatcherMessageDispatched)
		if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
			it.fail = err
			return false
		}
		it.Event.Raw = log
		return true

	case err := <-it.sub.Err():
		it.done = true
		it.fail = err
		return it.Next()
	}
}

// Error returns any retrieval or parsing error occurred during filtering.
func (it *MessageDispatcherMessageDispatchedIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *MessageDispatcherMessageDispatchedIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// MessageDispatcherMessageDispatched represents a MessageDispatched event raised by the MessageDispatcher contract.
type MessageDispatcherMessageDispatched struct {
	MessageId [32]byte
	From      common.Address
	ToChainId *big.Int
	To        common.Address
	Data      []byte
	Raw       types.Log // Blockchain specific contextual infos
}

// FilterMessageDispatched is a free log retrieval operation binding the contract event 0xe2f8f20ddbedfce5eb59a8b930077e7f4906a01300b9318db5f90d1c96c7b6d4.
//
// Solidity: event MessageDispatched(bytes32 indexed messageId, address indexed from, uint256 indexed toChainId, address to, bytes data)
func (_MessageDispatcher *MessageDispatcherFilterer) FilterMessageDispatched(opts *bind.FilterOpts, messageId [][32]byte, from []common.Address, toChainId []*big.Int) (*MessageDispatcherMessageDispatchedIterator, error) {

	var messageIdRule []interface{}
	for _, messageIdItem := range messageId {
		messageIdRule = append(messageIdRule, messageIdItem)
	}
	var fromRule []interface{}
	for _, fromItem := range from {
		fromRule = append(fromRule, fromItem)
	}
	var toChainIdRule []interface{}
	for _, toChainIdItem := range toChainId {
		toChainIdRule = append(toChainIdRule, toChainIdItem)
	}

	logs, sub, err := _MessageDispatcher.contract.FilterLogs(opts, "MessageDispatched", messageIdRule, fromRule, toChainIdRule)
	if err != nil {
		return nil, err
	}
	return &MessageDispatcherMessageDispatchedIterator{contract: _MessageDispatcher.contract, event: "MessageDispatched", logs: logs, sub: sub}, nil
}

// WatchMessageDispatched is a free log subscription operation binding the contract event 0xe2f8f20ddbedfce5eb59a8b930077e7f4906a01300b9318db5f90d1c96c7b6d4.
//
// Solidity: event MessageDispatched(bytes32 indexed messageId, address indexed from, uint256 indexed toChainId, address to, bytes data)
func (_MessageDispatcher *MessageDispatcherFilterer) WatchMessageDispatched(opts *bind.WatchOpts, sink chan<- *MessageDispatcherMessageDispatched, messageId [][32]byte, from []common.Address, toChainId []*big.Int) (event.Subscription, error) {

	var messageIdRule []interface{}
	for _, messageIdItem := range messageId {
		messageIdRule = append(messageIdRule, messageIdItem)
	}
	var fromRule []interface{}
	for _, fromItem := range from {
		fromRule = append(fromRule, fromItem)
	}
	var toChainIdRule []interface{}
	for _, toChainIdItem := range toChainId {
		toChainIdRule = append(toChainIdRule, toChainIdItem)
	}

	logs, sub, err := _MessageDispatcher.contract.WatchLogs(opts, "MessageDispatched", messageIdRule, fromRule, toChainIdRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(MessageDispatcherMessageDispatched)
				if err := _MessageDispatcher.contract.UnpackLog(event, "MessageDispatched", log); err != nil {
					return err
				}
				event.Raw = log

				select {
				case sink <- event:
				case err := <-sub.Err():
					return err
				case <-quit:
					return nil
				}
			case err := <-sub.Err():
				return err
			case <-quit:
				return nil
			}
		}
	}), nil
}

// ParseMessageDispatched is a log parse operation binding the contract event 0xe2f8f20ddbedfce5eb59a8b930077e7f4906a01300b9318db5f90d1c96c7b6d4.
//
// Solidity: event MessageDispatched(bytes32 indexed messageId, address indexed from, uint256 indexed toChainId, address to, bytes data)
func (_MessageDispatcher *MessageDispatcherFilterer) ParseMessageDispatched(log types.Log) (*MessageDispatcherMessageDispatched, error) {
	event := new(MessageDispatcherMessageDispatched)
	if err := _MessageDispatcher.contract.UnpackLog(event, "MessageDispatched", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// MessageDispatcherOwnershipTransferredIterator is returned from FilterOwnershipTransferred and is used to iterate over the raw logs and unpacked data for OwnershipTransferred events raised by the MessageDispatcher contract.
type MessageDispatcherOwnershipTransferredIterator struct {
	Event *MessageDispatcherOwnershipTransferred // Event containing the contract specifics and raw log

	contract *bind.BoundContract // Generic contract to use for unpacking event data
	event    string              // Event name to use for unpacking event data

	logs chan types.Log        // Log channel receiving the found contract events
	sub  ethereum.Subscription // Subscription for errors, completion and termination
	done bool                  // Whether the subscription completed delivering logs
	fail error                 // Occurred error to stop iteration
}

// Next advances the iterator to the subsequent event, returning whether there
// are any more events found. In case of a retrieval or parsing error, false is
// returned and Error() can be queried for the exact failure.
func (it *MessageDispatcherOwnershipTransferredIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(MessageDispatcherOwnershipTransferred)
			if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
				it.fail = err
				return false
			}
			it.Event.Raw = log
			return true

		default:
			return false
		}
	}
	// Iterator still in progress, wait for either a data or an error event
	select {
	case log := <-it.logs:
		it.Event = new(MessageDispatcherOwnershipTransferred)
		if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
			it.fail = err
			return false
		}
		it.Event.Raw = log
		return true

	case err := <-it.sub.Err():
		it.done = true
		it.fail = err
		return it.Next()
	}
}

// Error returns any retrieval or parsing error occurred during filtering.
func (it *MessageDispatcherOwnershipTransferredIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *MessageDispatcherOwnershipTransferredIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// MessageDispatcherOwnershipTransferred represents a OwnershipTransferred event raised by the MessageDispatcher contract.
type MessageDispatcherOwnershipTransferred struct {
	PreviousOwner common.Address
	NewOwner      common.Address
	Raw           types.Log // Blockchain specific contextual infos
}

// FilterOwnershipTransferred is a free log retrieval operation binding the contract event 0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0.
//
// Solidity: event OwnershipTransferred(address indexed previousOwner, address indexed newOwner)
func (_MessageDispatcher *MessageDispatcherFilterer) FilterOwnershipTransferred(opts *bind.FilterOpts, previousOwner []common.Address, newOwner []common.Address) (*MessageDispatcherOwnershipTransferredIterator, error) {

	var previousOwnerRule []interface{}
	for _, previousOwnerItem := range previousOwner {
		previousOwnerRule = append(previousOwnerRule, previousOwnerItem)
	}
	var newOwnerRule []interface{}
	for _, newOwnerItem := range newOwner {
		newOwnerRule = append(newOwnerRule, newOwnerItem)
	}

	logs, sub, err := _MessageDispatcher.contract.FilterLogs(opts, "OwnershipTransferred", previousOwnerRule, newOwnerRule)
	if err != nil {
		return nil, err
	}
	return &MessageDispatcherOwnershipTransferredIterator{contract: _MessageDispatcher.contract, event: "OwnershipTransferred", logs: logs, sub: sub}, nil
}

// WatchOwnershipTransferred is a free log subscription operation binding the contract event 0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0.
//
// Solidity: event OwnershipTransferred(address indexed previousOwner, address indexed newOwner)
func (_MessageDispatcher *MessageDispatcherFilterer) WatchOwnershipTransferred(opts *bind.WatchOpts, sink chan<- *MessageDispatcherOwnershipTransferred, previousOwner []common.Address, newOwner []common.Address) (event.Subscription, error) {

	var previousOwnerRule []interface{}
	for _, previousOwnerItem := range previousOwner {
		previousOwnerRule = append(previousOwnerRule, previousOwnerItem)
	}
	var newOwnerRule []interface{}
	for _, newOwnerItem := range newOwner {
		newOwnerRule = append(newOwnerRule, newOwnerItem)
	}

	logs, sub, err := _MessageDispatcher.contract.WatchLogs(opts, "OwnershipTransferred", previousOwnerRule, newOwnerRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(MessageDispatcherOwnershipTransferred)
				if err := _MessageDispatcher.contract.UnpackLog(event, "OwnershipTransferred", log); err != nil {
					return err
				}
				event.Raw = log

				select {
				case sink <- event:
				case err := <-sub.Err():
					return err
				case <-quit:
					return nil
				}
			case err := <-sub.Err():
				return err
			case <-quit:
				return nil
			}
		}
	}), nil
}

// ParseOwnershipTransferred is a log parse operation binding the contract event 0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0.
//
// Solidity: event OwnershipTransferred(address indexed previousOwner, address indexed newOwner)
func (_MessageDispatcher *MessageDispatcherFilterer) ParseOwnershipTransferred(log types.Log) (*MessageDispatcherOwnershipTransferred, error) {
	event := new(MessageDispatcherOwnershipTransferred)
	if err := _MessageDispatcher.contract.UnpackLog(event, "OwnershipTransferred", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}
