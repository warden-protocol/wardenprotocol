---
sidebar_position: 1
---

# Introduction

## On-chain Agents

This section explains how to enable on-chain capabilities for a **Warden Agent** created with the [Warden Agent Kit](/category/warden-agent-kit).

You can create your own on-chain Agents with custom logic by using [Warden modules](/category/warden-protocol-modules), [Keychains](/learn/glossary#keychain), and other features. In particular, the [`x/async` module](/learn/warden-protocol-modules/x-async) allows you to implement Agents that deploy smart contracts utilizing outputs of AI models.

The guides you'll find here cover an example we implemented for demonstration purposes. It's a Warden Agent that automatically executes **Orders** – [Solidity smart contracts](/build-an-app/deploy-smart-contracts-on-warden/deploy-an-evm-contract) performing on-chain actions. You'll learn how to build two types of orders:

- **Automated Orders**: the [`BasicOrder`](implement-automated-orders/implement-orders) contract  

  Basic automated Orders monitor prices and automatically execute token swaps on Uniswap when user-defined price thresholds are met, signing transactions with [Keychains](/learn/glossary#keychain).
- **Automated Orders with price prediction**: the [`AdvancedOrder`](implement-automated-orders-with-price-prediction/implement-orders) contract  

  This is a more advanced version of automated Orders. It uses the [`x/async`](/learn/warden-protocol-modules/x-async) Warden module to make AI-driven price predictions. Then it performs token swaps based on these predictions, signing transactions with [Keychains](/learn/glossary#keychain).

:::note Full code
Please note that the articles in this section typically contain only fragments of code.  
You can find the full code of the example on GitHub: [/orders](https://github.com/warden-protocol/wardenprotocol/tree/main/solidity)
:::

## Architecture

The core logic of Orders in implemented in two smart contracts:

- [`BasicOrder`](implement-automated-orders/implement-orders): A contract implementing [Automated Orders](implement-automated-orders/introduction)
- [`AdvancedOrder`](implement-automated-orders-with-price-prediction/implement-orders): A contract implementing [Automated Orders with price prediction](implement-automated-orders-with-price-prediction/introduction)

Both Order types share [common infrastructure](/category/build-the-infrastructure-for-orders):

  - [Helpers and utils](build-the-infrastructure-for-orders/create-helpers-and-utils), including the [`Registry`](build-the-infrastructure-for-orders/create-helpers-and-utils#3-implement-the-registry) contract for storing the Order and transaction data
  - [Warden](build-the-infrastructure-for-orders/create-mock-precompiles#12-create-a-warden-precompile) & [Slinky](build-the-infrastructure-for-orders/create-mock-precompiles#11-create-a-slinky-precompile): Mock precompiles for signing transactions and fetching prices
  - [`IExecution`](build-the-infrastructure-for-orders/implement-the-execution-interface): A contract implementing the Order execution interface
  - [`OrderFactory`](build-the-infrastructure-for-orders/implement-the-creation-of-orders): A contract facilitating the creation of Orders


## Get started

To get started, take thise steps:

1. [Meet the prerequistes](prerequisites).
2. [Build the infrastructure for Orders](/category/build-the-infrastructure-for-orders).