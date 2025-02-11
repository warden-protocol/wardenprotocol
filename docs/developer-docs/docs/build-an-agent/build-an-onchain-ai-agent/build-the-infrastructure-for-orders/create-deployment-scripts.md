---
sidebar_position: 5
---

# Create deployment scripts

## Overview

This tutorial explains how to implement the main deployment script and the script for creating Orders.

:::note Directory
Store your scripts in the [`script` directory](https://github.com/warden-protocol/wardenprotocol/tree/main/solidity/orders/script).
:::

## 1. Implement the main deployment script

The main deployment script handles the following tasks:

- Deploys [`OrderFactory`](implement-the-creation-of-orders)
- Deploys [`Registry`](create-helpers-and-utils#3-implement-the-registry)
- Configures the environment

To implement this script, use the following code:

:::note Full code
You can find the full code on GitHub: [`script/Deploy.s.sol`](https://github.com/warden-protocol/wardenprotocol/blob/main/solidity/orders/script/Deploy.s.sol)
:::

```solidity title="script/Deploy.s.sol"
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

## 2. Implement the script for creating Orders

This script for creating Orders handles the following tasks:

- Deploys [`BasicOrder`](../implement-automated-orders/implement-orders) through [`OrderFactory`](implement-the-creation-of-orders)
- Sets up [mock precompiles](create-mock-precompiles)
- Configures parameters

To implement this script, use the following code:

:::note Full code
You can find the full code on GitHub: [`script/CreateOrder.s.sol`](https://github.com/warden-protocol/wardenprotocol/blob/main/solidity/orders/script/CreateOrder.s.sol)
:::

```solidity title="script/CreateOrder.s.sol"
contract CreateOrder is Script {
    function run(
        uint256 thresholdPrice,
        Types.PriceCondition priceCondition,
        // ... other parameters
    ) external {
        // NEW: Setup mock services
        MockSlinkyPrecompile mSlinkyPrecompile = new MockSlinkyPrecompile();
        MockWardenPrecompile wPrecompile = new MockWardenPrecompile();
        
        // Create an Order through the OrderFactory contract
        FACTORY.createOrder(orderData, maxKeychainFees, OrderType.Basic);
    }
}
```

## Next steps

After implementing the deployment scripts, you can finally start implementing Orders. You can choose one of the two Order types:

- [Automated Orders](/category/implement-automated-orders)
- [Automated Orders with price prediction](/category/implement-automated-orders-with-price-prediction)
