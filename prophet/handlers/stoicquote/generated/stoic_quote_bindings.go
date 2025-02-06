// Code generated - DO NOT EDIT.
// This file is a generated binding and any manual changes will be lost.

package stoicquote

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

// StoicQuoteTypesData is an auto generated low-level Go binding around an user-defined struct.
type StoicQuoteTypesData struct {
	Author string
	Quote  string
}

// StoicQuoteTypesStoicQuote is an auto generated low-level Go binding around an user-defined struct.
type StoicQuoteTypesStoicQuote struct {
	Data StoicQuoteTypesData
}

// StoicQuoteTypesMetaData contains all meta data concerning the StoicQuoteTypes contract.
var StoicQuoteTypesMetaData = &bind.MetaData{
	ABI: "[{\"inputs\":[{\"components\":[{\"components\":[{\"internalType\":\"string\",\"name\":\"author\",\"type\":\"string\"},{\"internalType\":\"string\",\"name\":\"quote\",\"type\":\"string\"}],\"internalType\":\"structStoicQuoteTypes.Data\",\"name\":\"data\",\"type\":\"tuple\"}],\"internalType\":\"structStoicQuoteTypes.StoicQuote\",\"name\":\"_stoicquote\",\"type\":\"tuple\"}],\"name\":\"useAllTypes\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"}]",
	Bin: "0x6080604052348015600e575f5ffd5b506102f88061001c5f395ff3fe608060405234801561000f575f5ffd5b5060043610610029575f3560e01c806314ed8d0d1461002d575b5f5ffd5b6100476004803603810190610042919061027b565b610049565b005b50565b5f604051905090565b5f5ffd5b5f5ffd5b5f5ffd5b5f601f19601f8301169050919050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52604160045260245ffd5b6100a782610061565b810181811067ffffffffffffffff821117156100c6576100c5610071565b5b80604052505050565b5f6100d861004c565b90506100e4828261009e565b919050565b5f5ffd5b5f5ffd5b5f5ffd5b5f67ffffffffffffffff82111561010f5761010e610071565b5b61011882610061565b9050602081019050919050565b828183375f83830152505050565b5f610145610140846100f5565b6100cf565b905082815260208101848484011115610161576101606100f1565b5b61016c848285610125565b509392505050565b5f82601f830112610188576101876100ed565b5b8135610198848260208601610133565b91505092915050565b5f604082840312156101b6576101b561005d565b5b6101c060406100cf565b90505f82013567ffffffffffffffff8111156101df576101de6100e9565b5b6101eb84828501610174565b5f83015250602082013567ffffffffffffffff81111561020e5761020d6100e9565b5b61021a84828501610174565b60208301525092915050565b5f6020828403121561023b5761023a61005d565b5b61024560206100cf565b90505f82013567ffffffffffffffff811115610264576102636100e9565b5b610270848285016101a1565b5f8301525092915050565b5f602082840312156102905761028f610055565b5b5f82013567ffffffffffffffff8111156102ad576102ac610059565b5b6102b984828501610226565b9150509291505056fea264697066735822122053b713b90f7c24b358d788bdd913f707d5d07b7207198e0b02f0cb9570be78d064736f6c634300081c0033",
}

// StoicQuoteTypesABI is the input ABI used to generate the binding from.
// Deprecated: Use StoicQuoteTypesMetaData.ABI instead.
var StoicQuoteTypesABI = StoicQuoteTypesMetaData.ABI

// StoicQuoteTypesBin is the compiled bytecode used for deploying new contracts.
// Deprecated: Use StoicQuoteTypesMetaData.Bin instead.
var StoicQuoteTypesBin = StoicQuoteTypesMetaData.Bin

// DeployStoicQuoteTypes deploys a new Ethereum contract, binding an instance of StoicQuoteTypes to it.
func DeployStoicQuoteTypes(auth *bind.TransactOpts, backend bind.ContractBackend) (common.Address, *types.Transaction, *StoicQuoteTypes, error) {
	parsed, err := StoicQuoteTypesMetaData.GetAbi()
	if err != nil {
		return common.Address{}, nil, nil, err
	}
	if parsed == nil {
		return common.Address{}, nil, nil, errors.New("GetABI returned nil")
	}

	address, tx, contract, err := bind.DeployContract(auth, *parsed, common.FromHex(StoicQuoteTypesBin), backend)
	if err != nil {
		return common.Address{}, nil, nil, err
	}
	return address, tx, &StoicQuoteTypes{StoicQuoteTypesCaller: StoicQuoteTypesCaller{contract: contract}, StoicQuoteTypesTransactor: StoicQuoteTypesTransactor{contract: contract}, StoicQuoteTypesFilterer: StoicQuoteTypesFilterer{contract: contract}}, nil
}

// StoicQuoteTypes is an auto generated Go binding around an Ethereum contract.
type StoicQuoteTypes struct {
	StoicQuoteTypesCaller     // Read-only binding to the contract
	StoicQuoteTypesTransactor // Write-only binding to the contract
	StoicQuoteTypesFilterer   // Log filterer for contract events
}

// StoicQuoteTypesCaller is an auto generated read-only Go binding around an Ethereum contract.
type StoicQuoteTypesCaller struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// StoicQuoteTypesTransactor is an auto generated write-only Go binding around an Ethereum contract.
type StoicQuoteTypesTransactor struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// StoicQuoteTypesFilterer is an auto generated log filtering Go binding around an Ethereum contract events.
type StoicQuoteTypesFilterer struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// StoicQuoteTypesSession is an auto generated Go binding around an Ethereum contract,
// with pre-set call and transact options.
type StoicQuoteTypesSession struct {
	Contract     *StoicQuoteTypes  // Generic contract binding to set the session for
	CallOpts     bind.CallOpts     // Call options to use throughout this session
	TransactOpts bind.TransactOpts // Transaction auth options to use throughout this session
}

// StoicQuoteTypesCallerSession is an auto generated read-only Go binding around an Ethereum contract,
// with pre-set call options.
type StoicQuoteTypesCallerSession struct {
	Contract *StoicQuoteTypesCaller // Generic contract caller binding to set the session for
	CallOpts bind.CallOpts          // Call options to use throughout this session
}

// StoicQuoteTypesTransactorSession is an auto generated write-only Go binding around an Ethereum contract,
// with pre-set transact options.
type StoicQuoteTypesTransactorSession struct {
	Contract     *StoicQuoteTypesTransactor // Generic contract transactor binding to set the session for
	TransactOpts bind.TransactOpts          // Transaction auth options to use throughout this session
}

// StoicQuoteTypesRaw is an auto generated low-level Go binding around an Ethereum contract.
type StoicQuoteTypesRaw struct {
	Contract *StoicQuoteTypes // Generic contract binding to access the raw methods on
}

// StoicQuoteTypesCallerRaw is an auto generated low-level read-only Go binding around an Ethereum contract.
type StoicQuoteTypesCallerRaw struct {
	Contract *StoicQuoteTypesCaller // Generic read-only contract binding to access the raw methods on
}

// StoicQuoteTypesTransactorRaw is an auto generated low-level write-only Go binding around an Ethereum contract.
type StoicQuoteTypesTransactorRaw struct {
	Contract *StoicQuoteTypesTransactor // Generic write-only contract binding to access the raw methods on
}

// NewStoicQuoteTypes creates a new instance of StoicQuoteTypes, bound to a specific deployed contract.
func NewStoicQuoteTypes(address common.Address, backend bind.ContractBackend) (*StoicQuoteTypes, error) {
	contract, err := bindStoicQuoteTypes(address, backend, backend, backend)
	if err != nil {
		return nil, err
	}
	return &StoicQuoteTypes{StoicQuoteTypesCaller: StoicQuoteTypesCaller{contract: contract}, StoicQuoteTypesTransactor: StoicQuoteTypesTransactor{contract: contract}, StoicQuoteTypesFilterer: StoicQuoteTypesFilterer{contract: contract}}, nil
}

// NewStoicQuoteTypesCaller creates a new read-only instance of StoicQuoteTypes, bound to a specific deployed contract.
func NewStoicQuoteTypesCaller(address common.Address, caller bind.ContractCaller) (*StoicQuoteTypesCaller, error) {
	contract, err := bindStoicQuoteTypes(address, caller, nil, nil)
	if err != nil {
		return nil, err
	}
	return &StoicQuoteTypesCaller{contract: contract}, nil
}

// NewStoicQuoteTypesTransactor creates a new write-only instance of StoicQuoteTypes, bound to a specific deployed contract.
func NewStoicQuoteTypesTransactor(address common.Address, transactor bind.ContractTransactor) (*StoicQuoteTypesTransactor, error) {
	contract, err := bindStoicQuoteTypes(address, nil, transactor, nil)
	if err != nil {
		return nil, err
	}
	return &StoicQuoteTypesTransactor{contract: contract}, nil
}

// NewStoicQuoteTypesFilterer creates a new log filterer instance of StoicQuoteTypes, bound to a specific deployed contract.
func NewStoicQuoteTypesFilterer(address common.Address, filterer bind.ContractFilterer) (*StoicQuoteTypesFilterer, error) {
	contract, err := bindStoicQuoteTypes(address, nil, nil, filterer)
	if err != nil {
		return nil, err
	}
	return &StoicQuoteTypesFilterer{contract: contract}, nil
}

// bindStoicQuoteTypes binds a generic wrapper to an already deployed contract.
func bindStoicQuoteTypes(address common.Address, caller bind.ContractCaller, transactor bind.ContractTransactor, filterer bind.ContractFilterer) (*bind.BoundContract, error) {
	parsed, err := abi.JSON(strings.NewReader(StoicQuoteTypesABI))
	if err != nil {
		return nil, err
	}
	return bind.NewBoundContract(address, parsed, caller, transactor, filterer), nil
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_StoicQuoteTypes *StoicQuoteTypesRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _StoicQuoteTypes.Contract.StoicQuoteTypesCaller.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_StoicQuoteTypes *StoicQuoteTypesRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _StoicQuoteTypes.Contract.StoicQuoteTypesTransactor.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_StoicQuoteTypes *StoicQuoteTypesRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _StoicQuoteTypes.Contract.StoicQuoteTypesTransactor.contract.Transact(opts, method, params...)
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_StoicQuoteTypes *StoicQuoteTypesCallerRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _StoicQuoteTypes.Contract.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_StoicQuoteTypes *StoicQuoteTypesTransactorRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _StoicQuoteTypes.Contract.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_StoicQuoteTypes *StoicQuoteTypesTransactorRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _StoicQuoteTypes.Contract.contract.Transact(opts, method, params...)
}

// UseAllTypes is a paid mutator transaction binding the contract method 0x14ed8d0d.
//
// Solidity: function useAllTypes(((string,string)) _stoicquote) returns()
func (_StoicQuoteTypes *StoicQuoteTypesTransactor) UseAllTypes(opts *bind.TransactOpts, _stoicquote StoicQuoteTypesStoicQuote) (*types.Transaction, error) {
	return _StoicQuoteTypes.contract.Transact(opts, "useAllTypes", _stoicquote)
}

// UseAllTypes is a paid mutator transaction binding the contract method 0x14ed8d0d.
//
// Solidity: function useAllTypes(((string,string)) _stoicquote) returns()
func (_StoicQuoteTypes *StoicQuoteTypesSession) UseAllTypes(_stoicquote StoicQuoteTypesStoicQuote) (*types.Transaction, error) {
	return _StoicQuoteTypes.Contract.UseAllTypes(&_StoicQuoteTypes.TransactOpts, _stoicquote)
}

// UseAllTypes is a paid mutator transaction binding the contract method 0x14ed8d0d.
//
// Solidity: function useAllTypes(((string,string)) _stoicquote) returns()
func (_StoicQuoteTypes *StoicQuoteTypesTransactorSession) UseAllTypes(_stoicquote StoicQuoteTypesStoicQuote) (*types.Transaction, error) {
	return _StoicQuoteTypes.Contract.UseAllTypes(&_StoicQuoteTypes.TransactOpts, _stoicquote)
}
