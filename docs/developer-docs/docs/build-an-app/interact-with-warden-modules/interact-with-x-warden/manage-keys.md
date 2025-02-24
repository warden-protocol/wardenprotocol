---
sidebar_position: 2
---

# Manage keys

## Overview

The [`IWarden` precompile](https://github.com/warden-protocol/wardenprotocol/blob/main/precompiles/warden/IWarden.sol) allows calling the [`x/warden` module](/learn/warden-protocol-modules/x-warden) from EVM smart contracts.

This article explains how to use `x/warden` to manage [keys](/learn/glossary#key). You'll learn how to call the corresponding functions of the precompile and interact with them after deploying your contract.

To understand how to set up and deploy your project, see [Get started with precompiles](../get-started-with-precompiles).

:::tip
- For an overview of `x/warden` functions, refer to [Precompiles: x/warden](../../precompiles/x-warden#keys).
- The precompile address is `0x0000000000000000000000000000000000000900`.
:::

## Update a key

To update a key with a given ID, use the following code in your contract. It calls the [`updateKey()` function](../../precompiles/x-warden#update-a-key) of the precompile.

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

After deploying your contract, you can interact with it by calling the `updateKey()` function:

```bash
cast send $CONTRACT_ADDRESS "updateKeyConfig(uint64,uint64,uint64,uint64)" 1 100 200 300 --rpc-url $RPC_URL --private-key $PRIVATE_KEY
```

## Query keys

To get a list of all keys, use the following code in your contract. It calls the [`allKeys()` function](../../precompiles/x-warden#query-keys) of the precompile.

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

After deploying your contract, you can interact with it by calling the `allKeys()` function:

```bash
cast call $CONTRACT_ADDRESS "getAllKeys(uint64,int32[])" 10 [] --rpc-url $RPC_URL
```

## Query keys by Space ID

To get a list of keys by Space ID, use the following code in your contract. It calls the [`keysBySpaceId()` function](../../precompiles/x-warden#query-keys-by-space-id) of the precompile.

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

After deploying your contract, you can interact with it by calling the `keysBySpaceId()` function:

```bash
cast call $CONTRACT_ADDRESS "getKeysBySpaceId(uint64,uint64,int32[])" 100 10 [] --rpc-url $RPC_URL
```

## Query a key by ID

To get a key by ID, use the following code in your contract. It calls the [`keyById()` function](../../precompiles/x-warden#query-a-key-by-id) of the precompile.

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

After deploying your contract, you can interact with it by calling the `keyById()` function:

```bash
cast call $CONTRACT_ADDRESS "getKeyById(uint64,int32[])" 1 [] --rpc-url $RPC_URL
```
