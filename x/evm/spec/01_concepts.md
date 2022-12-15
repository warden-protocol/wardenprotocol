<!--
order: 1
-->

# Concepts

## EVM

The Ethereum Virtual Machine (EVM) is a computation engine which can be thought of as one single entity maintained by thousands of connected computers (nodes) running an Ethereum client. As a virtual machine ([VM](https://en.wikipedia.org/wiki/Virtual_machine)), the EVM is responisble for computing changes to the state deterministically regardless of its environment (hardware and OS). This means that every node has to get the exact same result given an identical starting state and transaction (tx).

The EVM is considered to be the part of the Ethereum protocol that handles the deployment and execution of [smart contracts](https://ethereum.org/en/developers/docs/smart-contracts/). To make a clear distinction:

* The Ethereum protocol describes a blockchain, in which all Ethereum accounts and smart contracts live. It has only one canonical state (a data structure, which keeps all accounts) at any given block in the chain.
* The EVM, however, is the [state machine](https://en.wikipedia.org/wiki/Finite-state_machine) that defines the rules for computing a new valid state from block to block. It is an isolated runtime, which means that code running inside the EVM has no access to network, filesystem, or other processes (not external APIs).

The `x/evm` module implements the EVM as a Cosmos SDK module. It allows users to interact with the EVM by submitting Ethereum txs and executing their containing messages on the given state to evoke a state transition.

### State

The Ethereum state is a data structure, implemented as a [Merkle Patricia Trie](https://en.wikipedia.org/wiki/Merkle_tree), that keeps all accounts on the chain. The EVM makes changes to this data structure resulting in a new state with a different State Root. Ethereum can therefore be seen as a state chain that transitions from one state to another by executing transations in a block using the EVM. A new block of txs can be described through its Block header (parent hash, block number, time stamp, nonce, receipts,...).

### Accounts

There are two types of accounts that can be stored in state at a given address:

* **Externally Owned Account (EOA)**: Has nonce (tx counter) and balance
* **Smart Contract**: Has nonce, balance, (immutable) code hash, storage root (another Merkle Patricia Trie)

Smart contracts are just like regular accounts on the blockchain, which additionally store executable code in an Ethereum-specific binary format, known as **EVM bytecode**. They are typically written in an Ethereum high level language such as Solidity which is compiled down to EVM bytecode and deployed on the blockchain, by submitting a tx using an Ethereum client.

### Architecture

The EVM operates as a stack-based machine. It's main architecture components consist of:

* Virtual ROM: contract code is pulled into this read only memory when processing txs
* Machine state (volatile): changes as the EVM runs and is wiped clean after processing each tx
    * Program counter (PC)
    * Gas: keeps track of how much gas is used
    * Stack and Memory: compute state changes
* Access to account storage (persistent)

### State Transitions with Smart Contracts

Typically smart contracts expose a public ABI, which is a list of supported ways a user can interact with a contract. To interact with a contract and invoke a state transition, a user will submit a tx carrying any amount of gas and a data payload formatted according to the ABI, specifying the type of interaction and any additional parameters. When the tx is received, the EVM executes the smart contracts's EVM bytecode using the tx payload.

### Executing EVM bytecode

A contract's EVM bytecode consists of basic operations (add, multiply, store, etc...), called **Opcodes**. Each Opcode execution requires gas that needs to be payed with the tx. The EVM is therefore considered quasi-turing complete, as it allows any arbitrary computation, but the amount of computations during a contract execution is limited to the amount of gas provided in the tx. Each Opcode's [**gas cost**](https://www.evm.codes/) reflects the cost of running these operations on actual computer hardware (e.g. `ADD = 3gas` and `SSTORE = 100gas`). To calculate the gas consumption of a tx, the gas cost is multiplied by the **gas price**, which can change depending on the demand of the network at the time. If the network is under heavy load, you might have to pay a highter gas price to get your tx executed. If the gas limit is hit (out of gas execption) no changes to the Ethereum state are applied, except that the sender's nonce increments and their balance goes down to pay for wasting the EVM's time.

Smart contracts can also call other smart contracts. Each call to a new contract creates a new instance of the EVM (including a new stack and memory). Each call passes the sandbox state to the next EVM. If the gas runs out, all state changes are discareded. Otherwise they are kept.

For further reading, please refer to:

* [EVM](https://eth.wiki/concepts/evm/evm)
* [EVM Architecture](https://cypherpunks-core.github.io/ethereumbook/13evm.html#evm_architecture)
* [What is Ethereum](https://ethdocs.org/en/latest/introduction/what-is-ethereum.html#what-is-ethereum)
* [Opcodes](https://www.ethervm.io/)

## Ethermint as Geth implementation

Ethermint is an implementation of the [Etherum protocal in Golang](https://geth.ethereum.org/docs/getting-started) (Geth) as a Cosmos SDK module. Geth includes an implementation of the EVM to compute state transitions. Have a look at the [go-etheruem source code](https://github.com/ethereum/go-ethereum/blob/master/core/vm/instructions.go) to see how the EVM opcodes are implemented. Just as Geth can be run as an Ethereum node, Ethermint can be run as a node to compute state transitions with the EVM. Ethermint supports Geth's standard [Ethereum JSON-RPC APIs](https://docs.evmos.org/developers/json-rpc/endpoints.html) in order to be Web3 and EVM compatible.

### JSON-RPC

JSON-RPC is a stateless, lightweight remote procedure call (RPC) protocol. Primarily this specification defines several data structures and the rules around their processing. It is transport agnostic in that the concepts can be used within the same process, over sockets, over HTTP, or in many various message passing environments. It uses JSON (RFC 4627) as a data format.

#### JSON-RPC Example: `eth_call`

The JSON-RPC method [`eth_call`](https://docs.evmos.org/developers/json-rpc/endpoints.html#eth-call) allows you to execute messages against contracts. Usually, you need to send a transaction to a Geth node to include it in the mempool, then nodes gossip between each other and eventually the transaction is included in a block and gets executed. `eth_call` however lets you send data to a contract and see what happens without commiting a transaction.

In the Geth implementation, calling the endpoint roughly goes through the following steps:

1. The `eth_call` request is transformed to call the `func (s *PublicBlockchainAPI) Call()` function using the `eth` namespace
2. [`Call()`](https://github.com/ethereum/go-ethereum/blob/master/internal/ethapi/api.go#L982) is given the transaction arguments, the block to call against and optional overides that modify the state to call against. It then calls `DoCall()`
3. [`DoCall()`](https://github.com/ethereum/go-ethereum/blob/d575a2d3bc76dfbdefdd68b6cffff115542faf75/internal/ethapi/api.go#L891) transforms the arguments into a `ethtypes.message`, instantiates an EVM and applies the message with `core.ApplyMessage`
4. [`ApplyMessage()`](https://github.com/ethereum/go-ethereum/blob/d575a2d3bc76dfbdefdd68b6cffff115542faf75/core/state_transition.go#L180) calls the state transition `TransitionDb()`
5. [`TransitionDb()`](https://github.com/ethereum/go-ethereum/blob/d575a2d3bc76dfbdefdd68b6cffff115542faf75/core/state_transition.go#L275) either `Create()`s a new contract or `Call()`s a contract
6. [`evm.Call()`](https://github.com/ethereum/go-ethereum/blob/d575a2d3bc76dfbdefdd68b6cffff115542faf75/core/vm/evm.go#L168) runs the interpreter `evm.interpreter.Run()` to execute the message. If the execution fails, the state is reverted to a snapshot taken before the execution and gas is consumed.
7. [`Run()`](https://github.com/ethereum/go-ethereum/blob/d575a2d3bc76dfbdefdd68b6cffff115542faf75/core/vm/interpreter.go#L116) performs a loop to execute the opcodes.

The ethermint implementatiom is similar and makes use of the gRPC query client which is included in the Cosmos SDK:

1. `eth_call` request is transformed to call the `func (e *PublicAPI) Call` function using the `eth` namespace
2. [`Call()`](https://github.com/evmos/ethermint/blob/main/rpc/namespaces/ethereum/eth/api.go#L639) calls `doCall()`
3. [`doCall()`](https://github.com/evmos/ethermint/blob/main/rpc/namespaces/ethereum/eth/api.go#L656) transforms the arguments into a `EthCallRequest` and calls `EthCall()` using the query client of the evm module.
4. [`EthCall()`](https://github.com/evmos/ethermint/blob/main/x/evm/keeper/grpc_query.go#L212) transforms the arguments into a `ethtypes.message` and calls `ApplyMessageWithConfig()
5. [`ApplyMessageWithConfig()`](https://github.com/evmos/ethermint/blob/d5598932a7f06158b7a5e3aa031bbc94eaaae32c/x/evm/keeper/state_transition.go#L341) instantiates an EVM and either `Create()`s a new contract or `Call()`s a contract using the Geth implementation.

### StateDB

The `StateDB` interface from [go-ethereum](https://github.com/ethereum/go-ethereum/blob/master/core/vm/interface.go) represents an EVM database for full state querying. EVM state transitions are enabled by this interface, which in the `x/evm` module is implemented by the `Keeper`. The implementation of this interface is what makes Ethermint EVM compatible.

## Consensus Engine

The application using the `x/evm` module interacts with the Tendermint Core Consensus Engine over an Application Blockchain Interface (ABCI). Together, the application and Tendermint Core form the programs that run a complete blockchain and combine business logic with decentralized data storage.

Ethereum transactions that are submitted to the `x/evm` module take part in a this consensus process before being executed and changing the application state. We encourage to understand the basics of the [Tendermint consensus engine](https://docs.tendermint.com/master/introduction/what-is-tendermint.html#intro-to-abci) in order to understand state transitions in detail.

## Transaction Logs

On every `x/evm` transaction, the result contains the Ethereum `Log`s from the state machine execution that are used by the JSON-RPC Web3 server for filter querying and for processing the EVM Hooks.

The tx logs are stored in the transient store during tx execution and then emitted through cosmos events after the transaction has been processed. They can be queried via gRPC and JSON-RPC.

## Block Bloom

Bloom is the bloom filter value in bytes for each block that can be used for filter queries. The block bloom value is stored in the transient store and then emitted through a cosmos event during `EndBlock` processing. They can be queried via gRPC and JSON-RPC.

::: tip
👉 **Note**: Since they are not stored on state, Transaction Logs and Block Blooms are not persisted after upgrades. A user must use an archival node after upgrades in order to obtain legacy chain events.
:::
