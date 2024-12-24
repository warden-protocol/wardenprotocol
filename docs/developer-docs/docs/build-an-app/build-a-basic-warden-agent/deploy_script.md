---
sidebar_position: 7
---

# Implement the deployment scripts

## Overview

Let's implement the deployment scripts. We'll need two scripts: one for deployment and one for creating orders.

## 1. Implement a script for deployment

:::note GitHub
You can find the full code on GitHub: [`/script/Deploy.s.sol`](https://github.com/warden-protocol/wardenprotocol/blob/main/solidity/orders/script/Deploy.s.sol)
:::

```solidity title="/script/Deploy.s.sol"
contract Deploy is Script {
    function run() external {
        vm.startBroadcast(broadcaster);
        
        // NEW: Optional registry reuse
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

This script handles the following tasks:

1. Registry deployment
2. Factory deployment
3. Environment configuration

## 2. Implement a script for creating orders

:::note GitHub
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

This script handles the following tasks:

1. Order creation through factory
2. Mock precompiles setup
3. Parameter configuration

## Next steps

After creating implementing the deployment scripts, you can finally [deploy the trading Agent](deployment).