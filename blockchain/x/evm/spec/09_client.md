<!--
order: 9
-->

# Client

A user can query and interact with the `evm` module using the CLI, JSON-RPC, gRPC or REST.

## CLI

Find below a list of `ethermintd` commands added with the `x/evm` module. You can obtain the full list by using the `ethermintd -h` command.

### Queries

The `query` commands allow users to query `evm` state.

**`code`**

Allows users to query the smart contract code at a given address.

```go
ethermintd query evm code ADDRESS [flags]
```

```bash
# Example
$ ethermintd query evm code 0x7bf7b17da59880d9bcca24915679668db75f9397

# Output
code: "0xef616c92f3cfc9e92dc270d6acff9cea213cecc7020a76ee4395af09bdceb4837a1ebdb5735e11e7d3adb6104e0c3ac55180b4ddf5e54d022cc5e8837f6a4f971b"
```

**`storage`**

Allows users to query storage for an account with a given key and height.

```bash
ethermintd query evm storage ADDRESS KEY [flags]
```

```bash
# Example
$ ethermintd query evm storage 0x0f54f47bf9b8e317b214ccd6a7c3e38b893cd7f0 0 --height 0

# Output
value: "0x0000000000000000000000000000000000000000000000000000000000000000"
```

### Transactions

The `tx` commands allow users to interact with the `evm` module.

**`raw`**

Allows users to build cosmos transactions from raw ethereum transaction.

```bash
ethermintd tx evm raw TX_HEX [flags]
```

```bash
# Example
$ ethermintd tx evm raw 0xf9ff74c86aefeb5f6019d77280bbb44fb695b4d45cfe97e6eed7acd62905f4a85034d5c68ed25a2e7a8eeb9baf1b84

# Output
value: "0x0000000000000000000000000000000000000000000000000000000000000000"
```

## JSON-RPC

For an overview on  the JSON-RPC methods and namespaces supported on Ethermint, please refer to [https://docs.ethermint.zone/basics/json_rpc.html](https://docs.ethermint.zone/basics/json_rpc.html)

## gRPC

### Queries

| Verb   | Method                                               | Description                                                                |
| ------ | ---------------------------------------------------- | -------------------------------------------------------------------------- |
| `gRPC` | `ethermint.evm.v1.Query/Account`                     | Get an Ethereum account                                                    |
| `gRPC` | `ethermint.evm.v1.Query/CosmosAccount`               | Get an Ethereum account's Cosmos Address                                   |
| `gRPC` | `ethermint.evm.v1.Query/ValidatorAccount`            | Get an Ethereum account's from a validator consensus Address               |
| `gRPC` | `ethermint.evm.v1.Query/Balance`                     | Get the balance of a the EVM denomination for a single EthAccount.         |
| `gRPC` | `ethermint.evm.v1.Query/Storage`                     | Get the balance of all coins for a single account                          |
| `gRPC` | `ethermint.evm.v1.Query/Code`                        | Get the balance of all coins for a single account                          |
| `gRPC` | `ethermint.evm.v1.Query/Params`                      | Get the parameters of x/evm module                                         |
| `gRPC` | `ethermint.evm.v1.Query/EthCall`                     | Implements the eth_call rpc api                                            |
| `gRPC` | `ethermint.evm.v1.Query/EstimateGas`                 | Implements the eth_estimateGas rpc api                                     |
| `gRPC` | `ethermint.evm.v1.Query/TraceTx`                     | Implements the debug_traceTransaction rpc api                              |
| `gRPC` | `ethermint.evm.v1.Query/TraceBlock`                  | Implements the debug_traceBlockByNumber and debug_traceBlockByHash rpc api |
| `GET`  | `/ethermint/evm/v1/account/{address}`                | Get an Ethereum account                                                    |
| `GET`  | `/ethermint/evm/v1/cosmos_account/{address}`         | Get an Ethereum account's Cosmos Address                                   |
| `GET`  | `/ethermint/evm/v1/validator_account/{cons_address}` | Get an Ethereum account's from a validator consensus Address               |
| `GET`  | `/ethermint/evm/v1/balances/{address}`               | Get the balance of a the EVM denomination for a single EthAccount.         |
| `GET`  | `/ethermint/evm/v1/storage/{address}/{key}`          | Get the balance of all coins for a single account                          |
| `GET`  | `/ethermint/evm/v1/codes/{address}`                  | Get the balance of all coins for a single account                          |
| `GET`  | `/ethermint/evm/v1/params`                           | Get the parameters of x/evm module                                         |
| `GET`  | `/ethermint/evm/v1/eth_call`                         | Implements the eth_call rpc api                                            |
| `GET`  | `/ethermint/evm/v1/estimate_gas`                     | Implements the eth_estimateGas rpc api                                     |
| `GET`  | `/ethermint/evm/v1/trace_tx`                         | Implements the debug_traceTransaction rpc api                              |
| `GET`  | `/ethermint/evm/v1/trace_block`                      | Implements the debug_traceBlockByNumber and debug_traceBlockByHash rpc api |

### Transactions

| Verb   | Method                            | Description                     |
| ------ | --------------------------------- | ------------------------------- |
| `gRPC` | `ethermint.evm.v1.Msg/EthereumTx` | Submit an Ethereum transactions |
| `POST` | `/ethermint/evm/v1/ethereum_tx`   | Submit an Ethereum transactions |
