// Code generated - DO NOT EDIT.
// This file is a generated binding and any manual changes will be lost.

package generated

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

// StoicQuoteData is an auto generated low-level Go binding around an user-defined struct.
type StoicQuoteData struct {
	Author string
	Quote  string
}

// StoicQuoteResponse is an auto generated low-level Go binding around an user-defined struct.
type StoicQuoteResponse struct {
	Data StoicQuoteData
}

// StoicQuoteMetaData contains all meta data concerning the StoicQuote contract.
var StoicQuoteMetaData = &bind.MetaData{
	ABI: "[{\"inputs\":[{\"components\":[{\"components\":[{\"internalType\":\"string\",\"name\":\"author\",\"type\":\"string\"},{\"internalType\":\"string\",\"name\":\"quote\",\"type\":\"string\"}],\"internalType\":\"structStoicQuote.Data\",\"name\":\"data\",\"type\":\"tuple\"}],\"internalType\":\"structStoicQuote.Response\",\"name\":\"_response\",\"type\":\"tuple\"}],\"name\":\"main\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"}]",
	Bin: "0x6080604052348015600e575f5ffd5b506102f88061001c5f395ff3fe608060405234801561000f575f5ffd5b5060043610610029575f3560e01c8063dd25551b1461002d575b5f5ffd5b6100476004803603810190610042919061027b565b610049565b005b50565b5f604051905090565b5f5ffd5b5f5ffd5b5f5ffd5b5f601f19601f8301169050919050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52604160045260245ffd5b6100a782610061565b810181811067ffffffffffffffff821117156100c6576100c5610071565b5b80604052505050565b5f6100d861004c565b90506100e4828261009e565b919050565b5f5ffd5b5f5ffd5b5f5ffd5b5f67ffffffffffffffff82111561010f5761010e610071565b5b61011882610061565b9050602081019050919050565b828183375f83830152505050565b5f610145610140846100f5565b6100cf565b905082815260208101848484011115610161576101606100f1565b5b61016c848285610125565b509392505050565b5f82601f830112610188576101876100ed565b5b8135610198848260208601610133565b91505092915050565b5f604082840312156101b6576101b561005d565b5b6101c060406100cf565b90505f82013567ffffffffffffffff8111156101df576101de6100e9565b5b6101eb84828501610174565b5f83015250602082013567ffffffffffffffff81111561020e5761020d6100e9565b5b61021a84828501610174565b60208301525092915050565b5f6020828403121561023b5761023a61005d565b5b61024560206100cf565b90505f82013567ffffffffffffffff811115610264576102636100e9565b5b610270848285016101a1565b5f8301525092915050565b5f602082840312156102905761028f610055565b5b5f82013567ffffffffffffffff8111156102ad576102ac610059565b5b6102b984828501610226565b9150509291505056fea2646970667358221220c5183a631c6cdfe51a28a261af823050cb56e9bfd8002e47e32bd0b1d789de1d64736f6c634300081c0033",
}

// StoicQuoteABI is the input ABI used to generate the binding from.
// Deprecated: Use StoicQuoteMetaData.ABI instead.
var StoicQuoteABI = StoicQuoteMetaData.ABI

// StoicQuoteBin is the compiled bytecode used for deploying new contracts.
// Deprecated: Use StoicQuoteMetaData.Bin instead.
var StoicQuoteBin = StoicQuoteMetaData.Bin

// DeployStoicQuote deploys a new Ethereum contract, binding an instance of StoicQuote to it.
func DeployStoicQuote(auth *bind.TransactOpts, backend bind.ContractBackend) (common.Address, *types.Transaction, *StoicQuote, error) {
	parsed, err := StoicQuoteMetaData.GetAbi()
	if err != nil {
		return common.Address{}, nil, nil, err
	}
	if parsed == nil {
		return common.Address{}, nil, nil, errors.New("GetABI returned nil")
	}

	address, tx, contract, err := bind.DeployContract(auth, *parsed, common.FromHex(StoicQuoteBin), backend)
	if err != nil {
		return common.Address{}, nil, nil, err
	}
	return address, tx, &StoicQuote{StoicQuoteCaller: StoicQuoteCaller{contract: contract}, StoicQuoteTransactor: StoicQuoteTransactor{contract: contract}, StoicQuoteFilterer: StoicQuoteFilterer{contract: contract}}, nil
}

// StoicQuote is an auto generated Go binding around an Ethereum contract.
type StoicQuote struct {
	StoicQuoteCaller     // Read-only binding to the contract
	StoicQuoteTransactor // Write-only binding to the contract
	StoicQuoteFilterer   // Log filterer for contract events
}

// StoicQuoteCaller is an auto generated read-only Go binding around an Ethereum contract.
type StoicQuoteCaller struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// StoicQuoteTransactor is an auto generated write-only Go binding around an Ethereum contract.
type StoicQuoteTransactor struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// StoicQuoteFilterer is an auto generated log filtering Go binding around an Ethereum contract events.
type StoicQuoteFilterer struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// StoicQuoteSession is an auto generated Go binding around an Ethereum contract,
// with pre-set call and transact options.
type StoicQuoteSession struct {
	Contract     *StoicQuote       // Generic contract binding to set the session for
	CallOpts     bind.CallOpts     // Call options to use throughout this session
	TransactOpts bind.TransactOpts // Transaction auth options to use throughout this session
}

// StoicQuoteCallerSession is an auto generated read-only Go binding around an Ethereum contract,
// with pre-set call options.
type StoicQuoteCallerSession struct {
	Contract *StoicQuoteCaller // Generic contract caller binding to set the session for
	CallOpts bind.CallOpts     // Call options to use throughout this session
}

// StoicQuoteTransactorSession is an auto generated write-only Go binding around an Ethereum contract,
// with pre-set transact options.
type StoicQuoteTransactorSession struct {
	Contract     *StoicQuoteTransactor // Generic contract transactor binding to set the session for
	TransactOpts bind.TransactOpts     // Transaction auth options to use throughout this session
}

// StoicQuoteRaw is an auto generated low-level Go binding around an Ethereum contract.
type StoicQuoteRaw struct {
	Contract *StoicQuote // Generic contract binding to access the raw methods on
}

// StoicQuoteCallerRaw is an auto generated low-level read-only Go binding around an Ethereum contract.
type StoicQuoteCallerRaw struct {
	Contract *StoicQuoteCaller // Generic read-only contract binding to access the raw methods on
}

// StoicQuoteTransactorRaw is an auto generated low-level write-only Go binding around an Ethereum contract.
type StoicQuoteTransactorRaw struct {
	Contract *StoicQuoteTransactor // Generic write-only contract binding to access the raw methods on
}

// NewStoicQuote creates a new instance of StoicQuote, bound to a specific deployed contract.
func NewStoicQuote(address common.Address, backend bind.ContractBackend) (*StoicQuote, error) {
	contract, err := bindStoicQuote(address, backend, backend, backend)
	if err != nil {
		return nil, err
	}
	return &StoicQuote{StoicQuoteCaller: StoicQuoteCaller{contract: contract}, StoicQuoteTransactor: StoicQuoteTransactor{contract: contract}, StoicQuoteFilterer: StoicQuoteFilterer{contract: contract}}, nil
}

// NewStoicQuoteCaller creates a new read-only instance of StoicQuote, bound to a specific deployed contract.
func NewStoicQuoteCaller(address common.Address, caller bind.ContractCaller) (*StoicQuoteCaller, error) {
	contract, err := bindStoicQuote(address, caller, nil, nil)
	if err != nil {
		return nil, err
	}
	return &StoicQuoteCaller{contract: contract}, nil
}

// NewStoicQuoteTransactor creates a new write-only instance of StoicQuote, bound to a specific deployed contract.
func NewStoicQuoteTransactor(address common.Address, transactor bind.ContractTransactor) (*StoicQuoteTransactor, error) {
	contract, err := bindStoicQuote(address, nil, transactor, nil)
	if err != nil {
		return nil, err
	}
	return &StoicQuoteTransactor{contract: contract}, nil
}

// NewStoicQuoteFilterer creates a new log filterer instance of StoicQuote, bound to a specific deployed contract.
func NewStoicQuoteFilterer(address common.Address, filterer bind.ContractFilterer) (*StoicQuoteFilterer, error) {
	contract, err := bindStoicQuote(address, nil, nil, filterer)
	if err != nil {
		return nil, err
	}
	return &StoicQuoteFilterer{contract: contract}, nil
}

// bindStoicQuote binds a generic wrapper to an already deployed contract.
func bindStoicQuote(address common.Address, caller bind.ContractCaller, transactor bind.ContractTransactor, filterer bind.ContractFilterer) (*bind.BoundContract, error) {
	parsed, err := abi.JSON(strings.NewReader(StoicQuoteABI))
	if err != nil {
		return nil, err
	}
	return bind.NewBoundContract(address, parsed, caller, transactor, filterer), nil
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_StoicQuote *StoicQuoteRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _StoicQuote.Contract.StoicQuoteCaller.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_StoicQuote *StoicQuoteRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _StoicQuote.Contract.StoicQuoteTransactor.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_StoicQuote *StoicQuoteRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _StoicQuote.Contract.StoicQuoteTransactor.contract.Transact(opts, method, params...)
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_StoicQuote *StoicQuoteCallerRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _StoicQuote.Contract.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_StoicQuote *StoicQuoteTransactorRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _StoicQuote.Contract.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_StoicQuote *StoicQuoteTransactorRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _StoicQuote.Contract.contract.Transact(opts, method, params...)
}

// Main is a paid mutator transaction binding the contract method 0xdd25551b.
//
// Solidity: function main(((string,string)) _response) returns()
func (_StoicQuote *StoicQuoteTransactor) Main(opts *bind.TransactOpts, _response StoicQuoteResponse) (*types.Transaction, error) {
	return _StoicQuote.contract.Transact(opts, "main", _response)
}

// Main is a paid mutator transaction binding the contract method 0xdd25551b.
//
// Solidity: function main(((string,string)) _response) returns()
func (_StoicQuote *StoicQuoteSession) Main(_response StoicQuoteResponse) (*types.Transaction, error) {
	return _StoicQuote.Contract.Main(&_StoicQuote.TransactOpts, _response)
}

// Main is a paid mutator transaction binding the contract method 0xdd25551b.
//
// Solidity: function main(((string,string)) _response) returns()
func (_StoicQuote *StoicQuoteTransactorSession) Main(_response StoicQuoteResponse) (*types.Transaction, error) {
	return _StoicQuote.Contract.Main(&_StoicQuote.TransactOpts, _response)
}
