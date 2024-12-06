---
sidebar_position: 3
---

# Trading Agent Contract

## Let's create our main trading agent contract that implements our interface

We'll create `UniswapTradeAgent.sol:`

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.25;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";
import "./ITradeAgent.sol";
import "./Types.sol";

contract UniswapTradeAgent is ITradeAgent {
    // State variables
    Types.AgentConfig private config;
    bool private executed;
    IUniswapV2Router02 private immutable uniswapRouter;
    
    // Errors
    error AlreadyExecuted();
    error ConditionsNotMet();
    error TradeExecutionFailed();
    
    constructor(
        Types.AgentConfig memory _config,
        address _uniswapRouter
    ) {
        config = _config;
        uniswapRouter = IUniswapV2Router02(_uniswapRouter);
        executed = false;
    }
    
    function checkConditions() public view override returns (bool) {
        if (executed) return false;
        
        // Get current price from price feed
        // In practice, you'd want to implement proper price feed integration
        uint256 currentPrice = getCurrentPrice();
        
        if (config.priceCondition.isGreaterThan) {
            return currentPrice > config.priceCondition.targetPrice;
        } else {
            return currentPrice < config.priceCondition.targetPrice;
        }
    }
    
    function executeTrade() external override returns (bool) {
        if (executed) revert AlreadyExecuted();
        if (!checkConditions()) revert ConditionsNotMet();
        
        // Approve router to spend token
        IERC20(config.trade.tokenIn).approve(
            address(uniswapRouter),
            config.trade.amountIn
        );
        
        // Setup path for swap
        address[] memory path = new address[](2);
        path[0] = config.trade.tokenIn;
        path[1] = config.trade.tokenOut;
        
        // Execute swap
        try uniswapRouter.swapExactTokensForTokens(
            config.trade.amountIn,
            config.trade.minAmountOut,
            path,
            config.beneficiary,
            config.trade.deadline
        ) returns (uint256[] memory amounts) {
            executed = true;
            emit TradeExecuted(
                config.trade.tokenIn,
                config.trade.tokenOut,
                amounts[0],
                amounts[1]
            );
            return true;
        } catch {
            revert TradeExecutionFailed();
        }
    }
    
    function isExecuted() external view override returns (bool) {
        return executed;
    }
    
    function getConfig() external view override returns (Types.AgentConfig memory) {
        return config;
    }
    
    // Internal helper function - in practice, implement proper price feed
    function getCurrentPrice() internal view returns (uint256) {
        // Implement price feed integration here
        return 0;
    }
}
```

### Code Explanation

- Monitors token prices and executes trades on Uniswap when price conditions are met
- Acts as a self-executing trading bot on-chain

### Main Components

- **Config Storage:** Stores trading parameters, price conditions, and beneficiary
- **State Tracking:** Tracks if trade has been executed
- **Price Checking:** `checkConditions()` verifies if price conditions are met
- **Trade Execution:** `executeTrade()` performs the actual Uniswap swap

### Flow

1. Check price conditions
2. If conditions are met, then approve token spend
3. Setup trading path
4. Execute Uniswap swap
5. Mark as executed & emit event

### Safety Features

- Prevents double execution
- Ensures conditions are met before trading
- Has try/catch for swap execution
- Uses immutable router address

The contract acts like a limit order on a centralized exchange - you set a price condition, and when met, it automatically executes the trade on Uniswap.
