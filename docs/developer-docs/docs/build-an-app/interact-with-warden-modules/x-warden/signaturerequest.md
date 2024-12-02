---
sidebar_position: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Signaturerequests

## Overview

In this section you will learn how to query and manage `signaturerequests.` If you would like to get an overview of all functions available for IWarden precompile, you can refer to this.

By the end of this tutorial, you will be able to:

- Query signature requests
- Query signature request by ID
- Create a new signature request
- Fulfil a Key request

## Prerequisites

To understand how to setup your project, please refer to the [Prequisites](../call-x-warden.md) section.

*Note: For sake of simplicity, we will only add snippets of code related to the `signaturerequest` function of IWarden precompile. If you would like to refer to the entire smart contract, you can check it here.*

### Query Signature requests

```solidity
function signRequests(
    TypesPageRequest calldata pageRequest,
    uint64 keychainId,
    uint8 status,
    uint8 broadcastType
) external view returns (SignRequest[] memory signRequests, TypesPageResponse memory pageResponse);

contract WardenSignatureRequests {
    IWarden constant WARDEN = IWarden(0x0000000000000000000000000000000000000900);

    function getSignRequests(
        uint64 limit,
        uint64 keychainId,
        uint8 status,
        uint8 broadcastType
    ) external view returns (
        IWarden.SignRequest[] memory requests,
        IWarden.TypesPageResponse memory pageResponse
    ) {
        IWarden.TypesPageRequest memory pageRequest = IWarden.TypesPageRequest({
            key: new bytes(0),
            offset: 0,
            limit: limit,
            countTotal: true,
            reverse: false
        });

        return WARDEN.signRequests(pageRequest, keychainId, status, broadcastType);
    }
}
```

### Query Signature request by ID

```solidity
function signRequestById(uint64 id) external view returns (SignRequest memory signRequest);

contract WardenSignatureRequests {
    IWarden constant WARDEN = IWarden(0x0000000000000000000000000000000000000900);

    function getSignRequestById(uint64 requestId) external view returns (IWarden.SignRequest memory) {
        return WARDEN.signRequestById(requestId);
    }
}
```

### Create a new Signature request

```solidity
function newSignRequest(
    uint64 keyId,
    bytes calldata input,
    bytes[] calldata analyzers,
    bytes calldata encryptionKey,
    Types.Coin[] calldata maxKeychainFees,
    uint64 nonce,
    uint64 actionTimeoutHeight,
    string calldata expectedApproveExpression,
    string calldata expectedRejectExpression,
    uint8 broadcastType
) external returns (bool success);

contract WardenSignatureRequests {
    IWarden constant WARDEN = IWarden(0x0000000000000000000000000000000000000900);

      function createSignRequest(
        uint64 keyId,
        bytes calldata input,
        bytes[] calldata analyzers,
        bytes calldata encryptionKey,
        Types.Coin[] calldata maxKeychainFees,
        uint64 nonce,
        uint64 actionTimeoutHeight,
        string calldata expectedApproveExpression,
        string calldata expectedRejectExpression,
        uint8 broadcastType
    ) external returns (bool) {
        return WARDEN.newSignRequest(
            keyId,
            input,
            analyzers,
            encryptionKey,
            maxKeychainFees,
            nonce,
            actionTimeoutHeight,
            expectedApproveExpression,
            expectedRejectExpression,
            broadcastType
        );
    }
}
```

### Fulfil a Signature request

```solidity
function fulfilSignRequest(uint64 requestId, bytes calldata signedData) external returns (bool success);

contract WardenSignatureRequests {
    IWarden constant WARDEN = IWarden(0x0000000000000000000000000000000000000900);

       function fulfillSignRequest(uint64 requestId, bytes calldata signedData) external returns (bool) {
        return WARDEN.fulfilSignRequest(requestId, signedData);
    }
}
```

## Deploy the contract

To understand how to deploy your project, please refer to the [Prequisites](../call-x-warden.md) section.

## Interacting with Key requests

Now that the contract is deployed, we’ll proceed to interact with the IWarden functions one by one to demonstrate their usage. This step focuses on creating and querying Key requests.

### Query Signature request

```bash
cast call $CONTRACT_ADDRESS "getSignRequests(uint64,uint64,uint8,uint8)" 10 1 1 0 --rpc-url $RPC_URL
```

### Query all Signature request by ID

```bash
cast call $CONTRACT_ADDRESS "getSignRequestById(uint64)" 1 --rpc-url $RPC_URL
```

### Create new Signature request

```bash
cast send $CONTRACT_ADDRESS "createSignRequest(uint64,bytes,bytes[],bytes,(string,uint256)[],uint64 uint64,string,string,uint8)" 1 0x123... [] 0x456... "(\"award\",100000000000000000)" 1 1000 "approve_expression" "reject_expression" 0 --rpc-url $RPC_URL --private-key $PRIVATE_KEY
```

### Fulfil Signature request

```bash
cast send $CONTRACT_ADDRESS "fulfillSignRequest(uint64,bytes)" 1 0x789... --rpc-url $RPC_URL --private-key $PRIVATE_KEY
```
