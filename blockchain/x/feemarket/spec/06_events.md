<!--
order: 6 -->

# Events

The `x/feemarket` module emits the following events:

## BeginBlocker

| Type       | Attribute Key   | Attribute Value |
| ---------- | --------------- | --------------- |
| fee_market | base_fee        | {baseGasPrices} |

## EndBlocker

| Type       | Attribute Key   | Attribute Value |
| ---------- | --------------- | --------------- |
| block_gas  | height          | {blockHeight}   |
| block_gas  | amount          | {blockGasUsed}  |
