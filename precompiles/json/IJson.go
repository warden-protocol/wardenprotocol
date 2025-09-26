// Code generated - DO NOT EDIT.
// This file is a generated binding and any manual changes will be lost.

package json

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

// IJsonMetaData contains all meta data concerning the IJson contract.
var IJsonMetaData = &bind.MetaData{
	ABI: "[{\"inputs\":[{\"internalType\":\"enumJsonOp[]\",\"name\":\"ops\",\"type\":\"uint8[]\"},{\"internalType\":\"bytes[]\",\"name\":\"data\",\"type\":\"bytes[]\"}],\"name\":\"build\",\"outputs\":[{\"internalType\":\"bytes\",\"name\":\"json\",\"type\":\"bytes\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"jsonBytes\",\"type\":\"bytes\"},{\"internalType\":\"bytes\",\"name\":\"schema\",\"type\":\"bytes\"}],\"name\":\"parse\",\"outputs\":[{\"internalType\":\"bytes\",\"name\":\"abiEncodedData\",\"type\":\"bytes\"}],\"stateMutability\":\"view\",\"type\":\"function\"}]",
}

// IJsonABI is the input ABI used to generate the binding from.
// Deprecated: Use IJsonMetaData.ABI instead.
var IJsonABI = IJsonMetaData.ABI

// IJson is an auto generated Go binding around an Ethereum contract.
type IJson struct {
	IJsonCaller     // Read-only binding to the contract
	IJsonTransactor // Write-only binding to the contract
	IJsonFilterer   // Log filterer for contract events
}

// IJsonCaller is an auto generated read-only Go binding around an Ethereum contract.
type IJsonCaller struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// IJsonTransactor is an auto generated write-only Go binding around an Ethereum contract.
type IJsonTransactor struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// IJsonFilterer is an auto generated log filtering Go binding around an Ethereum contract events.
type IJsonFilterer struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// IJsonSession is an auto generated Go binding around an Ethereum contract,
// with pre-set call and transact options.
type IJsonSession struct {
	Contract     *IJson            // Generic contract binding to set the session for
	CallOpts     bind.CallOpts     // Call options to use throughout this session
	TransactOpts bind.TransactOpts // Transaction auth options to use throughout this session
}

// IJsonCallerSession is an auto generated read-only Go binding around an Ethereum contract,
// with pre-set call options.
type IJsonCallerSession struct {
	Contract *IJsonCaller  // Generic contract caller binding to set the session for
	CallOpts bind.CallOpts // Call options to use throughout this session
}

// IJsonTransactorSession is an auto generated write-only Go binding around an Ethereum contract,
// with pre-set transact options.
type IJsonTransactorSession struct {
	Contract     *IJsonTransactor  // Generic contract transactor binding to set the session for
	TransactOpts bind.TransactOpts // Transaction auth options to use throughout this session
}

// IJsonRaw is an auto generated low-level Go binding around an Ethereum contract.
type IJsonRaw struct {
	Contract *IJson // Generic contract binding to access the raw methods on
}

// IJsonCallerRaw is an auto generated low-level read-only Go binding around an Ethereum contract.
type IJsonCallerRaw struct {
	Contract *IJsonCaller // Generic read-only contract binding to access the raw methods on
}

// IJsonTransactorRaw is an auto generated low-level write-only Go binding around an Ethereum contract.
type IJsonTransactorRaw struct {
	Contract *IJsonTransactor // Generic write-only contract binding to access the raw methods on
}

// NewIJson creates a new instance of IJson, bound to a specific deployed contract.
func NewIJson(address common.Address, backend bind.ContractBackend) (*IJson, error) {
	contract, err := bindIJson(address, backend, backend, backend)
	if err != nil {
		return nil, err
	}
	return &IJson{IJsonCaller: IJsonCaller{contract: contract}, IJsonTransactor: IJsonTransactor{contract: contract}, IJsonFilterer: IJsonFilterer{contract: contract}}, nil
}

// NewIJsonCaller creates a new read-only instance of IJson, bound to a specific deployed contract.
func NewIJsonCaller(address common.Address, caller bind.ContractCaller) (*IJsonCaller, error) {
	contract, err := bindIJson(address, caller, nil, nil)
	if err != nil {
		return nil, err
	}
	return &IJsonCaller{contract: contract}, nil
}

// NewIJsonTransactor creates a new write-only instance of IJson, bound to a specific deployed contract.
func NewIJsonTransactor(address common.Address, transactor bind.ContractTransactor) (*IJsonTransactor, error) {
	contract, err := bindIJson(address, nil, transactor, nil)
	if err != nil {
		return nil, err
	}
	return &IJsonTransactor{contract: contract}, nil
}

// NewIJsonFilterer creates a new log filterer instance of IJson, bound to a specific deployed contract.
func NewIJsonFilterer(address common.Address, filterer bind.ContractFilterer) (*IJsonFilterer, error) {
	contract, err := bindIJson(address, nil, nil, filterer)
	if err != nil {
		return nil, err
	}
	return &IJsonFilterer{contract: contract}, nil
}

// bindIJson binds a generic wrapper to an already deployed contract.
func bindIJson(address common.Address, caller bind.ContractCaller, transactor bind.ContractTransactor, filterer bind.ContractFilterer) (*bind.BoundContract, error) {
	parsed, err := IJsonMetaData.GetAbi()
	if err != nil {
		return nil, err
	}
	return bind.NewBoundContract(address, *parsed, caller, transactor, filterer), nil
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_IJson *IJsonRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _IJson.Contract.IJsonCaller.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_IJson *IJsonRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _IJson.Contract.IJsonTransactor.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_IJson *IJsonRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _IJson.Contract.IJsonTransactor.contract.Transact(opts, method, params...)
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_IJson *IJsonCallerRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _IJson.Contract.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_IJson *IJsonTransactorRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _IJson.Contract.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_IJson *IJsonTransactorRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _IJson.Contract.contract.Transact(opts, method, params...)
}

// Build is a free data retrieval call binding the contract method 0x9cdfbfa8.
//
// Solidity: function build(uint8[] ops, bytes[] data) pure returns(bytes json)
func (_IJson *IJsonCaller) Build(opts *bind.CallOpts, ops []uint8, data [][]byte) ([]byte, error) {
	var out []interface{}
	err := _IJson.contract.Call(opts, &out, "build", ops, data)

	if err != nil {
		return *new([]byte), err
	}

	out0 := *abi.ConvertType(out[0], new([]byte)).(*[]byte)

	return out0, err

}

// Build is a free data retrieval call binding the contract method 0x9cdfbfa8.
//
// Solidity: function build(uint8[] ops, bytes[] data) pure returns(bytes json)
func (_IJson *IJsonSession) Build(ops []uint8, data [][]byte) ([]byte, error) {
	return _IJson.Contract.Build(&_IJson.CallOpts, ops, data)
}

// Build is a free data retrieval call binding the contract method 0x9cdfbfa8.
//
// Solidity: function build(uint8[] ops, bytes[] data) pure returns(bytes json)
func (_IJson *IJsonCallerSession) Build(ops []uint8, data [][]byte) ([]byte, error) {
	return _IJson.Contract.Build(&_IJson.CallOpts, ops, data)
}

// Parse is a free data retrieval call binding the contract method 0x88956bb8.
//
// Solidity: function parse(bytes jsonBytes, bytes schema) view returns(bytes abiEncodedData)
func (_IJson *IJsonCaller) Parse(opts *bind.CallOpts, jsonBytes []byte, schema []byte) ([]byte, error) {
	var out []interface{}
	err := _IJson.contract.Call(opts, &out, "parse", jsonBytes, schema)

	if err != nil {
		return *new([]byte), err
	}

	out0 := *abi.ConvertType(out[0], new([]byte)).(*[]byte)

	return out0, err

}

// Parse is a free data retrieval call binding the contract method 0x88956bb8.
//
// Solidity: function parse(bytes jsonBytes, bytes schema) view returns(bytes abiEncodedData)
func (_IJson *IJsonSession) Parse(jsonBytes []byte, schema []byte) ([]byte, error) {
	return _IJson.Contract.Parse(&_IJson.CallOpts, jsonBytes, schema)
}

// Parse is a free data retrieval call binding the contract method 0x88956bb8.
//
// Solidity: function parse(bytes jsonBytes, bytes schema) view returns(bytes abiEncodedData)
func (_IJson *IJsonCallerSession) Parse(jsonBytes []byte, schema []byte) ([]byte, error) {
	return _IJson.Contract.Parse(&_IJson.CallOpts, jsonBytes, schema)
}
