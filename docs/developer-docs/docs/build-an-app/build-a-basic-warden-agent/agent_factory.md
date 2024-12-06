---
sidebar_position: 4
---

# Agent Factory Contract

## Implementing the Agent Factory Contract

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.25;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./UniswapTradeAgent.sol";

contract TradeAgentFactory is Ownable {
    address public immutable uniswapRouter; // Can't be changed after deployment
    mapping(address => address) public agentOwners; // Tracks who owns which agent
    
    event AgentCreated(address indexed owner, address indexed agent);
    
    constructor(address _uniswapRouter) Ownable(msg.sender) {
        uniswapRouter = _uniswapRouter;
    }
    
    function createAgent(Types.AgentConfig memory config) // Creates new agent with given config
        external 
        returns (address)
    {
        UniswapTradeAgent agent = new UniswapTradeAgent(
            config,
            uniswapRouter
        );
        
        agentOwners[address(agent)] = msg.sender;
        emit AgentCreated(msg.sender, address(agent));
        
        return address(agent);
    }
    
    function isAgentOwner(address agent, address owner) // Verifies agent ownership
        external 
        view 
        returns (bool)
    {
        return agentOwners[agent] == owner;
    }
}
```

The `TradeAgentFactory` contract serves as a factory pattern implementation for **creating** and **managing** trading agents. Here's what it does:

### Core Functionality

1. Creates new `UniswapTradeAgent` instances
2. Maintains a registry of agent ownership
3. Ensures consistent Uniswap router usage across all agents

### Main Security Features

1. Ownable for factory management
2. Immutable router address
3. Transparent ownership tracking
