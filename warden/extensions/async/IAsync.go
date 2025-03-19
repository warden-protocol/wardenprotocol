// Code generated - DO NOT EDIT.
// This file is a generated binding and any manual changes will be lost.

package async

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

// Future is an auto generated low-level Go binding around an user-defined struct.
type Future struct {
	Id      uint64
	Creator common.Address
	Handler string
	Input   []byte
}

// FutureByIdResponse is an auto generated low-level Go binding around an user-defined struct.
type FutureByIdResponse struct {
	FutureResponse FutureResponse
}

// FutureResponse is an auto generated low-level Go binding around an user-defined struct.
type FutureResponse struct {
	Future Future
	Votes  []FutureVote
	Result FutureResult
}

// FutureResult is an auto generated low-level Go binding around an user-defined struct.
type FutureResult struct {
	Id        uint64
	Output    []byte
	Submitter []byte
}

// FutureVote is an auto generated low-level Go binding around an user-defined struct.
type FutureVote struct {
	FutureId uint64
	Voter    []byte
	Vote     uint8
}

// FuturesResponse is an auto generated low-level Go binding around an user-defined struct.
type FuturesResponse struct {
	Pagination TypesPageResponse
	Futures    []FutureResponse
}

// PendingFuturesResponse is an auto generated low-level Go binding around an user-defined struct.
type PendingFuturesResponse struct {
	Pagination TypesPageResponse
	Futures    []Future
}

// TypesPageRequest is an auto generated low-level Go binding around an user-defined struct.
type TypesPageRequest struct {
	Key        []byte
	Offset     uint64
	Limit      uint64
	CountTotal bool
	Reverse    bool
}

// TypesPageResponse is an auto generated low-level Go binding around an user-defined struct.
type TypesPageResponse struct {
	NextKey []byte
	Total   uint64
}

// IAsyncMetaData contains all meta data concerning the IAsync contract.
var IAsyncMetaData = &bind.MetaData{
	ABI: "[{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"uint64\",\"name\":\"futureId\",\"type\":\"uint64\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"creator\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"string\",\"name\":\"handler\",\"type\":\"string\"},{\"indexed\":false,\"internalType\":\"address\",\"name\":\"callbackAddress\",\"type\":\"address\"}],\"name\":\"CreateFuture\",\"type\":\"event\"},{\"inputs\":[{\"internalType\":\"string\",\"name\":\"handler\",\"type\":\"string\"},{\"internalType\":\"bytes\",\"name\":\"input\",\"type\":\"bytes\"},{\"internalType\":\"address\",\"name\":\"callback\",\"type\":\"address\"}],\"name\":\"addFuture\",\"outputs\":[{\"internalType\":\"uint64\",\"name\":\"futureId\",\"type\":\"uint64\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint64\",\"name\":\"futureId\",\"type\":\"uint64\"}],\"name\":\"futureById\",\"outputs\":[{\"components\":[{\"components\":[{\"components\":[{\"internalType\":\"uint64\",\"name\":\"id\",\"type\":\"uint64\"},{\"internalType\":\"address\",\"name\":\"creator\",\"type\":\"address\"},{\"internalType\":\"string\",\"name\":\"handler\",\"type\":\"string\"},{\"internalType\":\"bytes\",\"name\":\"input\",\"type\":\"bytes\"}],\"internalType\":\"structFuture\",\"name\":\"future\",\"type\":\"tuple\"},{\"components\":[{\"internalType\":\"uint64\",\"name\":\"futureId\",\"type\":\"uint64\"},{\"internalType\":\"bytes\",\"name\":\"Voter\",\"type\":\"bytes\"},{\"internalType\":\"enumFutureVoteType\",\"name\":\"vote\",\"type\":\"uint8\"}],\"internalType\":\"structFutureVote[]\",\"name\":\"votes\",\"type\":\"tuple[]\"},{\"components\":[{\"internalType\":\"uint64\",\"name\":\"id\",\"type\":\"uint64\"},{\"internalType\":\"bytes\",\"name\":\"output\",\"type\":\"bytes\"},{\"internalType\":\"bytes\",\"name\":\"submitter\",\"type\":\"bytes\"}],\"internalType\":\"structFutureResult\",\"name\":\"result\",\"type\":\"tuple\"}],\"internalType\":\"structFutureResponse\",\"name\":\"futureResponse\",\"type\":\"tuple\"}],\"internalType\":\"structFutureByIdResponse\",\"name\":\"response\",\"type\":\"tuple\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes\",\"name\":\"key\",\"type\":\"bytes\"},{\"internalType\":\"uint64\",\"name\":\"offset\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"limit\",\"type\":\"uint64\"},{\"internalType\":\"bool\",\"name\":\"countTotal\",\"type\":\"bool\"},{\"internalType\":\"bool\",\"name\":\"reverse\",\"type\":\"bool\"}],\"internalType\":\"structTypes.PageRequest\",\"name\":\"pagination\",\"type\":\"tuple\"},{\"internalType\":\"address\",\"name\":\"creator\",\"type\":\"address\"}],\"name\":\"futures\",\"outputs\":[{\"components\":[{\"components\":[{\"internalType\":\"bytes\",\"name\":\"nextKey\",\"type\":\"bytes\"},{\"internalType\":\"uint64\",\"name\":\"total\",\"type\":\"uint64\"}],\"internalType\":\"structTypes.PageResponse\",\"name\":\"pagination\",\"type\":\"tuple\"},{\"components\":[{\"components\":[{\"internalType\":\"uint64\",\"name\":\"id\",\"type\":\"uint64\"},{\"internalType\":\"address\",\"name\":\"creator\",\"type\":\"address\"},{\"internalType\":\"string\",\"name\":\"handler\",\"type\":\"string\"},{\"internalType\":\"bytes\",\"name\":\"input\",\"type\":\"bytes\"}],\"internalType\":\"structFuture\",\"name\":\"future\",\"type\":\"tuple\"},{\"components\":[{\"internalType\":\"uint64\",\"name\":\"futureId\",\"type\":\"uint64\"},{\"internalType\":\"bytes\",\"name\":\"Voter\",\"type\":\"bytes\"},{\"internalType\":\"enumFutureVoteType\",\"name\":\"vote\",\"type\":\"uint8\"}],\"internalType\":\"structFutureVote[]\",\"name\":\"votes\",\"type\":\"tuple[]\"},{\"components\":[{\"internalType\":\"uint64\",\"name\":\"id\",\"type\":\"uint64\"},{\"internalType\":\"bytes\",\"name\":\"output\",\"type\":\"bytes\"},{\"internalType\":\"bytes\",\"name\":\"submitter\",\"type\":\"bytes\"}],\"internalType\":\"structFutureResult\",\"name\":\"result\",\"type\":\"tuple\"}],\"internalType\":\"structFutureResponse[]\",\"name\":\"futures\",\"type\":\"tuple[]\"}],\"internalType\":\"structFuturesResponse\",\"name\":\"response\",\"type\":\"tuple\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes\",\"name\":\"key\",\"type\":\"bytes\"},{\"internalType\":\"uint64\",\"name\":\"offset\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"limit\",\"type\":\"uint64\"},{\"internalType\":\"bool\",\"name\":\"countTotal\",\"type\":\"bool\"},{\"internalType\":\"bool\",\"name\":\"reverse\",\"type\":\"bool\"}],\"internalType\":\"structTypes.PageRequest\",\"name\":\"pagination\",\"type\":\"tuple\"}],\"name\":\"pendingFutures\",\"outputs\":[{\"components\":[{\"components\":[{\"internalType\":\"bytes\",\"name\":\"nextKey\",\"type\":\"bytes\"},{\"internalType\":\"uint64\",\"name\":\"total\",\"type\":\"uint64\"}],\"internalType\":\"structTypes.PageResponse\",\"name\":\"pagination\",\"type\":\"tuple\"},{\"components\":[{\"internalType\":\"uint64\",\"name\":\"id\",\"type\":\"uint64\"},{\"internalType\":\"address\",\"name\":\"creator\",\"type\":\"address\"},{\"internalType\":\"string\",\"name\":\"handler\",\"type\":\"string\"},{\"internalType\":\"bytes\",\"name\":\"input\",\"type\":\"bytes\"}],\"internalType\":\"structFuture[]\",\"name\":\"futures\",\"type\":\"tuple[]\"}],\"internalType\":\"structPendingFuturesResponse\",\"name\":\"response\",\"type\":\"tuple\"}],\"stateMutability\":\"view\",\"type\":\"function\"}]",
}

// IAsyncABI is the input ABI used to generate the binding from.
// Deprecated: Use IAsyncMetaData.ABI instead.
var IAsyncABI = IAsyncMetaData.ABI

// IAsync is an auto generated Go binding around an Ethereum contract.
type IAsync struct {
	IAsyncCaller     // Read-only binding to the contract
	IAsyncTransactor // Write-only binding to the contract
	IAsyncFilterer   // Log filterer for contract events
}

// IAsyncCaller is an auto generated read-only Go binding around an Ethereum contract.
type IAsyncCaller struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// IAsyncTransactor is an auto generated write-only Go binding around an Ethereum contract.
type IAsyncTransactor struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// IAsyncFilterer is an auto generated log filtering Go binding around an Ethereum contract events.
type IAsyncFilterer struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// IAsyncSession is an auto generated Go binding around an Ethereum contract,
// with pre-set call and transact options.
type IAsyncSession struct {
	Contract     *IAsync           // Generic contract binding to set the session for
	CallOpts     bind.CallOpts     // Call options to use throughout this session
	TransactOpts bind.TransactOpts // Transaction auth options to use throughout this session
}

// IAsyncCallerSession is an auto generated read-only Go binding around an Ethereum contract,
// with pre-set call options.
type IAsyncCallerSession struct {
	Contract *IAsyncCaller // Generic contract caller binding to set the session for
	CallOpts bind.CallOpts // Call options to use throughout this session
}

// IAsyncTransactorSession is an auto generated write-only Go binding around an Ethereum contract,
// with pre-set transact options.
type IAsyncTransactorSession struct {
	Contract     *IAsyncTransactor // Generic contract transactor binding to set the session for
	TransactOpts bind.TransactOpts // Transaction auth options to use throughout this session
}

// IAsyncRaw is an auto generated low-level Go binding around an Ethereum contract.
type IAsyncRaw struct {
	Contract *IAsync // Generic contract binding to access the raw methods on
}

// IAsyncCallerRaw is an auto generated low-level read-only Go binding around an Ethereum contract.
type IAsyncCallerRaw struct {
	Contract *IAsyncCaller // Generic read-only contract binding to access the raw methods on
}

// IAsyncTransactorRaw is an auto generated low-level write-only Go binding around an Ethereum contract.
type IAsyncTransactorRaw struct {
	Contract *IAsyncTransactor // Generic write-only contract binding to access the raw methods on
}

// NewIAsync creates a new instance of IAsync, bound to a specific deployed contract.
func NewIAsync(address common.Address, backend bind.ContractBackend) (*IAsync, error) {
	contract, err := bindIAsync(address, backend, backend, backend)
	if err != nil {
		return nil, err
	}
	return &IAsync{IAsyncCaller: IAsyncCaller{contract: contract}, IAsyncTransactor: IAsyncTransactor{contract: contract}, IAsyncFilterer: IAsyncFilterer{contract: contract}}, nil
}

// NewIAsyncCaller creates a new read-only instance of IAsync, bound to a specific deployed contract.
func NewIAsyncCaller(address common.Address, caller bind.ContractCaller) (*IAsyncCaller, error) {
	contract, err := bindIAsync(address, caller, nil, nil)
	if err != nil {
		return nil, err
	}
	return &IAsyncCaller{contract: contract}, nil
}

// NewIAsyncTransactor creates a new write-only instance of IAsync, bound to a specific deployed contract.
func NewIAsyncTransactor(address common.Address, transactor bind.ContractTransactor) (*IAsyncTransactor, error) {
	contract, err := bindIAsync(address, nil, transactor, nil)
	if err != nil {
		return nil, err
	}
	return &IAsyncTransactor{contract: contract}, nil
}

// NewIAsyncFilterer creates a new log filterer instance of IAsync, bound to a specific deployed contract.
func NewIAsyncFilterer(address common.Address, filterer bind.ContractFilterer) (*IAsyncFilterer, error) {
	contract, err := bindIAsync(address, nil, nil, filterer)
	if err != nil {
		return nil, err
	}
	return &IAsyncFilterer{contract: contract}, nil
}

// bindIAsync binds a generic wrapper to an already deployed contract.
func bindIAsync(address common.Address, caller bind.ContractCaller, transactor bind.ContractTransactor, filterer bind.ContractFilterer) (*bind.BoundContract, error) {
	parsed, err := IAsyncMetaData.GetAbi()
	if err != nil {
		return nil, err
	}
	return bind.NewBoundContract(address, *parsed, caller, transactor, filterer), nil
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_IAsync *IAsyncRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _IAsync.Contract.IAsyncCaller.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_IAsync *IAsyncRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _IAsync.Contract.IAsyncTransactor.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_IAsync *IAsyncRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _IAsync.Contract.IAsyncTransactor.contract.Transact(opts, method, params...)
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_IAsync *IAsyncCallerRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _IAsync.Contract.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_IAsync *IAsyncTransactorRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _IAsync.Contract.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_IAsync *IAsyncTransactorRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _IAsync.Contract.contract.Transact(opts, method, params...)
}

// FutureById is a free data retrieval call binding the contract method 0x012d56e0.
//
// Solidity: function futureById(uint64 futureId) view returns((((uint64,address,string,bytes),(uint64,bytes,uint8)[],(uint64,bytes,bytes))) response)
func (_IAsync *IAsyncCaller) FutureById(opts *bind.CallOpts, futureId uint64) (FutureByIdResponse, error) {
	var out []interface{}
	err := _IAsync.contract.Call(opts, &out, "futureById", futureId)

	if err != nil {
		return *new(FutureByIdResponse), err
	}

	out0 := *abi.ConvertType(out[0], new(FutureByIdResponse)).(*FutureByIdResponse)

	return out0, err

}

// FutureById is a free data retrieval call binding the contract method 0x012d56e0.
//
// Solidity: function futureById(uint64 futureId) view returns((((uint64,address,string,bytes),(uint64,bytes,uint8)[],(uint64,bytes,bytes))) response)
func (_IAsync *IAsyncSession) FutureById(futureId uint64) (FutureByIdResponse, error) {
	return _IAsync.Contract.FutureById(&_IAsync.CallOpts, futureId)
}

// FutureById is a free data retrieval call binding the contract method 0x012d56e0.
//
// Solidity: function futureById(uint64 futureId) view returns((((uint64,address,string,bytes),(uint64,bytes,uint8)[],(uint64,bytes,bytes))) response)
func (_IAsync *IAsyncCallerSession) FutureById(futureId uint64) (FutureByIdResponse, error) {
	return _IAsync.Contract.FutureById(&_IAsync.CallOpts, futureId)
}

// Futures is a free data retrieval call binding the contract method 0x83817c27.
//
// Solidity: function futures((bytes,uint64,uint64,bool,bool) pagination, address creator) view returns(((bytes,uint64),((uint64,address,string,bytes),(uint64,bytes,uint8)[],(uint64,bytes,bytes))[]) response)
func (_IAsync *IAsyncCaller) Futures(opts *bind.CallOpts, pagination TypesPageRequest, creator common.Address) (FuturesResponse, error) {
	var out []interface{}
	err := _IAsync.contract.Call(opts, &out, "futures", pagination, creator)

	if err != nil {
		return *new(FuturesResponse), err
	}

	out0 := *abi.ConvertType(out[0], new(FuturesResponse)).(*FuturesResponse)

	return out0, err

}

// Futures is a free data retrieval call binding the contract method 0x83817c27.
//
// Solidity: function futures((bytes,uint64,uint64,bool,bool) pagination, address creator) view returns(((bytes,uint64),((uint64,address,string,bytes),(uint64,bytes,uint8)[],(uint64,bytes,bytes))[]) response)
func (_IAsync *IAsyncSession) Futures(pagination TypesPageRequest, creator common.Address) (FuturesResponse, error) {
	return _IAsync.Contract.Futures(&_IAsync.CallOpts, pagination, creator)
}

// Futures is a free data retrieval call binding the contract method 0x83817c27.
//
// Solidity: function futures((bytes,uint64,uint64,bool,bool) pagination, address creator) view returns(((bytes,uint64),((uint64,address,string,bytes),(uint64,bytes,uint8)[],(uint64,bytes,bytes))[]) response)
func (_IAsync *IAsyncCallerSession) Futures(pagination TypesPageRequest, creator common.Address) (FuturesResponse, error) {
	return _IAsync.Contract.Futures(&_IAsync.CallOpts, pagination, creator)
}

// PendingFutures is a free data retrieval call binding the contract method 0xddebca34.
//
// Solidity: function pendingFutures((bytes,uint64,uint64,bool,bool) pagination) view returns(((bytes,uint64),(uint64,address,string,bytes)[]) response)
func (_IAsync *IAsyncCaller) PendingFutures(opts *bind.CallOpts, pagination TypesPageRequest) (PendingFuturesResponse, error) {
	var out []interface{}
	err := _IAsync.contract.Call(opts, &out, "pendingFutures", pagination)

	if err != nil {
		return *new(PendingFuturesResponse), err
	}

	out0 := *abi.ConvertType(out[0], new(PendingFuturesResponse)).(*PendingFuturesResponse)

	return out0, err

}

// PendingFutures is a free data retrieval call binding the contract method 0xddebca34.
//
// Solidity: function pendingFutures((bytes,uint64,uint64,bool,bool) pagination) view returns(((bytes,uint64),(uint64,address,string,bytes)[]) response)
func (_IAsync *IAsyncSession) PendingFutures(pagination TypesPageRequest) (PendingFuturesResponse, error) {
	return _IAsync.Contract.PendingFutures(&_IAsync.CallOpts, pagination)
}

// PendingFutures is a free data retrieval call binding the contract method 0xddebca34.
//
// Solidity: function pendingFutures((bytes,uint64,uint64,bool,bool) pagination) view returns(((bytes,uint64),(uint64,address,string,bytes)[]) response)
func (_IAsync *IAsyncCallerSession) PendingFutures(pagination TypesPageRequest) (PendingFuturesResponse, error) {
	return _IAsync.Contract.PendingFutures(&_IAsync.CallOpts, pagination)
}

// AddFuture is a paid mutator transaction binding the contract method 0xa2835a9b.
//
// Solidity: function addFuture(string handler, bytes input, address callback) returns(uint64 futureId)
func (_IAsync *IAsyncTransactor) AddFuture(opts *bind.TransactOpts, handler string, input []byte, callback common.Address) (*types.Transaction, error) {
	return _IAsync.contract.Transact(opts, "addFuture", handler, input, callback)
}

// AddFuture is a paid mutator transaction binding the contract method 0xa2835a9b.
//
// Solidity: function addFuture(string handler, bytes input, address callback) returns(uint64 futureId)
func (_IAsync *IAsyncSession) AddFuture(handler string, input []byte, callback common.Address) (*types.Transaction, error) {
	return _IAsync.Contract.AddFuture(&_IAsync.TransactOpts, handler, input, callback)
}

// AddFuture is a paid mutator transaction binding the contract method 0xa2835a9b.
//
// Solidity: function addFuture(string handler, bytes input, address callback) returns(uint64 futureId)
func (_IAsync *IAsyncTransactorSession) AddFuture(handler string, input []byte, callback common.Address) (*types.Transaction, error) {
	return _IAsync.Contract.AddFuture(&_IAsync.TransactOpts, handler, input, callback)
}

// IAsyncCreateFutureIterator is returned from FilterCreateFuture and is used to iterate over the raw logs and unpacked data for CreateFuture events raised by the IAsync contract.
type IAsyncCreateFutureIterator struct {
	Event *IAsyncCreateFuture // Event containing the contract specifics and raw log

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
func (it *IAsyncCreateFutureIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(IAsyncCreateFuture)
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
		it.Event = new(IAsyncCreateFuture)
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
func (it *IAsyncCreateFutureIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *IAsyncCreateFutureIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// IAsyncCreateFuture represents a CreateFuture event raised by the IAsync contract.
type IAsyncCreateFuture struct {
	FutureId        uint64
	Creator         common.Address
	Handler         string
	CallbackAddress common.Address
	Raw             types.Log // Blockchain specific contextual infos
}

// FilterCreateFuture is a free log retrieval operation binding the contract event 0x3fb77420900d4e68b2356c7b140d3d8fefa4aadbce83de2a52a2c3654f18732d.
//
// Solidity: event CreateFuture(uint64 indexed futureId, address indexed creator, string handler, address callbackAddress)
func (_IAsync *IAsyncFilterer) FilterCreateFuture(opts *bind.FilterOpts, futureId []uint64, creator []common.Address) (*IAsyncCreateFutureIterator, error) {

	var futureIdRule []interface{}
	for _, futureIdItem := range futureId {
		futureIdRule = append(futureIdRule, futureIdItem)
	}
	var creatorRule []interface{}
	for _, creatorItem := range creator {
		creatorRule = append(creatorRule, creatorItem)
	}

	logs, sub, err := _IAsync.contract.FilterLogs(opts, "CreateFuture", futureIdRule, creatorRule)
	if err != nil {
		return nil, err
	}
	return &IAsyncCreateFutureIterator{contract: _IAsync.contract, event: "CreateFuture", logs: logs, sub: sub}, nil
}

// WatchCreateFuture is a free log subscription operation binding the contract event 0x3fb77420900d4e68b2356c7b140d3d8fefa4aadbce83de2a52a2c3654f18732d.
//
// Solidity: event CreateFuture(uint64 indexed futureId, address indexed creator, string handler, address callbackAddress)
func (_IAsync *IAsyncFilterer) WatchCreateFuture(opts *bind.WatchOpts, sink chan<- *IAsyncCreateFuture, futureId []uint64, creator []common.Address) (event.Subscription, error) {

	var futureIdRule []interface{}
	for _, futureIdItem := range futureId {
		futureIdRule = append(futureIdRule, futureIdItem)
	}
	var creatorRule []interface{}
	for _, creatorItem := range creator {
		creatorRule = append(creatorRule, creatorItem)
	}

	logs, sub, err := _IAsync.contract.WatchLogs(opts, "CreateFuture", futureIdRule, creatorRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(IAsyncCreateFuture)
				if err := _IAsync.contract.UnpackLog(event, "CreateFuture", log); err != nil {
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

// ParseCreateFuture is a log parse operation binding the contract event 0x3fb77420900d4e68b2356c7b140d3d8fefa4aadbce83de2a52a2c3654f18732d.
//
// Solidity: event CreateFuture(uint64 indexed futureId, address indexed creator, string handler, address callbackAddress)
func (_IAsync *IAsyncFilterer) ParseCreateFuture(log types.Log) (*IAsyncCreateFuture, error) {
	event := new(IAsyncCreateFuture)
	if err := _IAsync.contract.UnpackLog(event, "CreateFuture", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}
