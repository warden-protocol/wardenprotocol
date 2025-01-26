---
sidebar_position: 1
---

# Introduction

## Overview

This section explains how to implement **Automated Orders** – smart contracts that monitor prices and execute token swaps on Uniswap based on simple price thresholds. This serves as a foundation for building more complex orders.

**Automated Order** provides:

- Price threshold monitoring (greater/less than or equal comparisons)
- Single price source integration
- Direct Uniswap interactions
- Basic execution security

To learn about the architecture of this project, refer to the [Execution Agent introduction](../introduction).

:::note Full code
Please note that the articles in this section typically contain only fragments of code.  
You can find the full code of the example on GitHub: [/orders](https://github.com/warden-protocol/wardenprotocol/tree/main/solidity)
:::

## User flow

A user can create and manage multiple automated Orders.

The user flow for executing a swap includes the following steps:

1. The user defines the trading strategy details:
    - The price threshold and condition (greater/less than)
    - The token pair to monitor
    - Swap details such as amount, path, recipient, deadline
    - Transaction signing details
2. The `OrderFactory` contract calls [`BasicOrderFactory`](implement-automated-orders/implement-the-creation-of-orders), which deploys a new [`BasicOrder`](implement-automated-orders/implement-orders) contract (Order) and registers it in the [registry](build-the-infrastructure-for-orders/create-helpers-and-utils#3-implement-the-registry).
3. The Order continuously monitors prices using [Slinky](build-the-infrastructure-for-orders/create-mock-precompiles#11-create-a-slinky-precompile).
4. When the price threshold is met, the Order executes a swap:
    - Constructs a swap transaction
    - Sends the transaction to [Warden](build-the-infrastructure-for-orders/create-mock-precompiles#12-create-a-warden-precompile) for signing
    - Records the transaction in the [registry](build-the-infrastructure-for-orders/create-helpers-and-utils#3-implement-the-registry)
    - Executes the swap on Uniswap
5. Transaction details are stored in the [registry](build-the-infrastructure-for-orders/create-helpers-and-utils#

## Learning path

This implementation is part of a progressive learning path:

1. **Automated Orders (Current)**: Learn core concepts with simple price-based execution
2. **[Automated Orders with Price Prediction](../implement-automated-orders-with-price-prediction/introduction)**: Build upon basic orders to add:
   - Price prediction integration
   - Complex price conditions
   - Time-windowed execution
   - Multiple price source handling

You'll implement the core logic in the [`BasicOrder`](implement-orders) contract, implement the creation of Orders in [`BasicOrderFactory`](implement-the-creation-of-orders), and finally [deploy an Order](deploy-an-order).

## Get started

To get started with automated Orders, take the following steps:

1. [Build the infrastructure for Orders](/category/build-the-infrastructure-for-orders).
2. [Implement Orders](implement-orders).
