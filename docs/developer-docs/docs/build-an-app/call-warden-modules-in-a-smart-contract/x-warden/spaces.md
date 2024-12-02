---
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Spaces

## Overview

In this section you will learn how to query and manage spaces. If you would like to get an overview of all functions available for IWarden precompile, you can refer to this.

By the end of this tutorial, you will be able to:

- Create a new space
- Update a space
- Add space owner
- Remove space owner
- Query space
- Query space by owner
- Query a space by ID

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

3. Create the contract named `WardenSpace.sol` in the `src` directory. 

*Note: For sake of simplicity, we will only add snippets of code related to the `space` function of IWarden precompile. If you would like to refer to the entire smart contract, you can check it here.*

### Create a new Space

```solidity
function newSpace(
        uint64 approveAdminTemplateId,
        uint64 rejectAdminTemplateId,
        uint64 approveSignTemplateId,
        uint64 rejectSignTemplateId,
        address[] calldata additionalOwners
) external returns (uint64 id);

contract wardenSpace {
    // The IWarden precompile address
    address constant WARDEN_ADDRESS = 0x0000000000000000000000000000000000000900;
    IWarden public warden;

    constructor() {
        warden = IWarden(WARDEN_ADDRESS);
    }

    // Create a new space with specified template IDs and additional owners
    function createSpace(
        uint64 approveAdminTemplateId,
        uint64 rejectAdminTemplateId,
        uint64 approveSignTemplateId,
        uint64 rejectSignTemplateId,
        address[] calldata additionalOwners
    ) external returns (uint64) {
        return warden.newSpace(
            approveAdminTemplateId,
            rejectAdminTemplateId,
            approveSignTemplateId,
            rejectSignTemplateId,
            additionalOwners
        );
    }
}

```

The above snippet creates a newSpace with the specified parameters

### Update a Space

```solidity

```

### Add a Space Owner

```solidity

```

### Remove a Space Owner

```solidity
```

### Query a Space

```solidity
function spaces(PageRequest calldata pageRequest) external view returns (Space[] memory spaces, PageResponse memory pageResponse);

contract SpaceQuery {
    address constant WARDEN_ADDRESS = 0x0000000000000000000000000000000000000900;
    IWarden public warden;

    constructor() {
        warden = IWarden(WARDEN_ADDRESS);
    }

    function getAllSpaces(
        uint64 limit,
        uint64 offset,
        bool countTotal
    ) external view returns (
        IWarden.Space[] memory spaces,
        uint64 total,
        bool hasMore
    ) {
        IWarden.PageRequest memory pageRequest = IWarden.PageRequest({
            key: new bytes(0),
            offset: offset,
            limit: limit,
            countTotal: countTotal,
            reverse: false
        });

        // Corrected the declaration
        (IWarden.Space[] memory spacesList, IWarden.PageResponse memory pageResponse) = warden.spaces(pageRequest);
        
        return (
            spacesList,
            pageResponse.total,
            pageResponse.nextKey.length > 0
        );
    }
}
```

### Query a Space by ID

```solidity
function spaceById(uint64 id) external view returns (Space memory space);

contract SpaceQuery {
    address constant WARDEN_ADDRESS = 0x0000000000000000000000000000000000000900;
    IWarden public warden;

    constructor() {
        warden = IWarden(WARDEN_ADDRESS);
    }

    function getSpaceById(uint64 spaceId) external view returns (IWarden.Space memory) {
        return warden.spaceById(spaceId);
    }
}
```

### Query a Space by Owner

```solidity
function spacesByOwner(PageRequest calldata pageRequest, address owner) external view returns (Space[] memory spaces, PageResponse memory pageResponse);

contract SpaceQuery {
    address constant WARDEN_ADDRESS = 0x0000000000000000000000000000000000000900;
    IWarden public warden;

    constructor() {
        warden = IWarden(WARDEN_ADDRESS);
    }

     function getSpacesByOwner(
        address owner,
        uint64 limit,
        uint64 offset,
        bool countTotal
    ) external view returns (
        IWarden.Space[] memory spaces,
        uint64 total,
        bool hasMore
    ) {
        IWarden.PageRequest memory pageRequest = IWarden.PageRequest({
            key: new bytes(0),
            offset: offset,
            limit: limit,
            countTotal: countTotal,
            reverse: false
        });

        // Corrected the declaration
        (IWarden.Space[] memory spacesList, IWarden.PageResponse memory pageResponse) = warden.spacesByOwner(pageRequest, owner);
        
        return (
            spacesList,
            pageResponse.total,
            pageResponse.nextKey.length > 0
        );
    }
}
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
forge create --rpc-url $RPC_URL --private-key $PRIVATE_KEY src/WardenSpace.sol:WardenSpace
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

## Interacting with Spaces

Now that the contract is deployed, we’ll proceed to interact with the IWarden functions one by one to demonstrate their usage. This step focuses on creating and querying Spaces.

### Create a Space

Use the `createSpace` function to create a new Space.

```bash
cast send $CONTRACT_ADDRESS "createSpace(uint64,uint64,uint64,uint64,address[])" 1 2 3 4 \[\] --rpc-url $RPC_URL --private-key $PRIVATE_KEY
```

### Query Spaces

Use the `getAllSpaces` function to create a new Space.

```bash
cast call $CONTRACT_ADDRESS "getAllSpaces(uint64,uint64,bool)" 10 0 true --rpc-url $RPC_URL
```

### Query Space by ID

Use the `spaceById` function to create a new Space.

```bash
cast call $CONTRACT_ADDRESS "getSpaceById(uint64)" 1 --rpc-url $RPC_URL
```

### Query Spaces by Owner

Use the `spacesByOwner` function to create a new Space.

```bash
cast call $CONTRACT_ADDRESS "getSpacesByOwner(address,uint64,uint64,bool)" 0x6ea8ac1673402989e7b653ae4e83b54173719c30 10 0 true --rpc-url $RPC_URL
```
