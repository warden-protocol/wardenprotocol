// Code generated - DO NOT EDIT.
// This file is a generated binding and any manual changes will be lost.

package sched

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

// Callback is an auto generated low-level Go binding around an user-defined struct.
type Callback struct {
	Id           uint64
	AddressValue common.Address
	GasLimit     uint64
}

// CallbackByIdResponse is an auto generated low-level Go binding around an user-defined struct.
type CallbackByIdResponse struct {
	CallbackResponse CallbackResponse
}

// CallbackResponse is an auto generated low-level Go binding around an user-defined struct.
type CallbackResponse struct {
	Callback Callback
	Result   CallbackResult
}

// CallbackResult is an auto generated low-level Go binding around an user-defined struct.
type CallbackResult struct {
	Status uint8
	Result []byte
}

// CallbacksResponse is an auto generated low-level Go binding around an user-defined struct.
type CallbacksResponse struct {
	Pagination TypesPageResponse
	Callbacks  []CallbackResponse
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

// ISchedMetaData contains all meta data concerning the ISched contract.
var ISchedMetaData = &bind.MetaData{
	ABI: "[{\"inputs\":[{\"internalType\":\"uint64\",\"name\":\"id\",\"type\":\"uint64\"}],\"name\":\"callbackById\",\"outputs\":[{\"components\":[{\"components\":[{\"components\":[{\"internalType\":\"uint64\",\"name\":\"id\",\"type\":\"uint64\"},{\"internalType\":\"address\",\"name\":\"addressValue\",\"type\":\"address\"},{\"internalType\":\"uint64\",\"name\":\"gasLimit\",\"type\":\"uint64\"}],\"internalType\":\"structCallback\",\"name\":\"callback\",\"type\":\"tuple\"},{\"components\":[{\"internalType\":\"enumCallbackStatus\",\"name\":\"status\",\"type\":\"uint8\"},{\"internalType\":\"bytes\",\"name\":\"result\",\"type\":\"bytes\"}],\"internalType\":\"structCallbackResult\",\"name\":\"result\",\"type\":\"tuple\"}],\"internalType\":\"structCallbackResponse\",\"name\":\"callbackResponse\",\"type\":\"tuple\"}],\"internalType\":\"structCallbackByIdResponse\",\"name\":\"response\",\"type\":\"tuple\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes\",\"name\":\"key\",\"type\":\"bytes\"},{\"internalType\":\"uint64\",\"name\":\"offset\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"limit\",\"type\":\"uint64\"},{\"internalType\":\"bool\",\"name\":\"countTotal\",\"type\":\"bool\"},{\"internalType\":\"bool\",\"name\":\"reverse\",\"type\":\"bool\"}],\"internalType\":\"structTypes.PageRequest\",\"name\":\"pagination\",\"type\":\"tuple\"}],\"name\":\"callbacks\",\"outputs\":[{\"components\":[{\"components\":[{\"internalType\":\"bytes\",\"name\":\"nextKey\",\"type\":\"bytes\"},{\"internalType\":\"uint64\",\"name\":\"total\",\"type\":\"uint64\"}],\"internalType\":\"structTypes.PageResponse\",\"name\":\"pagination\",\"type\":\"tuple\"},{\"components\":[{\"components\":[{\"internalType\":\"uint64\",\"name\":\"id\",\"type\":\"uint64\"},{\"internalType\":\"address\",\"name\":\"addressValue\",\"type\":\"address\"},{\"internalType\":\"uint64\",\"name\":\"gasLimit\",\"type\":\"uint64\"}],\"internalType\":\"structCallback\",\"name\":\"callback\",\"type\":\"tuple\"},{\"components\":[{\"internalType\":\"enumCallbackStatus\",\"name\":\"status\",\"type\":\"uint8\"},{\"internalType\":\"bytes\",\"name\":\"result\",\"type\":\"bytes\"}],\"internalType\":\"structCallbackResult\",\"name\":\"result\",\"type\":\"tuple\"}],\"internalType\":\"structCallbackResponse[]\",\"name\":\"callbacks\",\"type\":\"tuple[]\"}],\"internalType\":\"structCallbacksResponse\",\"name\":\"response\",\"type\":\"tuple\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"getAddress\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"}]",
}

// ISchedABI is the input ABI used to generate the binding from.
// Deprecated: Use ISchedMetaData.ABI instead.
var ISchedABI = ISchedMetaData.ABI

// ISched is an auto generated Go binding around an Ethereum contract.
type ISched struct {
	ISchedCaller     // Read-only binding to the contract
	ISchedTransactor // Write-only binding to the contract
	ISchedFilterer   // Log filterer for contract events
}

// ISchedCaller is an auto generated read-only Go binding around an Ethereum contract.
type ISchedCaller struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// ISchedTransactor is an auto generated write-only Go binding around an Ethereum contract.
type ISchedTransactor struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// ISchedFilterer is an auto generated log filtering Go binding around an Ethereum contract events.
type ISchedFilterer struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// ISchedSession is an auto generated Go binding around an Ethereum contract,
// with pre-set call and transact options.
type ISchedSession struct {
	Contract     *ISched           // Generic contract binding to set the session for
	CallOpts     bind.CallOpts     // Call options to use throughout this session
	TransactOpts bind.TransactOpts // Transaction auth options to use throughout this session
}

// ISchedCallerSession is an auto generated read-only Go binding around an Ethereum contract,
// with pre-set call options.
type ISchedCallerSession struct {
	Contract *ISchedCaller // Generic contract caller binding to set the session for
	CallOpts bind.CallOpts // Call options to use throughout this session
}

// ISchedTransactorSession is an auto generated write-only Go binding around an Ethereum contract,
// with pre-set transact options.
type ISchedTransactorSession struct {
	Contract     *ISchedTransactor // Generic contract transactor binding to set the session for
	TransactOpts bind.TransactOpts // Transaction auth options to use throughout this session
}

// ISchedRaw is an auto generated low-level Go binding around an Ethereum contract.
type ISchedRaw struct {
	Contract *ISched // Generic contract binding to access the raw methods on
}

// ISchedCallerRaw is an auto generated low-level read-only Go binding around an Ethereum contract.
type ISchedCallerRaw struct {
	Contract *ISchedCaller // Generic read-only contract binding to access the raw methods on
}

// ISchedTransactorRaw is an auto generated low-level write-only Go binding around an Ethereum contract.
type ISchedTransactorRaw struct {
	Contract *ISchedTransactor // Generic write-only contract binding to access the raw methods on
}

// NewISched creates a new instance of ISched, bound to a specific deployed contract.
func NewISched(address common.Address, backend bind.ContractBackend) (*ISched, error) {
	contract, err := bindISched(address, backend, backend, backend)
	if err != nil {
		return nil, err
	}
	return &ISched{ISchedCaller: ISchedCaller{contract: contract}, ISchedTransactor: ISchedTransactor{contract: contract}, ISchedFilterer: ISchedFilterer{contract: contract}}, nil
}

// NewISchedCaller creates a new read-only instance of ISched, bound to a specific deployed contract.
func NewISchedCaller(address common.Address, caller bind.ContractCaller) (*ISchedCaller, error) {
	contract, err := bindISched(address, caller, nil, nil)
	if err != nil {
		return nil, err
	}
	return &ISchedCaller{contract: contract}, nil
}

// NewISchedTransactor creates a new write-only instance of ISched, bound to a specific deployed contract.
func NewISchedTransactor(address common.Address, transactor bind.ContractTransactor) (*ISchedTransactor, error) {
	contract, err := bindISched(address, nil, transactor, nil)
	if err != nil {
		return nil, err
	}
	return &ISchedTransactor{contract: contract}, nil
}

// NewISchedFilterer creates a new log filterer instance of ISched, bound to a specific deployed contract.
func NewISchedFilterer(address common.Address, filterer bind.ContractFilterer) (*ISchedFilterer, error) {
	contract, err := bindISched(address, nil, nil, filterer)
	if err != nil {
		return nil, err
	}
	return &ISchedFilterer{contract: contract}, nil
}

// bindISched binds a generic wrapper to an already deployed contract.
func bindISched(address common.Address, caller bind.ContractCaller, transactor bind.ContractTransactor, filterer bind.ContractFilterer) (*bind.BoundContract, error) {
	parsed, err := ISchedMetaData.GetAbi()
	if err != nil {
		return nil, err
	}
	return bind.NewBoundContract(address, *parsed, caller, transactor, filterer), nil
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_ISched *ISchedRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _ISched.Contract.ISchedCaller.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_ISched *ISchedRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _ISched.Contract.ISchedTransactor.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_ISched *ISchedRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _ISched.Contract.ISchedTransactor.contract.Transact(opts, method, params...)
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_ISched *ISchedCallerRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _ISched.Contract.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_ISched *ISchedTransactorRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _ISched.Contract.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_ISched *ISchedTransactorRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _ISched.Contract.contract.Transact(opts, method, params...)
}

// CallbackById is a free data retrieval call binding the contract method 0x9446c851.
//
// Solidity: function callbackById(uint64 id) view returns((((uint64,address,uint64),(uint8,bytes))) response)
func (_ISched *ISchedCaller) CallbackById(opts *bind.CallOpts, id uint64) (CallbackByIdResponse, error) {
	var out []interface{}
	err := _ISched.contract.Call(opts, &out, "callbackById", id)

	if err != nil {
		return *new(CallbackByIdResponse), err
	}

	out0 := *abi.ConvertType(out[0], new(CallbackByIdResponse)).(*CallbackByIdResponse)

	return out0, err

}

// CallbackById is a free data retrieval call binding the contract method 0x9446c851.
//
// Solidity: function callbackById(uint64 id) view returns((((uint64,address,uint64),(uint8,bytes))) response)
func (_ISched *ISchedSession) CallbackById(id uint64) (CallbackByIdResponse, error) {
	return _ISched.Contract.CallbackById(&_ISched.CallOpts, id)
}

// CallbackById is a free data retrieval call binding the contract method 0x9446c851.
//
// Solidity: function callbackById(uint64 id) view returns((((uint64,address,uint64),(uint8,bytes))) response)
func (_ISched *ISchedCallerSession) CallbackById(id uint64) (CallbackByIdResponse, error) {
	return _ISched.Contract.CallbackById(&_ISched.CallOpts, id)
}

// Callbacks is a free data retrieval call binding the contract method 0x56b9e6d7.
//
// Solidity: function callbacks((bytes,uint64,uint64,bool,bool) pagination) view returns(((bytes,uint64),((uint64,address,uint64),(uint8,bytes))[]) response)
func (_ISched *ISchedCaller) Callbacks(opts *bind.CallOpts, pagination TypesPageRequest) (CallbacksResponse, error) {
	var out []interface{}
	err := _ISched.contract.Call(opts, &out, "callbacks", pagination)

	if err != nil {
		return *new(CallbacksResponse), err
	}

	out0 := *abi.ConvertType(out[0], new(CallbacksResponse)).(*CallbacksResponse)

	return out0, err

}

// Callbacks is a free data retrieval call binding the contract method 0x56b9e6d7.
//
// Solidity: function callbacks((bytes,uint64,uint64,bool,bool) pagination) view returns(((bytes,uint64),((uint64,address,uint64),(uint8,bytes))[]) response)
func (_ISched *ISchedSession) Callbacks(pagination TypesPageRequest) (CallbacksResponse, error) {
	return _ISched.Contract.Callbacks(&_ISched.CallOpts, pagination)
}

// Callbacks is a free data retrieval call binding the contract method 0x56b9e6d7.
//
// Solidity: function callbacks((bytes,uint64,uint64,bool,bool) pagination) view returns(((bytes,uint64),((uint64,address,uint64),(uint8,bytes))[]) response)
func (_ISched *ISchedCallerSession) Callbacks(pagination TypesPageRequest) (CallbacksResponse, error) {
	return _ISched.Contract.Callbacks(&_ISched.CallOpts, pagination)
}

// GetAddress is a free data retrieval call binding the contract method 0x38cc4831.
//
// Solidity: function getAddress() view returns(address)
func (_ISched *ISchedCaller) GetAddress(opts *bind.CallOpts) (common.Address, error) {
	var out []interface{}
	err := _ISched.contract.Call(opts, &out, "getAddress")

	if err != nil {
		return *new(common.Address), err
	}

	out0 := *abi.ConvertType(out[0], new(common.Address)).(*common.Address)

	return out0, err

}

// GetAddress is a free data retrieval call binding the contract method 0x38cc4831.
//
// Solidity: function getAddress() view returns(address)
func (_ISched *ISchedSession) GetAddress() (common.Address, error) {
	return _ISched.Contract.GetAddress(&_ISched.CallOpts)
}

// GetAddress is a free data retrieval call binding the contract method 0x38cc4831.
//
// Solidity: function getAddress() view returns(address)
func (_ISched *ISchedCallerSession) GetAddress() (common.Address, error) {
	return _ISched.Contract.GetAddress(&_ISched.CallOpts)
}
