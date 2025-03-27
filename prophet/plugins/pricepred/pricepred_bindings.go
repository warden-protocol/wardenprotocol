// Code generated - DO NOT EDIT.
// This file is a generated binding and any manual changes will be lost.

package pricepred

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

// PricePredictorInputData is an auto generated low-level Go binding around an user-defined struct.
type PricePredictorInputData struct {
	Date              *big.Int
	Tokens            []string
	Metrics           []*big.Int
	FalsePositiveRate [2]uint64
}

// PricePredictorOutputData is an auto generated low-level Go binding around an user-defined struct.
type PricePredictorOutputData struct {
	Predictions   []*big.Int
	SolverReceipt PricePredictorSolverReceipt
	Metrics       [][]*big.Int
}

// PricePredictorSolverReceipt is an auto generated low-level Go binding around an user-defined struct.
type PricePredictorSolverReceipt struct {
	BloomFilter []byte
	CountItems  *big.Int
}

// PricePredictorMetaData contains all meta data concerning the PricePredictor contract.
var PricePredictorMetaData = &bind.MetaData{
	ABI: "[{\"inputs\":[{\"components\":[{\"internalType\":\"uint256\",\"name\":\"date\",\"type\":\"uint256\"},{\"internalType\":\"string[]\",\"name\":\"tokens\",\"type\":\"string[]\"},{\"internalType\":\"uint256[]\",\"name\":\"metrics\",\"type\":\"uint256[]\"},{\"internalType\":\"uint64[2]\",\"name\":\"falsePositiveRate\",\"type\":\"uint64[2]\"}],\"internalType\":\"structPricePredictor.InputData\",\"name\":\"\",\"type\":\"tuple\"}],\"name\":\"solve\",\"outputs\":[{\"components\":[{\"internalType\":\"uint256[]\",\"name\":\"predictions\",\"type\":\"uint256[]\"},{\"components\":[{\"internalType\":\"bytes\",\"name\":\"bloomFilter\",\"type\":\"bytes\"},{\"internalType\":\"uint256\",\"name\":\"countItems\",\"type\":\"uint256\"}],\"internalType\":\"structPricePredictor.SolverReceipt\",\"name\":\"solverReceipt\",\"type\":\"tuple\"},{\"internalType\":\"uint256[][]\",\"name\":\"metrics\",\"type\":\"uint256[][]\"}],\"internalType\":\"structPricePredictor.OutputData\",\"name\":\"outputData\",\"type\":\"tuple\"}],\"stateMutability\":\"pure\",\"type\":\"function\"}]",
	Bin: "0x6080604052348015600e575f5ffd5b506108708061001c5f395ff3fe608060405234801561000f575f5ffd5b5060043610610029575f3560e01c8063f9a6e5c01461002d575b5f5ffd5b6100476004803603810190610042919061056c565b61005d565b604051610054919061081a565b60405180910390f35b61006561006a565b919050565b604051806060016040528060608152602001610084610091565b8152602001606081525090565b6040518060400160405280606081526020015f81525090565b5f604051905090565b5f5ffd5b5f5ffd5b5f5ffd5b5f601f19601f8301169050919050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52604160045260245ffd5b610105826100bf565b810181811067ffffffffffffffff82111715610124576101236100cf565b5b80604052505050565b5f6101366100aa565b905061014282826100fc565b919050565b5f5ffd5b5f819050919050565b61015d8161014b565b8114610167575f5ffd5b50565b5f8135905061017881610154565b92915050565b5f5ffd5b5f67ffffffffffffffff82111561019c5761019b6100cf565b5b602082029050602081019050919050565b5f5ffd5b5f5ffd5b5f67ffffffffffffffff8211156101cf576101ce6100cf565b5b6101d8826100bf565b9050602081019050919050565b828183375f83830152505050565b5f610205610200846101b5565b61012d565b905082815260208101848484011115610221576102206101b1565b5b61022c8482856101e5565b509392505050565b5f82601f8301126102485761024761017e565b5b81356102588482602086016101f3565b91505092915050565b5f61027361026e84610182565b61012d565b90508083825260208201905060208402830185811115610296576102956101ad565b5b835b818110156102dd57803567ffffffffffffffff8111156102bb576102ba61017e565b5b8086016102c88982610234565b85526020850194505050602081019050610298565b5050509392505050565b5f82601f8301126102fb576102fa61017e565b5b813561030b848260208601610261565b91505092915050565b5f67ffffffffffffffff82111561032e5761032d6100cf565b5b602082029050602081019050919050565b5f61035161034c84610314565b61012d565b90508083825260208201905060208402830185811115610374576103736101ad565b5b835b8181101561039d5780610389888261016a565b845260208401935050602081019050610376565b5050509392505050565b5f82601f8301126103bb576103ba61017e565b5b81356103cb84826020860161033f565b91505092915050565b5f67ffffffffffffffff8211156103ee576103ed6100cf565b5b602082029050919050565b5f67ffffffffffffffff82169050919050565b610415816103f9565b811461041f575f5ffd5b50565b5f813590506104308161040c565b92915050565b5f610448610443846103d4565b61012d565b90508060208402830185811115610462576104616101ad565b5b835b8181101561048b57806104778882610422565b845260208401935050602081019050610464565b5050509392505050565b5f82601f8301126104a9576104a861017e565b5b60026104b6848285610436565b91505092915050565b5f60a082840312156104d4576104d36100bb565b5b6104de608061012d565b90505f6104ed8482850161016a565b5f83015250602082013567ffffffffffffffff8111156105105761050f610147565b5b61051c848285016102e7565b602083015250604082013567ffffffffffffffff8111156105405761053f610147565b5b61054c848285016103a7565b604083015250606061056084828501610495565b60608301525092915050565b5f60208284031215610581576105806100b3565b5b5f82013567ffffffffffffffff81111561059e5761059d6100b7565b5b6105aa848285016104bf565b91505092915050565b5f81519050919050565b5f82825260208201905092915050565b5f819050602082019050919050565b6105e58161014b565b82525050565b5f6105f683836105dc565b60208301905092915050565b5f602082019050919050565b5f610618826105b3565b61062281856105bd565b935061062d836105cd565b805f5b8381101561065d57815161064488826105eb565b975061064f83610602565b925050600181019050610630565b5085935050505092915050565b5f81519050919050565b5f82825260208201905092915050565b8281835e5f83830152505050565b5f61069c8261066a565b6106a68185610674565b93506106b6818560208601610684565b6106bf816100bf565b840191505092915050565b5f604083015f8301518482035f8601526106e48282610692565b91505060208301516106f960208601826105dc565b508091505092915050565b5f81519050919050565b5f82825260208201905092915050565b5f819050602082019050919050565b5f610738838361060e565b905092915050565b5f602082019050919050565b5f61075682610704565b610760818561070e565b9350836020820285016107728561071e565b805f5b858110156107ad578484038952815161078e858261072d565b945061079983610740565b925060208a01995050600181019050610775565b50829750879550505050505092915050565b5f606083015f8301518482035f8601526107d9828261060e565b915050602083015184820360208601526107f382826106ca565b9150506040830151848203604086015261080d828261074c565b9150508091505092915050565b5f6020820190508181035f83015261083281846107bf565b90509291505056fea2646970667358221220980457f817dffcebe07866838033d1aedb07746045a7e21fd66bb56ac5b18ebb64736f6c634300081c0033",
}

// PricePredictorABI is the input ABI used to generate the binding from.
// Deprecated: Use PricePredictorMetaData.ABI instead.
var PricePredictorABI = PricePredictorMetaData.ABI

// PricePredictorBin is the compiled bytecode used for deploying new contracts.
// Deprecated: Use PricePredictorMetaData.Bin instead.
var PricePredictorBin = PricePredictorMetaData.Bin

// DeployPricePredictor deploys a new Ethereum contract, binding an instance of PricePredictor to it.
func DeployPricePredictor(auth *bind.TransactOpts, backend bind.ContractBackend) (common.Address, *types.Transaction, *PricePredictor, error) {
	parsed, err := PricePredictorMetaData.GetAbi()
	if err != nil {
		return common.Address{}, nil, nil, err
	}
	if parsed == nil {
		return common.Address{}, nil, nil, errors.New("GetABI returned nil")
	}

	address, tx, contract, err := bind.DeployContract(auth, *parsed, common.FromHex(PricePredictorBin), backend)
	if err != nil {
		return common.Address{}, nil, nil, err
	}
	return address, tx, &PricePredictor{PricePredictorCaller: PricePredictorCaller{contract: contract}, PricePredictorTransactor: PricePredictorTransactor{contract: contract}, PricePredictorFilterer: PricePredictorFilterer{contract: contract}}, nil
}

// PricePredictor is an auto generated Go binding around an Ethereum contract.
type PricePredictor struct {
	PricePredictorCaller     // Read-only binding to the contract
	PricePredictorTransactor // Write-only binding to the contract
	PricePredictorFilterer   // Log filterer for contract events
}

// PricePredictorCaller is an auto generated read-only Go binding around an Ethereum contract.
type PricePredictorCaller struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// PricePredictorTransactor is an auto generated write-only Go binding around an Ethereum contract.
type PricePredictorTransactor struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// PricePredictorFilterer is an auto generated log filtering Go binding around an Ethereum contract events.
type PricePredictorFilterer struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// PricePredictorSession is an auto generated Go binding around an Ethereum contract,
// with pre-set call and transact options.
type PricePredictorSession struct {
	Contract     *PricePredictor   // Generic contract binding to set the session for
	CallOpts     bind.CallOpts     // Call options to use throughout this session
	TransactOpts bind.TransactOpts // Transaction auth options to use throughout this session
}

// PricePredictorCallerSession is an auto generated read-only Go binding around an Ethereum contract,
// with pre-set call options.
type PricePredictorCallerSession struct {
	Contract *PricePredictorCaller // Generic contract caller binding to set the session for
	CallOpts bind.CallOpts         // Call options to use throughout this session
}

// PricePredictorTransactorSession is an auto generated write-only Go binding around an Ethereum contract,
// with pre-set transact options.
type PricePredictorTransactorSession struct {
	Contract     *PricePredictorTransactor // Generic contract transactor binding to set the session for
	TransactOpts bind.TransactOpts         // Transaction auth options to use throughout this session
}

// PricePredictorRaw is an auto generated low-level Go binding around an Ethereum contract.
type PricePredictorRaw struct {
	Contract *PricePredictor // Generic contract binding to access the raw methods on
}

// PricePredictorCallerRaw is an auto generated low-level read-only Go binding around an Ethereum contract.
type PricePredictorCallerRaw struct {
	Contract *PricePredictorCaller // Generic read-only contract binding to access the raw methods on
}

// PricePredictorTransactorRaw is an auto generated low-level write-only Go binding around an Ethereum contract.
type PricePredictorTransactorRaw struct {
	Contract *PricePredictorTransactor // Generic write-only contract binding to access the raw methods on
}

// NewPricePredictor creates a new instance of PricePredictor, bound to a specific deployed contract.
func NewPricePredictor(address common.Address, backend bind.ContractBackend) (*PricePredictor, error) {
	contract, err := bindPricePredictor(address, backend, backend, backend)
	if err != nil {
		return nil, err
	}
	return &PricePredictor{PricePredictorCaller: PricePredictorCaller{contract: contract}, PricePredictorTransactor: PricePredictorTransactor{contract: contract}, PricePredictorFilterer: PricePredictorFilterer{contract: contract}}, nil
}

// NewPricePredictorCaller creates a new read-only instance of PricePredictor, bound to a specific deployed contract.
func NewPricePredictorCaller(address common.Address, caller bind.ContractCaller) (*PricePredictorCaller, error) {
	contract, err := bindPricePredictor(address, caller, nil, nil)
	if err != nil {
		return nil, err
	}
	return &PricePredictorCaller{contract: contract}, nil
}

// NewPricePredictorTransactor creates a new write-only instance of PricePredictor, bound to a specific deployed contract.
func NewPricePredictorTransactor(address common.Address, transactor bind.ContractTransactor) (*PricePredictorTransactor, error) {
	contract, err := bindPricePredictor(address, nil, transactor, nil)
	if err != nil {
		return nil, err
	}
	return &PricePredictorTransactor{contract: contract}, nil
}

// NewPricePredictorFilterer creates a new log filterer instance of PricePredictor, bound to a specific deployed contract.
func NewPricePredictorFilterer(address common.Address, filterer bind.ContractFilterer) (*PricePredictorFilterer, error) {
	contract, err := bindPricePredictor(address, nil, nil, filterer)
	if err != nil {
		return nil, err
	}
	return &PricePredictorFilterer{contract: contract}, nil
}

// bindPricePredictor binds a generic wrapper to an already deployed contract.
func bindPricePredictor(address common.Address, caller bind.ContractCaller, transactor bind.ContractTransactor, filterer bind.ContractFilterer) (*bind.BoundContract, error) {
	parsed, err := PricePredictorMetaData.GetAbi()
	if err != nil {
		return nil, err
	}
	return bind.NewBoundContract(address, *parsed, caller, transactor, filterer), nil
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_PricePredictor *PricePredictorRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _PricePredictor.Contract.PricePredictorCaller.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_PricePredictor *PricePredictorRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _PricePredictor.Contract.PricePredictorTransactor.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_PricePredictor *PricePredictorRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _PricePredictor.Contract.PricePredictorTransactor.contract.Transact(opts, method, params...)
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_PricePredictor *PricePredictorCallerRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _PricePredictor.Contract.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_PricePredictor *PricePredictorTransactorRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _PricePredictor.Contract.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_PricePredictor *PricePredictorTransactorRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _PricePredictor.Contract.contract.Transact(opts, method, params...)
}

// Solve is a free data retrieval call binding the contract method 0xf9a6e5c0.
//
// Solidity: function solve((uint256,string[],uint256[],uint64[2]) ) pure returns((uint256[],(bytes,uint256),uint256[][]) outputData)
func (_PricePredictor *PricePredictorCaller) Solve(opts *bind.CallOpts, arg0 PricePredictorInputData) (PricePredictorOutputData, error) {
	var out []interface{}
	err := _PricePredictor.contract.Call(opts, &out, "solve", arg0)

	if err != nil {
		return *new(PricePredictorOutputData), err
	}

	out0 := *abi.ConvertType(out[0], new(PricePredictorOutputData)).(*PricePredictorOutputData)

	return out0, err

}

// Solve is a free data retrieval call binding the contract method 0xf9a6e5c0.
//
// Solidity: function solve((uint256,string[],uint256[],uint64[2]) ) pure returns((uint256[],(bytes,uint256),uint256[][]) outputData)
func (_PricePredictor *PricePredictorSession) Solve(arg0 PricePredictorInputData) (PricePredictorOutputData, error) {
	return _PricePredictor.Contract.Solve(&_PricePredictor.CallOpts, arg0)
}

// Solve is a free data retrieval call binding the contract method 0xf9a6e5c0.
//
// Solidity: function solve((uint256,string[],uint256[],uint64[2]) ) pure returns((uint256[],(bytes,uint256),uint256[][]) outputData)
func (_PricePredictor *PricePredictorCallerSession) Solve(arg0 PricePredictorInputData) (PricePredictorOutputData, error) {
	return _PricePredictor.Contract.Solve(&_PricePredictor.CallOpts, arg0)
}
