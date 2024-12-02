---
sidebar_position: 4
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Keyrequests

## Overview

In this section you will learn how to query and manage `keyrequests.` If you would like to get an overview of all functions available for IWarden precompile, you can refer to this.

By the end of this tutorial, you will be able to:

- Query Key requests
- Query Key request by ID
- Create a new Key request
- Fulfil a Key request
- Reject a Key request

## Prerequisites

- Ensure you have a working environment with Foundry
- Set up your private key and RPC URL for your preferred testnet or local node.

## Create Project

1. Initialize a Project using Foundry. If you don't have Foundry installed, refer to this [guide](https://book.getfoundry.sh/getting-started/installation).

```bash
forge init warden-space --no-commit
cd warden-space
```

2. Install dependencies and add any required `solidity` libraries or dependencies.

3. Create the contract named `WardenKeyRequest.sol` in the `src` directory. 

*Note: For sake of simplicity, we will only add snippets of code related to the `Key requests` function of IWarden precompile. If you would like to refer to the entire smart contract, you can check it here.*

### Query Key requests

```solidity
```

### Query Key request by ID

```solidity
```

### Create a new Key request

```solidity
```

### Fulfil a Key request

```solidity
```

### Reject a Key request

```solidity
```

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
forge create --rpc-url $RPC_URL --private-key $PRIVATE_KEY src/WardenKeyRequest.sol:WardenKeyRequest
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

## Interacting with Key requests

Now that the contract is deployed, we’ll proceed to interact with the IWarden functions one by one to demonstrate their usage. This step focuses on creating and querying Key requests.

### Query all Keyrequests

### Query Keyrequests by ID

### Create new Keyrequest

### Fulfil a Keyrequest

### Reject a Keyrequest