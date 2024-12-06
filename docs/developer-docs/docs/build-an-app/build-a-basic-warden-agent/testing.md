---
sidebar_position: 5
---

# Testing Agent

## Implementing the test for Trading Agent System

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.25;

import "forge-std/Test.sol";
import "../src/UniswapTradeAgent.sol";
import "../src/TradeAgentFactory.sol";

contract UniswapTradeAgentTest is Test {
    TradeAgentFactory factory;
    address mockRouter = address(1);
    address mockToken1 = address(2);
    address mockToken2 = address(3);
    
    function setUp() public {
        factory = new TradeAgentFactory(mockRouter);
    }
    
    function test_CreateAgent() public {
        Types.AgentConfig memory config = Types.AgentConfig({
            trade: Types.TradeConfig({
                thresholdPrice: 100,
                tokenIn: mockToken1,
                tokenOut: mockToken2,
                amountIn: 1e18,
                minAmountOut: 1e17,
                deadline: block.timestamp + 1 hours
            }),
            priceCondition: Types.PriceCondition({
                isGreaterThan: true,
                targetPrice: 100,
                priceFeed: address(4)
            }),
            beneficiary: address(this)
        });
        
        address agent = factory.createAgent(config);
        assertTrue(factory.isAgentOwner(agent, address(this)));
        
        UniswapTradeAgent tradeAgent = UniswapTradeAgent(agent);
        assertFalse(tradeAgent.isExecuted());
    }
}
```

The above test validates the core functionality of the trading agent system:

### Test Setup

1. Creates mock addresses for Uniswap router and tokens
2. Deploys factory contract
3. Uses Forge's testing framework

### Main Test Case

1. Creates realistic agent configuration (price threshold, tokens, amounts)
2. Deploys new agent through factory
3. Verifies ownership in factory
4. Checks agent's initial state

**The test configuration mimics a real trading scenario:**

- Trade `token1` for `token2` when price exceeds **100**, with minimum output of **0.1** of token2 and **1-hour deadline.**

In the next section of test, you will validate the complete workflow of the trading agent with three main scenarios:

1. Price Conditions Testing
2. Trade Execution Testing
3. Safety Checks

## Price Conditions Test && Mock Uniswap Integration

```solidity
// Extended test cases
function test_PriceConditionAndExecution() public {
   // Setup agent with configuration
   Types.AgentConfig memory config = createTestConfig();
   address agentAddr = factory.createAgent(config);
   UniswapTradeAgent agent = UniswapTradeAgent(agentAddr);

   // Mock price feed and router
   MockPriceFeed priceFeed = new MockPriceFeed();
   MockUniswapRouter router = new MockUniswapRouter();
   
   // Test price condition - below threshold
   priceFeed.setPrice(90);
   assertFalse(agent.checkConditions());

   // Test price condition - above threshold 
   priceFeed.setPrice(110);
   assertTrue(agent.checkConditions());

   // Test execution
   MockERC20(config.trade.tokenIn).mint(address(this), config.trade.amountIn);
   MockERC20(config.trade.tokenIn).approve(address(agent), config.trade.amountIn);

   vm.expectEmit(true, true, false, false);
   emit TradeExecuted(config.trade.tokenIn, config.trade.tokenOut, config.trade.amountIn, config.trade.minAmountOut);
   
   assertTrue(agent.executeTrade());
   assertTrue(agent.isExecuted());

   // Verify cannot execute twice
   vm.expectRevert(AlreadyExecuted.selector);
   agent.executeTrade();
}

// Helper contract mocks
contract MockPriceFeed {
   uint256 private price;
   function setPrice(uint256 _price) external {
       price = _price;
   }
   function getPrice() external view returns (uint256) {
       return price;
   }
}

contract MockUniswapRouter {
   function swapExactTokensForTokens(
       uint256 amountIn,
       uint256 amountOutMin,
       address[] calldata path,
       address to,
       uint256 deadline
   ) external returns (uint256[] memory amounts) {
       amounts = new uint256[](2);
       amounts[0] = amountIn;
       amounts[1] = amountOutMin;
       return amounts;
   }
}

contract MockERC20 {
   mapping(address => uint256) public balanceOf;
   mapping(address => mapping(address => uint256)) public allowance;

   function mint(address to, uint256 amount) external {
       balanceOf[to] += amount;
   }

   function approve(address spender, uint256 amount) external returns (bool) {
       allowance[msg.sender][spender] = amount;
       return true;
   }
}
```

This above test suite verifies:

- Price condition checking
- Trade execution mechanics
- State changes
- Event emission
- Revert conditions

The test also uses mock contracts to simulate external dependencies:

- Price feed
- Uniswap router
- ERC20 tokens
