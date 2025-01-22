---
sidebar_position: 1
---

# Introduction

## Execution Agent

Warden allows you to build your own on-chain **Warden Agents** with custom capabilities. The most important feature of Warden Agents is the ability to deploy smart contracts utilizing outputs of AI models.

This section covers an example we implemented for demonstration purposes. It's a Warden Agent that automatically executes **Orders** — smart contracts acting as Agents that perform on-chain actions.

You'll learn how to implement two types of Orders:

- **Automated Orders**  
  Automated Orders allow users to automatically execute token swaps on Uniswap when user-defined price thresholds are met.
- **Automated Orders with price prediction**  
  These Orders use the `x/async` module to make AI-driven price predictions and perform token swaps based on them.

:::note Full code
Please note that the articles in this section typically contain only fragments of code.  
You can find the full code of the example Warden Agent on [GitHub](https://github.com/warden-protocol/wardenprotocol/tree/main/solidity).
:::

## Architecture

**Automated Orders** and **Automated Orders with price prediction** are implemented as two separate smart contracts. However, they share [common infrastructure](/category/build-the-infrastructure-for-orders) such as helper contracts, mock precompiles, and so on.

The overall architecture of the Warden Agent for executing Orders includes the following components:

- **Core trading logic**  
  - [`BasicOrder`](implement-automated-orders/implement-orders)/[`AdvancedOrder`](implement-automated-orders-with-price-prediction/implement-orders): Smart contracts implementing automated Orders and automated Orders with price prediction
- **Management layer**
  - [`BasicOrderFactory`](build-the-infrastructure-for-orders/implement-the-creation-of-orders)/[`AdvancedOrderFactory`](build-the-infrastructure-for-orders/implement-the-creation-of-orders): Contracts for creating and tracking Orders
  - [`OrderFactory`](build-the-infrastructure-for-orders/implement-the-creation-of-orders): A contract facilitating the creation of Orders
  - [`IExecution`](build-the-infrastructure-for-orders/implement-the-execution-interface): A contract implementing the Order execution interface
  - [`Registry`](build-the-infrastructure-for-orders/create-helpers-and-utils#3-implement-the-registry): A contract implementing a registry for storing the Order and transaction data
- **Services**
  - [Warden](build-the-infrastructure-for-orders/create-mock-precompiles#12-create-a-warden-precompile): A mock precompile for signing transactions
  - [Slinky](build-the-infrastructure-for-orders/create-mock-precompiles#11-create-a-slinky-precompile): A mock precompile for fetching prices
  - Uniswap V2: An external service that allows executing token swaps

## Get started

To get started, first [build the infrastructure for Orders](/category/build-the-infrastructure-for-orders)ю
