---
sidebar_position: 1
---

# Introduction

## Warden Agents

This section explains how to build **Warden Agent**.

The Basic Agent allows users to automatically execute token swaps on **Uniswap** when user-defined price thresholds are met.

:::note Full code
Please note that the articles in this section typically contain only fragments of code.  
You can find the full code of the Basic Warden Agent on [GitHub](https://github.com/warden-protocol/wardenprotocol/tree/main/solidity).
:::

## Architecture

The architecture of the Basic Warden Agent includes the following components:

- **Core trading logic**  
  - [`BasicOrder`](build-a-basic-agent/implement-basic-orders): A contract implementing **Basic Orders** that monitor prices and trade on Uniswap
- **Management layer**
  - [`OrderFactory`](build-the-infrastructure-for-agents/implement-order-factory): A contract for creating and tracking Orders
  - [`Registry`](build-the-infrastructure-for-agents/create-helpers-and-utils#3-implement-the-registry): A contract implementing a registry for storing the Order and transaction data
- **Services**
  - [Warden](build-the-infrastructure-for-agents/create-mock-precompiles#12-create-a-warden-precompile): A mock precompile for signing transactions
  - [Slinky](build-the-infrastructure-for-agents/create-mock-precompiles#11-create-a-slinky-precompile): A mock precompile for fetching prices
  - Uniswap V2: An external service that allows executing token swaps

## Get started

XXX
