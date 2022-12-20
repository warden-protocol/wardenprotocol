<!--
order: 7 -->

# Parameters

The `x/feemarket` module contains the following parameters:

| Key                           | Type   | Default Values     |  Description |
| ----------------------------- | ------ | ----------- |------------- |
| NoBaseFee                     | bool   | false       | control the base fee adjustment |
| BaseFeeChangeDenominator      | uint32 | 8           | bounds the amount the base fee that can change between blocks |
| ElasticityMultiplier          | uint32 | 2           | bounds the threshold which the base fee will increase or decrease depending on the total gas used in the previous block|
| BaseFee                      | uint32 | 1000000000  | base fee for EIP-1559 blocks |
| EnableHeight                  | uint32 | 0           | height which enable fee adjustment |
| MinGasPrice                   | sdk.Dec | 0          | global minimum gas price that needs to be paid to include a transaction in a block |
