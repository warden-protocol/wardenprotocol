---
sidebar_position: 1
---

# Introduction

## Basic Warden Agent

This tutorial will guide you through the process of building a **Basic Warden Agent.** In this basic version of the tutorial, we'll focus on automated token trading based on price conditions. It will allow you to create orders that automatically execute token swaps on Uniswap when certain price thresholds are met.

In the more advanced tutorial you will learn how to build a **Warden Agent** that executes orders based on AI predictions.

You can find the full sample code on [GitHub](https://github.com/warden-protocol/wardenprotocol/tree/main/solidity).

## Architecture

**BasicOrder Contract:** *Core trading logic*

- Price monitoring
- Transaction building
- Uniswap integration

**Factory & Registry:** *Management layer*

- Agent deployment
- Transaction tracking
- Access control

**External Services:**

- Slinky for price feeds
- Warden for transaction signing
- Uniswap V2 for swaps

## User flow

1. Define trading strategy:
    - Price threshold and condition (greater/less than)
    - Token pair to monitor
    - Swap details (amount, path, recipient, deadline)
    - Transaction signing details
2. Implement agent contract:
    - OrderFactory deploys a new BasicOrder contract and registers it in the Registry
3. The BasicOrder continuously monitors price conditions through Slinky price feed
4. When price conditions are met:
    - Order constructs the swap transaction
    - Sends it to Warden for signing
    - Records the transaction in Registry
    - Executes the swap on Uniswap
5. Transaction details are stored in Registry for verification/tracking
6. Deploy and create agent instances
7. Monitor and manage agents
