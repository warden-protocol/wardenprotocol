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
	_ = abi.ConvertType
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
	ABI: "[{\"inputs\":[],\"name\":\"main\",\"outputs\":[{\"components\":[{\"components\":[{\"internalType\":\"string\",\"name\":\"author\",\"type\":\"string\"},{\"internalType\":\"string\",\"name\":\"quote\",\"type\":\"string\"}],\"internalType\":\"structStoicQuote.Data\",\"name\":\"data\",\"type\":\"tuple\"}],\"internalType\":\"structStoicQuote.Response\",\"name\":\"\",\"type\":\"tuple\"}],\"stateMutability\":\"pure\",\"type\":\"function\"}]",
	Bin: "0x6080604052348015600e575f5ffd5b506101c38061001c5f395ff3fe608060405234801561000f575f5ffd5b5060043610610029575f3560e01c8063dffeadd01461002d575b5f5ffd5b61003561004b565b604051610042919061016d565b60405180910390f35b610053610062565b61005b610062565b8091505090565b604051806020016040528061007561007b565b81525090565b604051806040016040528060608152602001606081525090565b5f81519050919050565b5f82825260208201905092915050565b8281835e5f83830152505050565b5f601f19601f8301169050919050565b5f6100d782610095565b6100e1818561009f565b93506100f18185602086016100af565b6100fa816100bd565b840191505092915050565b5f604083015f8301518482035f86015261011f82826100cd565b9150506020830151848203602086015261013982826100cd565b9150508091505092915050565b5f602083015f8301518482035f8601526101608282610105565b9150508091505092915050565b5f6020820190508181035f8301526101858184610146565b90509291505056fea26469706673582212205dc6619ebfee0dd3e7219c41fcadc8ec8da52e1bb3710d232cf6677b02100ab464736f6c634300081c0033",
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
	parsed, err := StoicQuoteMetaData.GetAbi()
	if err != nil {
		return nil, err
	}
	return bind.NewBoundContract(address, *parsed, caller, transactor, filterer), nil
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

// Main is a free data retrieval call binding the contract method 0xdffeadd0.
//
// Solidity: function main() pure returns(((string,string)))
func (_StoicQuote *StoicQuoteCaller) Main(opts *bind.CallOpts) (StoicQuoteResponse, error) {
	var out []interface{}
	err := _StoicQuote.contract.Call(opts, &out, "main")

	if err != nil {
		return *new(StoicQuoteResponse), err
	}

	out0 := *abi.ConvertType(out[0], new(StoicQuoteResponse)).(*StoicQuoteResponse)

	return out0, err

}

// Main is a free data retrieval call binding the contract method 0xdffeadd0.
//
// Solidity: function main() pure returns(((string,string)))
func (_StoicQuote *StoicQuoteSession) Main() (StoicQuoteResponse, error) {
	return _StoicQuote.Contract.Main(&_StoicQuote.CallOpts)
}

// Main is a free data retrieval call binding the contract method 0xdffeadd0.
//
// Solidity: function main() pure returns(((string,string)))
func (_StoicQuote *StoicQuoteCallerSession) Main() (StoicQuoteResponse, error) {
	return _StoicQuote.Contract.Main(&_StoicQuote.CallOpts)
}
