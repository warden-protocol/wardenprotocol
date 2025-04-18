// Code generated - DO NOT EDIT.
// This file is a generated binding and any manual changes will be lost.

package async

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

// DeductedFee is an auto generated low-level Go binding around an user-defined struct.
type DeductedFee struct {
	PluginCreatorReward []TypesCoin
	ExecutorReward      []TypesCoin
}

// PendingTasksResponse is an auto generated low-level Go binding around an user-defined struct.
type PendingTasksResponse struct {
	Pagination TypesPageResponse
	Tasks      []Task
}

// Plugin is an auto generated low-level Go binding around an user-defined struct.
type Plugin struct {
	Id          string
	Creator     common.Address
	Description string
	Fee         PluginFee
}

// PluginFee is an auto generated low-level Go binding around an user-defined struct.
type PluginFee struct {
	Fee []TypesCoin
}

// PluginsResponse is an auto generated low-level Go binding around an user-defined struct.
type PluginsResponse struct {
	Pagination TypesPageResponse
	Plugins    []Plugin
}

// Task is an auto generated low-level Go binding around an user-defined struct.
type Task struct {
	Id      uint64
	Creator common.Address
	Plugin  string
	Input   []byte
	Fee     DeductedFee
}

// TaskByIdResponse is an auto generated low-level Go binding around an user-defined struct.
type TaskByIdResponse struct {
	TaskResponse TaskResponse
}

// TaskResponse is an auto generated low-level Go binding around an user-defined struct.
type TaskResponse struct {
	Task   Task
	Votes  []TaskVote
	Result TaskResult
}

// TaskResult is an auto generated low-level Go binding around an user-defined struct.
type TaskResult struct {
	Id        uint64
	Output    []byte
	Submitter []byte
}

// TaskVote is an auto generated low-level Go binding around an user-defined struct.
type TaskVote struct {
	TaskId uint64
	Voter  []byte
	Vote   uint8
}

// TasksResponse is an auto generated low-level Go binding around an user-defined struct.
type TasksResponse struct {
	Pagination TypesPageResponse
	Tasks      []TaskResponse
}

// TypesCallbackParams is an auto generated low-level Go binding around an user-defined struct.
type TypesCallbackParams struct {
	AddressValue common.Address
	GasLimit     uint64
}

// TypesCoin is an auto generated low-level Go binding around an user-defined struct.
type TypesCoin struct {
	Denom  string
	Amount *big.Int
}

// TypesPageRequest is an auto generated low-level Go binding around an user-defined struct.
type TypesPageRequest struct {
	Key        []byte
	Offset     uint64
	Limit      uint64
	CountTotal bool
	Reverse    bool
}

// TypesPageResponse is an auto generated low-level Go binding around an user-defined struct.
type TypesPageResponse struct {
	NextKey []byte
	Total   uint64
}

// IAsyncMetaData contains all meta data concerning the IAsync contract.
var IAsyncMetaData = &bind.MetaData{
	ABI: "[{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"uint64\",\"name\":\"taskId\",\"type\":\"uint64\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"creator\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"string\",\"name\":\"plugin\",\"type\":\"string\"},{\"indexed\":false,\"internalType\":\"uint64\",\"name\":\"callbackId\",\"type\":\"uint64\"}],\"name\":\"CreateTask\",\"type\":\"event\"},{\"inputs\":[{\"internalType\":\"string\",\"name\":\"plugin\",\"type\":\"string\"},{\"internalType\":\"bytes\",\"name\":\"input\",\"type\":\"bytes\"},{\"components\":[{\"internalType\":\"string\",\"name\":\"denom\",\"type\":\"string\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"internalType\":\"structTypes.Coin[]\",\"name\":\"maxFee\",\"type\":\"tuple[]\"},{\"components\":[{\"internalType\":\"address\",\"name\":\"addressValue\",\"type\":\"address\"},{\"internalType\":\"uint64\",\"name\":\"gasLimit\",\"type\":\"uint64\"}],\"internalType\":\"structTypes.CallbackParams\",\"name\":\"callbackParams\",\"type\":\"tuple\"}],\"name\":\"addTask\",\"outputs\":[{\"internalType\":\"uint64\",\"name\":\"taskId\",\"type\":\"uint64\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes\",\"name\":\"key\",\"type\":\"bytes\"},{\"internalType\":\"uint64\",\"name\":\"offset\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"limit\",\"type\":\"uint64\"},{\"internalType\":\"bool\",\"name\":\"countTotal\",\"type\":\"bool\"},{\"internalType\":\"bool\",\"name\":\"reverse\",\"type\":\"bool\"}],\"internalType\":\"structTypes.PageRequest\",\"name\":\"pagination\",\"type\":\"tuple\"}],\"name\":\"pendingTasks\",\"outputs\":[{\"components\":[{\"components\":[{\"internalType\":\"bytes\",\"name\":\"nextKey\",\"type\":\"bytes\"},{\"internalType\":\"uint64\",\"name\":\"total\",\"type\":\"uint64\"}],\"internalType\":\"structTypes.PageResponse\",\"name\":\"pagination\",\"type\":\"tuple\"},{\"components\":[{\"internalType\":\"uint64\",\"name\":\"id\",\"type\":\"uint64\"},{\"internalType\":\"address\",\"name\":\"creator\",\"type\":\"address\"},{\"internalType\":\"string\",\"name\":\"plugin\",\"type\":\"string\"},{\"internalType\":\"bytes\",\"name\":\"input\",\"type\":\"bytes\"},{\"components\":[{\"components\":[{\"internalType\":\"string\",\"name\":\"denom\",\"type\":\"string\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"internalType\":\"structTypes.Coin[]\",\"name\":\"pluginCreatorReward\",\"type\":\"tuple[]\"},{\"components\":[{\"internalType\":\"string\",\"name\":\"denom\",\"type\":\"string\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"internalType\":\"structTypes.Coin[]\",\"name\":\"executorReward\",\"type\":\"tuple[]\"}],\"internalType\":\"structDeductedFee\",\"name\":\"fee\",\"type\":\"tuple\"}],\"internalType\":\"structTask[]\",\"name\":\"tasks\",\"type\":\"tuple[]\"}],\"internalType\":\"structPendingTasksResponse\",\"name\":\"response\",\"type\":\"tuple\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes\",\"name\":\"key\",\"type\":\"bytes\"},{\"internalType\":\"uint64\",\"name\":\"offset\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"limit\",\"type\":\"uint64\"},{\"internalType\":\"bool\",\"name\":\"countTotal\",\"type\":\"bool\"},{\"internalType\":\"bool\",\"name\":\"reverse\",\"type\":\"bool\"}],\"internalType\":\"structTypes.PageRequest\",\"name\":\"pagination\",\"type\":\"tuple\"}],\"name\":\"plugins\",\"outputs\":[{\"components\":[{\"components\":[{\"internalType\":\"bytes\",\"name\":\"nextKey\",\"type\":\"bytes\"},{\"internalType\":\"uint64\",\"name\":\"total\",\"type\":\"uint64\"}],\"internalType\":\"structTypes.PageResponse\",\"name\":\"pagination\",\"type\":\"tuple\"},{\"components\":[{\"internalType\":\"string\",\"name\":\"id\",\"type\":\"string\"},{\"internalType\":\"address\",\"name\":\"creator\",\"type\":\"address\"},{\"internalType\":\"string\",\"name\":\"description\",\"type\":\"string\"},{\"components\":[{\"components\":[{\"internalType\":\"string\",\"name\":\"denom\",\"type\":\"string\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"internalType\":\"structTypes.Coin[]\",\"name\":\"fee\",\"type\":\"tuple[]\"}],\"internalType\":\"structPluginFee\",\"name\":\"fee\",\"type\":\"tuple\"}],\"internalType\":\"structPlugin[]\",\"name\":\"plugins\",\"type\":\"tuple[]\"}],\"internalType\":\"structPluginsResponse\",\"name\":\"response\",\"type\":\"tuple\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint64\",\"name\":\"taskId\",\"type\":\"uint64\"}],\"name\":\"taskById\",\"outputs\":[{\"components\":[{\"components\":[{\"components\":[{\"internalType\":\"uint64\",\"name\":\"id\",\"type\":\"uint64\"},{\"internalType\":\"address\",\"name\":\"creator\",\"type\":\"address\"},{\"internalType\":\"string\",\"name\":\"plugin\",\"type\":\"string\"},{\"internalType\":\"bytes\",\"name\":\"input\",\"type\":\"bytes\"},{\"components\":[{\"components\":[{\"internalType\":\"string\",\"name\":\"denom\",\"type\":\"string\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"internalType\":\"structTypes.Coin[]\",\"name\":\"pluginCreatorReward\",\"type\":\"tuple[]\"},{\"components\":[{\"internalType\":\"string\",\"name\":\"denom\",\"type\":\"string\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"internalType\":\"structTypes.Coin[]\",\"name\":\"executorReward\",\"type\":\"tuple[]\"}],\"internalType\":\"structDeductedFee\",\"name\":\"fee\",\"type\":\"tuple\"}],\"internalType\":\"structTask\",\"name\":\"task\",\"type\":\"tuple\"},{\"components\":[{\"internalType\":\"uint64\",\"name\":\"taskId\",\"type\":\"uint64\"},{\"internalType\":\"bytes\",\"name\":\"Voter\",\"type\":\"bytes\"},{\"internalType\":\"enumTaskVoteType\",\"name\":\"vote\",\"type\":\"uint8\"}],\"internalType\":\"structTaskVote[]\",\"name\":\"votes\",\"type\":\"tuple[]\"},{\"components\":[{\"internalType\":\"uint64\",\"name\":\"id\",\"type\":\"uint64\"},{\"internalType\":\"bytes\",\"name\":\"output\",\"type\":\"bytes\"},{\"internalType\":\"bytes\",\"name\":\"submitter\",\"type\":\"bytes\"}],\"internalType\":\"structTaskResult\",\"name\":\"result\",\"type\":\"tuple\"}],\"internalType\":\"structTaskResponse\",\"name\":\"taskResponse\",\"type\":\"tuple\"}],\"internalType\":\"structTaskByIdResponse\",\"name\":\"response\",\"type\":\"tuple\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes\",\"name\":\"key\",\"type\":\"bytes\"},{\"internalType\":\"uint64\",\"name\":\"offset\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"limit\",\"type\":\"uint64\"},{\"internalType\":\"bool\",\"name\":\"countTotal\",\"type\":\"bool\"},{\"internalType\":\"bool\",\"name\":\"reverse\",\"type\":\"bool\"}],\"internalType\":\"structTypes.PageRequest\",\"name\":\"pagination\",\"type\":\"tuple\"},{\"internalType\":\"address\",\"name\":\"creator\",\"type\":\"address\"}],\"name\":\"tasks\",\"outputs\":[{\"components\":[{\"components\":[{\"internalType\":\"bytes\",\"name\":\"nextKey\",\"type\":\"bytes\"},{\"internalType\":\"uint64\",\"name\":\"total\",\"type\":\"uint64\"}],\"internalType\":\"structTypes.PageResponse\",\"name\":\"pagination\",\"type\":\"tuple\"},{\"components\":[{\"components\":[{\"internalType\":\"uint64\",\"name\":\"id\",\"type\":\"uint64\"},{\"internalType\":\"address\",\"name\":\"creator\",\"type\":\"address\"},{\"internalType\":\"string\",\"name\":\"plugin\",\"type\":\"string\"},{\"internalType\":\"bytes\",\"name\":\"input\",\"type\":\"bytes\"},{\"components\":[{\"components\":[{\"internalType\":\"string\",\"name\":\"denom\",\"type\":\"string\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"internalType\":\"structTypes.Coin[]\",\"name\":\"pluginCreatorReward\",\"type\":\"tuple[]\"},{\"components\":[{\"internalType\":\"string\",\"name\":\"denom\",\"type\":\"string\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"internalType\":\"structTypes.Coin[]\",\"name\":\"executorReward\",\"type\":\"tuple[]\"}],\"internalType\":\"structDeductedFee\",\"name\":\"fee\",\"type\":\"tuple\"}],\"internalType\":\"structTask\",\"name\":\"task\",\"type\":\"tuple\"},{\"components\":[{\"internalType\":\"uint64\",\"name\":\"taskId\",\"type\":\"uint64\"},{\"internalType\":\"bytes\",\"name\":\"Voter\",\"type\":\"bytes\"},{\"internalType\":\"enumTaskVoteType\",\"name\":\"vote\",\"type\":\"uint8\"}],\"internalType\":\"structTaskVote[]\",\"name\":\"votes\",\"type\":\"tuple[]\"},{\"components\":[{\"internalType\":\"uint64\",\"name\":\"id\",\"type\":\"uint64\"},{\"internalType\":\"bytes\",\"name\":\"output\",\"type\":\"bytes\"},{\"internalType\":\"bytes\",\"name\":\"submitter\",\"type\":\"bytes\"}],\"internalType\":\"structTaskResult\",\"name\":\"result\",\"type\":\"tuple\"}],\"internalType\":\"structTaskResponse[]\",\"name\":\"tasks\",\"type\":\"tuple[]\"}],\"internalType\":\"structTasksResponse\",\"name\":\"response\",\"type\":\"tuple\"}],\"stateMutability\":\"view\",\"type\":\"function\"}]",
}

// IAsyncABI is the input ABI used to generate the binding from.
// Deprecated: Use IAsyncMetaData.ABI instead.
var IAsyncABI = IAsyncMetaData.ABI

// IAsync is an auto generated Go binding around an Ethereum contract.
type IAsync struct {
	IAsyncCaller     // Read-only binding to the contract
	IAsyncTransactor // Write-only binding to the contract
	IAsyncFilterer   // Log filterer for contract events
}

// IAsyncCaller is an auto generated read-only Go binding around an Ethereum contract.
type IAsyncCaller struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// IAsyncTransactor is an auto generated write-only Go binding around an Ethereum contract.
type IAsyncTransactor struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// IAsyncFilterer is an auto generated log filtering Go binding around an Ethereum contract events.
type IAsyncFilterer struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// IAsyncSession is an auto generated Go binding around an Ethereum contract,
// with pre-set call and transact options.
type IAsyncSession struct {
	Contract     *IAsync           // Generic contract binding to set the session for
	CallOpts     bind.CallOpts     // Call options to use throughout this session
	TransactOpts bind.TransactOpts // Transaction auth options to use throughout this session
}

// IAsyncCallerSession is an auto generated read-only Go binding around an Ethereum contract,
// with pre-set call options.
type IAsyncCallerSession struct {
	Contract *IAsyncCaller // Generic contract caller binding to set the session for
	CallOpts bind.CallOpts // Call options to use throughout this session
}

// IAsyncTransactorSession is an auto generated write-only Go binding around an Ethereum contract,
// with pre-set transact options.
type IAsyncTransactorSession struct {
	Contract     *IAsyncTransactor // Generic contract transactor binding to set the session for
	TransactOpts bind.TransactOpts // Transaction auth options to use throughout this session
}

// IAsyncRaw is an auto generated low-level Go binding around an Ethereum contract.
type IAsyncRaw struct {
	Contract *IAsync // Generic contract binding to access the raw methods on
}

// IAsyncCallerRaw is an auto generated low-level read-only Go binding around an Ethereum contract.
type IAsyncCallerRaw struct {
	Contract *IAsyncCaller // Generic read-only contract binding to access the raw methods on
}

// IAsyncTransactorRaw is an auto generated low-level write-only Go binding around an Ethereum contract.
type IAsyncTransactorRaw struct {
	Contract *IAsyncTransactor // Generic write-only contract binding to access the raw methods on
}

// NewIAsync creates a new instance of IAsync, bound to a specific deployed contract.
func NewIAsync(address common.Address, backend bind.ContractBackend) (*IAsync, error) {
	contract, err := bindIAsync(address, backend, backend, backend)
	if err != nil {
		return nil, err
	}
	return &IAsync{IAsyncCaller: IAsyncCaller{contract: contract}, IAsyncTransactor: IAsyncTransactor{contract: contract}, IAsyncFilterer: IAsyncFilterer{contract: contract}}, nil
}

// NewIAsyncCaller creates a new read-only instance of IAsync, bound to a specific deployed contract.
func NewIAsyncCaller(address common.Address, caller bind.ContractCaller) (*IAsyncCaller, error) {
	contract, err := bindIAsync(address, caller, nil, nil)
	if err != nil {
		return nil, err
	}
	return &IAsyncCaller{contract: contract}, nil
}

// NewIAsyncTransactor creates a new write-only instance of IAsync, bound to a specific deployed contract.
func NewIAsyncTransactor(address common.Address, transactor bind.ContractTransactor) (*IAsyncTransactor, error) {
	contract, err := bindIAsync(address, nil, transactor, nil)
	if err != nil {
		return nil, err
	}
	return &IAsyncTransactor{contract: contract}, nil
}

// NewIAsyncFilterer creates a new log filterer instance of IAsync, bound to a specific deployed contract.
func NewIAsyncFilterer(address common.Address, filterer bind.ContractFilterer) (*IAsyncFilterer, error) {
	contract, err := bindIAsync(address, nil, nil, filterer)
	if err != nil {
		return nil, err
	}
	return &IAsyncFilterer{contract: contract}, nil
}

// bindIAsync binds a generic wrapper to an already deployed contract.
func bindIAsync(address common.Address, caller bind.ContractCaller, transactor bind.ContractTransactor, filterer bind.ContractFilterer) (*bind.BoundContract, error) {
	parsed, err := IAsyncMetaData.GetAbi()
	if err != nil {
		return nil, err
	}
	return bind.NewBoundContract(address, *parsed, caller, transactor, filterer), nil
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_IAsync *IAsyncRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _IAsync.Contract.IAsyncCaller.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_IAsync *IAsyncRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _IAsync.Contract.IAsyncTransactor.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_IAsync *IAsyncRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _IAsync.Contract.IAsyncTransactor.contract.Transact(opts, method, params...)
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_IAsync *IAsyncCallerRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _IAsync.Contract.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_IAsync *IAsyncTransactorRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _IAsync.Contract.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_IAsync *IAsyncTransactorRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _IAsync.Contract.contract.Transact(opts, method, params...)
}

// PendingTasks is a free data retrieval call binding the contract method 0x589ad877.
//
// Solidity: function pendingTasks((bytes,uint64,uint64,bool,bool) pagination) view returns(((bytes,uint64),(uint64,address,string,bytes,((string,uint256)[],(string,uint256)[]))[]) response)
func (_IAsync *IAsyncCaller) PendingTasks(opts *bind.CallOpts, pagination TypesPageRequest) (PendingTasksResponse, error) {
	var out []interface{}
	err := _IAsync.contract.Call(opts, &out, "pendingTasks", pagination)

	if err != nil {
		return *new(PendingTasksResponse), err
	}

	out0 := *abi.ConvertType(out[0], new(PendingTasksResponse)).(*PendingTasksResponse)

	return out0, err

}

// PendingTasks is a free data retrieval call binding the contract method 0x589ad877.
//
// Solidity: function pendingTasks((bytes,uint64,uint64,bool,bool) pagination) view returns(((bytes,uint64),(uint64,address,string,bytes,((string,uint256)[],(string,uint256)[]))[]) response)
func (_IAsync *IAsyncSession) PendingTasks(pagination TypesPageRequest) (PendingTasksResponse, error) {
	return _IAsync.Contract.PendingTasks(&_IAsync.CallOpts, pagination)
}

// PendingTasks is a free data retrieval call binding the contract method 0x589ad877.
//
// Solidity: function pendingTasks((bytes,uint64,uint64,bool,bool) pagination) view returns(((bytes,uint64),(uint64,address,string,bytes,((string,uint256)[],(string,uint256)[]))[]) response)
func (_IAsync *IAsyncCallerSession) PendingTasks(pagination TypesPageRequest) (PendingTasksResponse, error) {
	return _IAsync.Contract.PendingTasks(&_IAsync.CallOpts, pagination)
}

// Plugins is a free data retrieval call binding the contract method 0x9fada3df.
//
// Solidity: function plugins((bytes,uint64,uint64,bool,bool) pagination) view returns(((bytes,uint64),(string,address,string,((string,uint256)[]))[]) response)
func (_IAsync *IAsyncCaller) Plugins(opts *bind.CallOpts, pagination TypesPageRequest) (PluginsResponse, error) {
	var out []interface{}
	err := _IAsync.contract.Call(opts, &out, "plugins", pagination)

	if err != nil {
		return *new(PluginsResponse), err
	}

	out0 := *abi.ConvertType(out[0], new(PluginsResponse)).(*PluginsResponse)

	return out0, err

}

// Plugins is a free data retrieval call binding the contract method 0x9fada3df.
//
// Solidity: function plugins((bytes,uint64,uint64,bool,bool) pagination) view returns(((bytes,uint64),(string,address,string,((string,uint256)[]))[]) response)
func (_IAsync *IAsyncSession) Plugins(pagination TypesPageRequest) (PluginsResponse, error) {
	return _IAsync.Contract.Plugins(&_IAsync.CallOpts, pagination)
}

// Plugins is a free data retrieval call binding the contract method 0x9fada3df.
//
// Solidity: function plugins((bytes,uint64,uint64,bool,bool) pagination) view returns(((bytes,uint64),(string,address,string,((string,uint256)[]))[]) response)
func (_IAsync *IAsyncCallerSession) Plugins(pagination TypesPageRequest) (PluginsResponse, error) {
	return _IAsync.Contract.Plugins(&_IAsync.CallOpts, pagination)
}

// TaskById is a free data retrieval call binding the contract method 0xc7be4a58.
//
// Solidity: function taskById(uint64 taskId) view returns((((uint64,address,string,bytes,((string,uint256)[],(string,uint256)[])),(uint64,bytes,uint8)[],(uint64,bytes,bytes))) response)
func (_IAsync *IAsyncCaller) TaskById(opts *bind.CallOpts, taskId uint64) (TaskByIdResponse, error) {
	var out []interface{}
	err := _IAsync.contract.Call(opts, &out, "taskById", taskId)

	if err != nil {
		return *new(TaskByIdResponse), err
	}

	out0 := *abi.ConvertType(out[0], new(TaskByIdResponse)).(*TaskByIdResponse)

	return out0, err

}

// TaskById is a free data retrieval call binding the contract method 0xc7be4a58.
//
// Solidity: function taskById(uint64 taskId) view returns((((uint64,address,string,bytes,((string,uint256)[],(string,uint256)[])),(uint64,bytes,uint8)[],(uint64,bytes,bytes))) response)
func (_IAsync *IAsyncSession) TaskById(taskId uint64) (TaskByIdResponse, error) {
	return _IAsync.Contract.TaskById(&_IAsync.CallOpts, taskId)
}

// TaskById is a free data retrieval call binding the contract method 0xc7be4a58.
//
// Solidity: function taskById(uint64 taskId) view returns((((uint64,address,string,bytes,((string,uint256)[],(string,uint256)[])),(uint64,bytes,uint8)[],(uint64,bytes,bytes))) response)
func (_IAsync *IAsyncCallerSession) TaskById(taskId uint64) (TaskByIdResponse, error) {
	return _IAsync.Contract.TaskById(&_IAsync.CallOpts, taskId)
}

// Tasks is a free data retrieval call binding the contract method 0x7c55c233.
//
// Solidity: function tasks((bytes,uint64,uint64,bool,bool) pagination, address creator) view returns(((bytes,uint64),((uint64,address,string,bytes,((string,uint256)[],(string,uint256)[])),(uint64,bytes,uint8)[],(uint64,bytes,bytes))[]) response)
func (_IAsync *IAsyncCaller) Tasks(opts *bind.CallOpts, pagination TypesPageRequest, creator common.Address) (TasksResponse, error) {
	var out []interface{}
	err := _IAsync.contract.Call(opts, &out, "tasks", pagination, creator)

	if err != nil {
		return *new(TasksResponse), err
	}

	out0 := *abi.ConvertType(out[0], new(TasksResponse)).(*TasksResponse)

	return out0, err

}

// Tasks is a free data retrieval call binding the contract method 0x7c55c233.
//
// Solidity: function tasks((bytes,uint64,uint64,bool,bool) pagination, address creator) view returns(((bytes,uint64),((uint64,address,string,bytes,((string,uint256)[],(string,uint256)[])),(uint64,bytes,uint8)[],(uint64,bytes,bytes))[]) response)
func (_IAsync *IAsyncSession) Tasks(pagination TypesPageRequest, creator common.Address) (TasksResponse, error) {
	return _IAsync.Contract.Tasks(&_IAsync.CallOpts, pagination, creator)
}

// Tasks is a free data retrieval call binding the contract method 0x7c55c233.
//
// Solidity: function tasks((bytes,uint64,uint64,bool,bool) pagination, address creator) view returns(((bytes,uint64),((uint64,address,string,bytes,((string,uint256)[],(string,uint256)[])),(uint64,bytes,uint8)[],(uint64,bytes,bytes))[]) response)
func (_IAsync *IAsyncCallerSession) Tasks(pagination TypesPageRequest, creator common.Address) (TasksResponse, error) {
	return _IAsync.Contract.Tasks(&_IAsync.CallOpts, pagination, creator)
}

// AddTask is a paid mutator transaction binding the contract method 0x71a562f4.
//
// Solidity: function addTask(string plugin, bytes input, (string,uint256)[] maxFee, (address,uint64) callbackParams) returns(uint64 taskId)
func (_IAsync *IAsyncTransactor) AddTask(opts *bind.TransactOpts, plugin string, input []byte, maxFee []TypesCoin, callbackParams TypesCallbackParams) (*types.Transaction, error) {
	return _IAsync.contract.Transact(opts, "addTask", plugin, input, maxFee, callbackParams)
}

// AddTask is a paid mutator transaction binding the contract method 0x71a562f4.
//
// Solidity: function addTask(string plugin, bytes input, (string,uint256)[] maxFee, (address,uint64) callbackParams) returns(uint64 taskId)
func (_IAsync *IAsyncSession) AddTask(plugin string, input []byte, maxFee []TypesCoin, callbackParams TypesCallbackParams) (*types.Transaction, error) {
	return _IAsync.Contract.AddTask(&_IAsync.TransactOpts, plugin, input, maxFee, callbackParams)
}

// AddTask is a paid mutator transaction binding the contract method 0x71a562f4.
//
// Solidity: function addTask(string plugin, bytes input, (string,uint256)[] maxFee, (address,uint64) callbackParams) returns(uint64 taskId)
func (_IAsync *IAsyncTransactorSession) AddTask(plugin string, input []byte, maxFee []TypesCoin, callbackParams TypesCallbackParams) (*types.Transaction, error) {
	return _IAsync.Contract.AddTask(&_IAsync.TransactOpts, plugin, input, maxFee, callbackParams)
}

// IAsyncCreateTaskIterator is returned from FilterCreateTask and is used to iterate over the raw logs and unpacked data for CreateTask events raised by the IAsync contract.
type IAsyncCreateTaskIterator struct {
	Event *IAsyncCreateTask // Event containing the contract specifics and raw log

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
func (it *IAsyncCreateTaskIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(IAsyncCreateTask)
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
		it.Event = new(IAsyncCreateTask)
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
func (it *IAsyncCreateTaskIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *IAsyncCreateTaskIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// IAsyncCreateTask represents a CreateTask event raised by the IAsync contract.
type IAsyncCreateTask struct {
	TaskId     uint64
	Creator    common.Address
	Plugin     string
	CallbackId uint64
	Raw        types.Log // Blockchain specific contextual infos
}

// FilterCreateTask is a free log retrieval operation binding the contract event 0x44ece3c06003e6bf16f04e4c130ac1d044c320bd0bdfccf2d1cec873ba002a2d.
//
// Solidity: event CreateTask(uint64 indexed taskId, address indexed creator, string plugin, uint64 callbackId)
func (_IAsync *IAsyncFilterer) FilterCreateTask(opts *bind.FilterOpts, taskId []uint64, creator []common.Address) (*IAsyncCreateTaskIterator, error) {

	var taskIdRule []interface{}
	for _, taskIdItem := range taskId {
		taskIdRule = append(taskIdRule, taskIdItem)
	}
	var creatorRule []interface{}
	for _, creatorItem := range creator {
		creatorRule = append(creatorRule, creatorItem)
	}

	logs, sub, err := _IAsync.contract.FilterLogs(opts, "CreateTask", taskIdRule, creatorRule)
	if err != nil {
		return nil, err
	}
	return &IAsyncCreateTaskIterator{contract: _IAsync.contract, event: "CreateTask", logs: logs, sub: sub}, nil
}

// WatchCreateTask is a free log subscription operation binding the contract event 0x44ece3c06003e6bf16f04e4c130ac1d044c320bd0bdfccf2d1cec873ba002a2d.
//
// Solidity: event CreateTask(uint64 indexed taskId, address indexed creator, string plugin, uint64 callbackId)
func (_IAsync *IAsyncFilterer) WatchCreateTask(opts *bind.WatchOpts, sink chan<- *IAsyncCreateTask, taskId []uint64, creator []common.Address) (event.Subscription, error) {

	var taskIdRule []interface{}
	for _, taskIdItem := range taskId {
		taskIdRule = append(taskIdRule, taskIdItem)
	}
	var creatorRule []interface{}
	for _, creatorItem := range creator {
		creatorRule = append(creatorRule, creatorItem)
	}

	logs, sub, err := _IAsync.contract.WatchLogs(opts, "CreateTask", taskIdRule, creatorRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(IAsyncCreateTask)
				if err := _IAsync.contract.UnpackLog(event, "CreateTask", log); err != nil {
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

// ParseCreateTask is a log parse operation binding the contract event 0x44ece3c06003e6bf16f04e4c130ac1d044c320bd0bdfccf2d1cec873ba002a2d.
//
// Solidity: event CreateTask(uint64 indexed taskId, address indexed creator, string plugin, uint64 callbackId)
func (_IAsync *IAsyncFilterer) ParseCreateTask(log types.Log) (*IAsyncCreateTask, error) {
	event := new(IAsyncCreateTask)
	if err := _IAsync.contract.UnpackLog(event, "CreateTask", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}
