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

// MessageExecutorMetaData contains all meta data concerning the MessageExecutor contract.
var MessageExecutorMetaData = &bind.MetaData{
	ABI: "[{\"type\":\"function\",\"name\":\"execute\",\"inputs\":[{\"name\":\"messageId\",\"type\":\"bytes32\",\"internalType\":\"bytes32\"},{\"name\":\"msgValue\",\"type\":\"uint256\",\"internalType\":\"uint256\"}],\"outputs\":[],\"stateMutability\":\"payable\"},{\"type\":\"function\",\"name\":\"initialize\",\"inputs\":[{\"name\":\"_ism\",\"type\":\"address\",\"internalType\":\"address\"}],\"outputs\":[],\"stateMutability\":\"nonpayable\"},{\"type\":\"function\",\"name\":\"ism\",\"inputs\":[],\"outputs\":[{\"name\":\"\",\"type\":\"address\",\"internalType\":\"contractERC5164Ism\"}],\"stateMutability\":\"view\"}]",
}

// MessageExecutorABI is the input ABI used to generate the binding from.
// Deprecated: Use MessageExecutorMetaData.ABI instead.
var MessageExecutorABI = MessageExecutorMetaData.ABI

// MessageExecutor is an auto generated Go binding around an Ethereum contract.
type MessageExecutor struct {
	MessageExecutorCaller     // Read-only binding to the contract
	MessageExecutorTransactor // Write-only binding to the contract
	MessageExecutorFilterer   // Log filterer for contract events
}

// MessageExecutorCaller is an auto generated read-only Go binding around an Ethereum contract.
type MessageExecutorCaller struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// MessageExecutorTransactor is an auto generated write-only Go binding around an Ethereum contract.
type MessageExecutorTransactor struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// MessageExecutorFilterer is an auto generated log filtering Go binding around an Ethereum contract events.
type MessageExecutorFilterer struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// MessageExecutorSession is an auto generated Go binding around an Ethereum contract,
// with pre-set call and transact options.
type MessageExecutorSession struct {
	Contract     *MessageExecutor  // Generic contract binding to set the session for
	CallOpts     bind.CallOpts     // Call options to use throughout this session
	TransactOpts bind.TransactOpts // Transaction auth options to use throughout this session
}

// MessageExecutorCallerSession is an auto generated read-only Go binding around an Ethereum contract,
// with pre-set call options.
type MessageExecutorCallerSession struct {
	Contract *MessageExecutorCaller // Generic contract caller binding to set the session for
	CallOpts bind.CallOpts          // Call options to use throughout this session
}

// MessageExecutorTransactorSession is an auto generated write-only Go binding around an Ethereum contract,
// with pre-set transact options.
type MessageExecutorTransactorSession struct {
	Contract     *MessageExecutorTransactor // Generic contract transactor binding to set the session for
	TransactOpts bind.TransactOpts          // Transaction auth options to use throughout this session
}

// MessageExecutorRaw is an auto generated low-level Go binding around an Ethereum contract.
type MessageExecutorRaw struct {
	Contract *MessageExecutor // Generic contract binding to access the raw methods on
}

// MessageExecutorCallerRaw is an auto generated low-level read-only Go binding around an Ethereum contract.
type MessageExecutorCallerRaw struct {
	Contract *MessageExecutorCaller // Generic read-only contract binding to access the raw methods on
}

// MessageExecutorTransactorRaw is an auto generated low-level write-only Go binding around an Ethereum contract.
type MessageExecutorTransactorRaw struct {
	Contract *MessageExecutorTransactor // Generic write-only contract binding to access the raw methods on
}

// NewMessageExecutor creates a new instance of MessageExecutor, bound to a specific deployed contract.
func NewMessageExecutor(address common.Address, backend bind.ContractBackend) (*MessageExecutor, error) {
	contract, err := bindMessageExecutor(address, backend, backend, backend)
	if err != nil {
		return nil, err
	}
	return &MessageExecutor{MessageExecutorCaller: MessageExecutorCaller{contract: contract}, MessageExecutorTransactor: MessageExecutorTransactor{contract: contract}, MessageExecutorFilterer: MessageExecutorFilterer{contract: contract}}, nil
}

// NewMessageExecutorCaller creates a new read-only instance of MessageExecutor, bound to a specific deployed contract.
func NewMessageExecutorCaller(address common.Address, caller bind.ContractCaller) (*MessageExecutorCaller, error) {
	contract, err := bindMessageExecutor(address, caller, nil, nil)
	if err != nil {
		return nil, err
	}
	return &MessageExecutorCaller{contract: contract}, nil
}

// NewMessageExecutorTransactor creates a new write-only instance of MessageExecutor, bound to a specific deployed contract.
func NewMessageExecutorTransactor(address common.Address, transactor bind.ContractTransactor) (*MessageExecutorTransactor, error) {
	contract, err := bindMessageExecutor(address, nil, transactor, nil)
	if err != nil {
		return nil, err
	}
	return &MessageExecutorTransactor{contract: contract}, nil
}

// NewMessageExecutorFilterer creates a new log filterer instance of MessageExecutor, bound to a specific deployed contract.
func NewMessageExecutorFilterer(address common.Address, filterer bind.ContractFilterer) (*MessageExecutorFilterer, error) {
	contract, err := bindMessageExecutor(address, nil, nil, filterer)
	if err != nil {
		return nil, err
	}
	return &MessageExecutorFilterer{contract: contract}, nil
}

// bindMessageExecutor binds a generic wrapper to an already deployed contract.
func bindMessageExecutor(address common.Address, caller bind.ContractCaller, transactor bind.ContractTransactor, filterer bind.ContractFilterer) (*bind.BoundContract, error) {
	parsed, err := MessageExecutorMetaData.GetAbi()
	if err != nil {
		return nil, err
	}
	return bind.NewBoundContract(address, *parsed, caller, transactor, filterer), nil
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_MessageExecutor *MessageExecutorRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _MessageExecutor.Contract.MessageExecutorCaller.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_MessageExecutor *MessageExecutorRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _MessageExecutor.Contract.MessageExecutorTransactor.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_MessageExecutor *MessageExecutorRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _MessageExecutor.Contract.MessageExecutorTransactor.contract.Transact(opts, method, params...)
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_MessageExecutor *MessageExecutorCallerRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _MessageExecutor.Contract.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_MessageExecutor *MessageExecutorTransactorRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _MessageExecutor.Contract.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_MessageExecutor *MessageExecutorTransactorRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _MessageExecutor.Contract.contract.Transact(opts, method, params...)
}

// Ism is a free data retrieval call binding the contract method 0x4deefab2.
//
// Solidity: function ism() view returns(address)
func (_MessageExecutor *MessageExecutorCaller) Ism(opts *bind.CallOpts) (common.Address, error) {
	var out []interface{}
	err := _MessageExecutor.contract.Call(opts, &out, "ism")

	if err != nil {
		return *new(common.Address), err
	}

	out0 := *abi.ConvertType(out[0], new(common.Address)).(*common.Address)

	return out0, err

}

// Ism is a free data retrieval call binding the contract method 0x4deefab2.
//
// Solidity: function ism() view returns(address)
func (_MessageExecutor *MessageExecutorSession) Ism() (common.Address, error) {
	return _MessageExecutor.Contract.Ism(&_MessageExecutor.CallOpts)
}

// Ism is a free data retrieval call binding the contract method 0x4deefab2.
//
// Solidity: function ism() view returns(address)
func (_MessageExecutor *MessageExecutorCallerSession) Ism() (common.Address, error) {
	return _MessageExecutor.Contract.Ism(&_MessageExecutor.CallOpts)
}

// Execute is a paid mutator transaction binding the contract method 0x553b3bfd.
//
// Solidity: function execute(bytes32 messageId, uint256 msgValue) payable returns()
func (_MessageExecutor *MessageExecutorTransactor) Execute(opts *bind.TransactOpts, messageId [32]byte, msgValue *big.Int) (*types.Transaction, error) {
	return _MessageExecutor.contract.Transact(opts, "execute", messageId, msgValue)
}

// Execute is a paid mutator transaction binding the contract method 0x553b3bfd.
//
// Solidity: function execute(bytes32 messageId, uint256 msgValue) payable returns()
func (_MessageExecutor *MessageExecutorSession) Execute(messageId [32]byte, msgValue *big.Int) (*types.Transaction, error) {
	return _MessageExecutor.Contract.Execute(&_MessageExecutor.TransactOpts, messageId, msgValue)
}

// Execute is a paid mutator transaction binding the contract method 0x553b3bfd.
//
// Solidity: function execute(bytes32 messageId, uint256 msgValue) payable returns()
func (_MessageExecutor *MessageExecutorTransactorSession) Execute(messageId [32]byte, msgValue *big.Int) (*types.Transaction, error) {
	return _MessageExecutor.Contract.Execute(&_MessageExecutor.TransactOpts, messageId, msgValue)
}

// Initialize is a paid mutator transaction binding the contract method 0xc4d66de8.
//
// Solidity: function initialize(address _ism) returns()
func (_MessageExecutor *MessageExecutorTransactor) Initialize(opts *bind.TransactOpts, _ism common.Address) (*types.Transaction, error) {
	return _MessageExecutor.contract.Transact(opts, "initialize", _ism)
}

// Initialize is a paid mutator transaction binding the contract method 0xc4d66de8.
//
// Solidity: function initialize(address _ism) returns()
func (_MessageExecutor *MessageExecutorSession) Initialize(_ism common.Address) (*types.Transaction, error) {
	return _MessageExecutor.Contract.Initialize(&_MessageExecutor.TransactOpts, _ism)
}

// Initialize is a paid mutator transaction binding the contract method 0xc4d66de8.
//
// Solidity: function initialize(address _ism) returns()
func (_MessageExecutor *MessageExecutorTransactorSession) Initialize(_ism common.Address) (*types.Transaction, error) {
	return _MessageExecutor.Contract.Initialize(&_MessageExecutor.TransactOpts, _ism)
}
