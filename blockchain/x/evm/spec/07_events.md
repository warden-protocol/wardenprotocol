<!--
order: 7
-->

# Events

The `x/evm` module emits the Cosmos SDK events after a state execution. The EVM module emits events of the relevant transaction fields, as well as the transaction logs (ethereum events).

## MsgEthereumTx

| Type        | Attribute Key      | Attribute Value         |
| ----------- | ------------------ | ----------------------- |
| ethereum_tx | `"amount"`         | `{amount}`              |
| ethereum_tx | `"recipient"`      | `{hex_address}`         |
| ethereum_tx | `"contract"`       | `{hex_address}`         |
| ethereum_tx | `"txHash"`         | `{tendermint_hex_hash}` |
| ethereum_tx | `"ethereumTxHash"` | `{hex_hash}`            |
| ethereum_tx | `"txIndex"`        | `{tx_index}`            |
| ethereum_tx | `"txGasUsed"`      | `{gas_used}`            |
| tx_log      | `"txLog"`          | `{tx_log}`              |
| message     | `"sender"`         | `{eth_address}`         |
| message     | `"action"`         | `"ethereum"`            |
| message     | `"module"`         | `"evm"`                 |

Additionally, the EVM module emits an event during `EndBlock` for the filter query block bloom.

## ABCI

| Type        | Attribute Key | Attribute Value      |
| ----------- | ------------- | -------------------- |
| block_bloom | `"bloom"`     | `string(bloomBytes)` |
