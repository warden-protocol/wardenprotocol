# ADR 001: State

## Changelog

- 2021-06-14: updates after implementation
- 2021-05-15: first draft

## Status

PROPOSED, Implemented

## Abstract

The current ADR proposes a state machine breaking change to the EVM module state operations
(`Keeper`, `StateDB` and `StateTransition`) with the goal of reducing code maintenance, increase
performance, and document all the transaction and state cycles and flows.

## Context

<!-- > This section describes the forces at play, including technological, political, social, and project local. These forces are probably in tension, and should be called out as such. The language in this section is value-neutral. It is simply describing facts. It should clearly explain the problem and motivation that the proposal aims to resolve. -->

This ADR addresses the issues of 3 different components of the EVM state: the `StateDB` interface,
the live `stateObject` accounts, and the `StateTransition` functionality. These issues are outlined
below in the section for each corresponding component:

### `StateDB`

In order to execute state transitions, the EVM receives a reference to a database interface to
perform CRUD operations on accounts, balances, code and state storage, among other state queries.
This database interface is defined by go-ethereum's `vm.StateDB`, which is currently implemented
using the `CommitStateDB` concrete type.

The `CommitStateDB` performs state updates by having a direct access to the `sdk.Context`, the evm's
`sdk.StoreKey` and external `Keepers` for account and balances. Currently, the context field needs
to be set on every block or state transition using `WithContext(ctx)` in order to pass the updated
block and transaction data to the `CommitStateDB`.

However, traditionally in Cosmos SDK-based chains, the `Keeper` type has been the de-facto abstraction
that manages access the key-value store (`KVStore`) owned by the module through the store key.
`Keepers` usually hold a reference to external module `Keepers` to perform functionality outside of
the scope of their module.

In the existing architecture of the EVM module, both `CommitStateDB` and `Keeper` have access to
state.

### State Objects

The `CommitStateDB` also holds references of `stateObjects`, defined as "live ethereum consensus
accounts (i.e any balance, account nonces or storage) which will get modified while processing a
state transition".

Upon a state transition, these objects will be modified and marked as 'dirty' (a.k.a stateless
update) on the `CommitStateDB`. Then, at every `EndBlock`, the state of these modified objects will
be 'finalized' and committed to the store, resetting all the dirty list of objects.

The core issue arises when a chain that uses the EVM module can have also have their account and
balances updated through operations from other modules. This means that an EVM state object can be
modified through an EVM transaction (`evm.MsgEthereumTx`) and other transactions like `bank.MsgSend`
or `ibctransfer.MsgTransfer`. This can lead to unexpected behaviors like state overwrites, due to
the current behavior that caches the dirty state on the EVM instead of committing any changes
directly.

### State Transition

A general EVM state transition is performed by calling the ethereum `vm.EVM` `Create` or `Call` functions, depending on whether the transaction creates a contract or performs a transfer or call to a given contract.

In the case of the `x/evm` module, it currently uses a modified version of Geth's `TransitionDB`, that wraps these two `vm.EVM` methods. The reason for using this modified function, is due to several reasons:

  1. The use of `sdk.Msg` (`MsgEthereumTx`) instead of the ethereum `core.Message` type for the `vm.EVM` functions, preventing the direct use of the `core.ApplyMessage`.
  2. The use of custom gas accounting through the transaction `GasMeter` available on the `sdk.Context` to consume the same amount of gas as on Ethereum.
  3. Simulate logic via ABCI `CheckTx`, that prevents the state from being finalized.

## Decision

<!-- > This section describes our response to these forces. It is stated in full sentences, with active voice. "We will ..." -->

### `StateDB`

The `CommitStateDB` type will be removed in favor turning the module's `Keeper` into a `StateDB`
concrete implementation.

```go
// Keeper now fully implements the StateDB interface
var _ vm.StateDB = (*Keeper)(nil)

// Keeper defines the EVM module state keeper for CRUD operations. 
// It also implements the go-ethereum vm.StateDB interface. Instead of using
// a trie and database for querying and persistence, the Keeper uses KVStores
// and external Keepers to facilitate state transitions for accounts and balance
// accounting.
type Keeper struct {
  // store key and encoding codec
  // external module keepers (account, bank, etc) and params subspace
  // cache fields and sdk.Context (reset every block)
  // other CommitStateDB fields (journal, accessList, etc)
}
```

This means that a `Keeper` pointer will now directly be passed to the `vm.EVM` for accessing the state and performing state transitions.

The ABCI `BeginBlock` and `EndBlock` are have now been refactored to only keep track of internal fields (hashes, block bloom, etc).

```go
func (k *Keeper) BeginBlock(ctx sdk.Context, req abci.RequestBeginBlock) {
  // ...

  // update context
  k.WithContext(ctx)
  //...
}

func (k Keeper) EndBlock(ctx sdk.Context, req abci.RequestEndBlock) []abci.ValidatorUpdate {
  // NOTE: UpdateAccounts, Commit and Reset execution steps have been removed in favor of directly
  // updating the state.

  // Gas costs are handled within msg handler so costs should be ignored
  infCtx := ctx.WithGasMeter(sdk.NewInfiniteGasMeter())
  k.WithContext(ctx)

  // get the block bloom bytes from the transient store and set it to the persistent storage
  bloomBig, found := k.GetBlockBloomTransient()
  if !found {
    bloomBig = big.NewInt(0)
  }

  bloom := ethtypes.BytesToBloom(bloomBig.Bytes())
  k.SetBlockBloom(infCtx, req.Height, bloom)
  k.WithContext(ctx)

  return []abci.ValidatorUpdate{}
}
```

The new `StateDB` (`Keeper`) will adopt the use of the  [`TransientStore`](https://docs.cosmos.network/master/core/store.html#transient-store) that discards the existing values of the store when the block is commited.

The fields that have been modified to use the `TransientStore` are:

- Block bloom filter (cleared at the end of every block)
- Tx index (updated on every transaction)
- Gas amount refunded (updated on every transaction)
- Suicided account (cleared at the end of every block)
- `AccessList` address and slot (cleared at the end of every block)

### State Objects

The `stateObject` type will be completely removed in favor of updating the store directly through
the use of the auth `AccountKeeper` and the bank `Keeper`. For the storage `State` and `Code`, the
evm module `Keeper` will store these values directly on the KVStore using the EVM module store key
and corresponding prefix keys.

### State Transition

The state transition logic will be refactored to use the [`ApplyTransaction`](https://github.com/ethereum/go-ethereum/blob/v1.10.3/core/state_processor.go#L137-L150) function from the `core`
package of go-ethereum as reference. This method calls creates a go-ethereum `StateTransition`
instance and, as it name implies, applies a Ethereum message to execute it and update the state.
This `ApplyMessage` call will be wrapped in the `Keeper`'s `ApplyTransaction` function, which will
generate the required arguments for this call (EVM, `core.Message`, chain config, and gas pool), thus performing the
same gas accounting as before.

```go
func (k *Keeper) ApplyTransaction(tx *ethtypes.Transaction) (*types.MsgEthereumTxResponse, error) {
 // ...
  cfg, found := k.GetChainConfig(infCtx)
  if !found {
    // return error
  }

  ethCfg := cfg.EthereumConfig(chainID)

  signer := MakeSigner(ethCfg, height)

  msg, err := tx.AsMessage(signer)
  if err != nil {
   // return error
  }

  evm := k.NewEVM(msg, ethCfg)

  k.IncreaseTxIndexTransient()

  // create an ethereum StateTransition instance and run TransitionDb
  res, err := k.ApplyMessage(evm, msg, ethCfg)
  if err != nil {
    // return error
  }

  // ...

  return res, nil
}
```

`ApplyMessage` computes the new state by applying the given message against the existing state. If
the message fails, the VM execution error with the reason will be returned to the client and the
transaction won't be committed to the store.

```go
func (k *Keeper) ApplyMessage(evm *vm.EVM, msg core.Message, cfg *params.ChainConfig) (*types.MsgEthereumTxResponse, error) {
  var (
    ret   []byte // return bytes from evm execution
    vmErr error  // vm errors do not effect consensus and are therefore not assigned to err
  )

  sender := vm.AccountRef(msg.From())
  contractCreation := msg.To() == nil

  // transaction gas meter (tracks limit and usage)
  gasConsumed := k.ctx.GasMeter().GasConsumed()
  leftoverGas := k.ctx.GasMeter().Limit() - k.ctx.GasMeter().GasConsumedToLimit()

  // NOTE: Since CRUD operations on the SDK store consume gas we need to set up an infinite gas meter so that we only consume
  // the gas used by the Ethereum message execution.
  // Not setting the infinite gas meter here would mean that we are incurring in additional gas costs
  k.WithContext(k.ctx.WithGasMeter(sdk.NewInfiniteGasMeter()))

  // NOTE: gas limit is the GasLimit defined in the message minus the Intrinsic Gas that has already been
  // consumed on the AnteHandler.

  // ensure gas is consistent during CheckTx
  if k.ctx.IsCheckTx() {
    // check gas consumption correctness
  }

  if contractCreation {
    ret, _, leftoverGas, vmErr = evm.Create(sender, msg.Data(), leftoverGas, msg.Value())
  } else {
    ret, leftoverGas, vmErr = evm.Call(sender, *msg.To(), msg.Data(), leftoverGas, msg.Value())
  }

  // refund gas prior to handling the vm error in order to set the updated gas meter
  if err := k.RefundGas(msg, leftoverGas); err != nil {
    // return error
  }

  if vmErr != nil {
    if errors.Is(vmErr, vm.ErrExecutionReverted) {
      // return error with revert reason
    }

    // return execution error
  }

  return &types.MsgEthereumTxResponse{
    Ret:      ret,
    Reverted: false,
  }, nil
}
```

The EVM is created as follows:

```go
func (k *Keeper) NewEVM(msg core.Message, config *params.ChainConfig) *vm.EVM {
  blockCtx := vm.BlockContext{
    CanTransfer: core.CanTransfer,
    Transfer:    core.Transfer,
    GetHash:     k.GetHashFn(),
    Coinbase:    common.Address{}, // there's no beneficiary since we're not mining
    GasLimit:    gasLimit,
    BlockNumber: blockHeight,
    Time:        blockTime,
    Difficulty:  0, // unused. Only required in PoW context
  }

  txCtx := core.NewEVMTxContext(msg)
  vmConfig := k.VMConfig()

  return vm.NewEVM(blockCtx, txCtx, k, config, vmConfig)
}
```

## Consequences

<!-- > This section describes the resulting context, after applying the decision. All consequences should be listed here, not just the "positive" ones. A particular decision may have positive, negative, and neutral consequences, but all of them affect the team and project in the future. -->

### Backwards Compatibility

<!-- All ADRs that introduce backwards incompatibilities must include a section describing these incompatibilities and their severity. The ADR must explain how the author proposes to deal with these incompatibilities. ADR submissions without a sufficient backwards compatibility treatise may be rejected outright. -->

The proposed ADR is a breaking state machine change and will not have any backwards compatibility
since no chain that uses this code is in a production ready-state (at the moment of writing).

### Positive

- Improve maintenance by simplifying the state transition logic
- Defines a single option for accessing the store through the `Keeper`, thus removing the
  `CommitStateDB` type.
- State operations and tests are now all located in the `evm/keeper/` package
- Removes the concept of `stateObject` by committing to the store directly
- Delete operations on `EndBlock` for updating and committing dirty state objects.
- Split the state transition functionality to modularize components that can be beneficial for further customization (eg: using an alternative EVM)

### Negative

- Increases the dependency of external packages (eg: `go-ethereum`)

### Neutral

- Some of the fields from the `CommitStateDB` will have to be added to the `Keeper`
- Some state changes will have to be kept in store (eg: suicide state)

## Further Discussions

<!-- While an ADR is in the DRAFT or PROPOSED stage, this section should contain a summary of issues to be solved in future iterations (usually referencing comments from a pull-request discussion).
Later, this section can optionally list ideas or improvements the author or reviewers found during the analysis of this ADR. -->

## Test Cases [optional]

<!-- Test cases for an implementation are mandatory for ADRs that are affecting consensus changes. Other ADRs can choose to include links to test cases if applicable. -->

## References

<!-- - {reference link} -->
