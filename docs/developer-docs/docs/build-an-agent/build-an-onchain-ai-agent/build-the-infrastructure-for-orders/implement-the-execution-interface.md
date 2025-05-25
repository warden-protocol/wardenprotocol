---
sidebar_position: 3
---

# Implement the execution interface

## Overview

The `IExecution` contract allows executing an Order, getting a list of authorized callers, and checking the execution status. You can use this execution interface to create custom Orders.

:::note Directory
Store `IExecution` in the [`src` directory](https://github.com/warden-protocol/wardenprotocol/blob/main/solidity/orders/src), alongside with other contracts.
:::

:::note Full code
You can find the full code on GitHub: [`src/IExecution.sol`](https://github.com/warden-protocol/wardenprotocol/tree/main/solidity/orders/src/types)
:::

## Create the `IExecution` contract

Implement the execution interface in a file `IExecution.sol`:

```solidity title="src/IExecution.sol"
interface IExecution {
    // Check if an Order can be executed
    function canExecute() external view returns (bool);
    
    // Execute an Order
    function execute(
        uint256 nonce,
        uint256 gas,
        uint256 gasPrice,
        uint256 maxPriorityFeePerGas,  // for EIP-1559 transactions
        uint256 maxFeePerGas           // for EIP-1559 transactions
    ) external returns (bool, bytes32);
    
    // Get a list of authorized callers
    function callers() external returns (Caller[] memory callersList);
    
    // Check the execution status
    function isExecuted() external returns (bool);
}
```

## Next steps

- After implementing the execution interface, you can [implement the creation of Orders](implement-the-creation-of-orders).
