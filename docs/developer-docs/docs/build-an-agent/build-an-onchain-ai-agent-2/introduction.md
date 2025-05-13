---
sidebar_position: 1
---

# Introduction

## Example Orders

This section explains how to enable onchain capabilities for a **Warden Agent** created with the [Warden Agent Kit](../warden-agent-kit/introduction).

The guides you'll find here cover an example we created for demonstration purposes. It implements **Orders**—[Solidity smart contracts](/build-an-app/deploy-smart-contracts-on-warden/deploy-an-evm-contract) performing onchain Actions and utilizing **AI-driven price predictions** on any destination chain.

:::tip
In our example, Orders perform swaps on Uniswap, but you can make them send any transactions to any Ethereum-based and EVM L2 application. For example, your application can transfer ETH or call an arbitrary contract.

You can implement custom logic by using [Warden modules](/learn/warden-protocol-modules/introduction), [Keychains](/learn/glossary#keychain), and other features. In particular, the [`x/async` Warden module](/learn/warden-protocol-modules/x-async) allows you to create smart contracts utilizing outputs of **AI models**.
:::

:::note Full code
Please note that the articles in this section typically contain only fragments of code.  
You can find the full code of the example on GitHub: [`orders`](https://github.com/warden-protocol/wardenprotocol/tree/main/solidity/orders)
:::

## Order types

You'll learn how to build two types of Orders:

- **Automated Orders**: the [`BasicOrder` contract](implement-automated-orders#1-implement-orders)  

  The basic automated Orders monitor prices and automatically execute token swaps on Uniswap when user-defined price thresholds are met, signing transactions with [Keychains](/learn/glossary#keychain).

- **Automated Orders with price prediction**: the [`AdvancedOrder` contract](implement-price-prediction#1-implement-orders)  

  This is a more advanced version of automated Orders. It uses the [`x/async` module](/learn/warden-protocol-modules/x-async) to make AI-driven price predictions. Then it performs token swaps based on these predictions, signing transactions with [Keychains](/learn/glossary#keychain).

  :::note
  The price prediction model is just an example of what you can build with [`x/async`](/learn/warden-protocol-modules/x-async). With this module, you can implement any logic combining offchain computation with onchain verification—limited only by your imagination.
  ::: 

## Architecture

The core logic of Orders in implemented in two smart contracts:

- `BasicOrder`: A contract implementing [Automated Orders](implement-automated-orders)
- `AdvancedOrder`: A contract implementing [Automated Orders with price prediction](implement-price-prediction)

Both Order types share [common infrastructure](build-the-infrastructure):

  - [Helpers and utils](build-the-infrastructure#1-create-helpers-and-utils), including the `Registry` contract for storing the Order and transaction data
  - [Mock precompiles](build-the-infrastructure#2-create-mock-precompiles) for signing transactions and fetching prices: Warden & Slinky
  - [`IExecution`](build-the-infrastructure#4-implement-the-execution-interface): A contract implementing the Order execution interface
  - [`OrderFactory`](build-the-infrastructure#5-implement-the-creation-of-orders): A contract facilitating the creation of Orders

## Get started

To see how to create an automated Order with price prediction, run the [Create an Order](demo-create-an-order) demo.

To get started with implementing Orders, [meet the prerequisites](prerequisites).
