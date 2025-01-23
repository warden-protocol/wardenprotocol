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

## Learning path

This implementation is part of a progressive learning path:

1. **Automated Orders (Current)**: Learn core concepts with simple price-based execution
2. **[Automated Orders with Price Prediction](/implement-automated-orders-with-price-prediction/introduction.md)**: Build upon basic orders to add:
   - Price prediction integration
   - Complex price conditions
   - Time-windowed execution
   - Multiple price source handling

You'll implement the core logic in the [`BasicOrder`](implement-orders) contract, implement the creation of Orders in [`BasicOrderFactory`](implement-the-creation-of-orders), and finally [deploy an Order](deploy-an-order).

To learn more about the architecture and user flow, refer to the [Execution Agent introduction](../introduction).

:::note Full code
Please note that the articles in this section typically contain only fragments of code.  
You can find the full code of the example Warden Agent on [GitHub](https://github.com/warden-protocol/wardenprotocol/tree/main/solidity).
:::

## Get started

To get started with automated Orders, take the following steps:

1. [Build the infrastructure for Orders](/category/build-the-infrastructure-for-orders).
2. [Implement Orders](implement-orders).
