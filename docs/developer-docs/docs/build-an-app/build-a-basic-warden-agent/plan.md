---
sidebar_position: 1
---

# Introduction

## Basic Warden Agent

This section explains how to build a **Basic Warden Agent**.

The Basic Agent allows users to automatically execute token swaps on **Uniswap** when user-defined price thresholds are met.

:::note Full code
Please note that the articles in this section typically contain only fragments of code.  
You can find the full code of the Basic Warden Agent on [GitHub](https://github.com/warden-protocol/wardenprotocol/tree/main/solidity).
:::

## Architecture

The architecture of the Basic Warden Agent includes the following components:

- **Core trading logic**  
  - [`BasicOrder`](main_contract): A contract implementing **basic orders** that monitor prices and trade on Uniswap
- **Management layer**
  - [`OrderFactory`](agent_factory): A contract for creating and tracking orders
  - [`Registry`](structure#3-implement-the-registry): A contract implementing a registry for storing the order and transaction data
- **Services**
  - [Warden](precompiles#12-create-a-warden-precompile): A mock precompile for signing transactions
  - [Slinky](precompiles#11-create-a-slinky-precompile): A mock precompile for fetching prices
  - Uniswap V2: An external service that allows executing token swaps

## User flow

Each Basic Agent user can create and manage multiple Uniswap orders.

The user flow for executing a swap includes the following steps:

1. The user defines the trading strategy details:
    - The price threshold and condition (greater/less than)
    - The token pair to monitor
    - Swap details such as amount, path, recipient, deadline
    - Transaction signing details
2. The [`OrderFactory` ](agent_factory) contract deploys a new [`BasicOrder`](main_contract) contract (order) and registers it in the [registry](structure#3-implement-the-registry).
3. The order continuously monitors prices using [Slinky](precompiles#11-create-a-slinky-precompile).
4. When the price threshold is met, the order executes a swap:
    - Constructs a swap transaction
    - Sends the transaction to [Warden](precompiles#12-create-a-warden-precompile) for signing
    - Records the transaction in the [registry](structure#3-implement-the-registry)
    - Executes the swap on Uniswap
5. Transaction details are stored in the [registry](structure#3-implement-the-registry) for verification and tracking.
