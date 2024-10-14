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
)

// Action is an auto generated low-level Go binding around an user-defined struct.
type Action struct {
	Id                uint64
	Status            *big.Int
	StatusText        string
	Msg               AnyType
	Result            AnyType
	Creator           string
	TimeoutHeight     uint64
	CreatedAt         Timestamp
	UpdatedAt         Timestamp
	ApproveExpression string
	RejectExpression  string
	Mentions          []string
	Votes             []ActionVote
}

// ActionByIdResponse is an auto generated low-level Go binding around an user-defined struct.
type ActionByIdResponse struct {
	Action Action
}

// ActionVote is an auto generated low-level Go binding around an user-defined struct.
type ActionVote struct {
	Participant  string
	VotedAt      Timestamp
	VoteType     int32
	VoteTypeText string
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

// AnyType is an auto generated low-level Go binding around an user-defined struct.
type AnyType struct {
	TypeUrl string
	Value   []byte
}

// Template is an auto generated low-level Go binding around an user-defined struct.
type Template struct {
	Id         uint64
	Creator    string
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

// Timestamp is an auto generated low-level Go binding around an user-defined struct.
type Timestamp struct {
	Secs  uint64
	Nanos uint64
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

// IActMetaData contains all meta data concerning the IAct contract.
var IActMetaData = &bind.MetaData{
	ABI: "[{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"internalType\":\"uint64\",\"name\":\"actionId\",\"type\":\"uint64\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"participant\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"int32\",\"name\":\"voteType\",\"type\":\"int32\"}],\"name\":\"EventActionVoted\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"internalType\":\"uint64\",\"name\":\"actionId\",\"type\":\"uint64\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"creator\",\"type\":\"address\"}],\"name\":\"EventCreateAction\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"internalType\":\"uint64\",\"name\":\"templateId\",\"type\":\"uint64\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"creator\",\"type\":\"address\"}],\"name\":\"EventCreateTemplate\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"internalType\":\"uint64\",\"name\":\"templateId\",\"type\":\"uint64\"}],\"name\":\"EventUpdateTemplate\",\"type\":\"event\"},{\"inputs\":[{\"internalType\":\"uint64\",\"name\":\"actionId\",\"type\":\"uint64\"}],\"name\":\"actionById\",\"outputs\":[{\"components\":[{\"components\":[{\"internalType\":\"uint64\",\"name\":\"id\",\"type\":\"uint64\"},{\"internalType\":\"int256\",\"name\":\"status\",\"type\":\"int256\"},{\"internalType\":\"string\",\"name\":\"statusText\",\"type\":\"string\"},{\"components\":[{\"internalType\":\"string\",\"name\":\"typeUrl\",\"type\":\"string\"},{\"internalType\":\"bytes\",\"name\":\"value\",\"type\":\"bytes\"}],\"internalType\":\"structAnyType\",\"name\":\"msg\",\"type\":\"tuple\"},{\"components\":[{\"internalType\":\"string\",\"name\":\"typeUrl\",\"type\":\"string\"},{\"internalType\":\"bytes\",\"name\":\"value\",\"type\":\"bytes\"}],\"internalType\":\"structAnyType\",\"name\":\"result\",\"type\":\"tuple\"},{\"internalType\":\"string\",\"name\":\"creator\",\"type\":\"string\"},{\"internalType\":\"uint64\",\"name\":\"timeoutHeight\",\"type\":\"uint64\"},{\"components\":[{\"internalType\":\"uint64\",\"name\":\"secs\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"nanos\",\"type\":\"uint64\"}],\"internalType\":\"structTimestamp\",\"name\":\"createdAt\",\"type\":\"tuple\"},{\"components\":[{\"internalType\":\"uint64\",\"name\":\"secs\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"nanos\",\"type\":\"uint64\"}],\"internalType\":\"structTimestamp\",\"name\":\"updatedAt\",\"type\":\"tuple\"},{\"internalType\":\"string\",\"name\":\"approveExpression\",\"type\":\"string\"},{\"internalType\":\"string\",\"name\":\"rejectExpression\",\"type\":\"string\"},{\"internalType\":\"string[]\",\"name\":\"mentions\",\"type\":\"string[]\"},{\"components\":[{\"internalType\":\"string\",\"name\":\"participant\",\"type\":\"string\"},{\"components\":[{\"internalType\":\"uint64\",\"name\":\"secs\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"nanos\",\"type\":\"uint64\"}],\"internalType\":\"structTimestamp\",\"name\":\"votedAt\",\"type\":\"tuple\"},{\"internalType\":\"int32\",\"name\":\"voteType\",\"type\":\"int32\"},{\"internalType\":\"string\",\"name\":\"voteTypeText\",\"type\":\"string\"}],\"internalType\":\"structActionVote[]\",\"name\":\"votes\",\"type\":\"tuple[]\"}],\"internalType\":\"structAction\",\"name\":\"action\",\"type\":\"tuple\"}],\"internalType\":\"structActionByIdResponse\",\"name\":\"response\",\"type\":\"tuple\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes\",\"name\":\"key\",\"type\":\"bytes\"},{\"internalType\":\"uint64\",\"name\":\"offset\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"limit\",\"type\":\"uint64\"},{\"internalType\":\"bool\",\"name\":\"countTotal\",\"type\":\"bool\"},{\"internalType\":\"bool\",\"name\":\"reverse\",\"type\":\"bool\"}],\"internalType\":\"structTypes.PageRequest\",\"name\":\"pagination\",\"type\":\"tuple\"}],\"name\":\"actions\",\"outputs\":[{\"components\":[{\"components\":[{\"internalType\":\"bytes\",\"name\":\"nextKey\",\"type\":\"bytes\"},{\"internalType\":\"uint64\",\"name\":\"total\",\"type\":\"uint64\"}],\"internalType\":\"structTypes.PageResponse\",\"name\":\"pagination\",\"type\":\"tuple\"},{\"components\":[{\"internalType\":\"uint64\",\"name\":\"id\",\"type\":\"uint64\"},{\"internalType\":\"int256\",\"name\":\"status\",\"type\":\"int256\"},{\"internalType\":\"string\",\"name\":\"statusText\",\"type\":\"string\"},{\"components\":[{\"internalType\":\"string\",\"name\":\"typeUrl\",\"type\":\"string\"},{\"internalType\":\"bytes\",\"name\":\"value\",\"type\":\"bytes\"}],\"internalType\":\"structAnyType\",\"name\":\"msg\",\"type\":\"tuple\"},{\"components\":[{\"internalType\":\"string\",\"name\":\"typeUrl\",\"type\":\"string\"},{\"internalType\":\"bytes\",\"name\":\"value\",\"type\":\"bytes\"}],\"internalType\":\"structAnyType\",\"name\":\"result\",\"type\":\"tuple\"},{\"internalType\":\"string\",\"name\":\"creator\",\"type\":\"string\"},{\"internalType\":\"uint64\",\"name\":\"timeoutHeight\",\"type\":\"uint64\"},{\"components\":[{\"internalType\":\"uint64\",\"name\":\"secs\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"nanos\",\"type\":\"uint64\"}],\"internalType\":\"structTimestamp\",\"name\":\"createdAt\",\"type\":\"tuple\"},{\"components\":[{\"internalType\":\"uint64\",\"name\":\"secs\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"nanos\",\"type\":\"uint64\"}],\"internalType\":\"structTimestamp\",\"name\":\"updatedAt\",\"type\":\"tuple\"},{\"internalType\":\"string\",\"name\":\"approveExpression\",\"type\":\"string\"},{\"internalType\":\"string\",\"name\":\"rejectExpression\",\"type\":\"string\"},{\"internalType\":\"string[]\",\"name\":\"mentions\",\"type\":\"string[]\"},{\"components\":[{\"internalType\":\"string\",\"name\":\"participant\",\"type\":\"string\"},{\"components\":[{\"internalType\":\"uint64\",\"name\":\"secs\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"nanos\",\"type\":\"uint64\"}],\"internalType\":\"structTimestamp\",\"name\":\"votedAt\",\"type\":\"tuple\"},{\"internalType\":\"int32\",\"name\":\"voteType\",\"type\":\"int32\"},{\"internalType\":\"string\",\"name\":\"voteTypeText\",\"type\":\"string\"}],\"internalType\":\"structActionVote[]\",\"name\":\"votes\",\"type\":\"tuple[]\"}],\"internalType\":\"structAction[]\",\"name\":\"actions\",\"type\":\"tuple[]\"}],\"internalType\":\"structActionsResponse\",\"name\":\"response\",\"type\":\"tuple\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes\",\"name\":\"key\",\"type\":\"bytes\"},{\"internalType\":\"uint64\",\"name\":\"offset\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"limit\",\"type\":\"uint64\"},{\"internalType\":\"bool\",\"name\":\"countTotal\",\"type\":\"bool\"},{\"internalType\":\"bool\",\"name\":\"reverse\",\"type\":\"bool\"}],\"internalType\":\"structTypes.PageRequest\",\"name\":\"pagination\",\"type\":\"tuple\"},{\"internalType\":\"string\",\"name\":\"addr\",\"type\":\"string\"},{\"internalType\":\"int32\",\"name\":\"status\",\"type\":\"int32\"}],\"name\":\"actionsByAddress\",\"outputs\":[{\"components\":[{\"components\":[{\"internalType\":\"bytes\",\"name\":\"nextKey\",\"type\":\"bytes\"},{\"internalType\":\"uint64\",\"name\":\"total\",\"type\":\"uint64\"}],\"internalType\":\"structTypes.PageResponse\",\"name\":\"pagination\",\"type\":\"tuple\"},{\"components\":[{\"internalType\":\"uint64\",\"name\":\"id\",\"type\":\"uint64\"},{\"internalType\":\"int256\",\"name\":\"status\",\"type\":\"int256\"},{\"internalType\":\"string\",\"name\":\"statusText\",\"type\":\"string\"},{\"components\":[{\"internalType\":\"string\",\"name\":\"typeUrl\",\"type\":\"string\"},{\"internalType\":\"bytes\",\"name\":\"value\",\"type\":\"bytes\"}],\"internalType\":\"structAnyType\",\"name\":\"msg\",\"type\":\"tuple\"},{\"components\":[{\"internalType\":\"string\",\"name\":\"typeUrl\",\"type\":\"string\"},{\"internalType\":\"bytes\",\"name\":\"value\",\"type\":\"bytes\"}],\"internalType\":\"structAnyType\",\"name\":\"result\",\"type\":\"tuple\"},{\"internalType\":\"string\",\"name\":\"creator\",\"type\":\"string\"},{\"internalType\":\"uint64\",\"name\":\"timeoutHeight\",\"type\":\"uint64\"},{\"components\":[{\"internalType\":\"uint64\",\"name\":\"secs\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"nanos\",\"type\":\"uint64\"}],\"internalType\":\"structTimestamp\",\"name\":\"createdAt\",\"type\":\"tuple\"},{\"components\":[{\"internalType\":\"uint64\",\"name\":\"secs\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"nanos\",\"type\":\"uint64\"}],\"internalType\":\"structTimestamp\",\"name\":\"updatedAt\",\"type\":\"tuple\"},{\"internalType\":\"string\",\"name\":\"approveExpression\",\"type\":\"string\"},{\"internalType\":\"string\",\"name\":\"rejectExpression\",\"type\":\"string\"},{\"internalType\":\"string[]\",\"name\":\"mentions\",\"type\":\"string[]\"},{\"components\":[{\"internalType\":\"string\",\"name\":\"participant\",\"type\":\"string\"},{\"components\":[{\"internalType\":\"uint64\",\"name\":\"secs\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"nanos\",\"type\":\"uint64\"}],\"internalType\":\"structTimestamp\",\"name\":\"votedAt\",\"type\":\"tuple\"},{\"internalType\":\"int32\",\"name\":\"voteType\",\"type\":\"int32\"},{\"internalType\":\"string\",\"name\":\"voteTypeText\",\"type\":\"string\"}],\"internalType\":\"structActionVote[]\",\"name\":\"votes\",\"type\":\"tuple[]\"}],\"internalType\":\"structAction[]\",\"name\":\"actions\",\"type\":\"tuple[]\"}],\"internalType\":\"structActionsByAddressResponse\",\"name\":\"response\",\"type\":\"tuple\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint64\",\"name\":\"actionId\",\"type\":\"uint64\"}],\"name\":\"checkAction\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"string\",\"name\":\"name\",\"type\":\"string\"},{\"internalType\":\"string\",\"name\":\"definition\",\"type\":\"string\"}],\"name\":\"newTemplate\",\"outputs\":[{\"internalType\":\"uint64\",\"name\":\"\",\"type\":\"uint64\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint64\",\"name\":\"actionId\",\"type\":\"uint64\"}],\"name\":\"revokeAction\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint64\",\"name\":\"templateId\",\"type\":\"uint64\"}],\"name\":\"templateById\",\"outputs\":[{\"components\":[{\"components\":[{\"internalType\":\"uint64\",\"name\":\"id\",\"type\":\"uint64\"},{\"internalType\":\"string\",\"name\":\"creator\",\"type\":\"string\"},{\"internalType\":\"string\",\"name\":\"name\",\"type\":\"string\"},{\"internalType\":\"string\",\"name\":\"expression\",\"type\":\"string\"}],\"internalType\":\"structTemplate\",\"name\":\"template\",\"type\":\"tuple\"}],\"internalType\":\"structTemplateByIdResponse\",\"name\":\"response\",\"type\":\"tuple\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes\",\"name\":\"key\",\"type\":\"bytes\"},{\"internalType\":\"uint64\",\"name\":\"offset\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"limit\",\"type\":\"uint64\"},{\"internalType\":\"bool\",\"name\":\"countTotal\",\"type\":\"bool\"},{\"internalType\":\"bool\",\"name\":\"reverse\",\"type\":\"bool\"}],\"internalType\":\"structTypes.PageRequest\",\"name\":\"pagination\",\"type\":\"tuple\"}],\"name\":\"templates\",\"outputs\":[{\"components\":[{\"components\":[{\"internalType\":\"bytes\",\"name\":\"nextKey\",\"type\":\"bytes\"},{\"internalType\":\"uint64\",\"name\":\"total\",\"type\":\"uint64\"}],\"internalType\":\"structTypes.PageResponse\",\"name\":\"pagination\",\"type\":\"tuple\"},{\"components\":[{\"internalType\":\"uint64\",\"name\":\"id\",\"type\":\"uint64\"},{\"internalType\":\"string\",\"name\":\"creator\",\"type\":\"string\"},{\"internalType\":\"string\",\"name\":\"name\",\"type\":\"string\"},{\"internalType\":\"string\",\"name\":\"expression\",\"type\":\"string\"}],\"internalType\":\"structTemplate[]\",\"name\":\"templates\",\"type\":\"tuple[]\"}],\"internalType\":\"structTemplatesResponse\",\"name\":\"response\",\"type\":\"tuple\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint64\",\"name\":\"templateId\",\"type\":\"uint64\"},{\"internalType\":\"string\",\"name\":\"name\",\"type\":\"string\"},{\"internalType\":\"string\",\"name\":\"definition\",\"type\":\"string\"}],\"name\":\"updateTemplate\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint64\",\"name\":\"actionId\",\"type\":\"uint64\"},{\"internalType\":\"int32\",\"name\":\"voteType\",\"type\":\"int32\"}],\"name\":\"voteForAction\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"}]",
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
	parsed, err := abi.JSON(strings.NewReader(IActABI))
	if err != nil {
		return nil, err
	}
	return bind.NewBoundContract(address, parsed, caller, transactor, filterer), nil
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
// Solidity: function actionById(uint64 actionId) view returns(((uint64,int256,string,(string,bytes),(string,bytes),string,uint64,(uint64,uint64),(uint64,uint64),string,string,string[],(string,(uint64,uint64),int32,string)[])) response)
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
// Solidity: function actionById(uint64 actionId) view returns(((uint64,int256,string,(string,bytes),(string,bytes),string,uint64,(uint64,uint64),(uint64,uint64),string,string,string[],(string,(uint64,uint64),int32,string)[])) response)
func (_IAct *IActSession) ActionById(actionId uint64) (ActionByIdResponse, error) {
	return _IAct.Contract.ActionById(&_IAct.CallOpts, actionId)
}

// ActionById is a free data retrieval call binding the contract method 0x51619ef0.
//
// Solidity: function actionById(uint64 actionId) view returns(((uint64,int256,string,(string,bytes),(string,bytes),string,uint64,(uint64,uint64),(uint64,uint64),string,string,string[],(string,(uint64,uint64),int32,string)[])) response)
func (_IAct *IActCallerSession) ActionById(actionId uint64) (ActionByIdResponse, error) {
	return _IAct.Contract.ActionById(&_IAct.CallOpts, actionId)
}

// Actions is a free data retrieval call binding the contract method 0x9e9d1e27.
//
// Solidity: function actions((bytes,uint64,uint64,bool,bool) pagination) view returns(((bytes,uint64),(uint64,int256,string,(string,bytes),(string,bytes),string,uint64,(uint64,uint64),(uint64,uint64),string,string,string[],(string,(uint64,uint64),int32,string)[])[]) response)
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
// Solidity: function actions((bytes,uint64,uint64,bool,bool) pagination) view returns(((bytes,uint64),(uint64,int256,string,(string,bytes),(string,bytes),string,uint64,(uint64,uint64),(uint64,uint64),string,string,string[],(string,(uint64,uint64),int32,string)[])[]) response)
func (_IAct *IActSession) Actions(pagination TypesPageRequest) (ActionsResponse, error) {
	return _IAct.Contract.Actions(&_IAct.CallOpts, pagination)
}

// Actions is a free data retrieval call binding the contract method 0x9e9d1e27.
//
// Solidity: function actions((bytes,uint64,uint64,bool,bool) pagination) view returns(((bytes,uint64),(uint64,int256,string,(string,bytes),(string,bytes),string,uint64,(uint64,uint64),(uint64,uint64),string,string,string[],(string,(uint64,uint64),int32,string)[])[]) response)
func (_IAct *IActCallerSession) Actions(pagination TypesPageRequest) (ActionsResponse, error) {
	return _IAct.Contract.Actions(&_IAct.CallOpts, pagination)
}

// ActionsByAddress is a free data retrieval call binding the contract method 0xc0c68593.
//
// Solidity: function actionsByAddress((bytes,uint64,uint64,bool,bool) pagination, string addr, int32 status) view returns(((bytes,uint64),(uint64,int256,string,(string,bytes),(string,bytes),string,uint64,(uint64,uint64),(uint64,uint64),string,string,string[],(string,(uint64,uint64),int32,string)[])[]) response)
func (_IAct *IActCaller) ActionsByAddress(opts *bind.CallOpts, pagination TypesPageRequest, addr string, status int32) (ActionsByAddressResponse, error) {
	var out []interface{}
	err := _IAct.contract.Call(opts, &out, "actionsByAddress", pagination, addr, status)

	if err != nil {
		return *new(ActionsByAddressResponse), err
	}

	out0 := *abi.ConvertType(out[0], new(ActionsByAddressResponse)).(*ActionsByAddressResponse)

	return out0, err

}

// ActionsByAddress is a free data retrieval call binding the contract method 0xc0c68593.
//
// Solidity: function actionsByAddress((bytes,uint64,uint64,bool,bool) pagination, string addr, int32 status) view returns(((bytes,uint64),(uint64,int256,string,(string,bytes),(string,bytes),string,uint64,(uint64,uint64),(uint64,uint64),string,string,string[],(string,(uint64,uint64),int32,string)[])[]) response)
func (_IAct *IActSession) ActionsByAddress(pagination TypesPageRequest, addr string, status int32) (ActionsByAddressResponse, error) {
	return _IAct.Contract.ActionsByAddress(&_IAct.CallOpts, pagination, addr, status)
}

// ActionsByAddress is a free data retrieval call binding the contract method 0xc0c68593.
//
// Solidity: function actionsByAddress((bytes,uint64,uint64,bool,bool) pagination, string addr, int32 status) view returns(((bytes,uint64),(uint64,int256,string,(string,bytes),(string,bytes),string,uint64,(uint64,uint64),(uint64,uint64),string,string,string[],(string,(uint64,uint64),int32,string)[])[]) response)
func (_IAct *IActCallerSession) ActionsByAddress(pagination TypesPageRequest, addr string, status int32) (ActionsByAddressResponse, error) {
	return _IAct.Contract.ActionsByAddress(&_IAct.CallOpts, pagination, addr, status)
}

// TemplateById is a free data retrieval call binding the contract method 0x161f1e48.
//
// Solidity: function templateById(uint64 templateId) view returns(((uint64,string,string,string)) response)
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
// Solidity: function templateById(uint64 templateId) view returns(((uint64,string,string,string)) response)
func (_IAct *IActSession) TemplateById(templateId uint64) (TemplateByIdResponse, error) {
	return _IAct.Contract.TemplateById(&_IAct.CallOpts, templateId)
}

// TemplateById is a free data retrieval call binding the contract method 0x161f1e48.
//
// Solidity: function templateById(uint64 templateId) view returns(((uint64,string,string,string)) response)
func (_IAct *IActCallerSession) TemplateById(templateId uint64) (TemplateByIdResponse, error) {
	return _IAct.Contract.TemplateById(&_IAct.CallOpts, templateId)
}

// Templates is a free data retrieval call binding the contract method 0x91dc3baa.
//
// Solidity: function templates((bytes,uint64,uint64,bool,bool) pagination) view returns(((bytes,uint64),(uint64,string,string,string)[]) response)
func (_IAct *IActCaller) Templates(opts *bind.CallOpts, pagination TypesPageRequest) (TemplatesResponse, error) {
	var out []interface{}
	err := _IAct.contract.Call(opts, &out, "templates", pagination)

	if err != nil {
		return *new(TemplatesResponse), err
	}

	out0 := *abi.ConvertType(out[0], new(TemplatesResponse)).(*TemplatesResponse)

	return out0, err

}

// Templates is a free data retrieval call binding the contract method 0x91dc3baa.
//
// Solidity: function templates((bytes,uint64,uint64,bool,bool) pagination) view returns(((bytes,uint64),(uint64,string,string,string)[]) response)
func (_IAct *IActSession) Templates(pagination TypesPageRequest) (TemplatesResponse, error) {
	return _IAct.Contract.Templates(&_IAct.CallOpts, pagination)
}

// Templates is a free data retrieval call binding the contract method 0x91dc3baa.
//
// Solidity: function templates((bytes,uint64,uint64,bool,bool) pagination) view returns(((bytes,uint64),(uint64,string,string,string)[]) response)
func (_IAct *IActCallerSession) Templates(pagination TypesPageRequest) (TemplatesResponse, error) {
	return _IAct.Contract.Templates(&_IAct.CallOpts, pagination)
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

// VoteForAction is a paid mutator transaction binding the contract method 0xdf5a2a3a.
//
// Solidity: function voteForAction(uint64 actionId, int32 voteType) returns(string)
func (_IAct *IActTransactor) VoteForAction(opts *bind.TransactOpts, actionId uint64, voteType int32) (*types.Transaction, error) {
	return _IAct.contract.Transact(opts, "voteForAction", actionId, voteType)
}

// VoteForAction is a paid mutator transaction binding the contract method 0xdf5a2a3a.
//
// Solidity: function voteForAction(uint64 actionId, int32 voteType) returns(string)
func (_IAct *IActSession) VoteForAction(actionId uint64, voteType int32) (*types.Transaction, error) {
	return _IAct.Contract.VoteForAction(&_IAct.TransactOpts, actionId, voteType)
}

// VoteForAction is a paid mutator transaction binding the contract method 0xdf5a2a3a.
//
// Solidity: function voteForAction(uint64 actionId, int32 voteType) returns(string)
func (_IAct *IActTransactorSession) VoteForAction(actionId uint64, voteType int32) (*types.Transaction, error) {
	return _IAct.Contract.VoteForAction(&_IAct.TransactOpts, actionId, voteType)
}

// IActEventActionVotedIterator is returned from FilterEventActionVoted and is used to iterate over the raw logs and unpacked data for EventActionVoted events raised by the IAct contract.
type IActEventActionVotedIterator struct {
	Event *IActEventActionVoted // Event containing the contract specifics and raw log

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
func (it *IActEventActionVotedIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(IActEventActionVoted)
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
		it.Event = new(IActEventActionVoted)
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
func (it *IActEventActionVotedIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *IActEventActionVotedIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// IActEventActionVoted represents a EventActionVoted event raised by the IAct contract.
type IActEventActionVoted struct {
	ActionId    uint64
	Participant common.Address
	VoteType    int32
	Raw         types.Log // Blockchain specific contextual infos
}

// FilterEventActionVoted is a free log retrieval operation binding the contract event 0xf2f37b8a4e4f5c072d26f2dc2444878574c21edfd2c6ae83acbe6ab5d71a05bc.
//
// Solidity: event EventActionVoted(uint64 actionId, address indexed participant, int32 voteType)
func (_IAct *IActFilterer) FilterEventActionVoted(opts *bind.FilterOpts, participant []common.Address) (*IActEventActionVotedIterator, error) {

	var participantRule []interface{}
	for _, participantItem := range participant {
		participantRule = append(participantRule, participantItem)
	}

	logs, sub, err := _IAct.contract.FilterLogs(opts, "EventActionVoted", participantRule)
	if err != nil {
		return nil, err
	}
	return &IActEventActionVotedIterator{contract: _IAct.contract, event: "EventActionVoted", logs: logs, sub: sub}, nil
}

// WatchEventActionVoted is a free log subscription operation binding the contract event 0xf2f37b8a4e4f5c072d26f2dc2444878574c21edfd2c6ae83acbe6ab5d71a05bc.
//
// Solidity: event EventActionVoted(uint64 actionId, address indexed participant, int32 voteType)
func (_IAct *IActFilterer) WatchEventActionVoted(opts *bind.WatchOpts, sink chan<- *IActEventActionVoted, participant []common.Address) (event.Subscription, error) {

	var participantRule []interface{}
	for _, participantItem := range participant {
		participantRule = append(participantRule, participantItem)
	}

	logs, sub, err := _IAct.contract.WatchLogs(opts, "EventActionVoted", participantRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(IActEventActionVoted)
				if err := _IAct.contract.UnpackLog(event, "EventActionVoted", log); err != nil {
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

// ParseEventActionVoted is a log parse operation binding the contract event 0xf2f37b8a4e4f5c072d26f2dc2444878574c21edfd2c6ae83acbe6ab5d71a05bc.
//
// Solidity: event EventActionVoted(uint64 actionId, address indexed participant, int32 voteType)
func (_IAct *IActFilterer) ParseEventActionVoted(log types.Log) (*IActEventActionVoted, error) {
	event := new(IActEventActionVoted)
	if err := _IAct.contract.UnpackLog(event, "EventActionVoted", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// IActEventCreateActionIterator is returned from FilterEventCreateAction and is used to iterate over the raw logs and unpacked data for EventCreateAction events raised by the IAct contract.
type IActEventCreateActionIterator struct {
	Event *IActEventCreateAction // Event containing the contract specifics and raw log

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
func (it *IActEventCreateActionIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(IActEventCreateAction)
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
		it.Event = new(IActEventCreateAction)
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
func (it *IActEventCreateActionIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *IActEventCreateActionIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// IActEventCreateAction represents a EventCreateAction event raised by the IAct contract.
type IActEventCreateAction struct {
	ActionId uint64
	Creator  common.Address
	Raw      types.Log // Blockchain specific contextual infos
}

// FilterEventCreateAction is a free log retrieval operation binding the contract event 0xaa82785b5df2c708c47e1f56eab2eee4818c86df25927e1a15d8bc819d9ca36d.
//
// Solidity: event EventCreateAction(uint64 actionId, address indexed creator)
func (_IAct *IActFilterer) FilterEventCreateAction(opts *bind.FilterOpts, creator []common.Address) (*IActEventCreateActionIterator, error) {

	var creatorRule []interface{}
	for _, creatorItem := range creator {
		creatorRule = append(creatorRule, creatorItem)
	}

	logs, sub, err := _IAct.contract.FilterLogs(opts, "EventCreateAction", creatorRule)
	if err != nil {
		return nil, err
	}
	return &IActEventCreateActionIterator{contract: _IAct.contract, event: "EventCreateAction", logs: logs, sub: sub}, nil
}

// WatchEventCreateAction is a free log subscription operation binding the contract event 0xaa82785b5df2c708c47e1f56eab2eee4818c86df25927e1a15d8bc819d9ca36d.
//
// Solidity: event EventCreateAction(uint64 actionId, address indexed creator)
func (_IAct *IActFilterer) WatchEventCreateAction(opts *bind.WatchOpts, sink chan<- *IActEventCreateAction, creator []common.Address) (event.Subscription, error) {

	var creatorRule []interface{}
	for _, creatorItem := range creator {
		creatorRule = append(creatorRule, creatorItem)
	}

	logs, sub, err := _IAct.contract.WatchLogs(opts, "EventCreateAction", creatorRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(IActEventCreateAction)
				if err := _IAct.contract.UnpackLog(event, "EventCreateAction", log); err != nil {
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

// ParseEventCreateAction is a log parse operation binding the contract event 0xaa82785b5df2c708c47e1f56eab2eee4818c86df25927e1a15d8bc819d9ca36d.
//
// Solidity: event EventCreateAction(uint64 actionId, address indexed creator)
func (_IAct *IActFilterer) ParseEventCreateAction(log types.Log) (*IActEventCreateAction, error) {
	event := new(IActEventCreateAction)
	if err := _IAct.contract.UnpackLog(event, "EventCreateAction", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// IActEventCreateTemplateIterator is returned from FilterEventCreateTemplate and is used to iterate over the raw logs and unpacked data for EventCreateTemplate events raised by the IAct contract.
type IActEventCreateTemplateIterator struct {
	Event *IActEventCreateTemplate // Event containing the contract specifics and raw log

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
func (it *IActEventCreateTemplateIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(IActEventCreateTemplate)
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
		it.Event = new(IActEventCreateTemplate)
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
func (it *IActEventCreateTemplateIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *IActEventCreateTemplateIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// IActEventCreateTemplate represents a EventCreateTemplate event raised by the IAct contract.
type IActEventCreateTemplate struct {
	TemplateId uint64
	Creator    common.Address
	Raw        types.Log // Blockchain specific contextual infos
}

// FilterEventCreateTemplate is a free log retrieval operation binding the contract event 0x8524b8ebc63422979c6f5647b0056ec3ea3cebbc54394c307dd1a121c7f8c880.
//
// Solidity: event EventCreateTemplate(uint64 templateId, address indexed creator)
func (_IAct *IActFilterer) FilterEventCreateTemplate(opts *bind.FilterOpts, creator []common.Address) (*IActEventCreateTemplateIterator, error) {

	var creatorRule []interface{}
	for _, creatorItem := range creator {
		creatorRule = append(creatorRule, creatorItem)
	}

	logs, sub, err := _IAct.contract.FilterLogs(opts, "EventCreateTemplate", creatorRule)
	if err != nil {
		return nil, err
	}
	return &IActEventCreateTemplateIterator{contract: _IAct.contract, event: "EventCreateTemplate", logs: logs, sub: sub}, nil
}

// WatchEventCreateTemplate is a free log subscription operation binding the contract event 0x8524b8ebc63422979c6f5647b0056ec3ea3cebbc54394c307dd1a121c7f8c880.
//
// Solidity: event EventCreateTemplate(uint64 templateId, address indexed creator)
func (_IAct *IActFilterer) WatchEventCreateTemplate(opts *bind.WatchOpts, sink chan<- *IActEventCreateTemplate, creator []common.Address) (event.Subscription, error) {

	var creatorRule []interface{}
	for _, creatorItem := range creator {
		creatorRule = append(creatorRule, creatorItem)
	}

	logs, sub, err := _IAct.contract.WatchLogs(opts, "EventCreateTemplate", creatorRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(IActEventCreateTemplate)
				if err := _IAct.contract.UnpackLog(event, "EventCreateTemplate", log); err != nil {
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

// ParseEventCreateTemplate is a log parse operation binding the contract event 0x8524b8ebc63422979c6f5647b0056ec3ea3cebbc54394c307dd1a121c7f8c880.
//
// Solidity: event EventCreateTemplate(uint64 templateId, address indexed creator)
func (_IAct *IActFilterer) ParseEventCreateTemplate(log types.Log) (*IActEventCreateTemplate, error) {
	event := new(IActEventCreateTemplate)
	if err := _IAct.contract.UnpackLog(event, "EventCreateTemplate", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// IActEventUpdateTemplateIterator is returned from FilterEventUpdateTemplate and is used to iterate over the raw logs and unpacked data for EventUpdateTemplate events raised by the IAct contract.
type IActEventUpdateTemplateIterator struct {
	Event *IActEventUpdateTemplate // Event containing the contract specifics and raw log

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
func (it *IActEventUpdateTemplateIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(IActEventUpdateTemplate)
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
		it.Event = new(IActEventUpdateTemplate)
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
func (it *IActEventUpdateTemplateIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *IActEventUpdateTemplateIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// IActEventUpdateTemplate represents a EventUpdateTemplate event raised by the IAct contract.
type IActEventUpdateTemplate struct {
	TemplateId uint64
	Raw        types.Log // Blockchain specific contextual infos
}

// FilterEventUpdateTemplate is a free log retrieval operation binding the contract event 0x7c8a455442452f53fa449e30036d338e8ecae8d29762204c2ec98b685ad5e36c.
//
// Solidity: event EventUpdateTemplate(uint64 templateId)
func (_IAct *IActFilterer) FilterEventUpdateTemplate(opts *bind.FilterOpts) (*IActEventUpdateTemplateIterator, error) {

	logs, sub, err := _IAct.contract.FilterLogs(opts, "EventUpdateTemplate")
	if err != nil {
		return nil, err
	}
	return &IActEventUpdateTemplateIterator{contract: _IAct.contract, event: "EventUpdateTemplate", logs: logs, sub: sub}, nil
}

// WatchEventUpdateTemplate is a free log subscription operation binding the contract event 0x7c8a455442452f53fa449e30036d338e8ecae8d29762204c2ec98b685ad5e36c.
//
// Solidity: event EventUpdateTemplate(uint64 templateId)
func (_IAct *IActFilterer) WatchEventUpdateTemplate(opts *bind.WatchOpts, sink chan<- *IActEventUpdateTemplate) (event.Subscription, error) {

	logs, sub, err := _IAct.contract.WatchLogs(opts, "EventUpdateTemplate")
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(IActEventUpdateTemplate)
				if err := _IAct.contract.UnpackLog(event, "EventUpdateTemplate", log); err != nil {
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

// ParseEventUpdateTemplate is a log parse operation binding the contract event 0x7c8a455442452f53fa449e30036d338e8ecae8d29762204c2ec98b685ad5e36c.
//
// Solidity: event EventUpdateTemplate(uint64 templateId)
func (_IAct *IActFilterer) ParseEventUpdateTemplate(log types.Log) (*IActEventUpdateTemplate, error) {
	event := new(IActEventUpdateTemplate)
	if err := _IAct.contract.UnpackLog(event, "EventUpdateTemplate", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}
