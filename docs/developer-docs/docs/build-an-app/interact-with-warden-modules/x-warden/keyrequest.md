---
sidebar_position: 4
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Key Requests

## Overview

In this section you will learn how to query and manage `keyrequests.` If you would like to get an overview of all functions available for IWarden precompile, you can refer to this.

By the end of this tutorial, you will be able to:

- Query Key requests
- Query Key request by ID
- Create a new Key request
- Fulfil a Key request
- Reject a Key request

## Prerequisites

To understand how to setup your project, please refer to the [Prequisites](../call-x-warden.md) section.

*Note: For sake of simplicity, we will only add snippets of code related to the `Key requests` function of IWarden precompile. If you would like to refer to the entire smart contract, you can check it here.*

### Query Key requests

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

### Query Key request by ID

```solidity
function keyRequestById(uint64 id) external view returns (KeyRequest memory request);

contract WardenKeyRequests {
    IWarden constant WARDEN = IWarden(0x0000000000000000000000000000000000000900);

    function getKeyRequestById(uint64 requestId) external view returns (IWarden.KeyRequest memory) {
    return WARDEN.keyRequestById(requestId);
    }
}
```

### Create a new Key request

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

### Fulfil a Key request

```solidity
function fulfilKeyRequest(uint64 requestId, bytes calldata pubKey) external returns (bool success);

contract WardenKeyRequests {
    IWarden constant WARDEN = IWarden(0x0000000000000000000000000000000000000900);

      function fulfillKeyRequest(uint64 requestId, bytes calldata pubKey) external returns (bool) {
        return WARDEN.fulfilKeyRequest(requestId, pubKey);
    }
}
```

### Reject a Key request

```solidity
function rejectKeyRequest(uint64 requestId, string calldata rejectReason) external returns (bool success);

contract WardenKeyRequests {
    IWarden constant WARDEN = IWarden(0x0000000000000000000000000000000000000900);

     function rejectKeyRequest(uint64 requestId, string calldata rejectReason) external returns (bool) {
        return WARDEN.rejectKeyRequest(requestId, rejectReason);
    }
}
```

## Deploy the contract

To understand how to deploy your project, please refer to the [Prequisites](../call-x-warden.md) section.

## Interacting with Key requests

Now that the contract is deployed, we’ll proceed to interact with the IWarden functions one by one to demonstrate their usage. This step focuses on creating and querying Key requests.

### Query all Keyrequests

```bash
cast call $CONTRACT_ADDRESS "getKeyRequests(uint64,uint64,uint8,uint64)" 10 1 1 1 --rpc-url $RPC_URL
```

### Query Keyrequests by ID

```bash
cast call $CONTRACT_ADDRESS "getKeyRequestById(uint64)" 1 --rpc-url $RPC_URL
```

### Create new Keyrequest

```bash
cast send $CONTRACT_ADDRESS "createKeyRequest(uint64,uint64,uint8,uint64,uint64,(string,uint256)[],uint64,uint64,string,string)" 1 1 1 100 101 "(\"award\",100000000000000000)" 1 1000 "approve_expression" "reject_expression" --rpc-url $RPC_URL --private-key $PRIVATE_KEY
```

### Fulfil a Keyrequest

```bash
cast send $CONTRACT_ADDRESS "fulfillKeyRequest(uint64,bytes)" 1 0x123... --rpc-url $RPC_URL --private-key $PRIVATE_KEY
```

### Reject a Keyrequest

```bash
cast send $CONTRACT_ADDRESS "rejectKeyRequest(uint64,string)" 1 "Invalid key format" --rpc-url $RPC_URL --private-key $PRIVATE_KEY
```
