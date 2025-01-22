---
sidebar_position: 2
---

# Create helpers and utils

## Overview

This article will guide you through building a foundation for the Basic Agent. You'll create helper libraries and contracts defining the core data structures and interfaces for managing Orders.

:::note Directory
Store helper libraries and contracts in the [`/src`](https://github.com/warden-protocol/wardenprotocol/blob/main/solidity/orders/src) directory.
:::

## 1. Define data structures

First, create a library `Types.sol`  with the core data structures:

:::note Full code
You can find the full code on GitHub: [`/src/Types.sol`](https://github.com/warden-protocol/wardenprotocol/blob/main/solidity/orders/src/Types.sol)
:::

```solidity title="/src/Types.sol"
library Types {
    // Define swap parameters for Uniswap
    struct SwapData {
        uint256 amountIn;          // The amount of input tokens
        address[] path;            // The trading path through Uniswap
        address to;                // The recipient address
        uint256 deadline;          // The transaction deadline
    }

    // A price condition for flexible trading
    enum PriceCondition {
        LTE,    // Less than or equal to the threshold
        GTE     // Greater than or equal to the threshold
    }

    // The main order configuration
    struct OrderData {
        uint256 thresholdPrice;
        PriceCondition priceCondition;
        PricePair pricePair;
        CreatorDefinedTxFields creatorDefinedTxFields;
        SwapData swapData;
        SignRequestData signRequestData;
    }
}
```

## 2. Create the execution interface

The execution interface allows executing an Order, getting a list of authorized callers, and checking the execution status.

Implement the execution interface in a file `IExecution.sol`:

:::note Full code
You can find the full code on GitHub: [`/src/IExecution.sol`](https://github.com/warden-protocol/wardenprotocol/blob/main/solidity/orders/src/IExecution.sol)
:::

```solidity title="/src/IExecution.sol"
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

## 3. Implement the registry

In a file `Registry.sol`, implement a registry for tracking transactions:

:::note Full code
You can find the full code on GitHub: [`/src/Registry.sol`](https://github.com/warden-protocol/wardenprotocol/blob/main/solidity/orders/src/Registry.sol)
:::

```solidity title="/src/Registry.sol"
contract Registry is ReentrancyGuard {
    // Track Order creators
    mapping(address executionAddress => address orderCreator) public executions;
    
    // Store the transaction data
    mapping(bytes32 txHash => bytes tx) public transactions;

    // Register an Order with additional validation
    function register(address execution) public {
        if (execution == address(0)) {
            revert InvalidExecutionAddress();
        }
        // Additional validation...
        
        executions[execution] = msg.sender;
        emit Registered(msg.sender, execution);
    }
}
```

## 4. Implement the RLP encoding

To support EIP-1559 transactions, create an `RLPEncode.sol` file implementing the RLP encoding:

:::note Full code
You can find the full code on GitHub: [`/src/RLPEncode.sol`](https://github.com/warden-protocol/wardenprotocol/blob/main/solidity/orders/src/RLPEncode.sol)
:::

```solidity title="/src/RLPEncode.sol"
library RLPEncode {
    // Implement the RLP encoding for EIP-1559 transactions
    function encodeTransaction(
        Types.OrderData memory orderData,
        uint256 nonce,
        uint256 gas,
        uint256 maxPriorityFeePerGas,
        uint256 maxFeePerGas
    ) internal pure returns (bytes memory) {
        bytes[] memory txArray = new bytes[](9);
        // Transaction encoding...
        return RLPEncode.encodeList(txArray);
    }
}
```

## Next steps

- After building the foundation for Agents, you can [create mock precompiles](create-mock-precompiles).
- Later, when you deploy your Agent, you'll be able to [get data from the registry](../implement-automated-orders/deploy-an-order#get-data-from-the-registry).