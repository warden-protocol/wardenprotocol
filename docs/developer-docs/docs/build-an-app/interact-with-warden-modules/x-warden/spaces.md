---
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Spaces

## Overview

In this section you will learn how to query and manage `spaces.` If you would like to get an overview of all functions available for IWarden precompile, you can refer to this.

By the end of this tutorial, you will be able to:

- Create a new space
- Update a space
- Add space owner
- Remove space owner
- Query space
- Query space by owner
- Query a space by ID

## Prerequisites

To understand how to setup your project, please refer to the [Prequisites](../call-x-warden.md) section.

*Note: For sake of simplicity, we will only add snippets of code related to the `spaces` function of IWarden precompile. If you would like to refer to the entire smart contract, you can check it here.*

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

### Update a Space

```solidity
function updateSpace(
    uint64 spaceId,
    uint64 nonce,
    uint64 approveAdminTemplateId,
    uint64 rejectAdminTemplateId,
    uint64 approveSignTemplateId,
    uint64 rejectSignTemplateId,
    uint64 actionTimeoutHeight,
    string calldata expectedApproveExpression,
    string calldata expectedRejectExpression
) external returns (bool success);

contract wardenSpace {
    // The IWarden precompile address
    address constant WARDEN_ADDRESS = 0x0000000000000000000000000000000000000900;
    IWarden public warden;

    constructor() {
        warden = IWarden(WARDEN_ADDRESS);
    }

     // Add a new owner to a space
    function addOwner(
        uint64 spaceId,
        address newOwner,
        uint64 nonce,
        uint64 actionTimeout,
        string calldata approveExpression,
        string calldata rejectExpression
    ) external returns (bool) {
        return warden.addSpaceOwner(
            spaceId,
            newOwner,
            nonce,
            actionTimeout,
            approveExpression,
            rejectExpression
        );
    }
}
```

### Add a Space Owner

```solidity
function addSpaceOwner(
    uint64 spaceId,
    address newOwner,
    uint64 nonce,
    uint64 actionTimeoutHeight,
    string calldata expectedApproveExpression, 
    string calldata expectedRejectExpression
) external returns (bool success);

contract wardenSpace {
    // The IWarden precompile address
    address constant WARDEN_ADDRESS = 0x0000000000000000000000000000000000000900;
    IWarden public warden;

    constructor() {
        warden = IWarden(WARDEN_ADDRESS);
    }
```

### Remove a Space Owner

```solidity
function removeSpaceOwner(
    uint64 spaceId,
    address owner,
    uint64 nonce,
    uint64 actionTimeoutHeight,
    string calldata expectedApproveExpression,
    string calldata expectedRejectExpression
) external returns (bool success);

contract wardenSpace {
    // The IWarden precompile address
    address constant WARDEN_ADDRESS = 0x0000000000000000000000000000000000000900;
    IWarden public warden;

    constructor() {
        warden = IWarden(WARDEN_ADDRESS);
    }

    function removeOwner(
        uint64 spaceId,
        address owner,
        uint64 nonce,
        uint64 actionTimeout,
        string calldata approveExpression,
        string calldata rejectExpression
    ) external returns (bool) {
        return warden.removeSpaceOwner(
            spaceId,
            owner,
            nonce,
            actionTimeout,
            approveExpression,
            rejectExpression
        );
    }
}
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

To understand how to deploy your project, please refer to the [Prequisites](../call-x-warden.md) section.

## Interacting with Spaces

Now that the contract is deployed, we’ll proceed to interact with the IWarden functions one by one to demonstrate their usage. This step focuses on creating and querying Spaces.

### Create a Space

Use the `createSpace` function to create a new Space.

```bash
cast send $CONTRACT_ADDRESS "createSpace(uint64,uint64,uint64,uint64,address[])" 1 2 3 4 \[\] --rpc-url $RPC_URL --private-key $PRIVATE_KEY
```

### Update Space

Use the `updateSpace` function to update an existing Space.

```bash
cast send --private-key $PRIVATE_KEY --rpc-url $RPC_URL "updateSpace(uint64,uint64,uint64,uint64,uint64,uint64,uint64,string,string)" 1 0 100 101 102 103 100000 "" ""
```

### Add Space Owner

Use the `addOwner` function to add an owner to a Space.

```bash
cast send --private-key $PRIVATE_KEY --rpc-url $RPC_URL "addSpaceOwner(uint64,address,uint64,uint64,string,string)" 1 0xYourNewOwnerAddress 0 100000 "" ""
```

### Remove Space Owner

Use the `removeOwner` function to remove an owner from a Space.

```bash
cast send --private-key $PRIVATE_KEY --rpc-url $RPC_URL "removeSpaceOwner(uint64,address,uint64,uint64,string,string)" 1 0xOwnerToRemove 0 100000 "" ""
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
