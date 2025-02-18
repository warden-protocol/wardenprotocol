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

// ArbitraryHttpRequest is an auto generated low-level Go binding around an user-defined struct.
type ArbitraryHttpRequest struct {
	Url    string
	Method string
	Body   []byte
}

// ArbitraryHttpResponse is an auto generated low-level Go binding around an user-defined struct.
type ArbitraryHttpResponse struct {
	Status *big.Int
	Body   []byte
}

// ArbitraryHttpMetaData contains all meta data concerning the ArbitraryHttp contract.
var ArbitraryHttpMetaData = &bind.MetaData{
	ABI: "[{\"inputs\":[{\"components\":[{\"internalType\":\"string\",\"name\":\"url\",\"type\":\"string\"},{\"internalType\":\"string\",\"name\":\"method\",\"type\":\"string\"},{\"internalType\":\"bytes\",\"name\":\"body\",\"type\":\"bytes\"}],\"internalType\":\"structArbitraryHttp.Request\",\"name\":\"\",\"type\":\"tuple\"}],\"name\":\"main\",\"outputs\":[{\"components\":[{\"internalType\":\"uint256\",\"name\":\"status\",\"type\":\"uint256\"},{\"internalType\":\"bytes\",\"name\":\"body\",\"type\":\"bytes\"}],\"internalType\":\"structArbitraryHttp.Response\",\"name\":\"\",\"type\":\"tuple\"}],\"stateMutability\":\"pure\",\"type\":\"function\"}]",
	Bin: "0x6080604052348015600e575f5ffd5b506104868061001c5f395ff3fe608060405234801561000f575f5ffd5b5060043610610029575f3560e01c80639b49466f1461002d575b5f5ffd5b61004760048036038101906100429190610337565b61005d565b6040516100549190610430565b60405180910390f35b610065610076565b61006d610076565b80915050919050565b60405180604001604052805f8152602001606081525090565b5f604051905090565b5f5ffd5b5f5ffd5b5f5ffd5b5f601f19601f8301169050919050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52604160045260245ffd5b6100ea826100a4565b810181811067ffffffffffffffff82111715610109576101086100b4565b5b80604052505050565b5f61011b61008f565b905061012782826100e1565b919050565b5f5ffd5b5f5ffd5b5f5ffd5b5f67ffffffffffffffff821115610152576101516100b4565b5b61015b826100a4565b9050602081019050919050565b828183375f83830152505050565b5f61018861018384610138565b610112565b9050828152602081018484840111156101a4576101a3610134565b5b6101af848285610168565b509392505050565b5f82601f8301126101cb576101ca610130565b5b81356101db848260208601610176565b91505092915050565b5f67ffffffffffffffff8211156101fe576101fd6100b4565b5b610207826100a4565b9050602081019050919050565b5f610226610221846101e4565b610112565b90508281526020810184848401111561024257610241610134565b5b61024d848285610168565b509392505050565b5f82601f83011261026957610268610130565b5b8135610279848260208601610214565b91505092915050565b5f60608284031215610297576102966100a0565b5b6102a16060610112565b90505f82013567ffffffffffffffff8111156102c0576102bf61012c565b5b6102cc848285016101b7565b5f83015250602082013567ffffffffffffffff8111156102ef576102ee61012c565b5b6102fb848285016101b7565b602083015250604082013567ffffffffffffffff81111561031f5761031e61012c565b5b61032b84828501610255565b60408301525092915050565b5f6020828403121561034c5761034b610098565b5b5f82013567ffffffffffffffff8111156103695761036861009c565b5b61037584828501610282565b91505092915050565b5f819050919050565b6103908161037e565b82525050565b5f81519050919050565b5f82825260208201905092915050565b8281835e5f83830152505050565b5f6103c882610396565b6103d281856103a0565b93506103e28185602086016103b0565b6103eb816100a4565b840191505092915050565b5f604083015f83015161040b5f860182610387565b506020830151848203602086015261042382826103be565b9150508091505092915050565b5f6020820190508181035f83015261044881846103f6565b90509291505056fea2646970667358221220d1c715b4bb72f34d40d7743b3a146a69d4dc455bba9895d332ed124bbdbb989664736f6c634300081c0033",
}

// ArbitraryHttpABI is the input ABI used to generate the binding from.
// Deprecated: Use ArbitraryHttpMetaData.ABI instead.
var ArbitraryHttpABI = ArbitraryHttpMetaData.ABI

// ArbitraryHttpBin is the compiled bytecode used for deploying new contracts.
// Deprecated: Use ArbitraryHttpMetaData.Bin instead.
var ArbitraryHttpBin = ArbitraryHttpMetaData.Bin

// DeployArbitraryHttp deploys a new Ethereum contract, binding an instance of ArbitraryHttp to it.
func DeployArbitraryHttp(auth *bind.TransactOpts, backend bind.ContractBackend) (common.Address, *types.Transaction, *ArbitraryHttp, error) {
	parsed, err := ArbitraryHttpMetaData.GetAbi()
	if err != nil {
		return common.Address{}, nil, nil, err
	}
	if parsed == nil {
		return common.Address{}, nil, nil, errors.New("GetABI returned nil")
	}

	address, tx, contract, err := bind.DeployContract(auth, *parsed, common.FromHex(ArbitraryHttpBin), backend)
	if err != nil {
		return common.Address{}, nil, nil, err
	}
	return address, tx, &ArbitraryHttp{ArbitraryHttpCaller: ArbitraryHttpCaller{contract: contract}, ArbitraryHttpTransactor: ArbitraryHttpTransactor{contract: contract}, ArbitraryHttpFilterer: ArbitraryHttpFilterer{contract: contract}}, nil
}

// ArbitraryHttp is an auto generated Go binding around an Ethereum contract.
type ArbitraryHttp struct {
	ArbitraryHttpCaller     // Read-only binding to the contract
	ArbitraryHttpTransactor // Write-only binding to the contract
	ArbitraryHttpFilterer   // Log filterer for contract events
}

// ArbitraryHttpCaller is an auto generated read-only Go binding around an Ethereum contract.
type ArbitraryHttpCaller struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// ArbitraryHttpTransactor is an auto generated write-only Go binding around an Ethereum contract.
type ArbitraryHttpTransactor struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// ArbitraryHttpFilterer is an auto generated log filtering Go binding around an Ethereum contract events.
type ArbitraryHttpFilterer struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// ArbitraryHttpSession is an auto generated Go binding around an Ethereum contract,
// with pre-set call and transact options.
type ArbitraryHttpSession struct {
	Contract     *ArbitraryHttp    // Generic contract binding to set the session for
	CallOpts     bind.CallOpts     // Call options to use throughout this session
	TransactOpts bind.TransactOpts // Transaction auth options to use throughout this session
}

// ArbitraryHttpCallerSession is an auto generated read-only Go binding around an Ethereum contract,
// with pre-set call options.
type ArbitraryHttpCallerSession struct {
	Contract *ArbitraryHttpCaller // Generic contract caller binding to set the session for
	CallOpts bind.CallOpts        // Call options to use throughout this session
}

// ArbitraryHttpTransactorSession is an auto generated write-only Go binding around an Ethereum contract,
// with pre-set transact options.
type ArbitraryHttpTransactorSession struct {
	Contract     *ArbitraryHttpTransactor // Generic contract transactor binding to set the session for
	TransactOpts bind.TransactOpts        // Transaction auth options to use throughout this session
}

// ArbitraryHttpRaw is an auto generated low-level Go binding around an Ethereum contract.
type ArbitraryHttpRaw struct {
	Contract *ArbitraryHttp // Generic contract binding to access the raw methods on
}

// ArbitraryHttpCallerRaw is an auto generated low-level read-only Go binding around an Ethereum contract.
type ArbitraryHttpCallerRaw struct {
	Contract *ArbitraryHttpCaller // Generic read-only contract binding to access the raw methods on
}

// ArbitraryHttpTransactorRaw is an auto generated low-level write-only Go binding around an Ethereum contract.
type ArbitraryHttpTransactorRaw struct {
	Contract *ArbitraryHttpTransactor // Generic write-only contract binding to access the raw methods on
}

// NewArbitraryHttp creates a new instance of ArbitraryHttp, bound to a specific deployed contract.
func NewArbitraryHttp(address common.Address, backend bind.ContractBackend) (*ArbitraryHttp, error) {
	contract, err := bindArbitraryHttp(address, backend, backend, backend)
	if err != nil {
		return nil, err
	}
	return &ArbitraryHttp{ArbitraryHttpCaller: ArbitraryHttpCaller{contract: contract}, ArbitraryHttpTransactor: ArbitraryHttpTransactor{contract: contract}, ArbitraryHttpFilterer: ArbitraryHttpFilterer{contract: contract}}, nil
}

// NewArbitraryHttpCaller creates a new read-only instance of ArbitraryHttp, bound to a specific deployed contract.
func NewArbitraryHttpCaller(address common.Address, caller bind.ContractCaller) (*ArbitraryHttpCaller, error) {
	contract, err := bindArbitraryHttp(address, caller, nil, nil)
	if err != nil {
		return nil, err
	}
	return &ArbitraryHttpCaller{contract: contract}, nil
}

// NewArbitraryHttpTransactor creates a new write-only instance of ArbitraryHttp, bound to a specific deployed contract.
func NewArbitraryHttpTransactor(address common.Address, transactor bind.ContractTransactor) (*ArbitraryHttpTransactor, error) {
	contract, err := bindArbitraryHttp(address, nil, transactor, nil)
	if err != nil {
		return nil, err
	}
	return &ArbitraryHttpTransactor{contract: contract}, nil
}

// NewArbitraryHttpFilterer creates a new log filterer instance of ArbitraryHttp, bound to a specific deployed contract.
func NewArbitraryHttpFilterer(address common.Address, filterer bind.ContractFilterer) (*ArbitraryHttpFilterer, error) {
	contract, err := bindArbitraryHttp(address, nil, nil, filterer)
	if err != nil {
		return nil, err
	}
	return &ArbitraryHttpFilterer{contract: contract}, nil
}

// bindArbitraryHttp binds a generic wrapper to an already deployed contract.
func bindArbitraryHttp(address common.Address, caller bind.ContractCaller, transactor bind.ContractTransactor, filterer bind.ContractFilterer) (*bind.BoundContract, error) {
	parsed, err := ArbitraryHttpMetaData.GetAbi()
	if err != nil {
		return nil, err
	}
	return bind.NewBoundContract(address, *parsed, caller, transactor, filterer), nil
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_ArbitraryHttp *ArbitraryHttpRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _ArbitraryHttp.Contract.ArbitraryHttpCaller.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_ArbitraryHttp *ArbitraryHttpRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _ArbitraryHttp.Contract.ArbitraryHttpTransactor.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_ArbitraryHttp *ArbitraryHttpRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _ArbitraryHttp.Contract.ArbitraryHttpTransactor.contract.Transact(opts, method, params...)
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_ArbitraryHttp *ArbitraryHttpCallerRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _ArbitraryHttp.Contract.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_ArbitraryHttp *ArbitraryHttpTransactorRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _ArbitraryHttp.Contract.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_ArbitraryHttp *ArbitraryHttpTransactorRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _ArbitraryHttp.Contract.contract.Transact(opts, method, params...)
}

// Main is a free data retrieval call binding the contract method 0x9b49466f.
//
// Solidity: function main((string,string,bytes) ) pure returns((uint256,bytes))
func (_ArbitraryHttp *ArbitraryHttpCaller) Main(opts *bind.CallOpts, arg0 ArbitraryHttpRequest) (ArbitraryHttpResponse, error) {
	var out []interface{}
	err := _ArbitraryHttp.contract.Call(opts, &out, "main", arg0)

	if err != nil {
		return *new(ArbitraryHttpResponse), err
	}

	out0 := *abi.ConvertType(out[0], new(ArbitraryHttpResponse)).(*ArbitraryHttpResponse)

	return out0, err

}

// Main is a free data retrieval call binding the contract method 0x9b49466f.
//
// Solidity: function main((string,string,bytes) ) pure returns((uint256,bytes))
func (_ArbitraryHttp *ArbitraryHttpSession) Main(arg0 ArbitraryHttpRequest) (ArbitraryHttpResponse, error) {
	return _ArbitraryHttp.Contract.Main(&_ArbitraryHttp.CallOpts, arg0)
}

// Main is a free data retrieval call binding the contract method 0x9b49466f.
//
// Solidity: function main((string,string,bytes) ) pure returns((uint256,bytes))
func (_ArbitraryHttp *ArbitraryHttpCallerSession) Main(arg0 ArbitraryHttpRequest) (ArbitraryHttpResponse, error) {
	return _ArbitraryHttp.Contract.Main(&_ArbitraryHttp.CallOpts, arg0)
}
