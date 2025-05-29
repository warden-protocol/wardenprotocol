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

// AbstractMessageIdAuthorizedIsmMetaData contains all meta data concerning the AbstractMessageIdAuthorizedIsm contract.
var AbstractMessageIdAuthorizedIsmMetaData = &bind.MetaData{
	ABI: "[{\"type\":\"function\",\"name\":\"PACKAGE_VERSION\",\"inputs\":[],\"outputs\":[{\"name\":\"\",\"type\":\"string\",\"internalType\":\"string\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"VERIFIED_MASK_INDEX\",\"inputs\":[],\"outputs\":[{\"name\":\"\",\"type\":\"uint256\",\"internalType\":\"uint256\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"authorizedHook\",\"inputs\":[],\"outputs\":[{\"name\":\"\",\"type\":\"bytes32\",\"internalType\":\"bytes32\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"isVerified\",\"inputs\":[{\"name\":\"message\",\"type\":\"bytes\",\"internalType\":\"bytes\"}],\"outputs\":[{\"name\":\"\",\"type\":\"bool\",\"internalType\":\"bool\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"moduleType\",\"inputs\":[],\"outputs\":[{\"name\":\"\",\"type\":\"uint8\",\"internalType\":\"uint8\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"preVerifyMessage\",\"inputs\":[{\"name\":\"messageId\",\"type\":\"bytes32\",\"internalType\":\"bytes32\"},{\"name\":\"msgValue\",\"type\":\"uint256\",\"internalType\":\"uint256\"}],\"outputs\":[],\"stateMutability\":\"payable\"},{\"type\":\"function\",\"name\":\"setAuthorizedHook\",\"inputs\":[{\"name\":\"_hook\",\"type\":\"bytes32\",\"internalType\":\"bytes32\"}],\"outputs\":[],\"stateMutability\":\"nonpayable\"},{\"type\":\"function\",\"name\":\"verifiedMessages\",\"inputs\":[{\"name\":\"\",\"type\":\"bytes32\",\"internalType\":\"bytes32\"}],\"outputs\":[{\"name\":\"\",\"type\":\"uint256\",\"internalType\":\"uint256\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"verify\",\"inputs\":[{\"name\":\"\",\"type\":\"bytes\",\"internalType\":\"bytes\"},{\"name\":\"message\",\"type\":\"bytes\",\"internalType\":\"bytes\"}],\"outputs\":[{\"name\":\"\",\"type\":\"bool\",\"internalType\":\"bool\"}],\"stateMutability\":\"nonpayable\"},{\"type\":\"event\",\"name\":\"Initialized\",\"inputs\":[{\"name\":\"version\",\"type\":\"uint8\",\"indexed\":false,\"internalType\":\"uint8\"}],\"anonymous\":false},{\"type\":\"event\",\"name\":\"ReceivedMessage\",\"inputs\":[{\"name\":\"messageId\",\"type\":\"bytes32\",\"indexed\":true,\"internalType\":\"bytes32\"},{\"name\":\"msgValue\",\"type\":\"uint256\",\"indexed\":false,\"internalType\":\"uint256\"}],\"anonymous\":false}]",
}

// AbstractMessageIdAuthorizedIsmABI is the input ABI used to generate the binding from.
// Deprecated: Use AbstractMessageIdAuthorizedIsmMetaData.ABI instead.
var AbstractMessageIdAuthorizedIsmABI = AbstractMessageIdAuthorizedIsmMetaData.ABI

// AbstractMessageIdAuthorizedIsm is an auto generated Go binding around an Ethereum contract.
type AbstractMessageIdAuthorizedIsm struct {
	AbstractMessageIdAuthorizedIsmCaller     // Read-only binding to the contract
	AbstractMessageIdAuthorizedIsmTransactor // Write-only binding to the contract
	AbstractMessageIdAuthorizedIsmFilterer   // Log filterer for contract events
}

// AbstractMessageIdAuthorizedIsmCaller is an auto generated read-only Go binding around an Ethereum contract.
type AbstractMessageIdAuthorizedIsmCaller struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// AbstractMessageIdAuthorizedIsmTransactor is an auto generated write-only Go binding around an Ethereum contract.
type AbstractMessageIdAuthorizedIsmTransactor struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// AbstractMessageIdAuthorizedIsmFilterer is an auto generated log filtering Go binding around an Ethereum contract events.
type AbstractMessageIdAuthorizedIsmFilterer struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// AbstractMessageIdAuthorizedIsmSession is an auto generated Go binding around an Ethereum contract,
// with pre-set call and transact options.
type AbstractMessageIdAuthorizedIsmSession struct {
	Contract     *AbstractMessageIdAuthorizedIsm // Generic contract binding to set the session for
	CallOpts     bind.CallOpts                   // Call options to use throughout this session
	TransactOpts bind.TransactOpts               // Transaction auth options to use throughout this session
}

// AbstractMessageIdAuthorizedIsmCallerSession is an auto generated read-only Go binding around an Ethereum contract,
// with pre-set call options.
type AbstractMessageIdAuthorizedIsmCallerSession struct {
	Contract *AbstractMessageIdAuthorizedIsmCaller // Generic contract caller binding to set the session for
	CallOpts bind.CallOpts                         // Call options to use throughout this session
}

// AbstractMessageIdAuthorizedIsmTransactorSession is an auto generated write-only Go binding around an Ethereum contract,
// with pre-set transact options.
type AbstractMessageIdAuthorizedIsmTransactorSession struct {
	Contract     *AbstractMessageIdAuthorizedIsmTransactor // Generic contract transactor binding to set the session for
	TransactOpts bind.TransactOpts                         // Transaction auth options to use throughout this session
}

// AbstractMessageIdAuthorizedIsmRaw is an auto generated low-level Go binding around an Ethereum contract.
type AbstractMessageIdAuthorizedIsmRaw struct {
	Contract *AbstractMessageIdAuthorizedIsm // Generic contract binding to access the raw methods on
}

// AbstractMessageIdAuthorizedIsmCallerRaw is an auto generated low-level read-only Go binding around an Ethereum contract.
type AbstractMessageIdAuthorizedIsmCallerRaw struct {
	Contract *AbstractMessageIdAuthorizedIsmCaller // Generic read-only contract binding to access the raw methods on
}

// AbstractMessageIdAuthorizedIsmTransactorRaw is an auto generated low-level write-only Go binding around an Ethereum contract.
type AbstractMessageIdAuthorizedIsmTransactorRaw struct {
	Contract *AbstractMessageIdAuthorizedIsmTransactor // Generic write-only contract binding to access the raw methods on
}

// NewAbstractMessageIdAuthorizedIsm creates a new instance of AbstractMessageIdAuthorizedIsm, bound to a specific deployed contract.
func NewAbstractMessageIdAuthorizedIsm(address common.Address, backend bind.ContractBackend) (*AbstractMessageIdAuthorizedIsm, error) {
	contract, err := bindAbstractMessageIdAuthorizedIsm(address, backend, backend, backend)
	if err != nil {
		return nil, err
	}
	return &AbstractMessageIdAuthorizedIsm{AbstractMessageIdAuthorizedIsmCaller: AbstractMessageIdAuthorizedIsmCaller{contract: contract}, AbstractMessageIdAuthorizedIsmTransactor: AbstractMessageIdAuthorizedIsmTransactor{contract: contract}, AbstractMessageIdAuthorizedIsmFilterer: AbstractMessageIdAuthorizedIsmFilterer{contract: contract}}, nil
}

// NewAbstractMessageIdAuthorizedIsmCaller creates a new read-only instance of AbstractMessageIdAuthorizedIsm, bound to a specific deployed contract.
func NewAbstractMessageIdAuthorizedIsmCaller(address common.Address, caller bind.ContractCaller) (*AbstractMessageIdAuthorizedIsmCaller, error) {
	contract, err := bindAbstractMessageIdAuthorizedIsm(address, caller, nil, nil)
	if err != nil {
		return nil, err
	}
	return &AbstractMessageIdAuthorizedIsmCaller{contract: contract}, nil
}

// NewAbstractMessageIdAuthorizedIsmTransactor creates a new write-only instance of AbstractMessageIdAuthorizedIsm, bound to a specific deployed contract.
func NewAbstractMessageIdAuthorizedIsmTransactor(address common.Address, transactor bind.ContractTransactor) (*AbstractMessageIdAuthorizedIsmTransactor, error) {
	contract, err := bindAbstractMessageIdAuthorizedIsm(address, nil, transactor, nil)
	if err != nil {
		return nil, err
	}
	return &AbstractMessageIdAuthorizedIsmTransactor{contract: contract}, nil
}

// NewAbstractMessageIdAuthorizedIsmFilterer creates a new log filterer instance of AbstractMessageIdAuthorizedIsm, bound to a specific deployed contract.
func NewAbstractMessageIdAuthorizedIsmFilterer(address common.Address, filterer bind.ContractFilterer) (*AbstractMessageIdAuthorizedIsmFilterer, error) {
	contract, err := bindAbstractMessageIdAuthorizedIsm(address, nil, nil, filterer)
	if err != nil {
		return nil, err
	}
	return &AbstractMessageIdAuthorizedIsmFilterer{contract: contract}, nil
}

// bindAbstractMessageIdAuthorizedIsm binds a generic wrapper to an already deployed contract.
func bindAbstractMessageIdAuthorizedIsm(address common.Address, caller bind.ContractCaller, transactor bind.ContractTransactor, filterer bind.ContractFilterer) (*bind.BoundContract, error) {
	parsed, err := AbstractMessageIdAuthorizedIsmMetaData.GetAbi()
	if err != nil {
		return nil, err
	}
	return bind.NewBoundContract(address, *parsed, caller, transactor, filterer), nil
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_AbstractMessageIdAuthorizedIsm *AbstractMessageIdAuthorizedIsmRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _AbstractMessageIdAuthorizedIsm.Contract.AbstractMessageIdAuthorizedIsmCaller.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_AbstractMessageIdAuthorizedIsm *AbstractMessageIdAuthorizedIsmRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _AbstractMessageIdAuthorizedIsm.Contract.AbstractMessageIdAuthorizedIsmTransactor.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_AbstractMessageIdAuthorizedIsm *AbstractMessageIdAuthorizedIsmRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _AbstractMessageIdAuthorizedIsm.Contract.AbstractMessageIdAuthorizedIsmTransactor.contract.Transact(opts, method, params...)
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_AbstractMessageIdAuthorizedIsm *AbstractMessageIdAuthorizedIsmCallerRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _AbstractMessageIdAuthorizedIsm.Contract.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_AbstractMessageIdAuthorizedIsm *AbstractMessageIdAuthorizedIsmTransactorRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _AbstractMessageIdAuthorizedIsm.Contract.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_AbstractMessageIdAuthorizedIsm *AbstractMessageIdAuthorizedIsmTransactorRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _AbstractMessageIdAuthorizedIsm.Contract.contract.Transact(opts, method, params...)
}

// PACKAGEVERSION is a free data retrieval call binding the contract method 0x93c44847.
//
// Solidity: function PACKAGE_VERSION() view returns(string)
func (_AbstractMessageIdAuthorizedIsm *AbstractMessageIdAuthorizedIsmCaller) PACKAGEVERSION(opts *bind.CallOpts) (string, error) {
	var out []interface{}
	err := _AbstractMessageIdAuthorizedIsm.contract.Call(opts, &out, "PACKAGE_VERSION")

	if err != nil {
		return *new(string), err
	}

	out0 := *abi.ConvertType(out[0], new(string)).(*string)

	return out0, err

}

// PACKAGEVERSION is a free data retrieval call binding the contract method 0x93c44847.
//
// Solidity: function PACKAGE_VERSION() view returns(string)
func (_AbstractMessageIdAuthorizedIsm *AbstractMessageIdAuthorizedIsmSession) PACKAGEVERSION() (string, error) {
	return _AbstractMessageIdAuthorizedIsm.Contract.PACKAGEVERSION(&_AbstractMessageIdAuthorizedIsm.CallOpts)
}

// PACKAGEVERSION is a free data retrieval call binding the contract method 0x93c44847.
//
// Solidity: function PACKAGE_VERSION() view returns(string)
func (_AbstractMessageIdAuthorizedIsm *AbstractMessageIdAuthorizedIsmCallerSession) PACKAGEVERSION() (string, error) {
	return _AbstractMessageIdAuthorizedIsm.Contract.PACKAGEVERSION(&_AbstractMessageIdAuthorizedIsm.CallOpts)
}

// VERIFIEDMASKINDEX is a free data retrieval call binding the contract method 0x273dca2f.
//
// Solidity: function VERIFIED_MASK_INDEX() view returns(uint256)
func (_AbstractMessageIdAuthorizedIsm *AbstractMessageIdAuthorizedIsmCaller) VERIFIEDMASKINDEX(opts *bind.CallOpts) (*big.Int, error) {
	var out []interface{}
	err := _AbstractMessageIdAuthorizedIsm.contract.Call(opts, &out, "VERIFIED_MASK_INDEX")

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// VERIFIEDMASKINDEX is a free data retrieval call binding the contract method 0x273dca2f.
//
// Solidity: function VERIFIED_MASK_INDEX() view returns(uint256)
func (_AbstractMessageIdAuthorizedIsm *AbstractMessageIdAuthorizedIsmSession) VERIFIEDMASKINDEX() (*big.Int, error) {
	return _AbstractMessageIdAuthorizedIsm.Contract.VERIFIEDMASKINDEX(&_AbstractMessageIdAuthorizedIsm.CallOpts)
}

// VERIFIEDMASKINDEX is a free data retrieval call binding the contract method 0x273dca2f.
//
// Solidity: function VERIFIED_MASK_INDEX() view returns(uint256)
func (_AbstractMessageIdAuthorizedIsm *AbstractMessageIdAuthorizedIsmCallerSession) VERIFIEDMASKINDEX() (*big.Int, error) {
	return _AbstractMessageIdAuthorizedIsm.Contract.VERIFIEDMASKINDEX(&_AbstractMessageIdAuthorizedIsm.CallOpts)
}

// AuthorizedHook is a free data retrieval call binding the contract method 0xc0762af5.
//
// Solidity: function authorizedHook() view returns(bytes32)
func (_AbstractMessageIdAuthorizedIsm *AbstractMessageIdAuthorizedIsmCaller) AuthorizedHook(opts *bind.CallOpts) ([32]byte, error) {
	var out []interface{}
	err := _AbstractMessageIdAuthorizedIsm.contract.Call(opts, &out, "authorizedHook")

	if err != nil {
		return *new([32]byte), err
	}

	out0 := *abi.ConvertType(out[0], new([32]byte)).(*[32]byte)

	return out0, err

}

// AuthorizedHook is a free data retrieval call binding the contract method 0xc0762af5.
//
// Solidity: function authorizedHook() view returns(bytes32)
func (_AbstractMessageIdAuthorizedIsm *AbstractMessageIdAuthorizedIsmSession) AuthorizedHook() ([32]byte, error) {
	return _AbstractMessageIdAuthorizedIsm.Contract.AuthorizedHook(&_AbstractMessageIdAuthorizedIsm.CallOpts)
}

// AuthorizedHook is a free data retrieval call binding the contract method 0xc0762af5.
//
// Solidity: function authorizedHook() view returns(bytes32)
func (_AbstractMessageIdAuthorizedIsm *AbstractMessageIdAuthorizedIsmCallerSession) AuthorizedHook() ([32]byte, error) {
	return _AbstractMessageIdAuthorizedIsm.Contract.AuthorizedHook(&_AbstractMessageIdAuthorizedIsm.CallOpts)
}

// IsVerified is a free data retrieval call binding the contract method 0xc9941806.
//
// Solidity: function isVerified(bytes message) view returns(bool)
func (_AbstractMessageIdAuthorizedIsm *AbstractMessageIdAuthorizedIsmCaller) IsVerified(opts *bind.CallOpts, message []byte) (bool, error) {
	var out []interface{}
	err := _AbstractMessageIdAuthorizedIsm.contract.Call(opts, &out, "isVerified", message)

	if err != nil {
		return *new(bool), err
	}

	out0 := *abi.ConvertType(out[0], new(bool)).(*bool)

	return out0, err

}

// IsVerified is a free data retrieval call binding the contract method 0xc9941806.
//
// Solidity: function isVerified(bytes message) view returns(bool)
func (_AbstractMessageIdAuthorizedIsm *AbstractMessageIdAuthorizedIsmSession) IsVerified(message []byte) (bool, error) {
	return _AbstractMessageIdAuthorizedIsm.Contract.IsVerified(&_AbstractMessageIdAuthorizedIsm.CallOpts, message)
}

// IsVerified is a free data retrieval call binding the contract method 0xc9941806.
//
// Solidity: function isVerified(bytes message) view returns(bool)
func (_AbstractMessageIdAuthorizedIsm *AbstractMessageIdAuthorizedIsmCallerSession) IsVerified(message []byte) (bool, error) {
	return _AbstractMessageIdAuthorizedIsm.Contract.IsVerified(&_AbstractMessageIdAuthorizedIsm.CallOpts, message)
}

// ModuleType is a free data retrieval call binding the contract method 0x6465e69f.
//
// Solidity: function moduleType() view returns(uint8)
func (_AbstractMessageIdAuthorizedIsm *AbstractMessageIdAuthorizedIsmCaller) ModuleType(opts *bind.CallOpts) (uint8, error) {
	var out []interface{}
	err := _AbstractMessageIdAuthorizedIsm.contract.Call(opts, &out, "moduleType")

	if err != nil {
		return *new(uint8), err
	}

	out0 := *abi.ConvertType(out[0], new(uint8)).(*uint8)

	return out0, err

}

// ModuleType is a free data retrieval call binding the contract method 0x6465e69f.
//
// Solidity: function moduleType() view returns(uint8)
func (_AbstractMessageIdAuthorizedIsm *AbstractMessageIdAuthorizedIsmSession) ModuleType() (uint8, error) {
	return _AbstractMessageIdAuthorizedIsm.Contract.ModuleType(&_AbstractMessageIdAuthorizedIsm.CallOpts)
}

// ModuleType is a free data retrieval call binding the contract method 0x6465e69f.
//
// Solidity: function moduleType() view returns(uint8)
func (_AbstractMessageIdAuthorizedIsm *AbstractMessageIdAuthorizedIsmCallerSession) ModuleType() (uint8, error) {
	return _AbstractMessageIdAuthorizedIsm.Contract.ModuleType(&_AbstractMessageIdAuthorizedIsm.CallOpts)
}

// VerifiedMessages is a free data retrieval call binding the contract method 0x3cf7f1d4.
//
// Solidity: function verifiedMessages(bytes32 ) view returns(uint256)
func (_AbstractMessageIdAuthorizedIsm *AbstractMessageIdAuthorizedIsmCaller) VerifiedMessages(opts *bind.CallOpts, arg0 [32]byte) (*big.Int, error) {
	var out []interface{}
	err := _AbstractMessageIdAuthorizedIsm.contract.Call(opts, &out, "verifiedMessages", arg0)

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// VerifiedMessages is a free data retrieval call binding the contract method 0x3cf7f1d4.
//
// Solidity: function verifiedMessages(bytes32 ) view returns(uint256)
func (_AbstractMessageIdAuthorizedIsm *AbstractMessageIdAuthorizedIsmSession) VerifiedMessages(arg0 [32]byte) (*big.Int, error) {
	return _AbstractMessageIdAuthorizedIsm.Contract.VerifiedMessages(&_AbstractMessageIdAuthorizedIsm.CallOpts, arg0)
}

// VerifiedMessages is a free data retrieval call binding the contract method 0x3cf7f1d4.
//
// Solidity: function verifiedMessages(bytes32 ) view returns(uint256)
func (_AbstractMessageIdAuthorizedIsm *AbstractMessageIdAuthorizedIsmCallerSession) VerifiedMessages(arg0 [32]byte) (*big.Int, error) {
	return _AbstractMessageIdAuthorizedIsm.Contract.VerifiedMessages(&_AbstractMessageIdAuthorizedIsm.CallOpts, arg0)
}

// PreVerifyMessage is a paid mutator transaction binding the contract method 0xf313ac8c.
//
// Solidity: function preVerifyMessage(bytes32 messageId, uint256 msgValue) payable returns()
func (_AbstractMessageIdAuthorizedIsm *AbstractMessageIdAuthorizedIsmTransactor) PreVerifyMessage(opts *bind.TransactOpts, messageId [32]byte, msgValue *big.Int) (*types.Transaction, error) {
	return _AbstractMessageIdAuthorizedIsm.contract.Transact(opts, "preVerifyMessage", messageId, msgValue)
}

// PreVerifyMessage is a paid mutator transaction binding the contract method 0xf313ac8c.
//
// Solidity: function preVerifyMessage(bytes32 messageId, uint256 msgValue) payable returns()
func (_AbstractMessageIdAuthorizedIsm *AbstractMessageIdAuthorizedIsmSession) PreVerifyMessage(messageId [32]byte, msgValue *big.Int) (*types.Transaction, error) {
	return _AbstractMessageIdAuthorizedIsm.Contract.PreVerifyMessage(&_AbstractMessageIdAuthorizedIsm.TransactOpts, messageId, msgValue)
}

// PreVerifyMessage is a paid mutator transaction binding the contract method 0xf313ac8c.
//
// Solidity: function preVerifyMessage(bytes32 messageId, uint256 msgValue) payable returns()
func (_AbstractMessageIdAuthorizedIsm *AbstractMessageIdAuthorizedIsmTransactorSession) PreVerifyMessage(messageId [32]byte, msgValue *big.Int) (*types.Transaction, error) {
	return _AbstractMessageIdAuthorizedIsm.Contract.PreVerifyMessage(&_AbstractMessageIdAuthorizedIsm.TransactOpts, messageId, msgValue)
}

// SetAuthorizedHook is a paid mutator transaction binding the contract method 0x4c89ca95.
//
// Solidity: function setAuthorizedHook(bytes32 _hook) returns()
func (_AbstractMessageIdAuthorizedIsm *AbstractMessageIdAuthorizedIsmTransactor) SetAuthorizedHook(opts *bind.TransactOpts, _hook [32]byte) (*types.Transaction, error) {
	return _AbstractMessageIdAuthorizedIsm.contract.Transact(opts, "setAuthorizedHook", _hook)
}

// SetAuthorizedHook is a paid mutator transaction binding the contract method 0x4c89ca95.
//
// Solidity: function setAuthorizedHook(bytes32 _hook) returns()
func (_AbstractMessageIdAuthorizedIsm *AbstractMessageIdAuthorizedIsmSession) SetAuthorizedHook(_hook [32]byte) (*types.Transaction, error) {
	return _AbstractMessageIdAuthorizedIsm.Contract.SetAuthorizedHook(&_AbstractMessageIdAuthorizedIsm.TransactOpts, _hook)
}

// SetAuthorizedHook is a paid mutator transaction binding the contract method 0x4c89ca95.
//
// Solidity: function setAuthorizedHook(bytes32 _hook) returns()
func (_AbstractMessageIdAuthorizedIsm *AbstractMessageIdAuthorizedIsmTransactorSession) SetAuthorizedHook(_hook [32]byte) (*types.Transaction, error) {
	return _AbstractMessageIdAuthorizedIsm.Contract.SetAuthorizedHook(&_AbstractMessageIdAuthorizedIsm.TransactOpts, _hook)
}

// Verify is a paid mutator transaction binding the contract method 0xf7e83aee.
//
// Solidity: function verify(bytes , bytes message) returns(bool)
func (_AbstractMessageIdAuthorizedIsm *AbstractMessageIdAuthorizedIsmTransactor) Verify(opts *bind.TransactOpts, arg0 []byte, message []byte) (*types.Transaction, error) {
	return _AbstractMessageIdAuthorizedIsm.contract.Transact(opts, "verify", arg0, message)
}

// Verify is a paid mutator transaction binding the contract method 0xf7e83aee.
//
// Solidity: function verify(bytes , bytes message) returns(bool)
func (_AbstractMessageIdAuthorizedIsm *AbstractMessageIdAuthorizedIsmSession) Verify(arg0 []byte, message []byte) (*types.Transaction, error) {
	return _AbstractMessageIdAuthorizedIsm.Contract.Verify(&_AbstractMessageIdAuthorizedIsm.TransactOpts, arg0, message)
}

// Verify is a paid mutator transaction binding the contract method 0xf7e83aee.
//
// Solidity: function verify(bytes , bytes message) returns(bool)
func (_AbstractMessageIdAuthorizedIsm *AbstractMessageIdAuthorizedIsmTransactorSession) Verify(arg0 []byte, message []byte) (*types.Transaction, error) {
	return _AbstractMessageIdAuthorizedIsm.Contract.Verify(&_AbstractMessageIdAuthorizedIsm.TransactOpts, arg0, message)
}

// AbstractMessageIdAuthorizedIsmInitializedIterator is returned from FilterInitialized and is used to iterate over the raw logs and unpacked data for Initialized events raised by the AbstractMessageIdAuthorizedIsm contract.
type AbstractMessageIdAuthorizedIsmInitializedIterator struct {
	Event *AbstractMessageIdAuthorizedIsmInitialized // Event containing the contract specifics and raw log

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
func (it *AbstractMessageIdAuthorizedIsmInitializedIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(AbstractMessageIdAuthorizedIsmInitialized)
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
		it.Event = new(AbstractMessageIdAuthorizedIsmInitialized)
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
func (it *AbstractMessageIdAuthorizedIsmInitializedIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *AbstractMessageIdAuthorizedIsmInitializedIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// AbstractMessageIdAuthorizedIsmInitialized represents a Initialized event raised by the AbstractMessageIdAuthorizedIsm contract.
type AbstractMessageIdAuthorizedIsmInitialized struct {
	Version uint8
	Raw     types.Log // Blockchain specific contextual infos
}

// FilterInitialized is a free log retrieval operation binding the contract event 0x7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb3847402498.
//
// Solidity: event Initialized(uint8 version)
func (_AbstractMessageIdAuthorizedIsm *AbstractMessageIdAuthorizedIsmFilterer) FilterInitialized(opts *bind.FilterOpts) (*AbstractMessageIdAuthorizedIsmInitializedIterator, error) {

	logs, sub, err := _AbstractMessageIdAuthorizedIsm.contract.FilterLogs(opts, "Initialized")
	if err != nil {
		return nil, err
	}
	return &AbstractMessageIdAuthorizedIsmInitializedIterator{contract: _AbstractMessageIdAuthorizedIsm.contract, event: "Initialized", logs: logs, sub: sub}, nil
}

// WatchInitialized is a free log subscription operation binding the contract event 0x7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb3847402498.
//
// Solidity: event Initialized(uint8 version)
func (_AbstractMessageIdAuthorizedIsm *AbstractMessageIdAuthorizedIsmFilterer) WatchInitialized(opts *bind.WatchOpts, sink chan<- *AbstractMessageIdAuthorizedIsmInitialized) (event.Subscription, error) {

	logs, sub, err := _AbstractMessageIdAuthorizedIsm.contract.WatchLogs(opts, "Initialized")
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(AbstractMessageIdAuthorizedIsmInitialized)
				if err := _AbstractMessageIdAuthorizedIsm.contract.UnpackLog(event, "Initialized", log); err != nil {
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
func (_AbstractMessageIdAuthorizedIsm *AbstractMessageIdAuthorizedIsmFilterer) ParseInitialized(log types.Log) (*AbstractMessageIdAuthorizedIsmInitialized, error) {
	event := new(AbstractMessageIdAuthorizedIsmInitialized)
	if err := _AbstractMessageIdAuthorizedIsm.contract.UnpackLog(event, "Initialized", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// AbstractMessageIdAuthorizedIsmReceivedMessageIterator is returned from FilterReceivedMessage and is used to iterate over the raw logs and unpacked data for ReceivedMessage events raised by the AbstractMessageIdAuthorizedIsm contract.
type AbstractMessageIdAuthorizedIsmReceivedMessageIterator struct {
	Event *AbstractMessageIdAuthorizedIsmReceivedMessage // Event containing the contract specifics and raw log

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
func (it *AbstractMessageIdAuthorizedIsmReceivedMessageIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(AbstractMessageIdAuthorizedIsmReceivedMessage)
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
		it.Event = new(AbstractMessageIdAuthorizedIsmReceivedMessage)
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
func (it *AbstractMessageIdAuthorizedIsmReceivedMessageIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *AbstractMessageIdAuthorizedIsmReceivedMessageIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// AbstractMessageIdAuthorizedIsmReceivedMessage represents a ReceivedMessage event raised by the AbstractMessageIdAuthorizedIsm contract.
type AbstractMessageIdAuthorizedIsmReceivedMessage struct {
	MessageId [32]byte
	MsgValue  *big.Int
	Raw       types.Log // Blockchain specific contextual infos
}

// FilterReceivedMessage is a free log retrieval operation binding the contract event 0x67bb630afc52bb7882961d318eb6e0b3e79683d05153a7f4381c27604e996f93.
//
// Solidity: event ReceivedMessage(bytes32 indexed messageId, uint256 msgValue)
func (_AbstractMessageIdAuthorizedIsm *AbstractMessageIdAuthorizedIsmFilterer) FilterReceivedMessage(opts *bind.FilterOpts, messageId [][32]byte) (*AbstractMessageIdAuthorizedIsmReceivedMessageIterator, error) {

	var messageIdRule []interface{}
	for _, messageIdItem := range messageId {
		messageIdRule = append(messageIdRule, messageIdItem)
	}

	logs, sub, err := _AbstractMessageIdAuthorizedIsm.contract.FilterLogs(opts, "ReceivedMessage", messageIdRule)
	if err != nil {
		return nil, err
	}
	return &AbstractMessageIdAuthorizedIsmReceivedMessageIterator{contract: _AbstractMessageIdAuthorizedIsm.contract, event: "ReceivedMessage", logs: logs, sub: sub}, nil
}

// WatchReceivedMessage is a free log subscription operation binding the contract event 0x67bb630afc52bb7882961d318eb6e0b3e79683d05153a7f4381c27604e996f93.
//
// Solidity: event ReceivedMessage(bytes32 indexed messageId, uint256 msgValue)
func (_AbstractMessageIdAuthorizedIsm *AbstractMessageIdAuthorizedIsmFilterer) WatchReceivedMessage(opts *bind.WatchOpts, sink chan<- *AbstractMessageIdAuthorizedIsmReceivedMessage, messageId [][32]byte) (event.Subscription, error) {

	var messageIdRule []interface{}
	for _, messageIdItem := range messageId {
		messageIdRule = append(messageIdRule, messageIdItem)
	}

	logs, sub, err := _AbstractMessageIdAuthorizedIsm.contract.WatchLogs(opts, "ReceivedMessage", messageIdRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(AbstractMessageIdAuthorizedIsmReceivedMessage)
				if err := _AbstractMessageIdAuthorizedIsm.contract.UnpackLog(event, "ReceivedMessage", log); err != nil {
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

// ParseReceivedMessage is a log parse operation binding the contract event 0x67bb630afc52bb7882961d318eb6e0b3e79683d05153a7f4381c27604e996f93.
//
// Solidity: event ReceivedMessage(bytes32 indexed messageId, uint256 msgValue)
func (_AbstractMessageIdAuthorizedIsm *AbstractMessageIdAuthorizedIsmFilterer) ParseReceivedMessage(log types.Log) (*AbstractMessageIdAuthorizedIsmReceivedMessage, error) {
	event := new(AbstractMessageIdAuthorizedIsmReceivedMessage)
	if err := _AbstractMessageIdAuthorizedIsm.contract.UnpackLog(event, "ReceivedMessage", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}
