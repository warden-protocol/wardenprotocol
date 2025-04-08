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

// HttpRequest is an auto generated low-level Go binding around an user-defined struct.
type HttpRequest struct {
	Url    string
	Method string
	Body   []byte
}

// HttpResponse is an auto generated low-level Go binding around an user-defined struct.
type HttpResponse struct {
	Status *big.Int
	Body   []byte
}

// HttpMetaData contains all meta data concerning the Http contract.
var HttpMetaData = &bind.MetaData{
	ABI: "[{\"inputs\":[{\"components\":[{\"internalType\":\"string\",\"name\":\"url\",\"type\":\"string\"},{\"internalType\":\"string\",\"name\":\"method\",\"type\":\"string\"},{\"internalType\":\"bytes\",\"name\":\"body\",\"type\":\"bytes\"}],\"internalType\":\"structHttp.Request\",\"name\":\"\",\"type\":\"tuple\"}],\"name\":\"main\",\"outputs\":[{\"components\":[{\"internalType\":\"uint256\",\"name\":\"status\",\"type\":\"uint256\"},{\"internalType\":\"bytes\",\"name\":\"body\",\"type\":\"bytes\"}],\"internalType\":\"structHttp.Response\",\"name\":\"\",\"type\":\"tuple\"}],\"stateMutability\":\"pure\",\"type\":\"function\"}]",
	Bin: "0x6080604052348015600e575f5ffd5b506104868061001c5f395ff3fe608060405234801561000f575f5ffd5b5060043610610029575f3560e01c80639b49466f1461002d575b5f5ffd5b61004760048036038101906100429190610337565b61005d565b6040516100549190610430565b60405180910390f35b610065610076565b61006d610076565b80915050919050565b60405180604001604052805f8152602001606081525090565b5f604051905090565b5f5ffd5b5f5ffd5b5f5ffd5b5f601f19601f8301169050919050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52604160045260245ffd5b6100ea826100a4565b810181811067ffffffffffffffff82111715610109576101086100b4565b5b80604052505050565b5f61011b61008f565b905061012782826100e1565b919050565b5f5ffd5b5f5ffd5b5f5ffd5b5f67ffffffffffffffff821115610152576101516100b4565b5b61015b826100a4565b9050602081019050919050565b828183375f83830152505050565b5f61018861018384610138565b610112565b9050828152602081018484840111156101a4576101a3610134565b5b6101af848285610168565b509392505050565b5f82601f8301126101cb576101ca610130565b5b81356101db848260208601610176565b91505092915050565b5f67ffffffffffffffff8211156101fe576101fd6100b4565b5b610207826100a4565b9050602081019050919050565b5f610226610221846101e4565b610112565b90508281526020810184848401111561024257610241610134565b5b61024d848285610168565b509392505050565b5f82601f83011261026957610268610130565b5b8135610279848260208601610214565b91505092915050565b5f60608284031215610297576102966100a0565b5b6102a16060610112565b90505f82013567ffffffffffffffff8111156102c0576102bf61012c565b5b6102cc848285016101b7565b5f83015250602082013567ffffffffffffffff8111156102ef576102ee61012c565b5b6102fb848285016101b7565b602083015250604082013567ffffffffffffffff81111561031f5761031e61012c565b5b61032b84828501610255565b60408301525092915050565b5f6020828403121561034c5761034b610098565b5b5f82013567ffffffffffffffff8111156103695761036861009c565b5b61037584828501610282565b91505092915050565b5f819050919050565b6103908161037e565b82525050565b5f81519050919050565b5f82825260208201905092915050565b8281835e5f83830152505050565b5f6103c882610396565b6103d281856103a0565b93506103e28185602086016103b0565b6103eb816100a4565b840191505092915050565b5f604083015f83015161040b5f860182610387565b506020830151848203602086015261042382826103be565b9150508091505092915050565b5f6020820190508181035f83015261044881846103f6565b90509291505056fea2646970667358221220afce5696e6b205b5a5d3979a26221baaaea8604e27b41f0339722cdd301749d864736f6c634300081c0033",
}

// HttpABI is the input ABI used to generate the binding from.
// Deprecated: Use HttpMetaData.ABI instead.
var HttpABI = HttpMetaData.ABI

// HttpBin is the compiled bytecode used for deploying new contracts.
// Deprecated: Use HttpMetaData.Bin instead.
var HttpBin = HttpMetaData.Bin

// DeployHttp deploys a new Ethereum contract, binding an instance of Http to it.
func DeployHttp(auth *bind.TransactOpts, backend bind.ContractBackend) (common.Address, *types.Transaction, *Http, error) {
	parsed, err := HttpMetaData.GetAbi()
	if err != nil {
		return common.Address{}, nil, nil, err
	}
	if parsed == nil {
		return common.Address{}, nil, nil, errors.New("GetABI returned nil")
	}

	address, tx, contract, err := bind.DeployContract(auth, *parsed, common.FromHex(HttpBin), backend)
	if err != nil {
		return common.Address{}, nil, nil, err
	}
	return address, tx, &Http{HttpCaller: HttpCaller{contract: contract}, HttpTransactor: HttpTransactor{contract: contract}, HttpFilterer: HttpFilterer{contract: contract}}, nil
}

// Http is an auto generated Go binding around an Ethereum contract.
type Http struct {
	HttpCaller     // Read-only binding to the contract
	HttpTransactor // Write-only binding to the contract
	HttpFilterer   // Log filterer for contract events
}

// HttpCaller is an auto generated read-only Go binding around an Ethereum contract.
type HttpCaller struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// HttpTransactor is an auto generated write-only Go binding around an Ethereum contract.
type HttpTransactor struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// HttpFilterer is an auto generated log filtering Go binding around an Ethereum contract events.
type HttpFilterer struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// HttpSession is an auto generated Go binding around an Ethereum contract,
// with pre-set call and transact options.
type HttpSession struct {
	Contract     *Http             // Generic contract binding to set the session for
	CallOpts     bind.CallOpts     // Call options to use throughout this session
	TransactOpts bind.TransactOpts // Transaction auth options to use throughout this session
}

// HttpCallerSession is an auto generated read-only Go binding around an Ethereum contract,
// with pre-set call options.
type HttpCallerSession struct {
	Contract *HttpCaller   // Generic contract caller binding to set the session for
	CallOpts bind.CallOpts // Call options to use throughout this session
}

// HttpTransactorSession is an auto generated write-only Go binding around an Ethereum contract,
// with pre-set transact options.
type HttpTransactorSession struct {
	Contract     *HttpTransactor   // Generic contract transactor binding to set the session for
	TransactOpts bind.TransactOpts // Transaction auth options to use throughout this session
}

// HttpRaw is an auto generated low-level Go binding around an Ethereum contract.
type HttpRaw struct {
	Contract *Http // Generic contract binding to access the raw methods on
}

// HttpCallerRaw is an auto generated low-level read-only Go binding around an Ethereum contract.
type HttpCallerRaw struct {
	Contract *HttpCaller // Generic read-only contract binding to access the raw methods on
}

// HttpTransactorRaw is an auto generated low-level write-only Go binding around an Ethereum contract.
type HttpTransactorRaw struct {
	Contract *HttpTransactor // Generic write-only contract binding to access the raw methods on
}

// NewHttp creates a new instance of Http, bound to a specific deployed contract.
func NewHttp(address common.Address, backend bind.ContractBackend) (*Http, error) {
	contract, err := bindHttp(address, backend, backend, backend)
	if err != nil {
		return nil, err
	}
	return &Http{HttpCaller: HttpCaller{contract: contract}, HttpTransactor: HttpTransactor{contract: contract}, HttpFilterer: HttpFilterer{contract: contract}}, nil
}

// NewHttpCaller creates a new read-only instance of Http, bound to a specific deployed contract.
func NewHttpCaller(address common.Address, caller bind.ContractCaller) (*HttpCaller, error) {
	contract, err := bindHttp(address, caller, nil, nil)
	if err != nil {
		return nil, err
	}
	return &HttpCaller{contract: contract}, nil
}

// NewHttpTransactor creates a new write-only instance of Http, bound to a specific deployed contract.
func NewHttpTransactor(address common.Address, transactor bind.ContractTransactor) (*HttpTransactor, error) {
	contract, err := bindHttp(address, nil, transactor, nil)
	if err != nil {
		return nil, err
	}
	return &HttpTransactor{contract: contract}, nil
}

// NewHttpFilterer creates a new log filterer instance of Http, bound to a specific deployed contract.
func NewHttpFilterer(address common.Address, filterer bind.ContractFilterer) (*HttpFilterer, error) {
	contract, err := bindHttp(address, nil, nil, filterer)
	if err != nil {
		return nil, err
	}
	return &HttpFilterer{contract: contract}, nil
}

// bindHttp binds a generic wrapper to an already deployed contract.
func bindHttp(address common.Address, caller bind.ContractCaller, transactor bind.ContractTransactor, filterer bind.ContractFilterer) (*bind.BoundContract, error) {
	parsed, err := HttpMetaData.GetAbi()
	if err != nil {
		return nil, err
	}
	return bind.NewBoundContract(address, *parsed, caller, transactor, filterer), nil
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_Http *HttpRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _Http.Contract.HttpCaller.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_Http *HttpRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _Http.Contract.HttpTransactor.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_Http *HttpRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _Http.Contract.HttpTransactor.contract.Transact(opts, method, params...)
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_Http *HttpCallerRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _Http.Contract.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_Http *HttpTransactorRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _Http.Contract.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_Http *HttpTransactorRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _Http.Contract.contract.Transact(opts, method, params...)
}

// Main is a free data retrieval call binding the contract method 0x9b49466f.
//
// Solidity: function main((string,string,bytes) ) pure returns((uint256,bytes))
func (_Http *HttpCaller) Main(opts *bind.CallOpts, arg0 HttpRequest) (HttpResponse, error) {
	var out []interface{}
	err := _Http.contract.Call(opts, &out, "main", arg0)

	if err != nil {
		return *new(HttpResponse), err
	}

	out0 := *abi.ConvertType(out[0], new(HttpResponse)).(*HttpResponse)

	return out0, err

}

// Main is a free data retrieval call binding the contract method 0x9b49466f.
//
// Solidity: function main((string,string,bytes) ) pure returns((uint256,bytes))
func (_Http *HttpSession) Main(arg0 HttpRequest) (HttpResponse, error) {
	return _Http.Contract.Main(&_Http.CallOpts, arg0)
}

// Main is a free data retrieval call binding the contract method 0x9b49466f.
//
// Solidity: function main((string,string,bytes) ) pure returns((uint256,bytes))
func (_Http *HttpCallerSession) Main(arg0 HttpRequest) (HttpResponse, error) {
	return _Http.Contract.Main(&_Http.CallOpts, arg0)
}
