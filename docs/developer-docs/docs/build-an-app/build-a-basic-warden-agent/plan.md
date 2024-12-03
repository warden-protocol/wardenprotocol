---
sidebar_position: 2
---

# PLAN: Build a basic Warden Agent

## Overview

This tutorial explains how to build an basic (non-AI) **Warden Agent** automatically executing scheduled **Uniswap orders**.

You can find the full sample code on GitHub: XXX.

## Architecture

The Agent architecture will include the following components:

- **An EVM smart contract deployed on Warden**: It'll build unsigned transactions.
- **An off-chain relayer**: It'll monitor the contract state and build the final Ethereum transaction.
- **A scheduler** It'll automatically trigger the contract.

(Most likely, this description is incomplete. For example, should we add the logic for deploying orders?)

## User flow

Here are the main steps of the user flow:

1. The user, a [Space](/learn/glossary#space) owner, creates a key.
2. The user creates an order: a smart contract that is automatically deployed.
3. The order address is registered in [SpaceWard](/learn/glossary#spaceward).
4. The scheduler calls the contract.
5. If the user-defined conditions ([Rules](/learn/glossary#rule)) are met, the smart contract creates an [Action](/learn/glossary#action) containing a [signature request](/learn/glossary#signature-request).
6. The Action is approved, and a [Keychain](/learn/glossary#keychain) fulfills the signature request.
7. The relayer collects the signed transactions and broadcasts them to the Ethereum network.

## Prerequisites

Before you start, complete the following prerequisites:

- XXX

## 1. Create a project

This sections explains how to create the project containing the Agent's logic, smart contracts, etc.

## 2. Build the on-chain logic

### 2.1. Create a transaction

1. Create an unsigned transaction

2. Create a signature request

### 2.2. Build the logic for creating orders

This section explains how to build the main part – the logic for the automatic deployment of orders (smart contracts). It's probably located in the [`/script`](https://github.com/warden-protocol/wardenprotocol/tree/main/solidity/orders/script) directory.

### 2.3. Build the logic for managing orders

This section explains how to deploy the [`Registry`](https://github.com/warden-protocol/wardenprotocol/blob/main/solidity/orders/src/Registry.sol) and [`IExecution`](https://github.com/warden-protocol/wardenprotocol/blob/main/solidity/orders/src/IExecution.sol) smart contracts, which allow managing orders created by users.

There are other contracts in the [`/src`](https://github.com/warden-protocol/wardenprotocol/blob/main/solidity/orders/src) directory, but probably they don't need to be documented.

## 3. Implement tests

Maybe we don't need to break down it in detail. But we can direct users to the [`/tests`](https://github.com/warden-protocol/wardenprotocol/blob/main/solidity/orders/src) directory.

## 4. Build off-chain services

This section could be brief, perhaps we shouldn't explain in detail how to build these services

### 4.1. Build a relayer

### 4.2. Build a scheduler

## 5. Test the Agent

## Next steps

After building a basic Warden Agent, you can build an **AI Agent**, as shown in the following tutorial:

- XXX
