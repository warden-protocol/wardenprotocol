<!--
order: 5
-->

# ABCI

The Application Blockchain Interface (ABCI) allows the application to interact with the Tendermint Consensus engine. The application maintains several separate ABCI connections with Tendermint. The most relevant for the  `x/evm` is the [Consensus connection at Commit](https://docs.tendermint.com/v0.35/spec/abci/apps.html#consensus-connection). This connection is responsible for block execution and calls the fuctions `InitChain` (containing `InitGenesis`), `BeginBlock`, `DeliverTx`, `EndBlock`, `Commit` . `InitChain` is only called the first time a new blockchain is started and `DeliverTx` is called for each transaction in the block.

## InitGenesis

`InitGenesis` initializes the EVM module genesis state by setting the `GenesisState` fields to the store. In particular it sets the parameters and genesis accounts (state and code).

## ExportGenesis

The `ExportGenesis` ABCI function exports the genesis state of the EVM module. In particular, it retrieves all the accounts with their bytecode, balance and storage, the transaction logs, and the EVM parameters and chain configuration.

## BeginBlock

The EVM module `BeginBlock` logic is executed prior to handling the state transitions from the transactions. The main objective of this function is to:

- Set the context for the current block so that the block header, store, gas meter, etc are available to the `Keeper` once one of the `StateDB` functions are called during EVM state transitions.
- Set the EIP155 `ChainID` number (obtained from the full chain-id), in case it hasn't been set before during `InitChain`

## EndBlock

The EVM module `EndBlock` logic occurs after executing all the state transitions from the transactions. The main objective of this function is to:

- Emit Block bloom events
    - This is due for Web3 compatibility as the Ethereum headers contain this type as a field. The JSON-RPC service uses this event query to construct an Ethereum Header from a Tendermint Header.
    - The block Bloom filter value is obtained from the Transient Store and then emitted
