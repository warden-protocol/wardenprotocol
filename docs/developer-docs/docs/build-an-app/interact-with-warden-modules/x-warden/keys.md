---
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Keys

## Overview

In this section you will learn how to query and manage `keys.` If you would like to get an overview of all functions available for IWarden precompile, you can refer to this.

By the end of this tutorial, you will be able to:

- Query keys
- Query keys by Id
- Query Keys by spaceId
- Update a key

## Prerequisites

To understand how to setup your project, please refer to the [Prequisites](../call-x-warden.md) section.

*Note: For sake of simplicity, we will only add snippets of code related to the `keys` function of IWarden precompile. If you would like to refer to the entire smart contract, you can check it here.*

### Query keys

```solidity
function allKeys(TypesPageRequest calldata pageRequest, int32[] calldata deriveAddresses) 
    external view returns(KeyResponse[] memory keys, TypesPageResponse memory pageResponse);

contract WardenKey {
    IWarden constant WARDEN = IWarden(0x0000000000000000000000000000000000000900);

    // Query all keys with pagination
    function getAllKeys(uint64 limit, int32[] calldata addressTypes) external view returns (
        IWarden.KeyResponse[] memory keys,
        IWarden.TypesPageResponse memory pageResponse
    ) {
        IWarden.TypesPageRequest memory pageRequest = IWarden.TypesPageRequest({
            key: new bytes(0),
            offset: 0,
            limit: limit,
            countTotal: true,
            reverse: false
        });
        
        return WARDEN.allKeys(pageRequest, addressTypes);
    }
}   
```

### Query keys by Id

```solidity
function keyById(uint64 id, int32[] calldata deriveAddresses)
    external view returns(KeyResponse memory key);

contract WardenKey {
    IWarden constant WARDEN = IWarden(0x0000000000000000000000000000000000000900);

    // Query a specific key by ID
    function getKeyById(uint64 keyId, int32[] calldata addressTypes) external view returns (
        IWarden.KeyResponse memory
    ) {
        return WARDEN.keyById(keyId, addressTypes);
    }
}
```

### Query Keys by spaceId

```solidity
function keysBySpaceId(TypesPageRequest calldata pageRequest, uint64 spaceId, int32[] calldata deriveAddresses)
    external view returns(KeyResponse[] memory keys, TypesPageResponse memory pageResponse);

contract WardenKey {
    IWarden constant WARDEN = IWarden(0x0000000000000000000000000000000000000900);


    // Query keys by space ID with pagination
    function getKeysBySpaceId(uint64 spaceId, uint64 limit, int32[] calldata addressTypes) external view returns (
        IWarden.KeyResponse[] memory keys,
        IWarden.TypesPageResponse memory pageResponse
    ) {
        IWarden.TypesPageRequest memory pageRequest = IWarden.TypesPageRequest({
            key: new bytes(0),
            offset: 0,
            limit: limit,
            countTotal: true,
            reverse: false
        });
        
        return WARDEN.keysBySpaceId(pageRequest, spaceId, addressTypes);
    }
}
```

### Update a key

```solidity
function updateKey(
    uint64 keyId,
    uint64 approveTemplateId,
    uint64 rejectTemplateId,
    uint64 actionTimeoutHeight,
    string calldata expectedApproveExpression,
    string calldata expectedRejectExpression
) external returns (bool success);

contract WardenKey {
    IWarden constant WARDEN = IWarden(0x0000000000000000000000000000000000000900);
    function updateKeyConfig(
        uint64 keyId,
        uint64 approveTemplateId,
        uint64 rejectTemplateId,
        uint64 actionTimeoutHeight
    ) external returns (bool) {
        return WARDEN.updateKey(
            keyId,
            approveTemplateId,
            rejectTemplateId,
            actionTimeoutHeight,
            "", // expectedApproveExpression - empty for this example
            ""  // expectedRejectExpression - empty for this example
        );
    }
}
```

## Deploy the contract

To understand how to deploy your project, please refer to the [Prequisites](../call-x-warden.md) section.

## Interacting with Keys

Now that the contract is deployed, we’ll proceed to interact with the IWarden functions one by one to demonstrate their usage. This step focuses on creating and querying Keys.

### Query all keys

Use the `allKeys` function to retrieve all keys.

```bash
cast call $CONTRACT_ADDRESS "getAllKeys(uint64,int32[])" 10 [] --rpc-url $RPC_URL
```

### Query keys by ID

Use the `keyById` function to retrieve a specific key by its ID.

```bash
cast call $CONTRACT_ADDRESS "getKeyById(uint64,int32[])" 1 [] --rpc-url $RPC_URL
```

### Query Keys by SpaceId

Use the `keysBySpaceId` function to retrieve keys by space ID.

```bash
cast call $CONTRACT_ADDRESS "getKeysBySpaceId(uint64,uint64,int32[])" 100 10 [] --rpc-url $RPC_URL
```

### Update key

Use the `updateKey` function to update a key.

```bash
cast send $CONTRACT_ADDRESS "updateKeyConfig(uint64,uint64,uint64,uint64)" 1 100 200 300 --rpc-url $RPC_URL --private-key $PRIVATE_KEY
```
