<!--
order: 5
-->

# AnteHandlers

The `x/feemarket` module provides `AnteDecorator`s that are recursively chained together into a single [`Antehandler`](https://github.com/cosmos/cosmos-sdk/blob/v0.43.0-alpha1/docs/architecture/adr-010-modular-antehandler.md). These decorators perform basic validity checks on an Ethereum or Cosmos SDK transaction, such that it could be thrown out of the transaction Mempool.

Note that the `AnteHandler` is run for every transaction and called on both `CheckTx` and `DeliverTx`.

## Decorators

### `MinGasPriceDecorator`

Rejects Cosmos SDK transactions with transaction fees lower than `MinGasPrice * GasLimit`.

### `EthMinGasPriceDecorator`

Rejects EVM transactions with transactions fees lower than `MinGasPrice * GasLimit`.
    - For `LegacyTx` and `AccessListTx`, the `GasPrice * GasLimit` is used.
    - For EIP-1559 (*aka.* `DynamicFeeTx`), the `EffectivePrice * GasLimit` is used.

::: tip
**Note**: For dynamic transactions, if the `feemarket` formula results in a `BaseFee` that lowers `EffectivePrice < MinGasPrices`, the users must increase the `GasTipCap` (priority fee) until `EffectivePrice > MinGasPrices`. Transactions with `MinGasPrices * GasLimit < transaction fee < EffectiveFee` are rejected by the `feemarket` `AnteHandle`.
:::
