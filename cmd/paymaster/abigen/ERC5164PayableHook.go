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

// InterchainGasPaymasterDomainGasConfig is an auto generated low-level Go binding around an user-defined struct.
type InterchainGasPaymasterDomainGasConfig struct {
	GasOracle   common.Address
	GasOverhead *big.Int
}

// InterchainGasPaymasterGasParam is an auto generated low-level Go binding around an user-defined struct.
type InterchainGasPaymasterGasParam struct {
	RemoteDomain uint32
	Config       InterchainGasPaymasterDomainGasConfig
}

// ERC5164PayableHookMetaData contains all meta data concerning the ERC5164PayableHook contract.
var ERC5164PayableHookMetaData = &bind.MetaData{
	ABI: "[{\"type\":\"constructor\",\"inputs\":[{\"name\":\"_mailbox\",\"type\":\"address\",\"internalType\":\"address\"},{\"name\":\"_destinationDomain\",\"type\":\"uint32\",\"internalType\":\"uint32\"},{\"name\":\"_ism\",\"type\":\"bytes32\",\"internalType\":\"bytes32\"}],\"stateMutability\":\"nonpayable\"},{\"type\":\"function\",\"name\":\"PACKAGE_VERSION\",\"inputs\":[],\"outputs\":[{\"name\":\"\",\"type\":\"string\",\"internalType\":\"string\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"beneficiary\",\"inputs\":[],\"outputs\":[{\"name\":\"\",\"type\":\"address\",\"internalType\":\"address\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"destinationDomain\",\"inputs\":[],\"outputs\":[{\"name\":\"\",\"type\":\"uint32\",\"internalType\":\"uint32\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"destinationGasConfigs\",\"inputs\":[{\"name\":\"\",\"type\":\"uint32\",\"internalType\":\"uint32\"}],\"outputs\":[{\"name\":\"gasOracle\",\"type\":\"address\",\"internalType\":\"contractIGasOracle\"},{\"name\":\"gasOverhead\",\"type\":\"uint96\",\"internalType\":\"uint96\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"dispatcher\",\"inputs\":[],\"outputs\":[{\"name\":\"\",\"type\":\"address\",\"internalType\":\"contractIMessageDispatcher\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"getExchangeRateAndGasPrice\",\"inputs\":[{\"name\":\"_destinationDomain\",\"type\":\"uint32\",\"internalType\":\"uint32\"}],\"outputs\":[{\"name\":\"tokenExchangeRate\",\"type\":\"uint128\",\"internalType\":\"uint128\"},{\"name\":\"gasPrice\",\"type\":\"uint128\",\"internalType\":\"uint128\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"hook\",\"inputs\":[],\"outputs\":[{\"name\":\"\",\"type\":\"address\",\"internalType\":\"contractIPostDispatchHook\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"hookType\",\"inputs\":[],\"outputs\":[{\"name\":\"\",\"type\":\"uint8\",\"internalType\":\"uint8\"}],\"stateMutability\":\"pure\"},{\"type\":\"function\",\"name\":\"initialize\",\"inputs\":[{\"name\":\"_owner\",\"type\":\"address\",\"internalType\":\"address\"},{\"name\":\"_beneficiary\",\"type\":\"address\",\"internalType\":\"address\"}],\"outputs\":[],\"stateMutability\":\"nonpayable\"},{\"type\":\"function\",\"name\":\"interchainSecurityModule\",\"inputs\":[],\"outputs\":[{\"name\":\"\",\"type\":\"address\",\"internalType\":\"contractIInterchainSecurityModule\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"ism\",\"inputs\":[],\"outputs\":[{\"name\":\"\",\"type\":\"bytes32\",\"internalType\":\"bytes32\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"localDomain\",\"inputs\":[],\"outputs\":[{\"name\":\"\",\"type\":\"uint32\",\"internalType\":\"uint32\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"mailbox\",\"inputs\":[],\"outputs\":[{\"name\":\"\",\"type\":\"address\",\"internalType\":\"contractIMailbox\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"owner\",\"inputs\":[],\"outputs\":[{\"name\":\"\",\"type\":\"address\",\"internalType\":\"address\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"postDispatch\",\"inputs\":[{\"name\":\"metadata\",\"type\":\"bytes\",\"internalType\":\"bytes\"},{\"name\":\"message\",\"type\":\"bytes\",\"internalType\":\"bytes\"}],\"outputs\":[],\"stateMutability\":\"payable\"},{\"type\":\"function\",\"name\":\"quoteDispatch\",\"inputs\":[{\"name\":\"metadata\",\"type\":\"bytes\",\"internalType\":\"bytes\"},{\"name\":\"message\",\"type\":\"bytes\",\"internalType\":\"bytes\"}],\"outputs\":[{\"name\":\"\",\"type\":\"uint256\",\"internalType\":\"uint256\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"renounceOwnership\",\"inputs\":[],\"outputs\":[],\"stateMutability\":\"nonpayable\"},{\"type\":\"function\",\"name\":\"setBeneficiary\",\"inputs\":[{\"name\":\"_beneficiary\",\"type\":\"address\",\"internalType\":\"address\"}],\"outputs\":[],\"stateMutability\":\"nonpayable\"},{\"type\":\"function\",\"name\":\"setDestinationGasConfigs\",\"inputs\":[{\"name\":\"_configs\",\"type\":\"tuple[]\",\"internalType\":\"structInterchainGasPaymaster.GasParam[]\",\"components\":[{\"name\":\"remoteDomain\",\"type\":\"uint32\",\"internalType\":\"uint32\"},{\"name\":\"config\",\"type\":\"tuple\",\"internalType\":\"structInterchainGasPaymaster.DomainGasConfig\",\"components\":[{\"name\":\"gasOracle\",\"type\":\"address\",\"internalType\":\"contractIGasOracle\"},{\"name\":\"gasOverhead\",\"type\":\"uint96\",\"internalType\":\"uint96\"}]}]}],\"outputs\":[],\"stateMutability\":\"nonpayable\"},{\"type\":\"function\",\"name\":\"setHook\",\"inputs\":[{\"name\":\"_hook\",\"type\":\"address\",\"internalType\":\"address\"}],\"outputs\":[],\"stateMutability\":\"nonpayable\"},{\"type\":\"function\",\"name\":\"setInterchainSecurityModule\",\"inputs\":[{\"name\":\"_module\",\"type\":\"address\",\"internalType\":\"address\"}],\"outputs\":[],\"stateMutability\":\"nonpayable\"},{\"type\":\"function\",\"name\":\"supportsMetadata\",\"inputs\":[{\"name\":\"metadata\",\"type\":\"bytes\",\"internalType\":\"bytes\"}],\"outputs\":[{\"name\":\"\",\"type\":\"bool\",\"internalType\":\"bool\"}],\"stateMutability\":\"pure\"},{\"type\":\"function\",\"name\":\"transferOwnership\",\"inputs\":[{\"name\":\"newOwner\",\"type\":\"address\",\"internalType\":\"address\"}],\"outputs\":[],\"stateMutability\":\"nonpayable\"},{\"type\":\"event\",\"name\":\"BeneficiarySet\",\"inputs\":[{\"name\":\"beneficiary\",\"type\":\"address\",\"indexed\":false,\"internalType\":\"address\"}],\"anonymous\":false},{\"type\":\"event\",\"name\":\"DestinationGasConfigSet\",\"inputs\":[{\"name\":\"remoteDomain\",\"type\":\"uint32\",\"indexed\":false,\"internalType\":\"uint32\"},{\"name\":\"gasOracle\",\"type\":\"address\",\"indexed\":false,\"internalType\":\"address\"},{\"name\":\"gasOverhead\",\"type\":\"uint96\",\"indexed\":false,\"internalType\":\"uint96\"}],\"anonymous\":false},{\"type\":\"event\",\"name\":\"GasPayment\",\"inputs\":[{\"name\":\"messageId\",\"type\":\"bytes32\",\"indexed\":true,\"internalType\":\"bytes32\"},{\"name\":\"destinationDomain\",\"type\":\"uint32\",\"indexed\":true,\"internalType\":\"uint32\"},{\"name\":\"gasAmount\",\"type\":\"uint256\",\"indexed\":false,\"internalType\":\"uint256\"},{\"name\":\"payment\",\"type\":\"uint256\",\"indexed\":false,\"internalType\":\"uint256\"}],\"anonymous\":false},{\"type\":\"event\",\"name\":\"HookSet\",\"inputs\":[{\"name\":\"_hook\",\"type\":\"address\",\"indexed\":false,\"internalType\":\"address\"}],\"anonymous\":false},{\"type\":\"event\",\"name\":\"Initialized\",\"inputs\":[{\"name\":\"version\",\"type\":\"uint8\",\"indexed\":false,\"internalType\":\"uint8\"}],\"anonymous\":false},{\"type\":\"event\",\"name\":\"IsmSet\",\"inputs\":[{\"name\":\"_ism\",\"type\":\"address\",\"indexed\":false,\"internalType\":\"address\"}],\"anonymous\":false},{\"type\":\"event\",\"name\":\"OwnershipTransferred\",\"inputs\":[{\"name\":\"previousOwner\",\"type\":\"address\",\"indexed\":true,\"internalType\":\"address\"},{\"name\":\"newOwner\",\"type\":\"address\",\"indexed\":true,\"internalType\":\"address\"}],\"anonymous\":false}]",
}

// ERC5164PayableHookABI is the input ABI used to generate the binding from.
// Deprecated: Use ERC5164PayableHookMetaData.ABI instead.
var ERC5164PayableHookABI = ERC5164PayableHookMetaData.ABI

// ERC5164PayableHook is an auto generated Go binding around an Ethereum contract.
type ERC5164PayableHook struct {
	ERC5164PayableHookCaller     // Read-only binding to the contract
	ERC5164PayableHookTransactor // Write-only binding to the contract
	ERC5164PayableHookFilterer   // Log filterer for contract events
}

// ERC5164PayableHookCaller is an auto generated read-only Go binding around an Ethereum contract.
type ERC5164PayableHookCaller struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// ERC5164PayableHookTransactor is an auto generated write-only Go binding around an Ethereum contract.
type ERC5164PayableHookTransactor struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// ERC5164PayableHookFilterer is an auto generated log filtering Go binding around an Ethereum contract events.
type ERC5164PayableHookFilterer struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// ERC5164PayableHookSession is an auto generated Go binding around an Ethereum contract,
// with pre-set call and transact options.
type ERC5164PayableHookSession struct {
	Contract     *ERC5164PayableHook // Generic contract binding to set the session for
	CallOpts     bind.CallOpts       // Call options to use throughout this session
	TransactOpts bind.TransactOpts   // Transaction auth options to use throughout this session
}

// ERC5164PayableHookCallerSession is an auto generated read-only Go binding around an Ethereum contract,
// with pre-set call options.
type ERC5164PayableHookCallerSession struct {
	Contract *ERC5164PayableHookCaller // Generic contract caller binding to set the session for
	CallOpts bind.CallOpts             // Call options to use throughout this session
}

// ERC5164PayableHookTransactorSession is an auto generated write-only Go binding around an Ethereum contract,
// with pre-set transact options.
type ERC5164PayableHookTransactorSession struct {
	Contract     *ERC5164PayableHookTransactor // Generic contract transactor binding to set the session for
	TransactOpts bind.TransactOpts             // Transaction auth options to use throughout this session
}

// ERC5164PayableHookRaw is an auto generated low-level Go binding around an Ethereum contract.
type ERC5164PayableHookRaw struct {
	Contract *ERC5164PayableHook // Generic contract binding to access the raw methods on
}

// ERC5164PayableHookCallerRaw is an auto generated low-level read-only Go binding around an Ethereum contract.
type ERC5164PayableHookCallerRaw struct {
	Contract *ERC5164PayableHookCaller // Generic read-only contract binding to access the raw methods on
}

// ERC5164PayableHookTransactorRaw is an auto generated low-level write-only Go binding around an Ethereum contract.
type ERC5164PayableHookTransactorRaw struct {
	Contract *ERC5164PayableHookTransactor // Generic write-only contract binding to access the raw methods on
}

// NewERC5164PayableHook creates a new instance of ERC5164PayableHook, bound to a specific deployed contract.
func NewERC5164PayableHook(address common.Address, backend bind.ContractBackend) (*ERC5164PayableHook, error) {
	contract, err := bindERC5164PayableHook(address, backend, backend, backend)
	if err != nil {
		return nil, err
	}
	return &ERC5164PayableHook{ERC5164PayableHookCaller: ERC5164PayableHookCaller{contract: contract}, ERC5164PayableHookTransactor: ERC5164PayableHookTransactor{contract: contract}, ERC5164PayableHookFilterer: ERC5164PayableHookFilterer{contract: contract}}, nil
}

// NewERC5164PayableHookCaller creates a new read-only instance of ERC5164PayableHook, bound to a specific deployed contract.
func NewERC5164PayableHookCaller(address common.Address, caller bind.ContractCaller) (*ERC5164PayableHookCaller, error) {
	contract, err := bindERC5164PayableHook(address, caller, nil, nil)
	if err != nil {
		return nil, err
	}
	return &ERC5164PayableHookCaller{contract: contract}, nil
}

// NewERC5164PayableHookTransactor creates a new write-only instance of ERC5164PayableHook, bound to a specific deployed contract.
func NewERC5164PayableHookTransactor(address common.Address, transactor bind.ContractTransactor) (*ERC5164PayableHookTransactor, error) {
	contract, err := bindERC5164PayableHook(address, nil, transactor, nil)
	if err != nil {
		return nil, err
	}
	return &ERC5164PayableHookTransactor{contract: contract}, nil
}

// NewERC5164PayableHookFilterer creates a new log filterer instance of ERC5164PayableHook, bound to a specific deployed contract.
func NewERC5164PayableHookFilterer(address common.Address, filterer bind.ContractFilterer) (*ERC5164PayableHookFilterer, error) {
	contract, err := bindERC5164PayableHook(address, nil, nil, filterer)
	if err != nil {
		return nil, err
	}
	return &ERC5164PayableHookFilterer{contract: contract}, nil
}

// bindERC5164PayableHook binds a generic wrapper to an already deployed contract.
func bindERC5164PayableHook(address common.Address, caller bind.ContractCaller, transactor bind.ContractTransactor, filterer bind.ContractFilterer) (*bind.BoundContract, error) {
	parsed, err := ERC5164PayableHookMetaData.GetAbi()
	if err != nil {
		return nil, err
	}
	return bind.NewBoundContract(address, *parsed, caller, transactor, filterer), nil
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_ERC5164PayableHook *ERC5164PayableHookRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _ERC5164PayableHook.Contract.ERC5164PayableHookCaller.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_ERC5164PayableHook *ERC5164PayableHookRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _ERC5164PayableHook.Contract.ERC5164PayableHookTransactor.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_ERC5164PayableHook *ERC5164PayableHookRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _ERC5164PayableHook.Contract.ERC5164PayableHookTransactor.contract.Transact(opts, method, params...)
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_ERC5164PayableHook *ERC5164PayableHookCallerRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _ERC5164PayableHook.Contract.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_ERC5164PayableHook *ERC5164PayableHookTransactorRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _ERC5164PayableHook.Contract.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_ERC5164PayableHook *ERC5164PayableHookTransactorRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _ERC5164PayableHook.Contract.contract.Transact(opts, method, params...)
}

// PACKAGEVERSION is a free data retrieval call binding the contract method 0x93c44847.
//
// Solidity: function PACKAGE_VERSION() view returns(string)
func (_ERC5164PayableHook *ERC5164PayableHookCaller) PACKAGEVERSION(opts *bind.CallOpts) (string, error) {
	var out []interface{}
	err := _ERC5164PayableHook.contract.Call(opts, &out, "PACKAGE_VERSION")

	if err != nil {
		return *new(string), err
	}

	out0 := *abi.ConvertType(out[0], new(string)).(*string)

	return out0, err

}

// PACKAGEVERSION is a free data retrieval call binding the contract method 0x93c44847.
//
// Solidity: function PACKAGE_VERSION() view returns(string)
func (_ERC5164PayableHook *ERC5164PayableHookSession) PACKAGEVERSION() (string, error) {
	return _ERC5164PayableHook.Contract.PACKAGEVERSION(&_ERC5164PayableHook.CallOpts)
}

// PACKAGEVERSION is a free data retrieval call binding the contract method 0x93c44847.
//
// Solidity: function PACKAGE_VERSION() view returns(string)
func (_ERC5164PayableHook *ERC5164PayableHookCallerSession) PACKAGEVERSION() (string, error) {
	return _ERC5164PayableHook.Contract.PACKAGEVERSION(&_ERC5164PayableHook.CallOpts)
}

// Beneficiary is a free data retrieval call binding the contract method 0x38af3eed.
//
// Solidity: function beneficiary() view returns(address)
func (_ERC5164PayableHook *ERC5164PayableHookCaller) Beneficiary(opts *bind.CallOpts) (common.Address, error) {
	var out []interface{}
	err := _ERC5164PayableHook.contract.Call(opts, &out, "beneficiary")

	if err != nil {
		return *new(common.Address), err
	}

	out0 := *abi.ConvertType(out[0], new(common.Address)).(*common.Address)

	return out0, err

}

// Beneficiary is a free data retrieval call binding the contract method 0x38af3eed.
//
// Solidity: function beneficiary() view returns(address)
func (_ERC5164PayableHook *ERC5164PayableHookSession) Beneficiary() (common.Address, error) {
	return _ERC5164PayableHook.Contract.Beneficiary(&_ERC5164PayableHook.CallOpts)
}

// Beneficiary is a free data retrieval call binding the contract method 0x38af3eed.
//
// Solidity: function beneficiary() view returns(address)
func (_ERC5164PayableHook *ERC5164PayableHookCallerSession) Beneficiary() (common.Address, error) {
	return _ERC5164PayableHook.Contract.Beneficiary(&_ERC5164PayableHook.CallOpts)
}

// DestinationDomain is a free data retrieval call binding the contract method 0x2858c55a.
//
// Solidity: function destinationDomain() view returns(uint32)
func (_ERC5164PayableHook *ERC5164PayableHookCaller) DestinationDomain(opts *bind.CallOpts) (uint32, error) {
	var out []interface{}
	err := _ERC5164PayableHook.contract.Call(opts, &out, "destinationDomain")

	if err != nil {
		return *new(uint32), err
	}

	out0 := *abi.ConvertType(out[0], new(uint32)).(*uint32)

	return out0, err

}

// DestinationDomain is a free data retrieval call binding the contract method 0x2858c55a.
//
// Solidity: function destinationDomain() view returns(uint32)
func (_ERC5164PayableHook *ERC5164PayableHookSession) DestinationDomain() (uint32, error) {
	return _ERC5164PayableHook.Contract.DestinationDomain(&_ERC5164PayableHook.CallOpts)
}

// DestinationDomain is a free data retrieval call binding the contract method 0x2858c55a.
//
// Solidity: function destinationDomain() view returns(uint32)
func (_ERC5164PayableHook *ERC5164PayableHookCallerSession) DestinationDomain() (uint32, error) {
	return _ERC5164PayableHook.Contract.DestinationDomain(&_ERC5164PayableHook.CallOpts)
}

// DestinationGasConfigs is a free data retrieval call binding the contract method 0x43c467c0.
//
// Solidity: function destinationGasConfigs(uint32 ) view returns(address gasOracle, uint96 gasOverhead)
func (_ERC5164PayableHook *ERC5164PayableHookCaller) DestinationGasConfigs(opts *bind.CallOpts, arg0 uint32) (struct {
	GasOracle   common.Address
	GasOverhead *big.Int
}, error) {
	var out []interface{}
	err := _ERC5164PayableHook.contract.Call(opts, &out, "destinationGasConfigs", arg0)

	outstruct := new(struct {
		GasOracle   common.Address
		GasOverhead *big.Int
	})
	if err != nil {
		return *outstruct, err
	}

	outstruct.GasOracle = *abi.ConvertType(out[0], new(common.Address)).(*common.Address)
	outstruct.GasOverhead = *abi.ConvertType(out[1], new(*big.Int)).(**big.Int)

	return *outstruct, err

}

// DestinationGasConfigs is a free data retrieval call binding the contract method 0x43c467c0.
//
// Solidity: function destinationGasConfigs(uint32 ) view returns(address gasOracle, uint96 gasOverhead)
func (_ERC5164PayableHook *ERC5164PayableHookSession) DestinationGasConfigs(arg0 uint32) (struct {
	GasOracle   common.Address
	GasOverhead *big.Int
}, error) {
	return _ERC5164PayableHook.Contract.DestinationGasConfigs(&_ERC5164PayableHook.CallOpts, arg0)
}

// DestinationGasConfigs is a free data retrieval call binding the contract method 0x43c467c0.
//
// Solidity: function destinationGasConfigs(uint32 ) view returns(address gasOracle, uint96 gasOverhead)
func (_ERC5164PayableHook *ERC5164PayableHookCallerSession) DestinationGasConfigs(arg0 uint32) (struct {
	GasOracle   common.Address
	GasOverhead *big.Int
}, error) {
	return _ERC5164PayableHook.Contract.DestinationGasConfigs(&_ERC5164PayableHook.CallOpts, arg0)
}

// Dispatcher is a free data retrieval call binding the contract method 0xcb7e9057.
//
// Solidity: function dispatcher() view returns(address)
func (_ERC5164PayableHook *ERC5164PayableHookCaller) Dispatcher(opts *bind.CallOpts) (common.Address, error) {
	var out []interface{}
	err := _ERC5164PayableHook.contract.Call(opts, &out, "dispatcher")

	if err != nil {
		return *new(common.Address), err
	}

	out0 := *abi.ConvertType(out[0], new(common.Address)).(*common.Address)

	return out0, err

}

// Dispatcher is a free data retrieval call binding the contract method 0xcb7e9057.
//
// Solidity: function dispatcher() view returns(address)
func (_ERC5164PayableHook *ERC5164PayableHookSession) Dispatcher() (common.Address, error) {
	return _ERC5164PayableHook.Contract.Dispatcher(&_ERC5164PayableHook.CallOpts)
}

// Dispatcher is a free data retrieval call binding the contract method 0xcb7e9057.
//
// Solidity: function dispatcher() view returns(address)
func (_ERC5164PayableHook *ERC5164PayableHookCallerSession) Dispatcher() (common.Address, error) {
	return _ERC5164PayableHook.Contract.Dispatcher(&_ERC5164PayableHook.CallOpts)
}

// GetExchangeRateAndGasPrice is a free data retrieval call binding the contract method 0x60fcef7c.
//
// Solidity: function getExchangeRateAndGasPrice(uint32 _destinationDomain) view returns(uint128 tokenExchangeRate, uint128 gasPrice)
func (_ERC5164PayableHook *ERC5164PayableHookCaller) GetExchangeRateAndGasPrice(opts *bind.CallOpts, _destinationDomain uint32) (struct {
	TokenExchangeRate *big.Int
	GasPrice          *big.Int
}, error) {
	var out []interface{}
	err := _ERC5164PayableHook.contract.Call(opts, &out, "getExchangeRateAndGasPrice", _destinationDomain)

	outstruct := new(struct {
		TokenExchangeRate *big.Int
		GasPrice          *big.Int
	})
	if err != nil {
		return *outstruct, err
	}

	outstruct.TokenExchangeRate = *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)
	outstruct.GasPrice = *abi.ConvertType(out[1], new(*big.Int)).(**big.Int)

	return *outstruct, err

}

// GetExchangeRateAndGasPrice is a free data retrieval call binding the contract method 0x60fcef7c.
//
// Solidity: function getExchangeRateAndGasPrice(uint32 _destinationDomain) view returns(uint128 tokenExchangeRate, uint128 gasPrice)
func (_ERC5164PayableHook *ERC5164PayableHookSession) GetExchangeRateAndGasPrice(_destinationDomain uint32) (struct {
	TokenExchangeRate *big.Int
	GasPrice          *big.Int
}, error) {
	return _ERC5164PayableHook.Contract.GetExchangeRateAndGasPrice(&_ERC5164PayableHook.CallOpts, _destinationDomain)
}

// GetExchangeRateAndGasPrice is a free data retrieval call binding the contract method 0x60fcef7c.
//
// Solidity: function getExchangeRateAndGasPrice(uint32 _destinationDomain) view returns(uint128 tokenExchangeRate, uint128 gasPrice)
func (_ERC5164PayableHook *ERC5164PayableHookCallerSession) GetExchangeRateAndGasPrice(_destinationDomain uint32) (struct {
	TokenExchangeRate *big.Int
	GasPrice          *big.Int
}, error) {
	return _ERC5164PayableHook.Contract.GetExchangeRateAndGasPrice(&_ERC5164PayableHook.CallOpts, _destinationDomain)
}

// Hook is a free data retrieval call binding the contract method 0x7f5a7c7b.
//
// Solidity: function hook() view returns(address)
func (_ERC5164PayableHook *ERC5164PayableHookCaller) Hook(opts *bind.CallOpts) (common.Address, error) {
	var out []interface{}
	err := _ERC5164PayableHook.contract.Call(opts, &out, "hook")

	if err != nil {
		return *new(common.Address), err
	}

	out0 := *abi.ConvertType(out[0], new(common.Address)).(*common.Address)

	return out0, err

}

// Hook is a free data retrieval call binding the contract method 0x7f5a7c7b.
//
// Solidity: function hook() view returns(address)
func (_ERC5164PayableHook *ERC5164PayableHookSession) Hook() (common.Address, error) {
	return _ERC5164PayableHook.Contract.Hook(&_ERC5164PayableHook.CallOpts)
}

// Hook is a free data retrieval call binding the contract method 0x7f5a7c7b.
//
// Solidity: function hook() view returns(address)
func (_ERC5164PayableHook *ERC5164PayableHookCallerSession) Hook() (common.Address, error) {
	return _ERC5164PayableHook.Contract.Hook(&_ERC5164PayableHook.CallOpts)
}

// HookType is a free data retrieval call binding the contract method 0xe445e7dd.
//
// Solidity: function hookType() pure returns(uint8)
func (_ERC5164PayableHook *ERC5164PayableHookCaller) HookType(opts *bind.CallOpts) (uint8, error) {
	var out []interface{}
	err := _ERC5164PayableHook.contract.Call(opts, &out, "hookType")

	if err != nil {
		return *new(uint8), err
	}

	out0 := *abi.ConvertType(out[0], new(uint8)).(*uint8)

	return out0, err

}

// HookType is a free data retrieval call binding the contract method 0xe445e7dd.
//
// Solidity: function hookType() pure returns(uint8)
func (_ERC5164PayableHook *ERC5164PayableHookSession) HookType() (uint8, error) {
	return _ERC5164PayableHook.Contract.HookType(&_ERC5164PayableHook.CallOpts)
}

// HookType is a free data retrieval call binding the contract method 0xe445e7dd.
//
// Solidity: function hookType() pure returns(uint8)
func (_ERC5164PayableHook *ERC5164PayableHookCallerSession) HookType() (uint8, error) {
	return _ERC5164PayableHook.Contract.HookType(&_ERC5164PayableHook.CallOpts)
}

// InterchainSecurityModule is a free data retrieval call binding the contract method 0xde523cf3.
//
// Solidity: function interchainSecurityModule() view returns(address)
func (_ERC5164PayableHook *ERC5164PayableHookCaller) InterchainSecurityModule(opts *bind.CallOpts) (common.Address, error) {
	var out []interface{}
	err := _ERC5164PayableHook.contract.Call(opts, &out, "interchainSecurityModule")

	if err != nil {
		return *new(common.Address), err
	}

	out0 := *abi.ConvertType(out[0], new(common.Address)).(*common.Address)

	return out0, err

}

// InterchainSecurityModule is a free data retrieval call binding the contract method 0xde523cf3.
//
// Solidity: function interchainSecurityModule() view returns(address)
func (_ERC5164PayableHook *ERC5164PayableHookSession) InterchainSecurityModule() (common.Address, error) {
	return _ERC5164PayableHook.Contract.InterchainSecurityModule(&_ERC5164PayableHook.CallOpts)
}

// InterchainSecurityModule is a free data retrieval call binding the contract method 0xde523cf3.
//
// Solidity: function interchainSecurityModule() view returns(address)
func (_ERC5164PayableHook *ERC5164PayableHookCallerSession) InterchainSecurityModule() (common.Address, error) {
	return _ERC5164PayableHook.Contract.InterchainSecurityModule(&_ERC5164PayableHook.CallOpts)
}

// Ism is a free data retrieval call binding the contract method 0x4deefab2.
//
// Solidity: function ism() view returns(bytes32)
func (_ERC5164PayableHook *ERC5164PayableHookCaller) Ism(opts *bind.CallOpts) ([32]byte, error) {
	var out []interface{}
	err := _ERC5164PayableHook.contract.Call(opts, &out, "ism")

	if err != nil {
		return *new([32]byte), err
	}

	out0 := *abi.ConvertType(out[0], new([32]byte)).(*[32]byte)

	return out0, err

}

// Ism is a free data retrieval call binding the contract method 0x4deefab2.
//
// Solidity: function ism() view returns(bytes32)
func (_ERC5164PayableHook *ERC5164PayableHookSession) Ism() ([32]byte, error) {
	return _ERC5164PayableHook.Contract.Ism(&_ERC5164PayableHook.CallOpts)
}

// Ism is a free data retrieval call binding the contract method 0x4deefab2.
//
// Solidity: function ism() view returns(bytes32)
func (_ERC5164PayableHook *ERC5164PayableHookCallerSession) Ism() ([32]byte, error) {
	return _ERC5164PayableHook.Contract.Ism(&_ERC5164PayableHook.CallOpts)
}

// LocalDomain is a free data retrieval call binding the contract method 0x8d3638f4.
//
// Solidity: function localDomain() view returns(uint32)
func (_ERC5164PayableHook *ERC5164PayableHookCaller) LocalDomain(opts *bind.CallOpts) (uint32, error) {
	var out []interface{}
	err := _ERC5164PayableHook.contract.Call(opts, &out, "localDomain")

	if err != nil {
		return *new(uint32), err
	}

	out0 := *abi.ConvertType(out[0], new(uint32)).(*uint32)

	return out0, err

}

// LocalDomain is a free data retrieval call binding the contract method 0x8d3638f4.
//
// Solidity: function localDomain() view returns(uint32)
func (_ERC5164PayableHook *ERC5164PayableHookSession) LocalDomain() (uint32, error) {
	return _ERC5164PayableHook.Contract.LocalDomain(&_ERC5164PayableHook.CallOpts)
}

// LocalDomain is a free data retrieval call binding the contract method 0x8d3638f4.
//
// Solidity: function localDomain() view returns(uint32)
func (_ERC5164PayableHook *ERC5164PayableHookCallerSession) LocalDomain() (uint32, error) {
	return _ERC5164PayableHook.Contract.LocalDomain(&_ERC5164PayableHook.CallOpts)
}

// Mailbox is a free data retrieval call binding the contract method 0xd5438eae.
//
// Solidity: function mailbox() view returns(address)
func (_ERC5164PayableHook *ERC5164PayableHookCaller) Mailbox(opts *bind.CallOpts) (common.Address, error) {
	var out []interface{}
	err := _ERC5164PayableHook.contract.Call(opts, &out, "mailbox")

	if err != nil {
		return *new(common.Address), err
	}

	out0 := *abi.ConvertType(out[0], new(common.Address)).(*common.Address)

	return out0, err

}

// Mailbox is a free data retrieval call binding the contract method 0xd5438eae.
//
// Solidity: function mailbox() view returns(address)
func (_ERC5164PayableHook *ERC5164PayableHookSession) Mailbox() (common.Address, error) {
	return _ERC5164PayableHook.Contract.Mailbox(&_ERC5164PayableHook.CallOpts)
}

// Mailbox is a free data retrieval call binding the contract method 0xd5438eae.
//
// Solidity: function mailbox() view returns(address)
func (_ERC5164PayableHook *ERC5164PayableHookCallerSession) Mailbox() (common.Address, error) {
	return _ERC5164PayableHook.Contract.Mailbox(&_ERC5164PayableHook.CallOpts)
}

// Owner is a free data retrieval call binding the contract method 0x8da5cb5b.
//
// Solidity: function owner() view returns(address)
func (_ERC5164PayableHook *ERC5164PayableHookCaller) Owner(opts *bind.CallOpts) (common.Address, error) {
	var out []interface{}
	err := _ERC5164PayableHook.contract.Call(opts, &out, "owner")

	if err != nil {
		return *new(common.Address), err
	}

	out0 := *abi.ConvertType(out[0], new(common.Address)).(*common.Address)

	return out0, err

}

// Owner is a free data retrieval call binding the contract method 0x8da5cb5b.
//
// Solidity: function owner() view returns(address)
func (_ERC5164PayableHook *ERC5164PayableHookSession) Owner() (common.Address, error) {
	return _ERC5164PayableHook.Contract.Owner(&_ERC5164PayableHook.CallOpts)
}

// Owner is a free data retrieval call binding the contract method 0x8da5cb5b.
//
// Solidity: function owner() view returns(address)
func (_ERC5164PayableHook *ERC5164PayableHookCallerSession) Owner() (common.Address, error) {
	return _ERC5164PayableHook.Contract.Owner(&_ERC5164PayableHook.CallOpts)
}

// QuoteDispatch is a free data retrieval call binding the contract method 0xaaccd230.
//
// Solidity: function quoteDispatch(bytes metadata, bytes message) view returns(uint256)
func (_ERC5164PayableHook *ERC5164PayableHookCaller) QuoteDispatch(opts *bind.CallOpts, metadata []byte, message []byte) (*big.Int, error) {
	var out []interface{}
	err := _ERC5164PayableHook.contract.Call(opts, &out, "quoteDispatch", metadata, message)

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// QuoteDispatch is a free data retrieval call binding the contract method 0xaaccd230.
//
// Solidity: function quoteDispatch(bytes metadata, bytes message) view returns(uint256)
func (_ERC5164PayableHook *ERC5164PayableHookSession) QuoteDispatch(metadata []byte, message []byte) (*big.Int, error) {
	return _ERC5164PayableHook.Contract.QuoteDispatch(&_ERC5164PayableHook.CallOpts, metadata, message)
}

// QuoteDispatch is a free data retrieval call binding the contract method 0xaaccd230.
//
// Solidity: function quoteDispatch(bytes metadata, bytes message) view returns(uint256)
func (_ERC5164PayableHook *ERC5164PayableHookCallerSession) QuoteDispatch(metadata []byte, message []byte) (*big.Int, error) {
	return _ERC5164PayableHook.Contract.QuoteDispatch(&_ERC5164PayableHook.CallOpts, metadata, message)
}

// SupportsMetadata is a free data retrieval call binding the contract method 0xe5320bb9.
//
// Solidity: function supportsMetadata(bytes metadata) pure returns(bool)
func (_ERC5164PayableHook *ERC5164PayableHookCaller) SupportsMetadata(opts *bind.CallOpts, metadata []byte) (bool, error) {
	var out []interface{}
	err := _ERC5164PayableHook.contract.Call(opts, &out, "supportsMetadata", metadata)

	if err != nil {
		return *new(bool), err
	}

	out0 := *abi.ConvertType(out[0], new(bool)).(*bool)

	return out0, err

}

// SupportsMetadata is a free data retrieval call binding the contract method 0xe5320bb9.
//
// Solidity: function supportsMetadata(bytes metadata) pure returns(bool)
func (_ERC5164PayableHook *ERC5164PayableHookSession) SupportsMetadata(metadata []byte) (bool, error) {
	return _ERC5164PayableHook.Contract.SupportsMetadata(&_ERC5164PayableHook.CallOpts, metadata)
}

// SupportsMetadata is a free data retrieval call binding the contract method 0xe5320bb9.
//
// Solidity: function supportsMetadata(bytes metadata) pure returns(bool)
func (_ERC5164PayableHook *ERC5164PayableHookCallerSession) SupportsMetadata(metadata []byte) (bool, error) {
	return _ERC5164PayableHook.Contract.SupportsMetadata(&_ERC5164PayableHook.CallOpts, metadata)
}

// Initialize is a paid mutator transaction binding the contract method 0x485cc955.
//
// Solidity: function initialize(address _owner, address _beneficiary) returns()
func (_ERC5164PayableHook *ERC5164PayableHookTransactor) Initialize(opts *bind.TransactOpts, _owner common.Address, _beneficiary common.Address) (*types.Transaction, error) {
	return _ERC5164PayableHook.contract.Transact(opts, "initialize", _owner, _beneficiary)
}

// Initialize is a paid mutator transaction binding the contract method 0x485cc955.
//
// Solidity: function initialize(address _owner, address _beneficiary) returns()
func (_ERC5164PayableHook *ERC5164PayableHookSession) Initialize(_owner common.Address, _beneficiary common.Address) (*types.Transaction, error) {
	return _ERC5164PayableHook.Contract.Initialize(&_ERC5164PayableHook.TransactOpts, _owner, _beneficiary)
}

// Initialize is a paid mutator transaction binding the contract method 0x485cc955.
//
// Solidity: function initialize(address _owner, address _beneficiary) returns()
func (_ERC5164PayableHook *ERC5164PayableHookTransactorSession) Initialize(_owner common.Address, _beneficiary common.Address) (*types.Transaction, error) {
	return _ERC5164PayableHook.Contract.Initialize(&_ERC5164PayableHook.TransactOpts, _owner, _beneficiary)
}

// PostDispatch is a paid mutator transaction binding the contract method 0x086011b9.
//
// Solidity: function postDispatch(bytes metadata, bytes message) payable returns()
func (_ERC5164PayableHook *ERC5164PayableHookTransactor) PostDispatch(opts *bind.TransactOpts, metadata []byte, message []byte) (*types.Transaction, error) {
	return _ERC5164PayableHook.contract.Transact(opts, "postDispatch", metadata, message)
}

// PostDispatch is a paid mutator transaction binding the contract method 0x086011b9.
//
// Solidity: function postDispatch(bytes metadata, bytes message) payable returns()
func (_ERC5164PayableHook *ERC5164PayableHookSession) PostDispatch(metadata []byte, message []byte) (*types.Transaction, error) {
	return _ERC5164PayableHook.Contract.PostDispatch(&_ERC5164PayableHook.TransactOpts, metadata, message)
}

// PostDispatch is a paid mutator transaction binding the contract method 0x086011b9.
//
// Solidity: function postDispatch(bytes metadata, bytes message) payable returns()
func (_ERC5164PayableHook *ERC5164PayableHookTransactorSession) PostDispatch(metadata []byte, message []byte) (*types.Transaction, error) {
	return _ERC5164PayableHook.Contract.PostDispatch(&_ERC5164PayableHook.TransactOpts, metadata, message)
}

// RenounceOwnership is a paid mutator transaction binding the contract method 0x715018a6.
//
// Solidity: function renounceOwnership() returns()
func (_ERC5164PayableHook *ERC5164PayableHookTransactor) RenounceOwnership(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _ERC5164PayableHook.contract.Transact(opts, "renounceOwnership")
}

// RenounceOwnership is a paid mutator transaction binding the contract method 0x715018a6.
//
// Solidity: function renounceOwnership() returns()
func (_ERC5164PayableHook *ERC5164PayableHookSession) RenounceOwnership() (*types.Transaction, error) {
	return _ERC5164PayableHook.Contract.RenounceOwnership(&_ERC5164PayableHook.TransactOpts)
}

// RenounceOwnership is a paid mutator transaction binding the contract method 0x715018a6.
//
// Solidity: function renounceOwnership() returns()
func (_ERC5164PayableHook *ERC5164PayableHookTransactorSession) RenounceOwnership() (*types.Transaction, error) {
	return _ERC5164PayableHook.Contract.RenounceOwnership(&_ERC5164PayableHook.TransactOpts)
}

// SetBeneficiary is a paid mutator transaction binding the contract method 0x1c31f710.
//
// Solidity: function setBeneficiary(address _beneficiary) returns()
func (_ERC5164PayableHook *ERC5164PayableHookTransactor) SetBeneficiary(opts *bind.TransactOpts, _beneficiary common.Address) (*types.Transaction, error) {
	return _ERC5164PayableHook.contract.Transact(opts, "setBeneficiary", _beneficiary)
}

// SetBeneficiary is a paid mutator transaction binding the contract method 0x1c31f710.
//
// Solidity: function setBeneficiary(address _beneficiary) returns()
func (_ERC5164PayableHook *ERC5164PayableHookSession) SetBeneficiary(_beneficiary common.Address) (*types.Transaction, error) {
	return _ERC5164PayableHook.Contract.SetBeneficiary(&_ERC5164PayableHook.TransactOpts, _beneficiary)
}

// SetBeneficiary is a paid mutator transaction binding the contract method 0x1c31f710.
//
// Solidity: function setBeneficiary(address _beneficiary) returns()
func (_ERC5164PayableHook *ERC5164PayableHookTransactorSession) SetBeneficiary(_beneficiary common.Address) (*types.Transaction, error) {
	return _ERC5164PayableHook.Contract.SetBeneficiary(&_ERC5164PayableHook.TransactOpts, _beneficiary)
}

// SetDestinationGasConfigs is a paid mutator transaction binding the contract method 0x48f4e6c1.
//
// Solidity: function setDestinationGasConfigs((uint32,(address,uint96))[] _configs) returns()
func (_ERC5164PayableHook *ERC5164PayableHookTransactor) SetDestinationGasConfigs(opts *bind.TransactOpts, _configs []InterchainGasPaymasterGasParam) (*types.Transaction, error) {
	return _ERC5164PayableHook.contract.Transact(opts, "setDestinationGasConfigs", _configs)
}

// SetDestinationGasConfigs is a paid mutator transaction binding the contract method 0x48f4e6c1.
//
// Solidity: function setDestinationGasConfigs((uint32,(address,uint96))[] _configs) returns()
func (_ERC5164PayableHook *ERC5164PayableHookSession) SetDestinationGasConfigs(_configs []InterchainGasPaymasterGasParam) (*types.Transaction, error) {
	return _ERC5164PayableHook.Contract.SetDestinationGasConfigs(&_ERC5164PayableHook.TransactOpts, _configs)
}

// SetDestinationGasConfigs is a paid mutator transaction binding the contract method 0x48f4e6c1.
//
// Solidity: function setDestinationGasConfigs((uint32,(address,uint96))[] _configs) returns()
func (_ERC5164PayableHook *ERC5164PayableHookTransactorSession) SetDestinationGasConfigs(_configs []InterchainGasPaymasterGasParam) (*types.Transaction, error) {
	return _ERC5164PayableHook.Contract.SetDestinationGasConfigs(&_ERC5164PayableHook.TransactOpts, _configs)
}

// SetHook is a paid mutator transaction binding the contract method 0x3dfd3873.
//
// Solidity: function setHook(address _hook) returns()
func (_ERC5164PayableHook *ERC5164PayableHookTransactor) SetHook(opts *bind.TransactOpts, _hook common.Address) (*types.Transaction, error) {
	return _ERC5164PayableHook.contract.Transact(opts, "setHook", _hook)
}

// SetHook is a paid mutator transaction binding the contract method 0x3dfd3873.
//
// Solidity: function setHook(address _hook) returns()
func (_ERC5164PayableHook *ERC5164PayableHookSession) SetHook(_hook common.Address) (*types.Transaction, error) {
	return _ERC5164PayableHook.Contract.SetHook(&_ERC5164PayableHook.TransactOpts, _hook)
}

// SetHook is a paid mutator transaction binding the contract method 0x3dfd3873.
//
// Solidity: function setHook(address _hook) returns()
func (_ERC5164PayableHook *ERC5164PayableHookTransactorSession) SetHook(_hook common.Address) (*types.Transaction, error) {
	return _ERC5164PayableHook.Contract.SetHook(&_ERC5164PayableHook.TransactOpts, _hook)
}

// SetInterchainSecurityModule is a paid mutator transaction binding the contract method 0x0e72cc06.
//
// Solidity: function setInterchainSecurityModule(address _module) returns()
func (_ERC5164PayableHook *ERC5164PayableHookTransactor) SetInterchainSecurityModule(opts *bind.TransactOpts, _module common.Address) (*types.Transaction, error) {
	return _ERC5164PayableHook.contract.Transact(opts, "setInterchainSecurityModule", _module)
}

// SetInterchainSecurityModule is a paid mutator transaction binding the contract method 0x0e72cc06.
//
// Solidity: function setInterchainSecurityModule(address _module) returns()
func (_ERC5164PayableHook *ERC5164PayableHookSession) SetInterchainSecurityModule(_module common.Address) (*types.Transaction, error) {
	return _ERC5164PayableHook.Contract.SetInterchainSecurityModule(&_ERC5164PayableHook.TransactOpts, _module)
}

// SetInterchainSecurityModule is a paid mutator transaction binding the contract method 0x0e72cc06.
//
// Solidity: function setInterchainSecurityModule(address _module) returns()
func (_ERC5164PayableHook *ERC5164PayableHookTransactorSession) SetInterchainSecurityModule(_module common.Address) (*types.Transaction, error) {
	return _ERC5164PayableHook.Contract.SetInterchainSecurityModule(&_ERC5164PayableHook.TransactOpts, _module)
}

// TransferOwnership is a paid mutator transaction binding the contract method 0xf2fde38b.
//
// Solidity: function transferOwnership(address newOwner) returns()
func (_ERC5164PayableHook *ERC5164PayableHookTransactor) TransferOwnership(opts *bind.TransactOpts, newOwner common.Address) (*types.Transaction, error) {
	return _ERC5164PayableHook.contract.Transact(opts, "transferOwnership", newOwner)
}

// TransferOwnership is a paid mutator transaction binding the contract method 0xf2fde38b.
//
// Solidity: function transferOwnership(address newOwner) returns()
func (_ERC5164PayableHook *ERC5164PayableHookSession) TransferOwnership(newOwner common.Address) (*types.Transaction, error) {
	return _ERC5164PayableHook.Contract.TransferOwnership(&_ERC5164PayableHook.TransactOpts, newOwner)
}

// TransferOwnership is a paid mutator transaction binding the contract method 0xf2fde38b.
//
// Solidity: function transferOwnership(address newOwner) returns()
func (_ERC5164PayableHook *ERC5164PayableHookTransactorSession) TransferOwnership(newOwner common.Address) (*types.Transaction, error) {
	return _ERC5164PayableHook.Contract.TransferOwnership(&_ERC5164PayableHook.TransactOpts, newOwner)
}

// ERC5164PayableHookBeneficiarySetIterator is returned from FilterBeneficiarySet and is used to iterate over the raw logs and unpacked data for BeneficiarySet events raised by the ERC5164PayableHook contract.
type ERC5164PayableHookBeneficiarySetIterator struct {
	Event *ERC5164PayableHookBeneficiarySet // Event containing the contract specifics and raw log

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
func (it *ERC5164PayableHookBeneficiarySetIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(ERC5164PayableHookBeneficiarySet)
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
		it.Event = new(ERC5164PayableHookBeneficiarySet)
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
func (it *ERC5164PayableHookBeneficiarySetIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *ERC5164PayableHookBeneficiarySetIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// ERC5164PayableHookBeneficiarySet represents a BeneficiarySet event raised by the ERC5164PayableHook contract.
type ERC5164PayableHookBeneficiarySet struct {
	Beneficiary common.Address
	Raw         types.Log // Blockchain specific contextual infos
}

// FilterBeneficiarySet is a free log retrieval operation binding the contract event 0x04d55a8be181fb8d75b76f2d48aa0b2ee40f47e53d6e61763eeeec46feea8a24.
//
// Solidity: event BeneficiarySet(address beneficiary)
func (_ERC5164PayableHook *ERC5164PayableHookFilterer) FilterBeneficiarySet(opts *bind.FilterOpts) (*ERC5164PayableHookBeneficiarySetIterator, error) {

	logs, sub, err := _ERC5164PayableHook.contract.FilterLogs(opts, "BeneficiarySet")
	if err != nil {
		return nil, err
	}
	return &ERC5164PayableHookBeneficiarySetIterator{contract: _ERC5164PayableHook.contract, event: "BeneficiarySet", logs: logs, sub: sub}, nil
}

// WatchBeneficiarySet is a free log subscription operation binding the contract event 0x04d55a8be181fb8d75b76f2d48aa0b2ee40f47e53d6e61763eeeec46feea8a24.
//
// Solidity: event BeneficiarySet(address beneficiary)
func (_ERC5164PayableHook *ERC5164PayableHookFilterer) WatchBeneficiarySet(opts *bind.WatchOpts, sink chan<- *ERC5164PayableHookBeneficiarySet) (event.Subscription, error) {

	logs, sub, err := _ERC5164PayableHook.contract.WatchLogs(opts, "BeneficiarySet")
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(ERC5164PayableHookBeneficiarySet)
				if err := _ERC5164PayableHook.contract.UnpackLog(event, "BeneficiarySet", log); err != nil {
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

// ParseBeneficiarySet is a log parse operation binding the contract event 0x04d55a8be181fb8d75b76f2d48aa0b2ee40f47e53d6e61763eeeec46feea8a24.
//
// Solidity: event BeneficiarySet(address beneficiary)
func (_ERC5164PayableHook *ERC5164PayableHookFilterer) ParseBeneficiarySet(log types.Log) (*ERC5164PayableHookBeneficiarySet, error) {
	event := new(ERC5164PayableHookBeneficiarySet)
	if err := _ERC5164PayableHook.contract.UnpackLog(event, "BeneficiarySet", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// ERC5164PayableHookDestinationGasConfigSetIterator is returned from FilterDestinationGasConfigSet and is used to iterate over the raw logs and unpacked data for DestinationGasConfigSet events raised by the ERC5164PayableHook contract.
type ERC5164PayableHookDestinationGasConfigSetIterator struct {
	Event *ERC5164PayableHookDestinationGasConfigSet // Event containing the contract specifics and raw log

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
func (it *ERC5164PayableHookDestinationGasConfigSetIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(ERC5164PayableHookDestinationGasConfigSet)
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
		it.Event = new(ERC5164PayableHookDestinationGasConfigSet)
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
func (it *ERC5164PayableHookDestinationGasConfigSetIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *ERC5164PayableHookDestinationGasConfigSetIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// ERC5164PayableHookDestinationGasConfigSet represents a DestinationGasConfigSet event raised by the ERC5164PayableHook contract.
type ERC5164PayableHookDestinationGasConfigSet struct {
	RemoteDomain uint32
	GasOracle    common.Address
	GasOverhead  *big.Int
	Raw          types.Log // Blockchain specific contextual infos
}

// FilterDestinationGasConfigSet is a free log retrieval operation binding the contract event 0x676a23191c2989bd7cc8446122cca792bcdaa0f2d6bbd9c30d8ca031ca946343.
//
// Solidity: event DestinationGasConfigSet(uint32 remoteDomain, address gasOracle, uint96 gasOverhead)
func (_ERC5164PayableHook *ERC5164PayableHookFilterer) FilterDestinationGasConfigSet(opts *bind.FilterOpts) (*ERC5164PayableHookDestinationGasConfigSetIterator, error) {

	logs, sub, err := _ERC5164PayableHook.contract.FilterLogs(opts, "DestinationGasConfigSet")
	if err != nil {
		return nil, err
	}
	return &ERC5164PayableHookDestinationGasConfigSetIterator{contract: _ERC5164PayableHook.contract, event: "DestinationGasConfigSet", logs: logs, sub: sub}, nil
}

// WatchDestinationGasConfigSet is a free log subscription operation binding the contract event 0x676a23191c2989bd7cc8446122cca792bcdaa0f2d6bbd9c30d8ca031ca946343.
//
// Solidity: event DestinationGasConfigSet(uint32 remoteDomain, address gasOracle, uint96 gasOverhead)
func (_ERC5164PayableHook *ERC5164PayableHookFilterer) WatchDestinationGasConfigSet(opts *bind.WatchOpts, sink chan<- *ERC5164PayableHookDestinationGasConfigSet) (event.Subscription, error) {

	logs, sub, err := _ERC5164PayableHook.contract.WatchLogs(opts, "DestinationGasConfigSet")
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(ERC5164PayableHookDestinationGasConfigSet)
				if err := _ERC5164PayableHook.contract.UnpackLog(event, "DestinationGasConfigSet", log); err != nil {
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

// ParseDestinationGasConfigSet is a log parse operation binding the contract event 0x676a23191c2989bd7cc8446122cca792bcdaa0f2d6bbd9c30d8ca031ca946343.
//
// Solidity: event DestinationGasConfigSet(uint32 remoteDomain, address gasOracle, uint96 gasOverhead)
func (_ERC5164PayableHook *ERC5164PayableHookFilterer) ParseDestinationGasConfigSet(log types.Log) (*ERC5164PayableHookDestinationGasConfigSet, error) {
	event := new(ERC5164PayableHookDestinationGasConfigSet)
	if err := _ERC5164PayableHook.contract.UnpackLog(event, "DestinationGasConfigSet", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// ERC5164PayableHookGasPaymentIterator is returned from FilterGasPayment and is used to iterate over the raw logs and unpacked data for GasPayment events raised by the ERC5164PayableHook contract.
type ERC5164PayableHookGasPaymentIterator struct {
	Event *ERC5164PayableHookGasPayment // Event containing the contract specifics and raw log

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
func (it *ERC5164PayableHookGasPaymentIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(ERC5164PayableHookGasPayment)
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
		it.Event = new(ERC5164PayableHookGasPayment)
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
func (it *ERC5164PayableHookGasPaymentIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *ERC5164PayableHookGasPaymentIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// ERC5164PayableHookGasPayment represents a GasPayment event raised by the ERC5164PayableHook contract.
type ERC5164PayableHookGasPayment struct {
	MessageId         [32]byte
	DestinationDomain uint32
	GasAmount         *big.Int
	Payment           *big.Int
	Raw               types.Log // Blockchain specific contextual infos
}

// FilterGasPayment is a free log retrieval operation binding the contract event 0x65695c3748edae85a24cc2c60b299b31f463050bc259150d2e5802ec8d11720a.
//
// Solidity: event GasPayment(bytes32 indexed messageId, uint32 indexed destinationDomain, uint256 gasAmount, uint256 payment)
func (_ERC5164PayableHook *ERC5164PayableHookFilterer) FilterGasPayment(opts *bind.FilterOpts, messageId [][32]byte, destinationDomain []uint32) (*ERC5164PayableHookGasPaymentIterator, error) {

	var messageIdRule []interface{}
	for _, messageIdItem := range messageId {
		messageIdRule = append(messageIdRule, messageIdItem)
	}
	var destinationDomainRule []interface{}
	for _, destinationDomainItem := range destinationDomain {
		destinationDomainRule = append(destinationDomainRule, destinationDomainItem)
	}

	logs, sub, err := _ERC5164PayableHook.contract.FilterLogs(opts, "GasPayment", messageIdRule, destinationDomainRule)
	if err != nil {
		return nil, err
	}
	return &ERC5164PayableHookGasPaymentIterator{contract: _ERC5164PayableHook.contract, event: "GasPayment", logs: logs, sub: sub}, nil
}

// WatchGasPayment is a free log subscription operation binding the contract event 0x65695c3748edae85a24cc2c60b299b31f463050bc259150d2e5802ec8d11720a.
//
// Solidity: event GasPayment(bytes32 indexed messageId, uint32 indexed destinationDomain, uint256 gasAmount, uint256 payment)
func (_ERC5164PayableHook *ERC5164PayableHookFilterer) WatchGasPayment(opts *bind.WatchOpts, sink chan<- *ERC5164PayableHookGasPayment, messageId [][32]byte, destinationDomain []uint32) (event.Subscription, error) {

	var messageIdRule []interface{}
	for _, messageIdItem := range messageId {
		messageIdRule = append(messageIdRule, messageIdItem)
	}
	var destinationDomainRule []interface{}
	for _, destinationDomainItem := range destinationDomain {
		destinationDomainRule = append(destinationDomainRule, destinationDomainItem)
	}

	logs, sub, err := _ERC5164PayableHook.contract.WatchLogs(opts, "GasPayment", messageIdRule, destinationDomainRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(ERC5164PayableHookGasPayment)
				if err := _ERC5164PayableHook.contract.UnpackLog(event, "GasPayment", log); err != nil {
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

// ParseGasPayment is a log parse operation binding the contract event 0x65695c3748edae85a24cc2c60b299b31f463050bc259150d2e5802ec8d11720a.
//
// Solidity: event GasPayment(bytes32 indexed messageId, uint32 indexed destinationDomain, uint256 gasAmount, uint256 payment)
func (_ERC5164PayableHook *ERC5164PayableHookFilterer) ParseGasPayment(log types.Log) (*ERC5164PayableHookGasPayment, error) {
	event := new(ERC5164PayableHookGasPayment)
	if err := _ERC5164PayableHook.contract.UnpackLog(event, "GasPayment", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// ERC5164PayableHookHookSetIterator is returned from FilterHookSet and is used to iterate over the raw logs and unpacked data for HookSet events raised by the ERC5164PayableHook contract.
type ERC5164PayableHookHookSetIterator struct {
	Event *ERC5164PayableHookHookSet // Event containing the contract specifics and raw log

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
func (it *ERC5164PayableHookHookSetIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(ERC5164PayableHookHookSet)
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
		it.Event = new(ERC5164PayableHookHookSet)
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
func (it *ERC5164PayableHookHookSetIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *ERC5164PayableHookHookSetIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// ERC5164PayableHookHookSet represents a HookSet event raised by the ERC5164PayableHook contract.
type ERC5164PayableHookHookSet struct {
	Hook common.Address
	Raw  types.Log // Blockchain specific contextual infos
}

// FilterHookSet is a free log retrieval operation binding the contract event 0x4eab7b127c764308788622363ad3e9532de3dfba7845bd4f84c125a22544255a.
//
// Solidity: event HookSet(address _hook)
func (_ERC5164PayableHook *ERC5164PayableHookFilterer) FilterHookSet(opts *bind.FilterOpts) (*ERC5164PayableHookHookSetIterator, error) {

	logs, sub, err := _ERC5164PayableHook.contract.FilterLogs(opts, "HookSet")
	if err != nil {
		return nil, err
	}
	return &ERC5164PayableHookHookSetIterator{contract: _ERC5164PayableHook.contract, event: "HookSet", logs: logs, sub: sub}, nil
}

// WatchHookSet is a free log subscription operation binding the contract event 0x4eab7b127c764308788622363ad3e9532de3dfba7845bd4f84c125a22544255a.
//
// Solidity: event HookSet(address _hook)
func (_ERC5164PayableHook *ERC5164PayableHookFilterer) WatchHookSet(opts *bind.WatchOpts, sink chan<- *ERC5164PayableHookHookSet) (event.Subscription, error) {

	logs, sub, err := _ERC5164PayableHook.contract.WatchLogs(opts, "HookSet")
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(ERC5164PayableHookHookSet)
				if err := _ERC5164PayableHook.contract.UnpackLog(event, "HookSet", log); err != nil {
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
func (_ERC5164PayableHook *ERC5164PayableHookFilterer) ParseHookSet(log types.Log) (*ERC5164PayableHookHookSet, error) {
	event := new(ERC5164PayableHookHookSet)
	if err := _ERC5164PayableHook.contract.UnpackLog(event, "HookSet", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// ERC5164PayableHookInitializedIterator is returned from FilterInitialized and is used to iterate over the raw logs and unpacked data for Initialized events raised by the ERC5164PayableHook contract.
type ERC5164PayableHookInitializedIterator struct {
	Event *ERC5164PayableHookInitialized // Event containing the contract specifics and raw log

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
func (it *ERC5164PayableHookInitializedIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(ERC5164PayableHookInitialized)
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
		it.Event = new(ERC5164PayableHookInitialized)
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
func (it *ERC5164PayableHookInitializedIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *ERC5164PayableHookInitializedIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// ERC5164PayableHookInitialized represents a Initialized event raised by the ERC5164PayableHook contract.
type ERC5164PayableHookInitialized struct {
	Version uint8
	Raw     types.Log // Blockchain specific contextual infos
}

// FilterInitialized is a free log retrieval operation binding the contract event 0x7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb3847402498.
//
// Solidity: event Initialized(uint8 version)
func (_ERC5164PayableHook *ERC5164PayableHookFilterer) FilterInitialized(opts *bind.FilterOpts) (*ERC5164PayableHookInitializedIterator, error) {

	logs, sub, err := _ERC5164PayableHook.contract.FilterLogs(opts, "Initialized")
	if err != nil {
		return nil, err
	}
	return &ERC5164PayableHookInitializedIterator{contract: _ERC5164PayableHook.contract, event: "Initialized", logs: logs, sub: sub}, nil
}

// WatchInitialized is a free log subscription operation binding the contract event 0x7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb3847402498.
//
// Solidity: event Initialized(uint8 version)
func (_ERC5164PayableHook *ERC5164PayableHookFilterer) WatchInitialized(opts *bind.WatchOpts, sink chan<- *ERC5164PayableHookInitialized) (event.Subscription, error) {

	logs, sub, err := _ERC5164PayableHook.contract.WatchLogs(opts, "Initialized")
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(ERC5164PayableHookInitialized)
				if err := _ERC5164PayableHook.contract.UnpackLog(event, "Initialized", log); err != nil {
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
func (_ERC5164PayableHook *ERC5164PayableHookFilterer) ParseInitialized(log types.Log) (*ERC5164PayableHookInitialized, error) {
	event := new(ERC5164PayableHookInitialized)
	if err := _ERC5164PayableHook.contract.UnpackLog(event, "Initialized", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// ERC5164PayableHookIsmSetIterator is returned from FilterIsmSet and is used to iterate over the raw logs and unpacked data for IsmSet events raised by the ERC5164PayableHook contract.
type ERC5164PayableHookIsmSetIterator struct {
	Event *ERC5164PayableHookIsmSet // Event containing the contract specifics and raw log

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
func (it *ERC5164PayableHookIsmSetIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(ERC5164PayableHookIsmSet)
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
		it.Event = new(ERC5164PayableHookIsmSet)
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
func (it *ERC5164PayableHookIsmSetIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *ERC5164PayableHookIsmSetIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// ERC5164PayableHookIsmSet represents a IsmSet event raised by the ERC5164PayableHook contract.
type ERC5164PayableHookIsmSet struct {
	Ism common.Address
	Raw types.Log // Blockchain specific contextual infos
}

// FilterIsmSet is a free log retrieval operation binding the contract event 0xc47cbcc588c67679e52261c45cc315e56562f8d0ccaba16facb9093ff9498799.
//
// Solidity: event IsmSet(address _ism)
func (_ERC5164PayableHook *ERC5164PayableHookFilterer) FilterIsmSet(opts *bind.FilterOpts) (*ERC5164PayableHookIsmSetIterator, error) {

	logs, sub, err := _ERC5164PayableHook.contract.FilterLogs(opts, "IsmSet")
	if err != nil {
		return nil, err
	}
	return &ERC5164PayableHookIsmSetIterator{contract: _ERC5164PayableHook.contract, event: "IsmSet", logs: logs, sub: sub}, nil
}

// WatchIsmSet is a free log subscription operation binding the contract event 0xc47cbcc588c67679e52261c45cc315e56562f8d0ccaba16facb9093ff9498799.
//
// Solidity: event IsmSet(address _ism)
func (_ERC5164PayableHook *ERC5164PayableHookFilterer) WatchIsmSet(opts *bind.WatchOpts, sink chan<- *ERC5164PayableHookIsmSet) (event.Subscription, error) {

	logs, sub, err := _ERC5164PayableHook.contract.WatchLogs(opts, "IsmSet")
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(ERC5164PayableHookIsmSet)
				if err := _ERC5164PayableHook.contract.UnpackLog(event, "IsmSet", log); err != nil {
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
func (_ERC5164PayableHook *ERC5164PayableHookFilterer) ParseIsmSet(log types.Log) (*ERC5164PayableHookIsmSet, error) {
	event := new(ERC5164PayableHookIsmSet)
	if err := _ERC5164PayableHook.contract.UnpackLog(event, "IsmSet", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// ERC5164PayableHookOwnershipTransferredIterator is returned from FilterOwnershipTransferred and is used to iterate over the raw logs and unpacked data for OwnershipTransferred events raised by the ERC5164PayableHook contract.
type ERC5164PayableHookOwnershipTransferredIterator struct {
	Event *ERC5164PayableHookOwnershipTransferred // Event containing the contract specifics and raw log

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
func (it *ERC5164PayableHookOwnershipTransferredIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(ERC5164PayableHookOwnershipTransferred)
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
		it.Event = new(ERC5164PayableHookOwnershipTransferred)
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
func (it *ERC5164PayableHookOwnershipTransferredIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *ERC5164PayableHookOwnershipTransferredIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// ERC5164PayableHookOwnershipTransferred represents a OwnershipTransferred event raised by the ERC5164PayableHook contract.
type ERC5164PayableHookOwnershipTransferred struct {
	PreviousOwner common.Address
	NewOwner      common.Address
	Raw           types.Log // Blockchain specific contextual infos
}

// FilterOwnershipTransferred is a free log retrieval operation binding the contract event 0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0.
//
// Solidity: event OwnershipTransferred(address indexed previousOwner, address indexed newOwner)
func (_ERC5164PayableHook *ERC5164PayableHookFilterer) FilterOwnershipTransferred(opts *bind.FilterOpts, previousOwner []common.Address, newOwner []common.Address) (*ERC5164PayableHookOwnershipTransferredIterator, error) {

	var previousOwnerRule []interface{}
	for _, previousOwnerItem := range previousOwner {
		previousOwnerRule = append(previousOwnerRule, previousOwnerItem)
	}
	var newOwnerRule []interface{}
	for _, newOwnerItem := range newOwner {
		newOwnerRule = append(newOwnerRule, newOwnerItem)
	}

	logs, sub, err := _ERC5164PayableHook.contract.FilterLogs(opts, "OwnershipTransferred", previousOwnerRule, newOwnerRule)
	if err != nil {
		return nil, err
	}
	return &ERC5164PayableHookOwnershipTransferredIterator{contract: _ERC5164PayableHook.contract, event: "OwnershipTransferred", logs: logs, sub: sub}, nil
}

// WatchOwnershipTransferred is a free log subscription operation binding the contract event 0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0.
//
// Solidity: event OwnershipTransferred(address indexed previousOwner, address indexed newOwner)
func (_ERC5164PayableHook *ERC5164PayableHookFilterer) WatchOwnershipTransferred(opts *bind.WatchOpts, sink chan<- *ERC5164PayableHookOwnershipTransferred, previousOwner []common.Address, newOwner []common.Address) (event.Subscription, error) {

	var previousOwnerRule []interface{}
	for _, previousOwnerItem := range previousOwner {
		previousOwnerRule = append(previousOwnerRule, previousOwnerItem)
	}
	var newOwnerRule []interface{}
	for _, newOwnerItem := range newOwner {
		newOwnerRule = append(newOwnerRule, newOwnerItem)
	}

	logs, sub, err := _ERC5164PayableHook.contract.WatchLogs(opts, "OwnershipTransferred", previousOwnerRule, newOwnerRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(ERC5164PayableHookOwnershipTransferred)
				if err := _ERC5164PayableHook.contract.UnpackLog(event, "OwnershipTransferred", log); err != nil {
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
func (_ERC5164PayableHook *ERC5164PayableHookFilterer) ParseOwnershipTransferred(log types.Log) (*ERC5164PayableHookOwnershipTransferred, error) {
	event := new(ERC5164PayableHookOwnershipTransferred)
	if err := _ERC5164PayableHook.contract.UnpackLog(event, "OwnershipTransferred", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}
