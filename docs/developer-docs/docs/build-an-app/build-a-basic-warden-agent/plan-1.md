---
sidebar_position: 1
---

# Build a basic Warden Agent 1

## Overview

This tutorial explains how to build an basic (non-AI) **Warden Agent** automatically executing scheduled **Uniswap orders**.

You can find the full sample code on GitHub: XXX.

## Architecture

The Agent architecture will include the following components:

- **An EVM smart contract deployed on Warden**: It'll build unsigned transactions.
- **An off-chain relayer**: It'll monitor the contract state and build the final Ethereum transaction.
- **A scheduler** It'll automatically trigger the contract.

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

## 1. Build an EVM contract

### 1.1. Prepare the chain and project

To prepare the chain and your EVM project, you can take the initial steps from [Deploy an EVM contract](../deploy-smart-contracts-on-warden/deploy-an-evm-contract):

- [Connect to Chiado](../deploy-smart-contracts-on-warden/deploy-an-evm-contract#option-2-connect-to-chiado)
- [Create an EVM project](../deploy-smart-contracts-on-warden/deploy-an-evm-contract#2-create-an-evm-project)

Note that our guide uses [Foundry](https://book.getfoundry.sh)'s toolset to create an EVM project and interact with the contract. However, you can use other tools if you wish.

### 1.2. Create an unsigned transaction

### 1.3. Create a signature request

## 2. Build a relayer

## 3. Build a scheduler

## 4. Test the app

## Next steps

After building a basic Warden Agent, you can build an **AI Agent**, as shown in the following tutorial:

- XXX
