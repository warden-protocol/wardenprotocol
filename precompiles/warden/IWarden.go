// Code generated - DO NOT EDIT.
// This file is a generated binding and any manual changes will be lost.

package warden

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
)

// IWardenMetaData contains all meta data concerning the IWarden contract.
var IWardenMetaData = &bind.MetaData{
	ABI: "[{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"NewAdmin\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint64\",\"name\":\"id\",\"type\":\"uint64\"},{\"indexed\":false,\"internalType\":\"uint64\",\"name\":\"adminsCount\",\"type\":\"uint64\"}],\"name\":\"AddKeychainAdmin\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"NewWriter\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint64\",\"name\":\"id\",\"type\":\"uint64\"},{\"indexed\":false,\"internalType\":\"uint64\",\"name\":\"adminsCount\",\"type\":\"uint64\"}],\"name\":\"AddKeychainWriter\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"internalType\":\"uint64\",\"name\":\"id\",\"type\":\"uint64\"},{\"indexed\":false,\"internalType\":\"int32\",\"name\":\"key_type\",\"type\":\"int32\"},{\"indexed\":false,\"internalType\":\"uint64\",\"name\":\"space_id\",\"type\":\"uint64\"},{\"indexed\":false,\"internalType\":\"uint64\",\"name\":\"keychain_id\",\"type\":\"uint64\"},{\"indexed\":false,\"internalType\":\"uint64\",\"name\":\"approve_template_id\",\"type\":\"uint64\"},{\"indexed\":false,\"internalType\":\"uint64\",\"name\":\"reject_template_id\",\"type\":\"uint64\"}],\"name\":\"NewKey\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"internalType\":\"uint64\",\"name\":\"id\",\"type\":\"uint64\"}],\"name\":\"RejectKeyRequest\",\"type\":\"event\"},{\"inputs\":[{\"internalType\":\"uint64\",\"name\":\"keychainId\",\"type\":\"uint64\"},{\"internalType\":\"address\",\"name\":\"newAdmin\",\"type\":\"address\"}],\"name\":\"addKeychainAdmin\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"success\",\"type\":\"bool\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint64\",\"name\":\"keychainId\",\"type\":\"uint64\"},{\"internalType\":\"address\",\"name\":\"newWriter\",\"type\":\"address\"}],\"name\":\"addKeychainWriter\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"success\",\"type\":\"bool\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint64\",\"name\":\"requestId\",\"type\":\"uint64\"},{\"internalType\":\"bytes\",\"name\":\"pubKey\",\"type\":\"bytes\"}],\"name\":\"fulfilKeyRequest\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"success\",\"type\":\"bool\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint64\",\"name\":\"requestId\",\"type\":\"uint64\"},{\"internalType\":\"string\",\"name\":\"rejectReason\",\"type\":\"string\"}],\"name\":\"rejectKeyRequest\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"success\",\"type\":\"bool\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"}]",
}

// IWardenABI is the input ABI used to generate the binding from.
// Deprecated: Use IWardenMetaData.ABI instead.
var IWardenABI = IWardenMetaData.ABI

// IWarden is an auto generated Go binding around an Ethereum contract.
type IWarden struct {
	IWardenCaller     // Read-only binding to the contract
	IWardenTransactor // Write-only binding to the contract
	IWardenFilterer   // Log filterer for contract events
}

// IWardenCaller is an auto generated read-only Go binding around an Ethereum contract.
type IWardenCaller struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// IWardenTransactor is an auto generated write-only Go binding around an Ethereum contract.
type IWardenTransactor struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// IWardenFilterer is an auto generated log filtering Go binding around an Ethereum contract events.
type IWardenFilterer struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// IWardenSession is an auto generated Go binding around an Ethereum contract,
// with pre-set call and transact options.
type IWardenSession struct {
	Contract     *IWarden          // Generic contract binding to set the session for
	CallOpts     bind.CallOpts     // Call options to use throughout this session
	TransactOpts bind.TransactOpts // Transaction auth options to use throughout this session
}

// IWardenCallerSession is an auto generated read-only Go binding around an Ethereum contract,
// with pre-set call options.
type IWardenCallerSession struct {
	Contract *IWardenCaller // Generic contract caller binding to set the session for
	CallOpts bind.CallOpts  // Call options to use throughout this session
}

// IWardenTransactorSession is an auto generated write-only Go binding around an Ethereum contract,
// with pre-set transact options.
type IWardenTransactorSession struct {
	Contract     *IWardenTransactor // Generic contract transactor binding to set the session for
	TransactOpts bind.TransactOpts  // Transaction auth options to use throughout this session
}

// IWardenRaw is an auto generated low-level Go binding around an Ethereum contract.
type IWardenRaw struct {
	Contract *IWarden // Generic contract binding to access the raw methods on
}

// IWardenCallerRaw is an auto generated low-level read-only Go binding around an Ethereum contract.
type IWardenCallerRaw struct {
	Contract *IWardenCaller // Generic read-only contract binding to access the raw methods on
}

// IWardenTransactorRaw is an auto generated low-level write-only Go binding around an Ethereum contract.
type IWardenTransactorRaw struct {
	Contract *IWardenTransactor // Generic write-only contract binding to access the raw methods on
}

// NewIWarden creates a new instance of IWarden, bound to a specific deployed contract.
func NewIWarden(address common.Address, backend bind.ContractBackend) (*IWarden, error) {
	contract, err := bindIWarden(address, backend, backend, backend)
	if err != nil {
		return nil, err
	}
	return &IWarden{IWardenCaller: IWardenCaller{contract: contract}, IWardenTransactor: IWardenTransactor{contract: contract}, IWardenFilterer: IWardenFilterer{contract: contract}}, nil
}

// NewIWardenCaller creates a new read-only instance of IWarden, bound to a specific deployed contract.
func NewIWardenCaller(address common.Address, caller bind.ContractCaller) (*IWardenCaller, error) {
	contract, err := bindIWarden(address, caller, nil, nil)
	if err != nil {
		return nil, err
	}
	return &IWardenCaller{contract: contract}, nil
}

// NewIWardenTransactor creates a new write-only instance of IWarden, bound to a specific deployed contract.
func NewIWardenTransactor(address common.Address, transactor bind.ContractTransactor) (*IWardenTransactor, error) {
	contract, err := bindIWarden(address, nil, transactor, nil)
	if err != nil {
		return nil, err
	}
	return &IWardenTransactor{contract: contract}, nil
}

// NewIWardenFilterer creates a new log filterer instance of IWarden, bound to a specific deployed contract.
func NewIWardenFilterer(address common.Address, filterer bind.ContractFilterer) (*IWardenFilterer, error) {
	contract, err := bindIWarden(address, nil, nil, filterer)
	if err != nil {
		return nil, err
	}
	return &IWardenFilterer{contract: contract}, nil
}

// bindIWarden binds a generic wrapper to an already deployed contract.
func bindIWarden(address common.Address, caller bind.ContractCaller, transactor bind.ContractTransactor, filterer bind.ContractFilterer) (*bind.BoundContract, error) {
	parsed, err := abi.JSON(strings.NewReader(IWardenABI))
	if err != nil {
		return nil, err
	}
	return bind.NewBoundContract(address, parsed, caller, transactor, filterer), nil
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_IWarden *IWardenRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _IWarden.Contract.IWardenCaller.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_IWarden *IWardenRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _IWarden.Contract.IWardenTransactor.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_IWarden *IWardenRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _IWarden.Contract.IWardenTransactor.contract.Transact(opts, method, params...)
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_IWarden *IWardenCallerRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _IWarden.Contract.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_IWarden *IWardenTransactorRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _IWarden.Contract.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_IWarden *IWardenTransactorRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _IWarden.Contract.contract.Transact(opts, method, params...)
}

// AddKeychainAdmin is a paid mutator transaction binding the contract method 0xdf9c1808.
//
// Solidity: function addKeychainAdmin(uint64 keychainId, address newAdmin) returns(bool success)
func (_IWarden *IWardenTransactor) AddKeychainAdmin(opts *bind.TransactOpts, keychainId uint64, newAdmin common.Address) (*types.Transaction, error) {
	return _IWarden.contract.Transact(opts, "addKeychainAdmin", keychainId, newAdmin)
}

// AddKeychainAdmin is a paid mutator transaction binding the contract method 0xdf9c1808.
//
// Solidity: function addKeychainAdmin(uint64 keychainId, address newAdmin) returns(bool success)
func (_IWarden *IWardenSession) AddKeychainAdmin(keychainId uint64, newAdmin common.Address) (*types.Transaction, error) {
	return _IWarden.Contract.AddKeychainAdmin(&_IWarden.TransactOpts, keychainId, newAdmin)
}

// AddKeychainAdmin is a paid mutator transaction binding the contract method 0xdf9c1808.
//
// Solidity: function addKeychainAdmin(uint64 keychainId, address newAdmin) returns(bool success)
func (_IWarden *IWardenTransactorSession) AddKeychainAdmin(keychainId uint64, newAdmin common.Address) (*types.Transaction, error) {
	return _IWarden.Contract.AddKeychainAdmin(&_IWarden.TransactOpts, keychainId, newAdmin)
}

// AddKeychainWriter is a paid mutator transaction binding the contract method 0x49fb21b3.
//
// Solidity: function addKeychainWriter(uint64 keychainId, address newWriter) returns(bool success)
func (_IWarden *IWardenTransactor) AddKeychainWriter(opts *bind.TransactOpts, keychainId uint64, newWriter common.Address) (*types.Transaction, error) {
	return _IWarden.contract.Transact(opts, "addKeychainWriter", keychainId, newWriter)
}

// AddKeychainWriter is a paid mutator transaction binding the contract method 0x49fb21b3.
//
// Solidity: function addKeychainWriter(uint64 keychainId, address newWriter) returns(bool success)
func (_IWarden *IWardenSession) AddKeychainWriter(keychainId uint64, newWriter common.Address) (*types.Transaction, error) {
	return _IWarden.Contract.AddKeychainWriter(&_IWarden.TransactOpts, keychainId, newWriter)
}

// AddKeychainWriter is a paid mutator transaction binding the contract method 0x49fb21b3.
//
// Solidity: function addKeychainWriter(uint64 keychainId, address newWriter) returns(bool success)
func (_IWarden *IWardenTransactorSession) AddKeychainWriter(keychainId uint64, newWriter common.Address) (*types.Transaction, error) {
	return _IWarden.Contract.AddKeychainWriter(&_IWarden.TransactOpts, keychainId, newWriter)
}

// FulfilKeyRequest is a paid mutator transaction binding the contract method 0x1cf2c987.
//
// Solidity: function fulfilKeyRequest(uint64 requestId, bytes pubKey) returns(bool success)
func (_IWarden *IWardenTransactor) FulfilKeyRequest(opts *bind.TransactOpts, requestId uint64, pubKey []byte) (*types.Transaction, error) {
	return _IWarden.contract.Transact(opts, "fulfilKeyRequest", requestId, pubKey)
}

// FulfilKeyRequest is a paid mutator transaction binding the contract method 0x1cf2c987.
//
// Solidity: function fulfilKeyRequest(uint64 requestId, bytes pubKey) returns(bool success)
func (_IWarden *IWardenSession) FulfilKeyRequest(requestId uint64, pubKey []byte) (*types.Transaction, error) {
	return _IWarden.Contract.FulfilKeyRequest(&_IWarden.TransactOpts, requestId, pubKey)
}

// FulfilKeyRequest is a paid mutator transaction binding the contract method 0x1cf2c987.
//
// Solidity: function fulfilKeyRequest(uint64 requestId, bytes pubKey) returns(bool success)
func (_IWarden *IWardenTransactorSession) FulfilKeyRequest(requestId uint64, pubKey []byte) (*types.Transaction, error) {
	return _IWarden.Contract.FulfilKeyRequest(&_IWarden.TransactOpts, requestId, pubKey)
}

// RejectKeyRequest is a paid mutator transaction binding the contract method 0xd9ac97be.
//
// Solidity: function rejectKeyRequest(uint64 requestId, string rejectReason) returns(bool success)
func (_IWarden *IWardenTransactor) RejectKeyRequest(opts *bind.TransactOpts, requestId uint64, rejectReason string) (*types.Transaction, error) {
	return _IWarden.contract.Transact(opts, "rejectKeyRequest", requestId, rejectReason)
}

// RejectKeyRequest is a paid mutator transaction binding the contract method 0xd9ac97be.
//
// Solidity: function rejectKeyRequest(uint64 requestId, string rejectReason) returns(bool success)
func (_IWarden *IWardenSession) RejectKeyRequest(requestId uint64, rejectReason string) (*types.Transaction, error) {
	return _IWarden.Contract.RejectKeyRequest(&_IWarden.TransactOpts, requestId, rejectReason)
}

// RejectKeyRequest is a paid mutator transaction binding the contract method 0xd9ac97be.
//
// Solidity: function rejectKeyRequest(uint64 requestId, string rejectReason) returns(bool success)
func (_IWarden *IWardenTransactorSession) RejectKeyRequest(requestId uint64, rejectReason string) (*types.Transaction, error) {
	return _IWarden.Contract.RejectKeyRequest(&_IWarden.TransactOpts, requestId, rejectReason)
}

// IWardenAddKeychainAdminIterator is returned from FilterAddKeychainAdmin and is used to iterate over the raw logs and unpacked data for AddKeychainAdmin events raised by the IWarden contract.
type IWardenAddKeychainAdminIterator struct {
	Event *IWardenAddKeychainAdmin // Event containing the contract specifics and raw log

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
func (it *IWardenAddKeychainAdminIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(IWardenAddKeychainAdmin)
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
		it.Event = new(IWardenAddKeychainAdmin)
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
func (it *IWardenAddKeychainAdminIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *IWardenAddKeychainAdminIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// IWardenAddKeychainAdmin represents a AddKeychainAdmin event raised by the IWarden contract.
type IWardenAddKeychainAdmin struct {
	NewAdmin    common.Address
	Id          uint64
	AdminsCount uint64
	Raw         types.Log // Blockchain specific contextual infos
}

// FilterAddKeychainAdmin is a free log retrieval operation binding the contract event 0x363238dc5ee3ed860e5599b2698d2f74510cedfe6ed9a27eacef2fe5cc46763e.
//
// Solidity: event AddKeychainAdmin(address indexed NewAdmin, uint64 id, uint64 adminsCount)
func (_IWarden *IWardenFilterer) FilterAddKeychainAdmin(opts *bind.FilterOpts, NewAdmin []common.Address) (*IWardenAddKeychainAdminIterator, error) {

	var NewAdminRule []interface{}
	for _, NewAdminItem := range NewAdmin {
		NewAdminRule = append(NewAdminRule, NewAdminItem)
	}

	logs, sub, err := _IWarden.contract.FilterLogs(opts, "AddKeychainAdmin", NewAdminRule)
	if err != nil {
		return nil, err
	}
	return &IWardenAddKeychainAdminIterator{contract: _IWarden.contract, event: "AddKeychainAdmin", logs: logs, sub: sub}, nil
}

// WatchAddKeychainAdmin is a free log subscription operation binding the contract event 0x363238dc5ee3ed860e5599b2698d2f74510cedfe6ed9a27eacef2fe5cc46763e.
//
// Solidity: event AddKeychainAdmin(address indexed NewAdmin, uint64 id, uint64 adminsCount)
func (_IWarden *IWardenFilterer) WatchAddKeychainAdmin(opts *bind.WatchOpts, sink chan<- *IWardenAddKeychainAdmin, NewAdmin []common.Address) (event.Subscription, error) {

	var NewAdminRule []interface{}
	for _, NewAdminItem := range NewAdmin {
		NewAdminRule = append(NewAdminRule, NewAdminItem)
	}

	logs, sub, err := _IWarden.contract.WatchLogs(opts, "AddKeychainAdmin", NewAdminRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(IWardenAddKeychainAdmin)
				if err := _IWarden.contract.UnpackLog(event, "AddKeychainAdmin", log); err != nil {
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

// ParseAddKeychainAdmin is a log parse operation binding the contract event 0x363238dc5ee3ed860e5599b2698d2f74510cedfe6ed9a27eacef2fe5cc46763e.
//
// Solidity: event AddKeychainAdmin(address indexed NewAdmin, uint64 id, uint64 adminsCount)
func (_IWarden *IWardenFilterer) ParseAddKeychainAdmin(log types.Log) (*IWardenAddKeychainAdmin, error) {
	event := new(IWardenAddKeychainAdmin)
	if err := _IWarden.contract.UnpackLog(event, "AddKeychainAdmin", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// IWardenAddKeychainWriterIterator is returned from FilterAddKeychainWriter and is used to iterate over the raw logs and unpacked data for AddKeychainWriter events raised by the IWarden contract.
type IWardenAddKeychainWriterIterator struct {
	Event *IWardenAddKeychainWriter // Event containing the contract specifics and raw log

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
func (it *IWardenAddKeychainWriterIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(IWardenAddKeychainWriter)
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
		it.Event = new(IWardenAddKeychainWriter)
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
func (it *IWardenAddKeychainWriterIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *IWardenAddKeychainWriterIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// IWardenAddKeychainWriter represents a AddKeychainWriter event raised by the IWarden contract.
type IWardenAddKeychainWriter struct {
	NewWriter   common.Address
	Id          uint64
	AdminsCount uint64
	Raw         types.Log // Blockchain specific contextual infos
}

// FilterAddKeychainWriter is a free log retrieval operation binding the contract event 0x95209db0173d4ee88ed6a251e6c008e9ef15b765625418c7731c2dad6ba8d008.
//
// Solidity: event AddKeychainWriter(address indexed NewWriter, uint64 id, uint64 adminsCount)
func (_IWarden *IWardenFilterer) FilterAddKeychainWriter(opts *bind.FilterOpts, NewWriter []common.Address) (*IWardenAddKeychainWriterIterator, error) {

	var NewWriterRule []interface{}
	for _, NewWriterItem := range NewWriter {
		NewWriterRule = append(NewWriterRule, NewWriterItem)
	}

	logs, sub, err := _IWarden.contract.FilterLogs(opts, "AddKeychainWriter", NewWriterRule)
	if err != nil {
		return nil, err
	}
	return &IWardenAddKeychainWriterIterator{contract: _IWarden.contract, event: "AddKeychainWriter", logs: logs, sub: sub}, nil
}

// WatchAddKeychainWriter is a free log subscription operation binding the contract event 0x95209db0173d4ee88ed6a251e6c008e9ef15b765625418c7731c2dad6ba8d008.
//
// Solidity: event AddKeychainWriter(address indexed NewWriter, uint64 id, uint64 adminsCount)
func (_IWarden *IWardenFilterer) WatchAddKeychainWriter(opts *bind.WatchOpts, sink chan<- *IWardenAddKeychainWriter, NewWriter []common.Address) (event.Subscription, error) {

	var NewWriterRule []interface{}
	for _, NewWriterItem := range NewWriter {
		NewWriterRule = append(NewWriterRule, NewWriterItem)
	}

	logs, sub, err := _IWarden.contract.WatchLogs(opts, "AddKeychainWriter", NewWriterRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(IWardenAddKeychainWriter)
				if err := _IWarden.contract.UnpackLog(event, "AddKeychainWriter", log); err != nil {
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

// ParseAddKeychainWriter is a log parse operation binding the contract event 0x95209db0173d4ee88ed6a251e6c008e9ef15b765625418c7731c2dad6ba8d008.
//
// Solidity: event AddKeychainWriter(address indexed NewWriter, uint64 id, uint64 adminsCount)
func (_IWarden *IWardenFilterer) ParseAddKeychainWriter(log types.Log) (*IWardenAddKeychainWriter, error) {
	event := new(IWardenAddKeychainWriter)
	if err := _IWarden.contract.UnpackLog(event, "AddKeychainWriter", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// IWardenNewKeyIterator is returned from FilterNewKey and is used to iterate over the raw logs and unpacked data for NewKey events raised by the IWarden contract.
type IWardenNewKeyIterator struct {
	Event *IWardenNewKey // Event containing the contract specifics and raw log

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
func (it *IWardenNewKeyIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(IWardenNewKey)
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
		it.Event = new(IWardenNewKey)
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
func (it *IWardenNewKeyIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *IWardenNewKeyIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// IWardenNewKey represents a NewKey event raised by the IWarden contract.
type IWardenNewKey struct {
	Id                uint64
	KeyType           int32
	SpaceId           uint64
	KeychainId        uint64
	ApproveTemplateId uint64
	RejectTemplateId  uint64
	Raw               types.Log // Blockchain specific contextual infos
}

// FilterNewKey is a free log retrieval operation binding the contract event 0xdbf5c0202f94c1bcf43c3341f2a11bd8497c01c9d9406435b3017dad2a3f95b3.
//
// Solidity: event NewKey(uint64 id, int32 key_type, uint64 space_id, uint64 keychain_id, uint64 approve_template_id, uint64 reject_template_id)
func (_IWarden *IWardenFilterer) FilterNewKey(opts *bind.FilterOpts) (*IWardenNewKeyIterator, error) {

	logs, sub, err := _IWarden.contract.FilterLogs(opts, "NewKey")
	if err != nil {
		return nil, err
	}
	return &IWardenNewKeyIterator{contract: _IWarden.contract, event: "NewKey", logs: logs, sub: sub}, nil
}

// WatchNewKey is a free log subscription operation binding the contract event 0xdbf5c0202f94c1bcf43c3341f2a11bd8497c01c9d9406435b3017dad2a3f95b3.
//
// Solidity: event NewKey(uint64 id, int32 key_type, uint64 space_id, uint64 keychain_id, uint64 approve_template_id, uint64 reject_template_id)
func (_IWarden *IWardenFilterer) WatchNewKey(opts *bind.WatchOpts, sink chan<- *IWardenNewKey) (event.Subscription, error) {

	logs, sub, err := _IWarden.contract.WatchLogs(opts, "NewKey")
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(IWardenNewKey)
				if err := _IWarden.contract.UnpackLog(event, "NewKey", log); err != nil {
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

// ParseNewKey is a log parse operation binding the contract event 0xdbf5c0202f94c1bcf43c3341f2a11bd8497c01c9d9406435b3017dad2a3f95b3.
//
// Solidity: event NewKey(uint64 id, int32 key_type, uint64 space_id, uint64 keychain_id, uint64 approve_template_id, uint64 reject_template_id)
func (_IWarden *IWardenFilterer) ParseNewKey(log types.Log) (*IWardenNewKey, error) {
	event := new(IWardenNewKey)
	if err := _IWarden.contract.UnpackLog(event, "NewKey", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// IWardenRejectKeyRequestIterator is returned from FilterRejectKeyRequest and is used to iterate over the raw logs and unpacked data for RejectKeyRequest events raised by the IWarden contract.
type IWardenRejectKeyRequestIterator struct {
	Event *IWardenRejectKeyRequest // Event containing the contract specifics and raw log

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
func (it *IWardenRejectKeyRequestIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(IWardenRejectKeyRequest)
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
		it.Event = new(IWardenRejectKeyRequest)
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
func (it *IWardenRejectKeyRequestIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *IWardenRejectKeyRequestIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// IWardenRejectKeyRequest represents a RejectKeyRequest event raised by the IWarden contract.
type IWardenRejectKeyRequest struct {
	Id  uint64
	Raw types.Log // Blockchain specific contextual infos
}

// FilterRejectKeyRequest is a free log retrieval operation binding the contract event 0xeb94cbafda4c7f6a07cd1d92397097ac757e494d72e3e3cabb3c618ca559a720.
//
// Solidity: event RejectKeyRequest(uint64 id)
func (_IWarden *IWardenFilterer) FilterRejectKeyRequest(opts *bind.FilterOpts) (*IWardenRejectKeyRequestIterator, error) {

	logs, sub, err := _IWarden.contract.FilterLogs(opts, "RejectKeyRequest")
	if err != nil {
		return nil, err
	}
	return &IWardenRejectKeyRequestIterator{contract: _IWarden.contract, event: "RejectKeyRequest", logs: logs, sub: sub}, nil
}

// WatchRejectKeyRequest is a free log subscription operation binding the contract event 0xeb94cbafda4c7f6a07cd1d92397097ac757e494d72e3e3cabb3c618ca559a720.
//
// Solidity: event RejectKeyRequest(uint64 id)
func (_IWarden *IWardenFilterer) WatchRejectKeyRequest(opts *bind.WatchOpts, sink chan<- *IWardenRejectKeyRequest) (event.Subscription, error) {

	logs, sub, err := _IWarden.contract.WatchLogs(opts, "RejectKeyRequest")
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(IWardenRejectKeyRequest)
				if err := _IWarden.contract.UnpackLog(event, "RejectKeyRequest", log); err != nil {
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

// ParseRejectKeyRequest is a log parse operation binding the contract event 0xeb94cbafda4c7f6a07cd1d92397097ac757e494d72e3e3cabb3c618ca559a720.
//
// Solidity: event RejectKeyRequest(uint64 id)
func (_IWarden *IWardenFilterer) ParseRejectKeyRequest(log types.Log) (*IWardenRejectKeyRequest, error) {
	event := new(IWardenRejectKeyRequest)
	if err := _IWarden.contract.UnpackLog(event, "RejectKeyRequest", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}
