---
sidebar_position: 1
---

# Overview

## Introduction

In the previous sections you learnt all about creating a simple agent using **Warden Agent Kit.** Now this agent can be given on-chain capabilities. An example of that is to create an agent which invokes the `basic order` with `automation` smart contract to perform some on-chain activity. The `advanced order` with `prediction` is for more advance solidity devs to show an example of what can be done using `x/async` and `keychain`.

Please note:  Basic and Advanced orders are just examples of using `x/async` and `keychains` from solidity. Devs can literally write their **own custom business logic.**

Below is a break down of what will you be implementing in this section as an example.

## Prerequisites

- Understanding of Warden Agent Kit
- Basic Solidity knowledge
- Development environment setup
- Required dependencies

### 1. Common Components & Infrastructure

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

## Basic Order Implementation

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
