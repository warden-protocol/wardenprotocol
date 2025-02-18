// Code generated - DO NOT EDIT.
// This file is a generated binding and any manual changes will be lost.

package act

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

// Action is an auto generated low-level Go binding around an user-defined struct.
type Action struct {
	Id                uint64
	Status            uint8
	Msg               TypesAnyType
	Result            TypesAnyType
	Creator           common.Address
	TimeoutHeight     uint64
	CreatedAt         TypesTimestamp
	UpdatedAt         TypesTimestamp
	ApproveExpression string
	RejectExpression  string
	Mentions          []common.Address
	Votes             []ActionVote
}

// ActionByIdResponse is an auto generated low-level Go binding around an user-defined struct.
type ActionByIdResponse struct {
	Action Action
}

// ActionVote is an auto generated low-level Go binding around an user-defined struct.
type ActionVote struct {
	Participant common.Address
	VotedAt     TypesTimestamp
	VoteType    uint8
}

// ActionsByAddressResponse is an auto generated low-level Go binding around an user-defined struct.
type ActionsByAddressResponse struct {
	Pagination TypesPageResponse
	Actions    []Action
}

// ActionsResponse is an auto generated low-level Go binding around an user-defined struct.
type ActionsResponse struct {
	Pagination TypesPageResponse
	Actions    []Action
}

// Template is an auto generated low-level Go binding around an user-defined struct.
type Template struct {
	Id         uint64
	Creator    common.Address
	Name       string
	Expression string
}

// TemplateByIdResponse is an auto generated low-level Go binding around an user-defined struct.
type TemplateByIdResponse struct {
	Template Template
}

// TemplatesResponse is an auto generated low-level Go binding around an user-defined struct.
type TemplatesResponse struct {
	Pagination TypesPageResponse
	Templates  []Template
}

// TypesAnyType is an auto generated low-level Go binding around an user-defined struct.
type TypesAnyType struct {
	TypeUrl string
	Value   []byte
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

// TypesTimestamp is an auto generated low-level Go binding around an user-defined struct.
type TypesTimestamp struct {
	Secs  uint64
	Nanos uint64
}

// IActMetaData contains all meta data concerning the IAct contract.
var IActMetaData = &bind.MetaData{
	ABI: "[{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"author\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint64\",\"name\":\"actionId\",\"type\":\"uint64\"},{\"indexed\":false,\"internalType\":\"enumActionStatus\",\"name\":\"previousStatus\",\"type\":\"uint8\"},{\"indexed\":false,\"internalType\":\"enumActionStatus\",\"name\":\"newStatus\",\"type\":\"uint8\"}],\"name\":\"ActionStateChange\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"participant\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint64\",\"name\":\"actionId\",\"type\":\"uint64\"},{\"indexed\":false,\"internalType\":\"enumVoteType\",\"name\":\"voteType\",\"type\":\"uint8\"}],\"name\":\"ActionVoted\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"creator\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint64\",\"name\":\"actionId\",\"type\":\"uint64\"}],\"name\":\"CreateAction\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"creator\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint64\",\"name\":\"templateId\",\"type\":\"uint64\"}],\"name\":\"CreateTemplate\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"author\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint64\",\"name\":\"templateId\",\"type\":\"uint64\"}],\"name\":\"UpdateTemplate\",\"type\":\"event\"},{\"inputs\":[{\"internalType\":\"uint64\",\"name\":\"actionId\",\"type\":\"uint64\"}],\"name\":\"actionById\",\"outputs\":[{\"components\":[{\"components\":[{\"internalType\":\"uint64\",\"name\":\"id\",\"type\":\"uint64\"},{\"internalType\":\"enumActionStatus\",\"name\":\"status\",\"type\":\"uint8\"},{\"components\":[{\"internalType\":\"string\",\"name\":\"typeUrl\",\"type\":\"string\"},{\"internalType\":\"bytes\",\"name\":\"value\",\"type\":\"bytes\"}],\"internalType\":\"structTypes.AnyType\",\"name\":\"msg\",\"type\":\"tuple\"},{\"components\":[{\"internalType\":\"string\",\"name\":\"typeUrl\",\"type\":\"string\"},{\"internalType\":\"bytes\",\"name\":\"value\",\"type\":\"bytes\"}],\"internalType\":\"structTypes.AnyType\",\"name\":\"result\",\"type\":\"tuple\"},{\"internalType\":\"address\",\"name\":\"creator\",\"type\":\"address\"},{\"internalType\":\"uint64\",\"name\":\"timeoutHeight\",\"type\":\"uint64\"},{\"components\":[{\"internalType\":\"uint64\",\"name\":\"secs\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"nanos\",\"type\":\"uint64\"}],\"internalType\":\"structTypes.Timestamp\",\"name\":\"createdAt\",\"type\":\"tuple\"},{\"components\":[{\"internalType\":\"uint64\",\"name\":\"secs\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"nanos\",\"type\":\"uint64\"}],\"internalType\":\"structTypes.Timestamp\",\"name\":\"updatedAt\",\"type\":\"tuple\"},{\"internalType\":\"string\",\"name\":\"approveExpression\",\"type\":\"string\"},{\"internalType\":\"string\",\"name\":\"rejectExpression\",\"type\":\"string\"},{\"internalType\":\"address[]\",\"name\":\"mentions\",\"type\":\"address[]\"},{\"components\":[{\"internalType\":\"address\",\"name\":\"participant\",\"type\":\"address\"},{\"components\":[{\"internalType\":\"uint64\",\"name\":\"secs\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"nanos\",\"type\":\"uint64\"}],\"internalType\":\"structTypes.Timestamp\",\"name\":\"votedAt\",\"type\":\"tuple\"},{\"internalType\":\"enumVoteType\",\"name\":\"voteType\",\"type\":\"uint8\"}],\"internalType\":\"structActionVote[]\",\"name\":\"votes\",\"type\":\"tuple[]\"}],\"internalType\":\"structAction\",\"name\":\"action\",\"type\":\"tuple\"}],\"internalType\":\"structActionByIdResponse\",\"name\":\"response\",\"type\":\"tuple\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes\",\"name\":\"key\",\"type\":\"bytes\"},{\"internalType\":\"uint64\",\"name\":\"offset\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"limit\",\"type\":\"uint64\"},{\"internalType\":\"bool\",\"name\":\"countTotal\",\"type\":\"bool\"},{\"internalType\":\"bool\",\"name\":\"reverse\",\"type\":\"bool\"}],\"internalType\":\"structTypes.PageRequest\",\"name\":\"pagination\",\"type\":\"tuple\"}],\"name\":\"actions\",\"outputs\":[{\"components\":[{\"components\":[{\"internalType\":\"bytes\",\"name\":\"nextKey\",\"type\":\"bytes\"},{\"internalType\":\"uint64\",\"name\":\"total\",\"type\":\"uint64\"}],\"internalType\":\"structTypes.PageResponse\",\"name\":\"pagination\",\"type\":\"tuple\"},{\"components\":[{\"internalType\":\"uint64\",\"name\":\"id\",\"type\":\"uint64\"},{\"internalType\":\"enumActionStatus\",\"name\":\"status\",\"type\":\"uint8\"},{\"components\":[{\"internalType\":\"string\",\"name\":\"typeUrl\",\"type\":\"string\"},{\"internalType\":\"bytes\",\"name\":\"value\",\"type\":\"bytes\"}],\"internalType\":\"structTypes.AnyType\",\"name\":\"msg\",\"type\":\"tuple\"},{\"components\":[{\"internalType\":\"string\",\"name\":\"typeUrl\",\"type\":\"string\"},{\"internalType\":\"bytes\",\"name\":\"value\",\"type\":\"bytes\"}],\"internalType\":\"structTypes.AnyType\",\"name\":\"result\",\"type\":\"tuple\"},{\"internalType\":\"address\",\"name\":\"creator\",\"type\":\"address\"},{\"internalType\":\"uint64\",\"name\":\"timeoutHeight\",\"type\":\"uint64\"},{\"components\":[{\"internalType\":\"uint64\",\"name\":\"secs\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"nanos\",\"type\":\"uint64\"}],\"internalType\":\"structTypes.Timestamp\",\"name\":\"createdAt\",\"type\":\"tuple\"},{\"components\":[{\"internalType\":\"uint64\",\"name\":\"secs\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"nanos\",\"type\":\"uint64\"}],\"internalType\":\"structTypes.Timestamp\",\"name\":\"updatedAt\",\"type\":\"tuple\"},{\"internalType\":\"string\",\"name\":\"approveExpression\",\"type\":\"string\"},{\"internalType\":\"string\",\"name\":\"rejectExpression\",\"type\":\"string\"},{\"internalType\":\"address[]\",\"name\":\"mentions\",\"type\":\"address[]\"},{\"components\":[{\"internalType\":\"address\",\"name\":\"participant\",\"type\":\"address\"},{\"components\":[{\"internalType\":\"uint64\",\"name\":\"secs\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"nanos\",\"type\":\"uint64\"}],\"internalType\":\"structTypes.Timestamp\",\"name\":\"votedAt\",\"type\":\"tuple\"},{\"internalType\":\"enumVoteType\",\"name\":\"voteType\",\"type\":\"uint8\"}],\"internalType\":\"structActionVote[]\",\"name\":\"votes\",\"type\":\"tuple[]\"}],\"internalType\":\"structAction[]\",\"name\":\"actions\",\"type\":\"tuple[]\"}],\"internalType\":\"structActionsResponse\",\"name\":\"response\",\"type\":\"tuple\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes\",\"name\":\"key\",\"type\":\"bytes\"},{\"internalType\":\"uint64\",\"name\":\"offset\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"limit\",\"type\":\"uint64\"},{\"internalType\":\"bool\",\"name\":\"countTotal\",\"type\":\"bool\"},{\"internalType\":\"bool\",\"name\":\"reverse\",\"type\":\"bool\"}],\"internalType\":\"structTypes.PageRequest\",\"name\":\"pagination\",\"type\":\"tuple\"},{\"internalType\":\"address\",\"name\":\"addr\",\"type\":\"address\"},{\"internalType\":\"enumActionStatus\",\"name\":\"status\",\"type\":\"uint8\"}],\"name\":\"actionsByAddress\",\"outputs\":[{\"components\":[{\"components\":[{\"internalType\":\"bytes\",\"name\":\"nextKey\",\"type\":\"bytes\"},{\"internalType\":\"uint64\",\"name\":\"total\",\"type\":\"uint64\"}],\"internalType\":\"structTypes.PageResponse\",\"name\":\"pagination\",\"type\":\"tuple\"},{\"components\":[{\"internalType\":\"uint64\",\"name\":\"id\",\"type\":\"uint64\"},{\"internalType\":\"enumActionStatus\",\"name\":\"status\",\"type\":\"uint8\"},{\"components\":[{\"internalType\":\"string\",\"name\":\"typeUrl\",\"type\":\"string\"},{\"internalType\":\"bytes\",\"name\":\"value\",\"type\":\"bytes\"}],\"internalType\":\"structTypes.AnyType\",\"name\":\"msg\",\"type\":\"tuple\"},{\"components\":[{\"internalType\":\"string\",\"name\":\"typeUrl\",\"type\":\"string\"},{\"internalType\":\"bytes\",\"name\":\"value\",\"type\":\"bytes\"}],\"internalType\":\"structTypes.AnyType\",\"name\":\"result\",\"type\":\"tuple\"},{\"internalType\":\"address\",\"name\":\"creator\",\"type\":\"address\"},{\"internalType\":\"uint64\",\"name\":\"timeoutHeight\",\"type\":\"uint64\"},{\"components\":[{\"internalType\":\"uint64\",\"name\":\"secs\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"nanos\",\"type\":\"uint64\"}],\"internalType\":\"structTypes.Timestamp\",\"name\":\"createdAt\",\"type\":\"tuple\"},{\"components\":[{\"internalType\":\"uint64\",\"name\":\"secs\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"nanos\",\"type\":\"uint64\"}],\"internalType\":\"structTypes.Timestamp\",\"name\":\"updatedAt\",\"type\":\"tuple\"},{\"internalType\":\"string\",\"name\":\"approveExpression\",\"type\":\"string\"},{\"internalType\":\"string\",\"name\":\"rejectExpression\",\"type\":\"string\"},{\"internalType\":\"address[]\",\"name\":\"mentions\",\"type\":\"address[]\"},{\"components\":[{\"internalType\":\"address\",\"name\":\"participant\",\"type\":\"address\"},{\"components\":[{\"internalType\":\"uint64\",\"name\":\"secs\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"nanos\",\"type\":\"uint64\"}],\"internalType\":\"structTypes.Timestamp\",\"name\":\"votedAt\",\"type\":\"tuple\"},{\"internalType\":\"enumVoteType\",\"name\":\"voteType\",\"type\":\"uint8\"}],\"internalType\":\"structActionVote[]\",\"name\":\"votes\",\"type\":\"tuple[]\"}],\"internalType\":\"structAction[]\",\"name\":\"actions\",\"type\":\"tuple[]\"}],\"internalType\":\"structActionsByAddressResponse\",\"name\":\"response\",\"type\":\"tuple\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint64\",\"name\":\"actionId\",\"type\":\"uint64\"}],\"name\":\"checkAction\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"string\",\"name\":\"name\",\"type\":\"string\"},{\"internalType\":\"string\",\"name\":\"definition\",\"type\":\"string\"}],\"name\":\"newTemplate\",\"outputs\":[{\"internalType\":\"uint64\",\"name\":\"\",\"type\":\"uint64\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint64\",\"name\":\"actionId\",\"type\":\"uint64\"}],\"name\":\"revokeAction\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint64\",\"name\":\"templateId\",\"type\":\"uint64\"}],\"name\":\"templateById\",\"outputs\":[{\"components\":[{\"components\":[{\"internalType\":\"uint64\",\"name\":\"id\",\"type\":\"uint64\"},{\"internalType\":\"address\",\"name\":\"creator\",\"type\":\"address\"},{\"internalType\":\"string\",\"name\":\"name\",\"type\":\"string\"},{\"internalType\":\"string\",\"name\":\"expression\",\"type\":\"string\"}],\"internalType\":\"structTemplate\",\"name\":\"template\",\"type\":\"tuple\"}],\"internalType\":\"structTemplateByIdResponse\",\"name\":\"response\",\"type\":\"tuple\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes\",\"name\":\"key\",\"type\":\"bytes\"},{\"internalType\":\"uint64\",\"name\":\"offset\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"limit\",\"type\":\"uint64\"},{\"internalType\":\"bool\",\"name\":\"countTotal\",\"type\":\"bool\"},{\"internalType\":\"bool\",\"name\":\"reverse\",\"type\":\"bool\"}],\"internalType\":\"structTypes.PageRequest\",\"name\":\"pagination\",\"type\":\"tuple\"},{\"internalType\":\"address\",\"name\":\"creator\",\"type\":\"address\"}],\"name\":\"templates\",\"outputs\":[{\"components\":[{\"components\":[{\"internalType\":\"bytes\",\"name\":\"nextKey\",\"type\":\"bytes\"},{\"internalType\":\"uint64\",\"name\":\"total\",\"type\":\"uint64\"}],\"internalType\":\"structTypes.PageResponse\",\"name\":\"pagination\",\"type\":\"tuple\"},{\"components\":[{\"internalType\":\"uint64\",\"name\":\"id\",\"type\":\"uint64\"},{\"internalType\":\"address\",\"name\":\"creator\",\"type\":\"address\"},{\"internalType\":\"string\",\"name\":\"name\",\"type\":\"string\"},{\"internalType\":\"string\",\"name\":\"expression\",\"type\":\"string\"}],\"internalType\":\"structTemplate[]\",\"name\":\"templates\",\"type\":\"tuple[]\"}],\"internalType\":\"structTemplatesResponse\",\"name\":\"response\",\"type\":\"tuple\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint64\",\"name\":\"templateId\",\"type\":\"uint64\"},{\"internalType\":\"string\",\"name\":\"name\",\"type\":\"string\"},{\"internalType\":\"string\",\"name\":\"definition\",\"type\":\"string\"}],\"name\":\"updateTemplate\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint64\",\"name\":\"actionId\",\"type\":\"uint64\"},{\"internalType\":\"enumVoteType\",\"name\":\"voteType\",\"type\":\"uint8\"}],\"name\":\"voteForAction\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"}]",
}

// IActABI is the input ABI used to generate the binding from.
// Deprecated: Use IActMetaData.ABI instead.
var IActABI = IActMetaData.ABI

// IAct is an auto generated Go binding around an Ethereum contract.
type IAct struct {
	IActCaller     // Read-only binding to the contract
	IActTransactor // Write-only binding to the contract
	IActFilterer   // Log filterer for contract events
}

// IActCaller is an auto generated read-only Go binding around an Ethereum contract.
type IActCaller struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// IActTransactor is an auto generated write-only Go binding around an Ethereum contract.
type IActTransactor struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// IActFilterer is an auto generated log filtering Go binding around an Ethereum contract events.
type IActFilterer struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// IActSession is an auto generated Go binding around an Ethereum contract,
// with pre-set call and transact options.
type IActSession struct {
	Contract     *IAct             // Generic contract binding to set the session for
	CallOpts     bind.CallOpts     // Call options to use throughout this session
	TransactOpts bind.TransactOpts // Transaction auth options to use throughout this session
}

// IActCallerSession is an auto generated read-only Go binding around an Ethereum contract,
// with pre-set call options.
type IActCallerSession struct {
	Contract *IActCaller   // Generic contract caller binding to set the session for
	CallOpts bind.CallOpts // Call options to use throughout this session
}

// IActTransactorSession is an auto generated write-only Go binding around an Ethereum contract,
// with pre-set transact options.
type IActTransactorSession struct {
	Contract     *IActTransactor   // Generic contract transactor binding to set the session for
	TransactOpts bind.TransactOpts // Transaction auth options to use throughout this session
}

// IActRaw is an auto generated low-level Go binding around an Ethereum contract.
type IActRaw struct {
	Contract *IAct // Generic contract binding to access the raw methods on
}

// IActCallerRaw is an auto generated low-level read-only Go binding around an Ethereum contract.
type IActCallerRaw struct {
	Contract *IActCaller // Generic read-only contract binding to access the raw methods on
}

// IActTransactorRaw is an auto generated low-level write-only Go binding around an Ethereum contract.
type IActTransactorRaw struct {
	Contract *IActTransactor // Generic write-only contract binding to access the raw methods on
}

// NewIAct creates a new instance of IAct, bound to a specific deployed contract.
func NewIAct(address common.Address, backend bind.ContractBackend) (*IAct, error) {
	contract, err := bindIAct(address, backend, backend, backend)
	if err != nil {
		return nil, err
	}
	return &IAct{IActCaller: IActCaller{contract: contract}, IActTransactor: IActTransactor{contract: contract}, IActFilterer: IActFilterer{contract: contract}}, nil
}

// NewIActCaller creates a new read-only instance of IAct, bound to a specific deployed contract.
func NewIActCaller(address common.Address, caller bind.ContractCaller) (*IActCaller, error) {
	contract, err := bindIAct(address, caller, nil, nil)
	if err != nil {
		return nil, err
	}
	return &IActCaller{contract: contract}, nil
}

// NewIActTransactor creates a new write-only instance of IAct, bound to a specific deployed contract.
func NewIActTransactor(address common.Address, transactor bind.ContractTransactor) (*IActTransactor, error) {
	contract, err := bindIAct(address, nil, transactor, nil)
	if err != nil {
		return nil, err
	}
	return &IActTransactor{contract: contract}, nil
}

// NewIActFilterer creates a new log filterer instance of IAct, bound to a specific deployed contract.
func NewIActFilterer(address common.Address, filterer bind.ContractFilterer) (*IActFilterer, error) {
	contract, err := bindIAct(address, nil, nil, filterer)
	if err != nil {
		return nil, err
	}
	return &IActFilterer{contract: contract}, nil
}

// bindIAct binds a generic wrapper to an already deployed contract.
func bindIAct(address common.Address, caller bind.ContractCaller, transactor bind.ContractTransactor, filterer bind.ContractFilterer) (*bind.BoundContract, error) {
	parsed, err := IActMetaData.GetAbi()
	if err != nil {
		return nil, err
	}
	return bind.NewBoundContract(address, *parsed, caller, transactor, filterer), nil
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_IAct *IActRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _IAct.Contract.IActCaller.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_IAct *IActRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _IAct.Contract.IActTransactor.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_IAct *IActRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _IAct.Contract.IActTransactor.contract.Transact(opts, method, params...)
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_IAct *IActCallerRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _IAct.Contract.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_IAct *IActTransactorRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _IAct.Contract.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_IAct *IActTransactorRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _IAct.Contract.contract.Transact(opts, method, params...)
}

// ActionById is a free data retrieval call binding the contract method 0x51619ef0.
//
// Solidity: function actionById(uint64 actionId) view returns(((uint64,uint8,(string,bytes),(string,bytes),address,uint64,(uint64,uint64),(uint64,uint64),string,string,address[],(address,(uint64,uint64),uint8)[])) response)
func (_IAct *IActCaller) ActionById(opts *bind.CallOpts, actionId uint64) (ActionByIdResponse, error) {
	var out []interface{}
	err := _IAct.contract.Call(opts, &out, "actionById", actionId)

	if err != nil {
		return *new(ActionByIdResponse), err
	}

	out0 := *abi.ConvertType(out[0], new(ActionByIdResponse)).(*ActionByIdResponse)

	return out0, err

}

// ActionById is a free data retrieval call binding the contract method 0x51619ef0.
//
// Solidity: function actionById(uint64 actionId) view returns(((uint64,uint8,(string,bytes),(string,bytes),address,uint64,(uint64,uint64),(uint64,uint64),string,string,address[],(address,(uint64,uint64),uint8)[])) response)
func (_IAct *IActSession) ActionById(actionId uint64) (ActionByIdResponse, error) {
	return _IAct.Contract.ActionById(&_IAct.CallOpts, actionId)
}

// ActionById is a free data retrieval call binding the contract method 0x51619ef0.
//
// Solidity: function actionById(uint64 actionId) view returns(((uint64,uint8,(string,bytes),(string,bytes),address,uint64,(uint64,uint64),(uint64,uint64),string,string,address[],(address,(uint64,uint64),uint8)[])) response)
func (_IAct *IActCallerSession) ActionById(actionId uint64) (ActionByIdResponse, error) {
	return _IAct.Contract.ActionById(&_IAct.CallOpts, actionId)
}

// Actions is a free data retrieval call binding the contract method 0x9e9d1e27.
//
// Solidity: function actions((bytes,uint64,uint64,bool,bool) pagination) view returns(((bytes,uint64),(uint64,uint8,(string,bytes),(string,bytes),address,uint64,(uint64,uint64),(uint64,uint64),string,string,address[],(address,(uint64,uint64),uint8)[])[]) response)
func (_IAct *IActCaller) Actions(opts *bind.CallOpts, pagination TypesPageRequest) (ActionsResponse, error) {
	var out []interface{}
	err := _IAct.contract.Call(opts, &out, "actions", pagination)

	if err != nil {
		return *new(ActionsResponse), err
	}

	out0 := *abi.ConvertType(out[0], new(ActionsResponse)).(*ActionsResponse)

	return out0, err

}

// Actions is a free data retrieval call binding the contract method 0x9e9d1e27.
//
// Solidity: function actions((bytes,uint64,uint64,bool,bool) pagination) view returns(((bytes,uint64),(uint64,uint8,(string,bytes),(string,bytes),address,uint64,(uint64,uint64),(uint64,uint64),string,string,address[],(address,(uint64,uint64),uint8)[])[]) response)
func (_IAct *IActSession) Actions(pagination TypesPageRequest) (ActionsResponse, error) {
	return _IAct.Contract.Actions(&_IAct.CallOpts, pagination)
}

// Actions is a free data retrieval call binding the contract method 0x9e9d1e27.
//
// Solidity: function actions((bytes,uint64,uint64,bool,bool) pagination) view returns(((bytes,uint64),(uint64,uint8,(string,bytes),(string,bytes),address,uint64,(uint64,uint64),(uint64,uint64),string,string,address[],(address,(uint64,uint64),uint8)[])[]) response)
func (_IAct *IActCallerSession) Actions(pagination TypesPageRequest) (ActionsResponse, error) {
	return _IAct.Contract.Actions(&_IAct.CallOpts, pagination)
}

// ActionsByAddress is a free data retrieval call binding the contract method 0x589d42b6.
//
// Solidity: function actionsByAddress((bytes,uint64,uint64,bool,bool) pagination, address addr, uint8 status) view returns(((bytes,uint64),(uint64,uint8,(string,bytes),(string,bytes),address,uint64,(uint64,uint64),(uint64,uint64),string,string,address[],(address,(uint64,uint64),uint8)[])[]) response)
func (_IAct *IActCaller) ActionsByAddress(opts *bind.CallOpts, pagination TypesPageRequest, addr common.Address, status uint8) (ActionsByAddressResponse, error) {
	var out []interface{}
	err := _IAct.contract.Call(opts, &out, "actionsByAddress", pagination, addr, status)

	if err != nil {
		return *new(ActionsByAddressResponse), err
	}

	out0 := *abi.ConvertType(out[0], new(ActionsByAddressResponse)).(*ActionsByAddressResponse)

	return out0, err

}

// ActionsByAddress is a free data retrieval call binding the contract method 0x589d42b6.
//
// Solidity: function actionsByAddress((bytes,uint64,uint64,bool,bool) pagination, address addr, uint8 status) view returns(((bytes,uint64),(uint64,uint8,(string,bytes),(string,bytes),address,uint64,(uint64,uint64),(uint64,uint64),string,string,address[],(address,(uint64,uint64),uint8)[])[]) response)
func (_IAct *IActSession) ActionsByAddress(pagination TypesPageRequest, addr common.Address, status uint8) (ActionsByAddressResponse, error) {
	return _IAct.Contract.ActionsByAddress(&_IAct.CallOpts, pagination, addr, status)
}

// ActionsByAddress is a free data retrieval call binding the contract method 0x589d42b6.
//
// Solidity: function actionsByAddress((bytes,uint64,uint64,bool,bool) pagination, address addr, uint8 status) view returns(((bytes,uint64),(uint64,uint8,(string,bytes),(string,bytes),address,uint64,(uint64,uint64),(uint64,uint64),string,string,address[],(address,(uint64,uint64),uint8)[])[]) response)
func (_IAct *IActCallerSession) ActionsByAddress(pagination TypesPageRequest, addr common.Address, status uint8) (ActionsByAddressResponse, error) {
	return _IAct.Contract.ActionsByAddress(&_IAct.CallOpts, pagination, addr, status)
}

// TemplateById is a free data retrieval call binding the contract method 0x161f1e48.
//
// Solidity: function templateById(uint64 templateId) view returns(((uint64,address,string,string)) response)
func (_IAct *IActCaller) TemplateById(opts *bind.CallOpts, templateId uint64) (TemplateByIdResponse, error) {
	var out []interface{}
	err := _IAct.contract.Call(opts, &out, "templateById", templateId)

	if err != nil {
		return *new(TemplateByIdResponse), err
	}

	out0 := *abi.ConvertType(out[0], new(TemplateByIdResponse)).(*TemplateByIdResponse)

	return out0, err

}

// TemplateById is a free data retrieval call binding the contract method 0x161f1e48.
//
// Solidity: function templateById(uint64 templateId) view returns(((uint64,address,string,string)) response)
func (_IAct *IActSession) TemplateById(templateId uint64) (TemplateByIdResponse, error) {
	return _IAct.Contract.TemplateById(&_IAct.CallOpts, templateId)
}

// TemplateById is a free data retrieval call binding the contract method 0x161f1e48.
//
// Solidity: function templateById(uint64 templateId) view returns(((uint64,address,string,string)) response)
func (_IAct *IActCallerSession) TemplateById(templateId uint64) (TemplateByIdResponse, error) {
	return _IAct.Contract.TemplateById(&_IAct.CallOpts, templateId)
}

// Templates is a free data retrieval call binding the contract method 0x236d0b9f.
//
// Solidity: function templates((bytes,uint64,uint64,bool,bool) pagination, address creator) view returns(((bytes,uint64),(uint64,address,string,string)[]) response)
func (_IAct *IActCaller) Templates(opts *bind.CallOpts, pagination TypesPageRequest, creator common.Address) (TemplatesResponse, error) {
	var out []interface{}
	err := _IAct.contract.Call(opts, &out, "templates", pagination, creator)

	if err != nil {
		return *new(TemplatesResponse), err
	}

	out0 := *abi.ConvertType(out[0], new(TemplatesResponse)).(*TemplatesResponse)

	return out0, err

}

// Templates is a free data retrieval call binding the contract method 0x236d0b9f.
//
// Solidity: function templates((bytes,uint64,uint64,bool,bool) pagination, address creator) view returns(((bytes,uint64),(uint64,address,string,string)[]) response)
func (_IAct *IActSession) Templates(pagination TypesPageRequest, creator common.Address) (TemplatesResponse, error) {
	return _IAct.Contract.Templates(&_IAct.CallOpts, pagination, creator)
}

// Templates is a free data retrieval call binding the contract method 0x236d0b9f.
//
// Solidity: function templates((bytes,uint64,uint64,bool,bool) pagination, address creator) view returns(((bytes,uint64),(uint64,address,string,string)[]) response)
func (_IAct *IActCallerSession) Templates(pagination TypesPageRequest, creator common.Address) (TemplatesResponse, error) {
	return _IAct.Contract.Templates(&_IAct.CallOpts, pagination, creator)
}

// CheckAction is a paid mutator transaction binding the contract method 0x737c52b5.
//
// Solidity: function checkAction(uint64 actionId) returns(string)
func (_IAct *IActTransactor) CheckAction(opts *bind.TransactOpts, actionId uint64) (*types.Transaction, error) {
	return _IAct.contract.Transact(opts, "checkAction", actionId)
}

// CheckAction is a paid mutator transaction binding the contract method 0x737c52b5.
//
// Solidity: function checkAction(uint64 actionId) returns(string)
func (_IAct *IActSession) CheckAction(actionId uint64) (*types.Transaction, error) {
	return _IAct.Contract.CheckAction(&_IAct.TransactOpts, actionId)
}

// CheckAction is a paid mutator transaction binding the contract method 0x737c52b5.
//
// Solidity: function checkAction(uint64 actionId) returns(string)
func (_IAct *IActTransactorSession) CheckAction(actionId uint64) (*types.Transaction, error) {
	return _IAct.Contract.CheckAction(&_IAct.TransactOpts, actionId)
}

// NewTemplate is a paid mutator transaction binding the contract method 0x20748349.
//
// Solidity: function newTemplate(string name, string definition) returns(uint64)
func (_IAct *IActTransactor) NewTemplate(opts *bind.TransactOpts, name string, definition string) (*types.Transaction, error) {
	return _IAct.contract.Transact(opts, "newTemplate", name, definition)
}

// NewTemplate is a paid mutator transaction binding the contract method 0x20748349.
//
// Solidity: function newTemplate(string name, string definition) returns(uint64)
func (_IAct *IActSession) NewTemplate(name string, definition string) (*types.Transaction, error) {
	return _IAct.Contract.NewTemplate(&_IAct.TransactOpts, name, definition)
}

// NewTemplate is a paid mutator transaction binding the contract method 0x20748349.
//
// Solidity: function newTemplate(string name, string definition) returns(uint64)
func (_IAct *IActTransactorSession) NewTemplate(name string, definition string) (*types.Transaction, error) {
	return _IAct.Contract.NewTemplate(&_IAct.TransactOpts, name, definition)
}

// RevokeAction is a paid mutator transaction binding the contract method 0xb8fcbfef.
//
// Solidity: function revokeAction(uint64 actionId) returns(bool)
func (_IAct *IActTransactor) RevokeAction(opts *bind.TransactOpts, actionId uint64) (*types.Transaction, error) {
	return _IAct.contract.Transact(opts, "revokeAction", actionId)
}

// RevokeAction is a paid mutator transaction binding the contract method 0xb8fcbfef.
//
// Solidity: function revokeAction(uint64 actionId) returns(bool)
func (_IAct *IActSession) RevokeAction(actionId uint64) (*types.Transaction, error) {
	return _IAct.Contract.RevokeAction(&_IAct.TransactOpts, actionId)
}

// RevokeAction is a paid mutator transaction binding the contract method 0xb8fcbfef.
//
// Solidity: function revokeAction(uint64 actionId) returns(bool)
func (_IAct *IActTransactorSession) RevokeAction(actionId uint64) (*types.Transaction, error) {
	return _IAct.Contract.RevokeAction(&_IAct.TransactOpts, actionId)
}

// UpdateTemplate is a paid mutator transaction binding the contract method 0xcb7391d5.
//
// Solidity: function updateTemplate(uint64 templateId, string name, string definition) returns(bool)
func (_IAct *IActTransactor) UpdateTemplate(opts *bind.TransactOpts, templateId uint64, name string, definition string) (*types.Transaction, error) {
	return _IAct.contract.Transact(opts, "updateTemplate", templateId, name, definition)
}

// UpdateTemplate is a paid mutator transaction binding the contract method 0xcb7391d5.
//
// Solidity: function updateTemplate(uint64 templateId, string name, string definition) returns(bool)
func (_IAct *IActSession) UpdateTemplate(templateId uint64, name string, definition string) (*types.Transaction, error) {
	return _IAct.Contract.UpdateTemplate(&_IAct.TransactOpts, templateId, name, definition)
}

// UpdateTemplate is a paid mutator transaction binding the contract method 0xcb7391d5.
//
// Solidity: function updateTemplate(uint64 templateId, string name, string definition) returns(bool)
func (_IAct *IActTransactorSession) UpdateTemplate(templateId uint64, name string, definition string) (*types.Transaction, error) {
	return _IAct.Contract.UpdateTemplate(&_IAct.TransactOpts, templateId, name, definition)
}

// VoteForAction is a paid mutator transaction binding the contract method 0xaa9b484b.
//
// Solidity: function voteForAction(uint64 actionId, uint8 voteType) returns(string)
func (_IAct *IActTransactor) VoteForAction(opts *bind.TransactOpts, actionId uint64, voteType uint8) (*types.Transaction, error) {
	return _IAct.contract.Transact(opts, "voteForAction", actionId, voteType)
}

// VoteForAction is a paid mutator transaction binding the contract method 0xaa9b484b.
//
// Solidity: function voteForAction(uint64 actionId, uint8 voteType) returns(string)
func (_IAct *IActSession) VoteForAction(actionId uint64, voteType uint8) (*types.Transaction, error) {
	return _IAct.Contract.VoteForAction(&_IAct.TransactOpts, actionId, voteType)
}

// VoteForAction is a paid mutator transaction binding the contract method 0xaa9b484b.
//
// Solidity: function voteForAction(uint64 actionId, uint8 voteType) returns(string)
func (_IAct *IActTransactorSession) VoteForAction(actionId uint64, voteType uint8) (*types.Transaction, error) {
	return _IAct.Contract.VoteForAction(&_IAct.TransactOpts, actionId, voteType)
}

// IActActionStateChangeIterator is returned from FilterActionStateChange and is used to iterate over the raw logs and unpacked data for ActionStateChange events raised by the IAct contract.
type IActActionStateChangeIterator struct {
	Event *IActActionStateChange // Event containing the contract specifics and raw log

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
func (it *IActActionStateChangeIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(IActActionStateChange)
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
		it.Event = new(IActActionStateChange)
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
func (it *IActActionStateChangeIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *IActActionStateChangeIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// IActActionStateChange represents a ActionStateChange event raised by the IAct contract.
type IActActionStateChange struct {
	Author         common.Address
	ActionId       uint64
	PreviousStatus uint8
	NewStatus      uint8
	Raw            types.Log // Blockchain specific contextual infos
}

// FilterActionStateChange is a free log retrieval operation binding the contract event 0x4ec265596164182b2025b3bd681450aef02c2b9487924e1b6ac3785f9c4636dc.
//
// Solidity: event ActionStateChange(address indexed author, uint64 actionId, uint8 previousStatus, uint8 newStatus)
func (_IAct *IActFilterer) FilterActionStateChange(opts *bind.FilterOpts, author []common.Address) (*IActActionStateChangeIterator, error) {

	var authorRule []interface{}
	for _, authorItem := range author {
		authorRule = append(authorRule, authorItem)
	}

	logs, sub, err := _IAct.contract.FilterLogs(opts, "ActionStateChange", authorRule)
	if err != nil {
		return nil, err
	}
	return &IActActionStateChangeIterator{contract: _IAct.contract, event: "ActionStateChange", logs: logs, sub: sub}, nil
}

// WatchActionStateChange is a free log subscription operation binding the contract event 0x4ec265596164182b2025b3bd681450aef02c2b9487924e1b6ac3785f9c4636dc.
//
// Solidity: event ActionStateChange(address indexed author, uint64 actionId, uint8 previousStatus, uint8 newStatus)
func (_IAct *IActFilterer) WatchActionStateChange(opts *bind.WatchOpts, sink chan<- *IActActionStateChange, author []common.Address) (event.Subscription, error) {

	var authorRule []interface{}
	for _, authorItem := range author {
		authorRule = append(authorRule, authorItem)
	}

	logs, sub, err := _IAct.contract.WatchLogs(opts, "ActionStateChange", authorRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(IActActionStateChange)
				if err := _IAct.contract.UnpackLog(event, "ActionStateChange", log); err != nil {
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

// ParseActionStateChange is a log parse operation binding the contract event 0x4ec265596164182b2025b3bd681450aef02c2b9487924e1b6ac3785f9c4636dc.
//
// Solidity: event ActionStateChange(address indexed author, uint64 actionId, uint8 previousStatus, uint8 newStatus)
func (_IAct *IActFilterer) ParseActionStateChange(log types.Log) (*IActActionStateChange, error) {
	event := new(IActActionStateChange)
	if err := _IAct.contract.UnpackLog(event, "ActionStateChange", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// IActActionVotedIterator is returned from FilterActionVoted and is used to iterate over the raw logs and unpacked data for ActionVoted events raised by the IAct contract.
type IActActionVotedIterator struct {
	Event *IActActionVoted // Event containing the contract specifics and raw log

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
func (it *IActActionVotedIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(IActActionVoted)
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
		it.Event = new(IActActionVoted)
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
func (it *IActActionVotedIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *IActActionVotedIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// IActActionVoted represents a ActionVoted event raised by the IAct contract.
type IActActionVoted struct {
	Participant common.Address
	ActionId    uint64
	VoteType    uint8
	Raw         types.Log // Blockchain specific contextual infos
}

// FilterActionVoted is a free log retrieval operation binding the contract event 0x39db7e0304bfea692e054bba473c1d34175e298180e0c64dc10db63bd6449ae3.
//
// Solidity: event ActionVoted(address indexed participant, uint64 actionId, uint8 voteType)
func (_IAct *IActFilterer) FilterActionVoted(opts *bind.FilterOpts, participant []common.Address) (*IActActionVotedIterator, error) {

	var participantRule []interface{}
	for _, participantItem := range participant {
		participantRule = append(participantRule, participantItem)
	}

	logs, sub, err := _IAct.contract.FilterLogs(opts, "ActionVoted", participantRule)
	if err != nil {
		return nil, err
	}
	return &IActActionVotedIterator{contract: _IAct.contract, event: "ActionVoted", logs: logs, sub: sub}, nil
}

// WatchActionVoted is a free log subscription operation binding the contract event 0x39db7e0304bfea692e054bba473c1d34175e298180e0c64dc10db63bd6449ae3.
//
// Solidity: event ActionVoted(address indexed participant, uint64 actionId, uint8 voteType)
func (_IAct *IActFilterer) WatchActionVoted(opts *bind.WatchOpts, sink chan<- *IActActionVoted, participant []common.Address) (event.Subscription, error) {

	var participantRule []interface{}
	for _, participantItem := range participant {
		participantRule = append(participantRule, participantItem)
	}

	logs, sub, err := _IAct.contract.WatchLogs(opts, "ActionVoted", participantRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(IActActionVoted)
				if err := _IAct.contract.UnpackLog(event, "ActionVoted", log); err != nil {
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

// ParseActionVoted is a log parse operation binding the contract event 0x39db7e0304bfea692e054bba473c1d34175e298180e0c64dc10db63bd6449ae3.
//
// Solidity: event ActionVoted(address indexed participant, uint64 actionId, uint8 voteType)
func (_IAct *IActFilterer) ParseActionVoted(log types.Log) (*IActActionVoted, error) {
	event := new(IActActionVoted)
	if err := _IAct.contract.UnpackLog(event, "ActionVoted", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// IActCreateActionIterator is returned from FilterCreateAction and is used to iterate over the raw logs and unpacked data for CreateAction events raised by the IAct contract.
type IActCreateActionIterator struct {
	Event *IActCreateAction // Event containing the contract specifics and raw log

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
func (it *IActCreateActionIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(IActCreateAction)
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
		it.Event = new(IActCreateAction)
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
func (it *IActCreateActionIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *IActCreateActionIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// IActCreateAction represents a CreateAction event raised by the IAct contract.
type IActCreateAction struct {
	Creator  common.Address
	ActionId uint64
	Raw      types.Log // Blockchain specific contextual infos
}

// FilterCreateAction is a free log retrieval operation binding the contract event 0xadae3ff0cdd6a7009cbfd8df0000b91dfa31585868d4afda8b0aff24c0e6c075.
//
// Solidity: event CreateAction(address indexed creator, uint64 actionId)
func (_IAct *IActFilterer) FilterCreateAction(opts *bind.FilterOpts, creator []common.Address) (*IActCreateActionIterator, error) {

	var creatorRule []interface{}
	for _, creatorItem := range creator {
		creatorRule = append(creatorRule, creatorItem)
	}

	logs, sub, err := _IAct.contract.FilterLogs(opts, "CreateAction", creatorRule)
	if err != nil {
		return nil, err
	}
	return &IActCreateActionIterator{contract: _IAct.contract, event: "CreateAction", logs: logs, sub: sub}, nil
}

// WatchCreateAction is a free log subscription operation binding the contract event 0xadae3ff0cdd6a7009cbfd8df0000b91dfa31585868d4afda8b0aff24c0e6c075.
//
// Solidity: event CreateAction(address indexed creator, uint64 actionId)
func (_IAct *IActFilterer) WatchCreateAction(opts *bind.WatchOpts, sink chan<- *IActCreateAction, creator []common.Address) (event.Subscription, error) {

	var creatorRule []interface{}
	for _, creatorItem := range creator {
		creatorRule = append(creatorRule, creatorItem)
	}

	logs, sub, err := _IAct.contract.WatchLogs(opts, "CreateAction", creatorRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(IActCreateAction)
				if err := _IAct.contract.UnpackLog(event, "CreateAction", log); err != nil {
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

// ParseCreateAction is a log parse operation binding the contract event 0xadae3ff0cdd6a7009cbfd8df0000b91dfa31585868d4afda8b0aff24c0e6c075.
//
// Solidity: event CreateAction(address indexed creator, uint64 actionId)
func (_IAct *IActFilterer) ParseCreateAction(log types.Log) (*IActCreateAction, error) {
	event := new(IActCreateAction)
	if err := _IAct.contract.UnpackLog(event, "CreateAction", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// IActCreateTemplateIterator is returned from FilterCreateTemplate and is used to iterate over the raw logs and unpacked data for CreateTemplate events raised by the IAct contract.
type IActCreateTemplateIterator struct {
	Event *IActCreateTemplate // Event containing the contract specifics and raw log

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
func (it *IActCreateTemplateIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(IActCreateTemplate)
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
		it.Event = new(IActCreateTemplate)
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
func (it *IActCreateTemplateIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *IActCreateTemplateIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// IActCreateTemplate represents a CreateTemplate event raised by the IAct contract.
type IActCreateTemplate struct {
	Creator    common.Address
	TemplateId uint64
	Raw        types.Log // Blockchain specific contextual infos
}

// FilterCreateTemplate is a free log retrieval operation binding the contract event 0x1c8026eaa08d75eaeabd1b3a5f4b53660b24c2ccd983f1300121ce50f9755ead.
//
// Solidity: event CreateTemplate(address indexed creator, uint64 templateId)
func (_IAct *IActFilterer) FilterCreateTemplate(opts *bind.FilterOpts, creator []common.Address) (*IActCreateTemplateIterator, error) {

	var creatorRule []interface{}
	for _, creatorItem := range creator {
		creatorRule = append(creatorRule, creatorItem)
	}

	logs, sub, err := _IAct.contract.FilterLogs(opts, "CreateTemplate", creatorRule)
	if err != nil {
		return nil, err
	}
	return &IActCreateTemplateIterator{contract: _IAct.contract, event: "CreateTemplate", logs: logs, sub: sub}, nil
}

// WatchCreateTemplate is a free log subscription operation binding the contract event 0x1c8026eaa08d75eaeabd1b3a5f4b53660b24c2ccd983f1300121ce50f9755ead.
//
// Solidity: event CreateTemplate(address indexed creator, uint64 templateId)
func (_IAct *IActFilterer) WatchCreateTemplate(opts *bind.WatchOpts, sink chan<- *IActCreateTemplate, creator []common.Address) (event.Subscription, error) {

	var creatorRule []interface{}
	for _, creatorItem := range creator {
		creatorRule = append(creatorRule, creatorItem)
	}

	logs, sub, err := _IAct.contract.WatchLogs(opts, "CreateTemplate", creatorRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(IActCreateTemplate)
				if err := _IAct.contract.UnpackLog(event, "CreateTemplate", log); err != nil {
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

// ParseCreateTemplate is a log parse operation binding the contract event 0x1c8026eaa08d75eaeabd1b3a5f4b53660b24c2ccd983f1300121ce50f9755ead.
//
// Solidity: event CreateTemplate(address indexed creator, uint64 templateId)
func (_IAct *IActFilterer) ParseCreateTemplate(log types.Log) (*IActCreateTemplate, error) {
	event := new(IActCreateTemplate)
	if err := _IAct.contract.UnpackLog(event, "CreateTemplate", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// IActUpdateTemplateIterator is returned from FilterUpdateTemplate and is used to iterate over the raw logs and unpacked data for UpdateTemplate events raised by the IAct contract.
type IActUpdateTemplateIterator struct {
	Event *IActUpdateTemplate // Event containing the contract specifics and raw log

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
func (it *IActUpdateTemplateIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(IActUpdateTemplate)
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
		it.Event = new(IActUpdateTemplate)
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
func (it *IActUpdateTemplateIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *IActUpdateTemplateIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// IActUpdateTemplate represents a UpdateTemplate event raised by the IAct contract.
type IActUpdateTemplate struct {
	Author     common.Address
	TemplateId uint64
	Raw        types.Log // Blockchain specific contextual infos
}

// FilterUpdateTemplate is a free log retrieval operation binding the contract event 0x208e43824ec2e0ac2f091a72bb6aaf6f69aa0f522624bef02e403b80a29d1acd.
//
// Solidity: event UpdateTemplate(address indexed author, uint64 templateId)
func (_IAct *IActFilterer) FilterUpdateTemplate(opts *bind.FilterOpts, author []common.Address) (*IActUpdateTemplateIterator, error) {

	var authorRule []interface{}
	for _, authorItem := range author {
		authorRule = append(authorRule, authorItem)
	}

	logs, sub, err := _IAct.contract.FilterLogs(opts, "UpdateTemplate", authorRule)
	if err != nil {
		return nil, err
	}
	return &IActUpdateTemplateIterator{contract: _IAct.contract, event: "UpdateTemplate", logs: logs, sub: sub}, nil
}

// WatchUpdateTemplate is a free log subscription operation binding the contract event 0x208e43824ec2e0ac2f091a72bb6aaf6f69aa0f522624bef02e403b80a29d1acd.
//
// Solidity: event UpdateTemplate(address indexed author, uint64 templateId)
func (_IAct *IActFilterer) WatchUpdateTemplate(opts *bind.WatchOpts, sink chan<- *IActUpdateTemplate, author []common.Address) (event.Subscription, error) {

	var authorRule []interface{}
	for _, authorItem := range author {
		authorRule = append(authorRule, authorItem)
	}

	logs, sub, err := _IAct.contract.WatchLogs(opts, "UpdateTemplate", authorRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(IActUpdateTemplate)
				if err := _IAct.contract.UnpackLog(event, "UpdateTemplate", log); err != nil {
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

// ParseUpdateTemplate is a log parse operation binding the contract event 0x208e43824ec2e0ac2f091a72bb6aaf6f69aa0f522624bef02e403b80a29d1acd.
//
// Solidity: event UpdateTemplate(address indexed author, uint64 templateId)
func (_IAct *IActFilterer) ParseUpdateTemplate(log types.Log) (*IActUpdateTemplate, error) {
	event := new(IActUpdateTemplate)
	if err := _IAct.contract.UnpackLog(event, "UpdateTemplate", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}
