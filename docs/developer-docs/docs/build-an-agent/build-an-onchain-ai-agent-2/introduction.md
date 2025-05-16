---
sidebar_position: 1
---

# Introduction

## Example Orders

This section explains how to enable onchain capabilities for a **Warden Agent** created with the [Warden Agent Kit](../warden-agent-kit/introduction).

The guides you'll find here cover an example we created for demonstration purposes. It implements **Orders**—[Solidity smart contracts](/build-an-app/deploy-smart-contracts-on-warden/deploy-an-evm-contract) performing onchain Actions and utilizing **AI-driven price predictions** on any destination chain.

:::tip
In our example, Orders perform swaps on Uniswap, but you can make them send any transactions to any Ethereum-based and EVM L2 application. For example, your application can transfer ETH or call an arbitrary contract.

You can implement custom logic by using [Warden modules](/learn/warden-protocol-modules/introduction), [Keychains](/learn/glossary#keychain), and other features. In particular, the [`x/async` module](/learn/warden-protocol-modules/x-async) and [AVR Plugins](/learn/warden-protocol-modules/x-async#avr-plugin) allow you to create smart contracts utilizing outputs of **AI models**.
:::

:::note Code
You can find the full code of the example on GitHub: [`orders`](https://github.com/warden-protocol/wardenprotocol/tree/main/solidity/orders)
:::

## Order types

You'll learn how to build two types of Orders:

- **Automated Orders**: the [`BasicOrder` contract](implement-automated-orders#1-implement-orders)  

  Basic automated Orders monitor prices and automatically execute token swaps on Uniswap when user-defined price thresholds are met. These Orders use the [`x/oracle` module](learn/warden-protocol-modules/external-modules#xoracle) to fetch oracle prices and [`x/warden`](/learn/warden-protocol-modules/x-warden) to sign transactions with [Keychains](/learn/warden-protocol-modules/x-warden#keychain).

- **Automated Orders with price prediction**: the [`AdvancedOrder` contract](implement-orders-with-price-prediction#1-implement-orders)  

  This is a more advanced version of automated Orders. These Orders fetch AI-driven price predictions using the [`x/async` module](/learn/warden-protocol-modules/x-async) and an [AVR Plugin](/learn/warden-protocol-modules/x-async#avr-plugin), compare the predicted and oracle prices, and perform token swaps based on user-defined comparison conditions.

  :::tip
  The price prediction model is just an example of what you can build with [`x/async`](/learn/warden-protocol-modules/x-async) and [AVR Plugins](/learn/warden-protocol-modules/x-async#avr-plugin). With this module, you can implement any logic combining offchain computation with onchain verification—limited only by your imagination.
  ::: 

## Architecture

The core logic of Orders is implemented in two smart contracts:

- `BasicOrder`: A contract implementing Automated Orders
- `AdvancedOrder`: A contract implementing Automated Orders with price prediction

Both Order types share [common infrastructure](build-the-infrastructure):

  - [Helpers and utils](build-the-infrastructure#1-create-helpers-and-utils), including the `Registry` contract for storing the Order and transaction data
  - [Mock precompiles](build-the-infrastructure#2-create-mock-precompiles) for signing transactions and fetching prices: Warden & Slinky
  - [`IExecution`](build-the-infrastructure#3-implement-the-execution-interface): A contract implementing the Order execution interface
  - [`OrderFactory`](build-the-infrastructure#4-implement-order-creation): A contract facilitating the creation of Orders
  - Scripts for deploying the infrastructure and orders

## Get started

You can take either of these steps to get started:

- To test the creation of Orders with price prediction, run the [Create an Order](demo-create-an-order) demo.
- To start implementing Orders, [meet the prerequisites](prerequisites) and [build the infrastructure](build-the-infrastructure).
- To explore the core logic, see the [`BasicOrder`](implement-automated-orders#1-implement-orders) and [`AdvancedOrder`](implement-orders-with-price-prediction#1-implement-orders) contracts.
