package statedb_test

import (
	"math/big"
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/ethereum/go-ethereum/common"
	ethtypes "github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/core/vm"
	"github.com/ethereum/go-ethereum/crypto"
	"github.com/evmos/ethermint/x/evm/statedb"
	"github.com/stretchr/testify/suite"
)

var (
	address       common.Address   = common.BigToAddress(big.NewInt(101))
	address2      common.Address   = common.BigToAddress(big.NewInt(102))
	address3      common.Address   = common.BigToAddress(big.NewInt(103))
	blockHash     common.Hash      = common.BigToHash(big.NewInt(9999))
	emptyTxConfig statedb.TxConfig = statedb.NewEmptyTxConfig(blockHash)
)

type StateDBTestSuite struct {
	suite.Suite
}

func (suite *StateDBTestSuite) TestAccount() {
	key1 := common.BigToHash(big.NewInt(1))
	value1 := common.BigToHash(big.NewInt(2))
	key2 := common.BigToHash(big.NewInt(3))
	value2 := common.BigToHash(big.NewInt(4))
	testCases := []struct {
		name     string
		malleate func(*statedb.StateDB)
	}{
		{"non-exist account", func(db *statedb.StateDB) {
			suite.Require().Equal(false, db.Exist(address))
			suite.Require().Equal(true, db.Empty(address))
			suite.Require().Equal(big.NewInt(0), db.GetBalance(address))
			suite.Require().Equal([]byte(nil), db.GetCode(address))
			suite.Require().Equal(common.Hash{}, db.GetCodeHash(address))
			suite.Require().Equal(uint64(0), db.GetNonce(address))
		}},
		{"empty account", func(db *statedb.StateDB) {
			db.CreateAccount(address)
			suite.Require().NoError(db.Commit())

			keeper := db.Keeper().(*MockKeeper)
			acct := keeper.accounts[address]
			suite.Require().Equal(statedb.NewEmptyAccount(), &acct.account)
			suite.Require().Empty(acct.states)
			suite.Require().False(acct.account.IsContract())

			db = statedb.New(sdk.Context{}, keeper, emptyTxConfig)
			suite.Require().Equal(true, db.Exist(address))
			suite.Require().Equal(true, db.Empty(address))
			suite.Require().Equal(big.NewInt(0), db.GetBalance(address))
			suite.Require().Equal([]byte(nil), db.GetCode(address))
			suite.Require().Equal(common.BytesToHash(emptyCodeHash), db.GetCodeHash(address))
			suite.Require().Equal(uint64(0), db.GetNonce(address))
		}},
		{"suicide", func(db *statedb.StateDB) {
			// non-exist account.
			suite.Require().False(db.Suicide(address))
			suite.Require().False(db.HasSuicided(address))

			// create a contract account
			db.CreateAccount(address)
			db.SetCode(address, []byte("hello world"))
			db.AddBalance(address, big.NewInt(100))
			db.SetState(address, key1, value1)
			db.SetState(address, key2, value2)
			suite.Require().NoError(db.Commit())

			// suicide
			db = statedb.New(sdk.Context{}, db.Keeper(), emptyTxConfig)
			suite.Require().False(db.HasSuicided(address))
			suite.Require().True(db.Suicide(address))

			// check dirty state
			suite.Require().True(db.HasSuicided(address))
			// balance is cleared
			suite.Require().Equal(big.NewInt(0), db.GetBalance(address))
			// but code and state are still accessible in dirty state
			suite.Require().Equal(value1, db.GetState(address, key1))
			suite.Require().Equal([]byte("hello world"), db.GetCode(address))

			suite.Require().NoError(db.Commit())

			// not accessible from StateDB anymore
			db = statedb.New(sdk.Context{}, db.Keeper(), emptyTxConfig)
			suite.Require().False(db.Exist(address))

			// and cleared in keeper too
			keeper := db.Keeper().(*MockKeeper)
			suite.Require().Empty(keeper.accounts)
			suite.Require().Empty(keeper.codes)
		}},
	}
	for _, tc := range testCases {
		suite.Run(tc.name, func() {
			keeper := NewMockKeeper()
			db := statedb.New(sdk.Context{}, keeper, emptyTxConfig)
			tc.malleate(db)
		})
	}
}

func (suite *StateDBTestSuite) TestAccountOverride() {
	keeper := NewMockKeeper()
	db := statedb.New(sdk.Context{}, keeper, emptyTxConfig)
	// test balance carry over when overwritten
	amount := big.NewInt(1)

	// init an EOA account, account overriden only happens on EOA account.
	db.AddBalance(address, amount)
	db.SetNonce(address, 1)

	// override
	db.CreateAccount(address)

	// check balance is not lost
	suite.Require().Equal(amount, db.GetBalance(address))
	// but nonce is reset
	suite.Require().Equal(uint64(0), db.GetNonce(address))
}

func (suite *StateDBTestSuite) TestDBError() {
	testCases := []struct {
		name     string
		malleate func(vm.StateDB)
	}{
		{"set account", func(db vm.StateDB) {
			db.SetNonce(errAddress, 1)
		}},
		{"delete account", func(db vm.StateDB) {
			db.SetNonce(errAddress, 1)
			suite.Require().True(db.Suicide(errAddress))
		}},
	}
	for _, tc := range testCases {
		db := statedb.New(sdk.Context{}, NewMockKeeper(), emptyTxConfig)
		tc.malleate(db)
		suite.Require().Error(db.Commit())
	}
}

func (suite *StateDBTestSuite) TestBalance() {
	// NOTE: no need to test overflow/underflow, that is guaranteed by evm implementation.
	testCases := []struct {
		name       string
		malleate   func(*statedb.StateDB)
		expBalance *big.Int
	}{
		{"add balance", func(db *statedb.StateDB) {
			db.AddBalance(address, big.NewInt(10))
		}, big.NewInt(10)},
		{"sub balance", func(db *statedb.StateDB) {
			db.AddBalance(address, big.NewInt(10))
			// get dirty balance
			suite.Require().Equal(big.NewInt(10), db.GetBalance(address))
			db.SubBalance(address, big.NewInt(2))
		}, big.NewInt(8)},
		{"add zero balance", func(db *statedb.StateDB) {
			db.AddBalance(address, big.NewInt(0))
		}, big.NewInt(0)},
		{"sub zero balance", func(db *statedb.StateDB) {
			db.SubBalance(address, big.NewInt(0))
		}, big.NewInt(0)},
	}

	for _, tc := range testCases {
		suite.Run(tc.name, func() {
			keeper := NewMockKeeper()
			db := statedb.New(sdk.Context{}, keeper, emptyTxConfig)
			tc.malleate(db)

			// check dirty state
			suite.Require().Equal(tc.expBalance, db.GetBalance(address))
			suite.Require().NoError(db.Commit())
			// check committed balance too
			suite.Require().Equal(tc.expBalance, keeper.accounts[address].account.Balance)
		})
	}
}

func (suite *StateDBTestSuite) TestState() {
	key1 := common.BigToHash(big.NewInt(1))
	value1 := common.BigToHash(big.NewInt(1))
	testCases := []struct {
		name      string
		malleate  func(*statedb.StateDB)
		expStates statedb.Storage
	}{
		{"empty state", func(db *statedb.StateDB) {
		}, nil},
		{"set empty value", func(db *statedb.StateDB) {
			db.SetState(address, key1, common.Hash{})
		}, statedb.Storage{}},
		{"noop state change", func(db *statedb.StateDB) {
			db.SetState(address, key1, value1)
			db.SetState(address, key1, common.Hash{})
		}, statedb.Storage{}},
		{"set state", func(db *statedb.StateDB) {
			// check empty initial state
			suite.Require().Equal(common.Hash{}, db.GetState(address, key1))
			suite.Require().Equal(common.Hash{}, db.GetCommittedState(address, key1))

			// set state
			db.SetState(address, key1, value1)
			// query dirty state
			suite.Require().Equal(value1, db.GetState(address, key1))
			// check committed state is still not exist
			suite.Require().Equal(common.Hash{}, db.GetCommittedState(address, key1))

			// set same value again, should be noop
			db.SetState(address, key1, value1)
			suite.Require().Equal(value1, db.GetState(address, key1))
		}, statedb.Storage{
			key1: value1,
		}},
	}

	for _, tc := range testCases {
		suite.Run(tc.name, func() {
			keeper := NewMockKeeper()
			db := statedb.New(sdk.Context{}, keeper, emptyTxConfig)
			tc.malleate(db)
			suite.Require().NoError(db.Commit())

			// check committed states in keeper
			suite.Require().Equal(tc.expStates, keeper.accounts[address].states)

			// check ForEachStorage
			db = statedb.New(sdk.Context{}, keeper, emptyTxConfig)
			collected := CollectContractStorage(db)
			if len(tc.expStates) > 0 {
				suite.Require().Equal(tc.expStates, collected)
			} else {
				suite.Require().Empty(collected)
			}
		})
	}
}

func (suite *StateDBTestSuite) TestCode() {
	code := []byte("hello world")
	codeHash := crypto.Keccak256Hash(code)

	testCases := []struct {
		name        string
		malleate    func(vm.StateDB)
		expCode     []byte
		expCodeHash common.Hash
	}{
		{"non-exist account", func(vm.StateDB) {}, nil, common.Hash{}},
		{"empty account", func(db vm.StateDB) {
			db.CreateAccount(address)
		}, nil, common.BytesToHash(emptyCodeHash)},
		{"set code", func(db vm.StateDB) {
			db.SetCode(address, code)
		}, code, codeHash},
	}

	for _, tc := range testCases {
		suite.Run(tc.name, func() {
			keeper := NewMockKeeper()
			db := statedb.New(sdk.Context{}, keeper, emptyTxConfig)
			tc.malleate(db)

			// check dirty state
			suite.Require().Equal(tc.expCode, db.GetCode(address))
			suite.Require().Equal(len(tc.expCode), db.GetCodeSize(address))
			suite.Require().Equal(tc.expCodeHash, db.GetCodeHash(address))

			suite.Require().NoError(db.Commit())

			// check again
			db = statedb.New(sdk.Context{}, keeper, emptyTxConfig)
			suite.Require().Equal(tc.expCode, db.GetCode(address))
			suite.Require().Equal(len(tc.expCode), db.GetCodeSize(address))
			suite.Require().Equal(tc.expCodeHash, db.GetCodeHash(address))
		})
	}
}

func (suite *StateDBTestSuite) TestRevertSnapshot() {
	v1 := common.BigToHash(big.NewInt(1))
	v2 := common.BigToHash(big.NewInt(2))
	v3 := common.BigToHash(big.NewInt(3))
	testCases := []struct {
		name     string
		malleate func(vm.StateDB)
	}{
		{"set state", func(db vm.StateDB) {
			db.SetState(address, v1, v3)
		}},
		{"set nonce", func(db vm.StateDB) {
			db.SetNonce(address, 10)
		}},
		{"change balance", func(db vm.StateDB) {
			db.AddBalance(address, big.NewInt(10))
			db.SubBalance(address, big.NewInt(5))
		}},
		{"override account", func(db vm.StateDB) {
			db.CreateAccount(address)
		}},
		{"set code", func(db vm.StateDB) {
			db.SetCode(address, []byte("hello world"))
		}},
		{"suicide", func(db vm.StateDB) {
			db.SetState(address, v1, v2)
			db.SetCode(address, []byte("hello world"))
			suite.Require().True(db.Suicide(address))
		}},
		{"add log", func(db vm.StateDB) {
			db.AddLog(&ethtypes.Log{
				Address: address,
			})
		}},
		{"add refund", func(db vm.StateDB) {
			db.AddRefund(10)
			db.SubRefund(5)
		}},
		{"access list", func(db vm.StateDB) {
			db.AddAddressToAccessList(address)
			db.AddSlotToAccessList(address, v1)
		}},
	}
	for _, tc := range testCases {
		suite.Run(tc.name, func() {
			ctx := sdk.Context{}
			keeper := NewMockKeeper()

			{
				// do some arbitrary changes to the storage
				db := statedb.New(ctx, keeper, emptyTxConfig)
				db.SetNonce(address, 1)
				db.AddBalance(address, big.NewInt(100))
				db.SetCode(address, []byte("hello world"))
				db.SetState(address, v1, v2)
				db.SetNonce(address2, 1)
				suite.Require().NoError(db.Commit())
			}

			originalKeeper := keeper.Clone()

			// run test
			db := statedb.New(ctx, keeper, emptyTxConfig)
			rev := db.Snapshot()
			tc.malleate(db)
			db.RevertToSnapshot(rev)

			// check empty states after revert
			suite.Require().Zero(db.GetRefund())
			suite.Require().Empty(db.Logs())

			suite.Require().NoError(db.Commit())

			// check keeper should stay the same
			suite.Require().Equal(originalKeeper, keeper)
		})
	}
}

func (suite *StateDBTestSuite) TestNestedSnapshot() {
	key := common.BigToHash(big.NewInt(1))
	value1 := common.BigToHash(big.NewInt(1))
	value2 := common.BigToHash(big.NewInt(2))

	db := statedb.New(sdk.Context{}, NewMockKeeper(), emptyTxConfig)

	rev1 := db.Snapshot()
	db.SetState(address, key, value1)

	rev2 := db.Snapshot()
	db.SetState(address, key, value2)
	suite.Require().Equal(value2, db.GetState(address, key))

	db.RevertToSnapshot(rev2)
	suite.Require().Equal(value1, db.GetState(address, key))

	db.RevertToSnapshot(rev1)
	suite.Require().Equal(common.Hash{}, db.GetState(address, key))
}

func (suite *StateDBTestSuite) TestInvalidSnapshotId() {
	db := statedb.New(sdk.Context{}, NewMockKeeper(), emptyTxConfig)
	suite.Require().Panics(func() {
		db.RevertToSnapshot(1)
	})
}

func (suite *StateDBTestSuite) TestAccessList() {
	value1 := common.BigToHash(big.NewInt(1))
	value2 := common.BigToHash(big.NewInt(2))

	testCases := []struct {
		name     string
		malleate func(vm.StateDB)
	}{
		{"add address", func(db vm.StateDB) {
			suite.Require().False(db.AddressInAccessList(address))
			db.AddAddressToAccessList(address)
			suite.Require().True(db.AddressInAccessList(address))

			addrPresent, slotPresent := db.SlotInAccessList(address, value1)
			suite.Require().True(addrPresent)
			suite.Require().False(slotPresent)

			// add again, should be no-op
			db.AddAddressToAccessList(address)
			suite.Require().True(db.AddressInAccessList(address))
		}},
		{"add slot", func(db vm.StateDB) {
			addrPresent, slotPresent := db.SlotInAccessList(address, value1)
			suite.Require().False(addrPresent)
			suite.Require().False(slotPresent)
			db.AddSlotToAccessList(address, value1)
			addrPresent, slotPresent = db.SlotInAccessList(address, value1)
			suite.Require().True(addrPresent)
			suite.Require().True(slotPresent)

			// add another slot
			db.AddSlotToAccessList(address, value2)
			addrPresent, slotPresent = db.SlotInAccessList(address, value2)
			suite.Require().True(addrPresent)
			suite.Require().True(slotPresent)

			// add again, should be noop
			db.AddSlotToAccessList(address, value2)
			addrPresent, slotPresent = db.SlotInAccessList(address, value2)
			suite.Require().True(addrPresent)
			suite.Require().True(slotPresent)
		}},
		{"prepare access list", func(db vm.StateDB) {
			al := ethtypes.AccessList{{
				Address:     address3,
				StorageKeys: []common.Hash{value1},
			}}
			db.PrepareAccessList(address, &address2, vm.PrecompiledAddressesBerlin, al)

			// check sender and dst
			suite.Require().True(db.AddressInAccessList(address))
			suite.Require().True(db.AddressInAccessList(address2))
			// check precompiles
			suite.Require().True(db.AddressInAccessList(common.BytesToAddress([]byte{1})))
			// check AccessList
			suite.Require().True(db.AddressInAccessList(address3))
			addrPresent, slotPresent := db.SlotInAccessList(address3, value1)
			suite.Require().True(addrPresent)
			suite.Require().True(slotPresent)
			addrPresent, slotPresent = db.SlotInAccessList(address3, value2)
			suite.Require().True(addrPresent)
			suite.Require().False(slotPresent)
		}},
	}

	for _, tc := range testCases {
		db := statedb.New(sdk.Context{}, NewMockKeeper(), emptyTxConfig)
		tc.malleate(db)
	}
}

func (suite *StateDBTestSuite) TestLog() {
	txHash := common.BytesToHash([]byte("tx"))
	// use a non-default tx config
	txConfig := statedb.NewTxConfig(
		blockHash,
		txHash,
		1, 1,
	)
	db := statedb.New(sdk.Context{}, NewMockKeeper(), txConfig)
	data := []byte("hello world")
	db.AddLog(&ethtypes.Log{
		Address:     address,
		Topics:      []common.Hash{},
		Data:        data,
		BlockNumber: 1,
	})
	suite.Require().Equal(1, len(db.Logs()))
	expecedLog := &ethtypes.Log{
		Address:     address,
		Topics:      []common.Hash{},
		Data:        data,
		BlockNumber: 1,
		BlockHash:   blockHash,
		TxHash:      txHash,
		TxIndex:     1,
		Index:       1,
	}
	suite.Require().Equal(expecedLog, db.Logs()[0])

	db.AddLog(&ethtypes.Log{
		Address:     address,
		Topics:      []common.Hash{},
		Data:        data,
		BlockNumber: 1,
	})
	suite.Require().Equal(2, len(db.Logs()))
	expecedLog.Index++
	suite.Require().Equal(expecedLog, db.Logs()[1])
}

func (suite *StateDBTestSuite) TestRefund() {
	testCases := []struct {
		name      string
		malleate  func(vm.StateDB)
		expRefund uint64
		expPanic  bool
	}{
		{"add refund", func(db vm.StateDB) {
			db.AddRefund(uint64(10))
		}, 10, false},
		{"sub refund", func(db vm.StateDB) {
			db.AddRefund(uint64(10))
			db.SubRefund(uint64(5))
		}, 5, false},
		{"negative refund counter", func(db vm.StateDB) {
			db.AddRefund(uint64(5))
			db.SubRefund(uint64(10))
		}, 0, true},
	}
	for _, tc := range testCases {
		db := statedb.New(sdk.Context{}, NewMockKeeper(), emptyTxConfig)
		if !tc.expPanic {
			tc.malleate(db)
			suite.Require().Equal(tc.expRefund, db.GetRefund())
		} else {
			suite.Require().Panics(func() {
				tc.malleate(db)
			})
		}
	}
}

func (suite *StateDBTestSuite) TestIterateStorage() {
	key1 := common.BigToHash(big.NewInt(1))
	value1 := common.BigToHash(big.NewInt(2))
	key2 := common.BigToHash(big.NewInt(3))
	value2 := common.BigToHash(big.NewInt(4))

	keeper := NewMockKeeper()
	db := statedb.New(sdk.Context{}, keeper, emptyTxConfig)
	db.SetState(address, key1, value1)
	db.SetState(address, key2, value2)

	// ForEachStorage only iterate committed state
	suite.Require().Empty(CollectContractStorage(db))

	suite.Require().NoError(db.Commit())

	storage := CollectContractStorage(db)
	suite.Require().Equal(2, len(storage))
	suite.Require().Equal(keeper.accounts[address].states, storage)

	// break early iteration
	storage = make(statedb.Storage)
	db.ForEachStorage(address, func(k, v common.Hash) bool {
		storage[k] = v
		// return false to break early
		return false
	})
	suite.Require().Equal(1, len(storage))
}

func CollectContractStorage(db vm.StateDB) statedb.Storage {
	storage := make(statedb.Storage)
	db.ForEachStorage(address, func(k, v common.Hash) bool {
		storage[k] = v
		return true
	})
	return storage
}

func TestStateDBTestSuite(t *testing.T) {
	suite.Run(t, &StateDBTestSuite{})
}
