// Code generated - DO NOT EDIT.
// This file is a generated binding and any manual changes will be lost.

package json_user

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

// JsonUserMetaData contains all meta data concerning the JsonUser contract.
var JsonUserMetaData = &bind.MetaData{
	ABI: "[{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"internalType\":\"int8\",\"name\":\"\",\"type\":\"int8\"}],\"name\":\"ErrorHappened\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"name\":\"Ok\",\"type\":\"event\"},{\"inputs\":[],\"name\":\"doSomeJsonActions\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"}]",
	Bin: "0x6080604052348015600f57600080fd5b50610b578061001f6000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c8063d0e5febb14610030575b600080fd5b61003861004e565b604051610045919061040f565b60405180910390f35b60008061090473ffffffffffffffffffffffffffffffffffffffff1663a12b6d386040518163ffffffff1660e01b8152600401600060405180830381865afa15801561009e573d6000803e3d6000fd5b505050506040513d6000823e3d601f19601f820116820180604052508101906100c7919061059f565b9050600061090473ffffffffffffffffffffffffffffffffffffffff1663369c1f3883607b6040518363ffffffff1660e01b81526004016101099291906106e9565b600060405180830381865afa158015610126573d6000803e3d6000fd5b505050506040513d6000823e3d601f19601f8201168201806040525081019061014f919061059f565b905061090473ffffffffffffffffffffffffffffffffffffffff16634f90bdc88260016040518363ffffffff1660e01b815260040161018f929190610778565b600060405180830381865afa1580156101ac573d6000803e3d6000fd5b505050506040513d6000823e3d601f19601f820116820180604052508101906101d5919061059f565b905061090473ffffffffffffffffffffffffffffffffffffffff1663e378394d826040518263ffffffff1660e01b8152600401610212919061089f565b600060405180830381865afa15801561022f573d6000803e3d6000fd5b505050506040513d6000823e3d601f19601f82011682018060405250810190610258919061059f565b9050600061090473ffffffffffffffffffffffffffffffffffffffff16635d19cf1e836040518263ffffffff1660e01b815260040161029791906108e7565b602060405180830381865afa1580156102b4573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102d89190610948565b9050600061090473ffffffffffffffffffffffffffffffffffffffff16633fe9170e846040518263ffffffff1660e01b81526004016103179190610975565b600060405180830381865afa158015610334573d6000803e3d6000fd5b505050506040513d6000823e3d601f19601f8201168201806040525081019061035d9190610a4b565b905060001515821515036103b0577f265e2b988dfc8e93a6429b673d378fb8914058e8a168f6bb3516c06ae771cac5600260405161039b9190610adc565b60405180910390a160009450505050506103f1565b7f185b26e694e9899192f588fd75aa87b64b222dfa94878d88e7d2706043e6dcaf81516040516103e09190610b06565b60405180910390a160019450505050505b90565b60008115159050919050565b610409816103f4565b82525050565b60006020820190506104246000830184610400565b92915050565b6000604051905090565b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b61049182610448565b810181811067ffffffffffffffff821117156104b0576104af610459565b5b80604052505050565b60006104c361042a565b90506104cf8282610488565b919050565b600067ffffffffffffffff8211156104ef576104ee610459565b5b6104f882610448565b9050602081019050919050565b60005b83811015610523578082015181840152602081019050610508565b60008484015250505050565b600061054261053d846104d4565b6104b9565b90508281526020810184848401111561055e5761055d610443565b5b610569848285610505565b509392505050565b600082601f8301126105865761058561043e565b5b815161059684826020860161052f565b91505092915050565b6000602082840312156105b5576105b4610434565b5b600082015167ffffffffffffffff8111156105d3576105d2610439565b5b6105df84828501610571565b91505092915050565b600081519050919050565b600082825260208201905092915050565b600061060f826105e8565b61061981856105f3565b9350610629818560208601610505565b61063281610448565b840191505092915050565b600082825260208201905092915050565b7f6b65793300000000000000000000000000000000000000000000000000000000600082015250565b600061068460048361063d565b915061068f8261064e565b602082019050919050565b6000819050919050565b6000819050919050565b6000819050919050565b60006106d36106ce6106c98461069a565b6106ae565b6106a4565b9050919050565b6106e3816106b8565b82525050565b600060608201905081810360008301526107038185610604565b9050818103602083015261071681610677565b905061072560408301846106da565b9392505050565b7f6b65793100000000000000000000000000000000000000000000000000000000600082015250565b600061076260048361063d565b915061076d8261072c565b602082019050919050565b600060608201905081810360008301526107928185610604565b905081810360208301526107a581610755565b90506107b46040830184610400565b9392505050565b7f6b65793400000000000000000000000000000000000000000000000000000000600082015250565b60006107f160048361063d565b91506107fc826107bb565b602082019050919050565b7f666f6f62757a7a666f6f62757a7a666f6f62757a7a666f6f62757a7a666f6f6260008201527f757a7a666f6f62757a7a666f6f62757a7a666f6f62757a7a666f6f62757a7a6660208201527f6f6f62757a7a0000000000000000000000000000000000000000000000000000604082015250565b600061088960468361063d565b915061089482610807565b606082019050919050565b600060608201905081810360008301526108b98184610604565b905081810360208301526108cc816107e4565b905081810360408301526108df8161087c565b905092915050565b600060408201905081810360008301526109018184610604565b9050818103602083015261091481610755565b905092915050565b610925816103f4565b811461093057600080fd5b50565b6000815190506109428161091c565b92915050565b60006020828403121561095e5761095d610434565b5b600061096c84828501610933565b91505092915050565b6000604082019050818103600083015261098f8184610604565b905081810360208301526109a2816107e4565b905092915050565b600067ffffffffffffffff8211156109c5576109c4610459565b5b6109ce82610448565b9050602081019050919050565b60006109ee6109e9846109aa565b6104b9565b905082815260208101848484011115610a0a57610a09610443565b5b610a15848285610505565b509392505050565b600082601f830112610a3257610a3161043e565b5b8151610a428482602086016109db565b91505092915050565b600060208284031215610a6157610a60610434565b5b600082015167ffffffffffffffff811115610a7f57610a7e610439565b5b610a8b84828501610a1d565b91505092915050565b6000819050919050565b60008160000b9050919050565b6000610ac6610ac1610abc84610a94565b6106ae565b610a9e565b9050919050565b610ad681610aab565b82525050565b6000602082019050610af16000830184610acd565b92915050565b610b00816106a4565b82525050565b6000602082019050610b1b6000830184610af7565b9291505056fea2646970667358221220334d4ec73b961599a08faf0ef3fc0d81edb4be8535f6b2651bec32e2fabc2c6864736f6c634300081c0033",
}

// JsonUserABI is the input ABI used to generate the binding from.
// Deprecated: Use JsonUserMetaData.ABI instead.
var JsonUserABI = JsonUserMetaData.ABI

// JsonUserBin is the compiled bytecode used for deploying new contracts.
// Deprecated: Use JsonUserMetaData.Bin instead.
var JsonUserBin = JsonUserMetaData.Bin

// DeployJsonUser deploys a new Ethereum contract, binding an instance of JsonUser to it.
func DeployJsonUser(auth *bind.TransactOpts, backend bind.ContractBackend) (common.Address, *types.Transaction, *JsonUser, error) {
	parsed, err := JsonUserMetaData.GetAbi()
	if err != nil {
		return common.Address{}, nil, nil, err
	}
	if parsed == nil {
		return common.Address{}, nil, nil, errors.New("GetABI returned nil")
	}

	address, tx, contract, err := bind.DeployContract(auth, *parsed, common.FromHex(JsonUserBin), backend)
	if err != nil {
		return common.Address{}, nil, nil, err
	}
	return address, tx, &JsonUser{JsonUserCaller: JsonUserCaller{contract: contract}, JsonUserTransactor: JsonUserTransactor{contract: contract}, JsonUserFilterer: JsonUserFilterer{contract: contract}}, nil
}

// JsonUser is an auto generated Go binding around an Ethereum contract.
type JsonUser struct {
	JsonUserCaller     // Read-only binding to the contract
	JsonUserTransactor // Write-only binding to the contract
	JsonUserFilterer   // Log filterer for contract events
}

// JsonUserCaller is an auto generated read-only Go binding around an Ethereum contract.
type JsonUserCaller struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// JsonUserTransactor is an auto generated write-only Go binding around an Ethereum contract.
type JsonUserTransactor struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// JsonUserFilterer is an auto generated log filtering Go binding around an Ethereum contract events.
type JsonUserFilterer struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// JsonUserSession is an auto generated Go binding around an Ethereum contract,
// with pre-set call and transact options.
type JsonUserSession struct {
	Contract     *JsonUser         // Generic contract binding to set the session for
	CallOpts     bind.CallOpts     // Call options to use throughout this session
	TransactOpts bind.TransactOpts // Transaction auth options to use throughout this session
}

// JsonUserCallerSession is an auto generated read-only Go binding around an Ethereum contract,
// with pre-set call options.
type JsonUserCallerSession struct {
	Contract *JsonUserCaller // Generic contract caller binding to set the session for
	CallOpts bind.CallOpts   // Call options to use throughout this session
}

// JsonUserTransactorSession is an auto generated write-only Go binding around an Ethereum contract,
// with pre-set transact options.
type JsonUserTransactorSession struct {
	Contract     *JsonUserTransactor // Generic contract transactor binding to set the session for
	TransactOpts bind.TransactOpts   // Transaction auth options to use throughout this session
}

// JsonUserRaw is an auto generated low-level Go binding around an Ethereum contract.
type JsonUserRaw struct {
	Contract *JsonUser // Generic contract binding to access the raw methods on
}

// JsonUserCallerRaw is an auto generated low-level read-only Go binding around an Ethereum contract.
type JsonUserCallerRaw struct {
	Contract *JsonUserCaller // Generic read-only contract binding to access the raw methods on
}

// JsonUserTransactorRaw is an auto generated low-level write-only Go binding around an Ethereum contract.
type JsonUserTransactorRaw struct {
	Contract *JsonUserTransactor // Generic write-only contract binding to access the raw methods on
}

// NewJsonUser creates a new instance of JsonUser, bound to a specific deployed contract.
func NewJsonUser(address common.Address, backend bind.ContractBackend) (*JsonUser, error) {
	contract, err := bindJsonUser(address, backend, backend, backend)
	if err != nil {
		return nil, err
	}
	return &JsonUser{JsonUserCaller: JsonUserCaller{contract: contract}, JsonUserTransactor: JsonUserTransactor{contract: contract}, JsonUserFilterer: JsonUserFilterer{contract: contract}}, nil
}

// NewJsonUserCaller creates a new read-only instance of JsonUser, bound to a specific deployed contract.
func NewJsonUserCaller(address common.Address, caller bind.ContractCaller) (*JsonUserCaller, error) {
	contract, err := bindJsonUser(address, caller, nil, nil)
	if err != nil {
		return nil, err
	}
	return &JsonUserCaller{contract: contract}, nil
}

// NewJsonUserTransactor creates a new write-only instance of JsonUser, bound to a specific deployed contract.
func NewJsonUserTransactor(address common.Address, transactor bind.ContractTransactor) (*JsonUserTransactor, error) {
	contract, err := bindJsonUser(address, nil, transactor, nil)
	if err != nil {
		return nil, err
	}
	return &JsonUserTransactor{contract: contract}, nil
}

// NewJsonUserFilterer creates a new log filterer instance of JsonUser, bound to a specific deployed contract.
func NewJsonUserFilterer(address common.Address, filterer bind.ContractFilterer) (*JsonUserFilterer, error) {
	contract, err := bindJsonUser(address, nil, nil, filterer)
	if err != nil {
		return nil, err
	}
	return &JsonUserFilterer{contract: contract}, nil
}

// bindJsonUser binds a generic wrapper to an already deployed contract.
func bindJsonUser(address common.Address, caller bind.ContractCaller, transactor bind.ContractTransactor, filterer bind.ContractFilterer) (*bind.BoundContract, error) {
	parsed, err := JsonUserMetaData.GetAbi()
	if err != nil {
		return nil, err
	}
	return bind.NewBoundContract(address, *parsed, caller, transactor, filterer), nil
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_JsonUser *JsonUserRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _JsonUser.Contract.JsonUserCaller.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_JsonUser *JsonUserRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _JsonUser.Contract.JsonUserTransactor.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_JsonUser *JsonUserRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _JsonUser.Contract.JsonUserTransactor.contract.Transact(opts, method, params...)
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_JsonUser *JsonUserCallerRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _JsonUser.Contract.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_JsonUser *JsonUserTransactorRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _JsonUser.Contract.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_JsonUser *JsonUserTransactorRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _JsonUser.Contract.contract.Transact(opts, method, params...)
}

// DoSomeJsonActions is a paid mutator transaction binding the contract method 0xd0e5febb.
//
// Solidity: function doSomeJsonActions() returns(bool)
func (_JsonUser *JsonUserTransactor) DoSomeJsonActions(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _JsonUser.contract.Transact(opts, "doSomeJsonActions")
}

// DoSomeJsonActions is a paid mutator transaction binding the contract method 0xd0e5febb.
//
// Solidity: function doSomeJsonActions() returns(bool)
func (_JsonUser *JsonUserSession) DoSomeJsonActions() (*types.Transaction, error) {
	return _JsonUser.Contract.DoSomeJsonActions(&_JsonUser.TransactOpts)
}

// DoSomeJsonActions is a paid mutator transaction binding the contract method 0xd0e5febb.
//
// Solidity: function doSomeJsonActions() returns(bool)
func (_JsonUser *JsonUserTransactorSession) DoSomeJsonActions() (*types.Transaction, error) {
	return _JsonUser.Contract.DoSomeJsonActions(&_JsonUser.TransactOpts)
}

// JsonUserErrorHappenedIterator is returned from FilterErrorHappened and is used to iterate over the raw logs and unpacked data for ErrorHappened events raised by the JsonUser contract.
type JsonUserErrorHappenedIterator struct {
	Event *JsonUserErrorHappened // Event containing the contract specifics and raw log

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
func (it *JsonUserErrorHappenedIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(JsonUserErrorHappened)
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
		it.Event = new(JsonUserErrorHappened)
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
func (it *JsonUserErrorHappenedIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *JsonUserErrorHappenedIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// JsonUserErrorHappened represents a ErrorHappened event raised by the JsonUser contract.
type JsonUserErrorHappened struct {
	Arg0 int8
	Raw  types.Log // Blockchain specific contextual infos
}

// FilterErrorHappened is a free log retrieval operation binding the contract event 0x265e2b988dfc8e93a6429b673d378fb8914058e8a168f6bb3516c06ae771cac5.
//
// Solidity: event ErrorHappened(int8 arg0)
func (_JsonUser *JsonUserFilterer) FilterErrorHappened(opts *bind.FilterOpts) (*JsonUserErrorHappenedIterator, error) {

	logs, sub, err := _JsonUser.contract.FilterLogs(opts, "ErrorHappened")
	if err != nil {
		return nil, err
	}
	return &JsonUserErrorHappenedIterator{contract: _JsonUser.contract, event: "ErrorHappened", logs: logs, sub: sub}, nil
}

// WatchErrorHappened is a free log subscription operation binding the contract event 0x265e2b988dfc8e93a6429b673d378fb8914058e8a168f6bb3516c06ae771cac5.
//
// Solidity: event ErrorHappened(int8 arg0)
func (_JsonUser *JsonUserFilterer) WatchErrorHappened(opts *bind.WatchOpts, sink chan<- *JsonUserErrorHappened) (event.Subscription, error) {

	logs, sub, err := _JsonUser.contract.WatchLogs(opts, "ErrorHappened")
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(JsonUserErrorHappened)
				if err := _JsonUser.contract.UnpackLog(event, "ErrorHappened", log); err != nil {
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

// ParseErrorHappened is a log parse operation binding the contract event 0x265e2b988dfc8e93a6429b673d378fb8914058e8a168f6bb3516c06ae771cac5.
//
// Solidity: event ErrorHappened(int8 arg0)
func (_JsonUser *JsonUserFilterer) ParseErrorHappened(log types.Log) (*JsonUserErrorHappened, error) {
	event := new(JsonUserErrorHappened)
	if err := _JsonUser.contract.UnpackLog(event, "ErrorHappened", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// JsonUserOkIterator is returned from FilterOk and is used to iterate over the raw logs and unpacked data for Ok events raised by the JsonUser contract.
type JsonUserOkIterator struct {
	Event *JsonUserOk // Event containing the contract specifics and raw log

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
func (it *JsonUserOkIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(JsonUserOk)
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
		it.Event = new(JsonUserOk)
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
func (it *JsonUserOkIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *JsonUserOkIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// JsonUserOk represents a Ok event raised by the JsonUser contract.
type JsonUserOk struct {
	Arg0 *big.Int
	Raw  types.Log // Blockchain specific contextual infos
}

// FilterOk is a free log retrieval operation binding the contract event 0x185b26e694e9899192f588fd75aa87b64b222dfa94878d88e7d2706043e6dcaf.
//
// Solidity: event Ok(uint256 arg0)
func (_JsonUser *JsonUserFilterer) FilterOk(opts *bind.FilterOpts) (*JsonUserOkIterator, error) {

	logs, sub, err := _JsonUser.contract.FilterLogs(opts, "Ok")
	if err != nil {
		return nil, err
	}
	return &JsonUserOkIterator{contract: _JsonUser.contract, event: "Ok", logs: logs, sub: sub}, nil
}

// WatchOk is a free log subscription operation binding the contract event 0x185b26e694e9899192f588fd75aa87b64b222dfa94878d88e7d2706043e6dcaf.
//
// Solidity: event Ok(uint256 arg0)
func (_JsonUser *JsonUserFilterer) WatchOk(opts *bind.WatchOpts, sink chan<- *JsonUserOk) (event.Subscription, error) {

	logs, sub, err := _JsonUser.contract.WatchLogs(opts, "Ok")
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(JsonUserOk)
				if err := _JsonUser.contract.UnpackLog(event, "Ok", log); err != nil {
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

// ParseOk is a log parse operation binding the contract event 0x185b26e694e9899192f588fd75aa87b64b222dfa94878d88e7d2706043e6dcaf.
//
// Solidity: event Ok(uint256 arg0)
func (_JsonUser *JsonUserFilterer) ParseOk(log types.Log) (*JsonUserOk, error) {
	event := new(JsonUserOk)
	if err := _JsonUser.contract.UnpackLog(event, "Ok", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}
