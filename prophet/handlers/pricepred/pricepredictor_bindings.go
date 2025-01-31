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
	Predictions []*big.Int
	Metrics     [][]*big.Int
}

// PricePredictorMetaData contains all meta data concerning the PricePredictor contract.
var PricePredictorMetaData = &bind.MetaData{
	ABI: "[{\"inputs\":[{\"components\":[{\"internalType\":\"uint256\",\"name\":\"date\",\"type\":\"uint256\"},{\"internalType\":\"string[]\",\"name\":\"tokens\",\"type\":\"string[]\"},{\"internalType\":\"uint256[]\",\"name\":\"metrics\",\"type\":\"uint256[]\"},{\"internalType\":\"uint64[2]\",\"name\":\"falsePositiveRate\",\"type\":\"uint64[2]\"}],\"internalType\":\"structPricePredictor.InputData\",\"name\":\"inputData\",\"type\":\"tuple\"}],\"name\":\"solve\",\"outputs\":[{\"components\":[{\"internalType\":\"uint256[]\",\"name\":\"predictions\",\"type\":\"uint256[]\"},{\"internalType\":\"uint256[][]\",\"name\":\"metrics\",\"type\":\"uint256[][]\"}],\"internalType\":\"structPricePredictor.OutputData\",\"name\":\"outputData\",\"type\":\"tuple\"}],\"stateMutability\":\"pure\",\"type\":\"function\"}]",
	Bin: "0x6080604052348015600e575f5ffd5b506107968061001c5f395ff3fe608060405234801561000f575f5ffd5b5060043610610029575f3560e01c8063f9a6e5c01461002d575b5f5ffd5b61004760048036038101906100429190610546565b61005d565b6040516100549190610740565b60405180910390f35b61006561006a565b919050565b604051806040016040528060608152602001606081525090565b5f604051905090565b5f5ffd5b5f5ffd5b5f5ffd5b5f601f19601f8301169050919050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52604160045260245ffd5b6100df82610099565b810181811067ffffffffffffffff821117156100fe576100fd6100a9565b5b80604052505050565b5f610110610084565b905061011c82826100d6565b919050565b5f5ffd5b5f819050919050565b61013781610125565b8114610141575f5ffd5b50565b5f813590506101528161012e565b92915050565b5f5ffd5b5f67ffffffffffffffff821115610176576101756100a9565b5b602082029050602081019050919050565b5f5ffd5b5f5ffd5b5f67ffffffffffffffff8211156101a9576101a86100a9565b5b6101b282610099565b9050602081019050919050565b828183375f83830152505050565b5f6101df6101da8461018f565b610107565b9050828152602081018484840111156101fb576101fa61018b565b5b6102068482856101bf565b509392505050565b5f82601f83011261022257610221610158565b5b81356102328482602086016101cd565b91505092915050565b5f61024d6102488461015c565b610107565b905080838252602082019050602084028301858111156102705761026f610187565b5b835b818110156102b757803567ffffffffffffffff81111561029557610294610158565b5b8086016102a2898261020e565b85526020850194505050602081019050610272565b5050509392505050565b5f82601f8301126102d5576102d4610158565b5b81356102e584826020860161023b565b91505092915050565b5f67ffffffffffffffff821115610308576103076100a9565b5b602082029050602081019050919050565b5f61032b610326846102ee565b610107565b9050808382526020820190506020840283018581111561034e5761034d610187565b5b835b8181101561037757806103638882610144565b845260208401935050602081019050610350565b5050509392505050565b5f82601f83011261039557610394610158565b5b81356103a5848260208601610319565b91505092915050565b5f67ffffffffffffffff8211156103c8576103c76100a9565b5b602082029050919050565b5f67ffffffffffffffff82169050919050565b6103ef816103d3565b81146103f9575f5ffd5b50565b5f8135905061040a816103e6565b92915050565b5f61042261041d846103ae565b610107565b9050806020840283018581111561043c5761043b610187565b5b835b81811015610465578061045188826103fc565b84526020840193505060208101905061043e565b5050509392505050565b5f82601f83011261048357610482610158565b5b6002610490848285610410565b91505092915050565b5f60a082840312156104ae576104ad610095565b5b6104b86080610107565b90505f6104c784828501610144565b5f83015250602082013567ffffffffffffffff8111156104ea576104e9610121565b5b6104f6848285016102c1565b602083015250604082013567ffffffffffffffff81111561051a57610519610121565b5b61052684828501610381565b604083015250606061053a8482850161046f565b60608301525092915050565b5f6020828403121561055b5761055a61008d565b5b5f82013567ffffffffffffffff81111561057857610577610091565b5b61058484828501610499565b91505092915050565b5f81519050919050565b5f82825260208201905092915050565b5f819050602082019050919050565b6105bf81610125565b82525050565b5f6105d083836105b6565b60208301905092915050565b5f602082019050919050565b5f6105f28261058d565b6105fc8185610597565b9350610607836105a7565b805f5b8381101561063757815161061e88826105c5565b9750610629836105dc565b92505060018101905061060a565b5085935050505092915050565b5f81519050919050565b5f82825260208201905092915050565b5f819050602082019050919050565b5f61067883836105e8565b905092915050565b5f602082019050919050565b5f61069682610644565b6106a0818561064e565b9350836020820285016106b28561065e565b805f5b858110156106ed57848403895281516106ce858261066d565b94506106d983610680565b925060208a019950506001810190506106b5565b50829750879550505050505092915050565b5f604083015f8301518482035f86015261071982826105e8565b91505060208301518482036020860152610733828261068c565b9150508091505092915050565b5f6020820190508181035f83015261075881846106ff565b90509291505056fea264697066735822122003d27eae3cc4befe53c676da1733f675adaa91e51d4e82196da0232e79c252c064736f6c634300081c0033",
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
	parsed, err := abi.JSON(strings.NewReader(PricePredictorABI))
	if err != nil {
		return nil, err
	}
	return bind.NewBoundContract(address, parsed, caller, transactor, filterer), nil
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
// Solidity: function solve((uint256,string[],uint256[],uint64[2]) inputData) pure returns((uint256[],uint256[][]) outputData)
func (_PricePredictor *PricePredictorCaller) Solve(opts *bind.CallOpts, inputData PricePredictorInputData) (PricePredictorOutputData, error) {
	var out []interface{}
	err := _PricePredictor.contract.Call(opts, &out, "solve", inputData)

	if err != nil {
		return *new(PricePredictorOutputData), err
	}

	out0 := *abi.ConvertType(out[0], new(PricePredictorOutputData)).(*PricePredictorOutputData)

	return out0, err

}

// Solve is a free data retrieval call binding the contract method 0xf9a6e5c0.
//
// Solidity: function solve((uint256,string[],uint256[],uint64[2]) inputData) pure returns((uint256[],uint256[][]) outputData)
func (_PricePredictor *PricePredictorSession) Solve(inputData PricePredictorInputData) (PricePredictorOutputData, error) {
	return _PricePredictor.Contract.Solve(&_PricePredictor.CallOpts, inputData)
}

// Solve is a free data retrieval call binding the contract method 0xf9a6e5c0.
//
// Solidity: function solve((uint256,string[],uint256[],uint64[2]) inputData) pure returns((uint256[],uint256[][]) outputData)
func (_PricePredictor *PricePredictorCallerSession) Solve(inputData PricePredictorInputData) (PricePredictorOutputData, error) {
	return _PricePredictor.Contract.Solve(&_PricePredictor.CallOpts, inputData)
}
