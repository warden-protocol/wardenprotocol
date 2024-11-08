// Code generated - DO NOT EDIT.
// This file is a generated binding and any manual changes will be lost.

package caller

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

// CallerMetaData contains all meta data concerning the Caller contract.
var CallerMetaData = &bind.MetaData{
	ABI: "[{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_contract\",\"type\":\"address\"},{\"internalType\":\"bytes\",\"name\":\"_data\",\"type\":\"bytes\"}],\"name\":\"callOtherContract\",\"outputs\":[{\"internalType\":\"bytes\",\"name\":\"\",\"type\":\"bytes\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"}]",
	Bin: "0x6080604052348015600e575f80fd5b506104d38061001c5f395ff3fe608060405234801561000f575f80fd5b5060043610610029575f3560e01c80633543e4fb1461002d575b5f80fd5b610047600480360381019061004291906102bb565b61005d565b604051610054919061038f565b60405180910390f35b60605f808473ffffffffffffffffffffffffffffffffffffffff168460405161008691906103e9565b5f604051808303815f865af19150503d805f81146100bf576040519150601f19603f3d011682016040523d82523d5f602084013e6100c4565b606091505b509150915081610109576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161010090610459565b60405180910390fd5b809250505092915050565b5f604051905090565b5f80fd5b5f80fd5b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f61014e82610125565b9050919050565b61015e81610144565b8114610168575f80fd5b50565b5f8135905061017981610155565b92915050565b5f80fd5b5f80fd5b5f601f19601f8301169050919050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52604160045260245ffd5b6101cd82610187565b810181811067ffffffffffffffff821117156101ec576101eb610197565b5b80604052505050565b5f6101fe610114565b905061020a82826101c4565b919050565b5f67ffffffffffffffff82111561022957610228610197565b5b61023282610187565b9050602081019050919050565b828183375f83830152505050565b5f61025f61025a8461020f565b6101f5565b90508281526020810184848401111561027b5761027a610183565b5b61028684828561023f565b509392505050565b5f82601f8301126102a2576102a161017f565b5b81356102b284826020860161024d565b91505092915050565b5f80604083850312156102d1576102d061011d565b5b5f6102de8582860161016b565b925050602083013567ffffffffffffffff8111156102ff576102fe610121565b5b61030b8582860161028e565b9150509250929050565b5f81519050919050565b5f82825260208201905092915050565b5f5b8381101561034c578082015181840152602081019050610331565b5f8484015250505050565b5f61036182610315565b61036b818561031f565b935061037b81856020860161032f565b61038481610187565b840191505092915050565b5f6020820190508181035f8301526103a78184610357565b905092915050565b5f81905092915050565b5f6103c382610315565b6103cd81856103af565b93506103dd81856020860161032f565b80840191505092915050565b5f6103f482846103b9565b915081905092915050565b5f82825260208201905092915050565b7f45787465726e616c2063616c6c206661696c65640000000000000000000000005f82015250565b5f6104436014836103ff565b915061044e8261040f565b602082019050919050565b5f6020820190508181035f83015261047081610437565b905091905056fea26469706673582212207a1f2c1640fc8b1852d2b7fffe7de827e0c0da6460711f3cfa2652177d7399b864736f6c637828302e382e32352d646576656c6f702e323032342e322e32342b636f6d6d69742e64626137353465630059",
}

// CallerABI is the input ABI used to generate the binding from.
// Deprecated: Use CallerMetaData.ABI instead.
var CallerABI = CallerMetaData.ABI

// CallerBin is the compiled bytecode used for deploying new contracts.
// Deprecated: Use CallerMetaData.Bin instead.
var CallerBin = CallerMetaData.Bin

// DeployCaller deploys a new Ethereum contract, binding an instance of Caller to it.
func DeployCaller(auth *bind.TransactOpts, backend bind.ContractBackend) (common.Address, *types.Transaction, *Caller, error) {
	parsed, err := CallerMetaData.GetAbi()
	if err != nil {
		return common.Address{}, nil, nil, err
	}
	if parsed == nil {
		return common.Address{}, nil, nil, errors.New("GetABI returned nil")
	}

	address, tx, contract, err := bind.DeployContract(auth, *parsed, common.FromHex(CallerBin), backend)
	if err != nil {
		return common.Address{}, nil, nil, err
	}
	return address, tx, &Caller{CallerCaller: CallerCaller{contract: contract}, CallerTransactor: CallerTransactor{contract: contract}, CallerFilterer: CallerFilterer{contract: contract}}, nil
}

// Caller is an auto generated Go binding around an Ethereum contract.
type Caller struct {
	CallerCaller     // Read-only binding to the contract
	CallerTransactor // Write-only binding to the contract
	CallerFilterer   // Log filterer for contract events
}

// CallerCaller is an auto generated read-only Go binding around an Ethereum contract.
type CallerCaller struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// CallerTransactor is an auto generated write-only Go binding around an Ethereum contract.
type CallerTransactor struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// CallerFilterer is an auto generated log filtering Go binding around an Ethereum contract events.
type CallerFilterer struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// CallerSession is an auto generated Go binding around an Ethereum contract,
// with pre-set call and transact options.
type CallerSession struct {
	Contract     *Caller           // Generic contract binding to set the session for
	CallOpts     bind.CallOpts     // Call options to use throughout this session
	TransactOpts bind.TransactOpts // Transaction auth options to use throughout this session
}

// CallerCallerSession is an auto generated read-only Go binding around an Ethereum contract,
// with pre-set call options.
type CallerCallerSession struct {
	Contract *CallerCaller // Generic contract caller binding to set the session for
	CallOpts bind.CallOpts // Call options to use throughout this session
}

// CallerTransactorSession is an auto generated write-only Go binding around an Ethereum contract,
// with pre-set transact options.
type CallerTransactorSession struct {
	Contract     *CallerTransactor // Generic contract transactor binding to set the session for
	TransactOpts bind.TransactOpts // Transaction auth options to use throughout this session
}

// CallerRaw is an auto generated low-level Go binding around an Ethereum contract.
type CallerRaw struct {
	Contract *Caller // Generic contract binding to access the raw methods on
}

// CallerCallerRaw is an auto generated low-level read-only Go binding around an Ethereum contract.
type CallerCallerRaw struct {
	Contract *CallerCaller // Generic read-only contract binding to access the raw methods on
}

// CallerTransactorRaw is an auto generated low-level write-only Go binding around an Ethereum contract.
type CallerTransactorRaw struct {
	Contract *CallerTransactor // Generic write-only contract binding to access the raw methods on
}

// NewCaller creates a new instance of Caller, bound to a specific deployed contract.
func NewCaller(address common.Address, backend bind.ContractBackend) (*Caller, error) {
	contract, err := bindCaller(address, backend, backend, backend)
	if err != nil {
		return nil, err
	}
	return &Caller{CallerCaller: CallerCaller{contract: contract}, CallerTransactor: CallerTransactor{contract: contract}, CallerFilterer: CallerFilterer{contract: contract}}, nil
}

// NewCallerCaller creates a new read-only instance of Caller, bound to a specific deployed contract.
func NewCallerCaller(address common.Address, caller bind.ContractCaller) (*CallerCaller, error) {
	contract, err := bindCaller(address, caller, nil, nil)
	if err != nil {
		return nil, err
	}
	return &CallerCaller{contract: contract}, nil
}

// NewCallerTransactor creates a new write-only instance of Caller, bound to a specific deployed contract.
func NewCallerTransactor(address common.Address, transactor bind.ContractTransactor) (*CallerTransactor, error) {
	contract, err := bindCaller(address, nil, transactor, nil)
	if err != nil {
		return nil, err
	}
	return &CallerTransactor{contract: contract}, nil
}

// NewCallerFilterer creates a new log filterer instance of Caller, bound to a specific deployed contract.
func NewCallerFilterer(address common.Address, filterer bind.ContractFilterer) (*CallerFilterer, error) {
	contract, err := bindCaller(address, nil, nil, filterer)
	if err != nil {
		return nil, err
	}
	return &CallerFilterer{contract: contract}, nil
}

// bindCaller binds a generic wrapper to an already deployed contract.
func bindCaller(address common.Address, caller bind.ContractCaller, transactor bind.ContractTransactor, filterer bind.ContractFilterer) (*bind.BoundContract, error) {
	parsed, err := abi.JSON(strings.NewReader(CallerABI))
	if err != nil {
		return nil, err
	}
	return bind.NewBoundContract(address, parsed, caller, transactor, filterer), nil
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_Caller *CallerRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _Caller.Contract.CallerCaller.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_Caller *CallerRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _Caller.Contract.CallerTransactor.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_Caller *CallerRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _Caller.Contract.CallerTransactor.contract.Transact(opts, method, params...)
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_Caller *CallerCallerRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _Caller.Contract.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_Caller *CallerTransactorRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _Caller.Contract.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_Caller *CallerTransactorRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _Caller.Contract.contract.Transact(opts, method, params...)
}

// CallOtherContract is a paid mutator transaction binding the contract method 0x3543e4fb.
//
// Solidity: function callOtherContract(address _contract, bytes _data) returns(bytes)
func (_Caller *CallerTransactor) CallOtherContract(opts *bind.TransactOpts, _contract common.Address, _data []byte) (*types.Transaction, error) {
	return _Caller.contract.Transact(opts, "callOtherContract", _contract, _data)
}

// CallOtherContract is a paid mutator transaction binding the contract method 0x3543e4fb.
//
// Solidity: function callOtherContract(address _contract, bytes _data) returns(bytes)
func (_Caller *CallerSession) CallOtherContract(_contract common.Address, _data []byte) (*types.Transaction, error) {
	return _Caller.Contract.CallOtherContract(&_Caller.TransactOpts, _contract, _data)
}

// CallOtherContract is a paid mutator transaction binding the contract method 0x3543e4fb.
//
// Solidity: function callOtherContract(address _contract, bytes _data) returns(bytes)
func (_Caller *CallerTransactorSession) CallOtherContract(_contract common.Address, _data []byte) (*types.Transaction, error) {
	return _Caller.Contract.CallOtherContract(&_Caller.TransactOpts, _contract, _data)
}
