// Code generated - DO NOT EDIT.
// This file is a generated binding and any manual changes will be lost.

package slinky

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

// GetPriceResponse is an auto generated low-level Go binding around an user-defined struct.
type GetPriceResponse struct {
	Id       uint64
	Nonce    uint64
	Decimals uint64
	Price    QuotePrice
}

// QuotePrice is an auto generated low-level Go binding around an user-defined struct.
type QuotePrice struct {
	BlockHeight    uint64
	BlockTimestamp *big.Int
	Price          *big.Int
}

// ISlinkyMetaData contains all meta data concerning the ISlinky contract.
var ISlinkyMetaData = &bind.MetaData{
	ABI: "[{\"inputs\":[{\"internalType\":\"string\",\"name\":\"base\",\"type\":\"string\"},{\"internalType\":\"string\",\"name\":\"quote\",\"type\":\"string\"}],\"name\":\"getPrice\",\"outputs\":[{\"components\":[{\"internalType\":\"uint64\",\"name\":\"id\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"nonce\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"decimals\",\"type\":\"uint64\"},{\"components\":[{\"internalType\":\"uint64\",\"name\":\"blockHeight\",\"type\":\"uint64\"},{\"internalType\":\"uint256\",\"name\":\"blockTimestamp\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"price\",\"type\":\"uint256\"}],\"internalType\":\"structQuotePrice\",\"name\":\"price\",\"type\":\"tuple\"}],\"internalType\":\"structGetPriceResponse\",\"name\":\"response\",\"type\":\"tuple\"}],\"stateMutability\":\"view\",\"type\":\"function\"}]",
}

// ISlinkyABI is the input ABI used to generate the binding from.
// Deprecated: Use ISlinkyMetaData.ABI instead.
var ISlinkyABI = ISlinkyMetaData.ABI

// ISlinky is an auto generated Go binding around an Ethereum contract.
type ISlinky struct {
	ISlinkyCaller     // Read-only binding to the contract
	ISlinkyTransactor // Write-only binding to the contract
	ISlinkyFilterer   // Log filterer for contract events
}

// ISlinkyCaller is an auto generated read-only Go binding around an Ethereum contract.
type ISlinkyCaller struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// ISlinkyTransactor is an auto generated write-only Go binding around an Ethereum contract.
type ISlinkyTransactor struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// ISlinkyFilterer is an auto generated log filtering Go binding around an Ethereum contract events.
type ISlinkyFilterer struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// ISlinkySession is an auto generated Go binding around an Ethereum contract,
// with pre-set call and transact options.
type ISlinkySession struct {
	Contract     *ISlinky          // Generic contract binding to set the session for
	CallOpts     bind.CallOpts     // Call options to use throughout this session
	TransactOpts bind.TransactOpts // Transaction auth options to use throughout this session
}

// ISlinkyCallerSession is an auto generated read-only Go binding around an Ethereum contract,
// with pre-set call options.
type ISlinkyCallerSession struct {
	Contract *ISlinkyCaller // Generic contract caller binding to set the session for
	CallOpts bind.CallOpts  // Call options to use throughout this session
}

// ISlinkyTransactorSession is an auto generated write-only Go binding around an Ethereum contract,
// with pre-set transact options.
type ISlinkyTransactorSession struct {
	Contract     *ISlinkyTransactor // Generic contract transactor binding to set the session for
	TransactOpts bind.TransactOpts  // Transaction auth options to use throughout this session
}

// ISlinkyRaw is an auto generated low-level Go binding around an Ethereum contract.
type ISlinkyRaw struct {
	Contract *ISlinky // Generic contract binding to access the raw methods on
}

// ISlinkyCallerRaw is an auto generated low-level read-only Go binding around an Ethereum contract.
type ISlinkyCallerRaw struct {
	Contract *ISlinkyCaller // Generic read-only contract binding to access the raw methods on
}

// ISlinkyTransactorRaw is an auto generated low-level write-only Go binding around an Ethereum contract.
type ISlinkyTransactorRaw struct {
	Contract *ISlinkyTransactor // Generic write-only contract binding to access the raw methods on
}

// NewISlinky creates a new instance of ISlinky, bound to a specific deployed contract.
func NewISlinky(address common.Address, backend bind.ContractBackend) (*ISlinky, error) {
	contract, err := bindISlinky(address, backend, backend, backend)
	if err != nil {
		return nil, err
	}
	return &ISlinky{ISlinkyCaller: ISlinkyCaller{contract: contract}, ISlinkyTransactor: ISlinkyTransactor{contract: contract}, ISlinkyFilterer: ISlinkyFilterer{contract: contract}}, nil
}

// NewISlinkyCaller creates a new read-only instance of ISlinky, bound to a specific deployed contract.
func NewISlinkyCaller(address common.Address, caller bind.ContractCaller) (*ISlinkyCaller, error) {
	contract, err := bindISlinky(address, caller, nil, nil)
	if err != nil {
		return nil, err
	}
	return &ISlinkyCaller{contract: contract}, nil
}

// NewISlinkyTransactor creates a new write-only instance of ISlinky, bound to a specific deployed contract.
func NewISlinkyTransactor(address common.Address, transactor bind.ContractTransactor) (*ISlinkyTransactor, error) {
	contract, err := bindISlinky(address, nil, transactor, nil)
	if err != nil {
		return nil, err
	}
	return &ISlinkyTransactor{contract: contract}, nil
}

// NewISlinkyFilterer creates a new log filterer instance of ISlinky, bound to a specific deployed contract.
func NewISlinkyFilterer(address common.Address, filterer bind.ContractFilterer) (*ISlinkyFilterer, error) {
	contract, err := bindISlinky(address, nil, nil, filterer)
	if err != nil {
		return nil, err
	}
	return &ISlinkyFilterer{contract: contract}, nil
}

// bindISlinky binds a generic wrapper to an already deployed contract.
func bindISlinky(address common.Address, caller bind.ContractCaller, transactor bind.ContractTransactor, filterer bind.ContractFilterer) (*bind.BoundContract, error) {
	parsed, err := ISlinkyMetaData.GetAbi()
	if err != nil {
		return nil, err
	}
	return bind.NewBoundContract(address, *parsed, caller, transactor, filterer), nil
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_ISlinky *ISlinkyRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _ISlinky.Contract.ISlinkyCaller.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_ISlinky *ISlinkyRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _ISlinky.Contract.ISlinkyTransactor.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_ISlinky *ISlinkyRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _ISlinky.Contract.ISlinkyTransactor.contract.Transact(opts, method, params...)
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_ISlinky *ISlinkyCallerRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _ISlinky.Contract.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_ISlinky *ISlinkyTransactorRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _ISlinky.Contract.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_ISlinky *ISlinkyTransactorRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _ISlinky.Contract.contract.Transact(opts, method, params...)
}

// GetPrice is a free data retrieval call binding the contract method 0x3d0f34da.
//
// Solidity: function getPrice(string base, string quote) view returns((uint64,uint64,uint64,(uint64,uint256,uint256)) response)
func (_ISlinky *ISlinkyCaller) GetPrice(opts *bind.CallOpts, base string, quote string) (GetPriceResponse, error) {
	var out []interface{}
	err := _ISlinky.contract.Call(opts, &out, "getPrice", base, quote)

	if err != nil {
		return *new(GetPriceResponse), err
	}

	out0 := *abi.ConvertType(out[0], new(GetPriceResponse)).(*GetPriceResponse)

	return out0, err

}

// GetPrice is a free data retrieval call binding the contract method 0x3d0f34da.
//
// Solidity: function getPrice(string base, string quote) view returns((uint64,uint64,uint64,(uint64,uint256,uint256)) response)
func (_ISlinky *ISlinkySession) GetPrice(base string, quote string) (GetPriceResponse, error) {
	return _ISlinky.Contract.GetPrice(&_ISlinky.CallOpts, base, quote)
}

// GetPrice is a free data retrieval call binding the contract method 0x3d0f34da.
//
// Solidity: function getPrice(string base, string quote) view returns((uint64,uint64,uint64,(uint64,uint256,uint256)) response)
func (_ISlinky *ISlinkyCallerSession) GetPrice(base string, quote string) (GetPriceResponse, error) {
	return _ISlinky.Contract.GetPrice(&_ISlinky.CallOpts, base, quote)
}
