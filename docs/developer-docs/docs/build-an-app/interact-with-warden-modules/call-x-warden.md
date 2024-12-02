---
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Prequisites

## Overview

The [`x/warden`](/learn/warden-protocol-modules/x-warden) Warden module allows users to create and manage their `Spaces`, `Keys`, `Keychains`, `Keyrequests` and `Signaturerequests`.

This guide will walk you through how to use the [`x/warden`](/learn/warden-protocol-modules/x-warden) module in a Solidity smart contract.

Note: This guide will help you understand how to define the structure of a smart contract and how to interact with it. The next section of this guide will go into detail on how to use individual function of the `x/warden` module.

## Getting Started

- Ensure you have a working environment with Foundry
- Set up your private key and RPC URL for your preferred testnet or local node.

## Create Project

1. Initialize a Project using Foundry. If you don't have Foundry installed, refer to this [guide](https://book.getfoundry.sh/getting-started/installation).

```bash
forge init warden-space --no-commit
cd warden-space
```

2. Install Dependencies Add any required Solidity libraries or dependencies.

3. Create a new Contract `warden.sol` in the `src` directory.

## Deploy the contract

1. Set Up Environment Variables Export your private key and RPC URL as environment variables:

```bash
export PRIVATE_KEY=<your-private-key>
export RPC_URL=http://localhost:8545  # Example: Replace with your RPC URL
```

*Note: Use secure key storage solutions like `.env` for storing private keys in production.*

2. Compile the Contract Using Foundry, compile the contract:

```bash
forge build
```

3. Deploy the Contract

Deploy the contract using Foundry's forge create command.

```bash
forge create --rpc-url $RPC_URL --private-key $PRIVATE_KEY src/Warden.sol:WardenContract
```

4. Verify the Deployment To verify the contract is deployed, run the following:

```bash
cast code 0xContractAddress --rpc-url $RPC_URL
```

5. Save Contract Address Save the contract address in an environment variable for future use:

```bash
export CONTRACT_ADDRESS=0xContractAddress
```

6. Prepare for Interaction Ensure you have a functional cast tool (Foundry) or equivalent to interact with the deployed contract.