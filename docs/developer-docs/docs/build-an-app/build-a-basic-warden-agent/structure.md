---
sidebar_position: 2
---

# Basic Trading Agent Structure

Let's create the fundamental structure for our trading agent. We'll break this into clear, manageable parts:

## Create the basic Types for our agent. Create a file `Types.sol:`

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.25;

library Types {
    // Definition for trade parameters
    struct TradeConfig {
        uint256 thresholdPrice;    // Price threshold for trade execution
        address tokenIn;           // Token being sold
        address tokenOut;          // Token being bought
        uint256 amountIn;         // Amount of tokenIn to sell
        uint256 minAmountOut;     // Minimum amount of tokenOut to receive
        uint256 deadline;         // Deadline for trade execution
    }

    // Price monitoring configuration
    struct PriceCondition {
        bool isGreaterThan;       // true for price >, false for price 
        uint256 targetPrice;      // Target price to compare against
        address priceFeed;        // Address of price feed contract
    }

    // Complete agent configuration
    struct AgentConfig {
        TradeConfig trade;
        PriceCondition priceCondition;
        address beneficiary;      // Address to receive traded tokens
    }
}
```

## Create the interface for our agent in `ITradeAgent.sol:`

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.25;

import "./Types.sol";

interface ITradeAgent {
    // Core functionality
    function checkConditions() external view returns (bool);
    function executeTrade() external returns (bool);
    
    // State checks
    function isExecuted() external view returns (bool);
    function getConfig() external view returns (Types.AgentConfig memory);
    
    // Events
    event TradeExecuted(
        address indexed tokenIn,
        address indexed tokenOut,
        uint256 amountIn,
        uint256 amountOut
    );
}
```

This sets up the foundation for building our agent. The key components we've defined:

- Clear data structures for configuration
- Interface defining core functionality
- Event for tracking trade execution
- Basic state management

Explanation of the components:

- **TradeConfig:** Defines the parameters for the Uniswap trade
- **PriceCondition:** Specifies when a trade should execute
- **AgentConfig:** Combines all configuration into one structure
- **ITradeAgent:** Defines the required functionality for any trading agent
