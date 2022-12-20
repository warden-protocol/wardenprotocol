<!--
order: 3
-->

# State Transitions

The `x/evm` module allows for users to submit Ethereum transactions (`Tx`) and execute their containing messages to evoke state transitions on the given state.

Users submit transactions client-side to broadcast it to the network. When the transaction is included in a block during consensus, it is executed server-side. We highly recommend to understand the basics of the [Tendermint consensus engine](https://docs.tendermint.com/master/introduction/what-is-tendermint.html#intro-to-abci) to understand the State Transitions in detail.

## Client-Side

::: tip
👉 This is based on the `eth_sendTransaction` JSON-RPC
:::

1. A user submits a transaction via one of the available JSON-RPC endpoints using an Ethereum-compatible client or wallet (eg Metamask, WalletConnect, Ledger, etc):
 a. eth (public) namespace:
     - `eth_sendTransaction`
     - `eth_sendRawTransaction`
 b. personal (private) namespace:
     - `personal_sendTransaction`
2. An instance of `MsgEthereumTx` is created after populating the RPC transaction using `SetTxDefaults` to fill missing tx arguments with  default values
3. The `Tx` fields are validated (stateless) using `ValidateBasic()`
4. The `Tx` is **signed** using the key associated with the sender address and the latest ethereum hard fork (`London`, `Berlin`, etc) from the `ChainConfig`
5. The `Tx` is **built** from the msg fields using the Cosmos Config builder
6. The `Tx` is **broadcasted** in [sync mode](https://docs.cosmos.network/master/run-node/txs.html#broadcasting-a-transaction) to ensure to wait for a [`CheckTx`](https://docs.tendermint.com/master/introduction/what-is-tendermint.html#intro-to-abci) execution response. Transactions are validated by the application using `CheckTx()`, before being added to the mempool of the consensus engine.
7. JSON-RPC user receives a response with the [`RLP`](https://eth.wiki/en/fundamentals/rlp) hash of the transaction fields. This hash is different from the default hash used by SDK Transactions that calculates the `sha256` hash of the transaction bytes.

## Server-Side

Once a block (containing the `Tx`) has been committed during consensus, it is applied to the application in a series of ABCI msgs server-side.

Each `Tx` is handled by the application by calling [`RunTx`](https://docs.cosmos.network/master/core/baseapp.html#runtx). After a stateless validation on each `sdk.Msg` in the `Tx`, the `AnteHandler` confirms whether the `Tx` is an Ethereum or SDK transaction. As an Ethereum transaction it's containing msgs are then handled by the `x/evm` module to update the application's state.

### AnteHandler

The `anteHandler` is run for every transaction. It checks if the `Tx` is an Ethereum transaction and routes it to an internal ante handler. Here, `Tx`s are handled using EthereumTx extension options to process them differently than normal Cosmos SDK transactions. The `antehandler` runs through a series of options and their `AnteHandle` functions for each `Tx`:

- `EthSetUpContextDecorator()` is adapted from SetUpContextDecorator from cosmos-sdk, it ignores gas consumption by setting the gas meter to infinite
- `EthValidateBasicDecorator(evmKeeper)` validates the fields of a Ethereum type Cosmos `Tx` msg
- `EthSigVerificationDecorator(evmKeeper)` validates that the registered chain id is the same as the one on the message, and that the signer address matches the one defined on the message. It's not skipped for RecheckTx, because it set `From` address which is critical from other ante handler to work. Failure in RecheckTx will prevent tx to be included into block, especially when CheckTx succeed, in which case user won't see the error message.
- `EthAccountVerificationDecorator(ak, bankKeeper, evmKeeper)` that the sender balance is greater than the total transaction cost. The account will be set to store if it doesn't exist, i.e cannot be found on store. This AnteHandler decorator will fail if:
    - any of the msgs is not a MsgEthereumTx
    - from address is empty
    - account balance is lower than the transaction cost
- `EthNonceVerificationDecorator(ak)` validates that the transaction nonces are valid and equivalent to the sender account’s current nonce.
- `EthGasConsumeDecorator(evmKeeper)` validates that the Ethereum tx message has enough to cover intrinsic gas (during CheckTx only) and that the sender has enough balance to pay for the gas cost. Intrinsic gas for a transaction is the amount of gas that the transaction uses before the transaction is executed. The gas is a constant value plus any cost incurred by additional bytes of data supplied with the transaction. This AnteHandler decorator will fail if:
    - the transaction contains more than one message
    - the message is not a MsgEthereumTx
    - sender account cannot be found
    - transaction's gas limit is lower than the intrinsic gas
    - user doesn't have enough balance to deduct the transaction fees (gas_limit * gas_price)
    - transaction or block gas meter runs out of gas
- `CanTransferDecorator(evmKeeper, feeMarketKeeper)` creates an EVM from the message and calls the BlockContext CanTransfer function to see if the address can execute the transaction.
- `EthIncrementSenderSequenceDecorator(ak)`  handles incrementing the sequence of the signer (i.e sender). If the transaction is a contract creation, the nonce will be incremented during the transaction execution and not within this AnteHandler decorator.

The options `authante.NewMempoolFeeDecorator()`, `authante.NewTxTimeoutHeightDecorator()` and `authante.NewValidateMemoDecorator(ak)` are the same as for a Cosmos `Tx`. Click [here](https://docs.cosmos.network/master/basics/gas-fees.html#antehandler) for more on the `anteHandler`.

### EVM module

After authentication through the `antehandler`, each `sdk.Msg` (in this case `MsgEthereumTx`) in the `Tx` is delivered to the Msg Handler in the `x/evm` module and runs through the following the steps:

1. Convert `Msg` to an ethereum `Tx` type
2. Apply `Tx` with `EVMConfig` and attempt to perform a state transition, that will only be persisted (committed) to the underlying KVStore if the transaction does not fail:
    1. Confirm that `EVMConfig` is created
    2. Create the ethereum signer using chain config value from `EVMConfig`
    3. Set the ethereum transaction hash to the (impermanent) transient store so that it's also available on the StateDB functions
    4. Generate a new EVM instance
    5. Confirm that EVM params for contract creation (`EnableCreate`) and contract execution (`EnableCall`) are enabled
    6. Apply message. If `To` address is `nil`, create new contract using code as deployment code. Else call contract at given address with the given input as parameters
    7. Calculate gas used by the evm operation
3. If `Tx` applied sucessfully
    1. Execute EVM `Tx` postprocessing hooks. If hooks return error, revert the whole `Tx`
    2. Refund gas according to Ethereum gas accounting rules
    3. Update block bloom filter value using the logs generated from the tx
    4. Emit SDK events for the transaction fields and tx logs
