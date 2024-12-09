---
sidebar_position: 2
---

# Trading Agent Structure

Let's create the fundamental structure for our trading agent. We'll break this into clear, manageable parts:

## Create the basic Types for our agent. Create a file `Types.sol:`

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.25 <0.9.0;

library Types {
    // Data for swapExactETHForTokens method
    struct SwapData {
        uint256 amountIn;
        address[] path;
        address to;
        uint256 deadline;
    }

    // Sign request data
    struct SignRequestData {
        uint64 keyId;
        bytes[] analyzers;
        bytes encryptionKey;
        uint64 spaceNonce;
        uint64 actionTimeoutHeight;
        string expectedApproveExpression;
        string expectedRejectExpression;
    }

    enum PriceCondition {
        LTE,
        GTE
    }

    struct OrderData {
        uint256 thresholdPrice;
        PriceCondition priceCondition;
        PricePair pricePair;
        CreatorDefinedTxFields creatorDefinedTxFields;
        SwapData swapData;
        SignRequestData signRequestData;
    }

    struct PricePair {
        string base;
        string quote;
    }

    struct CreatorDefinedTxFields {
        uint256 value;
        uint256 chainId;
        address to;
    }
}
```

## Create the interface for our agent in `src/IExecution.sol:`

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.25 <0.9.0;

struct ExecutionData {
    address caller;
    address to;
    uint256 chainId;
    bytes data;
    uint256 value;
}

enum Caller {
    Scheduler,
    AI
}

interface IExecution {
    function canExecute() external view returns (bool);
    
    function execute(
        uint256 nonce,
        uint256 gas,
        uint256 gasPrice,
        uint256 maxPriorityFeePerGas,
        uint256 maxFeePerGas
    ) external returns (bool, bytes32);
    
    function callers() external returns (Caller[] memory callersList);
    
    function setByAIService(bytes calldata data) external returns (bool success);
    
    function isExecuted() external returns (bool);
    
    function executionData() external returns (ExecutionData memory executionData);
    
    function getTx() external returns (bytes memory tx);
}
```

These two files establish the foundational types and interfaces for our project. They create a framework for:

- Defining trade parameters
- Setting price conditions
- Managing transaction signing
- Executing trades through Uniswap
- Tracking trade status
