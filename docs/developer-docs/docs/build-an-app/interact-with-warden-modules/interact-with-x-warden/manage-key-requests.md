---
sidebar_position: 4
---

# Manage key requests

## Overview

The [`IWarden` precompile](https://github.com/warden-protocol/wardenprotocol/blob/main/precompiles/warden/IWarden.sol) allows calling the [`x/warden` module](/learn/warden-protocol-modules/x-warden) from EVM smart contracts.

This article explains how to use `x/warden` to manage [key requests](/learn/glossary#key-request). You'll learn how to call the corresponding functions of the precompile and interact with them after deploying your contract.

To understand how to set up and deploy your project, see [Get started](../get-started-with-precompiles).

:::tip
- For an overview of `x/warden` functions, refer to [Precompiles: x/warden](../../precompiles/x-warden#key-requests).
- The precompile address is `0x0000000000000000000000000000000000000900`.
:::

## Create a new key request

To create a new key request, use the following code in your contract. It calls the [`newKeyRequest()` function](../../precompiles/x-warden#create-a-new-key-request) of the precompile.

```solidity
function newKeyRequest(
    uint64 spaceId,
    uint64 keychainId,
    uint8 keyType,
    uint64 approveTemplateId,
    uint64 rejectTemplateId,
    Types.Coin[] calldata maxKeychainFees,
    uint64 nonce,
    uint64 actionTimeoutHeight,
    string calldata expectedApproveExpression,
    string calldata expectedRejectExpression
) external returns (bool success);

contract WardenKeyRequests {
    IWarden constant WARDEN = IWarden(0x0000000000000000000000000000000000000900);

    function createKeyRequest(
        uint64 spaceId,
        uint64 keychainId,
        uint8 keyType,
        uint64 approveTemplateId,
        uint64 rejectTemplateId,
        Types.Coin[] calldata maxKeychainFees,
        uint64 nonce,
        uint64 actionTimeoutHeight,
        string calldata expectedApproveExpression,
        string calldata expectedRejectExpression
    ) external returns (bool) {
        return WARDEN.newKeyRequest(
            spaceId,
            keychainId,
            keyType,
            approveTemplateId,
            rejectTemplateId,
            maxKeychainFees,
            nonce,
            actionTimeoutHeight,
            expectedApproveExpression,
            expectedRejectExpression
        );
    }
}
```

After deploying your contract, you can interact with it by calling the 

## Fulfill a key request

To fulfilll a key request, use the following code in your contract. It calls the [`fulfilKeyRequest()` function](../../precompiles/x-warden#fulfill-a-key-request) of the precompile.

```solidity
function fulfilKeyRequest(uint64 requestId, bytes calldata pubKey) external returns (bool success);

contract WardenKeyRequests {
    IWarden constant WARDEN = IWarden(0x0000000000000000000000000000000000000900);

      function fulfillKeyRequest(uint64 requestId, bytes calldata pubKey) external returns (bool) {
        return WARDEN.fulfilKeyRequest(requestId, pubKey);
    }
}
```

After deploying your contract, you can interact with it by calling the `fulfillKeyRequest()` function:

```bash
cast send $CONTRACT_ADDRESS "fulfillKeyRequest(uint64,uint64,uint8,uint64,uint64,(string,uint256)[],uint64,uint64,string,string)" 1 1 1 100 101 "(\"award\",100000000000000000)" 1 1000 "approve_expression" "reject_expression" --rpc-url $RPC_URL --private-key $PRIVATE_KEY
```

## Reject a key request

To reject a key request, use the following code in your contract. It calls the [`rejectKeyRequest()` function](../../precompiles/x-warden#reject-a-key-request) of the precompile.

```solidity
function rejectKeyRequest(uint64 requestId, string calldata rejectReason) external returns (bool success);

contract WardenKeyRequests {
    IWarden constant WARDEN = IWarden(0x0000000000000000000000000000000000000900);

     function rejectKeyRequest(uint64 requestId, string calldata rejectReason) external returns (bool) {
        return WARDEN.rejectKeyRequest(requestId, rejectReason);
    }
}
```

After deploying your contract, you can interact with it by calling the `rejectKeyRequest()` function:

```bash
cast send $CONTRACT_ADDRESS "rejectKeyRequest(uint64,string)" 1 "Invalid key format" --rpc-url $RPC_URL --private-key $PRIVATE_KEY
```

## Query key requests

To get a list of all key requests, use the following code in your contract. It calls the [`keyRequests()` function](../../precompiles/x-warden#query-key-requests) of the precompile.

```solidity
function keyRequests(
    TypesPageRequest calldata pageRequest,
    uint64 keychainId,
    uint8 status,
    uint64 spaceId
) external view returns (KeyRequest[] memory requests, TypesPageResponse memory pageResponse);

contract WardenKeyRequests {
    IWarden constant WARDEN = IWarden(0x0000000000000000000000000000000000000900);

    function getKeyRequests(
        uint64 limit,
        uint64 keychainId,
        uint8 status,
        uint64 spaceId
    ) external view returns (
        IWarden.KeyRequest[] memory requests,
        IWarden.TypesPageResponse memory pageResponse
    ) {
        IWarden.TypesPageRequest memory pageRequest = IWarden.TypesPageRequest({
            key: new bytes(0),
            offset: 0,
            limit: limit,
            countTotal: true,
            reverse: false
        });

        return WARDEN.keyRequests(pageRequest, keychainId, status, spaceId);
    }
}
```

After deploying your contract, you can interact with it by calling the `getKeyRequests()` function:

```bash
cast call $CONTRACT_ADDRESS "getKeyRequests(uint64,uint64,uint8,uint64)" 10 1 1 1 --rpc-url $RPC_URL
```

## Query a key request by ID

To get a key request by ID, use the following code in your contract. It calls the [`keyRequestById()` function](../../precompiles/x-warden#query-a-key-request-by-id) of the precompile.

```solidity
function keyRequestById(uint64 id) external view returns (KeyRequest memory request);

contract WardenKeyRequests {
    IWarden constant WARDEN = IWarden(0x0000000000000000000000000000000000000900);

    function getKeyRequestById(uint64 requestId) external view returns (IWarden.KeyRequest memory) {
    return WARDEN.keyRequestById(requestId);
    }
}
```

After deploying your contract, you can interact with it by calling the `getKeyRequestById()` function:

```bash
cast call $CONTRACT_ADDRESS "getKeyRequestById(uint64)" 1 --rpc-url $RPC_URL
```
