<!--
order: 2
-->

# State

This section gives you an overview of the objects stored in the `x/evm` module state, functionalities that are derived from the go-ethereum `StateDB` interface, and its implementation through the Keeper as well as the state implementation at genesis.

## State Objects

The `x/evm` module keeps the following objects in state:

### State

|             | Description                                                  | Key                           | Value               | Store     |
| ----------- | ------------------------------------------------------------ | ----------------------------- | ------------------- | --------- |
| Code        | Smart contract bytecode                                      | `[]byte{1} + []byte(address)` | `[]byte{code}`      | KV        |
| Storage     | Smart contract storage                                       | `[]byte{2} + [32]byte{key}`   | `[32]byte(value)`   | KV        |
| Block Bloom | Block bloom filter, used to accumulate the bloom filter of current block, emitted to events at end blocker. | `[]byte{1} + []byte(tx.Hash)` | `protobuf([]Log)`   | Transient |
| Tx Index    | Index of current transaction in current block.               | `[]byte{2}`                   | `BigEndian(uint64)` | Transient |
| Log Size    | Number of the logs emitted so far in current block. Used to decide the log index of following logs. | `[]byte{3}`                   | `BigEndian(uint64)` | Transient |
| Gas Used    | Amount of gas used by ethereum messages of current cosmos-sdk tx, it's necessary when cosmos-sdk tx contains multiple ethereum messages. | `[]byte{4}`                   | `BigEndian(uint64)` | Transient |

## StateDB

The `StateDB` interface is implemented by the `StateDB` in the `x/evm/statedb` module to represent an EVM database for full state querying of both contracts and accounts. Within the Ethereum protocol, `StateDB`s are used to store anything within the IAVL tree and take care of caching and storing nested states.

```go
// github.com/ethereum/go-ethereum/core/vm/interface.go
type StateDB interface {
 CreateAccount(common.Address)

 SubBalance(common.Address, *big.Int)
 AddBalance(common.Address, *big.Int)
 GetBalance(common.Address) *big.Int

 GetNonce(common.Address) uint64
 SetNonce(common.Address, uint64)

 GetCodeHash(common.Address) common.Hash
 GetCode(common.Address) []byte
 SetCode(common.Address, []byte)
 GetCodeSize(common.Address) int

 AddRefund(uint64)
 SubRefund(uint64)
 GetRefund() uint64

 GetCommittedState(common.Address, common.Hash) common.Hash
 GetState(common.Address, common.Hash) common.Hash
 SetState(common.Address, common.Hash, common.Hash)

 Suicide(common.Address) bool
 HasSuicided(common.Address) bool

 // Exist reports whether the given account exists in state.
 // Notably this should also return true for suicided accounts.
 Exist(common.Address) bool
 // Empty returns whether the given account is empty. Empty
 // is defined according to EIP161 (balance = nonce = code = 0).
 Empty(common.Address) bool

 PrepareAccessList(sender common.Address, dest *common.Address, precompiles []common.Address, txAccesses types.AccessList)
 AddressInAccessList(addr common.Address) bool
 SlotInAccessList(addr common.Address, slot common.Hash) (addressOk bool, slotOk bool)
 // AddAddressToAccessList adds the given address to the access list. This operation is safe to perform
 // even if the feature/fork is not active yet
 AddAddressToAccessList(addr common.Address)
 // AddSlotToAccessList adds the given (address,slot) to the access list. This operation is safe to perform
 // even if the feature/fork is not active yet
 AddSlotToAccessList(addr common.Address, slot common.Hash)

 RevertToSnapshot(int)
 Snapshot() int

 AddLog(*types.Log)
 AddPreimage(common.Hash, []byte)

 ForEachStorage(common.Address, func(common.Hash, common.Hash) bool) error
}
```

The `StateDB` in the `x/evm` provides the following functionalities:

### CRUD of Ethereum accounts

You can create `EthAccount` instances from the provided address and set the value to store on the  `AccountKeeper`with `createAccount()`. If an account with the given address already exists, this function also resets any preexisting code and storage associated with that address.

An account's coin balance can be is managed through the `BankKeeper` and can be read with `GetBalance()` and updated with `AddBalance()` and `SubBalance()`.

- `GetBalance()` returns the EVM denomination balance of the provided address. The denomination is obtained from the module parameters.
- `AddBalance()` adds the given amount to the address balance coin by minting new coins and transferring them to the address. The coin denomination is obtained from the module parameters.
- `SubBalance()` subtracts the given amount from the address balance by transferring the coins to an escrow account and then burning them. The coin denomination is obtained from the module parameters. This function performs a no-op if the amount is negative or the user doesn't have enough funds for the transfer.

The nonce (or transaction sequence) can be obtained from the Account `Sequence` via the auth module `AccountKeeper`.

- `GetNonce()` retrieves the account with the given address and returns the tx sequence (i.e nonce). The function performs a no-op if the account is not found.
- `SetNonce()` sets the given nonce as the sequence of the address' account. If the account doesn't exist, a new one will be created from the address.

The smart contract bytecode containing arbitrary contract logic is stored on the `EVMKeeper` and it can be queried with `GetCodeHash()` ,`GetCode()` & `GetCodeSize()`and updated with `SetCode()`.

- `GetCodeHash()` fetches the account from the store and returns its code hash. If the account doesn't exist or is not an EthAccount type, it returns the empty code hash value.
- `GetCode()` returns the code byte array associated with the given address. If the code hash from the account is empty, this function returns nil.
- `SetCode()` stores the code byte array to the application KVStore and sets the code hash to the given account. The code is deleted from the store if it is empty.
- `GetCodeSize()` returns the size of the contract code associated with this object, or zero if none.

Gas refunded needs to be tracked and stored in a separate variable in
order to add it subtract/add it from/to the gas used value after the EVM
execution has finalized. The refund value is cleared on every transaction and at the end of every block.

- `AddRefund()` adds the given amount of gas to the in-memory refund value.
- `SubRefund()` subtracts the given amount of gas from the in-memory refund value. This function will panic if gas amount is greater than the current refund.
- `GetRefund()` returns the amount of gas available for return after the tx execution finalizes. This value is reset to 0 on every transaction.

The state is stored on the `EVMKeeper`. It can be queried with `GetCommittedState()`, `GetState()` and updated with `SetState()`.

- `GetCommittedState()` returns the value set in store for the given key hash. If the key is not registered this function returns the empty hash.
- `GetState()` returns the in-memory dirty state for the given key hash, if not exist load the committed value from KVStore.
- `SetState()` sets the given hashes (key, value) to the state. If the value hash is empty, this function deletes the key from the state, the new value is kept in dirty state at first, and will be committed to KVStore in the end.

Accounts can also be set to a suicide state. When a contract commits suicide, the account is marked as suicided, when committing the code, storage and account are deleted (from the next block and forward).

- `Suicide()` marks the given account as suicided and clears the account balance of the EVM tokens.
- `HasSuicided()` queries the in-memory flag to check if the account has been marked as suicided in the current transaction. Accounts that are suicided will be returned as non-nil during queries and "cleared" after the block has been committed.

To check account existence use `Exist()` and `Empty()`.

- `Exist()` returns true if the given account exists in store or if it has been
marked as suicided.
- `Empty()` returns true if the address meets the following conditions:
    - nonce is 0
    - balance amount for evm denom is 0
    - account code hash is empty

### EIP2930 functionality

Supports a transaction type that contains an [access list](https://eips.ethereum.org/EIPS/eip-2930), a list of addresses, and storage keys that the transaction plans to access. The access list state is kept in memory and discarded after the transaction committed.

- `PrepareAccessList()` handles the preparatory steps for executing a state transition with regards to both EIP-2929 and EIP-2930. This method should only be called if Yolov3/Berlin/2929+2930 is applicable at the current number.
    - Add sender to access list (EIP-2929)
    - Add destination to access list (EIP-2929)
    - Add precompiles to access list (EIP-2929)
    - Add the contents of the optional tx access list (EIP-2930)
- `AddressInAccessList()` returns true if the address is registered.
- `SlotInAccessList()` checks if the address and the slots are registered.
- `AddAddressToAccessList()` adds the given address to the access list. If the address is already in the access list, this function performs a no-op.
- `AddSlotToAccessList()` adds the given (address, slot) to the access list. If the address and slot are already in the access list, this function performs a no-op.

### Snapshot state and Revert functionality

The EVM uses state-reverting exceptions to handle errors. Such an exception will undo all changes made to the state in the current call (and all its sub-calls), and the caller could handle the error and don't propagate. You can use `Snapshot()` to identify the current state with a revision and revert the state to a given revision with `RevertToSnapshot()` to support this feature.

- `Snapshot()` creates a new snapshot and returns the identifier.
- `RevertToSnapshot(rev)` undo all the modifications up to the snapshot identified as `rev`.

Evmos adapted the [go-ethereum journal implementation](https://github.com/ethereum/go-ethereum/blob/master/core/state/journal.go#L39) to support this, it uses a list of journal logs to record all the state modification operations done so far,
snapshot is consists of a unique id and an index in the log list, and to revert to a snapshot it just undo the journal logs after the snapshot index in reversed order.

### Ethereum Transaction logs

With `AddLog()` you can append the given ethereum `Log` to the list of Logs associated with the transaction hash kept in the current state. This function also fills in the tx hash, block hash, tx index and log index fields before setting the log to store.

## Keeper

The EVM module `Keeper` grants access to the EVM module state and implements `statedb.Keeper` interface to support the `StateDB` implementation. The Keeper contains a store key that allows the DB to write to a concrete subtree of the multistore that is only accessible to the EVM module. Instead of using a trie and database for querying and persistence (the `StateDB` implementation on Ethermint), use the Cosmos `KVStore` (key-value store) and Cosmos SDK `Keeper` to facilitate state transitions.

To support the interface functionality, it imports 4 module Keepers:

- `auth`: CRUD accounts
- `bank`: accounting (supply) and CRUD of balances
- `staking`: query historical headers
- `fee market`: EIP1559 base fee for processing `DynamicFeeTx` after the `London` hard fork has been activated on the `ChainConfig` parameters

```go
type Keeper struct {
 // Protobuf codec
 cdc codec.BinaryCodec
 // Store key required for the EVM Prefix KVStore. It is required by:
 // - storing account's Storage State
 // - storing account's Code
 // - storing Bloom filters by block height. Needed for the Web3 API.
 // For the full list, check the module specification
 storeKey sdk.StoreKey

 // key to access the transient store, which is reset on every block during Commit
 transientKey sdk.StoreKey

 // module specific parameter space that can be configured through governance
 paramSpace paramtypes.Subspace
 // access to account state
 accountKeeper types.AccountKeeper
 // update balance and accounting operations with coins
 bankKeeper types.BankKeeper
 // access historical headers for EVM state transition execution
 stakingKeeper types.StakingKeeper
 // fetch EIP1559 base fee and parameters
 feeMarketKeeper types.FeeMarketKeeper

 // chain ID number obtained from the context's chain id
 eip155ChainID *big.Int

 // Tracer used to collect execution traces from the EVM transaction execution
 tracer string
 // trace EVM state transition execution. This value is obtained from the `--trace` flag.
 // For more info check https://geth.ethereum.org/docs/dapp/tracing
 debug bool

 // EVM Hooks for tx post-processing
 hooks types.EvmHooks
}
```

## Genesis State

The `x/evm` module `GenesisState` defines the state necessary for initializing the chain from a previous exported height. It contains the `GenesisAccounts` and the module parameters

```go
type GenesisState struct {
  // accounts is an array containing the ethereum genesis accounts.
  Accounts []GenesisAccount `protobuf:"bytes,1,rep,name=accounts,proto3" json:"accounts"`
  // params defines all the parameters of the module.
  Params Params `protobuf:"bytes,2,opt,name=params,proto3" json:"params"`
}
```

## Genesis Accounts

The `GenesisAccount` type corresponds to an adaptation of the Ethereum `GenesisAccount` type. It defines an account to be initialized in the genesis state.

Its main difference is that the one on Ethermint uses a custom `Storage` type that uses a slice instead of maps for the evm `State` (due to non-determinism), and that it doesn't contain the private key field.

It is also important to note that since the `auth` module on the Cosmos SDK manages the account state,  the `Address` field must correspond to an existing `EthAccount` that is stored in the `auth`'s module `Keeper` (i.e `AccountKeeper`). Addresses use the **[EIP55](https://eips.ethereum.org/EIPS/eip-55)** hex **[format](https://docs.evmos.org/users/technical_concepts/accounts.html#address-formats-for-clients)** on `genesis.json`.

```go
type GenesisAccount struct {
  // address defines an ethereum hex formated address of an account
  Address string `protobuf:"bytes,1,opt,name=address,proto3" json:"address,omitempty"`
  // code defines the hex bytes of the account code.
  Code string `protobuf:"bytes,2,opt,name=code,proto3" json:"code,omitempty"`
  // storage defines the set of state key values for the account.
  Storage Storage `protobuf:"bytes,3,rep,name=storage,proto3,castrepeated=Storage" json:"storage"`
}
```
