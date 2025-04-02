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
	ABI: "[{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"input\",\"type\":\"bytes\"},{\"internalType\":\"string\",\"name\":\"key\",\"type\":\"string\"}],\"name\":\"get\",\"outputs\":[{\"internalType\":\"bytes\",\"name\":\"\",\"type\":\"bytes\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"input\",\"type\":\"bytes\"},{\"internalType\":\"string\",\"name\":\"key\",\"type\":\"string\"}],\"name\":\"getAddress\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"input\",\"type\":\"bytes\"},{\"internalType\":\"string\",\"name\":\"key\",\"type\":\"string\"}],\"name\":\"getAddressArray\",\"outputs\":[{\"internalType\":\"address[]\",\"name\":\"\",\"type\":\"address[]\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"input\",\"type\":\"bytes\"},{\"internalType\":\"string\",\"name\":\"key\",\"type\":\"string\"}],\"name\":\"getBool\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"input\",\"type\":\"bytes\"},{\"internalType\":\"string\",\"name\":\"key\",\"type\":\"string\"}],\"name\":\"getBoolArray\",\"outputs\":[{\"internalType\":\"bool[]\",\"name\":\"\",\"type\":\"bool[]\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"input\",\"type\":\"bytes\"},{\"internalType\":\"string\",\"name\":\"key\",\"type\":\"string\"},{\"internalType\":\"int64\",\"name\":\"decimals\",\"type\":\"int64\"}],\"name\":\"getFloat\",\"outputs\":[{\"internalType\":\"int256\",\"name\":\"\",\"type\":\"int256\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"input\",\"type\":\"bytes\"},{\"internalType\":\"string\",\"name\":\"key\",\"type\":\"string\"},{\"internalType\":\"int64\",\"name\":\"decimals\",\"type\":\"int64\"}],\"name\":\"getFloatArray\",\"outputs\":[{\"internalType\":\"int256[]\",\"name\":\"\",\"type\":\"int256[]\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"input\",\"type\":\"bytes\"},{\"internalType\":\"string\",\"name\":\"key\",\"type\":\"string\"}],\"name\":\"getInt256\",\"outputs\":[{\"internalType\":\"int256\",\"name\":\"\",\"type\":\"int256\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"input\",\"type\":\"bytes\"},{\"internalType\":\"string\",\"name\":\"key\",\"type\":\"string\"}],\"name\":\"getIntArray\",\"outputs\":[{\"internalType\":\"int256[]\",\"name\":\"\",\"type\":\"int256[]\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"input\",\"type\":\"bytes\"},{\"internalType\":\"string\",\"name\":\"key\",\"type\":\"string\"}],\"name\":\"getObject\",\"outputs\":[{\"internalType\":\"bytes\",\"name\":\"\",\"type\":\"bytes\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"input\",\"type\":\"bytes\"},{\"internalType\":\"string\",\"name\":\"key\",\"type\":\"string\"}],\"name\":\"getObjectsArray\",\"outputs\":[{\"internalType\":\"bytes[]\",\"name\":\"\",\"type\":\"bytes[]\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"input\",\"type\":\"bytes\"},{\"internalType\":\"string\",\"name\":\"key\",\"type\":\"string\"}],\"name\":\"getString\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"input\",\"type\":\"bytes\"},{\"internalType\":\"string\",\"name\":\"key\",\"type\":\"string\"}],\"name\":\"getStringArray\",\"outputs\":[{\"internalType\":\"string[]\",\"name\":\"\",\"type\":\"string[]\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"input\",\"type\":\"bytes\"},{\"internalType\":\"string\",\"name\":\"key\",\"type\":\"string\"}],\"name\":\"getUint256\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"input\",\"type\":\"bytes\"},{\"internalType\":\"string\",\"name\":\"key\",\"type\":\"string\"}],\"name\":\"getUintArray\",\"outputs\":[{\"internalType\":\"uint256[]\",\"name\":\"\",\"type\":\"uint256[]\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"input\",\"type\":\"bytes\"},{\"internalType\":\"string\",\"name\":\"key\",\"type\":\"string\"}],\"name\":\"remove\",\"outputs\":[{\"internalType\":\"bytes\",\"name\":\"\",\"type\":\"bytes\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"input\",\"type\":\"bytes\"},{\"internalType\":\"string\",\"name\":\"key\",\"type\":\"string\"},{\"internalType\":\"address\",\"name\":\"value\",\"type\":\"address\"}],\"name\":\"setAddress\",\"outputs\":[{\"internalType\":\"bytes\",\"name\":\"\",\"type\":\"bytes\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"input\",\"type\":\"bytes\"},{\"internalType\":\"string\",\"name\":\"key\",\"type\":\"string\"},{\"internalType\":\"address[]\",\"name\":\"value\",\"type\":\"address[]\"}],\"name\":\"setAddressArray\",\"outputs\":[{\"internalType\":\"bytes\",\"name\":\"\",\"type\":\"bytes\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"input\",\"type\":\"bytes\"},{\"internalType\":\"string\",\"name\":\"key\",\"type\":\"string\"},{\"internalType\":\"bool\",\"name\":\"value\",\"type\":\"bool\"}],\"name\":\"setBool\",\"outputs\":[{\"internalType\":\"bytes\",\"name\":\"\",\"type\":\"bytes\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"input\",\"type\":\"bytes\"},{\"internalType\":\"string\",\"name\":\"key\",\"type\":\"string\"},{\"internalType\":\"bool[]\",\"name\":\"value\",\"type\":\"bool[]\"}],\"name\":\"setBoolArray\",\"outputs\":[{\"internalType\":\"bytes\",\"name\":\"\",\"type\":\"bytes\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"input\",\"type\":\"bytes\"},{\"internalType\":\"string\",\"name\":\"key\",\"type\":\"string\"},{\"internalType\":\"bytes\",\"name\":\"value\",\"type\":\"bytes\"}],\"name\":\"setBytes\",\"outputs\":[{\"internalType\":\"bytes\",\"name\":\"\",\"type\":\"bytes\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"input\",\"type\":\"bytes\"},{\"internalType\":\"string\",\"name\":\"key\",\"type\":\"string\"},{\"internalType\":\"int256\",\"name\":\"value\",\"type\":\"int256\"},{\"internalType\":\"int64\",\"name\":\"decimals\",\"type\":\"int64\"}],\"name\":\"setFloat\",\"outputs\":[{\"internalType\":\"bytes\",\"name\":\"\",\"type\":\"bytes\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"input\",\"type\":\"bytes\"},{\"internalType\":\"string\",\"name\":\"key\",\"type\":\"string\"},{\"internalType\":\"int256[]\",\"name\":\"value\",\"type\":\"int256[]\"},{\"internalType\":\"int64\",\"name\":\"decimals\",\"type\":\"int64\"}],\"name\":\"setFloatArray\",\"outputs\":[{\"internalType\":\"bytes\",\"name\":\"\",\"type\":\"bytes\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"input\",\"type\":\"bytes\"},{\"internalType\":\"string\",\"name\":\"key\",\"type\":\"string\"},{\"internalType\":\"int256\",\"name\":\"value\",\"type\":\"int256\"}],\"name\":\"setInt256\",\"outputs\":[{\"internalType\":\"bytes\",\"name\":\"\",\"type\":\"bytes\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"input\",\"type\":\"bytes\"},{\"internalType\":\"string\",\"name\":\"key\",\"type\":\"string\"},{\"internalType\":\"int256[]\",\"name\":\"value\",\"type\":\"int256[]\"}],\"name\":\"setIntArray\",\"outputs\":[{\"internalType\":\"bytes\",\"name\":\"\",\"type\":\"bytes\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"input\",\"type\":\"bytes\"},{\"internalType\":\"string\",\"name\":\"key\",\"type\":\"string\"},{\"internalType\":\"bytes\",\"name\":\"value\",\"type\":\"bytes\"}],\"name\":\"setObject\",\"outputs\":[{\"internalType\":\"bytes\",\"name\":\"\",\"type\":\"bytes\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"input\",\"type\":\"bytes\"},{\"internalType\":\"string\",\"name\":\"key\",\"type\":\"string\"},{\"internalType\":\"bytes[]\",\"name\":\"value\",\"type\":\"bytes[]\"}],\"name\":\"setObjectsArray\",\"outputs\":[{\"internalType\":\"bytes\",\"name\":\"\",\"type\":\"bytes\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"input\",\"type\":\"bytes\"},{\"internalType\":\"string\",\"name\":\"key\",\"type\":\"string\"},{\"internalType\":\"string\",\"name\":\"value\",\"type\":\"string\"}],\"name\":\"setString\",\"outputs\":[{\"internalType\":\"bytes\",\"name\":\"\",\"type\":\"bytes\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"input\",\"type\":\"bytes\"},{\"internalType\":\"string\",\"name\":\"key\",\"type\":\"string\"},{\"internalType\":\"string[]\",\"name\":\"value\",\"type\":\"string[]\"}],\"name\":\"setStringArray\",\"outputs\":[{\"internalType\":\"bytes\",\"name\":\"\",\"type\":\"bytes\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"input\",\"type\":\"bytes\"},{\"internalType\":\"string\",\"name\":\"key\",\"type\":\"string\"},{\"internalType\":\"uint256\",\"name\":\"value\",\"type\":\"uint256\"}],\"name\":\"setUint256\",\"outputs\":[{\"internalType\":\"bytes\",\"name\":\"\",\"type\":\"bytes\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"input\",\"type\":\"bytes\"},{\"internalType\":\"string\",\"name\":\"key\",\"type\":\"string\"},{\"internalType\":\"uint256[]\",\"name\":\"value\",\"type\":\"uint256[]\"}],\"name\":\"setUintArray\",\"outputs\":[{\"internalType\":\"bytes\",\"name\":\"\",\"type\":\"bytes\"}],\"stateMutability\":\"pure\",\"type\":\"function\"}]",
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

// Get is a free data retrieval call binding the contract method 0x59b4d8a7.
//
// Solidity: function get(bytes input, string key) pure returns(bytes)
func (_IJson *IJsonCaller) Get(opts *bind.CallOpts, input []byte, key string) ([]byte, error) {
	var out []interface{}
	err := _IJson.contract.Call(opts, &out, "get", input, key)

	if err != nil {
		return *new([]byte), err
	}

	out0 := *abi.ConvertType(out[0], new([]byte)).(*[]byte)

	return out0, err

}

// Get is a free data retrieval call binding the contract method 0x59b4d8a7.
//
// Solidity: function get(bytes input, string key) pure returns(bytes)
func (_IJson *IJsonSession) Get(input []byte, key string) ([]byte, error) {
	return _IJson.Contract.Get(&_IJson.CallOpts, input, key)
}

// Get is a free data retrieval call binding the contract method 0x59b4d8a7.
//
// Solidity: function get(bytes input, string key) pure returns(bytes)
func (_IJson *IJsonCallerSession) Get(input []byte, key string) ([]byte, error) {
	return _IJson.Contract.Get(&_IJson.CallOpts, input, key)
}

// GetAddress is a free data retrieval call binding the contract method 0xa8d4e651.
//
// Solidity: function getAddress(bytes input, string key) pure returns(address)
func (_IJson *IJsonCaller) GetAddress(opts *bind.CallOpts, input []byte, key string) (common.Address, error) {
	var out []interface{}
	err := _IJson.contract.Call(opts, &out, "getAddress", input, key)

	if err != nil {
		return *new(common.Address), err
	}

	out0 := *abi.ConvertType(out[0], new(common.Address)).(*common.Address)

	return out0, err

}

// GetAddress is a free data retrieval call binding the contract method 0xa8d4e651.
//
// Solidity: function getAddress(bytes input, string key) pure returns(address)
func (_IJson *IJsonSession) GetAddress(input []byte, key string) (common.Address, error) {
	return _IJson.Contract.GetAddress(&_IJson.CallOpts, input, key)
}

// GetAddress is a free data retrieval call binding the contract method 0xa8d4e651.
//
// Solidity: function getAddress(bytes input, string key) pure returns(address)
func (_IJson *IJsonCallerSession) GetAddress(input []byte, key string) (common.Address, error) {
	return _IJson.Contract.GetAddress(&_IJson.CallOpts, input, key)
}

// GetAddressArray is a free data retrieval call binding the contract method 0x89b53785.
//
// Solidity: function getAddressArray(bytes input, string key) pure returns(address[])
func (_IJson *IJsonCaller) GetAddressArray(opts *bind.CallOpts, input []byte, key string) ([]common.Address, error) {
	var out []interface{}
	err := _IJson.contract.Call(opts, &out, "getAddressArray", input, key)

	if err != nil {
		return *new([]common.Address), err
	}

	out0 := *abi.ConvertType(out[0], new([]common.Address)).(*[]common.Address)

	return out0, err

}

// GetAddressArray is a free data retrieval call binding the contract method 0x89b53785.
//
// Solidity: function getAddressArray(bytes input, string key) pure returns(address[])
func (_IJson *IJsonSession) GetAddressArray(input []byte, key string) ([]common.Address, error) {
	return _IJson.Contract.GetAddressArray(&_IJson.CallOpts, input, key)
}

// GetAddressArray is a free data retrieval call binding the contract method 0x89b53785.
//
// Solidity: function getAddressArray(bytes input, string key) pure returns(address[])
func (_IJson *IJsonCallerSession) GetAddressArray(input []byte, key string) ([]common.Address, error) {
	return _IJson.Contract.GetAddressArray(&_IJson.CallOpts, input, key)
}

// GetBool is a free data retrieval call binding the contract method 0x5d19cf1e.
//
// Solidity: function getBool(bytes input, string key) pure returns(bool)
func (_IJson *IJsonCaller) GetBool(opts *bind.CallOpts, input []byte, key string) (bool, error) {
	var out []interface{}
	err := _IJson.contract.Call(opts, &out, "getBool", input, key)

	if err != nil {
		return *new(bool), err
	}

	out0 := *abi.ConvertType(out[0], new(bool)).(*bool)

	return out0, err

}

// GetBool is a free data retrieval call binding the contract method 0x5d19cf1e.
//
// Solidity: function getBool(bytes input, string key) pure returns(bool)
func (_IJson *IJsonSession) GetBool(input []byte, key string) (bool, error) {
	return _IJson.Contract.GetBool(&_IJson.CallOpts, input, key)
}

// GetBool is a free data retrieval call binding the contract method 0x5d19cf1e.
//
// Solidity: function getBool(bytes input, string key) pure returns(bool)
func (_IJson *IJsonCallerSession) GetBool(input []byte, key string) (bool, error) {
	return _IJson.Contract.GetBool(&_IJson.CallOpts, input, key)
}

// GetBoolArray is a free data retrieval call binding the contract method 0x4ee8b61b.
//
// Solidity: function getBoolArray(bytes input, string key) pure returns(bool[])
func (_IJson *IJsonCaller) GetBoolArray(opts *bind.CallOpts, input []byte, key string) ([]bool, error) {
	var out []interface{}
	err := _IJson.contract.Call(opts, &out, "getBoolArray", input, key)

	if err != nil {
		return *new([]bool), err
	}

	out0 := *abi.ConvertType(out[0], new([]bool)).(*[]bool)

	return out0, err

}

// GetBoolArray is a free data retrieval call binding the contract method 0x4ee8b61b.
//
// Solidity: function getBoolArray(bytes input, string key) pure returns(bool[])
func (_IJson *IJsonSession) GetBoolArray(input []byte, key string) ([]bool, error) {
	return _IJson.Contract.GetBoolArray(&_IJson.CallOpts, input, key)
}

// GetBoolArray is a free data retrieval call binding the contract method 0x4ee8b61b.
//
// Solidity: function getBoolArray(bytes input, string key) pure returns(bool[])
func (_IJson *IJsonCallerSession) GetBoolArray(input []byte, key string) ([]bool, error) {
	return _IJson.Contract.GetBoolArray(&_IJson.CallOpts, input, key)
}

// GetFloat is a free data retrieval call binding the contract method 0x97417eb6.
//
// Solidity: function getFloat(bytes input, string key, int64 decimals) pure returns(int256)
func (_IJson *IJsonCaller) GetFloat(opts *bind.CallOpts, input []byte, key string, decimals int64) (*big.Int, error) {
	var out []interface{}
	err := _IJson.contract.Call(opts, &out, "getFloat", input, key, decimals)

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// GetFloat is a free data retrieval call binding the contract method 0x97417eb6.
//
// Solidity: function getFloat(bytes input, string key, int64 decimals) pure returns(int256)
func (_IJson *IJsonSession) GetFloat(input []byte, key string, decimals int64) (*big.Int, error) {
	return _IJson.Contract.GetFloat(&_IJson.CallOpts, input, key, decimals)
}

// GetFloat is a free data retrieval call binding the contract method 0x97417eb6.
//
// Solidity: function getFloat(bytes input, string key, int64 decimals) pure returns(int256)
func (_IJson *IJsonCallerSession) GetFloat(input []byte, key string, decimals int64) (*big.Int, error) {
	return _IJson.Contract.GetFloat(&_IJson.CallOpts, input, key, decimals)
}

// GetFloatArray is a free data retrieval call binding the contract method 0x084f0984.
//
// Solidity: function getFloatArray(bytes input, string key, int64 decimals) pure returns(int256[])
func (_IJson *IJsonCaller) GetFloatArray(opts *bind.CallOpts, input []byte, key string, decimals int64) ([]*big.Int, error) {
	var out []interface{}
	err := _IJson.contract.Call(opts, &out, "getFloatArray", input, key, decimals)

	if err != nil {
		return *new([]*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new([]*big.Int)).(*[]*big.Int)

	return out0, err

}

// GetFloatArray is a free data retrieval call binding the contract method 0x084f0984.
//
// Solidity: function getFloatArray(bytes input, string key, int64 decimals) pure returns(int256[])
func (_IJson *IJsonSession) GetFloatArray(input []byte, key string, decimals int64) ([]*big.Int, error) {
	return _IJson.Contract.GetFloatArray(&_IJson.CallOpts, input, key, decimals)
}

// GetFloatArray is a free data retrieval call binding the contract method 0x084f0984.
//
// Solidity: function getFloatArray(bytes input, string key, int64 decimals) pure returns(int256[])
func (_IJson *IJsonCallerSession) GetFloatArray(input []byte, key string, decimals int64) ([]*big.Int, error) {
	return _IJson.Contract.GetFloatArray(&_IJson.CallOpts, input, key, decimals)
}

// GetInt256 is a free data retrieval call binding the contract method 0x6f49ff7d.
//
// Solidity: function getInt256(bytes input, string key) pure returns(int256)
func (_IJson *IJsonCaller) GetInt256(opts *bind.CallOpts, input []byte, key string) (*big.Int, error) {
	var out []interface{}
	err := _IJson.contract.Call(opts, &out, "getInt256", input, key)

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// GetInt256 is a free data retrieval call binding the contract method 0x6f49ff7d.
//
// Solidity: function getInt256(bytes input, string key) pure returns(int256)
func (_IJson *IJsonSession) GetInt256(input []byte, key string) (*big.Int, error) {
	return _IJson.Contract.GetInt256(&_IJson.CallOpts, input, key)
}

// GetInt256 is a free data retrieval call binding the contract method 0x6f49ff7d.
//
// Solidity: function getInt256(bytes input, string key) pure returns(int256)
func (_IJson *IJsonCallerSession) GetInt256(input []byte, key string) (*big.Int, error) {
	return _IJson.Contract.GetInt256(&_IJson.CallOpts, input, key)
}

// GetIntArray is a free data retrieval call binding the contract method 0x00e94664.
//
// Solidity: function getIntArray(bytes input, string key) pure returns(int256[])
func (_IJson *IJsonCaller) GetIntArray(opts *bind.CallOpts, input []byte, key string) ([]*big.Int, error) {
	var out []interface{}
	err := _IJson.contract.Call(opts, &out, "getIntArray", input, key)

	if err != nil {
		return *new([]*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new([]*big.Int)).(*[]*big.Int)

	return out0, err

}

// GetIntArray is a free data retrieval call binding the contract method 0x00e94664.
//
// Solidity: function getIntArray(bytes input, string key) pure returns(int256[])
func (_IJson *IJsonSession) GetIntArray(input []byte, key string) ([]*big.Int, error) {
	return _IJson.Contract.GetIntArray(&_IJson.CallOpts, input, key)
}

// GetIntArray is a free data retrieval call binding the contract method 0x00e94664.
//
// Solidity: function getIntArray(bytes input, string key) pure returns(int256[])
func (_IJson *IJsonCallerSession) GetIntArray(input []byte, key string) ([]*big.Int, error) {
	return _IJson.Contract.GetIntArray(&_IJson.CallOpts, input, key)
}

// GetObject is a free data retrieval call binding the contract method 0xd8f86056.
//
// Solidity: function getObject(bytes input, string key) pure returns(bytes)
func (_IJson *IJsonCaller) GetObject(opts *bind.CallOpts, input []byte, key string) ([]byte, error) {
	var out []interface{}
	err := _IJson.contract.Call(opts, &out, "getObject", input, key)

	if err != nil {
		return *new([]byte), err
	}

	out0 := *abi.ConvertType(out[0], new([]byte)).(*[]byte)

	return out0, err

}

// GetObject is a free data retrieval call binding the contract method 0xd8f86056.
//
// Solidity: function getObject(bytes input, string key) pure returns(bytes)
func (_IJson *IJsonSession) GetObject(input []byte, key string) ([]byte, error) {
	return _IJson.Contract.GetObject(&_IJson.CallOpts, input, key)
}

// GetObject is a free data retrieval call binding the contract method 0xd8f86056.
//
// Solidity: function getObject(bytes input, string key) pure returns(bytes)
func (_IJson *IJsonCallerSession) GetObject(input []byte, key string) ([]byte, error) {
	return _IJson.Contract.GetObject(&_IJson.CallOpts, input, key)
}

// GetObjectsArray is a free data retrieval call binding the contract method 0x79d6c15d.
//
// Solidity: function getObjectsArray(bytes input, string key) pure returns(bytes[])
func (_IJson *IJsonCaller) GetObjectsArray(opts *bind.CallOpts, input []byte, key string) ([][]byte, error) {
	var out []interface{}
	err := _IJson.contract.Call(opts, &out, "getObjectsArray", input, key)

	if err != nil {
		return *new([][]byte), err
	}

	out0 := *abi.ConvertType(out[0], new([][]byte)).(*[][]byte)

	return out0, err

}

// GetObjectsArray is a free data retrieval call binding the contract method 0x79d6c15d.
//
// Solidity: function getObjectsArray(bytes input, string key) pure returns(bytes[])
func (_IJson *IJsonSession) GetObjectsArray(input []byte, key string) ([][]byte, error) {
	return _IJson.Contract.GetObjectsArray(&_IJson.CallOpts, input, key)
}

// GetObjectsArray is a free data retrieval call binding the contract method 0x79d6c15d.
//
// Solidity: function getObjectsArray(bytes input, string key) pure returns(bytes[])
func (_IJson *IJsonCallerSession) GetObjectsArray(input []byte, key string) ([][]byte, error) {
	return _IJson.Contract.GetObjectsArray(&_IJson.CallOpts, input, key)
}

// GetString is a free data retrieval call binding the contract method 0x3fe9170e.
//
// Solidity: function getString(bytes input, string key) pure returns(string)
func (_IJson *IJsonCaller) GetString(opts *bind.CallOpts, input []byte, key string) (string, error) {
	var out []interface{}
	err := _IJson.contract.Call(opts, &out, "getString", input, key)

	if err != nil {
		return *new(string), err
	}

	out0 := *abi.ConvertType(out[0], new(string)).(*string)

	return out0, err

}

// GetString is a free data retrieval call binding the contract method 0x3fe9170e.
//
// Solidity: function getString(bytes input, string key) pure returns(string)
func (_IJson *IJsonSession) GetString(input []byte, key string) (string, error) {
	return _IJson.Contract.GetString(&_IJson.CallOpts, input, key)
}

// GetString is a free data retrieval call binding the contract method 0x3fe9170e.
//
// Solidity: function getString(bytes input, string key) pure returns(string)
func (_IJson *IJsonCallerSession) GetString(input []byte, key string) (string, error) {
	return _IJson.Contract.GetString(&_IJson.CallOpts, input, key)
}

// GetStringArray is a free data retrieval call binding the contract method 0x44dad21f.
//
// Solidity: function getStringArray(bytes input, string key) pure returns(string[])
func (_IJson *IJsonCaller) GetStringArray(opts *bind.CallOpts, input []byte, key string) ([]string, error) {
	var out []interface{}
	err := _IJson.contract.Call(opts, &out, "getStringArray", input, key)

	if err != nil {
		return *new([]string), err
	}

	out0 := *abi.ConvertType(out[0], new([]string)).(*[]string)

	return out0, err

}

// GetStringArray is a free data retrieval call binding the contract method 0x44dad21f.
//
// Solidity: function getStringArray(bytes input, string key) pure returns(string[])
func (_IJson *IJsonSession) GetStringArray(input []byte, key string) ([]string, error) {
	return _IJson.Contract.GetStringArray(&_IJson.CallOpts, input, key)
}

// GetStringArray is a free data retrieval call binding the contract method 0x44dad21f.
//
// Solidity: function getStringArray(bytes input, string key) pure returns(string[])
func (_IJson *IJsonCallerSession) GetStringArray(input []byte, key string) ([]string, error) {
	return _IJson.Contract.GetStringArray(&_IJson.CallOpts, input, key)
}

// GetUint256 is a free data retrieval call binding the contract method 0x05286e27.
//
// Solidity: function getUint256(bytes input, string key) pure returns(uint256)
func (_IJson *IJsonCaller) GetUint256(opts *bind.CallOpts, input []byte, key string) (*big.Int, error) {
	var out []interface{}
	err := _IJson.contract.Call(opts, &out, "getUint256", input, key)

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// GetUint256 is a free data retrieval call binding the contract method 0x05286e27.
//
// Solidity: function getUint256(bytes input, string key) pure returns(uint256)
func (_IJson *IJsonSession) GetUint256(input []byte, key string) (*big.Int, error) {
	return _IJson.Contract.GetUint256(&_IJson.CallOpts, input, key)
}

// GetUint256 is a free data retrieval call binding the contract method 0x05286e27.
//
// Solidity: function getUint256(bytes input, string key) pure returns(uint256)
func (_IJson *IJsonCallerSession) GetUint256(input []byte, key string) (*big.Int, error) {
	return _IJson.Contract.GetUint256(&_IJson.CallOpts, input, key)
}

// GetUintArray is a free data retrieval call binding the contract method 0x42f785e9.
//
// Solidity: function getUintArray(bytes input, string key) pure returns(uint256[])
func (_IJson *IJsonCaller) GetUintArray(opts *bind.CallOpts, input []byte, key string) ([]*big.Int, error) {
	var out []interface{}
	err := _IJson.contract.Call(opts, &out, "getUintArray", input, key)

	if err != nil {
		return *new([]*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new([]*big.Int)).(*[]*big.Int)

	return out0, err

}

// GetUintArray is a free data retrieval call binding the contract method 0x42f785e9.
//
// Solidity: function getUintArray(bytes input, string key) pure returns(uint256[])
func (_IJson *IJsonSession) GetUintArray(input []byte, key string) ([]*big.Int, error) {
	return _IJson.Contract.GetUintArray(&_IJson.CallOpts, input, key)
}

// GetUintArray is a free data retrieval call binding the contract method 0x42f785e9.
//
// Solidity: function getUintArray(bytes input, string key) pure returns(uint256[])
func (_IJson *IJsonCallerSession) GetUintArray(input []byte, key string) ([]*big.Int, error) {
	return _IJson.Contract.GetUintArray(&_IJson.CallOpts, input, key)
}

// Remove is a free data retrieval call binding the contract method 0x9b1347ed.
//
// Solidity: function remove(bytes input, string key) pure returns(bytes)
func (_IJson *IJsonCaller) Remove(opts *bind.CallOpts, input []byte, key string) ([]byte, error) {
	var out []interface{}
	err := _IJson.contract.Call(opts, &out, "remove", input, key)

	if err != nil {
		return *new([]byte), err
	}

	out0 := *abi.ConvertType(out[0], new([]byte)).(*[]byte)

	return out0, err

}

// Remove is a free data retrieval call binding the contract method 0x9b1347ed.
//
// Solidity: function remove(bytes input, string key) pure returns(bytes)
func (_IJson *IJsonSession) Remove(input []byte, key string) ([]byte, error) {
	return _IJson.Contract.Remove(&_IJson.CallOpts, input, key)
}

// Remove is a free data retrieval call binding the contract method 0x9b1347ed.
//
// Solidity: function remove(bytes input, string key) pure returns(bytes)
func (_IJson *IJsonCallerSession) Remove(input []byte, key string) ([]byte, error) {
	return _IJson.Contract.Remove(&_IJson.CallOpts, input, key)
}

// SetAddress is a free data retrieval call binding the contract method 0x37d29f0d.
//
// Solidity: function setAddress(bytes input, string key, address value) pure returns(bytes)
func (_IJson *IJsonCaller) SetAddress(opts *bind.CallOpts, input []byte, key string, value common.Address) ([]byte, error) {
	var out []interface{}
	err := _IJson.contract.Call(opts, &out, "setAddress", input, key, value)

	if err != nil {
		return *new([]byte), err
	}

	out0 := *abi.ConvertType(out[0], new([]byte)).(*[]byte)

	return out0, err

}

// SetAddress is a free data retrieval call binding the contract method 0x37d29f0d.
//
// Solidity: function setAddress(bytes input, string key, address value) pure returns(bytes)
func (_IJson *IJsonSession) SetAddress(input []byte, key string, value common.Address) ([]byte, error) {
	return _IJson.Contract.SetAddress(&_IJson.CallOpts, input, key, value)
}

// SetAddress is a free data retrieval call binding the contract method 0x37d29f0d.
//
// Solidity: function setAddress(bytes input, string key, address value) pure returns(bytes)
func (_IJson *IJsonCallerSession) SetAddress(input []byte, key string, value common.Address) ([]byte, error) {
	return _IJson.Contract.SetAddress(&_IJson.CallOpts, input, key, value)
}

// SetAddressArray is a free data retrieval call binding the contract method 0xd50d7b1f.
//
// Solidity: function setAddressArray(bytes input, string key, address[] value) pure returns(bytes)
func (_IJson *IJsonCaller) SetAddressArray(opts *bind.CallOpts, input []byte, key string, value []common.Address) ([]byte, error) {
	var out []interface{}
	err := _IJson.contract.Call(opts, &out, "setAddressArray", input, key, value)

	if err != nil {
		return *new([]byte), err
	}

	out0 := *abi.ConvertType(out[0], new([]byte)).(*[]byte)

	return out0, err

}

// SetAddressArray is a free data retrieval call binding the contract method 0xd50d7b1f.
//
// Solidity: function setAddressArray(bytes input, string key, address[] value) pure returns(bytes)
func (_IJson *IJsonSession) SetAddressArray(input []byte, key string, value []common.Address) ([]byte, error) {
	return _IJson.Contract.SetAddressArray(&_IJson.CallOpts, input, key, value)
}

// SetAddressArray is a free data retrieval call binding the contract method 0xd50d7b1f.
//
// Solidity: function setAddressArray(bytes input, string key, address[] value) pure returns(bytes)
func (_IJson *IJsonCallerSession) SetAddressArray(input []byte, key string, value []common.Address) ([]byte, error) {
	return _IJson.Contract.SetAddressArray(&_IJson.CallOpts, input, key, value)
}

// SetBool is a free data retrieval call binding the contract method 0x4f90bdc8.
//
// Solidity: function setBool(bytes input, string key, bool value) pure returns(bytes)
func (_IJson *IJsonCaller) SetBool(opts *bind.CallOpts, input []byte, key string, value bool) ([]byte, error) {
	var out []interface{}
	err := _IJson.contract.Call(opts, &out, "setBool", input, key, value)

	if err != nil {
		return *new([]byte), err
	}

	out0 := *abi.ConvertType(out[0], new([]byte)).(*[]byte)

	return out0, err

}

// SetBool is a free data retrieval call binding the contract method 0x4f90bdc8.
//
// Solidity: function setBool(bytes input, string key, bool value) pure returns(bytes)
func (_IJson *IJsonSession) SetBool(input []byte, key string, value bool) ([]byte, error) {
	return _IJson.Contract.SetBool(&_IJson.CallOpts, input, key, value)
}

// SetBool is a free data retrieval call binding the contract method 0x4f90bdc8.
//
// Solidity: function setBool(bytes input, string key, bool value) pure returns(bytes)
func (_IJson *IJsonCallerSession) SetBool(input []byte, key string, value bool) ([]byte, error) {
	return _IJson.Contract.SetBool(&_IJson.CallOpts, input, key, value)
}

// SetBoolArray is a free data retrieval call binding the contract method 0xc0cdca32.
//
// Solidity: function setBoolArray(bytes input, string key, bool[] value) pure returns(bytes)
func (_IJson *IJsonCaller) SetBoolArray(opts *bind.CallOpts, input []byte, key string, value []bool) ([]byte, error) {
	var out []interface{}
	err := _IJson.contract.Call(opts, &out, "setBoolArray", input, key, value)

	if err != nil {
		return *new([]byte), err
	}

	out0 := *abi.ConvertType(out[0], new([]byte)).(*[]byte)

	return out0, err

}

// SetBoolArray is a free data retrieval call binding the contract method 0xc0cdca32.
//
// Solidity: function setBoolArray(bytes input, string key, bool[] value) pure returns(bytes)
func (_IJson *IJsonSession) SetBoolArray(input []byte, key string, value []bool) ([]byte, error) {
	return _IJson.Contract.SetBoolArray(&_IJson.CallOpts, input, key, value)
}

// SetBoolArray is a free data retrieval call binding the contract method 0xc0cdca32.
//
// Solidity: function setBoolArray(bytes input, string key, bool[] value) pure returns(bytes)
func (_IJson *IJsonCallerSession) SetBoolArray(input []byte, key string, value []bool) ([]byte, error) {
	return _IJson.Contract.SetBoolArray(&_IJson.CallOpts, input, key, value)
}

// SetBytes is a free data retrieval call binding the contract method 0xeb1524d5.
//
// Solidity: function setBytes(bytes input, string key, bytes value) pure returns(bytes)
func (_IJson *IJsonCaller) SetBytes(opts *bind.CallOpts, input []byte, key string, value []byte) ([]byte, error) {
	var out []interface{}
	err := _IJson.contract.Call(opts, &out, "setBytes", input, key, value)

	if err != nil {
		return *new([]byte), err
	}

	out0 := *abi.ConvertType(out[0], new([]byte)).(*[]byte)

	return out0, err

}

// SetBytes is a free data retrieval call binding the contract method 0xeb1524d5.
//
// Solidity: function setBytes(bytes input, string key, bytes value) pure returns(bytes)
func (_IJson *IJsonSession) SetBytes(input []byte, key string, value []byte) ([]byte, error) {
	return _IJson.Contract.SetBytes(&_IJson.CallOpts, input, key, value)
}

// SetBytes is a free data retrieval call binding the contract method 0xeb1524d5.
//
// Solidity: function setBytes(bytes input, string key, bytes value) pure returns(bytes)
func (_IJson *IJsonCallerSession) SetBytes(input []byte, key string, value []byte) ([]byte, error) {
	return _IJson.Contract.SetBytes(&_IJson.CallOpts, input, key, value)
}

// SetFloat is a free data retrieval call binding the contract method 0x50d0b4b6.
//
// Solidity: function setFloat(bytes input, string key, int256 value, int64 decimals) pure returns(bytes)
func (_IJson *IJsonCaller) SetFloat(opts *bind.CallOpts, input []byte, key string, value *big.Int, decimals int64) ([]byte, error) {
	var out []interface{}
	err := _IJson.contract.Call(opts, &out, "setFloat", input, key, value, decimals)

	if err != nil {
		return *new([]byte), err
	}

	out0 := *abi.ConvertType(out[0], new([]byte)).(*[]byte)

	return out0, err

}

// SetFloat is a free data retrieval call binding the contract method 0x50d0b4b6.
//
// Solidity: function setFloat(bytes input, string key, int256 value, int64 decimals) pure returns(bytes)
func (_IJson *IJsonSession) SetFloat(input []byte, key string, value *big.Int, decimals int64) ([]byte, error) {
	return _IJson.Contract.SetFloat(&_IJson.CallOpts, input, key, value, decimals)
}

// SetFloat is a free data retrieval call binding the contract method 0x50d0b4b6.
//
// Solidity: function setFloat(bytes input, string key, int256 value, int64 decimals) pure returns(bytes)
func (_IJson *IJsonCallerSession) SetFloat(input []byte, key string, value *big.Int, decimals int64) ([]byte, error) {
	return _IJson.Contract.SetFloat(&_IJson.CallOpts, input, key, value, decimals)
}

// SetFloatArray is a free data retrieval call binding the contract method 0x8f583add.
//
// Solidity: function setFloatArray(bytes input, string key, int256[] value, int64 decimals) pure returns(bytes)
func (_IJson *IJsonCaller) SetFloatArray(opts *bind.CallOpts, input []byte, key string, value []*big.Int, decimals int64) ([]byte, error) {
	var out []interface{}
	err := _IJson.contract.Call(opts, &out, "setFloatArray", input, key, value, decimals)

	if err != nil {
		return *new([]byte), err
	}

	out0 := *abi.ConvertType(out[0], new([]byte)).(*[]byte)

	return out0, err

}

// SetFloatArray is a free data retrieval call binding the contract method 0x8f583add.
//
// Solidity: function setFloatArray(bytes input, string key, int256[] value, int64 decimals) pure returns(bytes)
func (_IJson *IJsonSession) SetFloatArray(input []byte, key string, value []*big.Int, decimals int64) ([]byte, error) {
	return _IJson.Contract.SetFloatArray(&_IJson.CallOpts, input, key, value, decimals)
}

// SetFloatArray is a free data retrieval call binding the contract method 0x8f583add.
//
// Solidity: function setFloatArray(bytes input, string key, int256[] value, int64 decimals) pure returns(bytes)
func (_IJson *IJsonCallerSession) SetFloatArray(input []byte, key string, value []*big.Int, decimals int64) ([]byte, error) {
	return _IJson.Contract.SetFloatArray(&_IJson.CallOpts, input, key, value, decimals)
}

// SetInt256 is a free data retrieval call binding the contract method 0xa9531294.
//
// Solidity: function setInt256(bytes input, string key, int256 value) pure returns(bytes)
func (_IJson *IJsonCaller) SetInt256(opts *bind.CallOpts, input []byte, key string, value *big.Int) ([]byte, error) {
	var out []interface{}
	err := _IJson.contract.Call(opts, &out, "setInt256", input, key, value)

	if err != nil {
		return *new([]byte), err
	}

	out0 := *abi.ConvertType(out[0], new([]byte)).(*[]byte)

	return out0, err

}

// SetInt256 is a free data retrieval call binding the contract method 0xa9531294.
//
// Solidity: function setInt256(bytes input, string key, int256 value) pure returns(bytes)
func (_IJson *IJsonSession) SetInt256(input []byte, key string, value *big.Int) ([]byte, error) {
	return _IJson.Contract.SetInt256(&_IJson.CallOpts, input, key, value)
}

// SetInt256 is a free data retrieval call binding the contract method 0xa9531294.
//
// Solidity: function setInt256(bytes input, string key, int256 value) pure returns(bytes)
func (_IJson *IJsonCallerSession) SetInt256(input []byte, key string, value *big.Int) ([]byte, error) {
	return _IJson.Contract.SetInt256(&_IJson.CallOpts, input, key, value)
}

// SetIntArray is a free data retrieval call binding the contract method 0x31a4f44e.
//
// Solidity: function setIntArray(bytes input, string key, int256[] value) pure returns(bytes)
func (_IJson *IJsonCaller) SetIntArray(opts *bind.CallOpts, input []byte, key string, value []*big.Int) ([]byte, error) {
	var out []interface{}
	err := _IJson.contract.Call(opts, &out, "setIntArray", input, key, value)

	if err != nil {
		return *new([]byte), err
	}

	out0 := *abi.ConvertType(out[0], new([]byte)).(*[]byte)

	return out0, err

}

// SetIntArray is a free data retrieval call binding the contract method 0x31a4f44e.
//
// Solidity: function setIntArray(bytes input, string key, int256[] value) pure returns(bytes)
func (_IJson *IJsonSession) SetIntArray(input []byte, key string, value []*big.Int) ([]byte, error) {
	return _IJson.Contract.SetIntArray(&_IJson.CallOpts, input, key, value)
}

// SetIntArray is a free data retrieval call binding the contract method 0x31a4f44e.
//
// Solidity: function setIntArray(bytes input, string key, int256[] value) pure returns(bytes)
func (_IJson *IJsonCallerSession) SetIntArray(input []byte, key string, value []*big.Int) ([]byte, error) {
	return _IJson.Contract.SetIntArray(&_IJson.CallOpts, input, key, value)
}

// SetObject is a free data retrieval call binding the contract method 0x34cfc8c6.
//
// Solidity: function setObject(bytes input, string key, bytes value) pure returns(bytes)
func (_IJson *IJsonCaller) SetObject(opts *bind.CallOpts, input []byte, key string, value []byte) ([]byte, error) {
	var out []interface{}
	err := _IJson.contract.Call(opts, &out, "setObject", input, key, value)

	if err != nil {
		return *new([]byte), err
	}

	out0 := *abi.ConvertType(out[0], new([]byte)).(*[]byte)

	return out0, err

}

// SetObject is a free data retrieval call binding the contract method 0x34cfc8c6.
//
// Solidity: function setObject(bytes input, string key, bytes value) pure returns(bytes)
func (_IJson *IJsonSession) SetObject(input []byte, key string, value []byte) ([]byte, error) {
	return _IJson.Contract.SetObject(&_IJson.CallOpts, input, key, value)
}

// SetObject is a free data retrieval call binding the contract method 0x34cfc8c6.
//
// Solidity: function setObject(bytes input, string key, bytes value) pure returns(bytes)
func (_IJson *IJsonCallerSession) SetObject(input []byte, key string, value []byte) ([]byte, error) {
	return _IJson.Contract.SetObject(&_IJson.CallOpts, input, key, value)
}

// SetObjectsArray is a free data retrieval call binding the contract method 0xc7374de1.
//
// Solidity: function setObjectsArray(bytes input, string key, bytes[] value) pure returns(bytes)
func (_IJson *IJsonCaller) SetObjectsArray(opts *bind.CallOpts, input []byte, key string, value [][]byte) ([]byte, error) {
	var out []interface{}
	err := _IJson.contract.Call(opts, &out, "setObjectsArray", input, key, value)

	if err != nil {
		return *new([]byte), err
	}

	out0 := *abi.ConvertType(out[0], new([]byte)).(*[]byte)

	return out0, err

}

// SetObjectsArray is a free data retrieval call binding the contract method 0xc7374de1.
//
// Solidity: function setObjectsArray(bytes input, string key, bytes[] value) pure returns(bytes)
func (_IJson *IJsonSession) SetObjectsArray(input []byte, key string, value [][]byte) ([]byte, error) {
	return _IJson.Contract.SetObjectsArray(&_IJson.CallOpts, input, key, value)
}

// SetObjectsArray is a free data retrieval call binding the contract method 0xc7374de1.
//
// Solidity: function setObjectsArray(bytes input, string key, bytes[] value) pure returns(bytes)
func (_IJson *IJsonCallerSession) SetObjectsArray(input []byte, key string, value [][]byte) ([]byte, error) {
	return _IJson.Contract.SetObjectsArray(&_IJson.CallOpts, input, key, value)
}

// SetString is a free data retrieval call binding the contract method 0xe378394d.
//
// Solidity: function setString(bytes input, string key, string value) pure returns(bytes)
func (_IJson *IJsonCaller) SetString(opts *bind.CallOpts, input []byte, key string, value string) ([]byte, error) {
	var out []interface{}
	err := _IJson.contract.Call(opts, &out, "setString", input, key, value)

	if err != nil {
		return *new([]byte), err
	}

	out0 := *abi.ConvertType(out[0], new([]byte)).(*[]byte)

	return out0, err

}

// SetString is a free data retrieval call binding the contract method 0xe378394d.
//
// Solidity: function setString(bytes input, string key, string value) pure returns(bytes)
func (_IJson *IJsonSession) SetString(input []byte, key string, value string) ([]byte, error) {
	return _IJson.Contract.SetString(&_IJson.CallOpts, input, key, value)
}

// SetString is a free data retrieval call binding the contract method 0xe378394d.
//
// Solidity: function setString(bytes input, string key, string value) pure returns(bytes)
func (_IJson *IJsonCallerSession) SetString(input []byte, key string, value string) ([]byte, error) {
	return _IJson.Contract.SetString(&_IJson.CallOpts, input, key, value)
}

// SetStringArray is a free data retrieval call binding the contract method 0x59ff3c77.
//
// Solidity: function setStringArray(bytes input, string key, string[] value) pure returns(bytes)
func (_IJson *IJsonCaller) SetStringArray(opts *bind.CallOpts, input []byte, key string, value []string) ([]byte, error) {
	var out []interface{}
	err := _IJson.contract.Call(opts, &out, "setStringArray", input, key, value)

	if err != nil {
		return *new([]byte), err
	}

	out0 := *abi.ConvertType(out[0], new([]byte)).(*[]byte)

	return out0, err

}

// SetStringArray is a free data retrieval call binding the contract method 0x59ff3c77.
//
// Solidity: function setStringArray(bytes input, string key, string[] value) pure returns(bytes)
func (_IJson *IJsonSession) SetStringArray(input []byte, key string, value []string) ([]byte, error) {
	return _IJson.Contract.SetStringArray(&_IJson.CallOpts, input, key, value)
}

// SetStringArray is a free data retrieval call binding the contract method 0x59ff3c77.
//
// Solidity: function setStringArray(bytes input, string key, string[] value) pure returns(bytes)
func (_IJson *IJsonCallerSession) SetStringArray(input []byte, key string, value []string) ([]byte, error) {
	return _IJson.Contract.SetStringArray(&_IJson.CallOpts, input, key, value)
}

// SetUint256 is a free data retrieval call binding the contract method 0x369c1f38.
//
// Solidity: function setUint256(bytes input, string key, uint256 value) pure returns(bytes)
func (_IJson *IJsonCaller) SetUint256(opts *bind.CallOpts, input []byte, key string, value *big.Int) ([]byte, error) {
	var out []interface{}
	err := _IJson.contract.Call(opts, &out, "setUint256", input, key, value)

	if err != nil {
		return *new([]byte), err
	}

	out0 := *abi.ConvertType(out[0], new([]byte)).(*[]byte)

	return out0, err

}

// SetUint256 is a free data retrieval call binding the contract method 0x369c1f38.
//
// Solidity: function setUint256(bytes input, string key, uint256 value) pure returns(bytes)
func (_IJson *IJsonSession) SetUint256(input []byte, key string, value *big.Int) ([]byte, error) {
	return _IJson.Contract.SetUint256(&_IJson.CallOpts, input, key, value)
}

// SetUint256 is a free data retrieval call binding the contract method 0x369c1f38.
//
// Solidity: function setUint256(bytes input, string key, uint256 value) pure returns(bytes)
func (_IJson *IJsonCallerSession) SetUint256(input []byte, key string, value *big.Int) ([]byte, error) {
	return _IJson.Contract.SetUint256(&_IJson.CallOpts, input, key, value)
}

// SetUintArray is a free data retrieval call binding the contract method 0xfd6e2691.
//
// Solidity: function setUintArray(bytes input, string key, uint256[] value) pure returns(bytes)
func (_IJson *IJsonCaller) SetUintArray(opts *bind.CallOpts, input []byte, key string, value []*big.Int) ([]byte, error) {
	var out []interface{}
	err := _IJson.contract.Call(opts, &out, "setUintArray", input, key, value)

	if err != nil {
		return *new([]byte), err
	}

	out0 := *abi.ConvertType(out[0], new([]byte)).(*[]byte)

	return out0, err

}

// SetUintArray is a free data retrieval call binding the contract method 0xfd6e2691.
//
// Solidity: function setUintArray(bytes input, string key, uint256[] value) pure returns(bytes)
func (_IJson *IJsonSession) SetUintArray(input []byte, key string, value []*big.Int) ([]byte, error) {
	return _IJson.Contract.SetUintArray(&_IJson.CallOpts, input, key, value)
}

// SetUintArray is a free data retrieval call binding the contract method 0xfd6e2691.
//
// Solidity: function setUintArray(bytes input, string key, uint256[] value) pure returns(bytes)
func (_IJson *IJsonCallerSession) SetUintArray(input []byte, key string, value []*big.Int) ([]byte, error) {
	return _IJson.Contract.SetUintArray(&_IJson.CallOpts, input, key, value)
}
