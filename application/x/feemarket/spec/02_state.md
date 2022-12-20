<!--
order: 2
-->

# State

The x/feemarket module keeps in the state variable needed to the fee calculation:

Only BlockGasUsed in previous block needs to be tracked in state for the next base fee calculation.

|                  | Description                    | Key            | Value               | Store     |
| -----------      | ------------------------------ | ---------------| ------------------- | --------- |
| BlockGasUsed     | gas used in the block          | `[]byte{1}`    | `[]byte{gas_used}`  | KV        |
