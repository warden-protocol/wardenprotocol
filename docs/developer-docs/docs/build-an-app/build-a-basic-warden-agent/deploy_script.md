---
sidebar_position: 7
---

# Create deployment scripts

## Overview

This tutorial explains how to implement the main deployment script and the script for creating orders.

:::note Directory
Store your scriptw in the [`/script`](https://github.com/warden-protocol/wardenprotocol/blob/main/solidity/orders/mocks) directory.
:::

## 1. Implement the main deployment script

The main deployment script handles the following tasks:

- Deploys [`Registry`](structure#3-implement-the-registry)
- Deploys [`OrderFactory`](agent_factory)
- Configures the environment

To implement this script, use the following code:

:::note Full code
You can find the full code on GitHub: [`/script/Deploy.s.sol`](https://github.com/warden-protocol/wardenprotocol/blob/main/solidity/orders/script/Deploy.s.sol)
:::

```solidity title="/script/Deploy.s.sol"
contract Deploy is Script {
    function run() external {
        vm.startBroadcast(broadcaster);
        
        // An optional registry reuse
        Registry registry = registryAddress != address(0) 
            ? Registry(registryAddress)
            : new Registry();
            
        new OrderFactory(
            address(registry),
            scheduler,
            factoryOwner
        );

        vm.stopBroadcast();
    }
}
```

## 2. Implement the script for creating orders


This script for creating orders handles the following tasks:

- Deploys [`BasicOrder`](main_contract) through [`OrderFactory`](agent_factory)
- Sets up [mock precompiles](precompiles)
- Configures parameters

To implement this script, use the following code:

:::note Full code
You can find the full code on GitHub: [`/script/CreateOrder.s.sol`](https://github.com/warden-protocol/wardenprotocol/blob/main/solidity/orders/script/CreateOrder.s.sol)
:::

```solidity title="/script/CreateOrder.s.sol"
contract CreateOrder is Script {
    function run(
        uint256 thresholdPrice,
        Types.PriceCondition priceCondition,
        // ... other parameters
    ) external {
        // NEW: Setup mock services
        MockSlinkyPrecompile mSlinkyPrecompile = new MockSlinkyPrecompile();
        MockWardenPrecompile wPrecompile = new MockWardenPrecompile();
        
        // Create order through factory
        FACTORY.createOrder(orderData, maxKeychainFees, OrderType.Basic);
    }
}
```

## Next steps

After implementing the deployment scripts, you can finally [deploy the Basic Agent](deployment).