---
sidebar_position: 1
---

# Introduction

## Automated Orders

This section explains how to implement basic **automated Orders**—smart contracts that monitor prices and execute token swaps on Uniswap based on simple price thresholds, signing transactions with [Keychains](/learn/glossary#keychain). This Order type serves as a foundation for building more advanced [Orders with price prediction](../implement-automated-orders-with-price-prediction/introduction).

You'll implement the core logic in the [`BasicOrder` contract](implement-orders), implement the creation of Orders in [`BasicOrderFactory`](implement-the-creation-of-orders), and finally [deploy an Order](deploy-an-order). To learn about the full architecture of this project, refer to the [main introduction](../introduction#architecture).

:::note Full code
Please note that the articles in this section typically contain only fragments of code.  
You can find the full code of the example on GitHub: [`orders`](https://github.com/warden-protocol/wardenprotocol/tree/main/solidity/orders)
:::

## Key features

Automated Orders provide the following key features:

- Price threshold monitoring
- Single price source integration
- Direct Uniswap interactions
- Basic execution security

## User flow

A user can create and manage multiple automated Orders. The user flow includes the following steps:

1. The user specifies the Order input with these details:
    - The price threshold and condition (greater/less than)
    - The token pair to monitor
    - Swap details such as amount, path, recipient, deadline
    - Transaction signing details
2. The [`OrderFactory` contract](../build-the-infrastructure-for-orders/implement-the-creation-of-orders) calls [`BasicOrderFactory`](implement-the-creation-of-orders), which deploys a new [`BasicOrder` contract](implement-orders) (Order) and registers it in the [registry](../build-the-infrastructure-for-orders/create-helpers-and-utils#3-implement-the-registry).
3. The Order continuously monitors prices using [Slinky](../build-the-infrastructure-for-orders/create-mock-precompiles#11-create-a-slinky-precompile).
4. When the price threshold is met, the Order executes a swap:
    - Constructs a swap transaction
    - Sends the transaction to [Warden](../build-the-infrastructure-for-orders/create-mock-precompiles#12-create-a-warden-precompile) for signing
    - Records the transaction in the [registry](../build-the-infrastructure-for-orders/create-helpers-and-utils#3-implement-the-registry)
    - Executes the swap on Uniswap
5. Transaction details are stored in the [registry](../build-the-infrastructure-for-orders/create-helpers-and-utils#3-implement-the-registry).

## Get started

To get started with automated Orders, take the following steps:

1. [Build the infrastructure for Orders](/category/build-the-infrastructure-for-orders).
2. [Implement Orders](implement-orders).
