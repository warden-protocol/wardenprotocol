---
sidebar_position: 1
---

# Introduction

## Example Orders

This section explains how to enable onchain capabilities for a **Warden Agent** created with the [Warden Agent Kit](../warden-agent-kit/introduction).

The guides you'll find here cover an example we created for demonstration purposes. It implements **Orders**—[Solidity smart contracts](/build-an-app/deploy-smart-contracts-on-warden/deploy-an-evm-contract) performing onchain Actions and utilizing **AI-driven price predictions** on any destination chain.

:::tip
In our example, Orders perform swaps on Uniswap, but you can make them send any transactions to any Ethereum-based and EVM L2 application. For example, your application can transfer ETH or call an arbitrary contract. You can implement custom logic by using [Warden modules](/learn/warden-protocol-modules/introduction), [Keychains](/learn/glossary#keychain), and other features. In particular, the [`x/async` module](/learn/warden-protocol-modules/x-async) and [AVR Plugins](/learn/warden-protocol-modules/x-async#avr-plugin) allow you to create smart contracts utilizing outputs of **AI models**.
:::

## Order types

You'll learn how to build two types of Orders:

- **Automated Orders**: the [`BasicOrder` contract](implement-automated-orders#1-implement-orders)  

  Basic automated Orders monitor prices and automatically execute token swaps on Uniswap when user-defined price thresholds are met. These Orders use the [`x/oracle` module](/learn/warden-protocol-modules/external-modules#xoracle) to fetch oracle prices and [`x/warden`](/learn/warden-protocol-modules/x-warden) to sign transactions with [Keychains](/learn/warden-protocol-modules/x-warden#keychain).

- **Automated Orders with price prediction**: the [`AdvancedOrder` contract](implement-orders-with-price-prediction#1-implement-orders)  

  This is a more advanced version of automated Orders. These Orders fetch AI-driven price predictions using the [`x/async` module](/learn/warden-protocol-modules/x-async) and an [AVR Plugin](/learn/warden-protocol-modules/x-async#avr-plugin), compare the predicted and oracle prices, and perform token swaps based on user-defined comparison conditions.

  :::tip
  The price prediction model is just an example of what you can build with [`x/async`](/learn/warden-protocol-modules/x-async) and [AVR Plugins](/learn/warden-protocol-modules/x-async#avr-plugin). With this module, you can implement any logic combining offchain computation with onchain verification—limited only by your imagination.
  ::: 

## Full code

:::note Code
You can find the full code of the example on GitHub: [`orders`](https://github.com/warden-protocol/wardenprotocol/tree/v0.6.3/solidity/orders)
:::

## Architecture

The core logic of Orders is implemented in two smart contracts:

- [`BasicOrder`](implement-automated-orders#1-implement-orders): Implements Automated Orders using [`x/oracle`](/learn/warden-protocol-modules/external-modules#xoracle) to fetch prices.
- [`AdvancedOrder`](implement-orders-with-price-prediction#1-implement-orders): Implements Orders with price prediction using [`x/oracle`](/learn/warden-protocol-modules/external-modules#xoracle) and [`x/async`](/learn/warden-protocol-modules/x-async) to fetch prices and predictions.

Both Order types share [common infrastructure](build-the-infrastructure): data structures, utils, deployment scripts, and so on. [`AbstractOrderV0`](build-the-infrastructure#5-implement-transaction-signing) abstracts the transaction signing logic using [`x/warden`](/learn/warden-protocol-modules/x-warden).

Order creation is handled by a set of factory contracts: [`OrderFactory`](build-the-infrastructure#6-implement-order-creation), [`BasicOrderFactory`](implement-automated-orders#2-implement-order-creation), and [`AdvancedOrderFactory`](implement-orders-with-price-prediction#2-implement-order-creation). Depending on the Order type selected by a user, `OrderFactory` invokes either `BasicOrderFactory` or `AdvancedOrderFactory`, which then deploy the corresponding `BasicOrder` or `AdvancedOrder` contracts.

## Development path

To implement and understand our example, follow these steps:

1. Implement the shared infrastructure used by both Order types.
2. Build automated Orders to learn the core mechanics, including the Order lifecycle, price monitoring, and execution flow.
3. Extend to automated Orders with price prediction by adding price prediction integration, time windows, and complex conditions.

Order types differ not just in functionality, but also in development complexity. Below is a high-level comparison of their state, integrations, and execution logic:

#### Automated Orders

```solidity
contract BasicOrder {
    // Simple state
    bool private _executed;
    
    // Single price source
    ISlinky private immutable SLINKY_PRECOMPILE;
    
    // Simple execution check
    function canExecute() public view returns (bool) {
        return priceResponse.price >= threshold;
    }
}
```

#### Automated Orders with price prediction

```solidity
contract AdvancedOrder {
    // Complex state
    uint64 public taskId;
    uint256 private _validUntil;
    
    // Multiple integrations
    ISlinky private immutable SLINKY_PRECOMPILE;
    IAsync private immutable ASYNC_PRECOMPILE;
    
    // Advanced execution check
    function canExecute() public view returns (bool) {
        if (block.timestamp > _validUntil) return false;
        taskByIdResponse memory task = ASYNC_PRECOMPILE.taskById(taskId);
        return _checkPredictionAndPrice(task, getCurrentPrice());
    }
}
```

## Get started

You can get started in different ways, depending on your focus:

- To test the creation of Orders with price prediction, run [Demo: Create an Order](demo-create-an-order).
- To start implementing Orders, [meet the prerequisites](prerequisites) and [build the infrastructure](build-the-infrastructure).
- To dive into the core logic, explore the [`BasicOrder`](implement-automated-orders#1-implement-orders) and [`AdvancedOrder`](implement-orders-with-price-prediction#1-implement-orders) contracts.
