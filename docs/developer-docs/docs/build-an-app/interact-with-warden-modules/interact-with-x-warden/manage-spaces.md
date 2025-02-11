---
sidebar_position: 1
---

# Manage Spaces

## Overview

The [`IWarden` precompile](https://github.com/warden-protocol/wardenprotocol/blob/main/precompiles/warden/IWarden.sol) allows calling the [`x/warden` module](/learn/warden-protocol-modules/x-warden) from EVM smart contracts.

This article explains how to use `x/warden` to manage [Spaces](/learn/glossary#space). You'll learn how to call the corresponding functions of the precompile and interact with them after deploying your contract.

To understand how to set up and deploy your project, see [Get started](../get-started-with-precompiles).

:::tip
- For an overview of `x/warden` functions, refer to [Precompiles: x/warden](../../precompiles/x-warden#spaces).
- The precompile address is `0x0000000000000000000000000000000000000900`.
:::

## Create a new Space

To create a new Space, use the following code in your contract. It calls the [`newSpace()` function](../../precompiles/x-warden#create-a-new-space) of the precompile.

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

After deploying your contract, you can interact with it by calling the `createSpace()` function:

```bash
cast send $CONTRACT_ADDRESS "createSpace(uint64,uint64,uint64,uint64,address[])" 1 2 3 4 \[\] --rpc-url $RPC_URL --private-key $PRIVATE_KEY
```

## Update a Space

To update a Space, use the following code in your contract. It calls the [`updateSpace()` function](../../precompiles/x-warden#update-a-space) of the precompile.

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

After deploying your contract, you can interact with it by calling the `updateSpace()` function:

```bash
cast send --private-key $PRIVATE_KEY --rpc-url $RPC_URL "updateSpace(uint64,uint64,uint64,uint64,uint64,uint64,uint64,string,string)" 1 0 100 101 102 103 100000 "" ""
```

## Add a Space owner

To add an owner to a Space, use the following code in your contract. It calls the [`addSpaceOwner()` function](../../precompiles/x-warden#add-a-space-owner) of the precompile.

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

After deploying your contract, you can interact with it by calling the `addOwner()` function:

```bash
cast send --private-key $PRIVATE_KEY --rpc-url $RPC_URL "addSpaceOwner(uint64,address,uint64,uint64,string,string)" 1 0xYourNewOwnerAddress 0 100000 "" ""
```

## Remove a Space owner

To remove an owner from a Space, use the following code in your contract. It calls the [`removeSpaceOwner()` function](../../precompiles/x-warden#remove-a-space-owner) of the precompile.

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

After deploying your contract, you can interact with it by calling the `removeOwner()` function:

```bash
cast send --private-key $PRIVATE_KEY --rpc-url $RPC_URL "removeSpaceOwner(uint64,address,uint64,uint64,string,string)" 1 0xOwnerToRemove 0 100000 "" ""
```

## Query Spaces

To get a list of all Spaces, use the following code in your contract. It calls the [`spaces()` function](../../precompiles/x-warden#query-spaces) of the precompile.

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

After deploying your contract, you can interact with it by calling the `getAllSpaces()` function:

```bash
cast call $CONTRACT_ADDRESS "getAllSpaces(uint64,uint64,bool)" 10 0 true --rpc-url $RPC_URL
```

## Query Spaces by owner

To get a list of Spaces by owner, use the following code in your contract. It calls the [`spacesByOwner()` function](../../precompiles/x-warden#query-spaces-by-owner) of the precompile.

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

After deploying your contract, you can interact with it by calling the `spacesByOwner()` function:

```bash
cast call $CONTRACT_ADDRESS "getSpacesByOwner(address,uint64,uint64,bool)" 0x6ea8ac1673402989e7b653ae4e83b54173719c30 10 0 true --rpc-url $RPC_URL
```

## Query a Space by ID

To get a Space by ID, use the following code in your contract. It calls the [`spaceById()` function](../../precompiles/x-warden#query-a-space-by-id) of the precompile.

```solidity
function spaceById(uint64 id) external view returns (Space memory space);

contract SpaceQuery {
    address constant WARDEN_ADDRESS = 0x0000000000000000000000000000000000000900;
    IWarden public warden;

    constructor() {
        warden = IWarden(WARDEN_ADDRESS);
    }

    function getSpaceById(uint64 id) external view returns (IWarden.Space memory) {
        return warden.spaceById(id);
    }
}
```

After deploying your contract, you can interact with it by calling the `getSpaceById()` function:

```bash
cast call $CONTRACT_ADDRESS "getSpaceById(uint64)" 1 --rpc-url $RPC_URL
```
