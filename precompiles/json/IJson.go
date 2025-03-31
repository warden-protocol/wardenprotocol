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
	ABI: "[{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"input\",\"type\":\"bytes\"},{\"internalType\":\"string\",\"name\":\"key\",\"type\":\"string\"}],\"name\":\"get\",\"outputs\":[{\"internalType\":\"bytes\",\"name\":\"\",\"type\":\"bytes\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"input\",\"type\":\"bytes\"},{\"internalType\":\"string\",\"name\":\"key\",\"type\":\"string\"}],\"name\":\"remove\",\"outputs\":[{\"internalType\":\"bytes\",\"name\":\"\",\"type\":\"bytes\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"input\",\"type\":\"bytes\"},{\"internalType\":\"string\",\"name\":\"key\",\"type\":\"string\"},{\"internalType\":\"address\",\"name\":\"value\",\"type\":\"address\"}],\"name\":\"setAddress\",\"outputs\":[{\"internalType\":\"bytes\",\"name\":\"\",\"type\":\"bytes\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"input\",\"type\":\"bytes\"},{\"internalType\":\"string\",\"name\":\"key\",\"type\":\"string\"},{\"internalType\":\"address[]\",\"name\":\"value\",\"type\":\"address[]\"}],\"name\":\"setAddressArray\",\"outputs\":[{\"internalType\":\"bytes\",\"name\":\"\",\"type\":\"bytes\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"input\",\"type\":\"bytes\"},{\"internalType\":\"string\",\"name\":\"key\",\"type\":\"string\"},{\"internalType\":\"bool\",\"name\":\"value\",\"type\":\"bool\"}],\"name\":\"setBool\",\"outputs\":[{\"internalType\":\"bytes\",\"name\":\"\",\"type\":\"bytes\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"input\",\"type\":\"bytes\"},{\"internalType\":\"string\",\"name\":\"key\",\"type\":\"string\"},{\"internalType\":\"bool[]\",\"name\":\"value\",\"type\":\"bool[]\"}],\"name\":\"setBoolArray\",\"outputs\":[{\"internalType\":\"bytes\",\"name\":\"\",\"type\":\"bytes\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"input\",\"type\":\"bytes\"},{\"internalType\":\"string\",\"name\":\"key\",\"type\":\"string\"},{\"internalType\":\"bytes\",\"name\":\"value\",\"type\":\"bytes\"}],\"name\":\"setBytes\",\"outputs\":[{\"internalType\":\"bytes\",\"name\":\"\",\"type\":\"bytes\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"input\",\"type\":\"bytes\"},{\"internalType\":\"string\",\"name\":\"key\",\"type\":\"string\"},{\"internalType\":\"int256\",\"name\":\"value\",\"type\":\"int256\"}],\"name\":\"setInt256\",\"outputs\":[{\"internalType\":\"bytes\",\"name\":\"\",\"type\":\"bytes\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"input\",\"type\":\"bytes\"},{\"internalType\":\"string\",\"name\":\"key\",\"type\":\"string\"},{\"internalType\":\"int256[]\",\"name\":\"value\",\"type\":\"int256[]\"}],\"name\":\"setIntArray\",\"outputs\":[{\"internalType\":\"bytes\",\"name\":\"\",\"type\":\"bytes\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"input\",\"type\":\"bytes\"},{\"internalType\":\"string\",\"name\":\"key\",\"type\":\"string\"},{\"internalType\":\"bytes\",\"name\":\"value\",\"type\":\"bytes\"}],\"name\":\"setObject\",\"outputs\":[{\"internalType\":\"bytes\",\"name\":\"\",\"type\":\"bytes\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"input\",\"type\":\"bytes\"},{\"internalType\":\"string\",\"name\":\"key\",\"type\":\"string\"},{\"internalType\":\"bytes[]\",\"name\":\"value\",\"type\":\"bytes[]\"}],\"name\":\"setObjectsArray\",\"outputs\":[{\"internalType\":\"bytes\",\"name\":\"\",\"type\":\"bytes\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"input\",\"type\":\"bytes\"},{\"internalType\":\"string\",\"name\":\"key\",\"type\":\"string\"},{\"internalType\":\"string\",\"name\":\"value\",\"type\":\"string\"}],\"name\":\"setString\",\"outputs\":[{\"internalType\":\"bytes\",\"name\":\"\",\"type\":\"bytes\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"input\",\"type\":\"bytes\"},{\"internalType\":\"string\",\"name\":\"key\",\"type\":\"string\"},{\"internalType\":\"string[]\",\"name\":\"value\",\"type\":\"string[]\"}],\"name\":\"setStringArray\",\"outputs\":[{\"internalType\":\"bytes\",\"name\":\"\",\"type\":\"bytes\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"input\",\"type\":\"bytes\"},{\"internalType\":\"string\",\"name\":\"key\",\"type\":\"string\"},{\"internalType\":\"uint256\",\"name\":\"value\",\"type\":\"uint256\"}],\"name\":\"setUint256\",\"outputs\":[{\"internalType\":\"bytes\",\"name\":\"\",\"type\":\"bytes\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"input\",\"type\":\"bytes\"},{\"internalType\":\"string\",\"name\":\"key\",\"type\":\"string\"},{\"internalType\":\"uint256[]\",\"name\":\"value\",\"type\":\"uint256[]\"}],\"name\":\"setUintArray\",\"outputs\":[{\"internalType\":\"bytes\",\"name\":\"\",\"type\":\"bytes\"}],\"stateMutability\":\"pure\",\"type\":\"function\"}]",
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
