---
sidebar_position: 1
---

# Introduction

## Overview

This section explains how to implement **Basic Warden Agent**.

The Basic Agent allows users to automatically execute token swaps on **Uniswap** when user-defined price thresholds are met.

:::note Full code
Please note that the articles in this section typically contain only fragments of code.  
You can find the full code of the Basic Warden Agent on [GitHub](https://github.com/warden-protocol/wardenprotocol/tree/main/solidity).
:::

## User flow

Each Basic Agent user can create and manage multiple Uniswap Orders.

The user flow for executing a swap includes the following steps:

1. The user defines the trading strategy details:
    - The price threshold and condition (greater/less than)
    - The token pair to monitor
    - Swap details such as amount, path, recipient, deadline
    - Transaction signing details
2. The [`OrderFactory` ](../build-the-infrastructure-for-orders/implement-the-creation-of-orders) contract deploys a new [`BasicOrder`](implement-orders) contract (Order) and registers it in the [registry](../build-the-infrastructure-for-orders/create-helpers-and-utils#3-implement-the-registry).
3. The Order continuously monitors prices using [Slinky](../build-the-infrastructure-for-orders/create-mock-precompiles#11-create-a-slinky-precompile).
4. When the price threshold is met, the Order executes a swap:
    - Constructs a swap transaction
    - Sends the transaction to [Warden](../build-the-infrastructure-for-orders/create-mock-precompiles#12-create-a-warden-precompile) for signing
    - Records the transaction in the [registry](../build-the-infrastructure-for-orders/create-helpers-and-utils#3-implement-the-registry)
    - Executes the swap on Uniswap
5. Transaction details are stored in the [registry](../build-the-infrastructure-for-orders/create-helpers-and-utils#3-implement-the-registry) for verification and tracking.

## Get started

XXX
