---
sidebar_position: 1
---

# Introduction

## XXX

After you create a **Warden Agent** with the [Warden Agent Kit](/category/warden-agent-kit), you can give it on-chain capabilities.

This section explains how to enable on-chain capabilities for a **Warden Agent** created with the [Warden Agent Kit](/category/warden-agent-kit).

The guides you'll find here cover an example we implemented for demonstration purposes. It's a Warden Agent that automatically executes **Orders** – smart contracts performing on-chain actions.


In the previous sections you learned all about creating a simple agent using **Warden Agent Kit.** Now this agent can be given on-chain capabilities. An example of that is to create an agent which invokes the `basic order` with `automation` smart contract to perform some on-chain activity. The `advanced order` with `prediction` is for more advance solidity devs to show an example of what can be done using `x/async` and `keychain`.

Warden allows you to build your own on-chain **Warden Agents** with custom capabilities.
The most important feature of Warden Agents is the ability to deploy smart contracts utilizing outputs of AI models.

This section covers an example we implemented for demonstration purposes. It's a Warden Agent that automatically executes **Orders** – smart contracts performing on-chain actions.

You'll learn how to implement two types of Orders:

- **Automated Orders**  
  Automated Orders monitor prices and automatically execute token swaps on Uniswap when user-defined price thresholds are met.
- **Automated Orders with price prediction**  
  These Orders use the `x/async` module to make AI-driven price predictions and perform token swaps based on them.

:::note Full code
Please note that the articles in this section typically contain only fragments of code.  
You can find the full code of the example Warden Agent on [GitHub](https://github.com/warden-protocol/wardenprotocol/tree/main/solidity).
:::

:::tip
Please note:  Basic and Advanced orders are just examples of using `x/async` and `keychains` from solidity. Devs can literally write their **own custom business logic.**
:::

=========

In the previous sections you learned all about creating a simple agent using **Warden Agent Kit.** Now this agent can be given on-chain capabilities. An example of that is to create an agent which invokes the `basic order` with `automation` smart contract to perform some on-chain activity. The `advanced order` with `prediction` is for more advance solidity devs to show an example of what can be done using `x/async` and `keychain`.

Please note:  Basic and Advanced orders are just examples of using `x/async` and `keychains` from solidity. Devs can literally write their **own custom business logic.**

## Prerequisites

- Understanding of Warden Agent Kit
- Basic Solidity knowledge
- Development environment setup
- Required dependencies

## Common components & infrastructure

   A. Key Concepts
      - Role of precompiles
      - Contract inheritance patterns
      - Event and error handling

   B. Overview of Precompiles Used
      - Warden Precompile
      - Slinky Precompile
      - Async Precompile

   C. Core Contract Components
      - AbstractOrder (base contract)
      - Registry (transaction tracking)
      - RLPEncode (transaction building)

   D. Shared Types & Interfaces
      - Types.sol structures
      - IExecution interface
      - Common errors and events

   E. Troubleshooting
      - Common integration issues
      - Precompile interaction errors
      - Transaction encoding problems

   F. Next Steps
      - Preparing for Basic Orders
      - Component integration patterns
      - Testing infrastructure

## Basic Order implementation

   A. Key Concepts
      - Price-based execution
      - Order lifecycle
      - Factory pattern usage

   B. Components & Flow
      - BasicOrder contract
      - BasicOrderFactory
      - Order creation flow
      - Execution flow

   C. Building Basic Orders
      - Setting up the environment
      - Implementing price conditions
      - Transaction building & signing

   D. Deployment & Testing
      - Using the factory
      - Registry integration
      - Price feed integration

   E. Troubleshooting
      - Price feed issues
      - Factory deployment problems
      - Order execution errors

   F. Next Steps
      - Moving to Advanced Orders
      - Customizing Basic Orders
      - Integration patterns

## Advanced Order Implementation

   A. Key Concepts
      - Price prediction system
      - Time-bound execution
      - Complex conditions

   B. Components & Flow
      - AdvancedOrder contract
      - AdvancedOrderFactory
      - Enhanced order flow

   C. Additional Features
      - Price prediction integration
      - Time window handling
      - Complex price conditions

   D. Deployment & Advanced Testing
      - Advanced factory usage
      - Async precompile integration
      - Complex scenario testing

   E. Troubleshooting
      - Prediction system issues
      - Time window problems
      - Complex condition debugging

   F. Next Steps
      - Custom implementations
      - System extensions
      - Advanced use cases

## Architecture

[Automated Orders](implement-automated-orders/introduction) and [Automated Orders with price prediction](implement-automated-orders-with-price-prediction/introduction) are implemented as two separate smart contracts. However, they share [common infrastructure](/category/build-the-infrastructure-for-orders) such as helper contracts, mock precompiles, and so on.

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

## User flow

### Automated Orders

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
5. Transaction details are stored in the [registry](build-the-infrastructure-for-orders/create-helpers-and-utils#3-implement-the-registry) for verification and tracking.

### Automated Orders with price prediction

## Get started

To get started, first [build the infrastructure for Orders](/category/build-the-infrastructure-for-orders).