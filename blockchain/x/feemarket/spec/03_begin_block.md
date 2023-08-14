<!--
order: 3
-->

# Begin block

The base fee is calculated at the beginning of each block.

## Base Fee

### Disabling base fee

We introduce two parameters : `NoBaseFee`and `EnableHeight`

`NoBaseFee` controls the feemarket base fee value. If set to true, no calculation is done and the base fee returned by the keeper is zero.

`EnableHeight` controls the height we start the calculation.

- If `NoBaseFee = false` and `height < EnableHeight`, the base fee value will be equal to `base_fee` defined in the genesis and the `BeginBlock` will return without further computation.
- If `NoBaseFee = false` and `height >= EnableHeight`, the base fee is dynamically calculated upon each block at `BeginBlock`.

Those parameters allow us to introduce a static base fee or activate the base fee at a later stage.

### Enabling base fee

To enable EIP1559 with the EVM, the following parameters should be set :

- NoBaseFee should be false
- EnableHeight should be set to a positive integer >= upgrade height. It defines at which height the chain starts the base fee adjustment
- LondonBlock evm's param should be set to a positive integer >= upgrade height. It defines at which height the chain start to accept EIP1559 transactions

### Calculation

The base fee is initialized at `EnableHeight` to the `InitialBaseFee` value defined in the genesis file.

The base fee is after adjusted according to the total gas used in the previous block.

```golang
parent_gas_target = parent_gas_limit / ELASTICITY_MULTIPLIER

if EnableHeight == block.number
    base_fee = INITIAL_BASE_FEE
else if parent_gas_used == parent_gas_target:
    base_fee = parent_base_fee
else if parent_gas_used > parent_gas_target:
    gas_used_delta = parent_gas_used - parent_gas_target
    base_fee_delta = max(parent_base_fee * gas_used_delta / parent_gas_target / BASE_FEE_MAX_CHANGE_DENOMINATOR, 1)
    base_fee = parent_base_fee + base_fee_delta
else:
    gas_used_delta = parent_gas_target - parent_gas_used
    base_fee_delta = parent_base_fee * gas_used_delta / parent_gas_target / BASE_FEE_MAX_CHANGE_DENOMINATOR
    base_fee = parent_base_fee - base_fee_delta

```
