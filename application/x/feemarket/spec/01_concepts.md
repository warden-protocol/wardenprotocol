<!--
order: 1
-->

# Concepts

## EIP-1559: Fee Market

[EIP-1559](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1559.md) describes a pricing mechanism that was proposed on Ethereum to improve to calculation of transaction fees. It includes a fixed-per-block network fee that is burned and dynamically expands/contracts block sizes to deal with peaks of network congestion.

Before EIP-1559 the transaction fee is calculated with

```
fee = gasPrice * gasLimit
```

, where `gasPrice` is the price per gas and `gasLimit` describes the amount of gas required to perform the transaction. The more complex operations a transaction requires, the higher the gasLimit (See [Executing EVM bytecode](https://docs.evmos.org/modules/evm/01_concepts.html#executing-evm-bytecode)). To submit a transaction, the signer needs to specify the `gasPrice`.

With EIP-1559 enabled, the transaction fee is calculated with

```
fee = (baseFee + priorityTip) * gasLimit
```

, where `baseFee` is the fixed-per-block network fee per gas and `priorityTip` is an additional fee per gas that can be set optionally. Note, that both the base fee and the priority tip are a gas prices. To submit a transaction with EIP-1559, the signer needs to specify the `gasFeeCap` a maximum fee per gas they are willing to pay total and optionally the `priorityTip` , which covers both the priority fee and the block's network fee per gas (aka: base fee).

## Base Fee

The base fee per gas (aka base fee) is a global gas price defined at the consensus level. It is stored as a module parameter and is adjusted at the end of each block based on the total gas used in the previous block and gas target (`block gas limit / elasticity multiplier`):

- it increases when blocks are above the gas target,
- it decreases when blocks are below the gas target.

Instead of burning the base fee (as implemented on Ethereum), the `feemarket` module allocates the base fee for regular [Cosmos SDK fee distribution](https://docs.evmos.org/modules/distribution/).

## Priority Tip

In EIP-1559, the `max_priority_fee_per_gas`, often referred to as `tip`, is an additional gas price that can be added to the `baseFee` in order to incentive transaction prioritization. The higher the tip, the more likely the transaction is included in the block.

Until the Cosmos SDK version v0.46, however, there is no notion of transaction prioritization. Thus the tip for an EIP-1559 transaction on Ethermint should be zero (`MaxPriorityFeePerGas` JSON-RPC endpoint returns `0`). Have a look at [ADR 067](https://github.com/tendermint/tendermint/blob/master/docs/architecture/adr-067-mempool-refactor.md) to read about future plans on transaction prioritization in the Cosmos SDK.

## Effective Gas price

For EIP-1559 transactions (dynamic fee transactions) the effective gas price descibes the maximum gas price that a transaction is willing to provide. It is derived from the transaction arguments and the base fee parameter. Depending on which one is smaller, the effective gas price is either the `baseFee + tip` or the `gasFeeCap`

```
min(baseFee + gasTipCap, gasFeeCap)
```

## Local vs. Global Minimum Gas Prices

Minimum gas prices are used to discard spam transactions in the network, by raising the cost of transactions to the point that it is not economically viable for the spammer. This is achieved by defining a minimum gas price for accepting txs in the mempool for both Cosmos and EVM transactions. A transaction is discarded from the mempool if it doesn't provide at least one of the two types of min gas prices:

Minimum gas prices are used to discard spam transactions in the network, by raising the cost of transactions to the point that it is not economically viable for the spammer. This is achieved by defining a minimum gas price for accepting txs in the mempool for both Cosmos and EVM transactions. A transaction is discarded from the mempool if it doesn't provide at least one of the two types of min gas prices:

1. the local min gas prices that validators can set on their node config and
2. the global min gas price, which is set as a parameter in the `feemarket` module, which can be changed through governance.

The lower bound for a transaction gas price is determined by comparing of gas price bounds according to three cases:

1. If the effective gas price (`effective gas price = base fee + priority tip`) or the local minimum gas price is lower than the global `MinGasPrice` (`min-gas-price (local) < MinGasPrice (global) OR EffectiveGasPrice < MinGasPrice`), then `MinGasPrice` is used as a lower bound.

2. If transactions are rejected due to having a gas price lower than `MinGasPrice`, users need to resend the transactions with a gas price higher or equal to `MinGasPrice`.

3. If the effective gas price or the local `minimum-gas-price` is higher than the global `MinGasPrice`, then the larger value of the two is used as a lower bound. In the case of EIP-1559, users must increase the priority fee for their transactions to be valid.

The comparison of transaction gas price and the lower bound is implemented through AnteHandler decorators. For EVM transactions, this is done in the `EthMempoolFeeDecorator` and `EthMinGasPriceDecorator` `AnteHandler` and for Cosmos transactions in `NewMempoolFeeDecorator` and `MinGasPriceDecorator` `AnteHandler`.

::: tip
If the base fee decreases to a value below the global `MinGasPrice`, it is set to the `MinGasPrice`. This is implemented, so that the base fee can't drop to gas prices that wouldn't allow transactions to be accepted in the mempool, because of a higher `MinGasPrice`.
:::